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

  inputChangedHandler = (event) => {
    // console.log(event.target.type);
    let inputIdentifier = event.target.type;
    let updatedForm = { ...this.state.loginForm };
    let updatedFormElement = { ...updatedForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedForm[inputIdentifier] = updatedFormElement;
    // console.log(updatedFormElement);
    // console.log(updatedForm);
    this.setState({ loginForm: updatedForm });
  };

  render() {
    let errorMessage = null;

    if (this.props.errorMessage) {
      errorMessage = (
        <p className={styles.ErrorMessage}>{this.props.errorMessage}</p>
      );
    }
    return (
      <div className={styles.Login}>
        {/* <h1>Login</h1> */}
        {errorMessage}
        <form className={styles.LoginForm} onSubmit={this.formSubmitHandler}>
          <input
            className={styles.Input}
            onChange={this.inputChangedHandler}
            type="email"
            placeholder="Your e-mail"
          />
          <input
            className={styles.Input}
            onChange={this.inputChangedHandler}
            type="password"
            placeholder="Password"
          />
          <input className={styles.Input} type="submit" value="Sign-in" />
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
