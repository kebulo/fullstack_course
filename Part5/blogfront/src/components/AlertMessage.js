const AlertMessage = ({classTypeName, message}) => {
    return <span className={'alert '+classTypeName}>{message}</span>;
}

export default AlertMessage;