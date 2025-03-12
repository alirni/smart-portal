import { FC, useEffect, useState } from "react";
import { Select } from "antd";
import { fetchDynamicOptions } from "../api/formService"; // Assume this function is used to fetch options dynamically
import { DynamicOptions } from "../types";

interface StateSelectProps {
  dependValue?: string;
  onStateChange: (value: string) => void;
  dynamicOptions: DynamicOptions;
}

const StateSelect: FC<StateSelectProps> = ({
  dependValue,
  dynamicOptions,
  onStateChange,
}) => {
  const [options, setOptions] = useState<{ data: {country: string; states: string[]}; isLoading: boolean }>(
    { data: { country: '', states: [] }, isLoading: true }
  );

  const fetchOptions = async (value: string) => {
    try {
      const data = await fetchDynamicOptions(dynamicOptions.endpoint, value);
      setOptions({ data, isLoading: false });
    } catch {
      setOptions({ data: { country: '', states: [] }, isLoading: false });
    }
  };

  useEffect(() => {
    if (dependValue) {
      fetchOptions(dependValue);
    }
  }, [dependValue]);

  return (
    <Select onChange={onStateChange} loading={options.isLoading}>
      {options.data && options.data.states.length
        ? options.data.states.map((option: string) => (
            <Select.Option key={option} value={option}>
              {option}
            </Select.Option>
          ))
        : null}
    </Select>
  );
};

export default StateSelect;
