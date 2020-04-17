import { fileExists, read, writeBuffer } from "../S3Async";
import moment = require("moment");
import fs from "fs";

describe("s3 service", () => {
  test("is redcat exist", async () => {
    // Arrange
    const relativeImageUrl = "redcat.png";

    // Act
    const result = await fileExists(relativeImageUrl);

    // Assert
    expect(result).toBe(true);
  });

  test("is redcat2 not exist", async () => {
    // Arrange
    const relativeImageUrl = "redcat2.png";

    // Act
    const result = await fileExists(relativeImageUrl);

    // Assert
    expect(result).toBe(false);
  });

  test("read file", async () => {
    // Arrange
    const relativeImageUrl = "redcat.png";

    // Act
    const result = await read(relativeImageUrl);

    // Assert
    expect(result).toBeDefined();
    expect(result.length).toBe(425521);
  }, 10000);

  test("upload file", async () => {
    return new Promise((resolve, reject) => {
      // var currentPath = process.cwd();
      // console.log(currentPath)
      const fileNeedToUpload =
        "./src/image.module/_infrastructures/__tests__/redcat_tiny.png";
      // Arrange
      fs.readFile(fileNeedToUpload, "binary", async (err, dataDemo1) => {
        if (err) throw err;

        const buffer = Buffer.from(dataDemo1, "binary");

        // Act
        const relativeImageUrl = `test/redcat_thumbnail_${moment().unix()}.png`;
        console.log("uploading file");
        await writeBuffer(relativeImageUrl, buffer);

        // Assert
        expect(await fileExists(relativeImageUrl)).toBe(true);

        resolve(true);
      });
    });
  }, 5000);
});
