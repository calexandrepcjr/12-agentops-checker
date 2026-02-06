# 12-Factor AgentOps Checker

A universal CLI tool and MCP Server designed to assess, scaffold, and validate Agentic Systems against the **[12-Factor AgentOps](https://www.12factoragentops.com/)** methodology.

> **Inspiration**: This project is directly inspired by the 12-Factor AgentOps methodology, a set of best practices for building reliable, scalable, and maintainable AI agent systems.

## Purpose

As AI agents move from prototypes to production, they require the same rigorous operational discipline as traditional software. This tool provides an automated way to:

1.  **Assess** compliance with operational best practices.
2.  **Scaffold** missing infrastructure (configs, docs, structure).
3.  **Validate** agent systems in CI/CD pipelines.
4.  **Expose** these capabilities directly to your IDE or Claude Desktop via MCP.

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

Or run directly with `npx`:

```bash
npx @anthropic-tools/12-agentops-checker assess .
```

## Quick Start (CLI)

Assess your current directory:

```bash
agentops-check assess .
```

Generate missing configuration and structure:

```bash
# Dry run to see what would be created
agentops-check scaffold .

# Apply changes
agentops-check scaffold . --apply
```

## MCP Configuration (Claude Desktop)

To use these tools directly within Claude Desktop, update your configuration file:

**MacOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

Add the following configuration:

```json
{
  "mcpServers": {
    "agentops": {
      "command": "npx",
      "args": [
        "-y",
        "@anthropic-tools/12-agentops-checker",
        "mcp"
      ]
    }
  }
}
```

*Note: Requires node >= 18 installed.*

## Recommended Agentic Harness Mechanisms

Beyond raw model quality, these harness mechanisms usually produce the biggest gains:

- **Self-verification loops**: run tests after code changes and require green checks before task completion.
- **Tool-augmented context retrieval**: integrate web search, documentation lookup, and PDF parsing for up-to-date context.
- **Critique-and-revise passes**: allow a bounded refinement loop before finalizing outputs.
- **Human approvals for critical actions**: require validation for deploy/delete or high-impact tool calls.
- **Pattern capture**: store successful tool/agent chains as reusable recipes.

This repository now scaffolds these defaults in `.agentops.config.json` and scores several of them during assessment.

## The 12 Factors

We validate against these core principles:

1.  **Automated Tracking**: Is everything (code, prompts, configs) tracked in git?
2.  **Context Loading**: Is context usage measured and explicit limits defined?
3.  **Focused Agents**: Do agents have single, well-defined responsibilities?
4.  **Continuous Validation**: Are there automated tests and CI gates?
5.  **Measure Everything**: Is telemetry and logging enabled?
6.  **Resume Work**: Can agents resume tasks after interruption (persistence)?
7.  **Smart Routing**: Is there a router for delegating tasks?
8.  **Human Validation**: Are there approval steps for critical actions?
9.  **Mine Patterns**: Are successful patterns extracted and reused?
10. **Small Iterations**: Are feature flags or versioning strategies in place?
11. **Fail-Safe Checks**: Are there circuit breakers for LLM calls?
12. **Package Patterns**: Is the system packageable for reuse?

## Development / Contributing

1.  Clone the repository:
    ```bash
    git clone https://github.com/calexandrepcjr/12-agentops-checker.git
    cd 12-agentops-checker
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Build and link locally:
    ```bash
    npm run build
    npm link
    ```

4.  Run tests:
    ```bash
    npm test
    ```

## CLI Reference

```bash
# Analyze codebase structure
agentops-check analyze <path>

# Assess compliance (returns grade A-F)
agentops-check assess <path>

# Scaffold AgentOps structure
agentops-check scaffold <path> [--apply]

# Lint for CI (exit code 1 on failure)
agentops-check lint <path>
```
