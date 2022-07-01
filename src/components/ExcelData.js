import React, { useState } from "react";

const ExcelData = () => {
  const [excelData, setExcelData] = useState(null);

  return (
    <div className="excel-container">
      {/* Upload File Section */}
      <form className="excel-from" autoComplete="off">
        <label>
          <h5>Upload Excel File</h5>
        </label>
        <br />
        <input type="file" className="excel-form-control" required />
        <button type="submit" className="btn btn-success"></button>
      </form>
    </div>
  );
};

export default ExcelData;
