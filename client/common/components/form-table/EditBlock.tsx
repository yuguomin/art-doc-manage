import React from 'react';
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import SearchInput from '../search-input';
import './style/edit.block.less';

export default class EditBlock extends CoreComponent<any, any> {
  public render() {
    return (
    <div className="edit-block">
      <div className="title">edit node</div>
      <div className="input-block name-input">name: <SearchInput /> </div>
      <div className="input-block type-input">type: <SearchInput /> </div>
      <div>
        <div className="input-block explain-input">explain: <SearchInput /> </div>
        <div className="input-block example-input">example: <SearchInput /> </div>
      </div>
      <div className="input-block enum-input">enum: <SearchInput /> </div>
      <div className="input-block parents-input">parents: <SearchInput /> </div>
    </div>);
  }
}