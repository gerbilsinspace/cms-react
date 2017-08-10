import React, { Component } from 'react';
import { Form, Control } from 'react-redux-form';
import addStyle from '../../helpers/addStyle';
import { required } from '../../helpers/error';

class CreateContentForm extends Component {
  constructor(props) {
    super(props);

    this.uniqueName = this.uniqueName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      error: ''
    };
  }

  uniqueName(val) {
    const { names } = this.props;

    if (!names) return true;

    for (const name in names) {
      if (name === val) return false;
    }

    return true;
  }

  handleSubmit({ name }) {
    const { firebase, clearAction, itemUrl } = this.props;

    firebase.push(itemUrl, {'name': name}).catch(err => {
      this.setState({
        error: err.message
      });
    });
    clearAction();
  }

  render() {
    const { submitFailed, nameErrors, itemName } = this.props;
    const isError = this.state.error || (submitFailed && (nameErrors.required || nameErrors.uniqueName));
    const firebaseErrorStyle = addStyle(this.state.error);
    const formErrorStyle = addStyle(isError);
    const nameRequiredStyle = addStyle(submitFailed && nameErrors.required);
    const uniqueNameStyle = addStyle(submitFailed && nameErrors.uniqueName);

    return (
      <div>
        <Form model={`create${itemName}`}
              onSubmit={val => {this.handleSubmit(val)}}
              validators={{
                name: {
                  required,
                  uniqueName: this.uniqueName
                }
              }}
        >
          <div style={formErrorStyle}>
            <h2>Error</h2>
            <p>You have one or more errors below</p>
            <div style={firebaseErrorStyle}>{ this.state.error }</div>
          </div>

          <div>
            <label htmlFor='name'>Name:</label>
            <Control type='text' model='.name' />
            <div style={nameRequiredStyle}>Please provide a name</div>
            <div style={uniqueNameStyle}>Please provide a unique menu name</div>
          </div>

          <button>Submit</button>
        </Form>
      </div>
    );
  }
};

export default CreateContentForm;
