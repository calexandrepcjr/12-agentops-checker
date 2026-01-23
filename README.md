# 12-Factor AgentOps Checker

A CLI tool and MCP Server to assess Agentic Systems against the 12-Factor AgentOps methodology.

## Features

- **Analyze**: Detect agents, configurations, and patterns in your codebase.
- **Assess**: Grade your system against 12 key factors (Automated Tracking, Context Loading, Focused Agents, etc.).
- **Scaffold**: Generate missing structure (CLAUDE.md, .agentops/, agents/).
- **Lint**: Fail CI pipelines if critical factors are missing.
- **MCP Server**: Expose these capabilities to Claude Desktop or other MCP clients.

## Installation

```bash
npm install -g @anthropic-tools/12-agentops-checker
```

Or run directly:

```bash
npx @anthropic-tools/12-agentops-checker assess .
```

## Usage

### CLI

```bash
# Analyze codebase structure
agentops-check analyze ./my-agent-repo

# Assess against 12 factors
agentops-check assess ./my-agent-repo

# Generate scaffold files
agentops-check scaffold ./my-agent-repo --apply

# Lint (for CI)
agentops-check lint ./my-agent-repo
```

### MCP Server

Configure your MCP client to use the server:

```json
{
  "mcpServers": {
    "agentops": {
      "command": "npx",
      "args": ["-y", "@anthropic-tools/12-agentops-checker", "mcp"] 
      // Note: currently the package exports cli by default. 
      // If installing globally, use `agentops-check-mcp` if exposed, or run the server script.
      // For local dev:
      "command": "node",
      "args": ["/path/to/repo/dist/mcp/index.js"]
    }
  }
}
```

## 12 Factors

1. **Automated Tracking**: Git usage, structured commits.
2. **Context Loading**: Explicit context limits configuration.
3. **Focused Agents**: Agents have single responsibilities.
4. **Continuous Validation**: Tests and CI/CD gates.
5. **Measure Everything**: Telemetry and detailed logging.
6. **Resume Work**: State persistence.
7. **Smart Routing**: Router pattern for multi-agent systems.
8. **Human Validation**: Approval safeguards.
9. **Mine Patterns**: Extract reusable patterns.
10. **Small Iterations**: Feature flags and versioning.
11. **Fail-Safe Checks**: Circuit breakers.
12. **Package Patterns**: Code is packageable.

## Development

```bash
npm install
npm run build
npm run test
```
