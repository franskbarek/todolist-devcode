import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function CardActivity() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Id
        </Typography>
        <Typography variant="h5" component="div">
          New Activity
        </Typography>
      </CardContent>
      <CardActions>
        <Typography component="div">Created</Typography>

        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
}
