import React from 'react';
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import SearchInput from '../search-input';
import './style/edit.block.less';
import { IChangeValueInfo } from '../search-input/propsType';
import { IEditBlockProps } from './propsType';

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

const NAME_DEFAULT_STATUS = false;
const TYPE_DEFAULT_STATUS = false;
const ENUM_DEFAULT_STATUS = true;
const PARENT_DEFAULT_STATUS = false;
export default class EditBlock extends CoreComponent<IEditBlockProps, any> {
  public state = {
    nameValue: '',
    nameValueStatus: NAME_DEFAULT_STATUS,
    typeValue: '',
    typeValueStatus: TYPE_DEFAULT_STATUS,
    explainValue: '',
    exampleValue: '',
    enumValue: '',
    enumValueStatus: ENUM_DEFAULT_STATUS,
    parentValue: '',
    parentValueStatus: PARENT_DEFAULT_STATUS
  };

  public componentDidMount() {
  // public componentWillReceiveProps(nextProps) {
    // console.log('nextProps', nextProps);
    const {
      name: nameValue,
      type: typeValue,
      explain: explainValue,
      example: exampleValue,
      enum: enumValue,
      parents: parentValue } = this.props.defaultValue;
    this.setState({
      nameValue, typeValue, explainValue, exampleValue, enumValue, parentValue
    });
  }

  public verifyName = (nameValue: string) => {
    return this.isLegalVariableName(nameValue);
  }

  public verifyEnum = (enumValue: string) => {
    if (enumValue === '') { return true; }
    return this.isEnumStructure(enumValue);
  }

  public verifyParent = (parentValue: string) => {
    return this.isParentStructure(parentValue);
  }

  public verifyDefault = () => {
    return true;
  }

  public formatName = (nameValue) => {
    return this.trimStr(nameValue);
  }

  public onConfirm = () => {
    if (!this.isCorrect()) { return; }
    const state = this.state;
    // 这个顺序很重要 应该关联
    this.props.onConfirm({
      name: state.nameValue,
      type: state.typeValue,
      explain: state.explainValue,
      parents: state.parentValue,
      example: state.exampleValue,
      enum: state.enumValue
    });
  }

  public onCancel = () => {
    this.props.onCancel();
  }

  public isCorrect = () => {
    const state = this.state;
    return state.nameValueStatus && state.typeValueStatus && state.enumValueStatus && state.parentValueStatus;
  }

  public onChangeValue = (type: ValueType, valueInfo: IChangeValueInfo) => {
    const { value, isCorrect } = valueInfo;
    switch (type) {
      case ValueType.name:
        this.setState({
          nameValue: value,
          nameValueStatus: isCorrect
        });
        break;
      case ValueType.type:
        this.setState({
          typeValue: value,
          typeValueStatus: isCorrect
        });
        break;
      case ValueType.explain:
        this.setState({ explainValue: value });
        break;
      case ValueType.example:
        this.setState({ exampleValue: value });
        break;
      case ValueType.enum:
        this.setState({
          enumValue: value,
          enumValueStatus: isCorrect
        });
        break;
      case ValueType.parent:
        this.setState({
          parentValue: value,
          parentValueStatus: isCorrect
        });
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

  private isEnumStructure = (str: string) => {
    // off=1,on=0
    const enumValueReg = /^([a-zA-Z\$_][a-zA-Z\d_]*=['"]?[\d\w$]+['"]?,?)+$/;
    return enumValueReg.test(str);
  }

  private isParentStructure = (str: string) => {
    const parentValueReg = /^([a-zA-Z\$_][a-zA-Z\d_]*.?)*([a-zA-Z\$_][a-zA-Z\d_]*)$/;
    return parentValueReg.test(str);
  }

  public render() {
    const state = this.state;
    const { title } = this.props;

    return (
      <div className="edit-block">
        {title && <div className="title">{title}</div>}
        <div className="input-block name-input">
          name:<SearchInput
            defaultValue={state.nameValue}
            onChangeValue={this.onChangeValue.bind(this, ValueType.name)}
            verifyValue={this.verifyName}
            formatInputValue={this.formatName}
          />
        </div>
        <div className="input-block type-input">
          type:<SearchInput
            defaultValue={state.typeValue}
            onChangeValue={this.onChangeValue.bind(this, ValueType.type)}
            isLockInputToSearch={true}
            searchScope={TYPE_LIST} />
        </div>
        <div>
          <div className="input-block explain-input">
            explain:<SearchInput
              defaultValue={state.explainValue}
              onChangeValue={this.onChangeValue.bind(this, ValueType.explain)}
              verifyValue={this.verifyDefault}
            />
          </div>
          <div className="input-block example-input">
            example:<SearchInput
              defaultValue={state.exampleValue}
              onChangeValue={this.onChangeValue.bind(this, ValueType.example)}
              verifyValue={this.verifyDefault}
            />
          </div>
        </div>
        <div className="input-block enum-input">
          enum:<SearchInput
            defaultValue={state.enumValue}
            onChangeValue={this.onChangeValue.bind(this, ValueType.enum)}
            verifyValue={this.verifyEnum}
          />
        </div>
        <div className="input-block parents-input">
          parents:<SearchInput
            defaultValue={state.parentValue}
            onChangeValue={this.onChangeValue.bind(this, ValueType.parent)}
            verifyValue={this.verifyParent}
          />
        </div>
        <div className="edit-btn-block">
          <span className={`${this.isCorrect() ? '' : 'disable'}`} onClick={this.onConfirm}>confirm</span>
          <span onClick={this.onCancel}>cancel</span>
        </div>
      </div>);
  }
}