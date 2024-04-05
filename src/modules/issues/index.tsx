import { Flex } from "antd";
import styles from "./index.module.css";
import { Issue } from "../../utils/types";
import { formatDate } from "../../utils/formatDate";

export const Issues = ({ shownIssues }: { shownIssues: Issue[] }) => {
  const todoIssues = shownIssues.filter(
    (issue: Issue) => issue.state === "open"
  );

  const inProgressIssues = shownIssues.filter(
    (issue: Issue) => issue.state === "in progress"
  );

  const doneIssues = shownIssues.filter(
    (issue: Issue) => issue.state === "done"
  );

  function generateIssue(issue: Issue) {
    return (
      <Flex vertical className={styles.issue} key={issue.number}>
        <p>{issue.title}</p>
        <p> {"#" + issue.number + " " + formatDate(issue.created_at)}</p>
        <p>{issue.user.login + " | Comments: " + issue.comments}</p>
      </Flex>
    );
  }

  return (
    <Flex gap={30} className={styles.issueTable}>
      <Flex
        className={styles.issueCategory}
        align={"center"}
        vertical
        gap="small"
      >
        <p>ToDo</p>
        <div className={styles.issues}>
          {todoIssues.map((issue) => generateIssue(issue))}
        </div>
      </Flex>
      <Flex
        className={styles.issueCategory}
        align={"center"}
        vertical
        gap="small"
      >
        <p>In Progress</p>
        <div className={styles.issues}>
          {inProgressIssues.map((issue) => generateIssue(issue))}
        </div>
      </Flex>
      <Flex
        className={styles.issueCategory}
        align={"center"}
        vertical
        gap="small"
      >
        <p>Done</p>
        <div className={styles.issues}>
          {doneIssues.map((issue) => generateIssue(issue))}
        </div>
      </Flex>
    </Flex>
  );
};
