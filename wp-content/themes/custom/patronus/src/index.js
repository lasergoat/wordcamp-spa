import React from 'react';
import ReactDOM from 'react-dom';
import 'isomorphic-fetch';

function mapPatronus(patronus) {
  return {
    id: patronus.id,
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

  componentDidMount() {
    fetch('http://homepress.app/api/get_posts/?post_type=patronus&count=99')
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          patronuses: res.posts.map(mapPatronus)
        });
      });
  }

  render() {
    return (
      <div className="pt-app">
        <div className="pt-field">
          <input type="text" placeholder="Search for a Patronus..." id="" className="pt-input"/>
        </div>
        <ul className="pt-list">
        { this.state.patronuses.map((patronus) => 
          <li className="pt-item" key={patronus.id}>
            <strong>{patronus.type}</strong> - 
            <span dangerouslySetInnerHTML={{__html: patronus.description}}></span>
          </li>
        )}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));