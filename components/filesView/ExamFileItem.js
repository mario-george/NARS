import React from 'react'


import InsertDriveFileRounded from '@mui/icons-material/InsertDriveFileRounded'

const ExamFileItem = ({title,caption,id}) => {
    return (
        <div className='fileItem '>
            <a href={`${process.env.url}api/v1/courses/exams/${id}`} target="_blank" download>
                <div className="fileItem--left" title='Click here to dowload the file'>
                    <InsertDriveFileRounded />
                    <p>{title}</p>
                </div>
                <div className="fileItem--right">
                <p>{caption}</p>
            </div>
            </a>
        </div>
    )
}

export default ExamFileItem
