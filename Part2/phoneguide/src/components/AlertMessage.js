const AlertMessage = (props) => {
    if (props.message === null) {
        return null;
    }
    
    return (
        <div className={props.classTypeName}>
            {props.message}
        </div>
    );
}

export default AlertMessage;
