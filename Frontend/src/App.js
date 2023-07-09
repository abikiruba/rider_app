import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Create from "./CreateRider";
import UpdateRider from "./UpdateRider";

function App() {
  return(
    <BrowserRouter>
        <Routes>
           <Route path="/" element={<Home />}></Route>
           <Route path="/create" element={<Create/>}></Route>
           <Route path="/UpdateRider/:id" element={<UpdateRider/>}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;