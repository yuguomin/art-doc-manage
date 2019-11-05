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
import MDTool from 'marked-ast';

export default class DocFormIndex extends CoreComponentAll<any, any> {

  constructor(props, context) {
    super(props, context);
    this.indexService = new IndexService();
  }

  public state = {
    selectMethodsList: requestMethods,
    selectMethod: requestMethods[0],
    // defaultMethod: 'get',
    urlValue: '',
    descriptionValue: '',
    requestList: [] as ITableCellDetail[],
    responseList: [] as ITableCellDetail[]
  };

  public indexService: IndexService;

  public chooseMethod = (methodInfo: ISelectItem) => {
    this.setState({ selectMethod: methodInfo.value });
  }

  public changeDescription = (value: IChangeValueInfo) => {
    this.setState({ descriptionValue: value.value });
  }

  public changeUrl = (value: IChangeValueInfo) => {
    this.setState({ urlValue: value.value });
  }

  public getRequestList = (requestList: ITableCellDetail[]) => {
    this.setState({ requestList });
  }

  public getResponseList = (responseList: ITableCellDetail[]) => {
    this.setState({ responseList });
  }

  public createMDFile = () => {
    // const md = readFileSync('../services/interfaces/IBankList.md', 'UTF8');
    // const tokens = marked.lexer(`### 我`);
    // console.log(marked.parser(tokens));
    const ast = MDTool.MD2AST(`
1. 用户银行卡列表获取接口

  #### detail

  | 类别 | 详情 |
  | --- | --- |
  | request-method | GET |
  | request-url | /pb/card/list |

  #### params

  | 参数名    | 类型  | 说明     | 示例 | 值选项 | rename |
  | --------- | ----- | -------- | ---- | --- | --- |

  #### explain

  | 参数名           | 类型      | 说明                 | parents | 示例  | 值选项 | rename |
  | --------------- | --------- | ------------------- | ------- | ---- | ----- | ------ |
  | bank_list       | object    | 银行卡列表           | data | | | |
  | card_id| string |  | data.bank_list| | | |
  | customer_id| string | 用户ID | data.bank_list| | | |
  | card_num| string | 银行卡号 | data.bank_list| | | |
  | card_short_num| string | 卡号后四位 | data.bank_list| | | |
  | card_type| int | 卡片类型(1信用卡 2储蓄卡) | data.bank_list| 1 | credit_card:1,debit_card:2 | |

2. 用户银行卡列表获取接口

  #### detail

  | 类别 | 详情 |
  | --- | --- |
  | request-method | GET |
  | request-url | /pb/card/listtttt |

  #### params

  | 参数名    | 类型  | 说明     | 示例 | 值选项 | rename |
  | --------- | ----- | -------- | ---- | --- | --- |

  #### explain

  | 参数名           | 类型      | 说明                 | parents | 示例  | 值选项 | rename |
  | --------------- | --------- | ------------------- | ------- | ---- | ----- | ------ |
  | bank_list       | object    | 银行卡列表           | data | | | |
  | card_id| string |  | data.bank_list| | | |
    `);
    console.log(ast);
    this.downloadFile('a.md', MDTool.AST2MD(ast));
  }

  public downloadFile(fileName, content) {
    const aLink = document.createElement('a');
    const blob = new Blob([content]);
    const evt = document.createEvent('HTMLEvents');
    evt.initEvent('click', false, false); // initEvent 不加后两个参数在FF下会报错
    aLink.download = fileName;
    aLink.href = URL.createObjectURL(blob);
    aLink.dispatchEvent(evt);
    aLink.click();
    // console.log(document.createEvent);
  }

  private verifyUrl = (value) => {
    const urlPathReg = /^(\/[a-zA-Z0-9\-_%]+)+$/;
    return urlPathReg.test(value);
  }

  private verifyDescription = (value) => {
    return Boolean(value.trim());
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
              <SearchInput verifyValue={this.verifyDescription} onChangeValue={this.changeDescription} />
            </div>
            <div className="detail-item">
              <span>URL:</span>
              <SearchInput prefix={'/'} verifyValue={this.verifyUrl} onChangeValue={this.changeUrl} />
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