export const exportToPDF = (rows) => {
  const win = window.open("", "", "width=900,height=650");

  win.document.write(`
    <html>
      <head>
        <title>Attendance Report</title>
        <style>
          body { font-family: Arial; padding: 20px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #ddd; padding: 8px; }
          th { background: #f3f4f6; }
        </style>
      </head>
      <body>
        <h2>Attendance Report</h2>
        <table>
          <tr><th>Date</th><th>In</th><th>Out</th><th>Status</th><th>Remark</th></tr>
          ${rows.map(r => `
            <tr>
              <td>${r.date}</td>
              <td>${r.in || "--"}</td>
              <td>${r.out || "--"}</td>
              <td>${r.status}</td>
              <td>${r.remark}</td>
            </tr>
          `).join("")}
        </table>
      </body>
    </html>
  `);

  win.document.close();
  win.print();
};
