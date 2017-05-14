// Takes a primary dataKey (string) and an optional details object.
// The details object should have keys for queries and keywords, both of which
//   should have number values.
const constructDataKey = (dataKey, details = null) => {
  if (!details) {
    return `${dataKey}`;
  }
  if (!details.queries || !details.keywords) throw "Error in application_data_helper#constructDataKey: details missing queries or keywords key."
  return `${dataKey} queries: ${details.queries} keywords: ${details.keywords}`;
}

// Processes applicationData object and returns a new object with a dataKeys array
//   and a dataMap object.  Loops over the top level keys of the applicationData.data
//   object, and then checks the values.
//     If the value is an array, each item is processed individually and the item's
//       details object is used in creating its dataKey.
//     If the value is an object, the top level key alone is used in constructing the data key.
export const constructDataKeysAndDataMap = (applicationData) => {
  const dataKeys = [];
  const dataMap = {};

  Object.keys(applicationData.data).forEach((dataKey) => {
    let data = applicationData.data[dataKey];

    if (Array.isArray(data)) {
      data.forEach((subset) => {
        if (!subset.details) throw "Error in application_data_helper#constructDataMap: subset missing details key";
        let newDataKey = constructDataKey(dataKey, subset.details)
        dataKeys.push(newDataKey);
        dataMap[newDataKey] = subset;
      })
    } else {
      let newDataKey = constructDataKey(dataKey)
      dataKeys.push(newDataKey);
      dataMap[newDataKey] = data;
    }
  })

  return {dataKeys, dataMap};
}
