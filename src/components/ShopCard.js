// react
import React, { useState } from "react";
// MUI
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
// redux
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/features/shopSlice";
// icons
import { BsCart3 } from "react-icons/bs";
import Loader from "./Loader";

function ShopCard({ treeData, setIsAlertOpen, shopRef }) {
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  // function to handle add to cart
  function handleClick() {
    if (!user) {
      setIsAlertOpen(true);

      window.scrollTo({
        top:
          shopRef.current.getBoundingClientRect().top + window.pageYOffset - 60,
        behavior: "smooth",
      });
      return;
    }
    setIsLoading(true);
    dispatch(addItem(treeData));
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }
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
          <Typography variant="body2" mb={1} fontWeight={600}>
            Price:
          </Typography>

          <Typography variant="body2" mb={1}>
            {treeData.price} €
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" mb={1} fontWeight={600}>
            CO&#8322; absorbed:
          </Typography>

          <Typography variant="body2" mb={1}>
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
        <Button
          variant="contained"
          endIcon={isLoading ? <CircularProgress size={20} /> : <BsCart3 />}
          disabled={isLoading}
          color="primary"
          onClick={handleClick}
        >
          {" "}
          Add to cart{" "}
        </Button>
      </CardActions>
    </Card>
  );
}

export default ShopCard;
