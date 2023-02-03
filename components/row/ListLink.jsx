import SubTitile from './SubTitile';

const ListLink = ({ title, subtitiles=[], asvg }) => {
  return (
    <div className = 'group flex flex-col text-xl m-2 align-middle'>
      <div className='flex hover:text-green-400'>
        <img src={asvg} alt="Your SVG" className='w-8 mr-4' />
        {title}

        {subtitiles ? <img src="./src/svgs/arrow.svg" alt="Your SVG" className='w-4 ml-2 group-hover:rotate-90' /> : <></>}
      </div>

      <div className='flex flex-col'>
        {subtitiles.map((a) => (<SubTitile subtitile={a[0]} url={a[1]}/>))}
      </div>
      
    </div>
  )
}

export default ListLink;