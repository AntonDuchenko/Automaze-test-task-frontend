export const chooseTitle = (priority: number) => {
  if (priority === 1) {
    return "Low";
  } else if (priority === 2) {
    return "Medium";
  } else {
    return "High";
  }
};
