import fs from 'fs/promises';
import path from 'path';

const requiredFiles = ['docs/index.html', 'docs/contact-success.html', 'docs/_redirects'];

const ensureFileExists = async (relativePath) => {
  const fullPath = path.resolve(process.cwd(), relativePath);
  try {
    const stats = await fs.stat(fullPath);
    if (!stats.isFile()) {
      throw new Error(`${relativePath} is not a file.`);
    }
  } catch (error) {
    throw new Error(`Missing required build artifact: ${relativePath}`);
  }
};

const ensureAssetBundle = async () => {
  const assetsDir = path.resolve(process.cwd(), 'docs/assets');
  let files;
  try {
    files = await fs.readdir(assetsDir);
  } catch (error) {
    throw new Error('docs/assets directory is missing.');
  }

  const hasCss = files.some((file) => file.endsWith('.css'));
  const hasJs = files.some((file) => file.endsWith('.js'));

  if (!hasCss || !hasJs) {
    throw new Error('docs/assets must contain at least one CSS and one JS file.');
  }
};

const run = async () => {
  await Promise.all(requiredFiles.map(ensureFileExists));
  await ensureAssetBundle();
  console.log('Docs integrity check passed.');
};

run().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
