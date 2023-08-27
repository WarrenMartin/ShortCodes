(* Conatct  Warren Martin martinwarren2000@gmail.com +91 8308485202 *)

(* ignore my spellings i am only work oriented and ofcourse i do it for money  *)

(* I am readily avaiable for website app anykind of software and if your anything got hacked i am a call away my charges are expensive but i can consider doing for free if you have good heart  *)

var sheetName = 'Sheet1'
var scriptProp = PropertiesService.getScriptProperties()

function intialSetup () {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  scriptProp.setProperty('key', activeSpreadsheet.getId())
}

function doPost (e) {
  var lock = LockService.getScriptLock()
  lock.tryLock(10000)

  try {
	var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
	var sheet = doc.getSheetByName(sheetName)

	var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
	var nextRow = sheet.getLastRow() + 1

	var newRow = headers.map(function(header) {
	  return header === 'timestamp' ? new Date() : e.parameter[header]
	})

	sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])

	return ContentService
	  .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
	  .setMimeType(ContentService.MimeType.JSON)
  }

  catch (e) {
	return ContentService
	  .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
	  .setMimeType(ContentService.MimeType.JSON)
  }

  finally {
	lock.releaseLock()
  }
}
