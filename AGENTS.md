# AGENTS.md

This file provides guidance to coding agents when working with code in this repository.

## What This Is

A collection of small Slack apps built with Bolt for JavaScript, each showing one feature. Each example lives in its own folder with its own `package.json`.

## Slack Plugin

To install the Slack plugin for your coding agent, follow [Claude Code, Codex, Cursor, and Other Coding Agents](./README.md#claude-code-codex-cursor-and-other-coding-agents) in the README.

## Before you finish

Run `npm run lint`, `npm run check`, and `npm test` inside the example you changed, where it defines them. CI runs the same on every PR.

## Code Style

- No code comments. Make the code explain itself with clear names, tests, or types. Put the reason for a change in the PR description.
