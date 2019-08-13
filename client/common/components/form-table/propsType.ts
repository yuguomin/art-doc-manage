export interface IFormTableProps {
  title?: string;
}

export interface IBodyCellProps {
  cellDetail: ITableCellDetail;
}

export interface ITableCellDetail {
  name: string;
  type: string;
  explain: string;
  parents: string;
  example: string;
  enum: string;
}