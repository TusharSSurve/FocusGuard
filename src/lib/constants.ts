export const validateAndGetHostname = (url: string) => {
  try {
    const u = new URL(url);
    return u.hostname;
  } catch {
    return null;
  }
};