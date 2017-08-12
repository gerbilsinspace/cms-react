import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import Editor, { Editable, createEmptyState } from 'ory-editor-core';
import 'ory-editor-core/lib/index.css';
import { Trash, DisplayModeToggle, Toolbar } from 'ory-editor-ui';
import 'ory-editor-ui/lib/index.css';
import slate from 'ory-editor-plugins-slate';
import 'ory-editor-plugins-slate/lib/index.css';
import parallax from 'ory-editor-plugins-parallax-background';
import 'ory-editor-plugins-parallax-background/lib/index.css';
import spacer from 'ory-editor-plugins-spacer';
import 'ory-editor-plugins-spacer/lib/index.css';
import video from 'ory-editor-plugins-video';
import 'ory-editor-plugins-video/lib/index.css';
import image from 'ory-editor-plugins-image';
import 'ory-editor-plugins-image/lib/index.css';
import divider from 'ory-editor-plugins-divider';

require('react-tap-event-plugin')();

const plugins = {
  content: [slate(), divider, image, video, spacer],
  layout: [parallax({ defaultPlugin: slate() })]
};

const content = createEmptyState();

const editor = new Editor({
  plugins,
  defaultPlugin: slate(),
  editables: [content]
});

class Page extends Component {
  render() {
    return (
      <div>
        <div className="editorHeader">
          <h1>Editing</h1>
        </div>
        <Editable editor={editor} id={content.id} />
        <Trash editor={editor}/>
        <DisplayModeToggle editor={editor}/>
        <Toolbar editor={editor}/>
      </div>
    );
  }
};

const mapStateToProps = state => {
  let page = null;

  if (state.firebase.data.page) {
    page = state.firebase.data.pages[state.router.location.pathname.replace('/cms/pages/', '')]
  }

  return {
    page: page
  };
};

export default compose(
  firebaseConnect(['pages']),
  connect(mapStateToProps)
)(Page);

