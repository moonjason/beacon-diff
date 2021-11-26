import React, { Component } from "react";
import * as monaco from "monaco-editor";

export default class CodeDiff extends Component {
  componentDidMount() {
    const {
      path,
      originalValue,
      modifiedValue,
      language,
      onValueChange,
      ...options
    } = this.props;
    const originalModel = monaco.editor.createModel(
      originalValue,
      language,
      path
    );
    const modifiedModel = monaco.editor.createModel(
      modifiedValue,
      language,
      path
    );
    this._editor = monaco.editor.createDiffEditor(this._node, options.options);
    this._editor.setModel({
      original: originalModel,
      modified: modifiedModel
    });
  }
  componentDidUpdate() {
    const {
      path,
      originalValue,
      modifiedValue,
      language,
      onValueChange,
      ...options
    } = this.props;
    monaco.editor.setTheme(options.options.theme);
    this._editor.updateOptions(options.options);
    const model = this._editor.getModel();
    if (originalValue !== model.original.getValue()) {
      model.original.pushEditOperations(
        [],
        [
          {
            range: model.original.getFullModelRange(),
            text: originalValue
          }
        ]
      );
    }
    if (modifiedValue !== model.modified.getValue()) {
      model.modified.pushEditOperations(
        [],
        [
          {
            range: model.modified.getFullModelRange(),
            text: modifiedValue
          }
        ]
      );
    }
  }
  componentWillUnmount() {
    this._editor && this._editor.dispose();
    this._subscription && this._subscription.dispose();
  }
  render() {
    return (
      <div
        style={{
          width: this.props.options.width,
          height: this.props.options.height,
          backgroundColor: "blue"
        }}
        ref={c => (this._node = c)}
      />
    );
  }
}
