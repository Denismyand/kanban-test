import { Flex } from "antd";

type RepoInfoProps = {
  repoOwner: null | string;
  repoName: null | string;
};
export const RepoInfo = ({ repoOwner, repoName }: RepoInfoProps) => {
  if (!repoName || !repoOwner) return <p>No issues loaded</p>;
  return (
    <Flex gap={5}>
      <a href={`https://github.com/${repoOwner}`}>{repoOwner}</a>
      {"/"}
      <a href={`https://github.com/${repoOwner}/${repoName}`}>{repoName}</a>
    </Flex>
  );
};
