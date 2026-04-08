import React from 'react'
import './Footer.css'
import logo from '../assets/logo.png'

import { FaInstagram, FaPinterest, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='footer'>

      <div className='footer-logo'>
        <img src={logo} alt="DeaShop" />
        <p>MongoShop</p>
      </div>
      <ul className='footer-links'>
        <li>Kompania</li>
        <li>Produktet</li>
        <li>Zyrat</li>
        <li>Rreth nesh</li>
        <li>Kontakt</li>
      </ul>
      <div className='footer-social-icon'>

        <div className='footer-icons-container'>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram size={22} />
          </a>
        </div>

        <div className='footer-icons-container'>
          <a href="https://pinterest.com" target="_blank" rel="noreferrer">
            <FaPinterest size={22} />
          </a>
        </div>

        <div className='footer-icons-container'>
          <a href="https://wa.me/" target="_blank" rel="noreferrer">
            <FaWhatsapp size={22} />
          </a>
        </div>

      </div>
      <div className='footer-copyright'>
        <hr />
        <p>Copyright © 2026 - All Rights Reserved</p>
      </div>

    </div>
  )
}

export default Footer