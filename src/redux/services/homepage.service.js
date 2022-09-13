import { octokit } from "../../config/octokit";

// get user list
export async function getUsersList(payload) {
  const url = payload ? `GET /users/${payload}` : "GET /users";
  const params = payload ? {} : { per_page: 100 };

  return await octokit
    .request(url, params)
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
