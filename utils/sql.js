const mysql = require('mysql');

const getIndexInserts = (queryKeys, queryValues) => {
  const inserts = [];

  for (let i = 0; i < queryKeys.length; i += 1) {
    inserts.push(queryKeys[i]);
    inserts.push(queryValues[i]);
  }

  return inserts;
};

const concatStringQueryInserts = (partialSQL, numOfKeys) => {
  let unsanitizedSQL = partialSQL;
  for (let i = 0; i < numOfKeys; i += 1) {
    unsanitizedSQL = unsanitizedSQL.concat(' ?? = ? AND');
  }

  // trim final ' AND '
  unsanitizedSQL = unsanitizedSQL.substring(0, unsanitizedSQL.length - 4);

  return unsanitizedSQL;
};

const getSanitizedSQL = (partialSQL, queryKeys, queryValues) => {
  const inserts = getIndexInserts(queryKeys, queryValues);

  const unsanitizedSQL = concatStringQueryInserts(partialSQL, queryKeys.length);

  const sanitizedSQL = mysql.format(unsanitizedSQL, inserts);

  return sanitizedSQL;
};

const deleteWritingSampleComment = (data) => {
  data.forEach((writingSample) => {
    delete writingSample.comment;
  });
};

module.exports = {
  getSanitizedSQL,
  deleteWritingSampleComment,
};
