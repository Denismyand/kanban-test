export function validateGhLink(link: string) {
  const pattern = /github\.com\/([-\w]+)\/([-\w]+)/;
  const match = link.match(pattern);
  if (match) {
    return {
      owner: match[1],
      repo: match[2],
    };
  } else {
    return null;
  }
}
