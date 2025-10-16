import { useState, useEffect } from 'react';
import getUsers from "../services/api";
import { Link } from 'react-router-dom';
import ls from "../services/localStorage";
import Filters from '../components/Filters';

const HomePage = () => {
    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const [regions, setRegions] = useState ([]);
    const [users, setUsers] = useState(ls.get("users", []));

    useEffect(() => {
        if (users.length === 0) {
            getUsers().then(data => {
            setUsers(data);
            ls.set("users", data);
            })
        }
    });

    const updateName = (value) => {
        setName(value);
    };

    const updateCountry = (value) => {
        setCountry(value);
    };

    const updateRegion = (value) => {
        if (regions.includes(value)) {
            const newRegions = regions.filter((region) => region !== value);
            setRegions(newRegions);
        } else {
            setRegions([...regions, value]);
        }
    };

    const getCountries = () => {
        const countries = users.map(user => user.country);
        console.log(countries);
        // El array countries devuelve países repetidos, para que no pase esto hacemos lo siguiente
        const uniqueCountries = new Set(countries);
        console.log(uniqueCountries);
        const uniqueArray = [...uniqueCountries];
        console.log(uniqueArray);
        return uniqueArray;
    };

    const getCities = () => {
        const cities = users.map(user => user.city);
        const uniqueCities = new Set(cities);
        const uniqueArray = [...uniqueCities];
        return uniqueArray;
    }

    return (
        <>
            <h1>Busca aquí a tu compi de trabajo</h1>
            
            <Filters 
                updateName={updateName}
                updateCountry={updateCountry}
                updateRegion={updateRegion}
                name={name}
                country={country}
                regions={regions}
                countries={getCountries()}
                cities={getCities()}
            />

            <section>
                <h2>Listado de contactos:</h2>
                <ul>
                    {users
                    .filter(user => user.name.toLowerCase().includes(name.toLowerCase()))
                    .filter(user => {
                        if (country === "") {
                            return true;
                        } else {
                            return country === user.country;
                        }
                    })
                    .filter(user => {
                        if (regions.length === 0) {
                            return true;
                        } else {
                            return regions.includes(user.city);
                        }
                    })

                    .map(user => {
                        return (
                            <li key={user.id}>
                                <Link to={`/user/${user.id}`}>
                                    <img src={user.picture} alt={user.name} />
                                    <p>{user.name}</p>
                                    <p>{user.gender}</p>
                                    <p>{`${user.city} | ${user.country}`}</p>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </section>
            
        </>
    )
    };

export default HomePage;