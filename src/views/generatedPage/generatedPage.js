import React from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { HTMLRenderer } from 'ory-editor-renderer';
import slate from 'ory-editor-plugins-slate';
import parallax from 'ory-editor-plugins-parallax-background';
import spacer from 'ory-editor-plugins-spacer';
import video from 'ory-editor-plugins-video';
import image from 'ory-editor-plugins-image';
import divider from 'ory-editor-plugins-divider';
import 'ory-editor-core/lib/index.css';
import 'ory-editor-ui/lib/index.css';
import 'ory-editor-plugins-slate/lib/index.css';
import 'ory-editor-plugins-parallax-background/lib/index.css';
import 'ory-editor-plugins-spacer/lib/index.css';
import 'ory-editor-plugins-video/lib/index.css';
import 'ory-editor-plugins-image/lib/index.css';
import Error404 from '../error404';

const plugins = {
  content: [slate(), divider, image, video, spacer],
  layout: [parallax({ defaultPlugin: slate() })]
};

const GeneratedPage = ({match, pages}) => {
  let pageKeys = [];

  if (!pages) {
    return (<div></div>);
  }

  if (pages) {
    pageKeys = Object.keys(pages);
  }

  for (let i = 0; i < pageKeys.length; i++) {
    const { name, editorState } = pages[pageKeys[i]];

    if (name === 'home' && match.path === '/' && match.isExact === true) {
      return (<HTMLRenderer plugins={plugins} state={JSON.parse(editorState)} />);
    }

    if (name === match.patch) {
      return (<HTMLRenderer plugins={plugins} state={JSON.parse(editorState)} />);
    }
  }

  return (
    <Error404 />
  );
}

const mapStateToProps = state => ({
    pages: state.firebase.data.pages
});

export default compose(
  firebaseConnect([
    'pages'
  ]),
  connect(mapStateToProps)
)(GeneratedPage);
