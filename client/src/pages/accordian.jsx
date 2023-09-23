import React, { useState } from "react";

const Accordion = ({ sections }) => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    if (openSection === index) {
      setOpenSection(null);
    } else {
      setOpenSection(index);
    }
  };

  return (
    <div className="accordion bg-indigo-50">
        <h1 className="text-center font-semibold text-xl underline">FAQ</h1>
      {sections.map((section, index) => (
        <div key={index} className="  accordion-section w-full my-2">
          <div className=" w-full  text-indigo-800 font-bold  ">
            <button
              className={`accordion-button ${
                openSection === index ? "active" : ""
              }`}
              onClick={() => toggleSection(index)}
            >
              {section.title}
            </button>
          </div>
          {openSection === index && (
            <div className="accordion-content bg-slate-100 ">
              {section.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
