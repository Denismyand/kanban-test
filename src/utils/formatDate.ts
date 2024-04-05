export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const currentDate = new Date();
  const differenceInMilliseconds = currentDate.getTime() - date.getTime();
  const differenceInDays = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60 * 24)
  );

  if (differenceInDays === 0) {
    return "opened today";
  } else if (differenceInDays === 1) {
    return "opened yesterday";
  } else {
    return `opened ${differenceInDays} days ago`;
  }
}
