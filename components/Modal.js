import React from "react";
const Modal = ({isVisible,onClose,children}) => {
    if(!isVisible) return null;
    const handleClose=(e)=>{
        if(e.target.id === "wrapper") onClose();
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm 
        flex justify-center item-center"id="wrapper" onClick={handleClose}>
            <div className="w-[600px] flex flex-col">
            <button className="text-gray-700 text-xl place-self-end mt-24"
            onClick={(e)=>{
                e.preventDefault();
                onClose()}}
            >X</button>
                <div className="bg-white p-2 rounded-3xl">
                    {children}
                </div>
            </div>
        </div>
    )
}
export default Modal;