import { FC, } from "react";
import { Form, Button } from "antd";
import { FormStructure, FormStructureFields, FormValues } from "../types";
import { submitForm } from "../api/formService";
import { useMutation } from "@tanstack/react-query";
import DynamicField from "./DynamicField";

interface DynamicFormProps {
  formStructure: FormStructure;
};

const DynamicForm: FC<DynamicFormProps> = ({
  formStructure,
}) => {
  const [form] = Form.useForm();

  const mutation = useMutation({
    mutationFn: submitForm,
  });
  
  const handleStateChange = (name: string) => (value: string) => {
    form.setFieldValue(name, value)
  };

  const isFieldVisible = (field: FormStructureFields) => {
    if (!field.visibility) return true;
    const dependencyValue = form.getFieldValue(field.visibility.dependsOn);
    return (
      field.visibility.condition === "equals" &&
      dependencyValue === field.visibility.value
    );
  };
  
  const values = Form.useWatch([], form);

  const onFinish = async (values: FormValues) => {
    try {
      await form.validateFields();

      mutation.mutate(values);
      form.resetFields();
    } catch (error) {
      console.error('Form submission failed:', error);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      {formStructure.fields.map((section: FormStructureFields) => (
        <div key={section.id}>
          {section.type === "group" ? (
            section.fields?.map((field: FormStructureFields) => {
              if (!isFieldVisible(field)) return null;

              return (
                <>
                  <h3>{section.label}</h3>
                  <DynamicField
                    field={field}
                    handleStateChange={handleStateChange}
                    values={values}
                  />
                </>
              );
            })
          ) : (
            <DynamicField
              field={section}
              handleStateChange={handleStateChange}
              values={values}
            />
          )}
        </div>
      ))}

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DynamicForm;
