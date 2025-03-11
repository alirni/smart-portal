import { FC, useEffect, useState } from "react";
import { Form, Select } from "antd";
import { fetchDynamicOptions } from "../api/formService"; // Assume this function is used to fetch options dynamically
import { DynamicOptions } from "../types";

interface StateSelectProps {
  dependValue: string;
  onStateChange: (value: string) => void; // Function to handle the selected state change
  dynamicOptions: DynamicOptions;
}

const StateSelect: FC<StateSelectProps> = ({
  dependValue,
  dynamicOptions,
  onStateChange,
}) => {
  const [options, setOptions] = useState<{ data: any[]; isLoading: boolean }>(
    {}
  );

  const fetchOptions = async (value: string) => {
    try {
      const data = await fetchDynamicOptions(dynamicOptions.endpoint, value);
      setOptions({ data, isLoading: false });
    } catch {
      setOptions({ data: [], isLoading: false });
    }
  };

  useEffect(() => {
    if (dependValue) {
      fetchOptions(dependValue);
    }
  }, [dependValue]);

  return (
    <Select onChange={onStateChange} loading={options.isLoading}>
      {options.data && options.data.length
        ? options.data.map((option: any) => (
            <Select.Option key={option} value={option}>
              {option}
            </Select.Option>
          ))
        : null}
    </Select>
  );
};

export default StateSelect;
