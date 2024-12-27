import Form from '@/components/common/form/form';
import Joi from 'joi-browser';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addUser } from '@/store/users';

class NewUserForm extends Form {
  state = {
    data: {
      name: '',
      email: '',
      password: '',
      address: '',
      phone: '',
    },
    errors: {},
  };

  schema = {
    name: Joi.string().min(3).max(50).required().label('Nombre'),
    email: Joi.string().min(3).max(50).required().label('Correo'),
    password: Joi.string().min(3).max(50).required().label('Contraseña'),
    address: Joi.string()
      .min(3)
      .max(50)
      .valid('')
      .optional()
      .label('Dirección'),
    phone: Joi.string().min(3).max(50).valid('').optional().label('Teléfono'),
  };

  doSubmit = () => {
    this.props.addUser(this.state.data);
    this.props.onSubmit();
  };

  render() {
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
          name: 'password',
          label: 'Contraseña',
          type: 'password',
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
      </form>
    );
  }
}

NewUserForm.propTypes = {
  form: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addUser: (user) => dispatch(addUser(user)),
});

export default connect(null, mapDispatchToProps)(NewUserForm);
