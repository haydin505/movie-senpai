import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./Login.module.css";
import * as actions from "../../store/actions/index";

class Login extends Component {
  state = {
    email: null,
    password: null,
  };

  componentDidMount() {
    this.props.onLogin("test@test.com", "test1234");
  }

  render() {
    console.log(this.props.userCredential);
    return (
      <div className={styles.Login}>
        <h1>Login</h1>
        <form
          onSubmit={() =>
            this.props.onLogin(this.state.email, this.state.password)
          }
        ></form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userCredential: state.authenticationReducer.userCredential,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (email, password) =>
      dispatch(actions.loginAttempt(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
