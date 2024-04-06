import { Flex } from "antd";
import styles from "./index.module.css";
import { Issue, IssueState } from "../../utils/types";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { IssueColumn } from "../IssueColumn";
import { useIssuesStore } from "../../utils/store";

export const Issues = () => {
  const todoIssues = useIssuesStore((state) => state.todoIssues);
  const inProgressIssues = useIssuesStore((state) => state.inProgressIssues);
  const doneIssues = useIssuesStore((state) => state.doneIssues);

  const setTodoIssues = useIssuesStore((state) => state.setTodoIssues);
  const setInProgressIssues = useIssuesStore(
    (state) => state.setInProgressIssues
  );
  const setDoneIssues = useIssuesStore((state) => state.setDoneIssues);

  const updateStoredRepo = useIssuesStore((state) => state.updateStoredRepo);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    deletePreviousState(source.droppableId, draggableId);

    const issue = findItemById(draggableId, [
      ...todoIssues,
      ...inProgressIssues,
      ...doneIssues,
    ]);
    if (!issue) return;

    setNewState(destination.droppableId, issue, destination.index);
    updateStoredRepo();
  };

  const deletePreviousState = (
    sourceDroppableId: string,
    issueNumber: string
  ) => {
    switch (sourceDroppableId) {
      case "1":
        setTodoIssues(removeItemById(issueNumber, todoIssues));
        break;
      case "2":
        setInProgressIssues(removeItemById(issueNumber, inProgressIssues));
        break;
      case "3":
        setDoneIssues(removeItemById(issueNumber, doneIssues));
        break;
    }
  };

  const setNewState = (
    destinationDroppableId: string,
    issue: Issue,
    index: number
  ) => {
    switch (destinationDroppableId) {
      case "1":
        const newTodos = prepareNewState(issue, "open", todoIssues, index);
        setTodoIssues(newTodos);
        break;
      case "2":
        let newInProgress = prepareNewState(
          issue,
          "in progress",
          inProgressIssues,
          index
        );
        setInProgressIssues(newInProgress);
        break;
      case "3":
        let newDoneIssues = prepareNewState(issue, "done", doneIssues, index);
        setDoneIssues(newDoneIssues);
        break;
    }
  };

  const prepareNewState = (
    issue: Issue,
    state: IssueState,
    issues: Issue[],
    index: number
  ) => {
    let updatedIssue = { ...issue, state: state };
    let newState = issues.filter((todo) => todo.number !== issue.number);
    newState.splice(index, 0, updatedIssue);
    return newState;
  };

  const findItemById = (id: string, array: Issue[]) => {
    return array.find((issue) => issue.number === Number(id));
  };

  const removeItemById = (id: string, array: Issue[]) => {
    return array.filter((issue) => issue.number !== Number(id));
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Flex gap={30} className={styles.issueTable}>
        <IssueColumn title={"TO DO"} issues={todoIssues} id={"1"} />
        <IssueColumn title={"IN PROGRESS"} issues={inProgressIssues} id={"2"} />
        <IssueColumn title={"DONE"} issues={doneIssues} id={"3"} />
      </Flex>
    </DragDropContext>
  );
};
