import React from 'react';
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import SearchInput from '../search-input';
import './style/edit.block.less';

const TYPE_LIST = ['string', 'number', 'int', 'float', 'boolean', 'array', 'array(string)', 'object',
  'array(object)'];

enum ValueType {
  name = 'name',
  type = 'type',
  explain = 'explain',
  example = 'example',
  enum = 'enum',
  parent = 'parent'
}
export default class EditBlock extends CoreComponent<any, any> {
  public state = {
    nameValue: '',
    typeValue: '',
    explainValue: '',
    exampleValue: '',
    enumValue: '',
    parentValue: ''
  };

  public verifyName = (nameValue) => {
    return this.isLegalVariableName(nameValue);
  }

  public formatName = (nameValue) => {
    return this.trimStr(nameValue);
  }

  public onConfirm = () => {
    if (!this.isCorrect()) { return; }
    // verify every input
  }

  public isCorrect = () => {
    const state = this.state;
    if (this.verifyName(state.nameValue)) {
      return true;
    }
    return false;
  }

  public onChangeValue = (type: ValueType, value: string) => {
    console.log(type, value);
    switch (type) {
      case ValueType.name:
        this.setState({ nameValue: value });
        break;
      case ValueType.type:
        this.setState({ typeValue: value });
        break;
      case ValueType.explain:
        this.setState({ explainValue: value });
        break;
      case ValueType.example:
        this.setState({ exampleValue: value });
        break;
      case ValueType.enum:
        this.setState({ enumValue: value });
        break;
      case ValueType.parent:
        this.setState({ parentValue: value });
        break;
    }
  }

  private trimStr = (str: string) => {
    return str.trim();
  }

  private isLegalVariableName = (str: string) => {
    const variableNameReg = /^[a-zA-Z\$_][a-zA-Z\d_]*$/;
    return variableNameReg.test(str);
  }

  public render() {
    return (
      <div className="edit-block">
        <div className="title">edit node</div>
        <div className="input-block name-input">
          name:<SearchInput
            onChangeValue={this.onChangeValue.bind(this, ValueType.name)}
            verifyValue={this.verifyName}
            formatInputValue={this.formatName}
          />
        </div>
        <div className="input-block type-input">
          type:<SearchInput
            onChangeValue={this.onChangeValue.bind(this, ValueType.type)}
            isLockInputToSearch={true}
            searchScope={TYPE_LIST} />
        </div>
        <div>
          <div className="input-block explain-input">
            explain:<SearchInput
              onChangeValue={this.onChangeValue.bind(this, ValueType.explain)}
            />
          </div>
          <div className="input-block example-input">
            example:<SearchInput
              onChangeValue={this.onChangeValue.bind(this, ValueType.example)}
            />
          </div>
        </div>
        <div className="input-block enum-input">
          enum:<SearchInput
            onChangeValue={this.onChangeValue.bind(this, ValueType.enum)}
          />
        </div>
        <div className="input-block parents-input">
          parents:<SearchInput
            onChangeValue={this.onChangeValue.bind(this, ValueType.parent)}
          />
        </div>
        <div className="edit-btn-block">
          <span className={`${this.isCorrect() ? '' : 'disable'}`} onClick={this.onConfirm}>confirm</span>
          <span>cancel</span>
        </div>
      </div>);
  }
}