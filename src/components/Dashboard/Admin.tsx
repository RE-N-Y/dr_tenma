import React, { useEffect, useState } from "react";
import { API, Auth } from "aws-amplify";

const Admin: React.FC = () => {
  const [patientIDs, setPatientIDs] = useState([]);
  const [symptomSeries, setsymptomSeries] = useState<any>([]);

  useEffect(() => {
    let listPatients = async () => {
      let apiName = "AdminQueries";
      let path = "/listUsersInGroup";
      let myInit = {
        queryStringParameters: {
          groupname: "patient",
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `${(await Auth.currentSession())
            .getAccessToken()
            .getJwtToken()}`,
        },
      };
      let result = await API.get(apiName, path, myInit);
      const ids = result.Users.map((patient: any) => {
        return patient.Username;
      });
      setPatientIDs(ids);
    };

    listPatients();
  }, []);

  useEffect(() => {}, [patientIDs]);

  return <div>Admin</div>;
};

export default Admin;
