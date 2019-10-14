export interface IFormTableProps {
  title?: string;
  onChangeList: (ITableCellDetail: ITableCellDetail[]) => void;
}

export interface IBodyCellProps {
  cellDetail: ITableCellDetail;
  onDeleteCell: (cellIndex: number) => void;
  cellIndex: number;
  onEditValue: (value: ITableCellDetail, index: number) => void;
  onAddValue: (value: ITableCellDetail, index: number) => void;
}

export interface IEditBlockProps {
  title?: string;
  onCancel: () => void;
  onConfirm: (result: IDefaultValue) => void;
  defaultValue: IDefaultValue;
}

export interface IDefaultValue {
  name?: string;
  type?: string;
  explain?: string;
  parents?: string;
  example?: string;
  enum?: string;
}

export interface ITableCellDetail {
  name?: string;
  type?: string;
  explain?: string;
  parents?: string;
  example?: string;
  enum?: string;
}
