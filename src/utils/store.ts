import { create } from "zustand";
import { Issue } from "./types";

type IssuesStore = {
  todoIssues: Issue[];
  inProgressIssues: Issue[];
  doneIssues: Issue[];
  repoOwner: null | string;
  repoName: null | string;
  stars: null | number;
  setTodoIssues: (issues: Issue[]) => void;
  setInProgressIssues: (issues: Issue[]) => void;
  setDoneIssues: (issues: Issue[]) => void;
  setRepo: (owner: null | string, repo: null | string) => void;
  resetRepo: () => void;
  updateStoredRepo: () => void;
  setStars: (stars: number) => void;
};

export const useIssuesStore = create<IssuesStore>((set) => ({
  todoIssues: [],
  inProgressIssues: [],
  doneIssues: [],
  repoOwner: null,
  repoName: null,
  stars: null,
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
  resetRepo: () => {
    set(() => ({
      todoIssues: [],
      inProgressIssues: [],
      doneIssues: [],
      repoOwner: null,
      repoName: null,
    }));
  },
  updateStoredRepo: () => {
    set((state) => {
      saveIssues(
        `${state.repoOwner}/${state.repoName}`,
        [...state.todoIssues, ...state.inProgressIssues, ...state.doneIssues],
        state.stars
      );
      return state;
    });
  },
  setStars: (stars) => {
    set(() => ({ stars: stars }));
  },
}));

const saveIssues = (key: string, issues: Issue[], stars: null | number) =>
  window.localStorage.setItem(key, JSON.stringify({ stars, issues }));
