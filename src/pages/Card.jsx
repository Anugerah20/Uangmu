import React from "react";
import CardItem from "../components/Card/CardList";
import { BiSolidBadgeDollar, BiSolidPointer, BiSolidHappyAlt } from "react-icons/bi";

const Card = () => {
     const cardData = [
          {
               Icon: BiSolidBadgeDollar,
               title: "Gratis Tanpa Biaya Apapun"
          },
          {
               Icon: BiSolidHappyAlt,
               title: "Bisa Mengunduh Laporan"
          },
          {
               Icon: BiSolidPointer,
               title: "Dibuka Perangkat Apapun"
          }
     ];

     return (
          <section className="flex flex-wrap justify-center items-center">
               <div className="text-center flex mt-16">
                    <h2 className="text-2xl font-bold mb-4 sm:mb-10 text-sky-600">Kenapa Harus Uangmu</h2>
               </div>
               <div className="row flex justify-center items-center flex-grow flex-wrap sm:flex-nowrap md:flex-wrap w-4/5 md:w-full gap-10 md:gap-10 lg:gap-10">
                    {cardData.map((card, index) => (
                         <CardItem key={index} Icon={card.Icon} title={card.title} />
                    ))}
               </div>
          </section>
     );
};

export default Card;
