import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter
} from "react-icons/fa";
import { getCurrentYear } from "../../helpers";

const Footer = () => {
  return (
    <footer className="footer page-footer">
      <div className="container">
        <ul className="d-flex justify-content-around align-items-center text-center m-0">
          <li>
            <a className="ico-footer facebook" href="https://www.facebook.com/">
              <span className="d-flex align-items-center">
                <FaFacebookF />
                <span className="d-block dis-sm-none pl-1">Facebook</span>
              </span>
            </a>
          </li>
          <li>
            <a
              className="ico-footer instagram"
              href="https://www.instagram.com/"
            >
              <span className="d-flex align-items-center">
                <FaInstagram />
                <span className="d-block dis-sm-none pl-1">Instagram</span>
              </span>
            </a>
          </li>
          <li>
            <a className="ico-footer linkedin" href="https://www.linkedin.com/">
              <span className="d-flex align-items-center">
                <FaLinkedinIn />
                <span className="d-block dis-sm-none pl-1">LinkedinIn</span>
              </span>
            </a>
          </li>
        </ul>
      </div>
      <div className="footer-name"> &#169; {getCurrentYear()} WebStudios</div>
    </footer>
  );
};

export default Footer;