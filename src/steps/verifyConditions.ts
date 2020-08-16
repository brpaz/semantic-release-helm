import PluginConfig from "../config";
import { Context } from "semantic-release";
import execa from "execa";
import SemanticReleaseError from "@semantic-release/error";

import * as fs from "fs-extra";
import * as path from "path";

const checkIsChartDir = async (
  chartPath: string,
  context: Context
): Promise<void> => {
  context.logger.log("Checking Charts directory");
  const pkgRoot = path.resolve(chartPath);

  const pathExists = await fs.pathExists(path.join(pkgRoot, "Chart.yaml"));

  if (!pathExists) {
    throw new SemanticReleaseError(
      "Cannot find Chart.yaml in Charts directory",
      "MISSING_CHART"
    );
  }
};

const checkHelmIsInstalled = async (context: Context): Promise<void> => {
  context.logger.log("Check that Helm is installed");
  try {
    await execa("which", ["helm"]);
  } catch (error) {
    throw new SemanticReleaseError(
      "Helm executable not found in the system",
      "HELM_NOT_FOUND"
    );
  }
};

async function verifyConditions(
  pluginConfig: PluginConfig,
  context: Context
): Promise<void> {
  await checkIsChartDir(pluginConfig.chartPath, context);

  await checkHelmIsInstalled(context);
}

export default verifyConditions;
