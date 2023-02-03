const Titile= ({ title, asvg, url='' }) => {
  return (
    <a href={url}>
      <div className = 'group flex text-xl m-2 align-middle hover:text-green-400'>
          <img src={asvg} alt="Your SVG" className='w-8 mr-4' />
        {title}
      </div>
    </a>
  )
}

export default Titile;