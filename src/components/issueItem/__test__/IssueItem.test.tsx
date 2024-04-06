import { render, screen } from "@testing-library/react";
import { IssueItem } from "..";
import { Issue } from "../../../utils/types";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const testIssue: Issue = {
  comments: 3,
  created_at: "2024-04-05T21:22:20Z",
  number: 13,
  state: "open",
  title: "Right title",
  user: {
    html_url: "https://github.com/right_user",
    login: "right_user",
  },
};

const MockIssue = ({
  index,
  issue,
  id,
}: {
  index: number;
  issue: Issue;
  id: string;
}) => {
  return (
    <DragDropContext onDragEnd={() => {}}>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <IssueItem index={index} issue={issue} />

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

describe("Issue item", () => {
  test("Renders issue's title", () => {
    render(<MockIssue index={0} issue={testIssue} id="1" />);

    const issueTitle = screen.getByTestId("issueTitle");
    expect(issueTitle).toHaveTextContent(/right title/i);
  });

  test("Renders issue's number (id)", () => {
    render(<MockIssue index={0} issue={testIssue} id="1" />);

    const issueNumber = screen.getByText(/#13/i);
    expect(issueNumber).toBeInTheDocument();
  });

  test("Renders login of the user who opened the issue", () => {
    render(<MockIssue index={0} issue={testIssue} id="1" />);

    const issueUserLogin = screen.getByText(/right_user/i);
    expect(issueUserLogin).toBeInTheDocument();
  });

  test("Renders coments count for the issue", () => {
    render(<MockIssue index={0} issue={testIssue} id="1" />);

    const issueComments = screen.getByText(/comments: 3/i);
    expect(issueComments).toBeInTheDocument();
  });
});
