import React,{useState} from 'react'
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import InsertDriveFileRounded from '@mui/icons-material/InsertDriveFileRounded'

const PdfFileCard = ({ name, id ,cookies,setBlobIsFound,downloadPdf}) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const pdfFile = `${process.env.url}api/v1/courses/exams/63ffebc34bef8c7adbf0b482`
    const file = '../../media/ECE312C Control Systems (1) Course Specs 221CBL.pdf'
    //const [counter, setCounter] = React.useState(0);
    const handleView = () => {

    };
    const handleUpdate = async () => {
        try {
            setBlobIsFound(false)
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className=' -px-[12rem]  flex flex-col space-y-4 items-center justify-center'>
            <div className="  " onClick={handleView}>
                <InsertDriveFileRounded className='text-zinc-600' style={{ fontSize: 200}} />

            </div>

            <div className=" ">
                <p>{name}</p>
            </div>
            <button class="flex justify-center align-center bg-zinc-600 hover:bg-red-900 
            text-white font-bold py-2 px-4 rounded-full  w-32 h-10"
                onClick={handleUpdate}>
                Update
            </button>
            <button
              class="  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={downloadPdf}
            >
              Download PDF
            </button>
        </div>

    )
}

export default PdfFileCard
