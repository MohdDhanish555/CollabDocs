import { Container } from "@mui/material";

import DashboardHeader from "./Header";
import Documents from "./Documents/Documents";

const Dashboard = () => {
  return (
    <Container sx={{ height: "100%", pt: 3 }}>
      <DashboardHeader />
      <Documents />
    </Container>
  );
};

export default Dashboard;
