import React from 'react';
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import './style/search.input.less';
import { ISearchInputProps } from './propsType';

enum KeyDownArrowStatus {
  plus = 'plus',
  minus = 'minus'
}

export default class SearchInput extends CoreComponent<ISearchInputProps, any> {

  public state = {
    inputValue: '',
    isFocus: false,
    matchingList: [],
    chooseIndex: 0
  };

  public onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { verifyInputValue, isLockInputToSearch, searchScope } = this.props;
    let inputValue = event.target.value;
    if (verifyInputValue) {
      inputValue = verifyInputValue(inputValue);
    }
    if (isLockInputToSearch) {
      // verify value is in search scope
      const sameValue = searchScope.find((value) => value.indexOf(inputValue) > -1);
      if (sameValue === undefined) { return; }
    }
    const matchingList = this.findMatchingList(inputValue);
    this.setState({
      chooseIndex: 0,
      inputValue,
      matchingList
    }, () => { this.triggerChangeValue(this.state.inputValue); });
  }

  public onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const state = this.state;
    if (!state.matchingList.length) { return; }
    switch (event.keyCode) {
      case 38:
        event.preventDefault();
        this.computeChooseIndex(KeyDownArrowStatus.plus);
        break;
      case 40:
        event.preventDefault();
        this.computeChooseIndex(KeyDownArrowStatus.minus);
        break;
      case 13:
        event.preventDefault();
        this.onClickItem(String(state.matchingList[state.chooseIndex - 1]));
        break;
    }
  }

  public onClickItem = (info) => {
    this.setState({
      inputValue: info,
      matchingList: this.findMatchingList(info)
    }, () => {
      this.triggerChangeValue(this.state.inputValue);
    });
  }

  public onFocusInput = () => {
    this.setState({ isFocus: true });
  }

  public triggerChangeValue = (value: string) => {
    if (this.props.onChangeValue) {
      this.props.onChangeValue(value);
    }
  }

  private findMatchingList: (inputValue: string) => string[] = (inputValue) => {
    inputValue = inputValue.toLocaleLowerCase();
    if (inputValue.trim() === '') { return []; }
    const matchingList = this.props.searchScope.filter((value) => {
      return value.indexOf(inputValue) > -1 && value !== inputValue;
    });
    return matchingList;
  }

  private computeChooseIndex: (arrowStatus: KeyDownArrowStatus) => any = (arrowStatus) => {
    const state = this.state;
    switch (arrowStatus) {
      case KeyDownArrowStatus.plus:
        if (state.chooseIndex === 1 || state.chooseIndex === 0) {
          return;
        }
        this.setState({
          chooseIndex: state.chooseIndex - 1
        });
        break;
      case KeyDownArrowStatus.minus:
        if (state.chooseIndex === state.matchingList.length) { return; }
        this.setState({
          chooseIndex: state.chooseIndex + 1
        });
        break;
    }
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
          type="text"
          className={inputStyles}
          value={state.inputValue}
          onFocus={this.onFocusInput}
          onChange={this.onChangeValue}
          onKeyDown={this.onKeyDown} />
          <i className="search-input-component-icon error-icon"></i>
        {state.matchingList.length ? <ul className="search-input-component-search">
          {state.matchingList.map((info, index) => {
            return (
              <li
                className={this.classNames('search-input-component-item',
                  state.chooseIndex === (index + 1) ? 'match-style' : ''
                )}
                onClick={this.onClickItem.bind(this, info)}
                key={index}>
                {info}
              </li>
            );
          })}
        </ul> : null}
      </div>);
  }
}