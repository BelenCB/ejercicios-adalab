import { useState } from 'react';

const HomePage = () => {
    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const [regions, setRegions] = useState ([]);

    const handleChangeName = (ev) => {
        setName(ev.target.value);
    };

    const handleChangeCountry = (ev) => {
        setCountry(ev.target.value);
    };

    const handleCheckRegion = (ev) => {
        if (regions.includes(ev.target.value)) {
            const newRegions = regions.filter((region) => region !== ev.target.value);
            setRegions(newRegions);
        } else {
            setRegions([...regions, ev.target.value]);
        }
    };
    // revisar esta funcion en ChatGPT para entenderla bien

  return (
    <>
        <label htmlFor="name">Nombre:</label>
        <input name="name" id="name" value={name} onChange={handleChangeName} />

    <label htmlFor="country">
        Pais:
        <select name="country" id="country" value={country} onChange={handleChangeCountry}>
            <option value="">Todos</option>
        </select>
    </label>

    <p>Regiones:</p>
    <label htmlFor="Galicia">
        Galicia
        <input type="checkbox" name="Galicia" id="Galicia" checked={regions.includes("Galicia")} onChange={handleCheckRegion}
        />
    </label>

    <label htmlFor="Madrid">
        Madrid
        <input type="checkbox" name="Madrid" id="Madrid" checked={regions.includes("Madrid")} onChange={handleCheckRegion}
        />
    </label>
        
    </>
  )
}

export default HomePage