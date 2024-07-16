import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "aos/dist/aos.css";
import "../CSS/4OurWorks.css";
import axios from "axios";
import API_URL from "./Global";

function OurWORKS() {
  const [serviceName, setServiceName] = useState([]);
  const [selectedService, setSelectedService] = useState("all");
  const [works, setWorks] = useState([]);
  const Navigate = useNavigate();
  useEffect(() => {
    fetchServiceNames();
  }, []);

  useEffect(() => {
    fetchWorksByService(selectedService);
  });

  const fetchServiceNames = async () => {
    try {
      const response = await axios.get(`${API_URL}/service/name`);
      setServiceName(response.data);
    } catch (error) {
      console.error("Error fetching service names:", error);
    }
  };

  const fetchWorksByService = async (selectedService) => {
    try {
      const response = await axios.get(
        `${API_URL}/service/works/${selectedService}`
      );
      setWorks(response.data);
      // console.log(works);
    } catch (error) {
      console.error("Error fetching works by service:", error);
    }
  };
  const HandleIndividualWork = async (id) => {
    Navigate(`/Works/${id}`);
  };
  // return <div>Hiii</div>;
  return (
    <div>
      <div className="mEDIAoFTHWoksetiofsection">
        <div className="oUEREworksSectionDivWidth">
          <div>
            <div className="OUrservicefirsdtseti9ondropdowen">
              <div className="OurWorksSecdftiondiv">Our Works</div>
              <div>
                <div className="select-dropdown">
                  <select
                    value={selectedService}
                    onChange={(e) => {
                      setSelectedService(e.target.value);
                      fetchWorksByService(e.target.value);
                    }}
                  >
                    <option key="all" value="all">
                      All
                    </option>
                    {serviceName.map((name) => (
                      <option key={name._id} value={name._id}>
                        {name.serviceName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="OurserviceSectionPagedivmargintop">
            <div className="OurWokrsPageMainTabWidth">
              <div className="OUrworkdddddsbdfgydfghfdghf">
                <div className="oURwORKSDSECONDSECTIONDATSTS">
                  {works.map((work, index) => (
                    <div key={index} className="Maqrgiontopfiethediv">
                      <div className="OurServicepagedivnkdkd">
                        <img
                          className="SizeoftheAboutPAGEiAMEG"
                          src={work.workImage}
                          alt=""
                        />
                        <div className="NAmoftheaboutSection">
                          {work.workName}
                        </div>
                        <div
                          className="zssadtl"
                          onClick={() => {
                            HandleIndividualWork(work.workId);
                          }}
                        >
                          <h3>{work.workName}</h3>
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
      </div>
    </div>
  );
}

export default OurWORKS;
