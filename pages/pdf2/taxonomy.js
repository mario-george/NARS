import Textarea from "@/components/Textarea/LPTextArea";
import React, { useState, useRef, forwardRef, v2, useEffect } from "react";
import Autocomplete from "react-autocomplete";

const BloomTaxonomyInput = forwardRef((props, ref) => {
  const bloomVerbs = props.bloomVerbs;
  let v = props.v;
  !props.v ? (v = "") : null;
  const [selectedSentence, setSelectedSentence] = useState(v);
  useEffect(() => {
    if (ref.current && selectedSentence) {
      ref.current.value = selectedSentence;
    }
  }, [ref, selectedSentence]);
  const handleSentenceChange = (event) => {
    const newValue = event.target.value;
    if (newValue !== selectedSentence) {
      setSelectedSentence(newValue);
      ref.current.value = newValue;
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
      ref.current.value = mergedWords + " " + item.key;
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
          className={`${
            props.hasClass
              ? ` bg-gray-100 duration-300 border border-gray-200 `
              : ``
          } input-formV2 relative `}
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
  console.log(matchedVerbs);
  return (
    <div
      v={v}
      ref={ref}
      small={true}
      key={v}
      rows={0}
      className={`w-full ${
        props.hasClass ? `pb-[4rem]` : ` pt-4   `
      } mr-[5rem] items-center  `}
      hasClass={props.hasClass}
    >
      {props.hasClass ? (
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
            className: `relative border-gray-300  rounded-md py-2 px-1 input-formV3 text-md  ${
              props.hasClass ? ` border-2 bg-sky-50` : `hidden`
            } px-[1rem] transform translate-y-4  `,
            style: { width: "52rem" },
          }}
          wrapperProps={{ className: `absolute  ` }}
          menuStyle={{ position: `absolute  `, zIndex: "10" }}
        />
      ) : (
        <Textarea
          className={`${props.hasClass ? `` : ``} w-full text-black  `}
          value={selectedSentence}
          extraSmall={true}
          hasClass={props.hasClass}
          rows={0}
        ></Textarea>
      )}
    </div>
  );
});

export default BloomTaxonomyInput;
