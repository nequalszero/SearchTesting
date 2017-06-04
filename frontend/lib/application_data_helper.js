import React from 'react';

// Takes a primary dataKey (string) and an optional details object.
// The details object should have keys for queries and keywords, both of which
//   should have number values.
class DataKey {
  constructor(dataKey, details = null) {
    this.dataKey = dataKey;
    this.details = details;
    this.queries = details ? details.queries : null;
    this.keywords = details ? details.keywords : null;
    this.stringForm = this.constructDataKey();
  }

  constructDataKey() {
    if (!this.details) {
      return `${this.dataKey}`;
    }
    if (!this.details.queries || !this.details.keywords) throw "Error in application_data_helper#constructDataKey: details missing queries or keywords key."
    return `${this.dataKey} - queries: ${this.details.queries} keywords: ${this.details.keywords}`;
  }
}

// Compare DataKey instances by dataKey, then queries, then keywords.
DataKey.comparator = (a, b) => {
  const compare = (val1, val2) => {
    if (val1 === val2) return 0;
    else if (val1 < val2) return -1;
    else return 1;
  }

  if (a.dataKey == b.dataKey) {
    if (a.queries == b.queries) {
      return compare(a.keywords, b.keywords);
    }

    return compare(a.queries, b.queries);
  }

  return compare(a.dataKey, b.dataKey);
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
        let newDataKey = new DataKey(dataKey, subset.details)
        dataKeys.push(newDataKey);
        dataMap[newDataKey.stringForm] = subset;
      })
    } else {
      let newDataKey = new DataKey(dataKey)
      dataKeys.push(newDataKey);
      dataMap[newDataKey.stringForm] = data;
    }
  })

  dataKeys.sort(DataKey.comparator);

  return {dataKeys, dataMap};
}

// Not currently being used. This method takes the gist_ids object from applicationData
//  and returns an array of gist-embed code elements for each of the queries.
//  (Ignores the schema key in the gist_ids object).
export const constructQueryGistElements = (gist_ids) => {
  const queryGists = [];

  Object.keys(gist_ids).forEach((queryKey) => {
    if (queryKey !== 'schema') {
      queryGists.push(
        <code data-gist-id={gist_ids[queryKey]}
          data-gist-show-spinner="true"
          data-gist-hide-footer="true">
        </code>
      );
    }
  })

  return queryGists;
}
