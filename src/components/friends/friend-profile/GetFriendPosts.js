import { useState, useEffect } from "react";
import { Col, Row, ListGroup } from "react-bootstrap";
import useAxios from "../../../hooks/useAxios";
import Heading from "../../layout/Heading";
import { NavLink, useParams } from "react-router-dom";

export default function GetFriendPosts() {
  const [posts, setPosts] = useState([]);

  const http = useAxios();

  let { name } = useParams();

  const url = `social/profiles/${name}/posts`;

  useEffect(function () {
    async function GetFriendPosts() {
      try {
        const response = await http.get(url);
        console.log("response", response);
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    GetFriendPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Row className="mt-3">
      <Col xs={12} md={8}>
        <Heading size="2" content="All posts" />
        <ListGroup>
          {posts.map((post) => {
            return (
              <ListGroup.Item
                className="d-flex align-items-center gap-5 p-3"
                key={post.id}
              >
                <div>
                  <p className="m-0">{post.title}</p>
                </div>

                <div>
                  <NavLink to={`/details/${post.id}`}>Go to post</NavLink>
                </div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Col>
    </Row>
  );
}
