import { Route, Routes } from "react-router-dom"
import { About } from './Pages/About.jsx';
import { Home } from './Pages/Homepage.jsx';
import { Products } from './Pages/Products.jsx';
import { ContactUs } from './Pages/ContactUs.jsx';
import { Login_SignUp } from './Pages/Login_Signup.jsx'
import {Admin} from './Pages/Admin.jsx'
import './Styles.css'


export const Paths = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/About" element={<About />} />
      <Route path="/Products" element={<Products />} />
      <Route path="/Products/:search" element={<Products />} />
      <Route path="/ContactUs" element={<ContactUs />} />
      <Route path="/Login_SignUp" element={<Login_SignUp />} />
      <Route path="/Admin" element={<Admin />} />

    </Routes>
  )
}

export default Routes