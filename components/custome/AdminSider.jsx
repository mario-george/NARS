import ListLink from '../row/ListLink';
import Titile from '../row/Titile';
import Logout from '../row/Logout';



const Side = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-48 m-2 flex flex-col bg-gray-100 drop-shadow-xl ">
    
      <ListLink asvg="../svgs/profile.svg" title={'Profile'} subtitiles = {['profile details', '']} />
      <ListLink asvg="../svgs/teacher.svg" title={'Courses'} subtitiles = {[['Course 1', ''], ['Course 2', '']]} />

      <Logout />
    </div>
  )
};


export default Side;