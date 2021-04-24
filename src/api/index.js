import axios from "axios";

export const createFile = (data) => {
  const request = axios.create({
    headers: {
      Accept: "application/json",
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
  return request.post("/files", data);
};
