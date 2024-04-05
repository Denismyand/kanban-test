import { useState } from "react";
import "./App.css";
import { validateGhLink } from "./utils/validateGhLink";
import { Flex, Button, Input } from "antd";
import { Issues } from "./components/issues";
import { Issue } from "./utils/types";
import { useIssuesStore, useRepo } from "./utils/store";

function App() {
  const [ghLink, setGhLink] = useState("");

  const repoOwner = useRepo((state) => state.repoOwner);
  const repoName = useRepo((state) => state.repoName);

  const setRepo = useRepo((state) => state.setRepo);

  const setTodoIssues = useIssuesStore((state) => state.setTodoIssues);
  const setInProgressIssues = useIssuesStore(
    (state) => state.setInProgressIssues
  );
  const setDoneIssues = useIssuesStore((state) => state.setDoneIssues);

  const handleClick = () => {
    const valResult = validateGhLink(ghLink);
    if (!valResult) {
      return;
    }
    requestReposIssues(valResult.owner, valResult.repo);
  };

  function splitIssues(issues: Issue[]) {
    const todoIssues = issues.filter((issue) => issue.state === "open");
    const inProgressIssues = issues.filter(
      (issue) => issue.state === "in progress"
    );
    const doneIssues = issues.filter((issue) => issue.state === "done");

    setTodoIssues(todoIssues);
    setInProgressIssues(inProgressIssues);
    setDoneIssues(doneIssues);
  }

  const requestReposIssues = (owner: string, repo: string) => {
    const key = `${owner}/${repo}`;
    const storedIssues = localStorage.getItem(key);
    if (storedIssues) {
      setRepo(owner, repo);
      splitIssues(JSON.parse(storedIssues));
      return;
    }

    fetch(`https://api.github.com/repos/${owner + "/" + repo}/issues`)
      .then((resp) => resp.json())
      .then((data) => {
        setRepo(owner, repo);

        splitIssues(data);
        localStorage.setItem(key, JSON.stringify(data));
      })
      .catch((error) => {
        setRepo(null, null);
      });
  };

  return (
    <Flex gap={"middle"} vertical className={"app"}>
      <Flex gap={"middle"}>
        <Input
          placeholder="Enter repo URL"
          value={ghLink}
          onChange={(e) => {
            setGhLink(e.target.value);
          }}
        />
        <Button onClick={handleClick}>Load issues</Button>
      </Flex>
      {repoName && repoOwner ? (
        <Flex gap={5}>
          <a href={`https://github.com/${repoOwner}`}>{repoOwner}</a>
          {"/"}
          <a href={`https://github.com/${repoOwner}/${repoName}`}>{repoName}</a>
        </Flex>
      ) : (
        <p>No issues loaded</p>
      )}
      <Issues />
    </Flex>
  );
}

export default App;
