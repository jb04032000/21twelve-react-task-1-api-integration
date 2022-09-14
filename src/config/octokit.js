import { Octokit } from "@octokit/rest";
export const octokit = new Octokit({
  auth: "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",
  // auth: process.env.REACT_APP_GH,
});
