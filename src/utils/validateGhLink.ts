export const validateGhLink = (link: string) => {
  const pattern = /github\.com\/([-\w]+)\/([-\w]+)/;
  const match = link.match(pattern);
  if (!match) return;
  return {
    owner: match[1],
    repo: match[2],
  };
};
