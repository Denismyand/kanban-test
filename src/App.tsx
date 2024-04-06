import { useState } from "react";
import "./App.css";
import { validateGhLink } from "./utils/validateGhLink";
import { Flex, Button, Input } from "antd";
import { Issues } from "./components/Issues";
import { Issue } from "./utils/types";
import { useIssuesStore } from "./utils/store";
import { RepoInfo } from "./components/RepoInfo";

const App = () => {
  const [ghLink, setGhLink] = useState("");

  const repoOwner = useIssuesStore((state) => state.repoOwner);
  const repoName = useIssuesStore((state) => state.repoName);

  const setRepo = useIssuesStore((state) => state.setRepo);
  const resetRepo = useIssuesStore((state) => state.resetRepo);

  const updateStoredRepo = useIssuesStore((state) => state.updateStoredRepo);

  const setTodoIssues = useIssuesStore((state) => state.setTodoIssues);
  const setInProgressIssues = useIssuesStore(
    (state) => state.setInProgressIssues
  );
  const setDoneIssues = useIssuesStore((state) => state.setDoneIssues);

  const handleEnterLink = () => {
    const valResult = validateGhLink(ghLink);
    if (!valResult) {
      resetRepo();
      return;
    }
    requestReposIssues(valResult.owner, valResult.repo);
  };

  const splitIssues = (issues: Issue[]) => {
    const todoIssues = issues.filter((issue) => issue.state === "open");
    const inProgressIssues = issues.filter(
      (issue) => issue.state === "in progress"
    );
    const doneIssues = issues.filter((issue) => issue.state === "done");

    setTodoIssues(todoIssues);
    setInProgressIssues(inProgressIssues);
    setDoneIssues(doneIssues);
  };

  const requestReposIssues = (owner: string, repo: string) => {
    const key = `${owner}/${repo}`;
    const storedIssues = localStorage.getItem(key);
    if (storedIssues) {
      setGhLink("");
      setRepo(owner, repo);
      splitIssues(JSON.parse(storedIssues));
      return;
    }

    fetch(`https://api.github.com/repos/${owner + "/" + repo}/issues`)
      .then((resp) => resp.json())
      .then((data) => {
        if (!data.message) {
          setGhLink("");
        }
        setRepo(owner, repo);
        splitIssues(data);
        updateStoredRepo();
      })
      .catch((error) => {
        resetRepo();
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
          onPressEnter={handleEnterLink}
        />
        <Button onClick={handleEnterLink}>Load issues</Button>
      </Flex>
      <RepoInfo repoOwner={repoOwner} repoName={repoName} />
      <Issues />
    </Flex>
  );
};

export default App;
