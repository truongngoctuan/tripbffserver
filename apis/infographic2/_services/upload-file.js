module.exports = {
  uploadFile,
  uploadFileFromBuffer,
};

const axios = require("axios");
function uploadFile(signedUrl, path, mimeType) {
  const fs = require("fs");
  // var fileStream = fs.createReadStream(path);
  // fileStream.on('error', function (err) {
  //   console.log('File Error', err);
  // });
  // console.log(fileStream)
  // console.log(fileStream.readableLength);
  const file = fs.readFileSync(path);

  const options = {
    headers: {
      "Content-Type": mimeType,
    },
  };

  return axios
    .put(signedUrl, file, options)
    .then((res) => {
      console.log("Success axios");
    })
    .catch((err) => {
      console.log("Err axios", err.response);
    });
}

function uploadFileFromBuffer(signedUrl, buffer, mimeType) {
  const options = {
    headers: {
      "Content-Type": mimeType,
    },
  };

  return axios
    .put(signedUrl, buffer, options)
    .then((res) => {
      console.log("Success axios");
    })
    .catch((err) => {
      console.log("Err axios", err.response);
    });
}
