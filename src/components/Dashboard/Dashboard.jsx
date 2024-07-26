import { Helmet } from "react-helmet";
import SidebarWithHeader from "./Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <>
    <Helmet>
      <title>Dashboard</title>
    </Helmet>
      <SidebarWithHeader />
    </>
  );
};

export default Dashboard;
