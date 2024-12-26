import Form from './common/form/form';
import Joi from 'joi-browser';

class EditCardForm extends Form {
  state = {
    data: { title: '' },
    errors: {},
  };

  schema = {
    title: Joi.string().min(3).max(50).required().label('Title'),
  };

  doSubmit = () => {
    this.props.updateCard(this.state.data);
    this.props.onSubmit();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} {...this.props.form}>
        {this.renderInput({ name: 'title', label: 'Título', autoFocus: true })}
      </form>
    );
  }
}

export default EditCardForm;
