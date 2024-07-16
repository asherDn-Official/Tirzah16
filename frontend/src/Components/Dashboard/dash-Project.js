import React, { useEffect, useState } from "react";
import API_URL from "../Global";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
const DashProject = () => {
  const { serviceId } = useParams();
  const [ServiceDetails, setServiceDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false); // State to manage loading animation
  useEffect(() => {
    GetService();
  }, []);
  const Navigate = useNavigate();
  const GetService = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/service/individual/${serviceId}`
      );
      setServiceDetails(response.data);
    } catch (error) {
      console.error("Error fetching home details:", error);
      // Handle error (e.g., show error message to the user)
    }
  };
  const handleServiceImage = async (file) => {
    try {
      const link = await handleImageUpload(file);
      if (link) {
        setServiceDetails({
          ...ServiceDetails,
          serviceImage: link,
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleImageUpload = async (file) => {
    setIsLoading(true); // Set loading to true when starting image upload
    if (!file) {
      alert("Please select an image to upload.");
      setIsLoading(false); // Reset loading state if no file is selected
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
      setIsLoading(false); // Reset loading state after successful upload
      return response.data.link;
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Image Upload Failed. Please try again.");
      setIsLoading(false); // Reset loading state on upload failure
    }
  };

  const handleSave = async () => {
    try {
      // console.log(feedbackInputs);
      await axios.post(
        `${API_URL}/service/saveService/${serviceId}`,
        ServiceDetails
      );
      alert("Home data updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update home data");
    }
  };
  const handleAddProject = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/service/newWork/${serviceId}`
      );
      const newProject = response.data.service;
      const updatedService = newProject.find(
        (service) => service._id === serviceId
      );
      setServiceDetails(updatedService);
      // console.log("project:", updatedService);
    } catch (error) {
      console.error("Error adding project:", error);
      // Handle error
    }
  };

  const handleWorkUpdate = (index, newValue) => {
    const updatedWorks = [...ServiceDetails.works];
    const selectedWork = updatedWorks[index];
    const newIndex = updatedWorks.findIndex((work) => work._id === newValue);
    updatedWorks[index] = updatedWorks[newIndex];
    updatedWorks[newIndex] = selectedWork;
    setServiceDetails({
      ...ServiceDetails,
      works: updatedWorks,
    });
  };

  const handleRemoveProject = (index) => {
    // Create Link copy of the works array
    const updatedWorks = [...ServiceDetails.works];

    // Remove the project (work) at the specified index
    updatedWorks.splice(index, 1);

    // Update the ServiceDetails state with the modified works array
    setServiceDetails({
      ...ServiceDetails,
      works: updatedWorks,
    });
  };

  const handleUpdateWork = (id) => {
    Navigate(`/edit/DetailsPage/${id}`);
  };

  // console.log(ServiceDetails);
  return (
    <div>
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <TailSpin color="#ffffff" height={80} width={80} />
        </div>
      )}
      <div className="dashboard-accepted-service-projected">
        <div className="outter-div-siderbar-projected">
          <div className="sidebar-accepted-service-projected">
            <img src="/image/tirzah-logo.png" alt="tirzah-logo" />
            <ul>
              <li>
                <Link to="/edit/home">
                  <img
                    className="icon-side-projected"
                    src="/image/white-icon-home.png"
                    alt=""
                  />
                  <span className="weightoxie-projected">Home</span>
                </Link>
              </li>

              <li>
                <Link to="/edit/about">
                  <img
                    className="icon-side-service-projected"
                    src="/image/about-icon.png"
                    alt=""
                  />
                  <span className="weightoxie-projected">About</span>
                </Link>
              </li>

              <li>
                <Link to="/edit/OurService">
                  <img
                    className="icon-side-service-projected"
                    src="/image/service-icon.png"
                    alt=""
                  />
                  <span className="weightoxie-projected">Service</span>
                </Link>
              </li>
              <li>
                <Link to="/edit/OurWORKS">
                  <img
                    className="icon-side-service-projected"
                    src="/image/our-work-icon.png"
                    alt=""
                  />
                  <span className="weightoxie-projected">Our Works</span>
                </Link>
              </li>
              <li>
                <Link to="/edit/ContactUs">
                  <img
                    className="icon-side-service-projected"
                    src="/image/contact-us-icon.png"
                    alt=""
                  />
                  <span className="weightoxie-projected">Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="right-div-projected">
          <div className="inner-right-div-projected">
            <h2 className="heading-name-projected">Hello, Rajan</h2>
            <h3 className="sub-heading-name-projected">Managing Director</h3>
          </div>
          <div className="about-us-edit-projected">
            <div className="about-us-inner-edit-projected">
              <div className="imagg-project-projected">
                <img src="/image/fluent-mdl2_back.png" alt="" />
              </div>
              <div className="about-us-inner-word-edit-projected">
                <h2>
                  <input
                    className="textsproedotnlso"
                    type="text"
                    value={ServiceDetails.serviceName}
                    onChange={(e) =>
                      setServiceDetails({
                        ...ServiceDetails,
                        serviceName: e.target.value,
                      })
                    }
                  />
                  <img
                    className="inputidojfone"
                    src="/image/input-icon.png"
                    alt="Icon 1"
                  />
                </h2>
              </div>
              <div className="about-us-button-service">
                <button
                  className="about-us-inner-button-service"
                  onClick={handleSave}
                >
                  Update
                </button>
              </div>
            </div>

            <div className="thumnaile-image-projected">
              <div className="flex-div2-projected">
                <img src={ServiceDetails.serviceImage} alt="" />
                <div className="upload-button-projected">
                  <label for="file-upload">
                    <img src="/image/upolod-icon-ima.png" alt="Upload Icon" />
                    Upload Image
                  </label>
                  <input
                    type="file"
                    id="file-upload"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      handleServiceImage(file);
                    }}
                  />
                </div>
              </div>
              <div className="flex-div-projected">
                <div className="first-div-projected">
                  {/* <!-- <input type="text" placeholder="Enter text here"> --> */}
                  <textarea
                    className="texinaldogjja"
                    value={ServiceDetails.serviceDescription}
                    onChange={(e) =>
                      setServiceDetails({
                        ...ServiceDetails,
                        serviceDescription: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="Our-Projects-page-projected">
            <div className="Our-Projects-page-inner-edit-projected">
              <div className="Our-Projects-page-inner-word-edit-projected">
                <h2>Our Projects</h2>
              </div>
              <div className="about-us-button-service">
                <button
                  className="about-us-inner-button-service"
                  onClick={handleSave}
                >
                  Update
                </button>
              </div>
            </div>

            <div className="Our-Projects-page-thumnaile-image1-projected">
              {ServiceDetails &&
                ServiceDetails.works &&
                ServiceDetails.works.map((work, index) => (
                  <div className="image-outter-row-projected">
                    <div className="image-row-projected">
                      <div className="image-container-projected">
                        <div className="flexxx-para112-projected">
                          <p className="image-para112-projected">
                            Project {index + 1}
                          </p>
                          <img
                            className="close-icon212-projected"
                            src="/image/jam_close.png"
                            alt=""
                            onClick={() => handleRemoveProject(index)}
                          />
                        </div>
                        <div className="flex-img-drop-projected">
                          <img
                            className="service-image-projected"
                            src={work.workImage}
                            alt="Image1"
                          />

                          <select
                            className="dropdown-select"
                            value={ServiceDetails.works[index]._id}
                            onChange={(e) =>
                              handleWorkUpdate(index, e.target.value)
                            }
                          >
                            {ServiceDetails.works &&
                              ServiceDetails.works.map((project) => (
                                <option key={project._id} value={project._id}>
                                  {project.workName}
                                </option>
                              ))}
                          </select>
                          <div className="Excellent-Service-button-projected">
                            <button
                              className="Excellent-Service-inner-button-projected"
                              onClick={() => handleUpdateWork(work._id)}
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              {/* <div className="thumnaile-image-add-projected"> */}
              <div className="image-outter-row-projected">
                <div className="image-row-projected">
                  <div className="image-container-add-projected">
                    <p className="image-para-projected">Add Service</p>
                    <div className="flex-img-drop-projected">
                      <img
                        className="service-image-add-projected"
                        src="/image/service-add-image.png"
                        alt="Image1"
                        onClick={() => handleAddProject()} // Corrected invocation
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>

        {/* <!-- income div========================================== --> */}
      </div>
    </div>
  );
};
export default DashProject;
