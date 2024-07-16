import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API_URL from "../Global";

const DashContact = () => {
  const [contactData, setContactData] = useState({});

  useEffect(() => {
    GetContact();
  }, []);

  const GetContact = async () => {
    try {
      const response = await axios.get(`${API_URL}/contactUs`);
      setContactData(response.data);
    } catch (error) {
      console.error("Error fetching work details:", error);
      // Handle error
    }
  };
  const handleSave = async () => {
    try {
      await axios.put(`${API_URL}/contactUs`, contactData);
      alert("Work data updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update work data");
    }
  };

  return (
    <div className="dashboard-accepted-service-contect">
      <div className="outter-div-siderbar-contect">
        <div className="sidebar-accepted-service-contect">
          <img src="/image/tirzah-logo.png" alt="tirzah-logo" />
          <ul>
            <li>
              <Link to="/edit/home">
                <img
                  className="icon-side-contect"
                  src="/image/white-icon-home.png"
                  alt=""
                />
                <span className="weightoxie-contect">Home</span>
              </Link>
            </li>

            <li>
              <Link to="/edit/about">
                <img
                  className="icon-side-service-contect"
                  src="/image/about-icon.png"
                  alt=""
                />
                <span className="weightoxie-contect">About</span>
              </Link>
            </li>

            <li>
              <Link to="/edit/OurService">
                <img
                  className="icon-side-service-contect"
                  src="/image/service-icon.png"
                  alt=""
                />
                <span className="weightoxie-contect">Service</span>
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
              <Link to="/edit/ContactUS">
                <img
                  className="icon-side-service-contect"
                  src="/image/contact-color-icon.png"
                  alt=""
                />
                <span className="weightoxie-contect" id="weightoxie">
                  Contact Us
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="right-div-contect">
        <div className="inner-right-div-contect">
          <h2 className="heading-name-contect">Hello, Rajan</h2>
          <h3 className="sub-heading-name-contect">Managing Director</h3>
        </div>
        <div className="about-us-edit-contect">
          <div className="about-us-inner-edit-contect">
            <div className="about-us-inner-word-edit-contect">
              <h2>Contact Us</h2>
            </div>
            {/* <!-- <div className="about-us-button">
              <button className="about-us-inner-button">Update</button>
            </div> --> */}
          </div>

          <div className="thumnaile-image-contect">
            <div className="flex-div2-contect">
              {/* <img src="/image/map-image.png" alt="" /> */}
              <iframe
                src={contactData.location}
                allowFullScreen=""
                loading="lazy"
                title="TirzahLoaction"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="input-container55-contect">
                <input
                  type="text"
                  value={contactData.location}
                  name="Paste-Link"
                  placeholder="Paste Link"
                  onChange={(e) =>
                    setContactData({ ...contactData, location: e.target.value })
                  }
                />
                <div className="icon55-contect"></div>
              </div>
              <div className="Excellent-Service-button-contect">
                <button
                  className="Excellent-Service-inner-button-contect"
                  onClick={handleSave}
                >
                  Update
                </button>
              </div>
            </div>
            {/* <!-- <div className="flex-div">
              <div className="first-div">
                 <input type="text" placeholder="Enter text here"> 
                <textarea></textarea>
              </div>
            </div> --> */}
          </div>
          <div className="all-forms-contect">
            <div className="headingedse-dd-contect">
              <h2 className="heingin-contect">Office Address :</h2>
            </div>
            <div className="container123-contect">
              <textarea
                className="texzsidondsonfosns"
                rows="3"
                value={contactData.address}
                placeholder="3, Ramachandra Nagar, Military Road, Avadi, Chennai"
                onChange={(e) =>
                  setContactData({ ...contactData, address: e.target.value })
                }
              ></textarea>
              <img
                className="icon123-contect"
                src="/image/input-icon.png"
                alt="Icon"
              />
            </div>
            <div className="headingedse-dd-contect">
              <h2 className="heingin-contect">Contact No :</h2>
            </div>
            <div className="input-container-contact-contect">
              <input
                type="text"
                value={contactData.mobileNumber1}
                placeholder="+91 9999999999"
                onChange={(e) =>
                  setContactData({
                    ...contactData,
                    mobileNumber1: e.target.value,
                  })
                }
              />
              <input
                type="text"
                value={contactData.mobileNumber2}
                placeholder="+91 9999999999"
                onChange={(e) =>
                  setContactData({
                    ...contactData,
                    mobileNumber2: e.target.value,
                  })
                }
              />
            </div>
            <div className="headingedse-dd-contect">
              <h2 className="heingin-contect">Mail Id</h2>
            </div>

            <div className="input-container-contact22-contect">
              <input
                value={contactData.mailId}
                type="text"
                placeholder="abcd123@gmail.com"
                onChange={(e) =>
                  setContactData({ ...contactData, mailId: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      </div>
      {/* <!-- income div========================================== --> */}
    </div>
  );
};
export default DashContact;
