import { useState, useEffect } from "react";
import { Col, Row, ListGroup, Image } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import Heading from "../layout/Heading";
import { NavLink } from "react-router-dom";

export default function ExplorePosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);

  const http = useAxios();

  useEffect(function () {
    async function getPosts() {
      try {
        const response = await http.get("social/posts");
        console.log("response", response);
        setPosts(response.data);
      } catch (error) {
        console.log(error);
        setError(error.toString());
      }
    }

    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error)
    return <div>There was an error fetching posts. Try again later</div>;

  return (
    <Col className="mt-3">
      <Heading content="Explore Posts" />
      <ListGroup>
        {posts.map((post) => {
          return (
            <ListGroup.Item key={post.id}>
              <Row className="p-3 text-center text-sm-start">
                <Col sm={4} lg={2}>
                  <Image
                    className="border rounded"
                    style={{
                      aspectRatio: "1/1",
                      height: "5rem",
                      objectFit: "cover",
                    }}
                    src={post.media}
                  ></Image>
                </Col>
                <Col sm={8} lg={10}>
                  <NavLink to={`/details/${post.id}`}>{post.title}</NavLink>
                  <p className="m-0">tags: {post.tags}</p>
                  <p className="m-0">Comments: {post._count.comments}</p>
                </Col>
              </Row>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Col>
  );
}
