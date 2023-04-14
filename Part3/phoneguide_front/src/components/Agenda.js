const Agenda = (props) => {
    const deleteItem = (id) => {
        props.deletePerson(id);
    }

    return (
        <div>
            {props.numbersToShow.map((person) => (
                <p key={person.id}>{person.name} - {person.number} <button onClick={e => deleteItem(person.id)}>Delete</button></p>
            ))}
        </div>
    );
}

export default Agenda;
