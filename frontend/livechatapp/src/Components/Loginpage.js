import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer } from "react-toastify"
import { showSuccess, showError } from '../Util'
import './Loginpage.css';

function LoginPage() {


  const [data, setdata] = useState({
    username: ""
  })

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()


  function getdata(e) {
    var name = e.target.name
    var value = e.target.value
    setdata((old) => {
      return {
        ...old,
        [name]: value
      }
    })
  }

 async function postdata(e) {
  e.preventDefault();

  const { username } = data;

  if (username === "") {
    showError("Please enter a username");
    return;
  }

  setLoading(true);

  try {
    const url = 'http://localhost:8000/api/login';
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username })
    });

    const result = await response.json();
    const { success, message } = result;

    if (success) {
      showSuccess(message);
      localStorage.setItem("username", username);
      
      setTimeout(() => {
        navigate('/Chatpage');
      }, 1000);
    } else {
      showError(result.message || "Something went wrong");
    }

  } catch (error) {
    showError("An error occurred while logging in");
  } finally {
    setLoading(false);
  }
}


  return (
    <> 
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Live Chat Login</h2>
        <form onSubmit={postdata}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" onChange={getdata} value={data.username} placeholder="Enter your username" autoComplete='off' />

          <button type='submit' disabled={loading}>
            {loading ? 'Join Chat...' : 'Join Chat'}
          </button>
        </form>
      </div>
    </div>
    <ToastContainer />

    </>
  );
}

export default LoginPage;
