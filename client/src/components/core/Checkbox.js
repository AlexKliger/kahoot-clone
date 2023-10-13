const Checkbox = ({handleChange, label}) => {
    return (
      <label className="items-center text-2xl block">
        <input
          type="checkbox"
          onChange={handleChange}
        >
        </input>
        {" " + label || ""}
      </label>
    )
  }
  
  export default Checkbox