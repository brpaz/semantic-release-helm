export default interface PlguinConfig {
  chartPath: string;
  chartRepository: GitHubPagesRepository;
}

interface GitHubPagesRepository {
  url: string;
  repository?: string;
  branch?: string;
}
