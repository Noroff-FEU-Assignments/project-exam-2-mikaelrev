import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import useAxios from "../../hooks/useAxios";

export default function PostsList({ register }) {
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
    <Container>
      {posts.map((post) => {
        return (
          <Card key={post.id}>
            <p>{post.title}</p>
          </Card>
        );
      })}
    </Container>
  );
}
