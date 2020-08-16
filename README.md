# semantic-release-helm

> [Semantic Release](https://github.com/semantic-release/semantic-release) plugin for Publishing [Helm](https://helm.sh/) packages.

[![npm](https://img.shields.io/npm/v/@brpaz/semantic-release-helm.svg?style=for-the-badge)](https://www.npmjs.org/brpaz/semantic-release-helm)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Introduction

This plugins allows to publish Helm charts using Semantic Release. For now the only backend available is GitHub Pages. PRs welcome for support for more backends  like [Chart Museum](https://github.com/helm/chartmuseum).

## Pre-Requisites

Before starting creating releases, you must create a new branch in your Chart repository and enable github pages for that branch.

You also need to initialize a Helm Repo by commiting an index.yaml to the that branch.

You can generate an empty index.yaml file using helm:

```sh
helm repo index . --url <github_pages_url>
```

### Usage

You can see an example repo, demonstrating this plugin in action [here](https://github.com/brpaz/helm-semantic-release-demo).

For integration with your chart, create a `.releaserc` file in the root of your repository with the plugin defined:

```json
{
  "plugins": [
    "@semantic-release/commit-analyzer",
    [
        "@brpaz/semantic-release-helm",
        {
          "chartPath": ".",
          "chartRepository": {
            "branch": "gh-pages",
            "url": "<gh_pages_url>"
          }
        }
      ]
  ]
  ```

The following plugin options are supported:

* **chartPath**: Required - Indicates the path to your the root of your Chart. (It should point to the directory containing the Chart.yaml file)
* **chartRepository.branch**:  Indicates the branch where the repository will be published. Defaults to **gh-pages**
* * **chartRepository.url**:  The public url of the GitHub Pages.

For more information, please see Semantic Release [documentation](https://semantic-release.gitbook.io/semantic-release/extending/plugins-list)

## Author

👤 **Bruno Paz**

* Website: [brunopaz.dev](https://brunopaz.dev)
* Github: [@brpaz](https://github.com/brpaz)
* Twitter: [@brunopaz88](https://twitter.com/brunopaz88)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

## Show your support

If this project have been useful for you, I would be grateful to have your support.

Give a ⭐️ to the project, or just:

<a href="https://www.buymeacoffee.com/Z1Bu6asGV" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>

## 📝 License

Copyright © 2020 [Bruno Paz](https://github.com/brpaz).

This project is [MIT](https://opensource.org/licenses/MIT) licensed.

