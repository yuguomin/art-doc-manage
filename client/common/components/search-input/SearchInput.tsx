import React from 'react';
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import './style/search.input.less';
import { ISearchInputProps } from './propsType';

export default class SearchInput extends CoreComponent<ISearchInputProps, any> {

  public state = {
    inputValue: '',
    isFocus: false
  };

  public onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { verifyInputValue, isLockInputToSearch } = this.props;
    let inputValue = event.target.value;
    if (verifyInputValue) {
      inputValue = verifyInputValue(inputValue);
    }
    if (isLockInputToSearch) {
      // 进行校验是否在范围内
    }
    this.setState({
      inputValue
    });
  }

  public onClickItem = () => {
  }

  public onFocusInput = () => {
    this.setState({ isFocus: true });
  }

  public render() {
    const state = this.state;
    const { inputStyle, disable } = this.props;
    const inputStyles = this.classNames(
      'search-input-component-input',
      disable ? '' : 'allow-choose',
      state.isFocus ? 'focus' : '',
      inputStyle);

    return (
      <div className="search-input-component">
        <input
        value={state.inputValue}
        onFocus={this.onFocusInput}
        onChange={this.onChangeValue}
        className={inputStyles} type="text"/>
        <ul className="search-input-component-search">
          <li className="search-input-component-item">
            123
          </li>
        </ul>
      </div>);
  }
}