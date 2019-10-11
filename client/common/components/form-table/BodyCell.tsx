import React from 'react';
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import { IBodyCellProps, IDefaultValue } from './propsType';
import EditBlock from './EditBlock';

export default class BodyCell extends CoreComponent<IBodyCellProps, any> {

  public state = {
    isFocus: false,
    isOpenEdit: false,
    isOpenAdd: false,
    editValue: {},
    addValue: {},
    childOrder: ''
  };

  public componentDidMount() {
    this.computeNodeEditInfo();
  }

  public componentWillReceiveProps(nextProps) {
    this.computeNodeEditInfo(nextProps);
  }

  public onEdit = () => {
    const state = this.state;
    if (state.isOpenAdd || state.isOpenEdit) { return; }
    this.setState({ isOpenEdit: true });
  }

  public cancelEdit = () => {
    this.setState({ isOpenEdit: false });
  }

  public onConfirmEdit = (value: IDefaultValue) => {
    this.props.onEditValue(value, this.props.cellIndex);
    this.cancelEdit();
    // this.computeNodeEditInfo();
  }

  public onDel = () => {
    this.props.onDeleteCell(this.props.cellIndex);
  }

  public onFocusDel = (event) => {
    event.stopPropagation();
  }

  public toggleAddStatus = () => {
    this.setState({ isOpenAdd: !this.state.isOpenAdd });
  }

  public onConfirmAdd = (value: IDefaultValue) => {
    this.toggleAddStatus();
    this.props.onAddValue(value, this.props.cellIndex);
    this.onBlur();
  }

  public onFocus = () => {
    this.setState({ isFocus: true });
  }

  public onBlur = () => {
    this.setState({ isFocus: false });
  }

  private computeNodeEditInfo = (props?: IBodyCellProps) => {
    props = props || this.props;
    const { cellDetail } = props;
    const childOrder = ['array', 'object', 'array(object)'].includes((cellDetail.type || '').toLowerCase()) ?
      `${cellDetail.parents}.${cellDetail.name}` : cellDetail.parents;
    const addValue = Object.assign({}, { parents: childOrder });
    this.setState({
      childOrder,
      editValue: cellDetail,
      addValue
    });
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
            <div onClick={this.toggleAddStatus} className={`form-table-component-add-btn ${state.isOpenAdd ? '' : 'add'}`}></div>
            {state.isOpenAdd || <div className="default-parent-text">{state.childOrder}</div>}
          </div>}
        {state.isOpenEdit &&
          <EditBlock
            defaultValue={state.editValue}
            onConfirm={this.onConfirmEdit}
            onCancel={this.cancelEdit}
            title={'edit node'} />}
        {state.isOpenAdd &&
          <EditBlock
            defaultValue={state.addValue}
            onConfirm={this.onConfirmAdd}
            onCancel={this.toggleAddStatus}
            title={'add node'} />}
      </div>
    );
  }
}