import React from 'react';
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import './style/textarea.less';
import { ITextareaProps } from './propsType';

export default class Textarea extends CoreComponent<ITextareaProps, any> {

  public state = {
    value: ''
  };

  private textarea;

  private getTextarea = (node) => {
    if (node) {
      this.textarea = node;
    }
  }

  public onChangeValue = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // console.dir(event.target.value);
    const startIndex = this.textarea.selectionStart;
    console.log(startIndex);
    this.setState({ value: event.target.value });
    // this.textarea.setSelectionRange(startIndex - 5, startIndex + 3);
  }

  public onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.keyCode === 9) {
      event.preventDefault();
      const startIndex = this.textarea.selectionStart;
      this.setState({ value: this.state.value.slice(0, startIndex) + '  ' + this.state.value.slice(startIndex) });
      // var range = textDom.createTextRange();
      setTimeout(() => {
        this.textarea.setSelectionRange(startIndex + 2, startIndex + 2);
      }, 0);
    }
  }

  public render() {
    const state = this.state;
    const { title } = this.props;

    return (
      <div className="textarea-component">
        {title ? <div className="textarea-component-title">{title}</div> : null}
        <textarea
          ref={this.getTextarea}
          onKeyDown={this.onKeyDown}
          value={state.value}
          onChange={this.onChangeValue}
          className="textarea-component-area"
        />
      </div>
    );
  }
}