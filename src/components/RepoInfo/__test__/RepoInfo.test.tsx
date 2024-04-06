import { render, screen } from "@testing-library/react";
import { RepoInfo } from "..";

describe("Repo Info", () => {
  describe("Has repo info", () => {
    test("Renders two links (repo owner and repo itself)", () => {
      render(<RepoInfo repoOwner={"facebook"} repoName={"react"} />);

      const links = screen.getAllByRole("link");
      expect(links.length).toBe(2);
    });

    test("Renders link to repo owner", () => {
      render(<RepoInfo repoOwner={"facebook"} repoName={"react"} />);

      const repoOwner = screen.getByRole("link", { name: /facebook/i });
      expect(repoOwner).toBeInTheDocument();
    });

    test("Renders repository link", () => {
      render(<RepoInfo repoOwner={"facebook"} repoName={"react"} />);

      const repoName = screen.getByRole("link", { name: /react/i });
      expect(repoName).toBeInTheDocument();
    });
  });

  describe("Doesn't have repo info", () => {
    test("Renders that no issues are loaded", () => {
      render(<RepoInfo repoOwner={null} repoName={null} />);

      const noLoaded = screen.getByText(/No issues loaded/i);
      expect(noLoaded).toBeInTheDocument();
    });
  });
});
