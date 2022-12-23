const fs = require("fs");
const readXlsxFile = require("read-excel-file/node");

const readXmlItemFile = async (pathTemplateItemFile) => {
  let templateItemString = "";
  let templateItemKeys = {};
  templateItemString = await readFile(pathTemplateItemFile);
  templateItemString = templateItemString.replace(/(\r\n|\n|\r)/gm, "");
  const splitTemplateItemString = templateItemString.split(">@");
  for (let i = 1; i < splitTemplateItemString.length; i++) {
    let element = splitTemplateItemString[i];
    const lastIndexToCut = element.indexOf("<");
    element = element.substring(0, lastIndexToCut);
    templateItemKeys[element] = element;
  }
  return { templateItemString, templateItemKeys };
};
const readExcel = async (pathSourceFile) => {
  let headerRow = [];
  let allRows = [];
  await readXlsxFile(pathSourceFile).then((rows) => {
    headerRow = rows[0].filter((row) => row != null);
    allRows = rows;
  });
  return { headerRow, allRows };
};

async function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", function (err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

async function writeFile(path, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, function (err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

module.exports = { readXmlItemFile, writeFile, readFile, readExcel };
