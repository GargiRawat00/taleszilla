


const fs=require('fs');
const path = require("path");
const folderPath='C:/Users/hp/Downloads/motivation';
let filesArr = fs.readdirSync(folderPath);
//console.log(filesArr);
filesArr.forEach((file, index) => { 
    let fullPath = path.join(folderPath, file);
    let fileExtension = path.extname(file);
    let fileName = path.basename(file, fileExtension);
    //console.log(fileName);
    let newFileName = (Number(fileName) + 52)  + fileExtension;
    //console.log(fullPath);
    try {
        fs.renameSync(fullPath, path.join(folderPath, newFileName));
      } catch (error) {
        console.error(error)
      }
});