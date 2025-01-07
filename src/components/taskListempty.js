import * as React from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ListImage from "../emptyList.png";

export default function EmptyList() {
  return (
    <CardContent sx={{ maxWidth: 345, justifySelf: "center" }}>
      <img src={ListImage} alt="Empty List" />
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        Empty List
      </Typography>
    </CardContent>
  );
}
