const CountryItem = (props) => {
    const onClick = () => {
        props.showCountryDetail(props.data)
    }

    return (
        <li>
            {props.data.name.common} <button onClick={onClick}>Show</button>
        </li>
    );
};

const Countries = (props) => {
    return (
        <div className="Countries">
            <ul>
                {props.countries.map((country) => (
                    <CountryItem showCountryDetail={props.showCountryDetail} key={country.flag + country.name.common} data={country} />
                ))}
            </ul>
        </div>
    );
}

export default Countries;
