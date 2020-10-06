const getIndexInserts = (queryKeys, queryValues) => {
  const inserts = [];

  for (let i = 0; i < queryKeys.length; i += 1) {
    inserts.push(queryKeys[i]);
    inserts.push(queryValues[i]);
  }

  return inserts;
};

const concatWhere = (partialSQL, numOfKeys, isApproved) => {
  let unsanitizedSQL = partialSQL;
  for (let i = 0; i < numOfKeys; i += 1) {
    unsanitizedSQL = unsanitizedSQL.concat(' ?? = ? AND');
  }

  if (isApproved === 'unapproved') {
    unsanitizedSQL = unsanitizedSQL.concat(' approved = 0');
  } else {
    // default to approved for safety
    unsanitizedSQL = unsanitizedSQL.concat(' approved <> 0');
  }

  return unsanitizedSQL;
};

module.exports = {
  getIndexInserts,
  concatWhere,
};
