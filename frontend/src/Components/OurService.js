import React, { useEffect, useState } from "react";
// importing aos
import AOS from "aos";
import "aos/dist/aos.css";
import "../CSS/OurService.css";
import axios from "axios";
import API_URL from "./Global";
import { useNavigate } from "react-router-dom";

function OurService() {
  const [serviceData, setServiceData] = useState({});
  const Navigate = useNavigate();
  useEffect(() => {
    fetchServices();
  }, [serviceData]);
  const fetchServices = async () => {
    try {
      const response = await axios.get(`${API_URL}/service`);
      setServiceData(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };
  const HandleIndividualService = async (id) => {
    Navigate(`/Services/${id}`);
  };
  // return <div>Hiii</div>;
  return (
    <div>
      <div className="mEDIAoFTHOurSERVICDEsection">
        <div className="oURESERVICESectionDivWidth">
          {/* <!--------------------Service Page First Section-------------> */}
          <div>
            <div className="flexsodthefirstsectin">
              <div className="firstServicesectionflexdfid">
                <div className="SerciveSecndRightMargin">
                  <div className="ServicePageFirstSectionflexdiv">
                    Our Services
                  </div>
                  <div className="ServicePageFirstSectionflexsecons">
                    {serviceData.pageText}
                  </div>
                </div>
                <div
                  className="SercivefistRightMargin"
                  //  data-aos="fade-up"
                >
                  <img src={serviceData.pageImage} alt="" />
                </div>
              </div>
            </div>
          </div>
          {/* <!--------------------Service Page First Section------------->

        <!--------------------Service Page Second Section-------------> */}
          <div className="SecondPageMainDivSections">
            <div className="ServicePageSecondSFlexConcept">
              <div className="ServicePageSecondSection1">
                <div>
                  <div className="OurProcess222">Our Process</div>
                  <div className="OurProceDummyImg">
                    <img src="images/Grou138.png" alt="" />
                  </div>
                </div>
              </div>
              <div className="ServicePageSecondSection2">
                <img src="images/secondIamgeofiamges.png" alt="" />
              </div>
            </div>
          </div>
          {/* <!--------------------Service Page Second Section------------->

        <!--------------------Service Page Third Section-------------> */}

          <div className="ServicePageThirdSectionBGColor">
            <div>
              <div className="OurExcellentServicesThirdSection">
                Our Excellent Services
              </div>
            </div>

            <div className="sfnjrfnncxsswsewqe">
              <div className="Secifehshjdfjfdjasz12">
                <div className="ServiceMaindivflexConecprjdhn">
                  {serviceData &&
                    serviceData.service &&
                    serviceData.service.map((service, index) => (
                      <div key={service._id}>
                        <div
                          className="zssadtl08"
                          // onClick={() => HandleIndividualService(service._id)}
                        >
                          <img
                            className="OneSizeoftheAboutPAGEiAMEG"
                            src={service.serviceImage}
                            alt=""
                          />
                          <div
                            className="zssadtl"
                            onClick={() => HandleIndividualService(service._id)}
                          >
                            <h3>{service.serviceName}</h3>
                            <p>{service.serviceDescription}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* <!--------------------Service Page Third Section-------------> */}
        </div>
      </div>
    </div>
  );
}
AOS.init({
  duration: 500,
});
export default OurService;
