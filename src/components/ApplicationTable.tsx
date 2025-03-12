import { FC,  useEffect, useRef, useState } from "react";
import { Checkbox, CheckboxOptionType, TableColumnsType } from "antd";
import { useQuery } from "@tanstack/react-query";
import { fetchSubmissions } from "../api/formService";
import { TableComponent } from "./TableComponent";

const ApplicationTable: FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["submissions"],
    queryFn: fetchSubmissions,
  });
  
  const [columns, setColumns] = useState<TableColumnsType<Record<string, unknown>>>([]);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const options = useRef<{label: string, value: string}[]>([]);
  
  useEffect(() => {
    if ((!isLoading && data.columns)) {
      prepareColumnsMeta(data.columns);
    }
  }, [data]);

  const prepareColumnsMeta = (columns: string[]) => {
    setColumns(columns.map((column, index) => {
      return {
        title: column,
        dataIndex: column,
        key: `${index}`,
        onHeaderCell: () => ({ id: `${index}` }),
        onCell: () => ({ id: `${index}` }),
        ...(column.toLowerCase() === "age"
          ? {
              sorter: (a, b) => {
                return (b[column] as number) - (a[column] as number);
              },
            }
          : {
              sorter: (a, b) =>
                (a[column] as string).length - (b[column] as string).length,
            }),
      };
    }));
  };

  useEffect(() => {
    if (columns.length) {
      setCheckedList(columns.map((column) => column.key as string));

      options.current = columns.map(({ key, title }) => ({
        label: String(title),
        value: String(key),
      }));
    }
  }, [columns]);

  const newColumns = columns.map((item) => ({
    ...item,
    hidden: !checkedList.includes(item.key as string),
  }));
  
  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Checkbox.Group
        value={checkedList}
        options={options.current as CheckboxOptionType[]}
        onChange={(value) => {
          setCheckedList(value as string[]);
        }}
      />

      <TableComponent
        dataSource={data?.data}
        columns={newColumns}
        setColumns={setColumns}
      />
    </>
  );
};

export default ApplicationTable;
