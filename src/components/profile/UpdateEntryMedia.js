import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../common/FormError";
import Heading from "../layout/Heading";
import { Container, Form, Col, Button } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";

const schema = yup.object().shape({
  banner: yup.string(),
  avatar: yup.string(),
});

export default function UpdateEntryMedia() {
  const auth = useContext(AuthContext);
  const [updated, setUpdated] = useState(false);
  const [updatingMedia, setUpdatingMedia] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const http = useAxios();

  const navigate = useNavigate();

  let { name } = useParams();

  if (auth) {
    name = auth[0].name;
  }

  const url = `social/profiles/${name}/media`;

  async function onSubmit(data) {
    setUpdatingMedia(true);
    setUpdateError(null);
    setUpdated(false);
    navigate("/my-profile");

    console.log(data);

    const putData = {
      banner: data.banner,
      avatar: data.avatar,
    };

    try {
      const response = await http.put(url, putData);
      console.log("response", response.data);
      setUpdated(true);
    } catch (error) {
      console.log("error", error);
      setUpdateError(error.toString());
    } finally {
      setUpdatingMedia(false);
    }
  }

  return (
    <Container className="mt-3">
      <Col sm={8} className="mx-auto">
        <Form
          className="p-4 bg-light border rounded"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Heading content="Update media" />

          {updated && <Form.Text>{updated}</Form.Text>}
          {updateError && <FormError>{updateError}</FormError>}
          <Form.Group
            className="mb-3"
            controlId="formBasicName"
            disabled={updatingMedia}
          >
            <Form.Label>Banner</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter banner URL"
              {...register("banner")}
            />

            <Form.Label className="mt-3">Avatar</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter avatar URL"
              {...register("avatar")}
            />
          </Form.Group>
          <Button variant="success" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </Container>
  );
}
