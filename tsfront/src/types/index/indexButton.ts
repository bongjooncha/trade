export interface IndexButtonProps {
  elements: any[];
  selected: string[];
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface BaseButtonProps {
  baseCurrency: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
