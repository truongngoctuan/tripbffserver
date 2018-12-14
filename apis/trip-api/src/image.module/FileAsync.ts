import fs from "fs";
import { Stream, Readable } from "stream";

export function read(file1: string): Promise<Stream> {
  return new Promise(function(resolve, reject) {
    fs.readFile(file1, "utf8", function(err, dataDemo1) {
      if (err) reject(err);
      else {
        const s = new Readable();
        s._read = () => {}; // redundant? see update below
        s.push(dataDemo1);
        s.push(null);
        resolve(s);
      }
    });
  });
}

export function write(fileName: string, dataDemo1: Stream) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(fileName, dataDemo1, "utf8", function(err) {
      if (err) reject(err);
      else {
        resolve("Promise Success!");
      }
    });
  });
}
