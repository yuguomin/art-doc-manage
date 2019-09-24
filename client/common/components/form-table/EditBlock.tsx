import React from 'react';
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import SearchInput from '../search-input';
import './style/edit.block.less';

const TYPE_LIST = ['string', 'number', 'int', 'float', 'boolean', 'array', 'array(string)', 'object',
'array(object)'];
export default class EditBlock extends CoreComponent<any, any> {
  public verifyName = (nameValue) => {
    console.log(nameValue);
    return nameValue;
  }

  public formatName = (nameValue) => {
    return this.trimStr(nameValue);
  }

  public trimStr = (str: string) => {
    return str.trim();
  }

  public render() {
    return (
    <div className="edit-block">
      <div className="title">edit node</div>
      <div className="input-block name-input">name: <SearchInput verifyValue={this.verifyName} formatInputValue={this.formatName} /> </div>
      <div className="input-block type-input">type: <SearchInput isLockInputToSearch={true} searchScope={TYPE_LIST}/> </div>
      <div>
        <div className="input-block explain-input">explain: <SearchInput /> </div>
        <div className="input-block example-input">example: <SearchInput /> </div>
      </div>
      <div className="input-block enum-input">enum: <SearchInput /> </div>
      <div className="input-block parents-input">parents: <SearchInput /> </div>
      <div className="edit-btn-block">
        <span>confirm</span>
        <span>cancel</span>
      </div>
    </div>);
  }
}