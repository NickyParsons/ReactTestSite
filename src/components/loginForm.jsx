const React = require("react");
  
class LoginForm extends React.Component{
 
    constructor(props) {
        super(props);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.state = {
            email: "",
            emailValid: true,
            password: ""
        };
    }
    changeEmail(event) {
        this.setState({ email: event.target.value });
        this.props.requestForm.email = event.target.value;
        if (event.target.validity.valid === true) {
            this.setState({ emailValid: true });
        }
        else {
            this.setState({ emailValid: false });
        }
    }
    changePassword(event) {
        this.setState({ password: event.target.value });
        this.props.requestForm.password = event.target.value;
    }

    render() {
        let emailClass = this.state.emailValid === true ? "validFormField" : "invalidFormField";
        return <>
            <form id="loginForm" method="post" action="http://localhost:5214/login" onSubmit={this.props.submitHandler}>
                <div className={emailClass}>
                    <label htmlFor="loginEmail">E-Mail:</label>
                    <input type="email" id="loginEmail" name="email" value={this.state.email} onChange={this.changeEmail} required />
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
  
export { LoginForm };