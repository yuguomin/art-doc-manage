export interface ISearchInputProps {
  disable?: boolean;
  defaultValue?: string;
  inputStyle?: any;
  isLockInputToSearch?: boolean; // input value must in searchScope
  itemStyle?: any;
  searchScope: string[];
  verifyInputValue?: (inputValue: string) => string;
  onClickItem?: (clickItem: string) => void;
  onChangeValue?: (inputValue: string) => void;
}