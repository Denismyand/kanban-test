import { useState } from "react";
import "./App.css";
import { validateGhLink } from "./utils/validateGhLink";

function App() {
  const [ghLink, setGhLink] = useState("");

  const [repoOwner, setRepoOwner] = useState<string | null>(null);
  const [repoName, setRepoName] = useState<string | null>(null);

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
        console.log(data);
      })
      .catch((error) => {
        setRepoOwner(null);
        setRepoName(null);
      });
  };

  return (
    <div className="App">
      <input
        placeholder="Enter repo URL"
        value={ghLink}
        onChange={(e) => {
          setGhLink(e.target.value);
        }}
      />
      <button onClick={handleClick}>Load issues</button>
      {repoName && repoOwner && (
        <div>
          <a href={`https://github.com/${repoOwner}`}>{repoOwner}</a>
          {" > "}
          <a href={`https://github.com/${repoOwner}/${repoName}`}>{repoName}</a>
        </div>
      )}
    </div>
  );
}

export default App;
