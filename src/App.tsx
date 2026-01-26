import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import Navbar from "@/components/navbar/Navbar";
import PanelsContainer from "@/components/panelsContainer/PanelsContainer.component";
import { useAuth } from "./contexts/AuthContext";
import AuthView from "./components/auth/AuthView";

const App = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthView />;
  }

  return (
    <Provider store={store}>
      <main className="main">
        <Navbar />
        <PanelsContainer />
      </main>
    </Provider>
  );
};

export default App;
