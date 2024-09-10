import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import DashboardTable from "../components/dashboardTable";
import Counter from "../components/sandbox"

export default function Dashboard() {
  return (
    <Container maxWidth="sm">
      <Counter/>
      {/* <DashboardTable sx={{ bgcolor: "#cfe8fc", height: "100vh" }} /> */}
    </Container>
  );
}
