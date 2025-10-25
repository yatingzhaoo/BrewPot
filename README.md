# BrewPot - Figma Component Fetcher

A Node.js tool to fetch and analyze component details from Figma design files.

## Features

- Fetches component data from Figma files using the Figma API
- Extracts detailed information about components including:
  - Component names, types, and IDs
  - Dimensions (width, height)
  - Layout properties (flex, padding, spacing)
  - Visual properties (fills, strokes, effects)
  - Component hierarchy
- Outputs formatted component details to console
- Saves complete data to JSON file for further processing

## Prerequisites

- Node.js (v14 or higher)
- A Figma account with access to the file you want to analyze
- A Figma Personal Access Token

## Setup

1. **Clone the repository** (if you haven't already)

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get your Figma Personal Access Token**
   - Go to https://www.figma.com/developers/api#access-tokens
   - Click on your profile icon in Figma
   - Go to Settings > Account > Personal access tokens
   - Click "Generate new token"
   - Give it a name and copy the token

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file and add your Figma token:
   ```
   FIGMA_TOKEN=your_actual_token_here
   ```

## Usage

Run the script to fetch components from the configured Figma file:

```bash
npm run fetch
```

The script will:
1. Connect to the Figma API
2. Fetch the file data
3. Extract all components
4. Display component details in the console
5. Save complete data to `figma-components.json`

## Customizing the Figma File URL

To fetch components from a different Figma file, edit the `FIGMA_URL` constant in `fetchFigmaComponents.js`:

```javascript
const FIGMA_URL = 'your_figma_file_url_here';
```

## Output

The script provides two types of output:

1. **Console Output**: Formatted, human-readable component details
2. **JSON File**: Complete raw data saved to `figma-components.json`

### Example Console Output

```
Fetching Figma file...

File ID: VeajgEaHFwyxch8ez2HC8n

File Name: Untitled
Last Modified: 2024-01-01T12:00:00Z

Found 3 component(s):

============================================================
Component 1: Button
============================================================
ID: 1:2
Type: COMPONENT
Path: Page 1 > Frame 1

Dimensions:
  Width: 120px
  Height: 40px

Layout:
  Mode: HORIZONTAL
  Item Spacing: 8px
  Padding: 12px 16px 12px 16px

Children: 2 element(s)
```

## File Structure

```
BrewPot/
├── fetchFigmaComponents.js  # Main script
├── package.json             # Project dependencies
├── .env.example             # Environment variables template
├── .env                     # Your environment variables (git-ignored)
├── .gitignore              # Git ignore rules
├── README.md               # This file
└── figma-components.json   # Generated output (created after running script)
```

## Troubleshooting

### "FIGMA_TOKEN not set" error
Make sure you've created a `.env` file and added your Figma token.

### "Could not extract file ID from URL" error
Ensure your Figma URL is in the correct format:
`https://www.figma.com/design/FILE_ID/...`

### "403 Forbidden" error
- Check that your Figma token is valid
- Ensure you have access to the Figma file
- The file must be accessible with your account

### "404 Not Found" error
- Verify the file ID in the URL is correct
- Make sure the file hasn't been deleted

## API Reference

This tool uses the Figma REST API:
- Documentation: https://www.figma.com/developers/api
- Endpoint used: `GET /v1/files/:file_id`

## License

ISC
