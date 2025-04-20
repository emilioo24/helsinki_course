const Filter = ({ handleSearch }) => {
    return(
        <div>
            filter shown with <input type="search" onChange={handleSearch} />
        </div>
    )
}

export default Filter;