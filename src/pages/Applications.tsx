import { FC } from "react";
import ApplicationTable from "../components/ApplicationTable";

export const Applications: FC = () => {
  return (
    <div>
      <h2>Submitted Applications</h2>
      <ApplicationTable />
    </div>
  );
};