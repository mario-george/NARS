import React from "react";
const LoginModal = ({isVisible,children}) => {
    if(!isVisible) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm 
        flex justify-center item-center"id="wrapper">
            <div className="w-[600px] flex flex-col justify-center item-center">
                <div className="bg-white p-2 rounded-3xl">
                    {children}
                </div>
            </div>
        </div>
    )
}
export default LoginModal;