import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { useEffect } from "react";
import { getUserAction } from "./redux/actions/gerUseraction";

function App() {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserAction());
  }, [dispatch]);
  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to={"/"} />}
        />
      </Routes>
    </main>
  );
}

export default App;
