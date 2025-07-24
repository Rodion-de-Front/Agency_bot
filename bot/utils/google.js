const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const CREDENTIALS_PATH = path.join(__dirname, "../credentials.json");
const SPREADSHEET_ID = "1b9geTlw95zn_gxTwUCw-3CX2GVA9HVeXm-L0tIUePR0"; // только ID, без URL

function getAuth() {
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, "utf8"));
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
  });
  return auth;
}

async function appendToSheet(sheetName, values) {
  const auth = await getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${sheetName}!A1`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [values],
    },
  });
}

module.exports = { appendToSheet };
