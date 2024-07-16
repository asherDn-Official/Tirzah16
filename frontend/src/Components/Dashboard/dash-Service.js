import React, { useEffect, useState } from "react";
import API_URL from "../Global";
import axios from "axios";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
const DashService = () => {
  const [ServiceDetails, setServiceDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false); // State to manage loading animation
  useEffect(() => {
    GetService();
  }, []);

  const GetService = async () => {
    try {
      const response = await axios.get(`${API_URL}/service`);
      setServiceDetails(response.data);
    } catch (error) {
      console.error("Error fetching home details:", error);
      // Handle error (e.g., show error message to the user)
    }
  };

  const handePageImage = async (file) => {
    try {
      const link = await handleImageUpload(file);
      if (link) {
        setServiceDetails({
          ...ServiceDetails,
          pageImage: link,
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
      await axios.post(`${API_URL}/service/save`, ServiceDetails);
      alert("Home data updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update home data");
    }
  };

  const handleAddService = async () => {
    const response = await axios.post(`${API_URL}/service/newService`);
    setServiceDetails(response.data);
  };

  const handleServiceChange = (e, selectedIndex) => {
    const newServiceIndex = e.target.selectedIndex;
    const updatedServices = [...ServiceDetails.service];
    const temp = updatedServices[selectedIndex];
    updatedServices[selectedIndex] = updatedServices[newServiceIndex];
    updatedServices[newServiceIndex] = temp;
    setServiceDetails({
      ...ServiceDetails,
      service: updatedServices,
    });
  };
  const removeService = (indexToRemove) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to remove this service?"
    );
    if (isConfirmed) {
      setServiceDetails((prevState) => ({
        ...prevState,
        service: prevState.service.filter(
          (_, index) => index !== indexToRemove
        ),
      }));
    }
  };

  // console.log(ServiceDetails);

  return (
    <div className="dashboard-accepted-service-service">
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
      <div className="outter-div-siderbar-service">
        <div className="sidebar-accepted-service-service">
          <img src="/image/tirzah-logo.png" alt="tirzah-logo" />
          <ul>
            <li>
              <Link to="/edit/home">
                <img
                  className="icon-side-service"
                  src="/image/white-icon-home.png"
                  alt=""
                />
                <span className="weightoxie-service">Home</span>
              </Link>
            </li>

            <li>
              <Link to="/edit/About">
                <img
                  className="icon-side-service-service"
                  src="/image/about-icon.png"
                  alt=""
                />
                <span className="weightoxie-service">About</span>
              </Link>
            </li>

            <li>
              <Link to="/edit/OurService">
                <img
                  className="icon-side-service-service"
                  src="/image/service-color-icon.png"
                  alt=""
                />
                <span className="weightoxie-service" id="weightoxie">
                  Service
                </span>
              </Link>
            </li>
            <li>
              <Link to="/edit/OurWORKS">
                <img
                  className="icon-side-service-service"
                  src="/image/our-work-icon.png"
                  alt=""
                />
                <span className="weightoxie-service">Our Works</span>
              </Link>
            </li>
            <li>
              <Link to="/edit/ContactUs">
                <img
                  className="icon-side-service-service"
                  src="/image/contact-us-icon.png"
                  alt=""
                />
                <span className="weightoxie-service">Contact Us</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="right-div-service">
        <div className="inner-right-div-service">
          <h2 className="heading-name-service">Hello, Rajan</h2>
          <h3 className="sub-heading-name-service">Managing Director</h3>
        </div>
        <div className="about-us-edit-service">
          <div className="about-us-inner-edit-service">
            <div className="about-us-inner-word-edit-service">
              <h2>Our Service</h2>
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

          <div className="thumnaile-image-service">
            <div className="flex-div-service">
              <div className="first-div-service">
                {/* <!-- <input type="text" placeholder="Enter text here"> --> */}
                <textarea
                  className="textaidnkti"
                  value={ServiceDetails.pageText}
                  onChange={(e) =>
                    setServiceDetails({
                      ...ServiceDetails,
                      pageText: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="flex-div2-service">
              <img src={ServiceDetails.pageImage} alt="" />
              <div className="upload-button-service">
                <label htmlFor="file-upload">
                  <img src="/image/upolod-icon-ima.png" alt="Upload Icon" />
                  Upload Image
                </label>
                <input
                  type="file"
                  id="file-upload"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    handePageImage(file);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="Our-Excellent-Service-service">
          <div className="Excellent-Service-inner-edit-service">
            <div className="Excellent-Service-inner-word-edit-service">
              <h2>Our Excellent Service</h2>
            </div>
            <div className="Excellent-Service-button-top-service">
              <div className="about-us-button-service">
                <button
                  className="about-us-inner-button-service"
                  onClick={handleSave}
                >
                  Update
                </button>
              </div>
            </div>
          </div>

          <div className="thumnaile-image1-service">
            <div className="image-outter-row-service">
              <div className="image-row-service">
                {ServiceDetails &&
                  ServiceDetails.service &&
                  ServiceDetails.service.map((service, index) => (
                    <div className="image-container-service" key={index}>
                      <div className="flexxx-para11-service">
                        <p className="image-para11-service">
                          Service {index + 1}
                        </p>
                        <img
                          className="close-icon21-service"
                          src="/image/jam_close.png"
                          alt=""
                          onClick={() => removeService(index)}
                        />
                      </div>
                      <div className="flex-img-drop-service">
                        {/* <img
                          className="service-image-service"
                          src="/image/service-image.png"
                          alt="Image 1"
                        /> */}
                        <img
                          className="service-image-service"
                          src={service.serviceImage}
                          alt="Image1"
                        />

                        <select
                          className="dropdown-select"
                          value={service.serviceName}
                          onChange={(e) => handleServiceChange(e, index)}
                        >
                          {ServiceDetails &&
                            ServiceDetails.service &&
                            ServiceDetails.service.map((option) => (
                              <option
                                key={option._id}
                                value={option.serviceName}
                              >
                                {option.serviceName}
                              </option>
                            ))}
                        </select>
                        <div className="Excellent-Service-button-service">
                          <Link to={`/edit/OurServicePageOne/${service._id}`}>
                            <button className="Excellent-Service-inner-button-service">
                              Update
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                {/* <div className="thumnaile-image-add-service"> */}
                <div className="image-outter-row-service">
                  <div className="image-row-service">
                    <div className="image-container-add-service">
                      <p className="image-para-service">Add Service</p>
                      <div className="flex-img-drop-service">
                        <img
                          className="service-image-add-service"
                          src="/image/service-add-image.png"
                          alt="Image1"
                          onClick={handleAddService}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- income div========================================== --> */}
    </div>
  );
};
export default DashService;
