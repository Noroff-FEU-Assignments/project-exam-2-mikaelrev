import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";

export default function ReactToPost() {
  const { register, handleSubmit } = useForm({});

  const http = useAxios();

  let { id } = useParams();

  const navigate = useNavigate();

  const url = `social/posts/${id}/react/`;

  async function onSubmit(data) {
    console.log(data);

    try {
      const response = await http.put(url + data.symbol);
      console.log("response", response.data);
      navigate(0);
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
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
  );
}
