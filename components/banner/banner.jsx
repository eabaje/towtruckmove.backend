import React from "react";
import { SIGN_UP, LOG_IN } from "../../constants";

function Banner() {
  return (
    <div>
      <section id="banner">
        <div className="container-fluid">
          <div className="row">
            <div
              id="rev_slider_1_1_wrapper"
              className="rev_slider_wrapper fullwidthbanner-container"
              style={{
                margin: "0px auto",
                "background-color": "#E9E9E9",
                padding: "0px",
                "margin-top": "0px",
                "margin-bottom": "0px",
                "max-height": "550px",
              }}
            >
              <div
                id="rev_slider_1_1"
                className="rev_slider fullwidthabanner"
                style={{
                  display: "none",
                  "max-height": "550px",
                  height: "550px",
                }}
              >
                <ul>
                  <li
                    data-transition="slideoverright"
                    data-slotamount="7"
                    data-masterspeed="300"
                    data-thumb="images/slider_1.jpg"
                    data-saveperformance="off"
                    data-title="Slide"
                  >
                    <img
                      src="images/slider_1.jpg"
                      alt="portfolio-6-1140x760"
                      data-bgposition="center center"
                      data-bgfit="cover"
                      data-bgrepeat="no-repeat"
                    />

                    <div
                      className="tp-caption large_bold_black sft tp-resizeme"
                      data-x="88"
                      data-y="100"
                      data-speed="300"
                      data-start="500"
                      data-easing="Power3.easeInOut"
                      data-splitin="none"
                      data-splitout="none"
                      data-elementdelay="0.1"
                      data-endelementdelay="0.1"
                      data-endspeed="300"
                      style={{
                        "z-index": "5",
                        "max-width": "auto",
                        "max-height": "auto",
                        "white-space": "nowrap",
                      }}
                    >
                      Welcome to
                    </div>

                    <div
                      className="tp-caption smalltext sfr tp-resizeme"
                      data-x="88"
                      data-y="170"
                      data-speed="300"
                      data-start="500"
                      data-easing="Power3.easeInOut"
                      data-splitin="none"
                      data-splitout="none"
                      data-elementdelay="0.1"
                      data-endelementdelay="0.1"
                      data-endspeed="300"
                      style={{
                        "z-index": "7",
                        "max-width": "auto",
                        "max-height": "auto",
                        "white-space": "nowrap",
                      }}
                    >
                      LoadDispatch
                    </div>

                    <div
                      className="tp-caption medium_text sfr tp-resizeme"
                      data-x="88"
                      data-y="280"
                      data-speed="300"
                      data-start="500"
                      data-easing="Power3.easeInOut"
                      data-splitin="none"
                      data-splitout="none"
                      data-elementdelay="0.1"
                      data-endelementdelay="0.1"
                      data-endspeed="300"
                      style={{
                        "z-index": "7",
                        "max-width": "auto",
                        "max-height": "auto",
                        "white-space": "nowrap",
                      }}
                    >
                      Your hub connector to Carrier Onboarding Services.
                      <br />
                    </div>

                    <div
                      className="tp-caption medium_text sfb tp-resizeme"
                      data-x="88"
                      data-y="380"
                      data-speed="300"
                      data-start="500"
                      data-easing="Sine.easeInOut"
                      data-splitin="none"
                      data-splitout="none"
                      data-elementdelay="0.1"
                      data-endelementdelay="0.1"
                      data-endspeed="300"
                      style={{
                        "z-index": "6",
                        "max-width": "auto",
                        "max-height": "auto",
                        "white-space": "nowrap",
                      }}
                    >
                      <a
                        href={SIGN_UP}
                        className="sppb-btn sppb-btn-default sppb-btn-"
                      >
                        Sign Up
                      </a>
                    </div>

                    <div
                      className="tp-caption medium_text sfb tp-resizeme"
                      data-x="244"
                      data-y="380"
                      data-speed="300"
                      data-start="500"
                      data-easing="Sine.easeInOut"
                      data-splitin="none"
                      data-splitout="none"
                      data-elementdelay="0.1"
                      data-endelementdelay="0.1"
                      data-endspeed="300"
                      style={{
                        "z-index": "8",
                        "max-width": "auto",
                        "max-height": "auto",
                        "white-space": "nowrap",
                      }}
                    >
                      <a
                        href={LOG_IN}
                        className="sppb-btn sppb-btn-primary sppb-btn-"
                      >
                        Read more
                      </a>
                    </div>
                  </li>

                  <li
                    data-transition="slideoverright"
                    data-slotamount="7"
                    data-masterspeed="300"
                    data-thumb="images/slide01.jpg"
                    data-saveperformance="off"
                    data-title="Slide"
                  >
                    <img
                      src="images/slide01.jpg"
                      alt="fullscreen3"
                      data-bgposition="center bottom"
                      data-bgfit="cover"
                      data-bgrepeat="no-repeat"
                    />

                    <div
                      className="tp-caption large_bold_black sft tp-resizeme"
                      data-x="88"
                      data-y="100"
                      data-speed="300"
                      data-start="500"
                      data-easing="Power3.easeInOut"
                      data-splitin="none"
                      data-splitout="none"
                      data-elementdelay="0.1"
                      data-endelementdelay="0.1"
                      data-endspeed="300"
                      style={{
                        "z-index": "5",
                        "max-width": "auto",
                        "max-height": "auto",
                        "white-space": "nowrap",
                      }}
                    >
                      We Believe in
                    </div>

                    <div
                      className="tp-caption smalltext sfr tp-resizeme"
                      data-x="88"
                      data-y="160"
                      data-speed="300"
                      data-start="500"
                      data-easing="Power3.easeInOut"
                      data-splitin="none"
                      data-splitout="none"
                      data-elementdelay="0.1"
                      data-endelementdelay="0.1"
                      data-endspeed="300"
                      style={{
                        "z-index": "7",
                        "max-width": "auto",
                        "max-height": "auto",
                        "white-space": "nowrap",
                      }}
                    >
                      Safe Transport
                    </div>

                    <div
                      className="tp-caption medium_text sfr tp-resizeme"
                      data-x="88"
                      data-y="280"
                      data-speed="300"
                      data-start="500"
                      data-easing="Power3.easeInOut"
                      data-splitin="none"
                      data-splitout="none"
                      data-elementdelay="0.1"
                      data-endelementdelay="0.1"
                      data-endspeed="300"
                      style={{
                        "z-index": "7",
                        "max-width": "auto",
                        "max-height": "auto",
                        "white-space": "nowrap",
                      }}
                    >
                      we work to ensure safe delivery of your cargo <br />
                    </div>

                    <div
                      className="tp-caption medium_text sfb tp-resizeme"
                      data-x="88"
                      data-y="380"
                      data-speed="300"
                      data-start="500"
                      data-easing="Sine.easeInOut"
                      data-splitin="none"
                      data-splitout="none"
                      data-elementdelay="0.1"
                      data-endelementdelay="0.1"
                      data-endspeed="300"
                      style={{
                        "z-index": "6",
                        "max-width": "auto",
                        "max-height": "auto",
                        "white-space": "nowrap",
                      }}
                    >
                      <a
                        href={SIGN_UP}
                        className="sppb-btn sppb-btn-default sppb-btn-"
                      >
                        Sign Up
                      </a>
                    </div>

                    <div
                      className="tp-caption medium_text sfb tp-resizeme"
                      data-x="244"
                      data-y="380"
                      data-speed="300"
                      data-start="500"
                      data-easing="Sine.easeInOut"
                      data-splitin="none"
                      data-splitout="none"
                      data-elementdelay="0.1"
                      data-endelementdelay="0.1"
                      data-endspeed="300"
                      style={{
                        "z-index": "8",
                        "max-width": "auto",
                        "max-height": "auto",
                        "white-space": "nowrap",
                      }}
                    >
                      <a href="#" className="sppb-btn sppb-btn-primary sppb-btn-">
                        Read more
                      </a>
                    </div>
                  </li>

                  <li
                    data-transition="slideoverright"
                    data-slotamount="7"
                    data-masterspeed="300"
                    data-thumb="images/slider1v3.jpg"
                    data-saveperformance="off"
                    data-title="Slide"
                  >
                    <img
                      src="images/slider1v3.jpg"
                      alt="shutterstock_9053485"
                      data-bgposition="center center"
                      data-bgfit="cover"
                      data-bgrepeat="no-repeat"
                    />

                    <div
                      className="tp-caption large_bold_black sft tp-resizeme"
                      data-x="88"
                      data-y="100"
                      data-speed="300"
                      data-start="500"
                      data-easing="Power3.easeInOut"
                      data-splitin="none"
                      data-splitout="none"
                      data-elementdelay="0.1"
                      data-endelementdelay="0.1"
                      data-endspeed="300"
                      style={{
                        "z-index": "5",
                        "max-width": "auto",
                        "max-height": "auto",
                        "white-space": "nowrap",
                      }}
                    >
                      We Care
                    </div>

                    <div
                      className="tp-caption smalltext sfr tp-resizeme"
                      data-x="88"
                      data-y="160"
                      data-speed="300"
                      data-start="500"
                      data-easing="Power3.easeInOut"
                      data-splitin="none"
                      data-splitout="none"
                      data-elementdelay="0.1"
                      data-endelementdelay="0.1"
                      data-endspeed="300"
                      style={{
                        "z-index": "7",
                        "max-width": "auto",
                        "max-height": "auto",
                        "white-space": "nowrap",
                      }}
                    >
                      Your Cargo
                    </div>

                    <div
                      className="tp-caption medium_text sfr tp-resizeme"
                      data-x="88"
                      data-y="280"
                      data-speed="300"
                      data-start="500"
                      data-easing="Power3.easeInOut"
                      data-splitin="none"
                      data-splitout="none"
                      data-elementdelay="0.1"
                      data-endelementdelay="0.1"
                      data-endspeed="300"
                      style={{
                        "z-index": "7",
                        "max-width": "auto",
                        "max-height": "auto",
                        "white-space": "nowrap",
                      }}
                    >
                      We place high premium on cargo delivery.{" "}
                    </div>

                    <div
                      className="tp-caption medium_text sfb tp-resizeme"
                      data-x="88"
                      data-y="380"
                      data-speed="300"
                      data-start="500"
                      data-easing="Sine.easeInOut"
                      data-splitin="none"
                      data-splitout="none"
                      data-elementdelay="0.1"
                      data-endelementdelay="0.1"
                      data-endspeed="300"
                      style={{
                        "z-index": "6",
                        "max-width": "auto",
                        "max-height": "auto",
                        "white-space": "nowrap",
                      }}
                    >
                      <a
                        href={SIGN_UP}
                        className="sppb-btn sppb-btn-default sppb-btn-"
                      >
                        Sign Up
                      </a>
                    </div>

                    <div
                      className="tp-caption medium_text sfb tp-resizeme"
                      data-x="244"
                      data-y="380"
                      data-speed="300"
                      data-start="500"
                      data-easing="Sine.easeInOut"
                      data-splitin="none"
                      data-splitout="none"
                      data-elementdelay="0.1"
                      data-endelementdelay="0.1"
                      data-endspeed="300"
                      style={{
                        "z-index": "8",
                        "max-width": "auto",
                        "max-height": "auto",
                        "white-space": "nowrap",
                      }}
                    >
                      <a href="#" className="sppb-btn sppb-btn-primary sppb-btn-">
                        Read more
                      </a>
                    </div>
                  </li>
                </ul>
                <div className="tp-bannertimer"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Banner;
