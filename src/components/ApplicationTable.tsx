import React, { useState } from "react";
import { Table } from "antd";
import { useQuery } from "@tanstack/react-query";
import { fetchSubmissions } from "../api/formService";

const ApplicationTable: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["submissions"],
    queryFn: fetchSubmissions,
  });

  const [columns, setColumns] = useState(data?.columns || []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <Table
      dataSource={data?.data}
      columns={columns.map((col) => ({
        title: col,
        dataIndex: col,
        key: col,
      }))}
      rowKey="id"
    />
  );
};

export default ApplicationTable;
