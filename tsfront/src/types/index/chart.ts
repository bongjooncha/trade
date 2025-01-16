export interface ChartProps {
  options: any;
}

export interface ChartData {
  name: string;
  data: number[][] | undefined;
}

interface PriceItem {
  Date: string;
  Close: number;
}
export type PriceData = PriceItem[];

interface AverageItem {
  "AVG(Close)": number;
}
export type AverageData = AverageItem[];
