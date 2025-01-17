import { connect } from 'react-redux';
import Form from '@/components/common/form/form';
import PropTypes from 'prop-types';
import Joi from 'joi-browser';
import { addCard } from '@/store/cards';

class NewCardForm extends Form {
  state = {
    data: { title: '' },
    errors: {},
  };

  schema = {
    title: Joi.string().min(3).max(50).required().label('Title'),
  };

  doSubmit = () => {
    const { title } = this.state.data;

    this.props.addCard({ title, list_id: this.props.listId });
    this.props.onSubmit();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="py-2">
        {this.renderInput({
          name: 'title',
          autoFocus: true,
          className: 'form-control',
        })}
        <div className="d-flex flex-row align-items-center justify-content-start mt-2">
          <button type="submit" className="btn btn-primary">
            Añadir tarjeta
          </button>
          <button
            onClick={() => this.props.onClose()}
            type="button"
            className="btn mx-2"
          >
            X
          </button>
        </div>
      </form>
    );
  }
}

NewCardForm.propTypes = {
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  listId: PropTypes.number,
};

const mapDispatchToProps = (dispatch) => ({
  addCard: (card) => dispatch(addCard(card)),
});

export default connect(null, mapDispatchToProps)(NewCardForm);
