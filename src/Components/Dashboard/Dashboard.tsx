import { Container, Stack } from "@mui/material";

import DashboardHeader from "./Header";
import Documents from "./Documents/Documents";

const Dashboard = () => {
  return (
    <Container sx={{ height: "100%" }}>
      <Stack>
        <DashboardHeader />
        <Documents />
      </Stack>
    </Container>
  );
};

export default Dashboard;
