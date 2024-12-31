import { connect } from 'react-redux';
import Form from '@/components/common/form/form';
import Joi from 'joi-browser';
import PropTypes from 'prop-types';
import { updateCard } from '@/store/cards';

class EditCardForm extends Form {
  state = {
    data: { title: '', description: '' },
    errors: {},
  };

  schema = {
    title: Joi.string().min(3).max(50).required().label('Título'),
    description: Joi.string()
      .allow('')
      .optional()
      .min(3)
      .max(50)
      .label('Descripción'),
  };

  doSubmit = () => {
    this.props.updateCard({ ...this.state.data, id: this.props.card.id });
    this.props.onSubmit();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} {...this.props.form}>
        {this.renderInput({
          name: 'title',
          label: 'Título',
          autoFocus: true,
        })}
        {this.renderInput({
          name: 'description',
          label: 'Descripción',
          placeholder: 'Introduce una descripción más detallada',
        })}
      </form>
    );
  }
}

EditCardForm.propTypes = {
  card: PropTypes.object,
  onSubmit: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  updateCard: (card) => dispatch(updateCard(card)),
});

export default connect(null, mapDispatchToProps)(EditCardForm);
