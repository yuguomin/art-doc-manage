import React from 'react';
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import './style/textarea.less';
import { ITextareaProps } from './propsType';

export default class Textarea extends CoreComponent<ITextareaProps, any> {

  public static defaultProps = {
    defaultValue: ''
  };

  public state = {
    value: ''
  };

  private textarea;

  public componentDidMount() {
    this.setState({value: this.props.defaultValue});
  }

  private getTextarea = (node) => {
    if (node) {
      this.textarea = node;
    }
  }

  public onChangeValue = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // console.dir(event.target.value);
    this.emitChangeValue(event.target.value);
    // this.textarea.setSelectionRange(startIndex - 5, startIndex + 3);
  }

  public onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.keyCode === 9) {
      event.preventDefault();
      const startIndex = this.textarea.selectionStart;
      this.emitChangeValue(this.state.value.slice(0, startIndex) + '  ' + this.state.value.slice(startIndex));
      // var range = textDom.createTextRange();
      setTimeout(() => {
        this.textarea.setSelectionRange(startIndex + 2, startIndex + 2);
      }, 0);
    }
  }

  public emitChangeValue = (value) => {
    this.setState({ value }, () => {
      if (this.props.onChangeValue) {
        const valueInfo = {
          value,
          isCorrect: this.verifyValue()
        };
        this.props.onChangeValue(valueInfo);
      }
    });
  }

  public verifyValue = () => {
    if (this.props.verifyValue) {
      return this.props.verifyValue(this.state.value);
    }
    return true;
  }

  private getTextareaClass = () => {
    const { verifyValue } = this.props;
    let textareaClass = 'textarea-component-area';
    if (verifyValue) {
      textareaClass += ` ${this.verifyValue() ? 'right' : 'error'}`;
    }
    return textareaClass;
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
          className={this.getTextareaClass()}
        />
      </div>
    );
  }
}