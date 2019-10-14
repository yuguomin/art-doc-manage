import React from 'react';
import IndexService from '../services/IndexService';
import CoreComponentAll from 'art-lib-react/src/core_all/CoreComponentAll';
import TopNav from '../../common/components/top-nav';
import Select from 'client/common/components/select';
import { requestMethods } from '../constant/doc-map';
import { ISelectItem } from 'client/common/components/select/propsType';
import SearchInput from 'client/common/components/search-input';
import FormTable from 'client/common/components/form-table';
import { IChangeValueInfo } from 'client/common/components/search-input/propsType';
import { ITableCellDetail } from 'client/common/components/form-table/propsType';

export default class DocFormIndex extends CoreComponentAll<any, any> {

  constructor(props, context) {
    super(props, context);
    this.indexService = new IndexService();
  }

  public state = {
    selectMethodsList: requestMethods,
    selectMethod: 'get',
    // defaultMethod: 'get',
    requestList: [] as ITableCellDetail[],
    responseList: [] as ITableCellDetail[]
  };

  public indexService: IndexService;

  public chooseMethod = (methodInfo: ISelectItem) => {
    this.setState({ selectMethod: methodInfo.value });
  }

  public changeSearch = (value: IChangeValueInfo) => {
    // console.log('change', value);
  }

  public getRequestList = (requestList: ITableCellDetail[]) => {
    this.setState({ requestList });
  }

  public getResponseList = (responseList: ITableCellDetail[]) => {
    this.setState({ responseList });
  }

  public createMDFile = () => {
    console.log(this.state);
  }

  private verifyUrl = (value) => {
    const urlPathReg = /^(\/[a-zA-Z0-9\-_%]+)+$/;
    return urlPathReg.test(value);
  }

  public render() {
    const state = this.state;
    return (
      <div className="doc-form-page">
        <TopNav />
        <div className="form-block">
          <div className="detail-block">
            <div className="detail-item">
              <span>Description:</span>
              <SearchInput onChangeValue={this.changeSearch} />
            </div>
            <div className="detail-item">
              <span>URL:</span>
              {/* <Select
                defaultValue={state.defaultMethod}
                disable={false}
                selectList={state.selectMethodsList}
                onClickItem={this.chooseMethod} /> */}
              <SearchInput prefix={'/'} verifyValue={this.verifyUrl} onChangeValue={this.changeSearch} />
            </div>
            <div className="detail-item">
              <span>Method:</span>
              <Select
                defaultValue={state.selectMethod}
                disable={false}
                selectList={state.selectMethodsList}
                onClickItem={this.chooseMethod} />
            </div>
          </div>
          <FormTable
            onChangeList={this.getRequestList}
            title={'Request Params'}
          />
          <FormTable
            onChangeList={this.getResponseList}
            title={'Reponse Params'}
          />
        </div>
        <div className="create-btn" onClick={this.createMDFile}>create</div>
      </div>
    );
  }
}