import { useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { Form, Button } from "react-bootstrap/";
import { useNavigate } from "react-router-dom";

export default function FollowProfile({ name }) {
  const [error, setError] = useState(null);

  const http = useAxios();

  const navigate = useNavigate();

  const url = `/social/profiles/${name}/`;

  async function handleFollow(data) {
    console.log(data);

    try {
      const response = await http.put(url + data.target.value);
      console.log("response", response.data);
      navigate(0);
    } catch (error) {
      setError("error", error);
    }
  }

  return (
    <Form onClick={handleFollow}>
      <Button variant="success" value={"follow"}>
        {error ? "Error" : "Follow"}
      </Button>
      <Button variant="danger" value={"unfollow"}>
        {error ? "Error" : "unfollow"}
      </Button>
    </Form>
  );
}
