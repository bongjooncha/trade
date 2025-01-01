export interface IndexButtonProps {
  elements: { ticker: string; name: string }[];
  selected: string[];
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface BaseButtonProps {
  baseCurrency: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
