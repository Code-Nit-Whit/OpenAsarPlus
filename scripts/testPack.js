const fs = require("fs");
const path = require("path");
const asar = require("asar");

async function main() {
  try {
    // Get the absolute path of the script's directory
    const scriptDir = path.dirname(process.argv[1]);

    // Define source and target directories relative to the script directory
    const sourceDir = path.join(scriptDir, '../src');
    const targetDir = path.join(scriptDir, '../build');

    // Create the build directory if it doesn't exist
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Create the asar path within the target directory
    const asarPath = path.join(targetDir, 'app.asar');

    // Pack the asar file
    await asar.createPackage(sourceDir, asarPath);

    console.log('ASAR file created successfully:', asarPath);
  } catch (err) {
    console.error('Error creating ASAR file:', err);
  }
}

main();
