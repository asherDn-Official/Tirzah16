import React, { useEffect, useState } from "react";
// importing aos
import AOS from "aos";
import "aos/dist/aos.css";
import "../CSS/Contact.css";
import axios from "axios";
import API_URL from "./Global";

function ContactUs() {
  const [contactUsData, setContactUsData] = useState({
    location: "",
    address: "",
    mobileNumber1: "",
    mobileNumber2: "",
    mailId: "",
  });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mailId: "",
    mobileNumber: "",
    message: "",
  });
  useEffect(() => {
    fetchContactData();
  }, [contactUsData]);
  const fetchContactData = async () => {
    try {
      const response = await axios.get(`${API_URL}/contactUs`);
      setContactUsData(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };
  const handleSubmit = async () => {
    try {
      // const response = await axios.post(`${API_URL}/contactUs/form`, formData);
      setFormData("");
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };
  return (
    <div>
      <div className="mEDIAoFcONTACTGSsection">
        <div className="cONTACTSSectionDivWidth">
          {/* <!-----------New Contact US Page div Section--------------------> */}

          <div className="mAPSSECTIONdispflexx">
            <div className="ContactNewPageFirstEECTION">
              <div className="ContactNContactUFirstEECTION">Contact Us</div>

              <div className="FormSWEVCtyonoftheDivmain">
                <form action="" onSubmit={handleSubmit}>
                  <div className="FirstDIvfLEXOFTHElATSNme">
                    <div>
                      <div className="FirstNameServicePage">First Name</div>
                      <div>
                        <input
                          required
                          className="InpuitNmeodtheNameuser"
                          type=""
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              firstName: e.target.value,
                            })
                          }
                          placeholder="First Name"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="FirstNameServicePage1">Last Name</div>
                      <div>
                        <input
                          required
                          className="InpuitNmeodtheNameuser1"
                          type=""
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              lastName: e.target.value,
                            })
                          }
                          placeholder="Last Name"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="MaildIDFortheDivINpiut">Mail Id</div>
                    <div>
                      <input
                        type="email"
                        required
                        className="mAILiDfoerthinbpurdiv"
                        value={formData.mailId}
                        onChange={(e) =>
                          setFormData({ ...formData, mailId: e.target.value })
                        }
                        placeholder="xyz123@gmail.com"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="MaildIDFortheDivINpiut">Contact Number</div>
                    <div>
                      <input
                        type="number"
                        required
                        className="mAILiDfoerthinbpurdiv"
                        value={formData.mobileNumber}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            mobileNumber: e.target.value,
                          })
                        }
                        placeholder="+91 9999999999"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="MaildIDFortheDivINpiut">Message</div>
                    <div>
                      <textarea
                        name=""
                        id=""
                        className="textAreaadivinput"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        required
                      ></textarea>
                    </div>
                  </div>

                  <button className="COntactsERSVIDWsUBMIYT" type="submit">
                    Submit
                  </button>
                </form>
              </div>
            </div>
            <div>
              {contactUsData && contactUsData.location && (
                <iframe
                  className="MapsnAMEiFRAMESIZE"
                  src={contactUsData.location}
                  allowFullScreen=""
                  loading="lazy"
                  title="Mpas"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              )}
            </div>
          </div>

          {/* <!-----------New Contact US Page div Section-------------------->

        <!-----------New Contact SEcond Page div Section--------------------> */}

          <div>
            <div className="OUrServivedsdgdtiondiv">
              <div className="NewContactSEcondagdiectionFlex">
                <div>
                  <div className="OfficeAddressdicv">Office Address</div>
                  <div className="flexingOfficeAddressdicv">
                    <div className="loactionIamgeeesdivsixe">
                      <img src="/images/fluent_location-16-filled.png" alt="" />
                    </div>
                    <div className="ASddresssofhenamediv">
                      {contactUsData.address}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="ContactNumberDksiflex">Contact Number</div>
                  <div className="CondfsfNumberdsiv">
                    <div className="ContactsdfsfNumberdsiv">
                      <div className="Mpoblilevontactdiv">
                        <img src="/images/icomoon-free_mobile.png" alt="" />
                      </div>
                      <div className="numberodftheservicePage">
                        {contactUsData.mobileNumber1}
                      </div>
                    </div>

                    <div className="ContactsdfsfNumberdsiv">
                      <div className="Mpoblilevontactdiv">
                        <img src="/images/icomoon-free_mobile.png" alt="" />
                      </div>
                      <div className="numberodftheservicePage">
                        {contactUsData.mobileNumber2}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="Emaillldivsectrion">Email</div>

                  <div className="EamilsECTIONFLEXDDDI">
                    <div className="MailIamgesdivsssdad">
                      <img src="/images/fluent_mail-24-filled.png" alt="" />
                    </div>
                    <div className="xyz123gmailcom">{contactUsData.mailId}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <!-----------New Contact SEcond Page div Section--------------------> */}
        </div>
      </div>
    </div>
  );
}

AOS.init({
  duration: 1000,
});

export default ContactUs;
