const Form = (props) => {
    return (
        <div>
            <label>Filter shown with </label>
            <input onChange={props.handleChangeFilter} value={props.filterValue} />
        </div>
    );
}

export default Form;
