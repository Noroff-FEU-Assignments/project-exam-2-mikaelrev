import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import Button from "react-bootstrap/Button";

export default function UnfollowProfile({ name }) {
  const [error, setError] = useState(null);

  const http = useAxios();
  const history = useNavigate();

  const url = `/social/profiles/${name}/unfollow`;

  async function handleFollow() {
    try {
      await http.put(url);
      history("/my-profile");
    } catch (error) {
      setError(error);
    }
  }

  return (
    <Button
      className="ms-2"
      variant="danger"
      type="button"
      onClick={handleFollow}
    >
      {error ? "Error" : "Unfollow"}
    </Button>
  );
}
