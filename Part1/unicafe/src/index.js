import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

const Title = (props) => {
	return <h2>{props.title}</h2>;
}

const Button = (props) => {
	return (
		<button onClick={props.handleClick}>
			{props.name}
		</button>
	);
}

const StatisticsLine = (props) => {
	return (
		<tr>
			<td>{props.name}</td>
			<td>{props.total}</td>
		</tr>
	);
}

/**
 * Calculate the average
 * @param {number} good - Amount of good feedback
 * @param {number} bad - Amount of bad feedback
 * @param {number} total - Total of feedback received
 * @returns {number} average - average calculated based on data passed
 */
const getAverage = (good, bad, total) => {
	let average = good - bad;

	if (average > 0) {
		average = average / (total);
	} else {
		average = 0;
	}

	return average;
}

const Statistics = (props) => {
	if (props.good > 0 || props.neutral > 0 || props.bad > 0) {
		return (
			<table>
				<tbody>
					<StatisticsLine name="Good" total={props.good} />
					<StatisticsLine name="Neutral" total={props.neutral} />
					<StatisticsLine name="Bad" total={props.bad} />
					<StatisticsLine name="All" total={props.good + props.neutral + props.bad} />
					<StatisticsLine name="Average" total={props.average} />
					<StatisticsLine name="Positive" total={props.percentage} />
				</tbody>
			</table>
		)
	}

	return <p>No feedback given</p>
}

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);
	const [total, setTotal] = useState(0);
	const [average, setAverage] = useState(0);
	const [percentage, setPercentage] = useState(0);

	useEffect(() => {
		setTotal(good + neutral + bad);
		setAverage(getAverage(good, bad, total));
		setPercentage((good * total) / 100);
	}, [good, neutral, bad, total,]);

	return (
		<div>
			<Title title="Give feedback" />

			<Button name="Good" handleClick={() => setGood(good + 1)} />
			<Button name="Neutral" handleClick={() => setNeutral(neutral + 1)} />
			<Button name="Bad" handleClick={() => setBad(bad + 1)} />

			<Title title="Statistics" />
			<Statistics
				good={good}
				neutral={neutral}
				bad={bad}
				average={average}
				percentage={percentage} />
		</div>
	)
}
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />)
