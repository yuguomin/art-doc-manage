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
    const MDHandleClass = this.getMDHandleClass();
    this.downloadFile('a.md', MDTool.AST2MD(MDHandleClass.getAST()));
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
  }

  private getMDHandleClass = () => {
    const {
      selectMethod: method,
      urlValue: url,
      descriptionValue: description,
      requestList,
      responseList,
      JSONText
    } = this.state;
    return new MDHandle({
      method, url, description: description || ' ', requestList, responseList, JSONText
    });
  }

  public getResultEle = () => {
    return this.getMDHandleClass().getHTML();
  }

  public changeJSONText = (value: IJSONValue) => {
    this.setState({ JSONText: value.value });
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
        <div className="doc-form-container">
          <div className="form-block">
            <div className="detail-block">
              <div className="detail-item">
                <span>接口描述:</span>
                <SearchInput
                  verifyValue={this.verifyDescription}
                  onChangeValue={this.changeDescription} />
              </div>
              <div className="detail-item">
                <span>请求路径:</span>
                <SearchInput
                  prefix={'/'}
                  verifyValue={this.verifyUrl}
                  onChangeValue={this.changeUrl} />
              </div>
              <div className="detail-item">
                <span>请求方法:</span>
                <Select
                  defaultValue={state.selectMethod}
                  disable={false}
                  selectList={state.selectMethodsList}
                  onClickItem={this.chooseMethod} />
              </div>
            </div>
            <FormTable
              onChangeList={this.getRequestList}
              title={'请求参数'}
            />
            <FormTable
              onChangeList={this.getResponseList}
              title={'响应参数'}
            />
            <Textarea
              onChangeValue={this.changeJSONText}
              verifyValue={this.verifyJSON}
              title="JSON示例" />
          </div>
          <div className="result-show-frame" dangerouslySetInnerHTML = {{ __html: this.getResultEle() }}></div>
        </div>
        <div className="create-btn disable" onClick={this.createMDFile}>创建</div>
      </div>
    );
  }
}