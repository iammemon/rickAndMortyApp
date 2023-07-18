import { Client, cacheExchange, fetchExchange } from "urql";

const client = new Client({
  //normally this should come from .env var but for test purpose I am using hardcode value
  url: "https://rickandmortyapi.com/graphql",
  exchanges: [cacheExchange, fetchExchange],
});

export { client };
