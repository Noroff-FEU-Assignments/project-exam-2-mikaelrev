import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import useAxios from "../../hooks/useAxios";
import ListGroup from "react-bootstrap/ListGroup";
import Heading from "../layout/Heading";

export default function ExplorePosts({ register }) {
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
      <Card>
        <Card.Header>Recent posts</Card.Header>
        <ListGroup>
          {posts.map((post) => {
            return (
              <ListGroup.Item key={post.id}>
                <p ket={post.id}>{post.title}</p>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Card>
    </Container>
  );
}
