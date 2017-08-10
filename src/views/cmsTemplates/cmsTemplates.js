import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { Form, Control, actions } from 'react-redux-form';
import { compose } from 'redux';
import CMSLayout from '../../components/cmsLayout';
import CMSListItem from '../../components/cmsListItem';
import addStyle from '../../helpers/addStyle';
import { required } from '../../helpers/error';

class Templates extends Component {
  constructor(props) {
    super(props);

    this.uniqueName = this.uniqueName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      error: ''
    };
  }

  uniqueName(val) {
    const { templates } = this.props;

    if (!templates) {
      return true;
    }

    for (const template in templates) {
      if (templates[template].name === val) {
        return false;
      }
    }

    return true;
  }

  handleSubmit(val) {
    this.props.firebase.push('/templates', {'name': val.name});
    this.props.clearCreateTemplate();
  }

  render() {
    const { submitFailed, nameErrors, templates } = this.props;

    const isError = this.state.error || (submitFailed && (nameErrors.required || nameErrors.uniqueName));
    const firebaseErrorStyle = addStyle(this.state.error);
    const formErrorStyle = addStyle(isError);
    const nameRequiredStyle = addStyle(submitFailed && nameErrors.required);
    const uniqueNameStyle = addStyle(submitFailed && nameErrors.uniqueName);

    const templateList = !isLoaded(templates) ? 'Loading' : isEmpty(templates) ? 'Please create a template' : Object.keys(templates).map((key, id) => {
      return (
        <CMSListItem key={key} name={templates[key].name} itemKey={key} type="templates" />
      );
    });

    return (
      <CMSLayout>
        <article>
          <h1>Templates</h1>

          <div>
            <h2>Create Template</h2>
            <Form model="createTemplate"
                  onSubmit={val => {this.handleSubmit(val)}}
                  validators={{
                    name: { required, uniqueName: this.uniqueName }
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

          <div>
            <h2>Edit Templates</h2>
            { templateList }
          </div>
        </article>
      </CMSLayout>
    );
  }
};

const mapStateToProps = state => ({
  templates: state.firebase.ordered.templates,
  submitFailed: state.forms.createTemplate.$form.submitFailed,
  nameErrors: state.forms.createTemplate.name.errors
});

const mapDispatchToProps = dispatch => ({
  clearCreateTemplate: () => {
    dispatch(actions.change('createTemplate.name', ''));
  }
});

export default compose(
  firebaseConnect([
    '/templates#orderByChild=name'
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(Templates);
