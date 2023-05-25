import MassageAlert from "@/components/MassageAlert";
import token from "./token";

const addRole = async(
  role,
  roles,
  id,
  setAlerts
) => {
  let oldRoles = []
      roles.forEach(r => {
        if(r !== role){
          oldRoles.push(r);
        }
      });

  try {
    const r = await fetch(`${process.env.url}api/v1/users/staff/${id}`, {
      method: "PATCH",

      body: JSON.stringify({
        "roles": oldRoles,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const resp = await r.json();
    console.log(`r delete for ${role}`, resp);
    if (resp.status !== "success") {
      setAlerts(alerts => [...alerts, <MassageAlert 
        fail={`error happen with old ${role}`}
        status="fail"
        key={Math.random()} 
    />])
    }
  } catch (e) {
    console.log(e);
  }
}


export default addRole