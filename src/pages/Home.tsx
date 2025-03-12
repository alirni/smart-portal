import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, Button, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { fetchForms } from "../api/formService";
import { FormStructure } from "../types";

export const Home: FC = () => {
  const { data: forms, isLoading } = useQuery({
    queryKey: ["forms"],
    queryFn: fetchForms,
  });

  const navigate = useNavigate();

  if (isLoading) return <Spin size="large" />;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        maxWidth: "600px",
        margin: "auto",
        height: "100%",
      }}
    >
      {forms.map((form: FormStructure) => (
        <Card key={form.formId} title={form.title}>
          <Button
            type="primary"
            onClick={() => navigate(`/form/${form.formId}`)}
          >
            Fill Out Form
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default Home;
