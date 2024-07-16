import React, { useEffect, useState } from "react";
import API_URL from "../Global";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";

//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"; // Import the loader styles
const DashAbout = () => {
  const [aboutData, setAboutData] = useState({
    aboutUsImage: "",
    teamText: "",
    chairmanImage: "",
    chairmanName: "",
    chairmanDesignation: "",
    chairmanExperience: "",
    team: [],
  });
  const [isLoading, setIsLoading] = useState(false); // State to manage loading animation
  // const [teamMember, setTeamMember] = useState([]);
  useEffect(() => {
    GetAboutData();
  }, []);

  const GetAboutData = async () => {
    try {
      const response = await axios.get(`${API_URL}/aboutUs`);
      setAboutData(response.data);
    } catch (error) {
      console.error("Error fetching home details:", error);
      // Handle error (e.g., show error message to the user)
    }
  };

  const handeTeamImage = async (index, file) => {
    try {
      const link = await handleImageUpload(file);
      if (link) {
        // Update the team member's image link in the state
        const updatedTeam = [...aboutData.team];
        updatedTeam[index].teamImage = link;

        // Update the state with the modified team array
        setAboutData((prevState) => ({
          ...prevState,
          team: updatedTeam,
        }));
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handeChairmanImage = async (file) => {
    try {
      const link = await handleImageUpload(file);
      if (link) {
        setAboutData({ ...aboutData, chairmanImage: link });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handeAboutUsImage = async (file) => {
    try {
      const link = await handleImageUpload(file);
      if (link) {
        setAboutData({ ...aboutData, aboutUsImage: link });
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
      await axios.put(`${API_URL}/aboutUs`, aboutData);
      alert("Home data updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update home data");
    }
  };
  const handleAddUser = () => {
    // Create Link new team member object
    const newMember = {
      teamName: "New Member",
      teamImage: "https://i.imgur.com/RoGbIso.png", // Initialize other properties here if necessary
      teamDesignation: "Designated",
    };

    // Update the state by appending the new member to the team array
    setAboutData((prevState) => ({
      ...prevState,
      team: [...prevState.team, newMember],
    }));
  };

  const removeUser = (index) => {
    // Create Link copy of the current team array
    const updatedTeam = [...aboutData.team];

    // Remove the team member at the specified index
    updatedTeam.splice(index, 1);

    // Update the state with the modified team array
    setAboutData((prevState) => ({
      ...prevState,
      team: updatedTeam,
    }));
  };

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
      <div className="dashboard-accepted-service-about">
        <div className="outter-div-siderbar-about">
          <div className="sidebar-accepted-service-about">
            <img src="/image/tirzah-logo.png" alt="tirzah-logo" />
            <ul>
              <li>
                <Link to={`/edit/home`}>
                  <img
                    className="icon-side-about"
                    src="/image/white-icon-home.png"
                    alt=""
                  />
                  <span className="weightoxie-about">Home</span>
                </Link>
              </li>

              <li>
                <Link to={`/edit/about`}>
                  <img
                    className="icon-side-service-about"
                    src="/image/about-color-icon.png"
                    alt=""
                  />
                  <span className="weightoxie-about" id="weightoxie">
                    About
                  </span>
                </Link>
              </li>

              <li>
                <Link to="/edit/OurService">
                  <img
                    className="icon-side-service-about"
                    src="/image/service-icon.png"
                    alt=""
                  />
                  <span className="weightoxie-about">Service</span>
                </Link>
              </li>
              <li>
                <Link to="/edit/OurWORKS">
                  <img
                    className="icon-side-service-about"
                    src="/image/our-work-icon.png"
                    alt=""
                  />
                  <span className="weightoxie-about">Our Works</span>
                </Link>
              </li>
              <li>
                <Link to="edit/ContactUs">
                  <img
                    className="icon-side-service-about"
                    src="/image/contact-us-icon.png"
                    alt=""
                  />
                  <span className="weightoxie-about">Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="right-div-about">
          <div className="inner-right-div-about">
            <h2 className="heading-name-about">Hello, Rajan</h2>
            <h3 className="sub-heading-name-about">Managing Director</h3>
          </div>
          <div className="about-us-edit-about">
            <div className="about-us-inner-edit-about">
              <div className="about-us-inner-word-edit-about">
                <h2>About</h2>
              </div>
              <div className="about-us-button-about">
                <button
                  className="about-us-inner-button-about"
                  onClick={handleSave}
                >
                  Update
                </button>
              </div>
            </div>

            <div className="thumnaile-image-about">
              <div className="flex-div-about">
                <h3 className="thim-name-image-about">Thumbnail Image :</h3>
              </div>
              <div className="flex-div2-about">
                <img src={aboutData.aboutUsImage} alt="" />
                <div className="upload-button-about">
                  <label
                    htmlFor="file-upload"
                    style={{ display: "flex" }}
                    //     style="
                    // display: flex;"
                  >
                    <img src="/image/upload-image.png" alt="Upload Icon" />
                    Upload Image
                  </label>
                  <input
                    type="file"
                    id="file-upload"
                    // style="display: none"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      handeAboutUsImage(file);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="Our-Team-about">
            <div className="Our-Team-inner-edit-about">
              <div className="Our-Team-inner-word-edit-about">
                <h2>Our Team</h2>
              </div>
              <div className="Our-Team-button-about">
                <button
                  className="Our-Team-inner-button-about"
                  onClick={handleSave}
                >
                  Update
                </button>
              </div>
            </div>

            <div className="thumnaile-image1-about">
              <div className="image-outter-row-about">
                <div className="image-row-about">
                  <div className="row-about">
                    <div className="first-div-about">
                      {/* <!-- <input type="text" placeholder="Enter text here"> --> */}
                      <textarea
                        value={aboutData.teamText}
                        onChange={(e) =>
                          setAboutData({
                            ...aboutData,
                            teamText: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="second-div-about">
                      <p className="paaasdfif-about">Chairman</p>
                      <div className="image-container-about">
                        <img
                          className="imageiankdo"
                          src={aboutData.chairmanImage}
                          alt="Placeholdermage"
                        />
                        <label className="file-input-overlay-about">
                          <img
                            className="file-imdd-about"
                            src="/image/upolod-icon-ima.png"
                            alt="dd"
                          />

                          <input
                            type="file"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              handeChairmanImage(file);
                            }}
                          />
                          <p>Upload</p>
                        </label>
                        <div className="input-container-about">
                          <input
                            type="text"
                            name="chairmanName"
                            value={aboutData.chairmanName}
                            placeholder="Enter chairman's name"
                            onChange={(e) =>
                              setAboutData({
                                ...aboutData,
                                chairmanName: e.target.value,
                              })
                            }
                          />
                          <div className="icon-about"></div>
                        </div>
                        <div className="input-container-about">
                          <input
                            type="text"
                            name="chairmanDesignation"
                            value={aboutData.chairmanDesignation}
                            placeholder="Enter chairman's designation"
                            onChange={(e) =>
                              setAboutData({
                                ...aboutData,
                                chairmanDesignation: e.target.value,
                              })
                            }
                          />
                          <div className="icon-about"></div>
                        </div>
                        <div className="input-container-about">
                          <input
                            type="text"
                            name="chairmanDesignation"
                            value={aboutData.chairmanExperience}
                            placeholder="Enter chairman's designation"
                            onChange={(e) =>
                              setAboutData({
                                ...aboutData,
                                chairmanExperience: e.target.value,
                              })
                            }
                          />
                          <div className="icon-about"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="buttoneeinng-about" onClick={handleAddUser}>
              Add Team
            </button>
            <div className="flex-team-about">
              <div className="flex-team1-about">
                <div className="flex-teamds-about">
                  {aboutData &&
                    aboutData.team.map((team, index) => (
                      <div key={team._id} className="second-div-about">
                        <div className="flexxxx-divis-about">
                          <p className="paaasdfif-about">Person {index + 1}</p>
                          <img
                            className="close-icon-about"
                            src="/image/jam_close.png"
                            alt=""
                            onClick={() => removeUser(index)}
                          />
                        </div>

                        <div className="image-container-about">
                          <img
                            className="textosnlfossj"
                            src={team.teamImage}
                            alt="PlaceholdeImage"
                          />
                          <label className="file-input-overlay-about">
                            <img
                              className="file-imdd-about"
                              src="/image/upolod-icon-ima.png"
                              alt="dd"
                            />

                            <input
                              type="file"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                handeTeamImage(index, file);
                              }}
                            />
                            <p>Upload</p>
                          </label>
                          <div className="input-container-about">
                            <input
                              type="text"
                              name="name"
                              value={team.teamName}
                              placeholder="R.K.Shanmuga Sundaram"
                              onChange={(e) => {
                                const updatedTeam = [...aboutData.team];
                                updatedTeam[index].teamName = e.target.value;
                                setAboutData((prevState) => ({
                                  ...prevState,
                                  team: updatedTeam,
                                }));
                              }}
                            />

                            <div className="icon-about"></div>
                          </div>
                          <div className="input-container-about">
                            <input
                              type="text"
                              name="name"
                              value={team.teamDesignation}
                              placeholder="Senior Site Engineer"
                              onChange={(e) => {
                                const updatedTeam = [...aboutData.team];
                                updatedTeam[index].teamDesignation =
                                  e.target.value;
                                setAboutData((prevState) => ({
                                  ...prevState,
                                  team: updatedTeam,
                                }));
                              }}
                            />
                            <div className="icon-about"></div>
                          </div>

                          <div className="input-container-about">
                            <input
                              type="text"
                              name="name"
                              value={team.teamExperience}
                              placeholder="Senior Site Engineer"
                              onChange={(e) => {
                                const updatedTeam = [...aboutData.team];
                                updatedTeam[index].teamExperience =
                                  e.target.value;
                                setAboutData((prevState) => ({
                                  ...prevState,
                                  team: updatedTeam,
                                }));
                              }}
                            />
                            <div className="icon-about"></div>
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
    </div>
  );
};
export default DashAbout;
