import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      <hr className="mt-6" />
      <footer className="footer footer-horizontal footer-center gap-4 py-6 text-base-content rounded">
        <nav className="grid grid-flow-col gap-4">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/profile">Update Profile</Link>
          <Link to="">Press kit</Link>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-4 text-xl">
            <a
              href="https://github.com/Rajatchauhan9690"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github"></i>
            </a>

            <a
              href="https://www.linkedin.com/in/rajat-chauhan-58801a24b/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin"></i>
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter"></i>
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-youtube"></i>
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook"></i>
            </a>
          </div>
        </nav>
        <aside>
          <p>Copyright © 2024 - All right reserved by ACME Industries Ltd</p>
        </aside>
      </footer>
    </div>
  );
}

export default Footer;
