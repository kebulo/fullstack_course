const CountryDetail = (props) => {
    let country = props.country;

    return (
        <div className="CountryDetail">
            <h2>{country.name.official}</h2>
            <div>
                <span>{country.capital}</span> <br />
                <span>{country.population}</span>
            </div>

            <h2>Languages</h2>
            <ul>
                {Object.keys(country.languages).map((key) => (
                    <li key={key}> {country.languages[key]} </li>
                ))}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} />
        </div>
    );
}

export default CountryDetail;
