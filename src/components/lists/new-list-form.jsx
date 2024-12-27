import { connect } from 'react-redux';
import Form from '@/components/common/form/form';
import Joi from 'joi-browser';
import { addList } from '@/store/lists';
import { cleanInput } from '@/utils/clean-input';
import { detectHTMLTags } from '@/utils/clean-input';

class NewListForm extends Form {
  state = {
    data: { title: '' },
    errors: {},
  };

  schema = {
    title: Joi.string().min(3).max(50).required().label('Título'),
  };

  doSubmit = () => {
    let { title } = this.state.data;

    title = cleanInput(title);

    if (detectHTMLTags(title)) {
      this.setState({ errors: { title: 'No puedes usar etiquetas HTML' } });
      return;
    }

    this.props.addTask({ title, boardId: this.props.boardId });
    this.setState({ showForm: false });

    this.props.onSubmit();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput({
          name: 'title',
          placeholder: 'Introduce el nombre de la lista',
          autoFocus: true,
          className: 'form-control',
        })}
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addList: (list) => dispatch(addList(list)),
});

export default connect(null, mapDispatchToProps)(NewListForm);
