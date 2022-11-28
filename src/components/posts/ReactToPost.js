import React from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { useForm } from "react-hook-form";
import { Container, Form } from "react-bootstrap";

export default function ReactToPost() {
  const { register, handleSubmit } = useForm({});

  const http = useAxios();

  let { id } = useParams();

  const url = `social/posts/${id}/react/`;

  async function onSubmit(data) {
    console.log(data);

    try {
      const response = await http.put(url + data.symbol);
      console.log("response", response.data);
      window.location.reload(true);
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <Container className="mt-3">
      <Form onChange={handleSubmit(onSubmit)}>
        <Form.Select {...register("symbol")}>
          <option value={""}>React to this post</option>
          <option value={"👍"}>👍</option>
          <option value={"👎"}>👎</option>
          <option value={"❤️"}>❤️</option>
          <option value={"😀"}>😀</option>
          <option value={"😂"}>😂</option>
        </Form.Select>
      </Form>
    </Container>
  );
}
