import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <ul className="footer-nav">
        <li className="footer-nav__item">
          <a
            href="https://www.youtube.com/channel/UChlv4GSd7OQl3js-jkLOnFA"
            target="_blank"
            rel="noreferrer"
            className="footer-nav__link"
          >
            삼프로TV_경제의신과함께
          </a>
        </li>
        <li className="footer-nav__item">
          <a
            href="https://han.gl/VCBAJ"
            target="_blank"
            rel="noreferrer"
            className="footer-nav__link"
          >
            자료 모음 (구글 시트)
          </a>
        </li>
        <li className="footer-nav__item">
          <a
            href="https://github.com/hal-to/hal-to.github.io"
            target="_blank"
            rel="noreferrer"
            className="footer-nav__link"
          >
            소스코드 (Github)
          </a>
        </li>
      </ul>
      <p className="copyright">
        &copy; 2021 삼프로TV_경제의신과함께
      </p>
    </footer>
  );
};

export default Footer;
