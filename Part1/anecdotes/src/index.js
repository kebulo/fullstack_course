import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

const Button = (props) => {
	return (
		<button onClick={props.handleClick}>
			{props.text}
		</button>
	);
};

const AnecdotesDetails = (props) => {
	return <p>{props.text}</p>
};

const App = (props) => {
	const [selected, setSelected] = useState(0);
	const [random, setRandom] = useState(0);
	const [mostVoteAnecdote, setMostVoteAnecdote] = useState(0);
	const [points, setPoints] = useState(
		{ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
	);

	const changeAnecdote = () => {
		let tempRamdon = Math.floor(Math.random() * 5) + 1;

		setRandom(tempRamdon);
		setSelected(tempRamdon);
	};

	const pointAnecdote = () => {
		let newPoitns = { ...points };
		newPoitns[random] += 1;
		setPoints(newPoitns);
	};

	useEffect(() => {
		let arr = Object.values(points);
		let max = Math.max(...arr);
		let tempMostVoteAnecdote = props.anecdotes[arr.indexOf(max)];

		setMostVoteAnecdote(tempMostVoteAnecdote);
	}, [points, props.anecdotes])

	return (
		<div>
			<h2>Anecdote of the day</h2>
			<AnecdotesDetails text={props.anecdotes[selected]} />
			<AnecdotesDetails text={`Has ${points[random]} points`} />
			
			<Button text="Vote" handleClick={e => pointAnecdote()} />
			<Button text="Next Anecdote" handleClick={e => changeAnecdote()} />
			
			<h2>Anecdote with most votes</h2>
			<AnecdotesDetails text={mostVoteAnecdote} />
		</div>
	)
}

const anecdotes = [
	'If it hurts, do it more often',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<App anecdotes={anecdotes} />
)