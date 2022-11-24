import { useState, useEffect } from "react";
import { Col, ListGroup } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import Heading from "../layout/Heading";
import { NavLink, useParams } from "react-router-dom";

export default function GetMyPosts() {
  const [posts, setPosts] = useState([]);

  const http = useAxios();

  let { name } = useParams();

  name = "Mikael";

  const url = `social/profiles/${name}/posts`;

  useEffect(function () {
    async function GetMyPosts() {
      try {
        const response = await http.get(url);
        console.log("response", response);
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    GetMyPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Col className="mt-3 mb-5">
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
