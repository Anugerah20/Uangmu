// import { Footer } from 'flowbite-react';

// export default function MyFooter() {
//   return (
//     <Footer container className="my-5">
//       <div className="w-full text-center">
//         <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
//           <Footer.Brand
//             href="/"
//             name="Uangmu"
//           />
//           <Footer.LinkGroup>
//             <Footer.Link href="#" className="px-2">
//               About
//             </Footer.Link>
//             <Footer.Link href="#" className="px-2">
//               Privacy Policy
//             </Footer.Link>
//             <Footer.Link href="#" className="px-2">
//               Licensing
//             </Footer.Link>
//           </Footer.LinkGroup>
//         </div>
//         <Footer.Divider />
//       </div>
//     </Footer>
//   )
// }

import { Footer } from "flowbite-react";

export default function MyFooter() {
  return (
    <div className="mx-5 sm:mx-20">
      <Footer container className="flex justify-between sm:justify-between">
        <Footer.Copyright
          by="Uangmu"
          href="/"
        />
        <Footer.LinkGroup className="flex justify-end sm:justify-around">
          <Footer.Link href="/" className="px-1 underline">
            Beranda
          </Footer.Link>
          <Footer.Link href="/takenotes" className="px-1 underline">
            Buat Catatan
          </Footer.Link>
          <Footer.Link href="/contact" className="px-1 underline">
            Kontak
          </Footer.Link>
        </Footer.LinkGroup>
      </Footer>
    </div>
  )
}
