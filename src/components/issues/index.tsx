import { Flex } from "antd";
import styles from "./index.module.css";
import { useIssuesStore } from "../../utils/store";
import { Issue } from "../../utils/types";
import { DragDropContext } from "react-beautiful-dnd";
import { IssueColumn } from "../issueColumn";

export const Issues = () => {
  const todoIssues = useIssuesStore((state) => state.todoIssues);

  const inProgressIssues = useIssuesStore((state) => state.inProgressIssues);

  const doneIssues = useIssuesStore((state) => state.doneIssues);

  const setTodoIssues = useIssuesStore((state) => state.setTodoIssues);
  const setInProgressIssues = useIssuesStore(
    (state) => state.setInProgressIssues
  );
  const setDoneIssues = useIssuesStore((state) => state.setDoneIssues);

  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;
    if (!destination || source.droppableId === destination.droppableId) return;

    deletePreviousState(source.droppableId, draggableId);

    const issue = findItemById(draggableId, [
      ...todoIssues,
      ...inProgressIssues,
      ...doneIssues,
    ]);
    if (!issue) return;

    setNewState(destination.droppableId, issue, destination.index);
  };

  function deletePreviousState(sourceDroppableId: string, issueNumber: number) {
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
  }

  function setNewState(
    destinationDroppableId: string,
    issue: Issue,
    index: number
  ) {
    let updatedIssue: Issue;
    switch (destinationDroppableId) {
      case "1": // TO DO
        updatedIssue = { ...issue, state: "open" };
        let newTodos = [...todoIssues];
        newTodos.splice(index, 0, updatedIssue);
        setTodoIssues(newTodos);
        break;
      case "2": // IN PROGRESS
        updatedIssue = { ...issue, state: "in progress" };
        let newInProgress = [...inProgressIssues];
        newInProgress.splice(index, 0, updatedIssue);
        setInProgressIssues(newInProgress);
        break;
      case "3": // DONE
        updatedIssue = { ...issue, state: "done" };
        let newDoneIssues = [...doneIssues];
        newDoneIssues.splice(index, 0, updatedIssue);
        setDoneIssues(newDoneIssues);
        break;
    }
  }

  function findItemById(id: number, array: Issue[]) {
    return array.find((issue) => issue.number == id);
  }

  function removeItemById(id: number, array: Issue[]) {
    return array.filter((issue) => issue.number != id);
  }
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
