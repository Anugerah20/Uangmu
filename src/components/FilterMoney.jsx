/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

const FilterMoney = ({ selectMonth, setSelectMonth }) => {
     const months = [
          "Semua Bulan", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli",
          "Agustus", "September", "Oktober", "November", "Desember"
     ];

     return (
          <>
               <select className="rounded-md h-10 w-full mb-10" id="selectMonth" value={selectMonth} onChange={(e) => setSelectMonth(e.target.value)}>
                    {months.map((month) => (
                         <option key={month} value={month}>
                              {month}
                         </option>
                    ))}
               </select>
          </>
     );
};

export default FilterMoney;
