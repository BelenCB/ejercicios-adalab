import 'react';

const Filters = ({ updateName, updateCountry, updateRegion, name, country, regions, countries, cities }) => {
    const handleChangeName = (ev) => {
        updateName(ev.target.value)
    };

    const handleChangeCountry = (ev) => {
        updateCountry(ev.target.value)
    };

    const handleCheckRegion = (ev) => {
        updateRegion(ev.target.value)
    };

    return (
        <section>
                <label htmlFor="name">Nombre:</label>
                <input name="name" id="name" value={name} onChange={handleChangeName} />

                <label htmlFor="country">
                    Pais:
                    <select name="country" id="country" value={country} onChange={handleChangeCountry}>
                        <option value="">Todos</option>
                        {countries.map((item, index) => {
                            return (
                                <option key={index} value={item}>{item}</option>
                            )
                            })}
                    </select>
                </label>

                <p>Regiones:</p>

                {cities.map((item,index) => {
                    return (
                        <label htmlFor={item} key={index}>
                        {item}
                        <input type="checkbox" name={item} id={item} value={item} checked={regions.includes(item)} onChange={handleCheckRegion}
                        />
                        </label>
                    )
                })}
            </section>
    )
};

export default Filters;
