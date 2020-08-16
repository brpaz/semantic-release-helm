import PluginConfig from "../config";
import { Context } from "semantic-release";
import execa from "execa";
import fs from "fs-extra";
import path from "path";
import fetch from "node-fetch";

import SemanticReleaseError from "@semantic-release/error";
import { CHART_PACKAGE_DIR } from "../constatns";

const INDEX_FILE_PATH = path.join(CHART_PACKAGE_DIR, "index.yaml");

const packageChart = async (
  chartPath: string,
  context: Context
): Promise<void> => {
  context.logger.log(`Packaging Chart`);

  if (fs.pathExistsSync(CHART_PACKAGE_DIR)) {
    fs.rmdirSync(CHART_PACKAGE_DIR, { recursive: true });
  }

  await fs.mkdir(CHART_PACKAGE_DIR);

  const chartVersion = context.nextRelease.version;
  const appVersion = process.env.APP_VERSION || chartVersion;

  try {
    await execa("helm", [
      "package",
      chartPath,
      "--version",
      chartVersion,
      "--app-version",
      appVersion,
      "--destination",
      CHART_PACKAGE_DIR
    ]);
  } catch (error) {
    throw new SemanticReleaseError(
      "Error while packaging helm chart",
      "HELM_PACKAGE_ERROR",
      error.message
    );
  }
};

const fetchCurrentIndexFile = async (
  config: PluginConfig,
  context: Context
): Promise<void> => {
  context.logger.log(
    `Fetching current index file from repository ${config.chartRepository.url}`
  );
  const indexFilePath = `${config.chartRepository.url}/index.yaml`;

  const res = await fetch(indexFilePath);

  if (res.status === 200) {
    const dest = fs.createWriteStream(INDEX_FILE_PATH);
    res.body.pipe(dest);
    return;
  }

  if (res.status === 404) {
    context.logger.log(`No index file found in ${config.chartRepository.url}`);
    return;
  }

  throw new SemanticReleaseError(
    `Error downloading index file from repository. ${res.status} - ${res.statusText}`
  );
};

const updateIndexFile = async (
  config: PluginConfig,
  context: Context
): Promise<void> => {
  context.logger.log(`Updating index file with new Chart version`);

  try {
    await execa("helm", [
      "repo",
      "index",
      CHART_PACKAGE_DIR,
      "--url",
      config.chartRepository.url,
      "--merge",
      INDEX_FILE_PATH
    ]);
  } catch (error) {
    throw new SemanticReleaseError(
      "Error while packaging helm chart",
      "HELM_PACKAGE_ERROR",
      error.message
    );
  }
};
async function prepare(
  pluginConfig: PluginConfig,
  context: Context
): Promise<void> {
  await packageChart(pluginConfig.chartPath, context);
  await fetchCurrentIndexFile(pluginConfig, context);
  await updateIndexFile(pluginConfig, context);
}

export default prepare;
