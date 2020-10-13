var fs = require('fs');
var pdf = require('html-pdf');
var html = fs.readFileSync('src/index.html', 'utf8');
var options = { format: 'Letter' };
const util = require('util')

const AWS = require('aws-sdk');
const s3 = new AWS.S3()

const main = async (event) => {
    console.log("Event: ", event);
    var data = upload();
    return {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: 'file saved!',
            input: data,
          },
          null,
          2
        ),
      };
}

const upload = async () => {

    const params = {
        ACL:        'public-read',
        Body:        'hello word',
        ContentType: 'text/html',
        Bucket:      'pdf-storage-test-pearlstone',
        Key:         'mygeneratedpdf.pdf'
    }

    return await new Promise((resolve, reject) => {
        s3.putObject(params, (err, results) => {
           if (err) reject(err);
           else {
           console.log("saved file:" + results.to_string)
           resolve(results)
           }
        })
    })
}


exports.generatePdf = main;

///**
// *
// * @param {string} html
// * takes html string as input and convert it into Buffer
// */
//const exportHtmlToPdf = html => {
//    return new Promise((resolve, reject) => {
//        pdf.create(html, {
//            format: "Letter",
//            orientation: "portrait",
//            // This is the path for compiled phantomjs executable stored in layer.
//            // To test locally comment out the following line.
////            phantomPath: '/opt/phantomjs_linux-x86_64'
//        }).toBuffer((err, buffer) => {
//            if (err) {
//                reject(err)
//            } else {
//                resolve(buffer)
//            }
//        });
//    })
//}
//
