import { Route, Routes } from "react-router-dom";
import Layout from "./component/Layout";
import Home from "./pages/Home";
import Answer from "./component/Answer/Answer";
import Login from "./pages/Login";
import Choose from "./pages/Choose";
import Contact from "./pages/Contact";
import { useAuth } from "./component/provider/AuthContext";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {isAuthenticated && <Route path="/choose" element={<Choose />} />}
      <Route path="/" element={isAuthenticated ? <Layout /> : <Login />}>
        <Route index element={<Home />} />
        <Route element={<Answer />} path="/:slug" />
        <Route element={<Contact />} path="/contact" />
      </Route>
    </Routes>
  );
}

export default App;
