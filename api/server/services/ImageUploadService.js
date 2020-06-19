import database from "../src/models";
class ImageUploadService {
  static async addImageProfile(image) {
    try {
      const result = await database.users.update(
        { profileImage: image.destination + "/" + image.filename },
        { where: { id: image.userId } }
      );
      return result;
    } catch (e) {
      throw e;
    }
  }

  static async addImageCollection(files, studioId) {
    try {
      const result = files.map(async (file) => {
        const newRecord = new Object();
        newRecord.photo_url = `/studio-${studioId}-folder/${file}`;
        newRecord.studio_id = studioId;
        return await database.photo.create(newRecord);
      });
      return result;
    } catch (e) {
      throw e;
    }
  }

  static async getCollectionByStudioId(studioId) {
    try {
      const result = await database.photo.findAll({
        where: { studio_id: studioId },
        attributes: [
          "photo_url"
        ],
      })
      return result;
    } catch (e) {
      throw e;
    }
  } 
}

export default ImageUploadService;
