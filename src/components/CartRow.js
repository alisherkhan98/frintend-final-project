// react
import React from "react";
// MUI
import {
  Box,
  Button,
  Stack,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
// redux
import { useDispatch } from "react-redux";
import { removeAll, addItem, removeItem } from "../redux/features/shopSlice";
// icons
import { RiDeleteBin6Line } from "react-icons/ri";

function CartRow({ item }) {
  const dispatch = useDispatch();

  return (
    <>
      <Stack
        direction="row"
        flexWrap="wrap"
        // alignItems="center"
        sx={{ my: { xs: 3, sm: 5 } }}
      >
        <img
          src={item?.img}
          style={{ height: 75, width: 75, objectFit: "cover" }}
          alt=""
        />
        <Box
          sx={{
            minWidth: "fit-content",
            flex: "1 1 auto",
            pl: { xs: 1, sm: 3 },
            minWidth: 164,
          }}
        >
          <Typography variant="subtitle2" fontWeight={600} mb={1}>
            {item?.name}
          </Typography>

          <Typography variant="body2">
            CO&#8322; absorbed: {item?.co2} kg
          </Typography>

          <Typography variant="body2">
            Price: {item?.price?.toFixed(2)} €
          </Typography>
        </Box>
        <Stack gap={1} sx={{ flexDirection: "row", alignItems: "flex-start" }}>
          <Box>
            <Button
              onClick={() => dispatch(removeItem(item))}
              sx={{
                px: 2,
                minWidth: 0,
                verticalAlign: "baseline",
                fontSize: 20,
              }}
            >
              -
            </Button>
            <span style={{ margin: "0 5px" }}>{item?.amount}</span>
            <Button
              onClick={() => dispatch(addItem(item))}
              sx={{
                px: 2,
                minWidth: 0,
                verticalAlign: "baseline",
                fontSize: 20,
              }}
            >
              +
            </Button>
          </Box>
          <IconButton
            sx={{ mt: "4px" }}
            color="error"
            onClick={() => dispatch(removeAll(item))}
          >
            <RiDeleteBin6Line />
          </IconButton>
        </Stack>
      </Stack>
      <Divider />
    </>
  );
}

export default CartRow;
