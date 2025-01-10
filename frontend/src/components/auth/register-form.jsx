import Form from '../common/form/form';
import Joi from 'joi-browser';
import auth from '@/services/authService';
import LoadIcon from '../common/icons/load-icon';
import iconNames from '../common/icons/icon-names';

class RegisterForm extends Form {
  state = {
    data: {
      email: '',
      password: '',
    },
    errors: {},
  };

  schema = {
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().required().min(5).label('Password'),
  };

  doSubmit = async () => {
    try {
      const response = await auth.register(this.state.data);
      auth.loginWithJwt(response.data.jwt);
      window.location = '/';
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors['email'] = error.response.data.message;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div
        className="d-flex flex-column"
        style={{ width: '55%', maxWidth: '500px' }}
      >
        <div className="d-flex flex-column align-items-center mb-3">
          <LoadIcon name={iconNames.LOGO_TRELLO} height={120} width={120} />
          <h1 className="fs-6">Regístrate para continuar</h1>
        </div>
        <form
          onSubmit={this.handleSubmit}
          className="mt-2 mb-4 d-flex flex-column"
        >
          {this.renderInput({
            name: 'email',
            placeholder: 'Introduce tu correo electrónico',
            type: 'email',
          })}
          {this.renderInput({
            name: 'password',
            placeholder: 'Introduce tu contraseña',
            type: 'password',
          })}
          <span className="mt-1 mb-2 text-muted" style={{ fontSize: '12px' }}>
            Al registrarme, acepto las{' '}
            <a className="link">Condiciones del servicio</a> de Atlassian Cloud
            y su <a className="link">Política de privacidad.</a>
          </span>
          {this.renderButton('Registrarse')}
        </form>
        <div className="d-flex flex-column align-items-center">
          <span className="text-muted">O continúa con</span>
          <button className="btn border w-100 my-1 fw-bold">
            <img
              src="https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/google-logo.5867462c.svg"
              alt="Logo de Google"
              width={24}
              className="me-2"
            />
            Google
          </button>
          <button className="btn border w-100 my-1 fw-bold">
            <img
              src="https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/microsoft-logo.c73d8dca.svg"
              alt="Logo de Microsoft"
              width={24}
              className="me-2"
            />
            Microsoft
          </button>
          <button className="btn border w-100 my-1 fw-bold">
            <img
              src="https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/apple-logo.54e0d711.svg"
              alt="Logo de Apple"
              width={24}
              className="me-2"
            />
            Apple
          </button>
          <button className="btn border w-100 my-1 fw-bold">
            <img
              src="https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/slack-logo.5d730c10.svg"
              alt="Logo de Slack"
              width={24}
              className="me-2"
            />
            Slack
          </button>
        </div>
        <div className="d-flex flex-column align-items-center">
          <a href="/login" className="link">
            ¿Ya tienes una cuenta? Inicia sesión
          </a>
          <br />
        </div>
      </div>
    );
  }
}

export default RegisterForm;
