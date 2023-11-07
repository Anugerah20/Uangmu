const FilterMoney = ({ selectMonth, setSelectMonth }) => {
     const months = [
          'Semua Bulan', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli',
          'Agustus', 'September', 'Oktober', 'November', 'Desember'
     ];

     return (
          <div>
               <label htmlFor="selectMonth">Filter Bulanan :</label>
               <select className="rounded-md h-10 ml-2" id="selectMonth" value={selectMonth} onChange={(e) => setSelectMonth(e.target.value)}>
                    {months.map((month) => (
                         <option key={month} value={month}>
                              {month}
                         </option>
                    ))}
               </select>
          </div>
     );
};

export default FilterMoney;
