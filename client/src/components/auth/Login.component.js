import React, { Component } from "react";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormText
} from "reactstrap";
import { connect } from "react-redux";
import { login } from "../../redux/actions/auth.actions";
import { withRouter } from "react-router-dom";

class Login extends Component {
  state = {
    email: "",
    password: "",
    msg: null
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;

    const user = {
      email,
      password
    };

    // Attempt to login
    this.props.login(user);

    this.props.history.push("/schedules");
  };

  render() {
    return (
      <Container className="mt-3">
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              onChange={this.onChange}
            />
            <FormText color="muted">
              Forgotten your password? Contact an Operator for a password reset.
            </FormText>
          </FormGroup>
          <Button block>Login</Button>
        </Form>
      </Container>
    );
  }
}

export default connect(null, { login })(withRouter(Login));
