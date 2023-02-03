import ListLink from '../row/ListLink';
import Titile from '../row/Titile';
import Logout from '../row/Logout';



const Side = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-48 m-2 flex flex-col bg-gray-100 drop-shadow-xl ">
    
      <ListLink asvg="../svgs/profile.svg" title={'Profile'} subtitiles = {['profile details', '']} />
      <ListLink asvg="../svgs/teacher.svg" title={'Courses'} subtitiles = {[['Course 1', ''], ['Course 2', '']]} />
      <ListLink asvg="../svgs/teacher.svg" title={'Program'} subtitiles = {[['PRogram 1', ''], ['Program 2', '']]} />
      <Titile asvg="../svgs/plus.svg" title={'Add Program'} url="" />
      <Titile asvg="../svgs/plus.svg" title={'Add User'} url="" />

      <Logout />
    </div>
  )
};


export default Side;