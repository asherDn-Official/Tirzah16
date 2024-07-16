import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import jQuery from "jquery";
// importing aos
import AOS from "aos";
import "aos/dist/aos.css";
import "../CSS/Home.css";
import API_URL from "./Global";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Home() {
  const [homeVariables, setHomeVariables] = useState({});
  // const [serviceData, setServiceData] = useState();
  const [workData, setWorkData] = useState();
  const Navigate = useNavigate();
  useEffect(() => {
    fetchHomeDetails();
    // fetchServices();
    fetchWork();
  }, [workData]);

  const fetchHomeDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/home`);
      setHomeVariables(response.data);
    } catch (error) {
      console.error("Error fetching home details:", error);
    }
  };
  const fetchWork = async () => {
    try {
      const sendData = "all";
      const response = await axios.get(`${API_URL}/service/works/${sendData}`);
      setWorkData(response.data);
    } catch (error) {
      console.error("Error fetching work details:", error);
    }
  };

  // const fetchServices = async () => {
  //   try {
  //     const response = await axios.get(`${API_URL}/service`);
  //     setServiceData(response.data.service);
  //   } catch (error) {
  //     console.error("Error fetching services:", error);
  //   }
  // };

  // const HandleIndividualService = async (id) => {
  //   Navigate(`/Services/${id}`);
  // };
  const HandleIndividualWork = async (id) => {
    Navigate(`/Works/${id}`);
  };
  const handleServicesPage = async (id) => {
    // Navigate(`/OurService`);
  };
  const handleWorksPage = async (id) => {
    // Navigate(`/OurWORKS`);
  };
  const handleAboutPage = async (id) => {
    // Navigate(`/About`);
  };
  const handleContactPage = async (id) => {
    // Navigate(`/ContactUs`);
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div>
      <div className=" mEDIAoFTHWEhOMEsection">
        <div className="HomeSectionDivWidth">
          <div className="TirxahHomePagedathideimage">
            <img src="/images/TirzahMobieswecvdbjsdf.png" alt="TirzahImage" />
          </div>
          {/* <!-------------------Homepage First Section---------------------> */}
          <div>
            <div className="HoemnPAgefirstsectionimage">
              <div className="homefirstsecronimagefkex">
                <div className="homepagefirstsectiondivflex">
                  <div className="mainhiomepagedics">
                    <div
                      className="TirzahConstruction"
                      onClick={handleContactPage}
                    >
                      Tirzah Construction
                    </div>
                    <div className="WeBuildYour">We Build Your Imagination</div>
                  </div>
                  <div className="InnovatemaindivsZ">
                    {/* <!-- <div className="Innovate">Innovate</div> --> */}
                    <div className="contentXZXZXZXZX">
                      <div className="content__container">
                        <ul className="textanimationssHomePage">
                          <li className="textanimationssHomePage__item">
                            Innovate
                          </li>
                          <li className="textanimationssHomePage__item">
                            Construct
                          </li>
                          <li className="textanimationssHomePage__item">
                            Envision
                          </li>
                          <li className="textanimationssHomePage__item">
                            Innovate
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-------------------Homepage First Section--------------------->

        <!-------------------Homepage Second Section---------------------> */}
          <div className="seconsdecstionmaindivwithbackground">
            <div className="Miansectiiojndjbdfhjfdif">
              <div className="HOmepageaboutsectionflexz">
                <div className="homebaoutdivlefst" data-aos="slide-up">
                  <div>
                    <div
                      className="HomeAboutsection1"
                      onClick={handleAboutPage}
                    >
                      About Us
                    </div>
                  </div>
                  <div className="HomeAboutContenet1">
                    Registered in 2023, Tirzah Construction is a versatile
                    company dedicated to new construction and renovation
                    endeavors. Our mastery in space transformation, meticulous
                    attention to detail, and dedication to surpassing client
                    expectations define our approach. Through innovative
                    solutions and client-centered collaboration, we actualize
                    distinctive visions, crafting architectural legacies across
                    diverse project scopes, from economical to luxury.
                  </div>
                </div>
                <div className="AboutSectionimgs">
                  <img src={homeVariables.aboutUsImage} alt="" />
                </div>
              </div>

              <div className="icosnshomepagedivflex" data-aos="fade-up">
                <div className="homeaboutsecferlxbox">
                  <div className="firsthomedivgreen">
                    <div
                      className="stat-number"
                      data-n={String(homeVariables.experienceCount)}
                    >
                      {String(homeVariables.experienceCount)}
                    </div>
                  </div>
                  <div className="YearsInfield">Years</div>
                </div>
                <div className="homeaboutsecferlxbox">
                  <div className="firsthomedivgreen">
                    <div
                      className="stat-number"
                      data-n={homeVariables.clientsCount}
                    >
                      {homeVariables.clientsCount}
                    </div>
                  </div>
                  <div className="YearsInfield">Clients</div>
                </div>
                <div className="homeaboutsecferlxbox">
                  <div className="firsthomedivgreen">
                    <div
                      className="stat-number"
                      data-n={homeVariables.projectsCount}
                    >
                      {homeVariables.projectsCount}
                    </div>
                  </div>
                  <div className="YearsInfield">Projects</div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-------------------Homepage Second Section--------------------->
        <!-------------------Homepage Third Section---------------------> */}
          <div className="HomepageThirdSection">
            <div>
              <div className="OurExcellentServicesflexx">
                <span
                  className="OurExcellentServices"
                  onClick={handleServicesPage}
                >
                  Our Excellent Services
                </span>
              </div>

              <div className="HoamepageMainDivmaindlejnx">
                <div className="Widfthcontrolhome">
                  <div className="homeflexwarapflex">
                    <div
                      className="homesectionPageOurservicePage"
                      data-aos="zoom-in-down"
                    >
                      {homeVariables.service &&
                        homeVariables.service.map((service) => (
                          <div key={service._id}>
                            {/* Assuming each service has a unique identifier */}
                            <section className="section-6">
                              <div className="rowssss">
                                <figure className="figure">
                                  <img
                                    src={service.serviceImage}
                                    alt={service.serviceName}
                                  />

                                  <figcaption>
                                    <h3
                                    // style={{ cursor: "pointer" }}
                                    // onClick={() =>
                                    //   HandleIndividualService(service._id)
                                    // }
                                    >
                                      {service.serviceName}
                                    </h3>
                                  </figcaption>
                                </figure>
                              </div>
                            </section>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-------------------Homepage Third Section---------------------> */}
          {/*
        <!-------------------Homepage Section Our Projects---------------------> */}
          <div className="ourProkctsSectionbackgoundcolor">
            <div>
              <div>
                <div className="ourProjectsSectionds" onClick={handleWorksPage}>
                  Our Projects
                </div>
                <div>
                  <div className="foursectionImagediflex" data-aos="slide-up">
                    {homeVariables &&
                      homeVariables.project &&
                      homeVariables.project.map((work, index) => (
                        <div
                          className="imagesectionsdivforfoursectionimg"
                          key={index}
                        >
                          <div className="dtl08">
                            <img src={work.projectImage} alt="" />
                            <div className="HelloTextHomePage">
                              {work.projectName}
                            </div>
                            <div
                              className="dtl"
                              onClick={() => {
                                HandleIndividualWork(work.projectId);
                              }}
                            >
                              {/* {console.log(`work ${index}`, work)} */}
                              <h3>{work.projectName}</h3>
                              <h5 className="MofularKitchesnfonts">
                                {work.serviceName}
                              </h5>
                              <p>{work.projectText}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="ClientFeedback">Client Feedback</div>
          </div>
          {/* <!-------------------Homepage Section Our Projects--------------------->

        <!-------------------Client Feedback Section---------------------> */}

          <div className="FGeebacvjdfghnjehbfcd">
            <div className="FeebacksectionMaindevifwidth">
              <div className="carouslBackgoundcolour">
                <Carousel responsive={responsive}>
                  {homeVariables &&
                    homeVariables.feedback &&
                    homeVariables.feedback.map((feedback) => (
                      <div
                        key={feedback._id}
                        className="maincardsectiondivMarginLfsyhb"
                      >
                        <div className="feedbacsjimagesectionpostions">
                          <div>
                            <img
                              className="doubleQoutesIMagetopsection"
                              src="/images/ri_double-quotes-r.png"
                              alt=""
                            />
                          </div>
                          <div>
                            <div className="FlexCardDivsize">
                              <div className="NameoftheclientSection">
                                {feedback.feedbackName}
                              </div>
                              <div className="contenetoftheFeedbacker">
                                {feedback.feedbackText}
                              </div>
                              <div className="homepagepostionuserabsolutes">
                                <img
                                  className="imageofthefeedbacker"
                                  src={feedback.feedbackImage}
                                  alt="InternetIsWeakToLoadTheImage"
                                />
                              </div>
                            </div>
                          </div>
                          <div>
                            <img
                              className="doubleQoutesIMagebottomsection"
                              src="/images/ri_double-quotes-r (1).png"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  <div></div>
                  <div></div>
                  <div></div>
                </Carousel>
              </div>
            </div>
          </div>

          {/* <!-------------------Client Feedback Section---------------------> */}
        </div>
      </div>
    </div>
  );
}
AOS.init({
  duration: 900,
});

$(document).ready(function () {
  $(window).load(function () {
    $("#loadOverlay").fadeOut("slow");
  });
});

$(function () {
  var fx = function fx() {
    $(".stat-number").each(function (i, el) {
      var data = parseInt(this.dataset.n, 10);
      var props = {
        from: {
          count: 0,
        },
        to: {
          count: data,
        },
      };
      $(props.from).animate(props.to, {
        duration: 1200 * 1,
        step: function (now, fx) {
          $(el).text(Math.ceil(now));
        },
        complete: function () {
          if (el.dataset.sym !== undefined) {
            el.textContent = el.textContent.concat(el.dataset.sym);
          }
        },
      });
    });
  };

  var reset = function reset() {
    //console.log($(this).scrollTop())
    if ($(this).scrollTop() > 800) {
      $(this).off("scroll");
      fx();
    }
  };

  $(window).on("scroll", reset);
});

jQuery.fn.load = function (callback) {
  var el = $(this);

  el.on("load", callback);

  return el;
};

export default Home;
