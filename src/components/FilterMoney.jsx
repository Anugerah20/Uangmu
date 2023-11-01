import { Dropdown } from "flowbite-react"

const FilterMoney = () => {
     return (
          <>
               <Dropdown label="Laporan Bulanan" dismissOnClick={false}>
                    <Dropdown.Item>Januari</Dropdown.Item>
                    <Dropdown.Item>Februari</Dropdown.Item>
                    <Dropdown.Item>Maret</Dropdown.Item>
                    <Dropdown.Item>April</Dropdown.Item>
                    <Dropdown.Item>Mei</Dropdown.Item>
                    <Dropdown.Item>Juni</Dropdown.Item>
                    <Dropdown.Item>Juli</Dropdown.Item>
                    <Dropdown.Item>Agustus</Dropdown.Item>
                    <Dropdown.Item>September</Dropdown.Item>
                    <Dropdown.Item>Oktober</Dropdown.Item>
                    <Dropdown.Item>November</Dropdown.Item>
                    <Dropdown.Item>Desember</Dropdown.Item>
               </Dropdown>
          </>
     )
}

export default FilterMoney;
