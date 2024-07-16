import React, { useEffect, useState } from "react";
import API_URL from "../Global";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const DashWork = () => {
  const [serviceDetails, setServiceDetails] = useState([]);
  const [displayedService, setDisplayedService] = useState([]);
  const [displayedName, setDisplayedName] = useState("All");
  const navigate = useNavigate();
  useEffect(() => {
    getService();
  }, []);
  useEffect(() => {
    handleDisplayService(displayedName);
  }, [displayedName, serviceDetails]); // Added serviceDetails to dependency array
  const getService = async () => {
    try {
      const response = await axios.get(`${API_URL}/service`);
      setServiceDetails(response.data.service);
    } catch (error) {
      console.error("Error fetching service details:", error);
      // Handle error (e.g., show error message to the user)
    }
  };
  const handleDisplayService = (serviceName) => {
    if (serviceName === "All") {
      const allWorks = serviceDetails.reduce((accumulator, currentService) => {
        return [...accumulator, ...currentService.works];
      }, []);
      setDisplayedService(allWorks);
    } else {
      const selectedService = serviceDetails.find(
        (service) => service.serviceName === serviceName
      );
      if (selectedService) {
        setDisplayedService(selectedService.works);
      } else {
        setDisplayedService([]);
      }
    }
  };
  const handleWorkUpdate = (id) => {
    navigate(`/edit/DetailsPage/${id}`);
  };
  // console.log(displayedName);
  return (
    <div className="dashboard-accepted-service-worked">
      <div className="outter-div-siderbar-worked">
        <div className="sidebar-accepted-service-worked">
          <img src="/image/tirzah-logo.png" alt="tirzah-logo" />
          <ul>
            <li>
              <Link to="/edit/home">
                <img
                  className="icon-side-worked"
                  src="/image/white-icon-home.png"
                  alt=""
                />
                <span className="weightoxie-worked">Home</span>
              </Link>
            </li>
            <li>
              <Link to="/edit/About">
                <img
                  className="icon-side-service-worked"
                  src="/image/about-icon.png"
                  alt=""
                />
                <span className="weightoxie-worked">About</span>
              </Link>
            </li>
            <li>
              <Link to="/edit/OurService">
                <img
                  className="icon-side-service-worked"
                  src="/image/service-icon.png"
                  alt=""
                />
                <span className="weightoxie-worked">Service</span>
              </Link>
            </li>
            <li>
              <Link to="/edit/OurWORKS">
                <img
                  className="icon-side-service-worked"
                  src="/image/work-color-icon.png"
                  alt=""
                />
                <span className="weightoxie-worked" id="weightoxie">
                  Our Works
                </span>
              </Link>
            </li>
            <li>
              <Link to="/edit/ContactUs">
                <img
                  className="icon-side-service-worked"
                  src="/image/contact-us-icon.png"
                  alt=""
                />
                <span className="weightoxie-worked">Contact Us</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="right-div-worked">
        <div className="inner-right-div-worked">
          <h2 className="heading-name-worked">Hello, Rajan</h2>
          <h3 className="sub-heading-name-worked">Managing Director</h3>
        </div>
        <div className="Our-Projects-page-worked">
          <div className="Our-Projects-page-inner-edit-worked">
            <div className="Our-Projects-page-inner-word-edit-worked">
              <h2>Our Works</h2>
            </div>
            <div className="Our-Projects-page-button-top-worked">
              <select
                className="dropdown-select-work"
                onChange={(e) => setDisplayedName(e.target.value)}
              >
                <option value="All">All</option>
                {serviceDetails &&
                  serviceDetails.map((option, index) => (
                    <option key={option._id} value={option.serviceName}>
                      {option.serviceName}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="Our-Projects-page-thumnaile-image1-worked">
            <div className="image-outter-row-worked">
              <div className="image-row-worked">
                {displayedService &&
                  displayedService &&
                  displayedService.map((work, index) => (
                    <div key={work._id} className="image-container-worked">
                      <div className="flex-img-drop-worked">
                        <div className="flexxx-para-worked">
                          <p className="image-para-worked">
                            project {index + 1}
                          </p>
                          {/* <img
                            className="close-icon22-worked"
                            src="/image/jam_close.png"
                            alt=""
                          /> */}
                        </div>
                        <img
                          className="service-image-worked"
                          src={work.workImage}
                          alt="Image 1"
                        />
                        <div className="dropdown-worked">
                          <div className="input-container-worked">
                            {/* <input
                              type="text"
                              name="name"
                              placeholder="Senior Site Engineer"
                            /> */}
                            <h2 className="inturnintotext">{work.workName}</h2>
                            <div className="icon-worked"></div>
                            <div className="Excellent-Service-button-work-worked">
                              <div className="Excellent-Service-button-work-worked">
                                <button
                                  className="Excellent-Service-inner-button-worked"
                                  onClick={() => handleWorkUpdate(work._id)}
                                >
                                  Update
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- income div========================================== --> */}
    </div>
  );
};
export default DashWork;
