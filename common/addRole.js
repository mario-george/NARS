import MassageAlert from "@/components/MassageAlert";
import token from "./token";

const addRole = async(
  role,
  roles,
  id,
  setAlerts,
  otherPatch
) => {
  const body = otherPatch;
  body["roles"] = [
    ...roles,
    role
  ];

  try {
    const r = await fetch(`${process.env.url}api/v1/users/staff/${id}`, {
      method: "PATCH",

      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const resp = await r.json();
    console.log(`r add for ${role}`, resp);
    if (resp.status !== "success") {
      setAlerts(alerts => [...alerts, <MassageAlert 
        fail={`error happen with ${role}`}
        status="fail"
        key={Math.random()} 
    />])
    }
  } catch (e) {
    console.log(e);
  }
}


export default addRole