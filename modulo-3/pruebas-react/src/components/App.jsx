import { useState } from 'react';
// primer paso para usar una imagen
import logoReact from '../images/react.svg'
import '../styles/app.css'

const App = () => {
  // lo primero que va aqui siempre son los estados
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);
  const [mode, setMode] = useState("light");
  const [formName, setFormName] = useState("");
  const [size, setSize] = useState("S");
  const [radioSize, setRadioSize] = useState("");

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

  const handleName = (ev) => {
    setFormName(ev.target.value);
  }

  const handleSize = (ev) => {
    setSize(ev.target.value);
  }

  const handleRadioSize = (ev) => {
    setRadioSize(ev.target.value);
  }

  const handleOnSubmit = (ev) => {
    ev.preventDefault();
  }

  const handleFormReset = () => {
    setFormName("")
    setSize("S")
    setRadioSize("")
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

      <form onSubmit={handleOnSubmit}>
        <label htmlFor="name">Escribe tu nombre:</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="María García"
          onChange={handleName}
          value={formName}
        />
        <p>Tu nombre: {formName}</p>

        <label htmlFor="size">Selecciona tu talla de camiseta:</label>
        <select name="size" id="size" onChange={handleSize} value={size}>
          <option>Talla S</option>
          <option>Talla M</option>
          <option>Talla L</option>
        </select>
        <p>Talla elegida: {size}</p>

        <label htmlFor="sizeS">Talla S</label>
        <input
          type="radio"
          id="sizeS"
          name="size"
          value="S"
          onChange={handleRadioSize}
          checked={radioSize === "S"}
        />

        <label htmlFor="sizeM">Talla M</label>
        <input
          type="radio"
          id="sizeM"
          name="size"
          value="M"
          onChange={handleRadioSize}
          checked={radioSize === "M"}
        />

        <label htmlFor="sizeL">Talla L</label>
        <input
          type="radio"
          id="sizeL"
          name="size"
          value="L"
          onChange={handleRadioSize}
          checked={radioSize === "L"}
        />
        <p>Tu talla es: {radioSize}</p>
        
        <input type="submit" value="Enviar" />
        <button onCLick={handleFormReset}>Reset</button>
      </form>

    </>
  )
}

export default App
