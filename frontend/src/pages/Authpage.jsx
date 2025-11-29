import React,
{
useEffect} from 'react'
import Signup from '../components/Signup'
import Login from '../components/Login'
const Authpage = ({user ,setUser}) => {
const [login,setlogin]=React.useState(true)
useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  return (
    <div>
      {login?<Login setUser={setUser} setlogin={setlogin}/>:<Signup setUser={setUser} setlogin={setlogin} />}
    </div>
  )
}

export default Authpage

