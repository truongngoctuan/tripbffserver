import { IFileStorageService, IFileInfo } from "./IFileStorageService";
import { Stream } from "stream";
import fse from "fs-extra";
import { read, write } from "./FileAsync";
import path from "path";
import { File, IFileModel } from "./File";
const uuid = require("uuid/v1");
import { mimeMapping } from "./mimeMapping";

export class FileStorageOfflineService implements IFileStorageService {
  async save(file: Stream | Buffer, category: string, fileName: string) {
    if (file instanceof Buffer) {
      return this.saveFromBuffer(file, category, fileName);
    }
    return this.saveFromStream(file as Stream, category, fileName);
  }

  async saveFromStream(file: Stream, category: string, fileName: string) {
    var fileExtension = path.parse(fileName).ext;
    fse.mkdirpSync(path.resolve(category));

    const externalId = uuid();
    await write(path.join(category, externalId + fileExtension), file);

    var fileObject = new File({
      externalId: externalId,
      category: category,
      fileName: fileName
    });

    fileObject.save();

    return {
      externalId: fileObject.externalId.toString(),
      slug: path.join(category, externalId + fileExtension)
    };
  }

  async saveFromBuffer(buffer: Buffer, category: string, fileName: string) {
    var fileExtension = path.parse(fileName).ext;
    fse.mkdirpSync(path.resolve(category));

    const externalId = uuid();
    var stream = fse.createWriteStream(
      path.join(category, externalId + fileExtension)
    );
    stream.write(buffer);
    stream.close();

    var fileObject = new File({
      externalId: externalId,
      category: category,
      fileName: fileName
    });

    fileObject.save();

    return {
      externalId: fileObject.externalId.toString(),
      slug: path.join(category, externalId + fileExtension)
    };
  }
  getFileInfo(fileObject: IFileModel): IFileInfo {
    const fileExtension = path.parse(fileObject.fileName).ext;
    return {
      externalId: fileObject.externalId,
      fileName: fileObject.fileName,
      category: fileObject.category,
      mimeType: mimeMapping(fileExtension),
      path: path.join(fileObject.category.toString(), fileObject.externalId + fileExtension),
    }
  }

  async getInfoById(externalId: string) {
    var fileObject = (await File.findOne({ externalId }).exec()) as IFileModel;

    if (fileObject == null) throw "file not found";
    const fileInfo: IFileInfo = this.getFileInfo(fileObject);
    return { fileInfo };
  }
}