import axios from "axios";

export const fetchMarkets = () => {
  return axios.get("http://0.0.0.0:8080/https://www.quidax.com/api/v1/markets");
};

export const fetchTickers = () => {
  return axios.get(
    "http://0.0.0.0:8080/https://www.quidax.com/api/v1/markets/tickers"
  );
};
