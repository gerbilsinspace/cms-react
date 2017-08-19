import React from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { HTMLRenderer } from 'ory-editor-renderer';
import Error404 from '../error404';
import { contentPlugins, layoutPlugins } from '../../helpers/editorConfig.js';

const plugins = {
  content: contentPlugins,
  layout: layoutPlugins
};

const GeneratedPage = ({pathname, pages}) => {
  let pageKeys = [];

  if (!pages) {
    return (<div></div>);
  }

  if (pages) {
    pageKeys = Object.keys(pages);
  }

  for (let i = 0; i < pageKeys.length; i++) {
    const { slug, editorState } = pages[pageKeys[i]];

    if (slug === pathname) {
      return (<HTMLRenderer plugins={plugins} state={JSON.parse(editorState)} />);
    }
  }

  return (
    <Error404 />
  );
}

const mapStateToProps = state => ({
    pages: state.firebase.data.pages,
    pathname: state.router.location.pathname
});

export default compose(
  firebaseConnect([
    'pages'
  ]),
  connect(mapStateToProps)
)(GeneratedPage);
