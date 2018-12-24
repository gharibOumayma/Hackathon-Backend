var alasql = require("alasql");


var loadData = (file, query, index = 0) => {
      return new Promise((resolve, reject) => {
            alasql([`SELECT * FROM XLS("./uploads/${file}") ${query}`])
                  .then(function (res) {
                        resolve(res);
                  }).catch(function (err) {
                        reject(err);
                        console.log('Does the file exist? There was an error:', err);
                  });
      })
};

var loadResult = (content, columns, query) => {
      // console.log('content', content);
      return new Promise((resolve, reject) => {
            alasql.promise(`SELECT ${columns} FROM ? ${query}`, [content])
                  .then(function (res) {
                        resolve(res);
                        // console.log('alasql query', res);
                  }).catch(function (err) {
                        reject(err);
                        console.log('Does the file exist? There was an error:', err);
                  });
      });
}

var combine = (content1, content2, onQuery) => {
      // console.log('nodesArray[2]', nodesArray[2]);
      return new Promise((resolve, reject) => {
            alasql.promise(`SELECT * FROM ? tableA JOIN ? AS tableB ON ${onQuery}`,
                  [content1, content2])
                  .then(function (res) {
                        resolve(res);
                        console.log('Combine Query', res);
                  }).catch(function (err) {
                        reject(err);
                        console.log('Does the file exist? There was an error:', err);
                  });
      });
}

module.exports = { loadData, loadResult, combine }