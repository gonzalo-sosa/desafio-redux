import { connect } from 'react-redux';
import Form from '../common/form/form';
import Joi from 'joi-browser';
import { updateBoard } from '@/store/boards';

class EditBoardForm extends Form {
  state = {
    data: {
      title: null,
    },
    errors: {},
  };
  schema = {
    title: Joi.string().min(3).max(50).required().label('Título'),
  };

  doSubmit = () => {
    this.props.updateBoard({
      ...this.state.data,
      id: this.props.boardId,
    });
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

const mapDispatchToProps = (dispatch) => ({
  updateBoard: (board) => dispatch(updateBoard(board)),
});

export default connect(null, mapDispatchToProps)(EditBoardForm);
