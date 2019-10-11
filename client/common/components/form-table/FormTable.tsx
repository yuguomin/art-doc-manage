import React from 'react';
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import './style/form.table.less';
import { IFormTableProps, ITableCellDetail } from './propsType';
import BodyCell from './BodyCell';

const TableCellType = ['Name', 'Type', 'Explain', 'Example', 'Enum', 'Parents', 'operate'];

export default class Select extends CoreComponent<IFormTableProps, any> {

  public state = {
    tableCellList: [
      {
        name: 'color',
        type: 'string',
        explain: '颜色',
        example: '#fff',
        enum: 'a=1',
        parents: 'data'
      },
      {
        name: 'text',
        type: 'boolean',
        explain: '颜色',
        example: '#fff',
        enum: 'a=1,b=2,c=3,d=4,e=5,f=6',
        parents: 'data'
      },
      {
        name: 'name',
        type: 'array',
        explain: '颜色',
        example: '#fff',
        enum: 'a=1,b=2,c=3,d=4,e=5,f=6',
        parents: 'data.dads'
      },
      {
        name: 'age',
        type: 'number',
        explain: '颜色',
        example: '#fff',
        enum: 'a=1,b=2,c=3,d=4,e=5,f=6',
        parents: 'data'
      }
    ] as ITableCellDetail[]
  };

  public componentDidMount() {
  }

  public onDeleteCell = (cellIndex: number) => {
    const tableCellList = this.state.tableCellList;
    tableCellList.splice(cellIndex, 1);
    this.setState({ tableCellList });
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
                  <BodyCell onDeleteCell={this.onDeleteCell} cellIndex={index} className="body-cell" key={index + value.name} cellDetail={value} />
                );
              })
            }
          </div>
        </div>
        {/* <div onClick={this.addBodyCell} className="form-table-component-add-btn"></div> */}
      </div>
    );
  }
}