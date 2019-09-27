export interface IFormTableProps {
  title?: string;
}

export interface IBodyCellProps {
  cellDetail: ITableCellDetail;
  onDeleteCell: (cellIndex: number) => void;
  cellIndex: number;
}

export interface IEditBlockProps {
  title?: string;
}

export interface ITableCellDetail {
  name: string;
  type: string;
  explain: string;
  parents: string;
  example: string;
  enum: string;
}
