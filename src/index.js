import React from 'react';
import ReactDOM from 'react-dom';
import BurritoType from './BurritoType';

const mountNode = document.createElement('div');
mountNode.id = 'app';

const body = document.body;
if (body) body.appendChild(mountNode);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <BurritoType
          text={this.state.text}
        />
        <div>
          <input type="text" onChange={(e) => this.setState({ text: e.target.value })} />
        </div>
      </div>
    );
  }
}
ReactDOM.render((
  <App />
), mountNode);
