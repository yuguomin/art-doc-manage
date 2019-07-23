export interface ISelectProps {
  disable?: boolean;
  selectList: Array<ISelectItem|string>;
  defaultValue?: string;
  inputStyle?: any;
  itemStyle?: any;
  onClickItem?: (selectItem: ISelectItem) => void;
}

export interface ISelectItem {
  value: string;
  disable?: boolean;
}