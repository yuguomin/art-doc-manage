import React from 'react';
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import './style/select.less';
import { ISelectProps, ISelectItem } from './propsType';

export default class Select extends CoreComponent<ISelectProps, any> {

  public state = {
    isOpen: false,
    selectValue: '',
    selectList: [] as ISelectItem[]
  };

  public componentDidMount() {
    const { selectList, defaultValue } = this.props;
    if (selectList.length && (typeof selectList[0]) === 'string') {
      const formatList = selectList.map((info) => {
        if ((typeof info) === 'string') {
          return {
            value: info
          };
        } else {
          return info;
        }
      });
      this.setState({ selectList: formatList });
    }
    this.setState({selectValue: defaultValue});
  }

  public chooseSelect = (selectInfo: ISelectItem) => {
    if (selectInfo.disable) { return; }
    this.setState({
      selectValue: selectInfo.value,
      isOpen: false
    });
    if (this.props.onClickItem) {
      this.props.onClickItem(selectInfo);
    }
  }

  public toggleSelect = () => {
    if (this.props.disable) { return; }
    this.setState({ isOpen: !this.state.isOpen });
  }

  public onBlur = () => {
    this.setState({ isOpen: false });
  }

  public render() {
    const state = this.state;
    const { inputStyle, itemStyle, disable } = this.props;
    const inputStyles = this.classNames('select-component-input', disable ? '' : 'allow-choose', state.isOpen ? 'focus' : '');

    return (
      <div className="select-component">
        <div tabIndex={1} onFocus={this.toggleSelect} onBlur={this.onBlur} className={inputStyles} style={inputStyle}>{state.selectValue}
          {disable ? null : <i className={this.classNames('select-component-icon-arrow', state.isOpen ? 'rotate-up' : 'rotate-down')}></i>}
        </div>
        <ul className={this.classNames('select-component-list', state.isOpen ? 'slide-down' : 'slide-up')} >
          {
            state.selectList.length > 0 ? state.selectList.map((info, index) => {
              return (
              <li className={this.classNames('select-component-item choose-select',
                  info.value === state.selectValue ? 'selected' : '',
                  info.disable ? 'disable' : '')}
                  style={itemStyle}
                  onClick={this.chooseSelect.bind(this, info)}
                  key={index}>{info.value}</li>);
            }) : (<li className="select-component-item" style={itemStyle} onClick={this.toggleSelect}>无匹配数据</li>)
          }
        </ul>
      </div>
    );
  }
}