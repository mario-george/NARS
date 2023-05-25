import MassageAlert from "@/components/MassageAlert";
import token from "./token";

const getStaffRolesAndEmail = async(
  id,
  role,
  setCurrentRoles,
  setOldRoles,
  emailRef
) => {
  try {
    const r1 = await fetch(`${process.env.url}api/v1/users/staff/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
  
    const resp1 = await r1.json();
    console.log(`resp for ${role}`, resp1);
    if (resp1.status !== "success") {
      setAlerts([...alerts, <MassageAlert 
        fail={`error with git ${role} data`}
        status="fail"
        key={Math.random()} 
    />])
    }else{
      setCurrentRoles(resp1.data.roles);
      setOldRoles(resp1.data.roles);
      emailRef.current.value = resp1.data.email;
    }
  } catch (e) {
    console.log(e);
  }
}

export default getStaffRolesAndEmail;