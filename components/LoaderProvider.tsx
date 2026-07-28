"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";
import PageLoader from "./PageLoader";

// import PageLoader from "./pageLoader";

const LoaderContext = createContext<any>(null);

export function LoaderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);

  const start = useCallback(() => {
    setLoading(true);
  }, []);

  const stop = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <LoaderContext.Provider value={{ start, stop }}>
      {children}
      {loading && <PageLoader />}
    </LoaderContext.Provider>
  );
}

export const useLoader = () => useContext(LoaderContext);