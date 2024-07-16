import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import API_URL from "../Global";
import { TailSpin } from "react-loader-spinner";

const DashEditWork = () => {
  const { workId } = useParams();
  const [workDetails, setWorkDetails] = useState({
    workName: "",
    workDescription: "",
    workImage: "",
    workSpecification: [],
    planning: "",
    renderModelBefore: "",
    renderModelAfter: "",
    gallery: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    GetService();
  }, []);

  const GetService = async () => {
    try {
      const response = await axios.get(`${API_URL}/service/work/${workId}`);
      setWorkDetails(response.data);
    } catch (error) {
      console.error("Error fetching work details:", error);
      // Handle error
    }
  };

  const handleAddRecord = () => {
    if (workDetails.workSpecification.length < 8) {
      // Create Link new record with empty values
      const newRecord = { topic: "", detail: "", isChecked: false };
      // Add the new record to the state
      setWorkDetails((prevState) => ({
        ...prevState,
        workSpecification: [...prevState.workSpecification, newRecord],
      }));
    } else {
      alert("You can only add up to 8 records.");
    }
  };

  const handleCheckboxChange = (index) => {
    setWorkDetails((prevState) => ({
      ...prevState,
      workSpecification: prevState.workSpecification.map((item, idx) =>
        idx === index ? { ...item, isChecked: !item.isChecked } : item
      ),
    }));
  };
  const handeWorkImage = async (file) => {
    try {
      const link = await handleImageUpload(file);
      if (link) {
        setWorkDetails((prevState) => ({ ...prevState, workImage: link }));
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handlePlanning = async (file) => {
    try {
      const link = await handleImageUpload(file);
      if (link) {
        setWorkDetails((prevState) => ({ ...prevState, planning: link }));
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const handleRenderBefore = async (file) => {
    try {
      const link = await handleImageUpload(file);
      if (link) {
        setWorkDetails((prevState) => ({
          ...prevState,
          renderModelBefore: link,
        }));
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const handleRenderAfter = async (file) => {
    try {
      const link = await handleImageUpload(file);
      if (link) {
        setWorkDetails((prevState) => ({
          ...prevState,
          renderModelAfter: link,
        }));
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const handleImageUpload = async (file) => {
    setIsLoading(true);
    if (!file) {
      alert("Please select an image to upload.");
      setIsLoading(false);
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
      setIsLoading(false);
      return response.data.link;
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Image Upload Failed. Please try again.");
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await axios.post(
        `${API_URL}/service/individualWork/${workId}`,
        workDetails
      );
      alert("Work data updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update work data");
    }
  };
  const handleGalleryImage = async (file, indexToUpdate) => {
    try {
      const link = await handleImageUpload(file);
      if (link) {
        setWorkDetails((prevState) => {
          const updatedGallery = [...prevState.gallery];
          updatedGallery[indexToUpdate] = link;
          return { ...prevState, gallery: updatedGallery };
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setWorkDetails((prevState) => {
      const updatedGallery = [...prevState.gallery];
      updatedGallery.splice(indexToRemove, 1);
      return { ...prevState, gallery: updatedGallery };
    });
  };

  const handleAddGallery = () => {
    // Assuming workDetails.gallery is an array to store multiple images
    const newGallery = [
      ...workDetails.gallery, // Keep existing gallery images
      "/image/galary-demo-image.png", // Add the new image to the gallery
    ];
    setWorkDetails({ ...workDetails, gallery: newGallery });
  };

  return (
    <div className="dashboard-accepted-service">
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
      <div className="outter-div-siderbar">
        <div className="sidebar-accepted-service">
          <img src="/image/tirzah-logo.png" alt="tirzah-logo" />
          <ul>
            <li>
              <Link to="/edit/home">
                <img
                  className="icon-side"
                  src="/image/white-icon-home.png"
                  alt=""
                />
                <span className="weightoxie">Home</span>
              </Link>
            </li>

            <li>
              <Link to="/edit/about">
                <img
                  className="icon-side-service"
                  src="/image/about-icon.png"
                  alt=""
                />
                <span className="weightoxie">About</span>
              </Link>
            </li>

            <li>
              <Link to="/edit/OurService">
                <img
                  className="icon-side-service"
                  src="/image/service-icon.png"
                  alt=""
                />
                <span className="weightoxie">Service</span>
              </Link>
            </li>
            <li>
              <Link to="/edit/OurWORKS">
                <img
                  className="icon-side-service"
                  src="/image/our-work-icon.png"
                  alt=""
                />
                <span className="weightoxie">Our Works</span>
              </Link>
            </li>
            <li>
              <Link to="/edit/ContactUs">
                <img
                  className="icon-side-service"
                  src="/image/contact-us-icon.png"
                  alt=""
                />
                <span className="weightoxie">Contact Us</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="right-div">
        <div className="inner-right-div">
          <h2 className="heading-name">Hello, Rajan</h2>
          <h3 className="sub-heading-name">Managing Director</h3>
        </div>
        <div className="about-us-edit">
          <div className="about-us-inner-edit">
            <div className="about-us-inner-word-edit">
              <img src="/image/fluent-mdl2_back.png" alt="" />

              <h2>
                <input
                  className="inputtextseveditworkdingosnd"
                  type="text"
                  value={workDetails.workName}
                  onChange={(e) =>
                    setWorkDetails({ ...workDetails, workName: e.target.value })
                  }
                />
                <img
                  className="inputidojfone"
                  src="/image/input-icon.png"
                  alt="Icon 1"
                />
              </h2>
            </div>
            <div className="about-us-button">
              <button
                className="about-us-inner-button"
                onClick={() => handleSave()}
              >
                Update
              </button>
            </div>
          </div>

          <div className="thumnaile-image">
            {/* <!-- <div className="flex-div">
              <h3 className="thim-name-image">Thumbnail Image :</h3>
            </div> --> */}
            <div className="flex-div2">
              <img
                className="imadsizeonfson"
                src={workDetails.workImage}
                alt=""
              />
              {/* <img src="/image/edit-work-demo-image.png" alt="" /> */}
              <div className="upload-button">
                <label htmlFor="file-upload" style={{ display: "flex" }}>
                  <img src="/image/upolod-icon-ima.png" alt="Upload Icon" />
                  Upload Image
                </label>
                <input
                  type="file"
                  id="file-upload"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    handeWorkImage(file);
                  }}
                />
              </div>
            </div>

            <div className="fomeee-container">
              <p className="formee-para">Project Details</p>
              {workDetails &&
                workDetails.workSpecification &&
                workDetails.workSpecification.length < 8 && (
                  <button className="btuondinth" onClick={handleAddRecord}>
                    Add Record
                  </button>
                )}

              {workDetails &&
                workDetails.workSpecification &&
                workDetails.workSpecification.map((desc, index) => (
                  <div className="fome1-container" key={index}>
                    <form className="form" action="#">
                      {/* First form content */}
                      <input
                        type="text"
                        value={desc.topic}
                        placeholder="Client"
                        onChange={(e) =>
                          setWorkDetails((prevState) => ({
                            ...prevState,
                            workSpecification: prevState.workSpecification.map(
                              (item, idx) =>
                                idx === index
                                  ? { ...item, topic: e.target.value }
                                  : item
                            ),
                          }))
                        }
                      />
                      <img src="/image/input-icon.png" alt="Icon 1" />
                    </form>
                    <div className="divider">:</div>
                    <form className="form" action="#">
                      {/* Second form content */}
                      <input
                        type="text"
                        value={desc.detail}
                        placeholder="R.S.K"
                        onChange={(e) =>
                          setWorkDetails((prevState) => ({
                            ...prevState,
                            workSpecification: prevState.workSpecification.map(
                              (item, idx) =>
                                idx === index
                                  ? { ...item, detail: e.target.value }
                                  : item
                            ),
                          }))
                        }
                      />
                      <img src="/image/input-icon.png" alt="Icon2" />
                    </form>
                    <div className="checkbox">
                      <input
                        type="checkbox"
                        id={`checkbox${index}`}
                        checked={desc.isChecked} // Set checked attribute based on isChecked property
                        onChange={() => handleCheckboxChange(index)}
                      />

                      <label htmlFor={`checkbox${index}`}></label>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="textarea-container">
            <textarea
              placeholder="Enter text here..."
              value={workDetails.workDescription}
              onChange={(e) =>
                setWorkDetails({
                  ...workDetails,
                  workDescription: e.target.value,
                })
              }
            />
            <img
              className="icon-image"
              src="/image/ic_baseline-edit.png"
              alt="IcoImage"
            />
          </div>
        </div>

        <div className="Our-Projects-edit-work">
          <div className="Our-Projects-edit-work-inner-edit">
            <div className="Our-Projects-edit-work-inner-word-edit">
              <h2>Planning</h2>
            </div>
            <div className="checkbox101">
              <input
                type="checkbox"
                id="checkbox101"
                checked={workDetails.planning !== ""}
                onChange={(e) => {
                  if (!e.target.checked) {
                    const confirmed = window.confirm(
                      "Are you sure you want to remove the planning image?"
                    );
                    // If checkbox is checked, remove planning from workDetails
                    if (confirmed) {
                      setWorkDetails((prevState) => ({
                        ...prevState,
                        planning: "",
                      }));
                    }
                  }
                }}
              />

              <label
                htmlFor="checkbox101"
                style={{ width: "25px", height: "26px", fontSize: "15px" }}
              ></label>
            </div>
          </div>

          <div className="thumnaile-image1-edit-work">
            <div className="image-outter-row-edit-work">
              <div className="image-row-edit-work">
                <div className="image-container-edit-work">
                  {/* <!-- <p className="image-para-edit-work">Before</p> --> */}
                  <div className="flex-img-drop-edit-work">
                    {workDetails.planning ? (
                      <img
                        className="service-image-inside-wrok-edit-work"
                        src={workDetails.planning}
                        alt="Image1"
                      />
                    ) : (
                      <img
                        className="service-image-inside-wrok-edit-work"
                        src="/image/demo-imageeee.png"
                        alt="Image1"
                      />
                    )}
                  </div>
                  <div className="upload-button">
                    <label
                      htmlFor="file-upload-planning"
                      style={{ display: "flex" }}
                    >
                      <img src="/image/upolod-icon-ima.png" alt="Upload Icon" />
                      Upload Image
                    </label>
                    <input
                      type="file"
                      name="image1"
                      id="file-upload-planning"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        handlePlanning(file);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Our-Projects-work-edit">
          <div className="Our-Projects-inner-edit-work-edit">
            <div className="Our-Projects-inner-word-edit-work-edit">
              <h2>3d Render Model</h2>
            </div>
            <div className="checkbox10">
              <input
                type="checkbox"
                id="checkbox10"
                checked={
                  workDetails.renderModelBefore !== "" ||
                  workDetails.renderModelAfter !== ""
                }
                onChange={(e) => {
                  if (!e.target.checked) {
                    const confirmed = window.confirm(
                      "Are you sure you want to remove the render models?"
                    );
                    // If checkbox is checked, remove planning from workDetails
                    if (confirmed) {
                      setWorkDetails((prevState) => ({
                        ...prevState,
                        renderModelAfter: "",
                        renderModelBefore: "",
                      }));
                    }
                  }
                }}
              />

              <label
                htmlFor="checkbox10"
                style={{ width: "25px", height: "26px", fontSize: "15px" }}
              ></label>
            </div>
          </div>

          <div className="thumnaile-image1">
            <div className="image-outter-row">
              <div className="image-row">
                <div className="image-container-work-edit">
                  <p className="image-para">Before</p>
                  <div className="flex-img-drop">
                    {workDetails.renderModelBefore ? (
                      <img
                        className="service-image-inside-wrok"
                        src={workDetails.renderModelBefore}
                        alt="Image1"
                      />
                    ) : (
                      <img
                        className="service-image-inside-wrok"
                        src="/image/empty-image.png"
                        alt="Image1"
                      />
                    )}
                  </div>
                  <div className="upload-button">
                    <label
                      htmlFor="file-upload-before"
                      style={{ display: "flex" }}
                    >
                      <img src="/image/upolod-icon-ima.png" alt="Upload Icon" />
                      Upload Image
                    </label>
                    <input
                      type="file"
                      name="image2"
                      id="file-upload-before"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        handleRenderBefore(file);
                      }}
                    />
                  </div>
                </div>
                <div className="image-container-work-edit">
                  <p className="image-para">After</p>
                  <div className="flex-img-drop">
                    {workDetails.renderModelAfter ? (
                      <img
                        className="service-image-inside-wrok"
                        src={workDetails.renderModelAfter}
                        alt="Image1"
                      />
                    ) : (
                      <img
                        className="service-image-inside-wrok"
                        src="/image/empty-image.png"
                        alt="Image1"
                      />
                    )}
                  </div>
                  <div className="upload-button">
                    <label
                      htmlFor="file-upload-after"
                      style={{ display: "flex" }}
                    >
                      <img src="/image/upolod-icon-ima.png" alt="Upload Icon" />
                      Upload Image
                    </label>
                    <input
                      type="file"
                      id="file-upload-after"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        handleRenderAfter(file);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Our-Excellent-Service">
          <div className="Excellent-Service-inner-edit">
            <div className="Excellent-Service-inner-word-edit">
              <h2>Gallery</h2>
            </div>
            <div className="Excellent-Service-button">
              <button
                className="Excellent-Service-inner-button"
                onClick={() => handleAddGallery()}
              >
                Add Images
              </button>
            </div>
          </div>

          <div className="thumnaile-image1">
            <div className="image-outter-row">
              <div className="image-row">
                {workDetails &&
                  workDetails.gallery &&
                  workDetails.gallery.map((gallery, index) => (
                    <div className="image-container-work-edit">
                      <p className="image-para">
                        Image {index + 1}{" "}
                        <span
                          className="deldosnlgp"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <img
                            className="close-icon-about"
                            src="/image/jam_close.png"
                            alt=""
                          />
                        </span>
                      </p>
                      <div className="flex-img-drop">
                        <img
                          className="service-image"
                          src={gallery}
                          alt="Image1"
                        />
                      </div>
                      <div className="upload-button">
                        <label
                          htmlFor={"file-upload" + index}
                          style={{ display: "flex" }}
                        >
                          <img
                            src="/image/upolod-icon-ima.png"
                            alt="Upload Icon"
                          />
                          Upload Image
                        </label>
                        <input
                          type="file"
                          id={"file-upload" + index}
                          style={{ display: "none" }}
                          onChange={(e) => {
                            const file = e.target.files[0];
                            handleGalleryImage(file, index);
                          }}
                        />
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
export default DashEditWork;
