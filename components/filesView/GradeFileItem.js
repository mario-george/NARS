import React from "react";

const GradeFileItem = ({ name, fullMark, grade}) => {
    return (
        <div className="fileItem ">
            <span>
                <div className="fileItem--left">
                    <p>{name}</p>
                </div>
                <div className="fileItem--right ">
                    <input
                        type="number"
                        className="w-12 border-1"
                        defaultValue={grade}
                        disabled
                    />
                    <p>/</p>
                    <input
                        type="number"
                        className="w-12"
                        value={fullMark}
                        disabled
                    />
                </div>
            </span>
        </div>
    );
};

export default GradeFileItem;
