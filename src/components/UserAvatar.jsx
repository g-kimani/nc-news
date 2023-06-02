import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { getUserInfo } from "../utils/utils";

export default function UserAvatar({ username }) {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    getUserInfo(username).then(({ user }) => {
      setUser(user);
      setIsLoading(false);
    });
  }, []);
  if (isLoading) return <Avatar sx={{ width: "50px", height: "50px" }} />;
  return (
    <Avatar
      src={user.avatar_url}
      imgProps={{ width: "auto" }}
      sx={{ width: "50px", height: "50px" }}
      title={user.username}
    />
  );
}
