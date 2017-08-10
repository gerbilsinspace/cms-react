import React from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { actions } from 'react-redux-form';
import { compose } from 'redux';
import CMSLayout from '../../components/cmsLayout';
import CMSListItem from '../../components/cmsListItem';
import CreateContentForm from '../../components/createContentForm';

const Templates = ({
  submitFailed,
  nameErrors,
  templates,
  firebase,
  clearCreateTemplate
}) => {
  const itemList = !isLoaded(templates) ? 'Loading' :
                     isEmpty(templates) ? `Please create a new template` :
                       Object.keys(templates).map((key, id) => {
    return (
      <CMSListItem key={key} name={templates[key].name} itemKey={templates[id].key} type='templates' />
    )
  });

  return (
    <CMSLayout>
      <article>
        <h1>Templates</h1>

        <div>
          <h2>Create Template</h2>
          <CreateContentForm firebase={firebase}
                             clearAction={clearCreateTemplate}
                             itemUrl='/templates'
                             submitFailed={submitFailed}
                             nameErrors={nameErrors}
                             itemName='Template'
          />
        </div>

        <div>
          <h2>Edit Templates</h2>
          { itemList }
        </div>
      </article>
    </CMSLayout>
  );
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
