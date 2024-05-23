import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// import { QueryClientProvider } from "@tanstack/react-query";
import { createIDBPersister, queryClient } from "./query/client/index.ts";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

// queryClient.invalidateQueries({ queryKey: ["countries", "weather", "news"] });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: createIDBPersister() }}
    >
      <App />
    </PersistQueryClientProvider>
  </React.StrictMode>
);
