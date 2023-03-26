import { useState } from "react";
import MassageAlert from "@/components/MassageAlert";
const test = () => {
  // const [status, setStatus] = useState("");
  const [status, setStatus] = useState("");
  // const [flip, setFlip] = useState(0);
  const [alerts, setAlerts] = useState([]);


  return (
    <div>
      {/* <MassageAlert fail="bad" success="good" status={status} flip={flip} /> */}
      <div>{alerts.map(e=><div>{e}</div>)}</div>
      <button onClick={e => setAlerts(alt => [...alt, <MassageAlert fail="bad" status="fail" key={Math.random()} />])}>fail</button>
      <button onClick={e => setAlerts(alt => [...alt, <MassageAlert success="good" status="success" key={Math.random()} />])}>success</button>
    </div>
  )
}

export default test;