import { connect } from 'react-redux';
import Form from '../common/form/form';
import { updateList } from '@/store/lists';
import Joi from 'joi-browser';

class EditListForm extends Form {
  state = {
    data: {
      title: this.props.list.title,
    },
    errors: {},
  };

  schema = {
    title: Joi.string().min(3).max(50).required().label('Título'),
  };

  doSubmit = () => {
    this.props.updateList({
      ...this.state.data,
      id: this.props.list.id,
    });
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
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateList: (list) => dispatch(updateList(list)),
});

export default connect(null, mapDispatchToProps)(EditListForm);
