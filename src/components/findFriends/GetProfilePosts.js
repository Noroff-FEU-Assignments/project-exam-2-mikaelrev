import { useState, useEffect } from "react";
import { Col, ListGroup } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import Heading from "../layout/Heading";
import { NavLink, useParams } from "react-router-dom";

export default function GetProfilePosts() {
  const [posts, setPosts] = useState([]);

  const http = useAxios();

  let { name } = useParams();

  const url = `social/profiles/${name}/posts`;

  useEffect(function () {
    async function GetProfilePosts() {
      try {
        const response = await http.get(url);
        console.log("response", response);
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    GetProfilePosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Col className="mt-3">
      <Heading content="All posts" />
      <ListGroup>
        {posts.map((post) => {
          return (
            <ListGroup.Item key={post.id}>
              <NavLink to={`/details/${post.id}`}>{post.title}</NavLink>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Col>
  );
}