export interface ISearchInputProps {
  prefix?: string;
  disable?: boolean;
  defaultValue?: string;
  inputStyle?: any;
  isLockInputToSearch?: boolean; // input value must in searchScope
  itemStyle?: any;
  searchScope: string[];
  verifyValue?: (inputValue: string) => boolean;
  formatInputValue?: (inputValue: string) => string;
  onChangeValue?: (changeValueInfo: IChangeValueInfo) => void;
}

export interface IChangeValueInfo {
  value: string;
  isCorrect: boolean;
}