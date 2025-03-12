import { UniqueIdentifier } from "@dnd-kit/core";
import { TableColumnsType } from "antd";
import { Dispatch, HTMLAttributes, SetStateAction } from "react";

export interface HeaderCellProps extends HTMLAttributes<HTMLTableCellElement> {
  id: string;
}

export interface BodyCellProps extends HTMLAttributes<HTMLTableCellElement> {
  id: string;
}

export interface DragIndexState {
  active: UniqueIdentifier;
  over: UniqueIdentifier | undefined;
  direction?: "left" | "right";
}

export interface TableComponentProps {
  columns: TableColumnsType<Record<string, unknown>>;
  setColumns: Dispatch<SetStateAction<TableColumnsType<Record<string, unknown>>>>;
  dataSource: Record<string, unknown>[];
}