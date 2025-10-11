import 'react';
import { useParams, Link } from "react-router-dom";
import ls from "../services/localStorage";

const DetailPage = () => {
    const { id } = useParams();
    const users = ls.get("users", []);
    const user = users.find(user => user.id === id);

  return (
    <>
        {user ? (
            <>
                <img src={user.picture} alt={user.name} />
                <p>{user.name}</p>
                <p>{user.gender}</p>
                <p>{`${user.city} | ${user.country}`}</p>
                <Link to="/">Volver a inicio</Link>
            </>
        ) : (
            <>
                <p>Usuario no encontrado</p>
                <Link to="/">Volver a inicio</Link>
            </>
        )}
    </>
  )
};

export default DetailPage;