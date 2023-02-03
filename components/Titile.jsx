const Titile= ({ title, asvg }) => {
    return (
      <div className = 'group flex flex-col text-xl m-2 align-middle hover:text-green-400'>
          <img src={asvg} alt="Your SVG" className='w-8 mr-4' />
        {title}
      </div>
    )
  }
  
  export default Titile;