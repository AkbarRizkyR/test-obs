import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import UserList from "./pages/UserList";
import UserCreate from "./pages/UserCreate";
import UserEdit from "./pages/UserEdit";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/" element={<UserList />} />
              <Route path="/create" element={<UserCreate />} />
              <Route path="/edit/:id" element={<UserEdit />} />
            </Routes>
          </MainLayout>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
