declare module "@semantic-release/error" {
  export default class SemanticReleaseError extends Error {
    public code?: string;
    public details?: string;
    constructor(message?: string, code?: string, details?: string);
  }
}
