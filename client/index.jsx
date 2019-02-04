import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import FormContainer from './containers/FormContainer'

class App extends Component {
  render() {
    return (
      <div className="col-md-6">
        <h3> Bob's Banana Budget </h3>
        <FormContainer />
      </div>
    );
  }
}

ReactDOM.render(
    <App />,
  document.getElementById('root'),
);
