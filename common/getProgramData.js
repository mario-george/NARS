const getDepartmentData = async () => {
  if(department.current.value !== 'Choose a Department'){
    console.log("rr", department.current.value);
    const resp = await fetch(`${process.env.url}api/v1/department/${department.current.value}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data = await resp.json();
    console.log(data);
    name.current.value = data.data.name;
    about.current.value = data.data.about;
    objectives.current.value = data.data.objectives;
    let comps = data.data.competences;

    setInputs(comps.map(c => {
      let out = {
        ref: createRef(),
        value: c.code,
      };
      return out;
    }));
    setInputs2(comps.map(c => {
      let out = {
        ref: createRef(),
        value: c.description,
      };
      return out;
    }));

    setOldHeaderID(data.data.departmentHead);

    // header
    getStaffRolesAndID(
      oldHeaderID,
      'program coordinator',
      setOldHeaderRole,
      setCurrentHeaderRole,
      setOldHeaderEmail
    );

    // admin
    getStaffRolesAndID(
      oldAdminID,
      'program admin',
      setOldAdminRole,
      setCurrentAdminRole,
      setOldAdminEmail
    )

    // quality
    getStaffRolesAndID(
      oldHeader1ID,
      'quality coordinator',
      setOldHeader1Role,
      setCurrentHeader1Role,
      setOldHeader1Email
    );


    emailH.current.value = oldHeaderEmail;
    emailA.current.value = oldAdminEmail;
    emailQ.current.value = oldHeader1Email;
  }
}