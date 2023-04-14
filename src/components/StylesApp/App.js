import './App.css';
import Cards from '../Cards/Cards.jsx';
import Nav from '../Nav/Nav';
import { useState, useEffect} from 'react';
import axios from 'axios';
import { Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import About from '../About/About';
import Detail from '../Detail/Detail';
import Form from '../Form/Form';

const URL_BASE = 'https://be-a-rym.up.railway.app/api/character';
const APY_KEY = 'eea8ccfe8ccd.80bf53751cab6f34aba8';

const email = 'yeijoh91@gmail.com';
const password = "123asd"

function App() {
   const location = useLocation();
   const navigate = useNavigate();
   const [characters, setCharacters] = useState([]);
   const [access, setAccess] = useState(false);

   const login = (userData) => {
      if (userData.password === password && userData.email === email) {
         setAccess(true);
         navigate('/home');
      }
   }

   useEffect(() => {
      !access && navigate('/');
   }, [access]);

   const onSearch = (id) => {
      axios(`${URL_BASE}/${id}?key=${APY_KEY}`)
      .then(response => response.data)
      .then((data) => { 
         if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
         } else {
            window.alert('¡No hay personajes con este ID!');
         }
      });
   }

   const onClose = (id) => {
      const charactersFiltered = characters.filter(character => character.id !== id)
      setCharacters(charactersFiltered)
   }

   return (
      <div className='App'>
         {
            location.pathname !== '/'
            ? <Nav onSearch={onSearch} />
            : null
         }
         
         <Routes>
            <Route path='/' element = {<Form login={login}/>} />
            <Route path='/home' element = {<Cards characters={characters} onClose={onClose}/>}/>
            <Route path='/About' element = {<About/>}/>
            <Route path='/Detail/:id' element = {<Detail/>}/>
         </Routes>
      </div>
   );
}

export default App;
