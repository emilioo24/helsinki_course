const Message = ({ message, isError }) => {
    if (message === null) {
        return null
    }

    if (isError) {
        return(
            <div className="errorMessage">
                {message}
            </div>
        )
    }
    
    return(
        <div className="successMessage">
            {message}
        </div>
    )
}

export default Message;