import { Octokit } from "@octokit/rest";
export const octokit = new Octokit({
  auth: "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",
  // auth: process.env.REACT_APP_GH,
});
