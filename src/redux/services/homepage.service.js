import { octokit } from "../../config/octokit";

// get user list
export async function getUsersList(payload) {
  const url =
    payload && typeof payload === "object"
      ? `GET /users?since=${Number(payload.since)}&per_page=10`
      : `GET /users/${payload}`;

  return await octokit
    .request(url)
    .then((response) => {
      if (response.status === 200) {
        return {
          message: "Success",
          success: true,
          data: response.data,
        };
      } else {
        return {
          success: false,
          data: "",
          error: "",
        };
      }
    })
    .catch((err) => console.log(err));
}
