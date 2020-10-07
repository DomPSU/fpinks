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

module.exports = {
  getIndexInserts,
  concatStringQueryInserts,
};
