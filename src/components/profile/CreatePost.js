import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from "../../hooks/useAxios";
import FormError from "../common/FormError";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  body: yup.string(),
  tags: yup.string(),
  media: yup.string(),
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

    try {
      const response = await http.post("social/posts", data);
      console.log("response", response.data);
    } catch (error) {
      console.log("error", error);
      setServerError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card className="mt-3 p-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        {serverError && <FormError>{serverError}</FormError>}
        <fieldset disabled={submitting} className="d-grid gap-3 mt-3">
          <div>
            <input name="title" placeholder="Title" {...register("title")} />
            {errors.title && <FormError>{errors.title.message}</FormError>}
          </div>

          <div>
            <textarea name="body" placeholder="Content" {...register("body")} />
          </div>

          <div>
            <input
              name="tags"
              placeholder="Tags (optional)"
              {...register("tags")}
            />
          </div>

          <div>
            <input
              name="media"
              placeholder="Image (optional)"
              {...register("media")}
            />
          </div>
          <div>
            <Button variant="success" type="submit">
              {submitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </fieldset>
      </form>
    </Card>
  );
}
