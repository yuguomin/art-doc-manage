import { ITableCellDetail } from 'client/common/components/form-table/propsType';
import CreateMDNode from './CreateMDNode';
import MDTool from 'marked-ast';

export default class MDHandle extends CreateMDNode {
  constructor(MDDetail: IAPIMDFormat) {
    super();
    this.createAST(MDDetail);
    this.AST2MD();
    this.AST2HTML();
  }

  private ASTRoot: any[];
  private MD: any;
  private HTML: any;

  private createAST = (MDDetail: IAPIMDFormat) => {
    this.ASTRoot = [];
    this.ASTRoot.push(this.createList(MDDetail.description));
    this.ASTRoot.push(this.createHeader(4, 'detail'));
    this.ASTRoot.push(this.createTable(['类别', '详情'], [['request-method', MDDetail.method], ['request-url', MDDetail.url]]));
    this.ASTRoot.push(this.createHeader(4, 'params'));
    this.ASTRoot.push(this.createTable(['参数名', '类型', '说明', 'parents', '示例', '值选项', 'rename'],
      MDDetail.requestList.map((value) => Object.values(value)), ['']));
    this.ASTRoot.push(this.createHeader(4, 'explain'));
    this.ASTRoot.push(this.createTable(['参数名', '类型', '说明', 'parents', '示例', '值选项', 'rename'],
      MDDetail.responseList.map((value) => Object.values(value)), ['']));
    this.ASTRoot.push(this.createHeader(4, 'example'));
    this.ASTRoot.push(this.createCode('json', MDDetail.JSONText));
  }

  private AST2MD = () => {
    this.MD = MDTool.AST2MD(this.ASTRoot);
  }

  private AST2HTML = () => {
    this.HTML = MDTool.MD2HTML(this.MD);
  }

  public getAST = () => {
    return this.ASTRoot;
  }

  public getMD = () => {
    return this.MD;
  }

  public getHTML = () => {
    return this.HTML;
  }
}

interface IAPIMDFormat {
  method: string;
  url: string;
  description: string;
  JSONText: string;
  requestList: ITableCellDetail[];
  responseList: ITableCellDetail[];
}