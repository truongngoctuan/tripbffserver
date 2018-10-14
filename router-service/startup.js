const http = require('http');
const HttpStatus = require('http-status-codes');
const urlParser = require('url');
const apiHandler = require('./endpoint/api.handler');
const logger = require('./common/logger');

function setHttpStatus(response, statusCode) {
    response.statusCode = statusCode;
    response.statusMessage = HttpStatus.getStatusText(statusCode);
}

http.createServer(function (request, response) {
    logger.log("detected method: %s", request.method);
    response.setHeader("Content-Type", "application/json");
    setHttpStatus(response, HttpStatus.OK);

    let requestHeaders = request.headers;
    try {
        switch (request.method) {
            case "POST":
                let requestBody = [];
                var parsedUrl = urlParser.parse(request.url);
                switch (parsedUrl.path) {
                    case "/login":

                        request
                            .on('data', chunk => {
                                requestBody.push(chunk);
                            })
                            .on('end', () => {
                                apiHandler.doLogin(requestHeaders, requestBody, function(result) {
                                    response.write(JSON.stringify(result));
                                    response.end();
                                });
                            });

                        break;
                    default:
                        setHttpStatus(response, HttpStatus.SERVICE_UNAVAILABLE);
                        response.end();
                        break;
                }
                break;
            default:
                setHttpStatus(response, HttpStatus.SERVICE_UNAVAILABLE);
                response.end();
                break;
        }
    } catch (err) {
        logger.log(err.message);

        setHttpStatus(response, HttpStatus.SERVICE_UNAVAILABLE);
        response.end();
    }


}).listen(9999);


