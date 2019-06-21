import React from "react";
import "./buzz-style.css";

export default function CreateBuzz() {
  const handleSubmit = () => {};

  return (
    <div className="form">
      <div id="formTitle">Create Buzz</div>
      <form id="create-buzz" onSubmit={handleSubmit}>
        <textarea rows="4" cols="50" id="descripton" class="fields" required />
      </form>
      <div id="button">
        <button type="submit" form="bugReport">
          Send
        </button>
      </div>
    </div>
  );
}
