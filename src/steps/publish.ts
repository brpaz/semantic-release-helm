import PluginConfig from "../config";
import { Context } from "semantic-release";
import SemanticReleaseError from "@semantic-release/error";
import { CHART_PACKAGE_DIR } from "../constatns";
import * as ghpages from "gh-pages";

const DEFAULT_BRANCH = "gh-pages";

const publishToGithubPages = (
  config: PluginConfig,
  context: Context
): Promise<void> => {
  const publishOpts = {
    branch: config.chartRepository.branch || DEFAULT_BRANCH,
    message: `Chart release: ${context.nextRelease.version}`,
    add: true
  } as ghpages.PublishOptions;

  if (config.chartRepository.repository) {
    let repo = `https://github.com/${config.chartRepository.repository}.git`;

    if (context.env.GITHUB_ACTOR && context.env.GITHUB_TOKEN) {
      repo = `https://${context.env.GITHUB_ACTOR}:${context.env.GITHUB_TOKEN}@github.com/${config.chartRepository.repository}.git`;
    }
    publishOpts.repo = repo;
  }

  return new Promise((resolve, reject) => {
    ghpages.publish(CHART_PACKAGE_DIR, publishOpts, err => {
      if (err !== undefined) {
        console.log(err);
        reject(err);
      }

      resolve();
    });
  });
};

async function publish(
  pluginConfig: PluginConfig,
  context: Context
): Promise<void> {
  try {
    await publishToGithubPages(pluginConfig, context);
  } catch (error) {
    throw new SemanticReleaseError(
      "Error publishing to GitHub Pages",
      "PUBLISH_ERROR",
      error.message
    );
  }
}

export default publish;
