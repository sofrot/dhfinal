import './styles/App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { AppRouter } from './routes/AppRouter';
import { BrowserRouter } from "react-router-dom";
import { createContext, useState, useContext } from 'react';

function App(props) {
  const [isUser, setIsUser] = useState(localStorage.getItem('user') ? true : false);
  const changeIsUser = (value) => {
    setIsUser(value);
  }

  return (
    <>
      <BrowserRouter>
        <Header isUser={isUser} changeIsUser={changeIsUser} />
        <AppRouter changeIsUser={changeIsUser} />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
