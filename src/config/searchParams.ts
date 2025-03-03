import { createSearchParamsCache, parseAsString } from "nuqs/server";

export const SearchParams = {
  conversation: parseAsString.withDefault(""),
};

export const searchParamsCache = createSearchParamsCache(SearchParams);
