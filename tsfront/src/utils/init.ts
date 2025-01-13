import { TP_SL_Order } from "types/coin";

export const formatNumber = (value: number) => {
  let minimumFractionDigits: number;
  let maximumFractionDigits: number;
  const absValue = Math.abs(value);

  if (absValue >= 1000) {
    minimumFractionDigits = 0;
    maximumFractionDigits = 0;
  } else if (absValue >= 10) {
    minimumFractionDigits = 1;
    maximumFractionDigits = 1;
  } else if (absValue >= 1) {
    minimumFractionDigits = 1;
    maximumFractionDigits = 2;
  } else {
    minimumFractionDigits = 1;
    maximumFractionDigits = 3;
  }

  return new Intl.NumberFormat("ko-KR", {
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
};

export const formatTPSL = (
  value: TP_SL_Order[]
): string | number | undefined => {
  // 설정 x
  if (value.length === 0) return "-";
  // 하나만 설정
  else if (value.length === 1) return value[0].triggerPrice;
  // 여러개 설정
  const sum = value.reduce((acc, v) => {
    const product =
      v.amount !== null ? v.triggerPrice * v.amount : v.triggerPrice;
    return acc + product;
  }, 0);
  const totalWeight = value.reduce(
    (acc, v) => acc + (v.amount !== null ? v.amount : 0),
    0
  );
  const average = totalWeight !== 0 ? sum / totalWeight : 0;
  return average;
};
