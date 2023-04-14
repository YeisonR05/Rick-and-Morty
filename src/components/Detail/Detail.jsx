import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect} from "react";

const URL_BASE = 'https://be-a-rym.up.railway.app/api/character';
const APY_KEY = 'eea8ccfe8ccd.80bf53751cab6f34aba8';

const Detail = () => {
    const { id } = useParams({});
    const [character, setCharacter] = useState({});

    useEffect(() => {
   axios(`${URL_BASE}/${id}?key=${APY_KEY}`).then(({ data }) => {
      if (data.name) {
         setCharacter(data);
      } else {
         window.alert('No hay personajes con ese ID');
      }
   });
   return setCharacter({});
}, [id]);

    return(
        <div>
            <h2>{character?.name}</h2>
            <h2>{character?.status}</h2>
            <h2>{character?.species}</h2>
            <h2>{character?.origin?.gender}</h2>
            <h2>{character?.origin?.name}</h2>
            <img src={character?.image} alt={character?.name}/>
        </div>
    )
}

export default Detail;