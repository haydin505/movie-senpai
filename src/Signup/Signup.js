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
          placeholder: "Your E-Mail",
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

  formSubmitHandler = (event) => {
    event.preventDefault();
    // console.log("a");
    this.props.onSignup(
      this.state.signupForm.name.value,
      this.state.signupForm.email.value,
      this.state.signupForm.password.value
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
  inputChangedHandler = (event, inputIdentifier) => {
    // console.log(event.target.type);
    let updatedForm = { ...this.state.signupForm };
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
    this.setState({ signupForm: updatedForm, formIsValid: formIsValid });
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
        className={
          !this.state.signupForm[formElement.id].touched ||
          this.state.signupForm[formElement.id].valid
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
      <div className={styles.Signup}>
        {errorMessage}
        {/* <h1>Login</h1> */}
        <form className={styles.SignupForm} onSubmit={this.formSubmitHandler}>
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
            Sign-up
          </button>
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
