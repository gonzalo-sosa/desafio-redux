import Form from '@/components/common/form/form';
import Joi from 'joi-browser';
import { connect } from 'react-redux';
import { updateUser } from '@/store/users';

class EditUserForm extends Form {
  state = {
    data: {
      name: '',
      email: '',
      password: '',
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
    password: Joi.string().min(3).max(50).required().label('Contraseña'),
  };

  doSubmit = () => {
    this.props.updateUser({ ...this.state.data, id: this.props.user.id });
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
          name: 'address',
          label: 'Dirección',
          type: 'text',
        })}
        {this.renderInput({
          name: 'phone',
          label: 'Teléfono',
          type: 'tel',
        })}
        {this.renderInput({
          name: 'password',
          label: 'Contraseña',
          type: 'password',
        })}
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateUser: (user) => dispatch(updateUser(user)),
});

export default connect(null, mapDispatchToProps)(EditUserForm);
