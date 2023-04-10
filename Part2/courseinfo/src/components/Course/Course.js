import React from 'react'

const Header = (props) => {
	return <h1>{props.name}</h1>
}

const Part = (props) => {
	return <p>{props.part.name} {props.part.exercises}</p>;
}

const Content = (props) => {
	return (
		<>
			{props.parts.map(part => (
				<Part key={part.id} part={part} />
			))}
		</>
	);
}

const Total = (props) => {
	let total = props.parts.reduce((a, c) => a + c.exercises, 0)
	return <b>Total of {total} exercises</b>;
}

const Course = (props) => {
	return (
		<>
			<Header name={props.course.name} />
			<Content parts={props.course.parts} />
			<Total parts={props.course.parts} />
		</>
	);
}

export default Course;
