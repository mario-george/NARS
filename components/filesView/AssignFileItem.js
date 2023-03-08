import React from 'react'


import InsertDriveFileRounded from '@mui/icons-material/InsertDriveFileRounded'

const AssignFileItem = ({name,id,dueTo}) => {
    return (
        <div className='fileItem '>
            <a href={`${process.env.url}api/v1/courses/assignment/${id}`} target="_blank" download>
                <div className="fileItem--left" title='Click here to dowload the file'>
                    <InsertDriveFileRounded />
                    <p>{name}</p>
                </div>
                <div className="fileItem--right">
                <p>{dueTo}</p>
            </div>
            </a>
        </div>
    )
}

export default AssignFileItem
