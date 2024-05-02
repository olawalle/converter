const markets = [
  { id: "btcusdt", name: "BTC/USDT", base_unit: "btc", quote_unit: "usdt" },
  { id: "usdtngn", name: "USDT/NGN", base_unit: "usdt", quote_unit: "ngn" },
  { id: "ethusdt", name: "ETH/USDT", base_unit: "eth", quote_unit: "usdt" },
];

const tickers = {
  btcusdt: {
    ticker: {
      buy: "62248.09",
      sell: "62350.62",
      low: "17687.22",
      high: "64198.86",
      open: "63782.71",
      last: "62281.7",
      vol: "716.10468025",
    },
  },
  ethusdt: {
    ticker: {
      buy: "3000.1",
      sell: "3198.65",
      low: "3000.1",
      high: "3396.53",
      open: "3301.83",
      last: "3165.71",
      vol: "9461.6864578297902843",
    },
  },
  usdtngn: {
    ticker: {
      buy: "1347.0",
      sell: "1361.87",
      low: "1314.55",
      high: "1368.99",
      open: "1317.79",
      last: "1347.0",
      vol: "355627.7916997344035885",
    },
  },
};

export const currencyConverter = (amount, from, to) => {
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
    const alienCurrency = from;
    let intermediateMarket = `usdt${alienCurrency}`;
    let intermediateMarket2 = `${alienCurrency}usdt`;
    const tickerID = tickers[intermediateMarket]
      ? intermediateMarket
      : intermediateMarket2;
    console.log("tickers[tickerID]", tickers[tickerID].ticker.last);
    const alienAmount = amount * tickers[tickerID].ticker.last;

    result = currencyConverter(alienAmount, "udst", to);
  }
  console.log("result", result);
  return result;
};
