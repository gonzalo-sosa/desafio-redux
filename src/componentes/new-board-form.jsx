import { connect } from 'react-redux';
import { addBoard, loadBoards } from '../store/boards';
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
    title: Joi.string().required().label('Title'),
  };

  doSubmit = () => {
    this.props.addBoard(this.state.data);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput({ name: 'title', label: 'Título' })}
        {this.renderButton('Crear')}
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  boards: state.entities.boards.list,
});

const mapDispatchToProps = (dispatch) => ({
  addBoard: () => dispatch(addBoard()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewBoardForm);
