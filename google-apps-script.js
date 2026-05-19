// ============================================================
// Robocraft Club — Google Apps Script (paste into Apps Script)
// ============================================================
// SETUP:
//   1. Open your Google Sheet → Extensions → Apps Script
//   2. Paste this entire file, replacing all existing code
//   3. Click Deploy → New Deployment → Web App
//      - Execute as: Me
//      - Who has access: Anyone
//   4. Copy the Web App URL and paste it into main.js (SCRIPT_URL)
// ============================================================
//
// Sheet column layout (Row 1 headers):
//   A: PARENT NAME | B: CHILD'S NAME | C: AGE
//   D: PARENT'S NUMBER | E: ADDRESS/LOCATION | F: EMAIL
// ============================================================

const SHEET_NAME = 'Sheet1'; // Change if your sheet tab has a different name

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.parentName   || '',   // A: PARENT NAME
      data.childName    || '',   // B: CHILD'S NAME
      data.kidAge       || '',   // C: AGE
      data.parentNumber || '',   // D: PARENT'S NUMBER
      data.address      || '',   // E: ADDRESS/LOCATION
      data.email        || '',   // F: EMAIL
      new Date().toLocaleString('en-GH', { timeZone: 'Africa/Accra' }), // G: TIMESTAMP
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handles browser preflight (CORS) — required for fetch() from a web page
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ result: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
