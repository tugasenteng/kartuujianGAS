function doGet(e) {
  const method = e?.parameter?.method || "";

  // Endpoint untuk mengambil data JSON
  if (method === "getData") {
    return getData();
  }

  // Jika dibuka tanpa parameter
  return ContentService.createTextOutput("Web App Ready");
}


// =========================
//  FUNGSI MENGAMBIL DATA
// =========================
function getData() {
  const ss = SpreadsheetApp.openById("1k3dYRlF2yUw8qMnbTz1Y5vY2_J7RL_il3mzFtW2KTVg");
  const sh = ss.getSheetByName("DATA");

  // Ambil seluruh data kecuali header
  const lastRow = sh.getLastRow();
  const values = sh.getRange(2, 1, lastRow - 1, 11).getValues(); 
  // Kolom A → K = 11 kolom

  // Ubah ke JSON
  const data = values.map(r => ({
    no: r[0],
    nis: r[1],
    nama: r[2],
    kelas: r[3],
    linkKartu: r[4],
    spp: r[5],
    gedung: r[6],
    danaKegiatan: r[7],
    ekskul: r[8],
    pm: r[9],
    totalTagihan: r[10]
  }));

  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
