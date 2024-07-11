const React = require("react");
  
class RegisterForm extends React.Component{
 
    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changeFirstName = this.changeFirstName.bind(this);
        this.changeLastName = this.changeLastName.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changePasswordRepeat = this.changePasswordRepeat.bind(this);
        this.state = {
            email: "",
            emailValid: true,
            firstname: "",
            firstnameValid: true,
            lastname: "", password: "",
            lastnameValid: true,
            password: "",
            passwordValid: true,
            repeatPassword: "",
            repeatPasswordValid: true,
            isFormSended: false,
            isError: false
        };
        this.passwordInput = React.createRef();
        this.repeatPasswordInput = React.createRef();
    }

    async submitForm(event) {
        this.setState({ isFormSended: false });
        this.setState({ isError: false });
        event.preventDefault();
        let requestForm = {
            email: this.state.email,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            password: this.state.password
        }
        let hostString = `http://localhost:5214/register`;
        let queryString = `email=${this.state.email}&firstname=${this.state.firstname}&lastname=${this.state.lastname}&password=${this.state.password}`;
        console.log(`request: ${hostString}?${queryString}`)
        try {
            this.setState({ isFormSended: true });
            let response = await fetch(`${hostString}?${queryString}`, {
                method: "POST",
                mode: "no-cors"
            });
        }
        catch (error) {
            this.setState({isError: true });
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
    changeFirstName(event) {
        let value = event.target.value;
        this.setState({ firstname: value })
        if (value.length > 20) {
            event.target.setCustomValidity("Не более 20 символов");
        }
        else {
            event.target.setCustomValidity("");
        }
        if (event.target.validity.valid === true) {
            this.setState({ firstnameValid: true });
        }
        else {
            this.setState({ firstnameValid: false });
        }
    }
    changeLastName(event) {
        let value = event.target.value;
        this.setState({ lastname: value })
        if (value.length > 20) {
            event.target.setCustomValidity("Не более 20 символов");
        }
        else {
            event.target.setCustomValidity("");
        }
        if (event.target.validity.valid === true) {
            this.setState({ lastnameValid: true });
        }
        else {
            this.setState({ lastnameValid: false });
        }
    }
    changePassword(event) {
        this.setState({ password: event.target.value })
        this.validatePassword();
    }
    changePasswordRepeat(event) {
        this.setState({ repeatPassword: event.target.value })
        this.validatePassword();
    }
    validatePassword(){
        let password = this.passwordInput.current;
        let repeatPassword = this.repeatPasswordInput.current;
        if (password.value.length < 6) {
            password.setCustomValidity("Слишком короткий");
        }
        else {
            password.setCustomValidity("");
        }
        if (password.value !== repeatPassword.value) {
            repeatPassword.setCustomValidity("Пароли не совпадают");
        }
        else {
            repeatPassword.setCustomValidity("");
        }
        if (password.validity.valid === true) {
            this.setState({ passwordValid: true });
        }
        else {
            this.setState({ passwordValid: false });
        }
        if (repeatPassword.validity.valid === true) {
            this.setState({ repeatPasswordValid: true });
        }
        else {
            this.setState({ repeatPasswordValid: false });
        }
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
            let firstNameClass = this.state.firstnameValid === true ? "validFormField" : "invalidFormField";
            let lastNameClass = this.state.lastnameValid === true ? "validFormField" : "invalidFormField";
            let passwordClass = this.state.passwordValid === true ? "validFormField" : "invalidFormField";
            let repeatPasswordClass = this.state.repeatPasswordValid === true ? "validFormField" : "invalidFormField";
            return <>
                <form id="registerForm" method="post" action="http://localhost:5214/register" onSubmit={this.submitForm}>
                    <div className={emailClass}>
                        <label>E-Mail:</label>
                        <input type="email" name="email" ref={this.emailInput} value={this.state.name} onChange={this.changeEmail} required />
                    </div>
                    <div className={firstNameClass}>
                        <label>Имя:</label>
                        <input type="text" name="firstname" value={this.state.firstname} onChange={this.changeFirstName} />
                    </div>
                    <div className={lastNameClass}>
                        <label>Фамилия:</label>
                        <input type="text" name="lastname" value={this.state.lastname} onChange={this.changeLastName} />
                    </div>
                    <div className={passwordClass}>
                        <label>Пароль:</label>
                        <input type="password" ref={this.passwordInput} name="password" value={this.state.password} onChange={this.changePassword} required />
                    </div>
                    <div className={repeatPasswordClass}>
                        <label>Повторите пароль:</label>
                        <input type="password" ref={this.repeatPasswordInput} value={this.state.repeatPassword} onChange={this.changePasswordRepeat} required />
                    </div>
                    <p><input type="submit" value="Регистрация" /></p>
                </form>
            </>
        }
    }
}
  
export { RegisterForm };