import React, { useState } from 'react';
import Form from './components/Form';
import Filter from './components/Filter';
import Agenda from './components/Agenda';

const Title = (props) => {
	return <h2>{props.text}</h2>
}

const App = () => {
	const [persons, setPersons] = useState([
		{ id: 0, name: 'Arto Hellas', phone: '040-123456' },
		{ id: 1, name: 'Ada Lovelace', phone: '39-44-5323523' },
		{ id: 2, name: 'Dan Abramov', phone: '12-43-234345' },
		{ id: 3, name: 'Mary Poppendieck', phone: '39-23-6423122' }
	]);
	const [newName, setNewName] = useState('');
	const [newPhone, setNewPhone] = useState('');
	const [filter, setFilter] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		if (persons.findIndex(person => person.name === newName) >= 0) {
			alert(`${newName} is already added to phonebook`);
		} else {
			setPersons([...persons, { id: (persons.length + 1), name: newName, phone: newPhone }]);
		}

		setNewName("");
		setNewPhone("");
	}

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

			<Title text="Add new" />
			<Form
				handleSubmit={handleSubmit}
				handleChangePhone={e => setNewPhone(e.target.value)}
				handleChangeName={e => setNewName(e.target.value)}
				newName={newName}
				newPhone={newPhone}
			/>

			<Title text="Contact list" />
			<Agenda numbersToShow={numbersToShow} />
		</div>
	)
}

export default App