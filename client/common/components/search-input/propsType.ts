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
  onChangeValue?: (inputValue: string) => void;
}