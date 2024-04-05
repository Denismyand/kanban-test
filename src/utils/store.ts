import { create } from "zustand";
import { Issue } from "./types";

type IssuesStore = {
  todoIssues: Issue[];
  inProgressIssues: Issue[];
  doneIssues: Issue[];
  repoOwner: null | string;
  repoName: null | string;
  setTodoIssues: (issues: Issue[]) => void;
  setInProgressIssues: (issues: Issue[]) => void;
  setDoneIssues: (issues: Issue[]) => void;
  setRepo: (owner: null | string, repo: null | string) => void;
  updateStoredRepo: () => void;
};

export const useIssuesStore = create<IssuesStore>((set) => ({
  todoIssues: [],
  inProgressIssues: [],
  doneIssues: [],
  repoOwner: null,
  repoName: null,
  setTodoIssues: (newTodoIssues) => {
    set(() => ({ todoIssues: newTodoIssues }));
  },
  setInProgressIssues: (newInProgressIssues) => {
    set(() => ({ inProgressIssues: newInProgressIssues }));
  },
  setDoneIssues: (newDoneIssues) => {
    set(() => ({ doneIssues: newDoneIssues }));
  },
  setRepo: (owner, repo) => {
    set(() => ({ repoOwner: owner, repoName: repo }));
  },
  updateStoredRepo: () => {
    set((state) => {
      saveIssues(`${state.repoOwner}/${state.repoName}`, [
        ...state.todoIssues,
        ...state.inProgressIssues,
        ...state.doneIssues,
      ]);
      return state;
    });
  },
}));

const saveIssues = (key: string, issues: Issue[]) =>
  window.localStorage.setItem(key, JSON.stringify(issues));
