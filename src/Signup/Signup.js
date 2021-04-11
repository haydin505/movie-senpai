import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./Signup.module.css";
import * as actions from "../store/actions/index";
class Signup extends Component {
  state = {
    signupForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Full Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
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

  formSubmitHandler = (event) => {
    event.preventDefault();
    this.props.onSignup(
      this.state.signupForm.name.value,
      this.state.signupForm.email.value,
      this.state.signupForm.password.value
    );
  };

  inputChangedHandler = (event, inputIdentifier) => {
    // console.log(event.target.type);
    let updatedForm = { ...this.state.signupForm };
    let updatedFormElement = { ...updatedForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedForm[inputIdentifier] = updatedFormElement;
    // console.log(updatedFormElement);
    // console.log(updatedForm);
    this.setState({ signupForm: updatedForm });
  };

  render() {
    let errorMessage = null;

    if (this.props.errorMessage) {
      errorMessage = (
        <p className={styles.ErrorMessage}>{this.props.errorMessage}</p>
      );
    }

    const formElementsArray = [];
    for (let key in this.state.signupForm)
      formElementsArray.push({
        id: key,
        config: this.state.signupForm[key],
      });

    let form = formElementsArray.map((formElement) => (
      <input
        className={styles.Input}
        placeholder={formElement.config.elementConfig.placeholder}
        type={formElement.config.elementConfig.type}
        onChange={(event) => this.inputChangedHandler(event, formElement.id)}
        key={formElement.id}
      />
    ));

    return (
      <div className={styles.Signup}>
        {errorMessage}
        {/* <h1>Login</h1> */}
        <form className={styles.SignupForm} onSubmit={this.formSubmitHandler}>
          {form}
          <input className={styles.Input} type="submit" value="Sign-up" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.authenticationReducer.signupErrorMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignup: (name, email, password) =>
      dispatch(actions.signupAttempt(name, email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
