import { QueryClient } from "@tanstack/react-query";
import { get, set, del } from "idb-keyval";
import {
  PersistedClient,
  Persister,
} from "@tanstack/react-query-persist-client";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: import.meta.env.VITE_STALE_TIME, // 1 hour
    },
  },
});

export const createIDBPersister = (idbValidKey: IDBValidKey = "reactQuery") => {
  return {
    persistClient: async (client: PersistedClient) => {
      // console.log(idbValidKey, client);
      console.log("Client wa persisted", idbValidKey, client);
      await set(idbValidKey, client);
    },
    restoreClient: async () => {
      console.log("Client was restored", idbValidKey);
      return await get<PersistedClient>(idbValidKey);
    },
    removeClient: async () => {
      console.log("Client was removed", idbValidKey);
      await del(idbValidKey);
    },
  } as Persister;
};
