import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from "../../hooks/useAxios";
import FormError from "../common/FormError";
import Heading from "../layout/Heading";
import { Form, Col, Row, Button } from "react-bootstrap";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
});

export default function CreatePost() {
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const http = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setServerError(null);

    console.log(data);

    const postData = {
      title: data.title,
      body: data.body,
      tags: data.tags.split(","),
      media: data.media,
    };

    try {
      const response = await http.post("social/posts", postData);
      console.log("response", response.data);
      window.location.reload(true);
    } catch (error) {
      console.log("error", error);
      setServerError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form className="p-4 form" onSubmit={handleSubmit(onSubmit)}>
      <Heading size="2" content="Create a post" />
      {serverError && <FormError>{serverError}</FormError>}
      <Form.Group
        className="mb-3"
        controlId="formBasicName"
        disabled={submitting}
      >
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          {...register("title")}
        />
        <Col>
          {errors.title && (
            <Form.Text className="text-danger">
              {errors.title.message}
            </Form.Text>
          )}
        </Col>

        <Form.Label className="mt-3">Content</Form.Label>
        <Form.Control
          style={{ height: "100px" }}
          type="text"
          placeholder="Enter content"
          {...register("body")}
        />
        <Col>
          {errors.body && (
            <Form.Text className="text-danger">{errors.body.message}</Form.Text>
          )}
        </Col>

        <Row>
          <Form.Label className="mt-3">Tags (optional)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter tags"
            {...register("tags")}
          />
          <Col>
            {errors.tags && (
              <Form.Text className="text-danger">
                {errors.tags.message}
              </Form.Text>
            )}
          </Col>

          <Form.Label className="mt-3">Image (optional)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image URL"
            {...register("media")}
          />
          <Col>
            {errors.tags && (
              <Form.Text className="text-danger">
                {errors.tags.message}
              </Form.Text>
            )}
          </Col>
        </Row>
      </Form.Group>
      <Button variant="success" type="submit">
        Submit
      </Button>
    </Form>
  );
}
