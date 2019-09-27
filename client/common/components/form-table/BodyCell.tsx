import React from 'react';
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import { IBodyCellProps } from './propsType';
import EditBlock from './EditBlock';

export default class BodyCell extends CoreComponent<IBodyCellProps, any> {

  public state = {
    isFocus: false,
    isOpenEdit: false,
    isOpenAdd: false
  };

  public componentDidMount() {
  }

  public onEdit = () => {
    if (this.state.isOpenAdd || this.state.isOpenEdit) { return; }
    this.setState({ isOpenEdit: true });
  }

  public onDel = () => {
    this.props.onDeleteCell(this.props.cellIndex);
  }

  public onFocusDel = (event) => {
    event.stopPropagation();
  }

  public addCell = () => {
    this.setState({ isOpenAdd: true });
  }

  public onFocus = () => {
    this.setState({isFocus: true});
  }

  public onBlur = () => {
    this.setState({isFocus: false});
  }

  public render() {
    const state = this.state;
    const { cellDetail, className } = this.props;

    return (
      <div tabIndex={1} onFocus={this.onFocus} onBlur={this.onBlur}>
        <div className={`cell-info ${state.isFocus ? 'bright-cell' : ''}`}>
          <div className={className}>
            {cellDetail.name}
          </div>
          <div className={className}>
            {cellDetail.type}
          </div>
          <div className={className}>
            {cellDetail.explain}
          </div>
          <div className={className}>
            {cellDetail.example}
          </div>
          <div className={className}>
            {cellDetail.enum}
          </div>
          <div className={className}>
            {cellDetail.parents}
          </div>
          <div className={`operate-block ${className}`}>
            <span onClick={this.onEdit}>edit</span>
            <span tabIndex={2} onClick={this.onDel} onFocus={this.onFocusDel}>del</span>
          </div>
        </div>
        { state.isOpenEdit && <EditBlock title={'edit node'}></EditBlock> }
        { (state.isFocus && !state.isOpenEdit) &&
        <div onClick={this.addCell} className="form-table-component-add-btn"></div> }
        { state.isOpenAdd && <EditBlock title={'add node'}></EditBlock> }
      </div>
    );
  }
}