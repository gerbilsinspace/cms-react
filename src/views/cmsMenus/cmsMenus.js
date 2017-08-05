import './cmsMenus.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { Form, Control, actions } from 'react-redux-form';
import { compose } from 'redux';
import CMSLayout from '../../components/cmsLayout/cmsLayout';
import CMSMenuItem from '../../components/cmsMenuItem/cmsMenuItem';
import addStyle from '../../helpers/addStyle';
import { required } from '../../helpers/error';

class Menus extends Component {
  constructor(props) {
    super(props);

    this.uniqueName = this.uniqueName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      error: ''
    };
  }

  uniqueName(val) {
    const { menus } = this.props;

    if (!menus) {
      return true;
    }

    for (const menu in menus) {
      if (menus[menu].name === val) {
        return false;
      }
    }

    return true;
  }

  handleSubmit(val) {
    this.props.firebase.push('/menus', {'name': val.name});
    this.props.clearCreateMenu();
  }

  render() {
    const { submitFailed, nameErrors, menus } = this.props;

    const isError = this.state.error || (submitFailed && (nameErrors.required || nameErrors.uniqueName));
    const firebaseErrorStyle = addStyle(this.state.error);
    const formErrorStyle = addStyle(isError);
    const nameRequiredStyle = addStyle(submitFailed && nameErrors.required);
    const uniqueNameStyle = addStyle(submitFailed && nameErrors.uniqueName);

    const menuList = !isLoaded(menus) ? 'Loading' : isEmpty(menus) ? 'Please create a menu' : Object.keys(menus).map((key, id) => (
      <CMSMenuItem key={key} id={id} menu={menus[key]} />
    ));

    return (
      <CMSLayout>
        <article>
          <h1>Menus</h1>

          <div>
            <h2>Create Menu</h2>
            <Form model="createMenu"
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
            <h2>Edit Menus</h2>
            { menuList }
          </div>
        </article>
      </CMSLayout>
    );
  }
};

const mapStateToProps = state => ({
  menus: state.firebase.data.menus,
  submitFailed: state.forms.createMenu.$form.submitFailed,
  nameErrors: state.forms.createMenu.name.errors
});

const mapDispatchToProps = dispatch => ({
  clearCreateMenu: () => {
    dispatch(actions.change('createMenu.name', ''));
  }
});

export default compose(
  firebaseConnect(['/menus']),
  connect(mapStateToProps, mapDispatchToProps)
)(Menus)
