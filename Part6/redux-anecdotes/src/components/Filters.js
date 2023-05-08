import { useDispatch } from "react-redux";
import { filterChange } from '../reducers/filterReducers';

const Filters = () => {
    const dispatch = useDispatch();

    const handleChange = (event) => {
        event.preventDefault();
        dispatch(filterChange(event.target.value));
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

export default Filters;