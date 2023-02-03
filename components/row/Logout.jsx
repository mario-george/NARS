import { Link } from "react-router-dom";

const Titile= () => {
  title = "Logout";
  
  return (
    <Link href="">
      <div className = 'group flex text-xl m-2 align-middle hover:text-green-400'>
          <img src="../svgs/logout.svg" alt="Your SVG" className='w-8 mr-4' />
        {title}
      </div>
    </Link>
    )
  }
  
  export default Titile;