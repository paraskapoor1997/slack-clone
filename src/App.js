import "./App.css";
import Chat from "./components/Chat";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();
  console.log(user);
  return (
    <div className="App">
      <Router>
        {!user ? (
          <h1>
            <Login />
          </h1>
        ) : (
          <>
            <Header />
            <div className="app__body">
              <Sidebar />
              <Routes>
                <Route path="/room/:roomId" element={<Chat />}>
                  {/* <Chat /> */}
                  chat screen
                </Route>
                <Route exact path="/" element={<h3>Please select threads to continue</h3>}></Route>
              </Routes>
            </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
