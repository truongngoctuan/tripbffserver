import { ImageS3Service } from "../ImageS3Service";

describe("create thumbnail", () => {
  test("save thumbnail", async () => {
    // Arrange
    const imageService = new ImageS3Service();
    const img = "test/redcat.png";

    // Act
    await imageService.saveThumbnail(img, 20, 20);

    // Assert
  });
});
