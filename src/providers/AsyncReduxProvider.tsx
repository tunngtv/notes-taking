import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store/store";

interface AsyncReduxProviderProps {
  children: React.ReactNode;
}

const AsyncReduxProvider: React.FC<AsyncReduxProviderProps> = ({
  children,
}) => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeStore = async () => {
      try {
        // Wait for the store to be initialized with persisted data
        const persistedState = await import("../utils/localStorage").then(mod =>
          mod.loadState()
        );
        if (persistedState) {
          store.dispatch({ type: "RESET_STATE", payload: persistedState });
        }
      } catch (error) {
        console.error("Failed to initialize store:", error);
      } finally {
        setIsInitialized(true);
      }
    };

    initializeStore();
  }, []);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return <Provider store={store}>{children}</Provider>;
};

export default AsyncReduxProvider;
