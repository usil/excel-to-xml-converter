const validateArrItemIntoObj = (arrExcel, objXml) => {
  let val = true;
  arrExcel.map((arr) => {
    if (!objXml[arr]) {
      val = false;
      return;
    }
  });
  return val;
};

module.exports = { validateArrItemIntoObj };
