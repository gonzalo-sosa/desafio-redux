import Form from '@/components/common/form/form';
import Joi from 'joi-browser';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addUser, updateUser } from '@/store/users';

const ACTIONS = {
  ADD: 'add',
  UPDATE: 'update',
};

class UserForm extends Form {
  state = {
    data: {
      name: '',
      email: '',
      address: '',
      phone: '',
    },
    errors: {},
  };

  schema = {
    name: Joi.string().min(3).max(50).required().label('Nombre'),
    email: Joi.string().min(3).max(50).required().label('Correo'),
    address: Joi.string()
      .min(3)
      .max(50)
      .valid('')
      .optional()
      .label('Dirección'),
    phone: Joi.string().min(3).max(50).valid('').optional().label('Teléfono'),
  };

  doSubmit = () => {
    const { action } = this.props;

    if (action === ACTIONS.ADD) {
      if (this.state.data.password !== this.state.data.passwordConfirmation) {
        this.setState({
          errors: { passwordConfirmation: 'Las contraseñas no coinciden' },
        });
        return;
      }

      // TODO: buscar correo y validar que sea único

      this.props.addUser(this.state.data);
    }

    if (action === ACTIONS.UPDATE) {
      // TODO: buscar contraseña y validar que sea la correcta antes de modificarla

      this.props.updateUser({ ...this.state.data, id: this.props.user.id });
    }

    this.props.onSubmit();
  };

  componentDidMount() {
    const { action } = this.props;

    if (action === ACTIONS.ADD) {
      Object.assign(this.state.data, {
        password: '',
        passwordConfirmation: '',
      });
      Object.assign(this.schema, {
        password: Joi.string().min(3).max(50).required().label('Contraseña'),
        passwordConfirmation: Joi.string()
          .min(3)
          .max(50)
          .required()
          .label('Confirmar contraseña'),
      });
    }

    if (action === ACTIONS.UPDATE) {
      Object.assign(this.state.data, {
        oldPassword: '',
        newPassword: '',
      });
      Object.assign(this.schema, {
        oldPassword: Joi.string()
          .min(3)
          .max(50)
          .required()
          .label('Contraseña antigua'),
        newPassword: Joi.string()
          .min(3)
          .max(50)
          .required()
          .label('Contraseña nueva'),
      });
    }
  }

  render() {
    const { action } = this.props;

    return (
      <form onSubmit={this.handleSubmit} {...this.props.form}>
        {this.renderInput({
          name: 'name',
          label: 'Nombre',
          autoFocus: true,
        })}
        {this.renderInput({
          name: 'email',
          label: 'Correo',
          type: 'email',
        })}
        {this.renderInput({
          name: 'address',
          label: 'Dirección',
          type: 'text',
        })}
        {this.renderInput({
          name: 'phone',
          label: 'Teléfono',
          type: 'tel',
        })}
        {action === ACTIONS.ADD && (
          <>
            {this.renderInput({
              name: 'password',
              label: 'Contraseña',
              type: 'password',
            })}
            {this.renderInput({
              name: 'passwordConfirmation',
              label: 'Confirmar contraseña',
              type: 'password',
            })}
          </>
        )}
        {action === ACTIONS.UPDATE && (
          <>
            {this.renderInput({
              name: 'oldPassword',
              label: 'Antigua Contraseña',
              type: 'password',
            })}
            {this.renderInput({
              name: 'newPassword',
              label: 'Nueva Contraseña',
              type: 'password',
            })}
          </>
        )}
      </form>
    );
  }
}

UserForm.propTypes = {
  form: PropTypes.object.isRequired,
  action: PropTypes.oneOf(Object.values(ACTIONS)).isRequired,
  user: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => ({
  addUser: (user) => dispatch(addUser(user)),
  updateUser: (user) => dispatch(updateUser(user)),
});

export default connect(null, mapDispatchToProps)(UserForm);
