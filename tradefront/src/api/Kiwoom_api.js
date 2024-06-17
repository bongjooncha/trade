import axios from "axios";

// 백에서 받아올때
const BASE_URL = process.env.REACT_APP_BUILD_BASE_URL;

// 계좌번호 받아오기
export async function fetchAccountsNum() {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BUILD_BASE_URL}/kiwoom/accounts_num`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// 각 계좌 현황 받기
export async function fetchAccount(account) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BUILD_BASE_URL}/kiwoom/account`,
      { account: account }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
