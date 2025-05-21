import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function RefreshHandler({ setIsAuth }) {
  const location = useLocation();
  const navigate = useNavigate();


   useEffect(()=>{
      if(localStorage.getItem('username')){
          setIsAuth(true);
          if(location.pathname === '/' ||  location.pathname === '/login'){
            navigate('/Chatpage',{replace:false})
          }
      }
    },[location,navigate,setIsAuth])

   return (
    null 
  )
}
