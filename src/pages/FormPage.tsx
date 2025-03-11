import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchForms } from "../api/formService";
import DynamicForm from "../components/DynamicForm";
import { Spin } from "antd";
import { FormStructure } from "../types";

export const FormPage: React.FC = () => {
  const { formId } = useParams();
  const { data: forms, isLoading } = useQuery({
    queryKey: ["forms"],
    queryFn: fetchForms,
  });

  if (isLoading) return <Spin size="large" />;

  const formStructure = forms.find(
    (form: FormStructure) => form.formId === formId
  );
  if (!formStructure) return <h2>Form Not Found</h2>;

  return <DynamicForm formStructure={formStructure} />;
};
