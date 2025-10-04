import { useState } from 'react';
// primer paso para usar una imagen
import logoReact from '../images/react.svg'
import '../styles/app.css'

const App = () => {
  // lo primero que va aqui siempre son los estados
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);
  const [mode, setMode] = useState("light");

  const userName = "María";
  const userClassName = "user-name";

  const total = 4000 + 2000;

  const student = {
    age: 23,
    name: "Patricia",
  };

  const techs = ["JS", "React", "HTML", "CSS"];

  const getTitle = () => {
    const isLoggedIn = true;
    return isLoggedIn ? <h1>Bienvenida, {userName}</h1> : <h1>Regístrate</h1>;
  }

  const handleClick = () => {
    console.log("Has hecho click");
  }

  const handleChange = (event) => {
    const userName2 = event.target.value;
    setName(userName2);
  }

  const handleIncrement = () => {
    return setCount(count + 1);
  }

    const handleReduce = () => {
    if (count > 0) {
    return setCount(count - 1);
    }
  }

  const handleReset = () => {
    return setCount(0);
  }

  const handleClickMode = () => {
    if (mode === "light") {
      return setMode("dark");
    } else {
      return setMode("light");
    }
  }

  return (
    // etiqueta fantasma porque el return solo devuelve un MediaElementAudioSourceNode, se llama fragment y no se ve en el DOM
    <>
      <div>
        <p className={userClassName}>Nombre de la usuaria: {userName}</p>
        <p className="title">Hola, este es mi primer párrafo en React</p>
        {/* segundo paso para usar una imagen, la variable que hemos creado arriba en el import siempre va entre llaves */}
        <img src={logoReact} alt="React logo" className="logo" />
      </div>
      <div>
        <p>El precio total es {total}</p>
      </div>
      <div>
        <p className="age">Edad: {student.age}</p>
      </div>
      <ul>
        {techs.map((item, i) =>
          <li key={i}>{item}</li>
        )}
      </ul>
      <div>
        {getTitle()}
      </div>
      <button className="button" onClick={handleClick}>Click</button>
      <div>
        <input placeholder="Escribe tu nombre" onChange={handleChange} />
        <p>El nombre de la usuaria es: {name}</p>
      </div>
      <div className= {mode}>
        <button onClick={handleClickMode}>{mode === "light" ? "Activar modo oscuro" : "Desactivar modo oscuro"}</button>
        <p>{mode === "dark" ? "Tienes activado el modo oscuro" : ""}</p>
        <p>Contador: {count}</p>
        <button onClick={handleIncrement}>Incrementar contador</button>
        <button onClick={handleReduce}>Reducir contador</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </>
  )
}

export default App
