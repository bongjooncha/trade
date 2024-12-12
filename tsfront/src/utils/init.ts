export const formatNumber = (value: number) => {
  let minimumFractionDigits: number;
  let maximumFractionDigits: number;
  const absValue = Math.abs(value);

  if (absValue >= 1000) {
    minimumFractionDigits = 0;
    maximumFractionDigits = 0;
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
  value: [number, number, string | null][]
): string | number => {
  // 설정 x
  if (!value || value.length === 0) return "-";
  // 하나만 설정
  else if (value.length === 1) return value[0][0];
  // 여러개 설정
  else return 0;
  //   const sum = value.reduce((acc, v) => {
  //     const product = v[1] == null ? v[0] * v[1] : v[0];
  //     return acc + product;
  //   }, 0);
  //   const totalWeight = value.reduce(
  //     (acc, v) => acc + (v[1] !== 0 ? v[1] : 0),
  //     0
  //   );
  //   const average = totalWeight !== 0 ? sum / totalWeight : 0;
  //   return average;
};
