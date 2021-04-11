import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./Login.module.css";
import * as actions from "../store/actions/index";

class Login extends Component {
  state = {
    loginForm: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-mail",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
  };

  componentDidMount() {
    // this.props.onLogin("test@test.com", "test1234");
  }

  formSubmitHandler = (event) => {
    event.preventDefault();
    this.props.onLogin(
      this.state.loginForm.email.value,
      this.state.loginForm.password.value
    );
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  };

  inputChangedHandler = (event) => {
    // console.log(event.target.type);
    let inputIdentifier = event.target.type;
    let updatedForm = { ...this.state.loginForm };
    let updatedFormElement = { ...updatedForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedForm[inputIdentifier] = updatedFormElement;
    let formIsValid = true;
    for (let inputs in updatedForm) {
      // console.log(updatedOrderForm[inputs].valid);

      formIsValid = updatedForm[inputs].valid && formIsValid;
    }
    // console.log(updatedFormElement);
    // console.log(updatedForm);
    this.setState({ loginForm: updatedForm, formIsValid: formIsValid });
  };

  render() {
    let errorMessage = null;

    if (this.props.errorMessage) {
      errorMessage = (
        <p className={styles.ErrorMessage}>{this.props.errorMessage}</p>
      );
    }

    const formElementsArray = [];
    for (let key in this.state.loginForm)
      formElementsArray.push({
        id: key,
        config: this.state.loginForm[key],
      });

    let form = formElementsArray.map((formElement) => (
      <input
        className={
          !this.state.loginForm[formElement.id].touched ||
          this.state.loginForm[formElement.id].valid
            ? `${styles.Input}`
            : ` ${styles.InputFalse}`
        }
        placeholder={formElement.config.elementConfig.placeholder}
        type={formElement.config.elementConfig.type}
        onChange={(event) => this.inputChangedHandler(event, formElement.id)}
        key={formElement.id}
      />
    ));

    return (
      <div className={styles.Login}>
        {/* <h1>Login</h1> */}
        {errorMessage}
        <form className={styles.LoginForm} onSubmit={this.formSubmitHandler}>
          {form}
          <button
            className={
              this.state.formIsValid
                ? `${styles.Button}`
                : ` ${styles.ButtonFalse}`
            }
            type="button"
            disabled={!this.state.formIsValid}
            onClick={this.formSubmitHandler}
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userCredential: state.authenticationReducer.userCredential,
    errorMessage: state.authenticationReducer.loginErrorMessage,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (email, password) =>
      dispatch(actions.loginAttempt(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
