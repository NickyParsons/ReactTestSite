const React = require("react");
  
class RegisterForm extends React.Component{
 
    constructor(props) {
        super(props);
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
    changeEmail(event) {
        let value = event.target.value;
        this.setState({ email: value });
        this.props.requestForm.email = event.target.value;
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
        this.props.requestForm.firstName = event.target.value;
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
        this.props.requestForm.lastName = event.target.value;
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
        this.props.requestForm.password = event.target.value;
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
                <form id="registerForm" method="post" action="http://localhost:5214/register" onSubmit={this.props.submitHandler}>
                    <div className={emailClass}>
                        <label htmlFor="email">E-Mail:</label>
                        <input type="email" id="email" name="email" ref={this.emailInput} value={this.state.name} onChange={this.changeEmail} required />
                    </div>
                    <div className={firstNameClass}>
                        <label htmlFor="firstname">Имя:</label>
                        <input type="text" id="firstname" name="firstname" value={this.state.firstname} onChange={this.changeFirstName} />
                    </div>
                    <div className={lastNameClass}>
                        <label htmlFor="lastname">Фамилия:</label>
                        <input type="text" id="lastname" name="lastname" value={this.state.lastname} onChange={this.changeLastName} />
                    </div>
                    <div className={passwordClass}>
                        <label htmlFor="password">Пароль:</label>
                        <input type="password" ref={this.passwordInput} id="password" name="password" value={this.state.password} onChange={this.changePassword} required />
                    </div>
                    <div className={repeatPasswordClass}>
                        <label htmlFor="repeatPassword">Повторите пароль:</label>
                        <input type="password" ref={this.repeatPasswordInput} id="repeatPassword" value={this.state.repeatPassword} onChange={this.changePasswordRepeat} required />
                    </div>
                    <p><input type="submit" value="Регистрация" /></p>
                </form>
            </>
        }
    }
}
  
export { RegisterForm };