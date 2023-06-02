import { IconButton, Stack, SvgIcon, Typography } from "@mui/material";
import { updateArticle } from "../utils/utils";
import { useState } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import * as React from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function VotesController({ votes, setVotes, updateVotes }) {
  const [errorOpen, setErrorOpen] = useState(false);
  const [userUpVoted, setUserUpVoted] = useState(false);
  const [userDownVoted, setUserDownVoted] = useState(false);
  const [disableVotes, setDisableVotes] = useState(false);

  const handleErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setErrorOpen(false);
  };
  const decrementVotes = () => {
    setVotes(-1);
    return updateVotes({ incVotes: -1 }).catch(() => {
      setVotes(1);
      setErrorOpen(true);
    });
  };
  const incrementVotes = () => {
    setVotes(1);
    return updateVotes({ incVotes: 1 }).catch(() => {
      setVotes(-1);
      setErrorOpen(true);
    });
  };
  const handleUpVote = () => {
    setDisableVotes(true);
    if (userUpVoted) {
      decrementVotes().then(() => {
        setUserUpVoted(false);
        setDisableVotes(false);
      });
    } else {
      incrementVotes().then(() => {
        setUserUpVoted(true);
        setDisableVotes(false);
        if (userDownVoted) {
          setUserDownVoted(false);
          // increment twice because of previous down vote
          incrementVotes();
        }
      });
    }
  };
  const handleDownVote = () => {
    setDisableVotes(true);
    if (userDownVoted) {
      incrementVotes().then(() => {
        setUserDownVoted(false);
        setDisableVotes(false);
      });
    } else {
      decrementVotes().then(() => {
        setUserDownVoted(true);
        setDisableVotes(false);
        if (userUpVoted) {
          setUserUpVoted(false);
          // decrement twice because of previous up vote
          decrementVotes();
        }
      });
    }
  };
  return (
    <>
      <Stack direction="row" alignItems="center">
        <Button
          size="small"
          sx={{ minWidth: "0px" }}
          title={`${userUpVoted ? "remove" : ""} up vote`}
          onClick={handleUpVote}
          disabled={disableVotes}
        >
          <SvgIcon>
            <path
              xmlns="http://www.w3.org/2000/svg"
              stroke="#d93a00"
              strokeWidth="2"
              transform="rotate(180 12 12)"
              // d="m5.6511,11.97544l6.3489,-10.20948l6.3489,10.20948l-3.17445,0l0,10.25861l-6.3489,0l0,-10.25861l-3.17445,0z"
              d="M18.88 9.7a1.114 1.114 0 00-1.006-.7H14V2.123A1.125 1.125 0 0012.877 1H7.123A1.125 1.125 0 006 2.123V9H2.123a1.114 1.114 0 00-1.005.7 1.25 1.25 0 00.176 1.348l7.872 8.581a1.124 1.124 0 001.667.003l7.876-8.589A1.248 1.248 0 0018.88 9.7z"
              fill={userUpVoted ? "#d93a00" : "#fff"}
            />
          </SvgIcon>
        </Button>
        <Typography variant="subtitle1">{votes}</Typography>
        <Button
          size="small"
          sx={{ minWidth: "0px" }}
          title={`${userDownVoted ? "remove" : ""} down vote`}
          onClick={handleDownVote}
          disabled={disableVotes}
        >
          <SvgIcon>
            <path
              xmlns="http://www.w3.org/2000/svg"
              // transform="rotate(180 12 12)"
              stroke="#6a5cff"
              strokeWidth="2"
              // d="m5.6511,11.97544l6.3489,-10.20948l6.3489,10.20948l-3.17445,0l0,10.25861l-6.3489,0l0,-10.25861l-3.17445,0z"
              d="M18.88 9.7a1.114 1.114 0 00-1.006-.7H14V2.123A1.125 1.125 0 0012.877 1H7.123A1.125 1.125 0 006 2.123V9H2.123a1.114 1.114 0 00-1.005.7 1.25 1.25 0 00.176 1.348l7.872 8.581a1.124 1.124 0 001.667.003l7.876-8.589A1.248 1.248 0 0018.88 9.7z"
              fill={userDownVoted ? "#6a5cff" : "#fff"}
            />
          </SvgIcon>
        </Button>
      </Stack>
      <Snackbar
        open={errorOpen}
        autoHideDuration={3000}
        onClose={handleErrorClose}
      >
        <Alert severity="error">
          There was an error voting! Please Try again.
        </Alert>
      </Snackbar>
    </>
  );
}
