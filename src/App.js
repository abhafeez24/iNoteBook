import "./App.css";
import Navbar from "./componets/Navbar";
import Home from "./componets/Home";
import About from "./componets/About";
import Alert from "./componets/Alert";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Login from "./componets/Login";
import Footer from "./componets/Footer";
import Signup from "./componets/Signup";
import { useState } from "react";

function App() {
  const [alert, setAlert] = useState(null)

  const showAlert = (message, type)=> {
    setAlert({
      message,
      type
    })

    setTimeout(() => {
      setAlert(null)
    }, 1000);
  }



  return (
    <>
      <NoteState showAlert={showAlert}>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />}></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/login" element={<Login showAlert={showAlert} />}></Route>
              <Route exact path="/signup" element={<Signup showAlert={showAlert} />}></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
      <Footer />
    </>
  );
}

export default App;
