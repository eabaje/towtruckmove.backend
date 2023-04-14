import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form/dist/index.ie11';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

/**
 * Given an html string.
 * Return an `EditorState` object that is used for the Rich Editor Text Box.
 *
 */

export const getEditorState = (name) => {
  const { contentBlocks, entityMap } = htmlToDraft(name || '');
  const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
  return EditorState.createWithContent(contentState);
};

const EMPTY_VALUE_TO_PACIFY_WARNINGS = '';

/**
 * Component that provides basic Rich Text Editor.
 */
const RichEditor = ({ name, onUpdate }) => (
  <Controller
    name={name}
    defaultValue={EMPTY_VALUE_TO_PACIFY_WARNINGS}
    render={({ onChange, value }) => {
      let defaultEditorState;
      if (defaultValue || value) {
        defaultEditorState = getEditorState(defaultValue || value);
      }

      const onInternalChange = (currentContentState) => {
        const html = draftToHtml(currentContentState);
        onChange(html);
        if (onUpdate) onUpdate(html);
      };

      const toolbar = {
        options: ['inline', 'blockType', 'list'],
        inline: {
          inDropdown: false,
          className: undefined,
          component: undefined,
          dropdownClassName: undefined,
          options: ['bold', 'italic', 'underline', 'strikethrough'],
        },
        blockType: {
          inDropdown: true,
          options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
        },
        list: {
          inDrodown: false,
          options: ['unordered', 'ordered'],
        },
      }

      const editorStyle = { border: '1px solid #565c65', height: '10rem' }

      return (
        <Editor
          tabIndex="0"
          spellCheck
          defaultEditorState={defaultEditorState}
          onChange={onInternalChange}
          editorStyle={editorStyle}
          toolbar={toolbar}
        />
      );
    }}
  />
);

RichEditor.propTypes = {
  name: PropTypes.string.isRequired,
  onUpdate: PropTypes.func,
};

RichEditor.defaultProps = {
  onUpdate: undefined,
};

export default RichEditor;
