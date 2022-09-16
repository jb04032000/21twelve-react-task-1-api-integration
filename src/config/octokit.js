import { Octokit } from "@octokit/rest";
export const octokit = new Octokit({
  auth: "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",
  // auth: process.env.REACT_APP_GH,
});
