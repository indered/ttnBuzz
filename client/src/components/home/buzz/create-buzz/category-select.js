import React from "react";

export default function SimpleSelect(props) {
  function handleChange(event) {
    props.handleCategory(event.target.value);
  }

  return (
    <select
      required
      className="select-menu"
      value={props.category}
      onChange={handleChange}
    >
      <option className="options" value="Activity">
        Activity
      </option>
      <option className="options" value="Lost & Found">
        Lost & Found
      </option>
    </select>
  );
}
