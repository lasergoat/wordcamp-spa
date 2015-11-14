import React from 'react';
import ReactDOM from 'react-dom';
import 'isomorphic-fetch';
import debounce from 'lodash/function/debounce';

function mapPatronus(patronus) {
  return {
    id: patronus.id,
    visible: true,
    ...patronus.acf
  };
}

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      patronuses: []
    };
  }

  handleSearch(term) {
    this.setState({
      patronuses: this.state.patronuses
        .map((patronus) => {
          patronus.visible = term.length
            ? !!~(patronus.description + patronus.type)
              .toUpperCase()
              .indexOf(term.toUpperCase())
            : true;

          return patronus;
        })
    });
  }

  componentDidMount() {
    fetch('/api/get_posts/?post_type=patronus&count=99')
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          patronuses: res.posts.map(mapPatronus)
        });
      });
  }

  renderItem(patronus) {
    return (
      <li className={`pt-item ${patronus.visible ? '' : 'hidden'}`} key={patronus.id}>
        <strong>{patronus.type}</strong> -&nbsp;
        <span dangerouslySetInnerHTML={{__html: patronus.description}}></span>
      </li>
    );
  }

  render() {
    let handleSearch = debounce(this.handleSearch, 200).bind(this);

    return (
      <div className="pt-app">
        <div className="pt-field">
          <input type="text" placeholder="Search for a Patronus..." onChange={(e) => handleSearch(e.target.value)} className="pt-input"/>
        </div>
        <ul className="pt-list">
        { this.state.patronuses.map((patronus) => 
          this.renderItem(patronus)
        )}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));