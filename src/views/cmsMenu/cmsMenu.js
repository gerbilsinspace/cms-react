import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, isEmpty } from 'react-redux-firebase';
import { Form, Control, actions } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { required } from '../../helpers/error';
import addStyle from '../../helpers/addStyle';
import CMSLayout from '../../components/cmsLayout/cmsLayout';

class Menu extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      error: '',
    };
  }

  handleSubmit(val) {
    const { firebase, match } = this.props;

    firebase.push(`/menus/${match.params.id}/links/`, {
      url: val.url,
      text: val.text,
    });

    this.props.clearAddLinkToMenu();
  }

  render() {
    const {
      menu,
      menuId,
      submitFailed,
      urlErrors,
      textErrors,
      deleteLink,
      firebase,
    } = this.props;

    const isError = this.state.error || (submitFailed &&
        (urlErrors.required || textErrors.required)
    );
    const firebaseErrorStyle = addStyle(this.state.error);
    const formErrorStyle = addStyle(isError);
    const urlRequiredStyle = addStyle(submitFailed && urlErrors.required);
    const textRequiredStyle = addStyle(submitFailed && textErrors.required);

    const linkList = isEmpty(menu.links) ? 'Please add a link' : Object.keys(menu.links).map((link) => {
      const linkInfo = menu.links[link];

      if (linkInfo.url.includes('://')) {
        return (
          <div key={linkInfo.url}>
            <div>Link: {linkInfo.url}</div>
            <div>Text: {linkInfo.text}</div>
            <a href={linkInfo.url}>{linkInfo.text}</a>
            <button
              onClick={() => {
                deleteLink(menuId, link, firebase);
              }}
            >Delete</button>
          </div>
        );
      }

      return (
        <div key={linkInfo.url}>
          <div>Link: {linkInfo.url}</div>
          <div>Text: {linkInfo.text}</div>
          <Link to={linkInfo.url}>{linkInfo.text}</Link>
          <button
            onClick={() => {
              deleteLink(menuId, link, firebase);
            }}
          >Delete</button>
        </div>
      );
    });

    return (
      <CMSLayout>
        <article>
          <h1>{ menu.name }</h1>

          <Form
            model="addLinkToMenu"
            onSubmit={(val) => {
              this.handleSubmit(val);
            }}
            validators={{
              url: { required },
              text: { required },
            }}
          >
            <div style={formErrorStyle}>
              <h2>Error</h2>
              <p>You have one or more errors below</p>
              <div style={firebaseErrorStyle}>{ this.state.error }</div>
            </div>

            <div>
              <label htmlFor="url">Link:</label>
              <Control type="text" model=".url" />
              <div style={urlRequiredStyle}>Please provide a link</div>
            </div>

            <div>
              <label htmlFor="text">Text:</label>
              <Control type="text" model=".text" />
              <div style={textRequiredStyle}>Please provide some text.</div>
            </div>

            <button>Submit</button>
          </Form>

          <div>
            <h2>Links</h2>
            { linkList }
          </div>
        </article>
      </CMSLayout>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const menus = state.firebase.data.menus;
  let menu = {
    name: '',
  };

  if (menus) {
    menu = state.firebase.data.menus[ownProps.match.params.id];
  }

  return {
    menu,
    menuId: ownProps.match.params.id,
    submitFailed: state.forms.addLinkToMenu.$form.submitFailed,
    urlErrors: state.forms.addLinkToMenu.url.errors,
    textErrors: state.forms.addLinkToMenu.text.errors,
  };
};

const mapDispatchToProps = dispatch => ({
  clearAddLinkToMenu: () => {
    dispatch(actions.change('addLinkToMenu.url', ''));
    dispatch(actions.change('addLinkToMenu.text', ''));
  },
  deleteLink: (menu, link, firebase) => {
    firebase.update(`/menus/${menu}/links/${link}`, {
      text: null,
      url: null,
    });
  },
});

export default compose(
  firebaseConnect(['/menus#orderByChild=name']),
  connect(mapStateToProps, mapDispatchToProps),
)(Menu);

