import React from 'react';
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import './style/form.table.less';
import { IFormTableProps, ITableCellDetail } from './propsType';
import BodyCell from './BodyCell';
import EditBlock from './EditBlock';

const TableCellType = ['Name', 'Type', 'Explain', 'Example', 'Enum', 'Parents', 'operate'];

export default class FormTable extends CoreComponent<IFormTableProps, any> {

  public state = {
    addFirstStatus: false,
    tableCellList: [
      // {
      //   name: 'color',
      //   type: 'string',
      //   explain: '颜色',
      //   example: '#fff',
      //   enum: 'a=1',
      //   parents: 'data'
      // },
      // {
      //   name: 'text',
      //   type: 'boolean',
      //   explain: '颜色',
      //   example: '#fff',
      //   enum: 'a=1,b=2,c=3,',
      //   parents: 'data'
      // },
      // {
      //   name: 'name',
      //   type: 'array',
      //   explain: '颜色',
      //   example: '#fff',
      //   enum: 'a=1,b=2,c=3,d=4,e=5,f=6',
      //   parents: 'data.dads'
      // },
      // {
      //   name: 'age',
      //   type: 'number',
      //   explain: '颜色',
      //   example: '#fff',
      //   enum: 'a=1,b=2,c=3,d=4,e=5,f=6',
      //   parents: 'data'
      // }
    ] as ITableCellDetail[],
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
    this.setState({ tableCellList });
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