import { IconButton, Stack, SvgIcon } from "@mui/material";

export default function ArticleVotes({ votes, setVotes }) {
  return (
    <>
      <Stack direction="row" alignItems="center">
        {votes}
        <IconButton title="up vote">
          <SvgIcon>
            <path
              xmlns="http://www.w3.org/2000/svg"
              stroke="#000"
              strokeWidth="2"
              d="m5.6511,11.97544l6.3489,-10.20948l6.3489,10.20948l-3.17445,0l0,10.25861l-6.3489,0l0,-10.25861l-3.17445,0z"
              fill="#fff"
            />
          </SvgIcon>
          {/* <ThumbUpAltOutlinedIcon /> */}
        </IconButton>
        <IconButton title="down vote">
          <SvgIcon>
            <path
              xmlns="http://www.w3.org/2000/svg"
              transform="rotate(180 12 12)"
              stroke="#000"
              strokeWidth="2"
              d="m5.6511,11.97544l6.3489,-10.20948l6.3489,10.20948l-3.17445,0l0,10.25861l-6.3489,0l0,-10.25861l-3.17445,0z"
              fill="#fff"
            />
          </SvgIcon>
        </IconButton>
      </Stack>
    </>
  );
}
