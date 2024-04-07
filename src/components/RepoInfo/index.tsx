import { Flex } from "antd";
import { useIssuesStore } from "../../utils/store";
import StarIcon from "../../assets/star.png";
import styles from "./index.module.css";

type RepoInfoProps = {
  repoOwner: null | string;
  repoName: null | string;
};
export const RepoInfo = ({ repoOwner, repoName }: RepoInfoProps) => {
  const stars = useIssuesStore((state) => state.stars);

  const roundUpStars = () => {
    if (!stars) {
      return "No information about";
    }
    if (stars < 1000) {
      return `${stars}`;
    }

    const digits = stars.toString().split("");

    const formattedNumber = digits.slice(0, -3).join("") + " K";
    return `${formattedNumber}`;
  };

  if (!repoName || !repoOwner)
    return <p className={styles.repoInfo}>No issues loaded</p>;

  return (
    <Flex gap={5} className={styles.repoInfo}>
      <a href={`https://github.com/${repoOwner}`}>{repoOwner}</a>
      {"/"}
      <a href={`https://github.com/${repoOwner}/${repoName}`}>{repoName}</a>
      {stars && <img src={StarIcon} alt="" className={styles.starIcon} />}
      <p>{`${roundUpStars()} stars`}</p>
    </Flex>
  );
};
