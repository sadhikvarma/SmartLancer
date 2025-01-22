import './App.css'
import './index.css'; 
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Home from './Components/Home';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';
import DashBoard from './Components/DashBoard';
import Payment from './Components/Payment';
import Contact from './Components/Contact';
import Chatbot from './Components/Chatbot';
function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/forgotpassword" element={<ForgotPassword/>} />
          <Route path="/resetpassword/:token" element={<ResetPassword/>} />
          <Route path="/dashboard" element={<DashBoard/>} />
          <Route path="/contact" element={<Contact/>} />          
          <Route path = "/ask" element={<Chatbot/>}/>
          {/* <Route path = "/payment"> element={<Payment/>}</Route> */}
        </Routes>
      </BrowserRouter>
  )
}

export default App
