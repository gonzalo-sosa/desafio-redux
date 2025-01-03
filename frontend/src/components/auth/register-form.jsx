import Form from '../common/form/form';
import Joi from 'joi-browser';
import * as userService from '@/services/userService';
import auth from '@/services/authService';

class RegisterForm extends Form {
  state = {
    data: {
      email: '',
      password: '',
      name: '',
    },
    errors: {},
  };

  schema = {
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().required().min(5).label('Password'),
    name: Joi.string().required().label('Name'),
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers['x-auth-token']);
      window.location = '/';
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors['username'] = error.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput({ name: 'email', label: 'Email', type: 'email' })}
          {this.renderInput({
            name: 'password',
            label: 'Password',
            type: 'password',
          })}
          {this.renderInput({ name: 'name', label: 'Name' })}
          {this.renderButton('Register')}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
