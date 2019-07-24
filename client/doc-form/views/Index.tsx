import React from 'react';
import IndexService from '../services/IndexService';
import CoreComponentAll from 'art-lib-react/src/core_all/CoreComponentAll';
import TopNav from '../../common/components/top-nav';
import Select from 'client/common/components/select';
import { requestMethods } from '../constant/doc-map';
import { ISelectItem } from 'client/common/components/select/propsType';
import SearchInput from 'client/common/components/search-input';

export default class DocFormIndex extends CoreComponentAll<any, any> {

  constructor(props, context) {
    super(props, context);
    this.indexService = new IndexService();
  }

  public state = {
    selectMethodsList: requestMethods,
    selectMethod: '',
    defaultMethod: 'get'
  };

  public indexService: IndexService;

  public chooseMethod = (methodInfo: ISelectItem) => {
    this.setState({ selectMethod: methodInfo.value });
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
              <Select
                defaultValue={state.defaultMethod}
                disable={false}
                selectList={state.selectMethodsList}
                onClickItem={this.chooseMethod} />
            </div>
            <div className="detail-item">
              <span>URL:</span>
              {/* <Select
                defaultValue={state.defaultMethod}
                disable={false}
                selectList={state.selectMethodsList}
                onClickItem={this.chooseMethod} /> */}
              <SearchInput searchScope={[]}/>
            </div>
            <div className="detail-item">
              <span>Method:</span>
              <Select
                defaultValue={state.defaultMethod}
                disable={false}
                selectList={state.selectMethodsList}
                onClickItem={this.chooseMethod} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}