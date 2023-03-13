import React, { useState } from "react";
import Autocomplete from "react-autocomplete";

const BloomTaxonomyInput = () => {
  const [selectedSentence, setSelectedSentence] = useState("");
  const bloomVerbs = ["Create", "design"];

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
      <div style={{ ...style, maxHeight: "200px", overflowY: "auto" }}>
        {items.map((item) => (
          <div
            key={item}
            onClick={() => manageSentence(item)}
            style={{ padding: "5px" }}
          >
            {item}
          </div>
        ))}
      </div>
    );
  };

  const sentenceWords = selectedSentence.split(" ");

  const matchedVerbs = bloomVerbs.filter((verb) => {
    return sentenceWords.some((word) => matchWordToTerm(verb, word));
  });

  return (
    <div>
      <label htmlFor="sentence">Enter Sentence:</label>
      <Autocomplete
        getItemValue={(item) => item}
        items={matchedVerbs}
        renderItem={(item, isHighlighted) => (
          <div
            key={item}
            style={{
              backgroundColor: isHighlighted ? "#eee" : "transparent",
              padding: "5px",
            }}
          >
            {item}
          </div>
        )}
        value={selectedSentence}
        onChange={handleSentenceChange}
        renderMenu={renderMenu}
        inputProps={{
          id: "sentence",
          className: "border-gray-300 border-2 rounded-md py-2 px-3 ",
        }}
        wrapperProps={{ className: "absolute" }}
        menuStyle={{ position: "absolute", zIndex: "999" }}
      />
    </div>
  );
};

export default BloomTaxonomyInput;
