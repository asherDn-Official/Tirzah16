import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import "../CSS/About.css";
import API_URL from "./Global";
const About = () => {
  const [aboutUsData, setAboutUsData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 900 });
    fetchAboutUsDetails();
  }, []);

  const fetchAboutUsDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/aboutUs`);
      setAboutUsData(response.data);
    } catch (error) {
      console.error("Error fetching home details:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // return <div>Hello</div>;

  return (
    <div className="mEDIAoFTHaboutssection">
      <div className="abourtSectionDivWidth">
        {/* <!---------------------About Page Starts-------------------------> */}
        <div>
          {/* <!------------------ Who We Are,-------------> */}
          <div className="WhoWeAredivbgcolour">
            <div className="WhoWeArediv">
              <div className="WhoWeAredivflex1">
                <div className="WhoWeAredivtext1">Who We Are,</div>
                <div className="WhoWeAredivtext2">
                  Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  vulputate libero et velit interdum, ac aliquet odio mattis.
                  className aptent taciti sociosqu ad litora torquent per
                  conubia nostra, per inceptos himenaeos. Curabitur tempus urna
                  at turpis condimentum lobortis. Ut commodo efficitur neque. Ut
                  diam quam, semper iaculis condimentum ac, vestibulum eu nisl.
                </div>
              </div>
              <div className="WhoWeAredivflex2">
                <img
                  data-aos="flip-down"
                  src={aboutUsData.aboutUsImage}
                  alt=""
                />
              </div>
            </div>
          </div>
          {/* <!------------------ Who We Are,------------->
          <!------------------ mission and vision-------------> */}
          <div>
            <div>
              <div className="missionandvisionflexdiv">
                <div className="item">
                  <div className="ourmissiondiv">
                    <div className="ourmissionflexdiv">
                      <div className="missionheadings">OUR MISSION</div>
                      <div className="missionimagesdiv">
                        <img src="/images/clarity_bullseye-line.png" alt="" />
                      </div>
                      <div className="missioncontetts">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nunc vulputate libero et velit interdum, ac aliquet odio
                        mattis.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className="ourvissiondiv">
                    <div className="ourvissionflexdiv">
                      <div className="vissionheadings">OUR MISSION</div>
                      <div className="vissionimagesdiv">
                        <img src="/images/lucide_view.png" alt="" />
                      </div>
                      <div className="vissioncontetts">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nunc vulputate libero et velit interdum, ac aliquet odio
                        mattis.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!------------------ mission and vision-------------> */}
          {/* <!------------------About Image-------------> */}
          <div>
            <div className="AboutImagediv" data-aos="fade-up">
              <img
                className="MobilehIDEaBOUTiMAGEDIV"
                src="/images/AboutPageimage.png"
                alt=""
              />
              <img
                className="dESKTOPShIDEaBOUTiMAGEDIV"
                src="/images/aBOUTiMAGEdIV.png"
                alt=""
              />
            </div>
          </div>
          {/* <!------------------About Image-------------> */}
          {/* <!-----------------Our Team Section Pages-------------> */}
          <div className="MainSeconsgfjwidthaboutydf">
            <div className="MainmediaaboutSectionDiv">
              <div className="dispflayFlexfoerthemainabvosuddiv">
                <div>
                  <div className="OurTeamSectiojkss">Our Team</div>
                  <div className="Aboutsectiondiivcontenet">
                    At Tirzah Construction, our team of engineers and architects
                    is committed to excellence in every project. With a passion
                    for innovation, we bring creativity and dedication to every
                    endeavor. Backed by our expertise, we deliver high-quality
                    results that exceed expectations. Trust us to handle your
                    construction needs with professionalism and precision,
                    ensuring satisfaction at every step.
                  </div>
                </div>
                <div>
                  <div className="ScreenDIsplayforImagees">
                    <div className="newImageoftheAboutSectiondiv3213">
                      <img src={aboutUsData.chairmanImage} alt="" />
                    </div>

                    <div className="PositsbasolsutesIDmf" data-aos="fade-up">
                      <img src="./images/Rectangle 242.png" alt="" />
                    </div>

                    <div className="NameoftheBaoutUserAsbolsute">
                      {aboutUsData.chairmanName}
                    </div>
                    <div className="NameoftheBaoutWorkingsAsbolsute">
                      {aboutUsData.chairmanDesignation}
                    </div>
                    <div className="NameoftheYeasarsngsAsbolsute">
                      {aboutUsData.chairmanExperience}+ Years of Experience
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <div>
                    <div className="ScreenDIsplayforFlexxs">
                      {/* {console.log("Aboutus", aboutUsData)} */}
                      {aboutUsData &&
                        aboutUsData.team &&
                        aboutUsData.team.map((team, index) => (
                          <div
                            key={index} // You should use a unique identifier from your data, like team.id, if available
                            className="ScreenDIsplayforImagees1"

                            // data-aos="flip-left"
                          >
                            <div className="ImageofthemAINDIVD">
                              <img src={team.teamImage} alt="" />
                            </div>
                            <div className="PositsbasolsutesIDmf1">
                              <img
                                // src={team.teamImage}
                                src="/images/Rectangle 242.png"
                                alt=""
                              />
                            </div>
                            <div className="NameoftheBaoutUserAsbolsute1">
                              {team.teamName}
                            </div>
                            <div className="NameoftheBaoutWorkingsAsbolsute1">
                              {team.teamDesignation}
                            </div>
                            <div className="NameoftheYeasarsngsAsbolsute1">
                              {team.teamExperience}+ Years of Experience
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-----------------Our Team Section Pages-------------> */}
        </div>
        {/* <!---------------------About Page Starts-------------------------> */}
      </div>
    </div>
  );
};
export default About;
