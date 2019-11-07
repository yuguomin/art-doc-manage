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
import MDHandle from '../help/createMDAST';
import Textarea from 'client/common/components/textarea';
import { IJSONValue } from 'client/common/components/textarea/propsType';

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
    responseList: [] as ITableCellDetail[],
    JSONText: ''
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
    const {
      selectMethod: method,
      urlValue: url,
      descriptionValue: description,
      requestList,
      responseList,
      JSONText
    } = this.state;
    const ast = new MDHandle({
      method, url, description, requestList, responseList, JSONText
    });
    // console.log(ast.getAST());
    console.log(ast.getAST());
    // console.log(ast);
    // console.log(MDTool.MD2AST('#### example\n```json\n{"code": 0,\n"msg": "用户卡列表"\n}```'));
    this.downloadFile('a.md', MDTool.AST2MD(ast.getAST()));
  }

  public downloadFile = (fileName, content) => {
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

  public changeJSONText = (value: IJSONValue) => {
    this.setState({JSONText: value.value});
  }

  private verifyUrl = (value) => {
    const urlPathReg = /^(\/[a-zA-Z0-9\-_%]+)+$/;
    return urlPathReg.test(value);
  }

  private verifyDescription = (value) => {
    return Boolean(value.trim());
  }

  private verifyJSON = (value) => {
    try {
      if (typeof JSON.parse(value) === 'object') {
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
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
              <SearchInput
                verifyValue={this.verifyDescription}
                onChangeValue={this.changeDescription} />
            </div>
            <div className="detail-item">
              <span>URL:</span>
              <SearchInput
                prefix={'/'}
                verifyValue={this.verifyUrl}
                onChangeValue={this.changeUrl} />
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
          <Textarea
            onChangeValue={this.changeJSONText}
            verifyValue={this.verifyJSON}
            title="example" />
        </div>
        <div className="create-btn" onClick={this.createMDFile}>create</div>
      </div>
    );
  }
}