import React, { useState } from "react";


function createHeader(headerName, array, optionalCreatedAt) {
    const [isOpen2, setIsOpen2] = useState(false);
    
    return (
        <header className="relative bg-white border-b-8 border-r-4 border-solid w-full">
            <button
                className="flex items-center justify-between w-full p-2 border-0  "
                onClick={() => setIsOpen2(!isOpen2)}
            >
                <div className="flex flex-col text-center ">


                    <div className="link2 hover:text-green-400 px-9">{headerName}  <br></br> {optionalCreatedAt}</div>
                    {/*optionalCreatedAt ? <div className="link2 hover:text-green-400">{optionalCreatedAt}</div> : null*/}

                </div>
                
            </button>
        </header>
    );
}

export const header2 = createHeader;
