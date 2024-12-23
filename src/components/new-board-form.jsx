import { connect } from 'react-redux';
import { addBoard } from '../store/boards';
import Form from './common/form/form';
import Joi from 'joi-browser';

class NewBoardForm extends Form {
  constructor(props) {
    super(props);
  }

  state = {
    data: { title: '' },
    errors: {},
  };

  schema = {
    title: Joi.string().min(3).max(50).required().label('Title'),
  };

  doSubmit = () => {
    this.props.addBoard(this.state.data);
    this.props.onSubmit();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} {...this.props}>
        {this.renderInput({ name: 'title', label: 'Título', autoFocus: true })}
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  boards: state.entities.boards.list,
});

const mapDispatchToProps = (dispatch) => ({
  addBoard: (data) => dispatch(addBoard(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewBoardForm);
