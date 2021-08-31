import axios from "axios";

export const createFile = (data) => {
  const request = axios.create({
    headers: {
      Accept: "application/json",
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
  return request.post(
    `${
      process.env.NODE_ENV === "production" ? "" : "http://localhost:8087"
    }/files`,
    data
  );
};
