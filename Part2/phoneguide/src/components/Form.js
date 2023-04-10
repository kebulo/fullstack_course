const Form = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div>
				<label>Name:</label><br />
				<input onChange={props.handleChangeName} value={props.newName} />
			</div>

			<div>
				<label>Number:</label><br />
				<input onChange={props.handleChangePhone} value={props.newPhone} />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
}

export default Form;