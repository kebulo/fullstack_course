const Form = (props) => {
	return (
		<div className="Form">
			<label>Find country</label>
            <input onChange={props.handleOnChange} value={props.search} />
		</div>
	);
}

export default Form;
