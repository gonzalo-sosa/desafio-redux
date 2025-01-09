import Joi from 'joi-browser';
import Form from './common/form/form';
import LoadIcon from './common/icons/load-icon';
import iconNames from './common/icons/icon-names';

class Search extends Form {
  state = {
    data: {
      query: '',
    },
    errors: {},
  };

  schema = {
    query: Joi.string().min(3).max(50).required().label('Query'),
  };

  // onSubmit = () => {
  //   this.props.onSearch(this.state.data.query);
  // };

  render() {
    return (
      <search>
        <form onSubmit={this.handleSubmit} className="form-inline my-2 my-lg-0">
          <div className="input-group">
            <label htmlFor="query" className="input-group-text">
              <LoadIcon
                name={iconNames.SEARCH}
                width={24}
                height={24}
                fill="#000"
              />
            </label>
            <input
              type="text"
              id="query"
              name="query"
              className="form-control mr-sm-2"
              placeholder="Buscar"
            />
          </div>
        </form>
      </search>
    );
  }
}

export default Search;
