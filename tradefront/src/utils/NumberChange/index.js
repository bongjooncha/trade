// 숫자, ., 만 허용하는 식(string => string)
export const numberWriter = (value) => {
  const regex = /^[0-9,.]*$/;
  if (regex.test(value)) {
    // 입력된 값에서 쉼표(,) 제거
    const numberWithoutCommas = value.replace(/,/g, "");
    // 세 자리마다 쉼표(,) 추가하는 함수
    const formattedValue = addCommas(numberWithoutCommas);
    return formattedValue;
  }
};

// 컴마 추가(string => string)
export const addCommas = (value) => {
  if (!value) return "0";
  let roundedValue;
  if (value >= 1000) {
    roundedValue = value.toFixed(0);
  } else if (value >= 10) {
    roundedValue = value.toFixed(2);
  } else {
    roundedValue = value.toFixed(6);
  }
  const parts = roundedValue.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

// 컴마 제거(string => float)
export const delComma = (value) => {
  const regex = /^[0-9,.]*$/;
  if (regex.test(value)) {
    // 쉼표(,) 제거 후 부동 소수점으로 변환하여 상태 업데이트
    const num = value.replace(/,/g, "");
    return num; // 변환된 부동 소수점 값 콘솔 출력
  }
};
