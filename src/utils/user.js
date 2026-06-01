export const getUserInitial = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return "?";

    const name = user.name || user.username || user.email;
    return name.charAt(0).toUpperCase();
  } catch {
    return "?";
  }
};
