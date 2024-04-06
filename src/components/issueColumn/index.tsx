import { Flex } from "antd";
import { Issue } from "../../utils/types";
import styles from "./index.module.css";
import { IssueItem } from "../IssueItem";
import { Droppable } from "react-beautiful-dnd";

type ColumnProps = {
  title: string;
  issues: Issue[];
  id: string;
};

export const IssueColumn = ({ title, issues, id }: ColumnProps) => {
  return (
    <Flex className={styles.issueCategory} align={"center"} vertical>
      <p className={styles.title}>{title}</p>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            className={`${styles.issues} ${
              snapshot.isDraggingOver && styles.dragged
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {issues.map((issue, index) => (
              <IssueItem key={index} index={index} issue={issue} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Flex>
  );
};
