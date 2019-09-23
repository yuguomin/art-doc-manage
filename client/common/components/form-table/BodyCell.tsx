import React from 'react';
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import { IBodyCellProps } from './propsType';
import EditBlock from './EditBlock';

export default class BodyCell extends CoreComponent<IBodyCellProps, any> {

  public state = {
  };

  public componentDidMount() {
  }

  public onEdit = () => {

  }

  public onDel = () => {

  }

  public render() {
    // const state = this.state;
    const { cellDetail, className } = this.props;

    return (
      <div>
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
          <span onClick={this.onDel}>del</span>
        </div>
        <EditBlock></EditBlock>
      </div>
    );
  }
}