import Form from './common/form/form';
import Joi from 'joi-browser';
import auth from '@/services/authService';
import { Redirect } from 'react-router-dom';

class LoginForm extends Form {
  state = {
    data: {
      username: '',
      password: '',
    },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password'),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);

      const { state } = this.props.location;

      window.location = state ? state.from.pathname : '/'; // full reload
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors['username'] = error.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div className="container mt-5">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput({
            name: 'username',
            label: 'Username',
            autoFocus: true,
          })}
          {this.renderInput({
            name: 'password',
            label: 'Password',
            type: 'password',
          })}
          {this.renderButton('Login')}
        </form>
      </div>
    );
  }
}

export default LoginForm;
