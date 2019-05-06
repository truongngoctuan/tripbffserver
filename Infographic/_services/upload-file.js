module.exports = {
  uploadFile
};

function uploadFile(fileLocation, toUrl, ownerId) {
  const axios = require("axios");
  var fs = require("fs");

  const fileContent = JSON.stringify(fs.readFileSync(fileLocation));

  return axios.put(toUrl, {
    file: fileContent,
    ownerId
  })
  .then(function (response) {
    console.log("upload file suceeded");
  })
  .catch(function (error) {
    console.log(error);
  });
}