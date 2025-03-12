import { FC, useEffect, useState } from "react";
import { TableColumnsType } from "antd";
import { useQuery } from "@tanstack/react-query";
import { fetchSubmissions } from "../api/formService";
import { TableComponent } from "./TableComponent";

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
  

  if (isLoading) return <p>Loading...</p>;

  return (
    <TableComponent
      dataSource={data?.data}
      columns={columns}
      setColumns={setColumns}
    />
  );
};

export default ApplicationTable;
