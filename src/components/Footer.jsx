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
