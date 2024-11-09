export const currency = [
  { ticker: "USD", name: "미국 달러" },
  { ticker: "KRW", name: "한국 원" },
  { ticker: "EUR", name: "유로" },
  { ticker: "JPY", name: "일본 엔" },
  { ticker: "GBP", name: "영국 파운드" },
  { ticker: "CNY", name: "중국 위안" },
  { ticker: "HKD", name: "홍콩 달러" },
  { ticker: "SGD", name: "싱가포르 달러" },
  { ticker: "CHF", name: "스위스 프랑" },
  { ticker: "AUD", name: "호주 달러" },
  { ticker: "CAD", name: "캐나다 달러" },
  { ticker: "NZD", name: "뉴질랜드 달러" },
  { ticker: "INR", name: "인도 루피" },
  { ticker: "MXN", name: "멕시코 페소" },
  { ticker: "BRL", name: "브라질 레알" },
  { ticker: "ZAR", name: "남아프리카 랜드" },
  { ticker: "TRY", name: "터키 리라" },
  { ticker: "RUB", name: "러시아 루블" },
  { ticker: "SEK", name: "스웨덴 크로나" },
  { ticker: "NOK", name: "노르웨이 크로네" },
  { ticker: "DKK", name: "덴마크 크로네" },
  { ticker: "PLN", name: "폴란드 즈로티" },
  { ticker: "ILS", name: "이스라엘 셰켈" },
  { ticker: "HUF", name: "헝가리 포린트" },
  { ticker: "CZK", name: "체코 코루나" },
  { ticker: "THB", name: "태국 바트" },
  { ticker: "MYR", name: "말레이시아 링깃" },
  { ticker: "PHP", name: "필리핀 페소" },
  { ticker: "IDR", name: "인도네시아 루피아" },
];

export const chartOptions = (baseCurrency: string, data: any) => {
  return {
    chart: {
      type: "spline",
      zoomType: "x", // X축 기준으로 확대/축소 활성화
      height: 50 + "%",
    },
    title: {
      text: `${baseCurrency} 기준 국가 별 환율 등락비`,
      align: "left",
    },
    subtitle: {
      text: "18년 1월1일 부터의 평균을 기준으로 함",
      align: "left",
    },
    xAxis: {
      type: "datetime",
      dateTimeLabelFormats: {
        day: "%Y-%m-%d",
      },
      title: {
        text: "Date",
      },
    },
    yAxis: {
      title: {
        text: "환율",
      },
      plotLines: [
        {
          value: 0,
          color: "brown",
          width: 2,
          label: {
            text: `${baseCurrency}`,
            align: "right",
            style: {
              color: "brown",
              fontWeight: "bold",
            },
          },
        },
      ],
    },
    tooltip: {
      crosshairs: true,
      shared: true,
      pointFormat: "<br/>{series.name}: <b>{point.y:.2f}%</b>",
    },
    plotOptions: {
      spline: {
        marker: {
          radius: 4,
          lineColor: "#666666",
          lineWidth: 1,
        },
      },
    },
    series: data,
  };
};
