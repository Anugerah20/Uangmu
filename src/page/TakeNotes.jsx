import { Button, Label, TextInput } from 'flowbite-react';
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { useEffect, useState } from 'react';

const TakeNotes = () => {
     document.title = "Uangmu | Buat Catatan";
     const [takeNotes, setTakeNotes] = useState(false);
     const [msgAlert, setMsgAlert] = useState(false);

     useEffect(() => {
          if (takeNotes && msgAlert)
               alert("Halaman ini sedang dalam pengerjaan");
          setMsgAlert(true);
          setTakeNotes(true);
     }, [takeNotes, msgAlert])

     return (
          <>
               <Navigation />


               <h1 className="text-2xl font-bold text-center">Buat Catatan</h1>

               {/* START: FORMULIR KEUANGAN */}

               <form className="flex max-w-md flex-col gap-4 mx-auto">
                    <div>
                         <div className="mb-2 block">
                              <Label
                                   htmlFor="deskripsi"
                                   value="Deskripsi"
                              />
                         </div>
                         <TextInput
                              id="deskripsi"
                              placeholder="contoh: beli kopi"
                              required
                              type="text"
                         />
                    </div>
                    <div>
                         <div className="mb-2 block">
                              <Label
                                   htmlFor="tanggal"
                                   value="Tanggal"
                              />
                         </div>
                         <TextInput
                              id="tanggal"
                              required
                              type="date"
                         />
                    </div>
                    <div>
                         <div className="mb-2 block">
                              <Label
                                   htmlFor="nominal"
                                   value="Nominal"
                              />
                         </div>
                         <TextInput
                              id="nominal"
                              placeholder="contoh: 10.000"
                              required
                              type="number"
                         />
                    </div>
                    <Button type="submit">
                         Submit
                    </Button>
               </form>

               {/* END: FORMULIR KEUANGAN */}
               <Footer />
          </>
     )
}

export default TakeNotes;