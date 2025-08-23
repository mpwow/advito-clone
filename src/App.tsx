import './App.css'
import {BrowserRouter, Route, Routes} from "react-router";
import MainPage from "./Pages/Main/MainPage.tsx";
import AddCardPage from "./Pages/AddCard/AddCardPage.tsx";
import SingleCardPage from "./Pages/SingleCard/SingleCard.tsx";



function App() {


  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/add-new-card" element={<AddCardPage/>}/>
            <Route path="/list/:cardId" element={<SingleCardPage/>}/>
            <Route path="/edit-card/:cardId" element={<AddCardPage isEdit={true}/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
