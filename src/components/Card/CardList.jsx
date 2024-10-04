import React from "react";

const CardList = ({ Icon, title }) => {
     return (
          <>
               <div className="col flex text-center">
                    <div className="border p-8 rounded-md shadow-md">
                         <div className="flex justify-center items-center text-4xl text-sky-800">
                              <Icon className="text-4xl text-sky-800" />
                         </div>
                         <h5 className="text-xl font-medium tracking-tight text-sky-800 dark:text-white">
                              {title}
                         </h5>
                    </div>
               </div>
          </>
     )
}

export default CardList;