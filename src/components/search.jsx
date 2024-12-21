import Joi from 'joi-browser';
import Form from './common/form/form';
import SearchIcon from './common/icons/search-icon';

class Search extends Form {
  state = {
    data: {
      query: '',
    },
    errors: {},
  };

  schema = {
    query: Joi.string().required().label('Query'),
  };

  render() {
    return (
      <search>
        <form onSubmit={this.handleSubmit} className="form-inline my-2 my-lg-0">
          <div className="input-group">
            <label htmlFor="query" className="input-group-text">
              <SearchIcon />
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
