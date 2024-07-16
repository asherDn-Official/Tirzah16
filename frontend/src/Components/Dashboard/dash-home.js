import React, { useEffect, useState } from "react";
import API_URL from "../Global";
import axios from "axios";
import { Link } from "react-router-dom";
const DashHome = () => {
  const [homeDetails, setHomeDetails] = useState({
    aboutUsImage: "",
    experienceCount: "",
    clientsCount: "",
    projectsCount: "",
    service: [],
    project: [],
    feedback: [],
  });
  const [selectedWorks, setSelectedWorks] = useState([]);
  const [ServiceDetails, setServiceDetails] = useState([]);
  const [feedback, setfeedback] = useState([]);
  useEffect(() => {
    GetHomeDetails();
    GetFeedback();
    GetService();
  }, []);
  const GetHomeDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/home`);
      setHomeDetails(response.data);
    } catch (error) {
      console.error("Error fetching home details:", error);
      // Handle error (e.g., show error message to the user)
    }
  };
  const GetService = async () => {
    try {
      const response = await axios.get(`${API_URL}/service`);
      // console.log(response.data.service);
      const services = response.data.service.map((item) => ({
        ...item,
        serviceId: item._id,
      }));
      setServiceDetails(services);
    } catch (error) {
      console.error("Error fetching home details:", error);
      // Handle error (e.g., show error message to the user)
    }
  };
  const GetFeedback = async () => {
    try {
      const response = await axios.post(`${API_URL}/feedback/get`);
      setfeedback(response.data);
    } catch (error) {
      console.error("Error fetching home details:", error);
      // Handle error (e.g., show error message to the user)
    }
  };
  const handleAboutUsImageChange = async (file) => {
    try {
      const link = await handleImageUpload(file);
      if (link) {
        setHomeDetails({
          ...homeDetails,
          aboutUsImage: link,
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const handleImageUpload = async (file) => {
    if (!file) {
      alert("Please select an image to upload.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("sampleFile", file);
      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.link;
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Image Upload Failed. Please try again.");
    }
  };
  const handleSave = async () => {
    try {
      // console.log(feedbackInputs);
      await axios.put(`${API_URL}/home`, homeDetails);
      alert("Home data updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update home data");
    }
  };

  const handleCheckboxChange = (feedback, feedbackId, checked) => {
    if (checked) {
      // Add feedback to homeDetails.feedback if not already present
      if (!homeDetails.feedback.find((item) => item._id === feedbackId)) {
        setHomeDetails((prevDetails) => ({
          ...prevDetails,
          feedback: [...prevDetails.feedback, feedback],
        }));
      }
    } else {
      // Remove feedback from homeDetails.feedback
      setHomeDetails((prevDetails) => ({
        ...prevDetails,
        feedback: prevDetails.feedback.filter(
          (item) => item._id !== feedbackId
        ),
      }));
    }
  };
  const handleDeleteFeedback = async (feedbackId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this feedback?"
    );
    if (confirmed) {
      try {
        // Remove feedback from the feedback array
        const updatedFeedback = feedback.filter(
          (item) => item._id !== feedbackId
        );
        setfeedback(updatedFeedback);

        // Remove feedback from homeDetails.feedback
        const updatedHomeDetails = {
          ...homeDetails,
          feedback: homeDetails.feedback.filter(
            (item) => item._id !== feedbackId
          ),
        };
        setHomeDetails(updatedHomeDetails);

        // Delete feedback from the server
        await axios.delete(`${API_URL}/feedback/${feedbackId}`);
        alert("Feedback deleted successfully");
      } catch (error) {
        console.error("Error deleting feedback:", error);
        alert("Failed to delete feedback");
      }
    }
  };

  const handleAddAService = () => {
    // Check if ServiceDetails is not empty before attempting to access its length
    if (ServiceDetails.length > 0) {
      // Assuming you want to add Link new service with default values
      const newService = {
        serviceId: "simple",
        serviceName: "New Service",
        serviceImage: "/image/service-image.png",
        serviceText: "Sample text",
      };

      // Update homeDetails with the new service
      setHomeDetails({
        ...homeDetails,
        service: [...homeDetails.service, newService],
      });
    }
  };

  const handleRemoveService = (index) => {
    const updatedServiceArray = [...homeDetails.service];
    updatedServiceArray.splice(index, 1); // Remove the service at the specified index
    setHomeDetails({
      ...homeDetails,
      service: updatedServiceArray,
    });
  };

  //console.log(homeDetails);
  return (
    <div>
      <div className="dashboard-accepted-service-home">
        <div className="outter-div-siderbar-home">
          <div className="sidebar-accepted-service-home">
            <img src="/image/tirzah-logo.png" alt="tirzah-logo" />
            <ul>
              <li>
                <Link to="/edit/home">
                  <img
                    className="icon-side-home"
                    src="/image/home-icon.png"
                    alt=""
                  />
                  <span className="weightoxie-home" id="weightoxie">
                    Home
                  </span>
                </Link>
              </li>

              <li>
                <Link to="/edit/about">
                  <img
                    className="icon-side-service-home"
                    src="/image/about-icon.png"
                    alt=""
                  />
                  <span className="weightoxie-home">About</span>
                </Link>
              </li>

              <li>
                <Link to="/edit/OurService">
                  <img
                    className="icon-side-service-home"
                    src="/image/service-icon.png"
                    alt=""
                  />
                  <span className="weightoxie-home">Service</span>
                </Link>
              </li>
              <li>
                <Link to="/edit/OurWORKS">
                  <img
                    className="icon-side-service-home"
                    src="/image/our-work-icon.png"
                    alt=""
                  />
                  <span className="weightoxie-home">Our Works</span>
                </Link>
              </li>
              <li>
                <Link to="/edit/ContactUs">
                  <img
                    className="icon-side-service-home"
                    src="/image/contact-us-icon.png"
                    alt=""
                  />
                  <span className="weightoxie-home">Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="right-div-home">
          <div className="inner-right-div-home">
            <h2 className="heading-name-home">Hello, Rajan</h2>
            <h3 className="sub-heading-name-home">Managing Director</h3>
          </div>
          <div className="about-us-edit-home">
            <div className="about-us-inner-edit-home">
              <div className="about-us-inner-word-edit-home">
                <h2>About Us</h2>
              </div>
              <div className="about-us-button-home">
                <button
                  className="about-us-inner-button-home"
                  onClick={handleSave}
                >
                  Update
                </button>
              </div>
            </div>
            <div className="thumnaile-image-home">
              <div className="flex-div-home">
                <h3 className="thim-name-image-home">Thumbnail Image :</h3>
              </div>
              <div className="flex-div2-home">
                {homeDetails && <img src={homeDetails.aboutUsImage} alt="" />}
                <div className="upload-button-home">
                  <label htmlFor="file-upload" style={{ display: "flex" }}>
                    <img src="/image/upload-image.png" alt="Upload Icon" />
                    Upload Image
                  </label>
                  <input
                    type="file"
                    id="file-upload"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      handleAboutUsImageChange(file);
                    }}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
              <div className="flex-div3-home">
                <h3 className="thim-name-image-home">Experience :</h3>
              </div>
              <div className="input-column-home">
                <div className="inner-input-div-home">
                  {homeDetails && (
                    <input
                      value={homeDetails.experienceCount}
                      onChange={(e) => {
                        setHomeDetails({
                          ...homeDetails,
                          experienceCount: e.target.value,
                        });
                      }}
                      type="text"
                    />
                  )}

                  <p className="input-para-home">Years</p>
                </div>
                <div className="inner-input-div-home">
                  <input
                    value={homeDetails.clientsCount}
                    onChange={(e) => {
                      setHomeDetails({
                        ...homeDetails,
                        clientsCount: e.target.value,
                      });
                    }}
                    type="text"
                  />

                  <p className="input-para-home">Clients</p>
                </div>
                <div className="inner-input-div-home">
                  <input
                    value={homeDetails.projectsCount}
                    onChange={(e) => {
                      setHomeDetails({
                        ...homeDetails,
                        projectsCount: e.target.value,
                      });
                    }}
                    type="text"
                  />
                  <p className="input-para-home">Projects</p>
                </div>
              </div>
            </div>
          </div>
          <div className="Our-Excellent-Service-home">
            <div className="Excellent-Service-inner-edit-home">
              <div className="Excellent-Service-inner-word-edit-home">
                <h2>Our Excellent Service</h2>
              </div>
              <div className="Excellent-Service-button-home">
                <button
                  className="Excellent-Service-inner-button-home"
                  onClick={handleSave}
                >
                  Update
                </button>
              </div>
            </div>

            <div className="thumnaile-image1-home">
              <div className="image-outter-row-home">
                <div className="image-row-home">
                  {homeDetails &&
                    homeDetails.service.map((service, index) => (
                      <div className="image-container-home" key={index}>
                        <p className="image-para-home">
                          Service {index + 1}{" "}
                          <span
                            onClick={() => handleRemoveService(index)}
                            className="edelietien"
                          >
                            <img
                              className="close-icon-about"
                              src="/image/jam_close.png"
                              alt=""
                            />
                          </span>
                        </p>

                        <div className="flex-img-drop-home">
                          <img
                            className="service-image-home"
                            src={service.serviceImage}
                            alt="Image1"
                          />

                          <select
                            className="dropdown-select"
                            onChange={(e) => {
                              const selectedServiceIndex =
                                e.target.selectedIndex - 1;
                              const selectedService =
                                ServiceDetails[selectedServiceIndex];
                              if (selectedService) {
                                const updatedServiceArray = [
                                  ...homeDetails.service,
                                ];
                                updatedServiceArray[index] = selectedService;
                                setHomeDetails({
                                  ...homeDetails,
                                  service: updatedServiceArray,
                                });
                              }
                            }}
                          >
                            <option value="option1">
                              {service.serviceName}
                            </option>
                            {ServiceDetails &&
                              ServiceDetails.map((list) => (
                                <option key={list._id} value={list._id}>
                                  {list.serviceName}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    ))}

                  <div className="image-row-home">
                    <div className="image-container-add-home">
                      <p className="image-para-home">Add Service</p>
                      <div
                        className="flex-img-drop-home"
                        onClick={handleAddAService}
                      >
                        <img
                          className="service-image-add-home"
                          src="/image/service-add-image.png"
                          alt="Image1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="Our-Projects-home">
            <div className="Our-Projects-inner-edit-home">
              <div className="Our-Projects-inner-word-edit-home">
                <h2>Our Projects</h2>
              </div>
              <div className="Our-Projects-button-home">
                <button
                  className="Our-Projects-inner-button-home"
                  onClick={handleSave}
                >
                  Update
                </button>
              </div>
            </div>

            <div className="thumnaile-image1-home">
              <div className="image-outter-row-home">
                <div className="image-row-home">
                  {homeDetails &&
                    homeDetails.project.map((project, index) => (
                      <div key={project._id} className="image-container-home">
                        <p className="image-para-home">Project {index + 1}</p>
                        <div className="flex-img-drop-home">
                          <img
                            className="service-image-home"
                            src={project.projectImage}
                            alt="Image1"
                          />

                          <select
                            className="dropdown-select"
                            onChange={(e) => {
                              const selectedServiceId = e.target.value;
                              const selectedService = ServiceDetails.find(
                                (service) => service._id === selectedServiceId
                              );
                              if (selectedService) {
                                const works = selectedService.works || [];
                                // Update the state with the works of the selected service
                                setSelectedWorks(works);
                              }
                            }}
                          >
                            <option value="">Select Service</option>
                            {ServiceDetails &&
                              ServiceDetails.map((service) => (
                                <option key={service._id} value={service._id}>
                                  {service.serviceName}
                                </option>
                              ))}
                          </select>

                          {/* Second dropdown for works */}
                          <select
                            className="dropdown-select"
                            onChange={(e) => {
                              const selectedWorkId = e.target.value;
                              const selectedWork = selectedWorks.find(
                                (work) => work._id === selectedWorkId
                              );
                              const tempWork = {
                                projectId: selectedWork._id,
                                projectImage: selectedWork.workImage,
                                projectName: selectedWork.workName,
                                projectText: selectedWork.workDescription,
                              };
                              if (selectedWork) {
                                const updatedProjectArray = [
                                  ...homeDetails.project,
                                ]; // Create Link copy of the project array
                                updatedProjectArray[index] = tempWork; // Update the 3rd element with the selected work object
                                setHomeDetails((prevHomeDetails) => ({
                                  ...prevHomeDetails,
                                  project: updatedProjectArray, // Set the updated project array in homeDetails
                                }));
                              }
                            }}
                          >
                            <option value="">Select Work</option>
                            {selectedWorks.map((work, index) => (
                              <option key={work._id} value={work._id}>
                                {/* {console.log("works" + index + ":", work)} */}
                                {work.workName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="Client-Feedback-home">
            <div className="Client-Feedback-inner-edit-home">
              <div className="Client-Feedback-inner-word-edit-home">
                <h2>Client Feedback</h2>
              </div>
              <div className="Client-Feedback-button-home">
                <button
                  className="Client-Feedback-inner-button-home"
                  onClick={handleSave}
                >
                  Update
                </button>
              </div>
            </div>

            {feedback &&
              feedback.map((item) => (
                <div className="thumnaile-image-home" key={item._id}>
                  <div className="checkbox-container-home">
                    <div className="container-home">
                      <img
                        className="container-image-home"
                        src={item.feedbackImage}
                        alt="PlaceholderImage"
                      />
                      <div className="content-home">
                        <h3>{item.feedbackName}</h3>
                        <p>{item.feedbackText}</p>
                      </div>
                      <img
                        className="icon-home"
                        // style={{ display: "none" }}
                        src="/image/material-symbols_delete-outline.png"
                        alt="IconImage"
                        onClick={() => handleDeleteFeedback(item._id)}
                      />
                    </div>
                    <div className="checkbox-home">
                      <input
                        type="checkbox"
                        id={`checkbox${item._id}`}
                        checked={homeDetails.feedback.some(
                          (inputs) => inputs._id === item._id
                        )}
                        onChange={(e) =>
                          handleCheckboxChange(item, item._id, e.target.checked)
                        }
                      />
                      <label htmlFor={`checkbox${item._id}`}></label>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* <!-- income div========================================== --> */}
      </div>
    </div>
  );
};
export default DashHome;
