import { FC, useContext } from "react";
import { BodyCellProps, DragIndexState } from "./type";
import { dragActiveStyle, DragIndexContext } from "./util";

export const TableBodyCell: FC<BodyCellProps> = (props) => {
  const dragState = useContext<DragIndexState>(DragIndexContext);
  return (
    <td
      {...props}
      style={{
        ...props.style,
        ...dragActiveStyle(dragState, props.id),
        userSelect: "none",
      }}
    />
  );
};