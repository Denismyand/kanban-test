import { useState } from "react";
import "./App.css";
import { validateGhLink } from "./utils/validateGhLink";
import { Flex, Button, Input } from "antd";
import { Issues } from "./modules/issues";
import { Issue } from "./utils/types";

function App() {
  const [ghLink, setGhLink] = useState("");

  const [repoOwner, setRepoOwner] = useState<string | null>(null);
  const [repoName, setRepoName] = useState<string | null>(null);

  const [shownIssues, setShownIssues] = useState<Issue[]>([]);

  const handleClick = () => {
    const valResult = validateGhLink(ghLink);
    if (!valResult) {
      return;
    }
    requestReposIssues(valResult.owner, valResult.repo);
  };

  const requestReposIssues = (owner: string, repo: string) => {
    fetch(`https://api.github.com/repos/${owner + "/" + repo}/issues`)
      .then((resp) => resp.json())
      .then((data) => {
        setRepoOwner(owner);
        setRepoName(repo);
        setShownIssues(data);
        const obj: any = Object;
        console.log(
          obj.groupBy(data, ({ state }: { state: boolean }) => state)
        );
      })
      .catch((error) => {
        setRepoOwner(null);
        setRepoName(null);
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
      <Issues shownIssues={shownIssues} />
    </Flex>
  );
}

export default App;
