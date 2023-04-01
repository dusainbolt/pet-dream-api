const fs = require('fs');
const path = require('path');

export class FileUtils {
  static checkExistFolder = dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  };

  static genFilename = (originalname, fileName) => {
    const extname = path.extname(originalname).toLowerCase();
    return `${fileName}${extname}`;
  };

  static genMBToBytes = (mb: number) => mb * 1000 * 1000;

  static removeFile = dir => {
    if (fs.existsSync(dir)) {
      fs.unlinkSync(dir);
    }
  };
}
