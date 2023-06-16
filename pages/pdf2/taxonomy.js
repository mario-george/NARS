import Textarea from "@/components/Textarea/BloomTextArea";
import  LPTextArea from "@/components/Textarea/LPTextArea";
import React, { useState, useRef, forwardRef, useEffect } from "react";

const BloomTaxonomyInput = forwardRef((props, ref) => {
  const bloomVerbs = props.bloomVerbs;
  let v = props.v;
  !props.v ? (v = "") : null;
  const [selectedSentence, setSelectedSentence] = useState(v);
  const [matchedVerbs, setMatchedVerbs] = useState([]);
  const [initialRender, setInitialRender] = useState(true);
  const menuRef = useRef(null);

  useEffect(() => {
    if (ref.current && selectedSentence) {
      ref.current.value = selectedSentence;
    }
  }, [ref, selectedSentence]);

  useEffect(() => {
    const lastWord = selectedSentence.split(" ").pop();
    const updatedMatchedVerbs = checkLastWord(lastWord);
    console.log(lastWord)
    console.log(lastWord)
    console.log(lastWord)
    console.log(lastWord)
    console.log(lastWord)
    console.log(lastWord)
    console.log(lastWord)
    console.log(lastWord)
    console.log(lastWord)
    console.log(lastWord)
    console.log(lastWord)
    console.log(lastWord)
    console.log(lastWord)
    console.log(lastWord)
    console.log(lastWord)
    console.log(lastWord)
    console.log(lastWord)
    console.log(lastWord)
    console.log(lastWord)
    console.log(lastWord)
    console.log(lastWord)
    console.log(typeof lastWord)
    if(lastWord=="" &&selectedSentence!=""){
      return
    }
    if(selectedSentence==""){
      return
    }
    setMatchedVerbs(updatedMatchedVerbs);
  }, [selectedSentence]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
    }
  }, [initialRender]);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMatchedVerbs([]);
    }
  };

  const handleSentenceChange = (value) => {
    const newValue = value;
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

  const checkLastWord = (word) => {
    const matchedVerbs = bloomVerbs.filter((verb) =>
      matchWordToTerm(verb, word)
    );
    return matchedVerbs;
  };

  const handleVerbSelection = (item) => {
    const words = selectedSentence.split(" ");
    const mergedWords = words.slice(0, -1).join(" ");
    setSelectedSentence(mergedWords + " " + item+" ");
    ref.current.value = mergedWords + " " + item+ " ";
    setMatchedVerbs([]);
  };

  const renderMenu = () => {
    return (
      <div
        ref={menuRef}
        style={{
          maxHeight: "200px",
          overflowY: "auto",
          zIndex: 20,
        }}
        className={`${
          props.hasClass
            ? ` bg-gray-100 duration-300 border border-gray-200 `
            : ``
        }  input-formV2  `}
      >
        {matchedVerbs.map((verb) => (
          <div
            key={verb}
            onClick={() => handleVerbSelection(verb)}
            style={{ padding: "5px", zIndex: 30 }}
          >
            {verb}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      v={v}
      ref={ref}
      small={true}
      key={v}
      rows={0}
      className={`w-full ${
        props.hasClass ? `-[4rem]` : ` pt-4   `
      } mr-[5rem] items-center  `}
      hasClass={props.hasClass}
    >
      {props.hasClass ? (
        <>
          <Textarea
            ref={ref}
            id="sentence"
            extraSmall={true}
            value={selectedSentence}
            onChange={handleSentenceChange}
            hasClass={props.hasClass}
            rows={0}
          ></Textarea>
          {matchedVerbs.length > 0 && !initialRender && (
            <div
              style={{
                zIndex: 10,
              }}
              className="absolute  "
            >
              {renderMenu()}
            </div>
          )}
        </>
      ) : (
        <LPTextArea
          className={`${props.hasClass ? `` : ``} w-full text-black  `}
          value={selectedSentence}
          extraSmall={true}
          hasClass={props.hasClass}
          rows={0}
        ></LPTextArea>
      )}
    </div>
  );
});

export default BloomTaxonomyInput;
