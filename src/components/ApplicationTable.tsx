import { FC, useEffect, useState } from "react";
import { Table, TableColumnsType } from "antd";
import { useQuery } from "@tanstack/react-query";
import { fetchSubmissions } from "../api/formService";

const ApplicationTable: FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["submissions"],
    queryFn: fetchSubmissions,
  });

  useEffect(() => {
    if (!isLoading && data.columns) {
      prepareColumnsMeta(data.columns);
    }
  }, [data]);
  
  const [columns, setColumns] = useState<TableColumnsType<Record<string, unknown>>>([]);
  
  const prepareColumnsMeta = (columns: string[]) => {
    setColumns(columns.map((column) => {
      return {
        title: column,
        dataIndex: column,
        key: column,
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
  

  if (isLoading) return <p>Loading...</p>;

  return (
    <Table
      dataSource={data?.data}
      columns={columns}
      rowKey="id"
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default ApplicationTable;
