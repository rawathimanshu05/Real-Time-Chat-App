import { useState } from 'react';
import {Routes,Route,Navigate} from 'react-router-dom';
import Loginpage from './Components/Loginpage';
import Chatpage from './Components/Chatpage';
import RefreshHandler from './Rerfreshhandler';

function App() {

    const [isAuth, setIsAuth] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuth ? element : <Navigate to="/login" />;
  };


  return (
    <> 
    <RefreshHandler setIsAuth={setIsAuth} />
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Loginpage />} />
      <Route path="/Chatpage" element={<PrivateRoute element={<Chatpage />} />}  />
    </Routes>
    </>
  );
}

export default App;
