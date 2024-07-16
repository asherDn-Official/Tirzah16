import React, { useState } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import API_URL from "../Global";

export default function FeedBackForm() {
  const handleImageClick = () => {
    document.getElementById("upload-input").click();
  };
  const [formValue, setFormValue] = useState({
    feedbackName: "",
    feedbackEmail: "",
    feedbackImage: "https://i.imgur.com/2nGdI8V.png",
    feedbackText: "",
  });
  const handleFeedbackImage = async (file) => {
    try {
      const link = await handleImageUpload(file);
      if (link) {
        setFormValue({
          ...formValue,
          feedbackImage: link,
        });
        alert("Image Uploaded Successfully");
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
      await axios.post(`${API_URL}/feedback`, {
        feedbackName: formValue.feedbackName,
        feedbackEmail: formValue.feedbackEmail,
        feedbackImage: formValue.feedbackImage,
        feedbackText: formValue.feedbackText,
      });
      alert("FeedBack Submitted Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to Submit FeedBack. Try Again");
    }
  };
  return (
    <div className="container-fienosndls">
      <h1 className="form-feed-packid">Tirzah Feedback Form</h1>
      <div className="upload-photo">
        {formValue && formValue.feedbackImage ? (
          <img
            className="imageeojdmo"
            src={formValue.feedbackImage}
            alt="UserPhoto"
          />
        ) : (
          <img
            className="imageeojdmo"
            src="./image/feedup-img.png"
            alt="UserPhoto"
          />
        )}
        <div className="container-input">
          <img
            id="upload-icon-fiend"
            src="./image/fileupload-imageee.png"
            alt="Upload Icon"
            onClick={handleImageClick}
          />
          <input
            id="upload-input"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files[0];
              handleFeedbackImage(file);
            }}
          />
        </div>
        <div className="breakey">
          <p className="upitopara">Upload Photo</p>
          <p className="upload-paraisnd">JPG or PNG, Max size 500KB</p>
        </div>
      </div>
      <form className="feedback-form" onSubmit={handleSave}>
        <label className="label-feedbackeiy" htmlFor="name">
          Name:
        </label>
        <input
          className="form-text-input-feedback"
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name"
          onChange={(e) =>
            setFormValue({ ...formValue, feedbackName: e.target.value })
          }
          required
        />

        <label className="label-feedbackeiy" htmlFor="email">
          Email:
        </label>
        <input
          className="form-email-input-feedback"
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          onChange={(e) =>
            setFormValue({ ...formValue, feedbackEmail: e.target.value })
          }
          required
        />

        <label className="label-feedbackeiy" htmlFor="feedback">
          Feedback:
        </label>
        <textarea
          className="textatien"
          id="feedback"
          name="feedback"
          placeholder="Enter your feedback"
          onChange={(e) =>
            setFormValue({ ...formValue, feedbackText: e.target.value })
          }
          rows="5"
          required
        ></textarea>

        <div className="submitbuttoneik">
          <input className="submitoentskd" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}
