import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const card = (
  <React.Fragment>
    <CardContent>
      <Typography >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce suscipit
        accumsan lacus, in porta tortor facilisis vel. Donec molestie risus
        ante, non semper mauris tincidunt nec. Vestibulum posuere congue lorem
        ut tempor. Sed interdum consectetur risus et molestie.
        <br />
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </React.Fragment>
);

export default function Bulletin() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}
