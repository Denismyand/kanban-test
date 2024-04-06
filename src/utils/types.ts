interface UserInfo {
  login: string;
  html_url: string;
}
export type IssueState = "open" | "in progress" | "done";
export interface Issue {
  title: string;
  number: number;
  created_at: string;
  comments: number;
  user: UserInfo;
  state: IssueState;
}
