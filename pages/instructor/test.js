import { useState } from "react";
import MassageAlert from "@/components/MassageAlert";
const test = () => {
  // const [status, setStatus] = useState("");
  const [status, setStatus] = useState("");
  const [flip, setFlip] = useState(0);

  return (
    <div>
      <MassageAlert fail="bad" success="good" status={status} flip={flip} />
      <button onClick={e => {setStatus("fail"); setFlip((flip + 1)); console.log("f", flip);}}>fail</button>
      <button onClick={e => {setStatus("success"); setFlip((flip + 1)); console.log("s", flip);}}>success</button>
    </div>
  )
}

export default test;