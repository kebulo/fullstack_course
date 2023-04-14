import React, { useState, useEffect } from 'react';
import phoneGuide from './services/phoneGuide';

import './App.css';

import AlertMessage from './components/AlertMessage';
import Form from './components/Form';
import Filter from './components/Filter';
import Agenda from './components/Agenda';

const Title = (props) => {
	return <h2>{props.text}</h2>
}

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newPhone, setNewPhone] = useState('');
	const [filter, setFilter] = useState('');
	const [message, setMessage] = useState({message: null, className: ''});

	const handleSubmit = (e) => {
		e.preventDefault();

		if (persons.findIndex(person => person.name === newName) >= 0) {
			alert(`${newName} is already added to phonebook`);
		} else {
			let person = {
				name: newName,
				number: newPhone
			};

			phoneGuide.create(person).then((resp) => {
				if (resp) {
					setPersons([...persons, resp]);
				}
			}).catch((err) => {
				console.log(err);
			});
		}

		setNewName("");
		setNewPhone("");
	};

	const getPersons = () => {
		phoneGuide.getAll().then((resp) => {
			if (resp.length > 0) {
				setMessage({message: "The phone was saved in the DB", className: 'success'})
				setPersons(resp);
			} else {
				setPersons([]);
			}
		});
	};

	useEffect(() => {
		getPersons();
	}, []);

	const deletePerson = (id) => {
		phoneGuide.deletePerson(id).then((resp) => {
			getPersons();
		}).catch((error) => {
			console.log(error);
		});
	};

	const numbersToShow = !filter
		? persons
		: persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

	return (
		<div>
			<Title text="Phonebook" />
			<Filter
				handleChangeFilter={e => setFilter(e.target.value)}
				filterValue={filter}
			/>

			<AlertMessage message="Hola papotico" />

			<Title text="Add new" />
			<Form
				handleSubmit={handleSubmit}
				handleChangePhone={e => setNewPhone(e.target.value)}
				handleChangeName={e => setNewName(e.target.value)}
				newName={newName}
				newPhone={newPhone}
			/>

			<Title text="Contact list" />
			<Agenda numbersToShow={numbersToShow} deletePerson={deletePerson} />
		</div>
	)
}

export default App