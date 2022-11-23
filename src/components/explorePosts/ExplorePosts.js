import { useState, useEffect } from "react";
import { Container, ListGroup } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import Heading from "../layout/Heading";
import { NavLink } from "react-router-dom";

export default function ExplorePosts() {
  const [posts, setPosts] = useState([]);

  const http = useAxios();

  useEffect(function () {
    async function getPosts() {
      try {
        const response = await http.get("social/posts");
        console.log("response", response);
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="mt-3">
      <Heading content="Explore Posts" />
      <ListGroup>
        {posts.map((post) => {
          return (
            <ListGroup.Item key={post.id}>
              <NavLink to={`/details/${post.id}`}>{post.title}</NavLink>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Container>
  );
}
