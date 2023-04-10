const Agenda = (props) => {
    return (
        <div>
            {props.numbersToShow.map((person) => (
                <p key={person.id}>{person.name} - {person.phone}</p>
            ))}
        </div>
    );
}

export default Agenda;
