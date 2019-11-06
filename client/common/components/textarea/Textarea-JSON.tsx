import React from 'react';
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import './style/textarea.json.less';

export default class TextareaJSON extends CoreComponent<any, any> {

  public state = {};

  public render() {
    const { title } = this.props;

    return (
      <div className="textarea-component">
        {title ? <div className="form-table-component-title">{title}</div> : null}
      </div>
    );
  }
}