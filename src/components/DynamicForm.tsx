import { FC, } from "react";
import { Form, Input, Select, DatePicker, Radio, Button } from "antd";
import { FormStructure, FormStructureFields, FormStructureSection, FormValues } from "../types";
import StateSelect from "./StateSelect";
import { submitForm } from "../api/formService";
import { useMutation } from "@tanstack/react-query";

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
      mutation.mutate(values);
      form.resetFields();
    } catch (error) {
      console.error('Form submission failed:', error);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      {formStructure.fields.map((section: FormStructureSection) => (
        <div key={section.id}>
          <h3>{section.label}</h3>
          {section.type === "group"
            ? section.fields.map((field: FormStructureFields) => {
                if (!isFieldVisible(field)) return null;

                return (
                  <Form.Item
                    key={field.id}
                    label={field.label}
                    name={field.id}
                    rules={
                      field.required
                        ? [
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]
                        : []
                    }
                  >
                    {field.type === "text" && <Input />}
                    {field.type === "date" && <DatePicker />}
                    {field.type === "number" && <Input type="number" />}
                    {field.type === "radio" && (
                      <Radio.Group>
                        {field.options?.map((option: string) => (
                          <Radio key={option} value={option}>
                            {option}
                          </Radio>
                        ))}
                      </Radio.Group>
                    )}
                    {field.type === "select" && !field.dynamicOptions && (
                      <Select>
                        {field.options?.map((option: string) => (
                          <Select.Option key={option} value={option}>
                            {option}
                          </Select.Option>
                        ))}
                      </Select>
                    )}

                    {field.type === "select" && field.dynamicOptions && (
                      <StateSelect
                        dependValue={values?.[field.dynamicOptions.dependsOn]}
                        onStateChange={handleStateChange(field.id)}
                        dynamicOptions={field.dynamicOptions}
                      />
                    )}
                  </Form.Item>
                );
              })
            : null}
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
