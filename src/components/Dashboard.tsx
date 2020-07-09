import React, { useContext } from "react";
import { AuthContext } from "./../contexts";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  return <div>{user?.attributes?.email}</div>;
};

export default Dashboard;
