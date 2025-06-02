# vils

Recursively outputs file paths and contents in various formats.

## Description

`vils` is a command-line tool designed for developers to recursively output file paths and their contents in various formats. It supports multiple output formats, including Markdown, HTML, JSON, plain text, and tree structure, making it versatile for different documentation and analysis needs.

## Features

- **Multiple Output Formats**: Supports Markdown, HTML, JSON, plain text, and tree structure formats.
- **Customizable Ignore Patterns**: Allows users to specify patterns for ignoring certain files or directories.
- **Configurable**: Supports configuration through command-line arguments or configuration files.
- **Interactive Confirmation**: Provides an option to confirm before writing output to a file.
- **Logging**: Option to log output to the console for quick review.

## Installation

To use `vils`, ensure you have Node.js installed (Node 20 recommended, minimum Node 12). You can run `vils` directly using `npx`, which will install the package automatically:

```sh
npx vils [source] [options]
```

Alternatively, you can install `vils` globally using npm:

```sh
npm install -g vils
```

## Usage

### Basic Usage

To output the contents of a directory in Markdown format:

```sh
npx vils [source] [options]
```

### Options

| Option | Description | Example |
|--------|-------------|---------|
| `-l, --log` | Log to console | `npx vils --log` |
| `-f, --file` | Output file | `npx vils -f output.md` |
| `-c, --config` | Config file path | `npx vils -c ./vils.config.js` |
| `-i, --ignore` | Ignore patterns | `npx vils -i "node_modules" -i "dist"` |
| `-F, --format` | Format (md, html, tree, json, plain) | `npx vils -F html` |
| `-y` | Assume yes for confirmations | `npx vils -y` |
| `--info` | Show info without executing | `npx vils --info` |
| `-h, --help` | Show help | `npx vils -h` |

### Format Types

| Format | Description |
|--------|-------------|
| `md` | Outputs the file structure and contents in Markdown format. |
| `html` | Outputs the file structure and contents in HTML format. |
| `tree` | Displays the file structure in a tree format. |
| `json` | Outputs the file structure and contents in JSON format. |
| `plain` | Outputs the file structure and contents in plain text format. |

### Examples

1. **Output directory contents to a Markdown file:**

   ```sh
   npx vils -f output.md
   ```

2. **Output directory contents to the console in tree format:**

   ```sh
   npx vils -F tree --log
   ```

3. **Output directory contents to an HTML file, ignoring specific directories:**

   ```sh
   npx vils -F html -f output.html -i "node_modules" -i "dist"
   ```

4. **Show information about the directory structure without executing the output:**

   ```sh
   npx vils --info
   ```

5. **Assume yes for all confirmations and output to a JSON file:**

   ```sh
   npx vils -F json -f output.json -y
   ```

## Use Cases

- **Project Documentation**: Generate comprehensive documentation of a project's file structure and contents.
- **AI Integration**: Easily send the full content of a project to an AI for analysis or assistance.
- **Backup and Review**: Create a single file output for backup purposes or code review.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes. For major changes, please open an issue first to discuss what you would like to change.

To report bugs, please open an issue on the [GitHub repository](https://github.com/Vishota/vils).