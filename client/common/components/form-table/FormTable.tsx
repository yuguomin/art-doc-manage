import React from 'react';
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import './style/form.table.less';
import { IFormTableProps, ITableCellDetail } from './propsType';
import BodyCell from './BodyCell';
import EditBlock from './EditBlock';

// const TableCellType = ['Name', 'Type', 'Explain', 'Example', 'Enum', 'Parents', 'operate'];
const TableCellType = ['参数名', '类型', '参数说明', '示例', '枚举', '节点', '操作'];

export default class FormTable extends CoreComponent<IFormTableProps, any> {

  public state = {
    addFirstStatus: false,
    tableCellList: [] as ITableCellDetail[],
    addValue: {
      parents: 'data'
    }
  };

  public componentDidMount() {
  }

  public onEditValue = (value: ITableCellDetail, index: number) => {
    const tableCellList = this.state.tableCellList;
    tableCellList[index] = value;
    this.onChangeList(tableCellList);
  }

  public onAddValue = (value: ITableCellDetail, index: number = 0) => {
    const tableCellList = this.state.tableCellList;
    // tableCellList[index] = value;
    tableCellList.splice(index + 1, 0, value);
    this.onChangeList(tableCellList);
  }

  public onDeleteCell = (cellIndex: number) => {
    const tableCellList = this.state.tableCellList;
    tableCellList.splice(cellIndex, 1);
    this.setState({ tableCellList }, () => {
      this.props.onChangeList(tableCellList);
    });
  }

  public onChangeList = (tableCellList: ITableCellDetail[]) => {
    this.setState({ tableCellList }, () => {
      this.props.onChangeList(tableCellList);
    });
  }

  public toggleAddFirstStatus = () => {
    this.setState({
      addFirstStatus: !this.state.addFirstStatus
    });
  }

  public render() {
    const state = this.state;
    const { title } = this.props;

    return (
      <div className="form-table-component">
        {title ? <div className="form-table-component-title">{title}</div> : null}
        <div className="form-table-component-block">
          <div className="form-table-component-header">
            {
              TableCellType.map((value, index) => {
                return (<div className={this.classNames('header-cell', `cell-${value}`)} key={index}>{value}</div>);
              })
            }
          </div>
          <div className="form-table-component-body">
            {
              state.tableCellList.map((value, index) => {
                return (
                  <BodyCell
                    onEditValue={this.onEditValue}
                    onAddValue={this.onAddValue}
                    onDeleteCell={this.onDeleteCell}
                    cellIndex={index}
                    className="body-cell"
                    key={index + (value.name || '')}
                    cellDetail={value} />
                );
              })
            }
          </div>
          {
            !state.tableCellList.length &&
            <div onClick={this.toggleAddFirstStatus} className={`form-table-component-add-btn ${state.addFirstStatus ? '' : 'add'}`}></div>
          }
          {!state.tableCellList.length && state.addFirstStatus &&
            <EditBlock
              defaultValue={state.addValue}
              onConfirm={this.onAddValue}
              onCancel={this.toggleAddFirstStatus}
              title={'add node'}
            />
          }
        </div>
        {/* <div
        onClick={this.addBodyCell} className="form-table-component-add-btn"></div> */}
      </div>
    );
  }
}