import MassageAlert from "@/components/MassageAlert";

const addRole = async(
  role,
  roles,
  id, 
  token,
  setAlerts
) => {
  try {
    const r = await fetch(`${process.env.url}api/v1/users/staff/${id}`, {
      method: "PATCH",

      body: JSON.stringify({
        "roles":[
          ...roles,
          role
        ],
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const resp = await r.json();
    console.log(`r1 for ${role}`, resp);
    if (resp.status !== "success") {
      setAlerts(alerts => [...alerts, <MassageAlert 
        success={`error happen with ${role}`}
        status="fail"
        key={Math.random()} 
    />])
    }
  } catch (e) {
    console.log(e);
  }
}


export default addRole