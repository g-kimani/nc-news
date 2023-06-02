import React from "react";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ShowMessage({
  message: { open = false, time = 3000, severity = "success", text = "" },
  close,
}) {
  return (
    <Snackbar open={open} autoHideDuration={time} onClose={close}>
      <Alert severity={severity}>{text}</Alert>
    </Snackbar>
  );
}
