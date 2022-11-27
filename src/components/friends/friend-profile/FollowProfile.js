import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import Button from "react-bootstrap/Button";

export default function FollowProfile({ name }) {
  const [error, setError] = useState(null);

  const http = useAxios();
  const history = useNavigate();

  const url = `/social/profiles/${name}/follow`;

  async function handleFollow() {
    try {
      await http.put(url);
      history("/my-profile");
    } catch (error) {
      setError(error);
    }
  }

  return (
    <Button variant="success" type="button" onClick={handleFollow}>
      {error ? "Error" : "Follow"}
    </Button>
  );
}
