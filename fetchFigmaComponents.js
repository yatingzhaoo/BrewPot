import axios from 'axios';
import dotenv from 'dotenv';
import { writeFileSync } from 'fs';

dotenv.config();

const FIGMA_API_BASE = 'https://api.figma.com/v1';

/**
 * Extract file ID from Figma URL
 * @param {string} url - Figma file URL
 * @returns {string|null} File ID
 */
function extractFileId(url) {
  const match = url.match(/\/design\/([a-zA-Z0-9]+)\//);
  return match ? match[1] : null;
}

/**
 * Fetch Figma file data
 * @param {string} fileId - Figma file ID
 * @param {string} token - Figma personal access token
 * @returns {Promise<object>} File data
 */
async function fetchFigmaFile(fileId, token) {
  try {
    const response = await axios.get(`${FIGMA_API_BASE}/files/${fileId}`, {
      headers: {
        'X-Figma-Token': token
      }
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(`Figma API error: ${error.response.status} - ${error.response.data.err || error.response.statusText}`);
    }
    throw error;
  }
}

/**
 * Extract components from Figma file data
 * @param {object} fileData - Figma file data
 * @returns {array} Array of components with details
 */
function extractComponents(fileData) {
  const components = [];

  // Traverse the document tree to find components
  function traverse(node, path = []) {
    if (node.type === 'COMPONENT' || node.type === 'COMPONENT_SET') {
      components.push({
        id: node.id,
        name: node.name,
        type: node.type,
        path: path.join(' > '),
        description: node.description || '',
        properties: {
          width: node.absoluteBoundingBox?.width,
          height: node.absoluteBoundingBox?.height,
          backgroundColor: node.backgroundColor,
          fills: node.fills,
          strokes: node.strokes,
          effects: node.effects,
          constraints: node.constraints,
          layoutMode: node.layoutMode,
          layoutAlign: node.layoutAlign,
          paddingLeft: node.paddingLeft,
          paddingRight: node.paddingRight,
          paddingTop: node.paddingTop,
          paddingBottom: node.paddingBottom,
          itemSpacing: node.itemSpacing,
        },
        children: node.children ? node.children.length : 0
      });
    }

    if (node.children) {
      node.children.forEach(child => {
        traverse(child, [...path, node.name]);
      });
    }
  }

  if (fileData.document) {
    traverse(fileData.document);
  }

  return components;
}

/**
 * Format component data for display
 * @param {array} components - Array of components
 * @returns {string} Formatted output
 */
function formatComponents(components) {
  if (components.length === 0) {
    return 'No components found in this Figma file.';
  }

  let output = `Found ${components.length} component(s):\n\n`;

  components.forEach((component, index) => {
    output += `${'='.repeat(60)}\n`;
    output += `Component ${index + 1}: ${component.name}\n`;
    output += `${'='.repeat(60)}\n`;
    output += `ID: ${component.id}\n`;
    output += `Type: ${component.type}\n`;
    output += `Path: ${component.path}\n`;
    if (component.description) {
      output += `Description: ${component.description}\n`;
    }
    output += `\nDimensions:\n`;
    output += `  Width: ${component.properties.width || 'N/A'}px\n`;
    output += `  Height: ${component.properties.height || 'N/A'}px\n`;

    if (component.properties.layoutMode) {
      output += `\nLayout:\n`;
      output += `  Mode: ${component.properties.layoutMode}\n`;
      if (component.properties.layoutAlign) {
        output += `  Align: ${component.properties.layoutAlign}\n`;
      }
      if (component.properties.itemSpacing !== undefined) {
        output += `  Item Spacing: ${component.properties.itemSpacing}px\n`;
      }
      if (component.properties.paddingLeft !== undefined) {
        output += `  Padding: ${component.properties.paddingTop}px ${component.properties.paddingRight}px ${component.properties.paddingBottom}px ${component.properties.paddingLeft}px\n`;
      }
    }

    if (component.children > 0) {
      output += `\nChildren: ${component.children} element(s)\n`;
    }

    output += `\n`;
  });

  return output;
}

/**
 * Main function
 */
async function main() {
  // Configuration
  const FIGMA_URL = 'https://www.figma.com/design/VeajgEaHFwyxch8ez2HC8n/Untitled?node-id=0-1&t=nySQugLeRGGc9XDS-1';
  const FIGMA_TOKEN = process.env.FIGMA_TOKEN;

  if (!FIGMA_TOKEN || FIGMA_TOKEN === 'your_figma_personal_access_token_here') {
    console.error('Error: FIGMA_TOKEN not set in .env file');
    console.error('Please:');
    console.error('1. Copy .env.example to .env');
    console.error('2. Get your Figma token from: https://www.figma.com/developers/api#access-tokens');
    console.error('3. Add your token to the .env file');
    process.exit(1);
  }

  console.log('Fetching Figma file...\n');

  // Extract file ID
  const fileId = extractFileId(FIGMA_URL);
  if (!fileId) {
    console.error('Error: Could not extract file ID from URL');
    process.exit(1);
  }

  console.log(`File ID: ${fileId}\n`);

  try {
    // Fetch file data
    const fileData = await fetchFigmaFile(fileId, FIGMA_TOKEN);

    console.log(`File Name: ${fileData.name}`);
    console.log(`Last Modified: ${fileData.lastModified}\n`);

    // Extract components
    const components = extractComponents(fileData);

    // Format and display
    const output = formatComponents(components);
    console.log(output);

    // Save to file
    const result = {
      fileName: fileData.name,
      fileId: fileId,
      lastModified: fileData.lastModified,
      componentCount: components.length,
      components: components,
      rawData: fileData
    };

    writeFileSync('figma-components.json', JSON.stringify(result, null, 2));
    console.log('Detailed component data saved to: figma-components.json\n');

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
