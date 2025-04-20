const PersonForm = ({ addPerson, newName, newPhone, handleChangeName, handleChangePhone }) => {
    return(
        <form onSubmit={addPerson}>
            <div>
                name: <input type='text' value={newName} onChange={handleChangeName}  />
            </div>
            <div>
                number: <input type="tel" value={newPhone} onChange={handleChangePhone} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm;