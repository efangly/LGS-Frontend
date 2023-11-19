/* eslint-disable */
import { FC } from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FaRobot, FaQrcode } from "react-icons/fa";

const NavigationBar: FC = () => {
  return (
    <Navbar className='bg-nav px-3 py-0 mb-1' collapseOnSelect expand="md" variant="dark" sticky="top">
      <Link to="/" className='navbar-brand d-flex align-items-center'>
        <FaRobot className='me-2' size={44} /> LGS TestTools
      </Link>
      <Link className='btn btn-box' to="/qr"><FaQrcode size={34} /></Link> 
    </Navbar>
  );
}

export default NavigationBar;