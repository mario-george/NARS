import ListLink from '../row/ListLink';
import Titile from '../row/Titile';
import Logout from '../row/Logout';



const Side = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-48 m-2 flex flex-col bg-gray-100 drop-shadow-xl ">
      {arr.map((a) => (<Titile title = {a} asvg="./src/svgs/plus.svg" />))}
      <ListLink asvg="./src/svgs/plus.svg" title={'F'} subtitiles = {['1', '2']} />
    </div>
  )
};


export default Side;