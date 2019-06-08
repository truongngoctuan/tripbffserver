module.exports = {
  uploadFile
};

const axios = require("axios");
function uploadFile(signedUrl, path, mimeType) {

  var fs = require('fs');
  // var fileStream = fs.createReadStream(path);
  // fileStream.on('error', function (err) {
  //   console.log('File Error', err);
  // });
  // console.log(fileStream)
  // console.log(fileStream.readableLength);
  const file = fs.readFileSync(path);


  var options = {
    headers: {
      'Content-Type': mimeType
    }
  };

  return axios.put(signedUrl, file, options)
  .then(res => {
    console.log("Success axios");
  })
  .catch(err => {
    console.log("Err axios", err.response);
  });
}