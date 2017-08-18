import React, { Component } from 'react';
import { Form, Control, actions } from 'react-redux-form';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import addStyle from '../../helpers/addStyle';
import { required } from '../../helpers/error';
import CMSLayout from '../../components/cmsLayout';
import CMSListItem from '../../components/cmsListItem';

class CMSPages extends Component {
  constructor(props) {
    super(props);

    this.uniqueName = this.uniqueName.bind(this);
    this.uniqueSlug = this.uniqueSlug.bind(this);
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

  uniqueSlug(val) {
    const { slugs } = this.props;

    if (!slugs) return true;

    for (const slug in slugs) {
      if (slug === val) return false;
    }

    return true;
  }

  handleSubmit({ name, slug }) {
    const { firebase, clearAction, itemUrl } = this.props;

    firebase.push(itemUrl, {
      'name': name,
      'slug': slug
    }).catch(err => {
      this.setState({
        error: err.message
      });
    });
    clearAction();
  }

  render() {
    const { submitFailed, nameErrors, slugErrors, items } = this.props;
    const isError = this.state.error || (submitFailed && (nameErrors.required || nameErrors.uniqueName ||  slugErrors.required || slugErrors.uniqueSlug));
    const firebaseErrorStyle = addStyle(this.state.error);
    const formErrorStyle = addStyle(isError);
    const nameRequiredStyle = addStyle(submitFailed && nameErrors.required);
    const uniqueNameStyle = addStyle(submitFailed && nameErrors.uniqueName);
    const slugRequiredStyle = addStyle(submitFailed && slugErrors.required);
    const uniqueSlugStyle = addStyle(submitFailed && slugErrors.uniqueSlug);

    const itemList = !isLoaded(items) ? 'Loading' : isEmpty(items) ? 'Please create a new page' : Object.keys(items).map((key, id) => (
      <CMSListItem key={key}
                   name={items[id].name}
                   itemKey={items[id].key}
                   type='pages'
      />
    ));

    return (
      <CMSLayout>
        <article>
          <h1>Pages</h1>

          <div>
            <h2>Create Page</h2>
            <div>
              <Form model='createPage'
                    onSubmit={val => {this.handleSubmit(val)}}
                    validators={{
                      name: {
                        required,
                        uniqueName: this.uniqueName
                      },
                      slug: {
                        required,
                        uniqueSlug: this.uniqueSlug
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
                  <div style={uniqueNameStyle}>Please provide a unique name</div>
                </div>

                <div>
                  <label htmlFor='slug'>Slug:</label>
                  <Control type='text' model='.slug' />
                  <div style={slugRequiredStyle}>Please provide a slug</div>
                  <div style={uniqueSlugStyle}>Please provide a unique slug</div>
                </div>

                <button>Submit</button>
              </Form>
            </div>
          </div>

          <div>
            <h2>Edit Pages</h2>
            { itemList }
          </div>
        </article>
      </CMSLayout>
    );
  }
};

const mapStateToProps = state => ({
  items: state.firebase.ordered.pages,
  submitFailed: state.forms.createPage.$form.submitFailed,
  nameErrors: state.forms.createPage.name.errors,
  slugErrors: state.forms.createPage.slug.errors
});

const mapDispatchToProps = dispatch => ({
  clearAction: () => {
    dispatch(actions.change('createPage.name', ''));
    dispatch(actions.change('createPage.slug', ''));
  }
});

export default compose(
  firebaseConnect([
    '/pages#orderByChild=name'
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(CMSPages);
