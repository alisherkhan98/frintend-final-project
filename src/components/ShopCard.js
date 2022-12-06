// react
import React from "react";
// MUI
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

function ShopCard({ treeData }) {
  return (
    <Card sx={{ p: 0 }}>
      <CardHeader
        title={<Typography variant="h6">{treeData.name}</Typography>}
      />
      {/* image */}
      <CardMedia
        image={treeData.img}
        component="img"
        height="150"
        sx={{ width: "100%" }}
      />
      {/* price and co2 */}
      <CardContent>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body1" mb={1} fontWeight={600}>
            Price:
          </Typography>

          <Typography variant="body1" mb={1}>
            {treeData.price} €
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body1" mb={1} fontWeight={600}>
            Total CO&#8322; absorbed:
          </Typography>

          <Typography variant="body1" mb={1}>
            {treeData.co2} kg
          </Typography>
        </Stack>
      </CardContent>
      {/* actions */}
      <CardActions
        sx={{
          justifyContent: "center",
          pb: 3,
        }}
      >
        <Button variant="contained" color="primary">
          {" "}
          Add to cart{" "}
        </Button>
      </CardActions>
    </Card>
  );
}

export default ShopCard;
