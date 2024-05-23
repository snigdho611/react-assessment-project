import { QueryClient } from "@tanstack/react-query";
import { get, set, del } from "idb-keyval";
import {
  PersistedClient,
  Persister,
} from "@tanstack/react-query-persist-client";

export const queryClient = new QueryClient({
  //   defaultOptions: {
  //     queries: {
  //       gcTime: 1000 * 60 * 60 * 24, // 24 hours
  //     },
  //   },
});

export const createIDBPersister = (idbValidKey: IDBValidKey = "reactQuery") => {
  return {
    persistClient: async (client: PersistedClient) => {
      console.log(idbValidKey, client);
      await set(idbValidKey, client);
    },
    restoreClient: async () => {
      return await get<PersistedClient>(idbValidKey);
    },
    removeClient: async () => {
      await del(idbValidKey);
    },
  } as Persister;
};
