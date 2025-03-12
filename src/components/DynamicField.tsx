import { FC, } from "react";
import { Form, Input, Select, DatePicker, Radio, Checkbox } from "antd";
import { FormStructureFields } from "../types";
import StateSelect from "./StateSelect";

interface DynamicFieldProps {
  field: FormStructureFields;
  handleStateChange: (name: string) => (value: string) => void;
  values: { [key: string]: unknown };
};

const DynamicField: FC<DynamicFieldProps> = ({
  field,
  handleStateChange,
  values,
}) => {
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
      {field.type === "checkbox" && (
        <Checkbox.Group>
          {field.options?.map((option) => (
            <Checkbox key={option} value={option}>
              {option}
            </Checkbox>
          ))}
        </Checkbox.Group>
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
          dependValue={`${values?.[field.dynamicOptions.dependsOn]}`}
          onStateChange={handleStateChange(field.id)}
          dynamicOptions={field.dynamicOptions}
        />
      )}
    </Form.Item>
  );
};

export default DynamicField;
