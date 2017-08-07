import './cmsTemplate.css';
import React, { Component } from 'react';
import CMSLayout from '../../components/cmsLayout/cmsLayout';
import { connect } from 'react-redux';
import { firebaseConnect, isEmpty } from 'react-redux-firebase';
import { Form, Control, actions } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { required } from '../../helpers/error';
import addStyle from '../../helpers/addStyle';

class Template extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      error: ''
    };
  }

  handleSubmit(val) {
    const { firebase, match } = this.props;
  }

  render() {
    return (
      <CMSLayout>
        <article>
          <h1>Layout</h1>
        </article>
      </CMSLayout>
    );
  }
};

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = dispatch => ({
});

export default compose(
  firebaseConnect(['/templates#orderByChild=name']),
  connect(mapStateToProps, mapDispatchToProps)
)(Template);
