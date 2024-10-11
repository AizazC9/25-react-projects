import { useState } from "react";
import data from "./data";
import "./styles.css";

const Accordian = () => {
  const [selected, setSelected] = useState([]);
  const [enableMultiSelect, setEnableMultiSelect] = useState(false);

  function handleSelection(id) {
    if (enableMultiSelect) {
      // Handle multi-select mode
      setSelected((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      // Handle single-select mode
      setSelected((prev) => (prev[0] === id ? [] : [id]));
    }
  }

  return (
    <div className="wrapper">
      <button
        onClick={() => {
          setEnableMultiSelect(!enableMultiSelect);
          setSelected([]); // Clear selections when mode changes
        }}
        className="multi-select-btn"
      >
        {enableMultiSelect
          ? "Disable Multi-selection"
          : "Enable Multi-selection"}
      </button>

      <div className="accordion">
        {data && data.length > 0 ? (
          data.map((dataItem, index) => (
            <div className="item" key={index}>
              <div
                onClick={() => handleSelection(dataItem.id)}
                className="title"
              >
                <h3>{dataItem.question}</h3>
                <span>{selected.includes(dataItem.id) ? "-" : "+"}</span>
              </div>
              {selected.includes(dataItem.id) && (
                <div className="content">
                  <p>{dataItem.answer}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div>No data found</div>
        )}
      </div>
    </div>
  );
};

export default Accordian;
