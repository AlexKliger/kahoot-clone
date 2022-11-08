const Checkbox = ({handleChange, label}) => {
    return (
      <label>
        {label || ""}
        <input
          type="checkbox"
          onChange={handleChange}
        >
        </input>
      </label>
    )
  }
  
  export default Checkbox