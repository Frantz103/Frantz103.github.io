import fs from 'fs/promises';
import path from 'path';

const requiredFiles = [
  'docs/index.html',
  'docs/writing/index.html',
  'docs/creative/index.html',
  'docs/field-notes/index.html',
  'docs/about/index.html',
  'docs/contact/index.html',
  'docs/contact-success/index.html',
  'docs/404.html',
  'docs/sitemap-index.xml',
  'docs/rss.xml',
];

const ensureFileExists = async (relativePath) => {
  const fullPath = path.resolve(process.cwd(), relativePath);
  try {
    const stats = await fs.stat(fullPath);
    if (!stats.isFile()) {
      throw new Error(`${relativePath} is not a file.`);
    }
  } catch {
    throw new Error(`Missing required build artifact: ${relativePath}`);
  }
};

const run = async () => {
  await Promise.all(requiredFiles.map(ensureFileExists));
  console.log('Docs integrity check passed.');
};

run().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
