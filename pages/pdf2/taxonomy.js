import React, { useState, useRef, forwardRef } from "react";
import Autocomplete from "react-autocomplete";

const BloomTaxonomyInput = forwardRef((props,ref) => {
  const  bloomVerbs = props.bloomVerbs;
  const [selectedSentence, setSelectedSentence] = useState("");
  const handleSentenceChange = (event) => {
    const newValue = event.target.value;
    if (newValue !== selectedSentence) {
      setSelectedSentence(newValue);
    }
  };

  const matchWordToTerm = (word, value) => {
    return (
      typeof word === "string" &&
      typeof value === "string" &&
      word.toLowerCase().startsWith(value.toLowerCase())
    );
  };

  const renderMenu = (items, value, style) => {
    const manageSentence = (item) => {
      const words = selectedSentence.split(" ");
      const mergedWords = words.slice(0, -1).join(" ");
      const last = words[words.length - 1];
      setSelectedSentence(mergedWords + " " + item.key);
    };
    return (
      <div className="relative">
        <div
          style={{
            ...style,
            maxHeight: "200px",
            overflowY: "auto",
            zIndex: 999999,
            position: "absolute",
            top: "100%",
            left: 0,
          }}
          className=" input-form relative "
        >
          {items.map((item) => (
            <div
              key={item}
              onClick={() => manageSentence(item)}
              style={{ padding: "5px", zIndex: 999999 }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const sentenceWords = selectedSentence.split(" ");

  const matchedVerbs = bloomVerbs.filter((verb) => {
    return sentenceWords.some((word) => matchWordToTerm(verb, word));
  });

  return (
    <div className="w-full  mb-[2.5rem] mr-[5rem] items-center  ">
      <Autocomplete
        ref={ref}
        getItemValue={(item) => item}
        items={matchedVerbs}
        renderItem={(item, isHighlighted) => (
          <div
            key={item}
            style={{
              backgroundColor: isHighlighted ? "#eee" : "transparent",
              padding: "5px",
            }}
            className=" "
          >
            {item}
          </div>
        )}
        value={selectedSentence}
        onChange={handleSentenceChange}
        renderMenu={renderMenu}
        inputProps={{
          id: "sentence",
          className: `relative border-gray-300 border-2 rounded-md py-2 px-3 input-form w-[300%]   `,
        }}
        wrapperProps={{ className: `absolute  ` }}
        menuStyle={{ position: `absolute  `, zIndex: "10" }}
      />
    </div>
  );
});

export default BloomTaxonomyInput;
