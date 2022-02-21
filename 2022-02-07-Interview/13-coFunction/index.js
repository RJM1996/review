var fs = require('fs');

var readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function (error, data) {
      if (error) reject(error);
      console.log('data', data);
      resolve(data);
    });
  });
};

var gen = function* () {
  var f1 = yield readFile('./readme.md');
  var f2 = yield readFile('../../.eslintrc.js');
  console.log(f1.toString());
  console.log(f2.toString());
};
const g = gen();
g.next().value.then(function (data) {
  g.next(data).value.then(function (data) {
    g.next(data);
  });
})