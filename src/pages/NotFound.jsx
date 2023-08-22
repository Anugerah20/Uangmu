const NotFound = () => {
     document.title = "Uangmu | 404 Not Found";
     return (
          <>
               <section className="bg-white dark:bg-gray-900 flex flex-col justify-between h-screen">
                    <div className="flex flex-col justify-center items-center py-8 px-4 mx-auto max-w-screen-xl text-center h-1/2">
                         <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Opps!</h1>
                         <p className="mb-8 mt-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
                              This page could not be found.
                         </p>
                    </div>
               </section>
          </>
     )
}

export default NotFound;