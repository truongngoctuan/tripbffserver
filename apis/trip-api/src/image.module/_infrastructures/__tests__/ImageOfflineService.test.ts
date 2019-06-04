import { ImageOfflineService } from "../ImageOfflineService";

describe("image offline service", () => {
  test.each([
    ["abc.jpeg", "abc_200_300.jpeg"],
    ["images/abc.jpeg", "images/abc_200_300.jpeg"],
    ["/images/abc.jpeg", "/images/abc_200_300.jpeg"],
    ["images/image-id/abc.jpeg", "images/image-id/abc_200_300.jpeg"],
  ])("get thumbnail relative url %s", (relativeImageUrl, expected) => {
    // Arrange
    const imageService = new ImageOfflineService();

    // Act
    const result = imageService.generateThumbnailUri(relativeImageUrl, 200, 300);

    // Assert
    expect(result).toEqual(expected);
  })
})