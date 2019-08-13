import React from 'react';
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import './style/form.table.less';
import { IBodyCellProps } from './propsType';

export default class BodyCell extends CoreComponent<IBodyCellProps, any> {

  public state = {
  };

  public componentDidMount() {
  }

  public render() {
    // const state = this.state;
    const {cellDetail, className} = this.props;

    return (
      <tr>
        <td className={className}>
          {cellDetail.name}
        </td>
        <td className={className}>
          {cellDetail.type}
        </td>
        <td className={className}>
          {cellDetail.explain}
        </td>
        <td className={className}>
          {cellDetail.example}
        </td>
        <td className={className}>
          {cellDetail.enum}
        </td>
        {
          cellDetail.parents ?
          <td className={className}>
            {cellDetail.parents}
          </td> : null
        }
      </tr>
    );
  }
}