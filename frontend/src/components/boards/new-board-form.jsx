import { connect } from 'react-redux';
import { addBoard } from '@/store/boards';
import Form from '@/components/common/form/form';
import Joi from 'joi-browser';
import userContext from '../../context/user-context';

class NewBoardForm extends Form {
  static contextType = userContext;

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
    this.props.addBoard({
      ...this.state.data,
      userEmail: this.context.user.email,
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
  addBoard: (data) => dispatch(addBoard(data)),
});

export default connect(null, mapDispatchToProps)(NewBoardForm);
