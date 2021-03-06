var { google } = require("googleapis");
var keys = require("../../libs/certifications/gapi-sheets.json");
export const client = new google.auth.JWT(
  keys.client_email,
  null,
  keys.private_key,
  ["https://www.googleapis.com/auth/spreadsheets"]
);

export const getData = async (id, range) => {
  const gdApi = google.sheets({
    version: "v4",
    auth: client,
  });
  const opt = {
    spreadsheetId: id,
    range: range,
  };
  try {
    var data = await gdApi.spreadsheets.values.get(opt);
    return data.data.values;
  } catch (e) {
    return [];
  }
};
export const pushData = async (range, data, id) => {
  const gdApi = google.sheets({
    version: "v4",
    auth: client,
  });
  const opt = {
    spreadsheetId: id,
    range: range,
    valueInputOption: "USER_ENTERED",
    resource: {
      values: data,
    },
  };

  var data = await gdApi.spreadsheets.values.update(opt);
  return data;
};
export const ClearData = async (idSheet) => {
  const gdApi = google.sheets({
    version: "v4",
    auth: client,
  });
  const opt = {
    spreadsheetId: idSheet,
    range: "A1:Z10000",
  };

  var data = await gdApi.spreadsheets.values.clear(opt);
  return data;
};
