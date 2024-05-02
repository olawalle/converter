import { useEffect, useState } from "react";
import { fetchMarkets, fetchTickers } from "../services";

const useConverter = () => {
  const [allCurrencies, setAllCurrencies] = useState([]);
  const [markets, setMarkets] = useState([]);
  const [tickers, setTickers] = useState({});
  useEffect(() => {
    fetchTickerhandler();
    fetchMarkethandler();
  }, []);

  const fetchMarkethandler = async () => {
    try {
      const response = await fetchMarkets();
      const marketData = response.data.data;
      setMarkets(marketData);
      let currencies = [];
      marketData.forEach((item) => {
        !currencies.includes(item.base_unit) && currencies.push(item.base_unit);
        !currencies.includes(item.quote_unit) &&
          currencies.push(item.quote_unit);
      });
      setAllCurrencies(currencies);
    } catch (error) {}
  };

  const fetchTickerhandler = async () => {
    try {
      const response = await fetchTickers();
      setTickers(response.data.data);
    } catch (error) {}
  };

  const currencyConverter = (amount, from, to) => {
    const marketToUse = markets.find((market) => {
      return (
        (market.base_unit === from && market.quote_unit === to) ||
        (market.quote_unit === from && market.base_unit === to)
      );
    });
    console.log("marketToUse", marketToUse);
    let result;

    if (marketToUse) {
      const tickerID = marketToUse.id;
      const ticketInfo = tickers[tickerID];
      const conversionStrategy = tickerID === `${from}${to}`;
      result = conversionStrategy
        ? amount * Number(ticketInfo.ticker.last)
        : amount / Number(ticketInfo.ticker.last);
    } else {
      //   const alienCurrency = from;
      //   let intermediateMarket = `usdt${alienCurrency}`;
      //   let intermediateMarket2 = `${alienCurrency}usdt`;
      //   const tickerID = tickers[intermediateMarket]
      //     ? intermediateMarket
      //     : intermediateMarket2;
      //   console.log("tickers[tickerID]", tickers[tickerID].ticker.last);
      //   const alienAmount = amount * tickers[tickerID].ticker.last;

      //   result = currencyConverter(alienAmount, "udst", to);
      throw Error("Cannot handle this pair");
    }
    return result;
  };

  return {
    currencyConverter,
    allCurrencies,
  };
};

export default useConverter;
