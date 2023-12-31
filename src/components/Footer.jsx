import { Footer } from "flowbite-react";

export default function MyFooter() {
  return (
    <>
      <Footer container className="footer space-footer">
        <Footer.Copyright
          by="Uangmu"
          href="/"
          className="text-sky-600"
        />
        <Footer.LinkGroup className="flex justify-end sm:justify-around text-sky-600">
          <Footer.Link href="/" className="px-1">
            Beranda
          </Footer.Link>
          <Footer.Link href="/takenotes" className="px-1">
            Buat Catatan
          </Footer.Link>
          <Footer.Link href="/contact" className="px-1">
            Kontak
          </Footer.Link>
        </Footer.LinkGroup>
      </Footer>
    </>
  )
}
