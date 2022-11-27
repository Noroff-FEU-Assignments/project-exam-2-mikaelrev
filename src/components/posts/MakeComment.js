import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from "../../hooks/useAxios";
import FormError from "../common/FormError";
import { Form, Col, Button } from "react-bootstrap";

const schema = yup.object().shape({
  body: yup.string().required("Content is required"),
});

export default function MakeComment() {
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const http = useAxios();

  let { id } = useParams();

  const url = `social/posts/${id}/comment`;

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setServerError(null);

    console.log(data);

    const postData = {
      body: data.body,
    };

    try {
      const response = await http.post(url, postData);
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
    <Col className="mt-3">
      <Form
        className="p-4 bg-light border rounded"
        onSubmit={handleSubmit(onSubmit)}
      >
        {serverError && <FormError>{serverError}</FormError>}
        <Form.Group
          className="mb-3 d-flex"
          controlId="formBasicName"
          disabled={submitting}
        >
          <Form.Control
            style={{ height: "2.5rem" }}
            type="text"
            placeholder="Write a comment"
            {...register("body")}
          />
          <Button
            variant="success"
            type="submit"
            style={{ padding: ".25rem 1.5rem" }}
          >
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Col>
  );
}
