var request = require('request'),
    fs = require('fs'),
    _ = require('underscore'),
    download = require('image-downloader');

var vnexpressParser = require('./vnexpress.js');

var parseUrl = function (url, imgPath, client) {
    request(url, {
        timeout: 30000
    }, function (error, response, body) {
        if (body) {
            var parser = null;
            if (url.indexOf('dantri.com.vn') > -1) {
                //                parser = dantriParser;
            } else if (url.indexOf('vnexpress.net') > -1) {
                parser = vnexpressParser;
            }

            if (parser) {
                var result = parser.parse(url, body);

                // Download images
                var downloaded = 0;
                var downloadedFilePath = [];
                _.each(result.images, function (url, index) {
                    download.image({
                            url: url,
                            dest: imgPath
                        })
                        .then(({filename,image}) => {
                            downloadedFilePath.push('images/' + getFileName(filename));
                            downloaded++;

                            if (downloaded == result.images.length) {
                                console.log("Finish fetch url: [" + data.url + "]");
                                client.emit('article', {
                                    content: result.content,
                                    images: downloadedFilePath
                                });
                            }
                        }).catch((err) => {
                            // Push error to db and debug
                            throw err
                        })
                });
            }
        } else {
            // Push error to db and debug
            console.log('error', url);
        }
    });
}

function getFileName(fullPath) {
    return fullPath.replace(/^.*[\\\/]/, '')
}

exports.fetch = parseUrl;
