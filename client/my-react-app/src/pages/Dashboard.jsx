import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Tasks from "./Tasks";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <h2>Welcome, {user?.name}</h2>
     

      

      <hr />

      {/* 👇 THIS IS WHERE TASKS RUN */}
      <Tasks />
    </div>
  );
};

export default Dashboard;
