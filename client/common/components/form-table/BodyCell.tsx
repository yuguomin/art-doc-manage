import React from 'react';
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import { IBodyCellProps } from './propsType';
import EditBlock from './EditBlock';

export default class BodyCell extends CoreComponent<IBodyCellProps, any> {

  public state = {
    isFocus: false,
    isOpenEdit: false,
    isOpenAdd: false,
    editValue: {},
    addValue: {}
  };

  public componentDidMount() {
  }

  public onEdit = () => {
    const state = this.state;
    if (state.isOpenAdd || state.isOpenEdit) { return; }
    this.setState({ isOpenEdit: true });
  }

  public cancelEdit = () => {
    this.setState({ isOpenEdit: false });
  }

  public onDel = () => {
    this.props.onDeleteCell(this.props.cellIndex);
  }

  public onFocusDel = (event) => {
    event.stopPropagation();
  }

  public addCell = () => {
    this.setState({ isOpenAdd: !this.state.isOpenAdd });
  }

  public onFocus = () => {
    this.setState({ isFocus: true });
  }

  public onBlur = () => {
    this.setState({ isFocus: false });
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
        {
          (state.isFocus && !state.isOpenEdit) &&
          <div className="add-info-block">
            <div onClick={this.addCell} className={`form-table-component-add-btn ${state.isOpenAdd ? '' : 'add'}`}></div>
            {state.isOpenAdd || <div className="default-parent-text">123.123</div>}
          </div>}
        {state.isOpenEdit &&
          <EditBlock
            defaultValue={state.editValue}
            onCancel={this.cancelEdit}
            title={'edit node'} />}
        {state.isOpenAdd &&
          <EditBlock
            defaultValue={state.addValue}
            onCancel={this.addCell}
            title={'add node'} />}
      </div>
    );
  }
}