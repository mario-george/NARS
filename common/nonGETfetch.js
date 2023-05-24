import MassageAlert from "@/components/MassageAlert";

const nonGETfetch = async (
  url,
  method,
  body,
  token,
  successMassage,
  failMassage,
  setAlerts
) => {
  try {
    const r = await fetch(`${process.env.url}api/v1/${url}`, {
      method: method,

      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const resp = await r.json();
    console.log(resp);      
    //console.log(arr1);
    //console.log(arr2);
    if (resp.status == "success") {
      setAlerts([...alerts, <MassageAlert 
        success={successMassage}
        status="success"
        key={Math.random()} 
    />]);
    } else {
      setAlerts([...alerts, <MassageAlert 
        fail={failMassage}
        status="fail"
        key={Math.random()} 
    />]);
    }
  } catch (e) {
    console.log(e);
  }
}

export default nonGETfetch;