import axios from 'axios';
import { useEffect, useState } from 'react';
import Countries from "./components/CountiresList";
import CountryDetail from './components/CountryDetail';
import Form from "./components/Form";

const App = () => {
	const [search, setSearch] = useState('');
	const [countries, setCountries] = useState([]);
	const [countryDetail, setCountryDetail] = useState([]);
	

	const showCountryDetail = (props) => {
		setCountryDetail(props);
	};

	useEffect(() => {
		if (search.length >= 1) {
			axios.get('https://restcountries.com/v3.1/name/' + search).then((resp) => {
				if (resp.data.length <= 10) {
					setCountries(resp.data);
				} else {
					setCountries([]);
				}
			});
		} else if (search.length === 0) {
			setCountries([]);
		}
	}, [search]);

	useEffect(() => {
		setCountries([countryDetail]);
	}, [countryDetail])

	return (
		<div className="App">
			<Form search={search} handleOnChange={e => setSearch(e.target.value)} />
			{countries.length > 1 ? <Countries showCountryDetail={showCountryDetail} countries={countries} search={search} /> : ''}
			{countries.length === 1 ? <CountryDetail country={countries[0]} /> : '' }
			{countries.length === 0 ? <p>Too many matches, specify another filter</p>: ''}
		</div>
	);
}

export default App;
