import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import Editor, { Editable, createEmptyState } from 'ory-editor-core';
import { Trash, DisplayModeToggle, Toolbar } from 'ory-editor-ui';
import slate from 'ory-editor-plugins-slate';
import { contentPlugins, layoutPlugins } from '../../helpers/editorConfig.js';

require('react-tap-event-plugin')();

const plugins = {
  content: contentPlugins,
  layout: layoutPlugins
};

let content = createEmptyState();

const editor = new Editor({
  plugins,
  defaultPlugin: slate(),
  editables: [content]
});

class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: {},
      pageId: ''
    };

    this.onUpdate = this.onUpdate.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onUpdate(state) {
    this.setState({
      id: state.pageId,
      editorState: state
    });
  }

  onSave(state) {
    const { firebase, pageId } = this.props;

    firebase.update(`/pages/${pageId}/`, {
      'editorState': JSON.stringify(state.editorState)
    });
  }

  componentWillReceiveProps(nextProps) {
    let editorState = '';

    if (nextProps && nextProps.page && nextProps.page.editorState) {
      editorState = JSON.parse(nextProps.page.editorState);
    }

    if (editorState) {
      editorState.id = content.id;
      editor.trigger.editable.update(editorState);
    }
  }

  render() {
    return (
      <div>
        <div className="editorHeader">
          <h1>Editing
            <button onClick={() => {
              this.onSave(this.state);
            }}>Save</button>
          </h1>
        </div>
        <Editable editor={editor} id={content.id} onChange={this.onUpdate} />
        <Trash editor={editor}/>
        <DisplayModeToggle editor={editor}/>
        <Toolbar editor={editor}/>
      </div>
    );
  }
};

const mapStateToProps = state => {
  let page = null;
  const pageId = state.router.location.pathname.replace('/cms/pages/', '');

  if (state.firebase.data.pages) {
    page = state.firebase.data.pages[pageId]
  }

  return {
    page,
    pageId
  };
};

export default compose(
  firebaseConnect(['pages']),
  connect(mapStateToProps)
)(Page);

