export interface ITextareaProps {
  title?: string;
  defaultValue: string;
  onChangeValue?: (valueInfo: IJSONValue) => void;
  verifyValue?: (valie: string) => boolean;
}

export interface IJSONValue {
  value: string;
  isCorrect: boolean;
}