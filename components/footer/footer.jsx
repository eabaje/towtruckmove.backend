import React from "react";
import FooterUpper from "./footer-upper";
function Footer() {
  return (
    <>
      <FooterUpper />
      <footer id="sp-footer">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-6 small">
              &copy; 2021 Load Dispatch Ltd. All Rights Reserved
            </div>

            <nav id="page-footer-legal-links" className="col-xs-12 col-sm-6">
              <ul className="list-inline small ">
                <li>
                  <a
                    href="/images/pdf/privacyPolicy.pdf?v=1.0"
                    className="color-gray"
                    target="_blank"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>|</li>
                <li>
                  <a href="/term" className="color-gray">
                    Terms of Use
                  </a>
                </li>
                <li>|</li>
                <li>
                  <a href="/contact" className="color-gray">
                    Contact Us
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
