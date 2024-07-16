import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import API_URL from "./Global";
import "aos/dist/aos.css";
import "../CSS/3OurServiceOne.css";

function OurServicePageOne() {
  const { serviceId } = useParams();
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const Navigate = useNavigate();
  useEffect(() => {
    async function getIndividualService() {
      try {
        const response = await axios.get(
          `${API_URL}/service/individual/${serviceId}`
        );
        setServiceData(response.data);
      } catch (error) {
        setError("Error fetching service details");
      } finally {
        setLoading(false);
      }
    }

    if (serviceId) {
      getIndividualService();
    }
  }, [serviceId]);
  const HandleIndividualWork = async (id) => {
    Navigate(`/Works/${id}`);
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  // return <div>Hiii</div>;

  return (
    <div className="Ouesecvnjfnasdinfsf">
      <div className="Ouerserviceonewidth">
        {serviceData && (
          <div className="mEDIAoFTOURpAGESEEVSDJBKsection">
            <div className="ourpageserviceDivWidth">
              {/* <!----------------------Service Section 1 New---------------------> */}
              <div className="ServiceSection1NewFlex">
                <div>
                  <img src="images/fluent-mdl2_back.png" alt="" />
                </div>
                <div className="NewBuildingConstructionDynamicS">
                  {serviceData.serviceName}
                </div>
              </div>
              {/* <!----------------------Service Section 1 New--------------------->

        <!----------------------Service Section 2 New---------------------> */}

              <div>
                <div className="firstSectionmaindicvflxs">
                  <div className="imagofthesecondsdervcierdiv">
                    <img src={serviceData.serviceImage} alt="" />
                  </div>
                  <div className="imagofthesecfirstdivvcierdiv">
                    {serviceData.serviceDescription}
                  </div>
                </div>
              </div>

              {/* <!----------------------Service Section 2 New--------------------->

        <!----------------------Service Section 3 New---------------------> */}

              <div>
                <div>
                  <div className="OurProjectsFlexviewss">Our Projects</div>
                </div>
              </div>

              {/* <!----------------------Service Section 3 New---------------------> */}

              <div className="ourtjisjidhgdbdshsdd">
                <div className="OurserviceOnepagewidftghdf">
                  <div className="Ourecriuonpagedlexdiv">
                    {serviceData &&
                      serviceData.works.map((work, index) => (
                        <div
                          key={index}
                          className="OUrServicdepagedicvfelxconctegf"
                        >
                          <div
                            className="Our23Servicepagedivnkdkd12"
                            // onClick={() => HandleIndividualWork(work._id)}
                          >
                            <img
                              className="SizeofthsssaseAboutPAGEiAMEG"
                              src={work.workImage}
                              alt=""
                            />

                            <div className="NAmoftheaboutSection">
                              {work.workName}
                            </div>
                            <div
                              className="zssad22"
                              onClick={() => HandleIndividualWork(work._id)}
                            >
                              <h3>{work.workName}</h3>
                              {/* <!-- <h5>Senior Engineer</h5> --> */}
                              <p>{work.workDescription}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OurServicePageOne;
