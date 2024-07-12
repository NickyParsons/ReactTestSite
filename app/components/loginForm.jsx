const React = require("react");
  
class LoginForm extends React.Component{
 
    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.state = {
            email: "",
            emailValid: true,
            password: "",
            isFormSended: false,
            isError: false
        };
    }

    async submitForm(event) {
        event.preventDefault();
        this.setState({ isFormSended: false });
        this.setState({ isError: false });
        let hostString = `http://192.168.1.2:5214/login`;
        let queryString = `email=${this.state.email}&password=${this.state.password}`;
        console.log(`request: ${hostString}?${queryString}`)
        try {
            this.setState({ isFormSended: true });
            let response = await fetch(`${hostString}?${queryString}`, {
                method: "POST",
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "*/*"
                },
                cache: "no-cache",
                mode: "cors",
                credentials: "include"
            });
            if (response.status === 200) {
                let data = await response.json()
                console.log(`token: ${data.token}`);
                document.cookie = `nasty-boy= ${data.token}`;
            }
            else if (response.status === 401) {
                console.log("Email or password incorrect");
            }
            else {
                console.log("Unexpected status code");
            }
        }
        catch (error) {
            this.setState({ isError: true });
            console.log(`Something goes wrong: ${error}`);
        }
    }
    changeEmail(event) {
        let value = event.target.value;
        this.setState({ email: value })
        if (event.target.validity.valid === true) {
            this.setState({ emailValid: true });
        }
        else {
            this.setState({ emailValid: false });
        }
    }
    changePassword(event) {
        this.setState({ password: event.target.value })
    }

    render() {
        if (this.state.isFormSended === true) {
            if (this.state.isError === false) {
                return <>
                    <p>Форма отправлена</p>
                </>
            }
            else {
                return <>
                    <p>Something goes wrong</p>
                </>
            }
        }
        else {
            let emailClass = this.state.emailValid === true ? "validFormField" : "invalidFormField";
            return <>
                <form id="loginForm" method="post" action="http://localhost:5214/login" onSubmit={this.submitForm}>
                    <div className={emailClass}>
                        <label htmlFor="loginEmail">E-Mail:</label>
                        <input type="email" id="loginEmail" name="email" value={this.state.name} onChange={this.changeEmail} required />
                    </div>

                    <div className="validFormField">
                        <label htmlFor="loginPassword">Пароль:</label>
                        <input type="password" id="loginPassword" name="password" value={this.state.password} onChange={this.changePassword} required />
                    </div>
                    <p><input type="submit" value="Войти" /></p>
                </form>
            </>
        } 
    }
}
  
export { LoginForm };