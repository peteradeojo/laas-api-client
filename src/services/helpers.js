export const getAuthToken = () => localStorage.getItem("authToken");

export const prepareHeaders = (headers) => {
  const token = getAuthToken();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  headers.set("Content-type", "application/json");
  headers.set("Accept", "application/json");
  return headers;
};
