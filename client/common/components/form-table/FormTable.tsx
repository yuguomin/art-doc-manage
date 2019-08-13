import React from 'react';
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import './style/form.table.less';
import { IFormTableProps, ITableCellDetail } from './propsType';
import BodyCell from './BodyCell';

const TableCellType = ['Name', 'Type', 'Explain', 'Example', 'Enum', 'Parents'];

export default class Select extends CoreComponent<IFormTableProps, any> {

  public state = {
    tableCellList: [
      {
        name: 'color',
        type: 'string',
        explain: '颜色',
        example: '#fff',
        enum: '',
        parents: 'data'
      },
      {
        name: 'color',
        type: 'string',
        explain: '颜色',
        example: '#fff',
        enum: '',
        parents: 'data'
      }
    ] as ITableCellDetail[]
  };

  public componentDidMount() {
  }

  public addBodyCell = () => {
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
          <tbody className="form-table-component-body">
            {
              state.tableCellList.map((value, index) => {
                return (
                  <BodyCell className="body-cell" key={index} cellDetail={value} />
                );
              })
            }
          </tbody>
        </div>
        <div onClick={this.addBodyCell} className="form-table-component-add-btn"></div>
      </div>
    );
  }
}