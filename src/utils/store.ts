import { create } from "zustand";
import { Issue } from "./types";

type IssuesStore = {
  todoIssues: Issue[];
  inProgressIssues: Issue[];
  doneIssues: Issue[];
  setTodoIssues: (issues: Issue[]) => void;
  setInProgressIssues: (issues: Issue[]) => void;
  setDoneIssues: (issues: Issue[]) => void;
};

type RepoStore = {
  repoOwner: null | string;
  repoName: null | string;
  setRepo: (owner: null | string, repo: null | string) => void;
};

export const useIssuesStore = create<IssuesStore>((set) => ({
  todoIssues: [],
  inProgressIssues: [],
  doneIssues: [],
  setTodoIssues: (newTodoIssues) => {
    set(() => ({ todoIssues: newTodoIssues }));
  },
  setInProgressIssues: (newInProgressIssues) => {
    set(() => ({ inProgressIssues: newInProgressIssues }));
  },
  setDoneIssues: (newDoneIssues) => {
    set(() => ({ doneIssues: newDoneIssues }));
  },
}));

export const useRepo = create<RepoStore>((set) => ({
  repoOwner: null,
  repoName: null,
  setRepo: (owner, repo) => {
    set(() => ({ repoOwner: owner, repoName: repo }));
  },
}));
