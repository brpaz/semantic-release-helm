import PluginConfig from "../config";
import { Context } from "semantic-release";
import SemanticReleaseError from "@semantic-release/error";
import { CHART_PACKAGE_DIR } from "../constatns";
import * as ghpages from "gh-pages";

const DEFAULT_BRANCH = "gh-pages";

const publishToGithubPages = (
  branch: string,
  version: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    ghpages.publish(
      CHART_PACKAGE_DIR,
      {
        branch: branch,
        message: `Chart release: ${version}`,
        add: true
      },
      err => {
        if (err !== undefined) {
          reject(err);
        }

        resolve();
      }
    );
  });
};

async function publish(
  pluginConfig: PluginConfig,
  context: Context
): Promise<void> {
  try {
    await publishToGithubPages(
      pluginConfig.chartRepository.branch || DEFAULT_BRANCH,
      context.nextRelease.version
    );
  } catch (error) {
    throw new SemanticReleaseError(
      "Error publishing to GitHub Pages",
      "PUBLISH_ERROR",
      error.message
    );
  }
}

export default publish;
