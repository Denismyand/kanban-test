import { Flex } from "antd";
import { Issue } from "../../utils/types";
import { formatDate } from "../../utils/formatDate";
import styles from "./index.module.css";
import { Draggable } from "react-beautiful-dnd";

type ItemProps = {
  issue: Issue;
  index: number;
};

export const IssueItem = ({ issue, index }: ItemProps) => {
  return (
    <Draggable draggableId={`${issue.number}`} key={issue.number} index={index}>
      {(provided, snapshot) => (
        <Flex
          vertical
          className={`${styles.issue} ${
            snapshot.isDragging && styles.dragging
          }`}
          key={issue.number}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <p data-testid={"issueTitle"} className={styles.issueTitle}>
            {issue.title}
          </p>
          <p> {"#" + issue.number + " " + formatDate(issue.created_at)}</p>
          <p>{issue.user.login + " | Comments: " + issue.comments}</p>
        </Flex>
      )}
    </Draggable>
  );
};
