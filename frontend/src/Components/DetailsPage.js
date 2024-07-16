import React, { useEffect, useState } from "react";
import AOS from "aos";
import { useParams } from "react-router-dom";
import "aos/dist/aos.css";
import "../CSS/5.css";
import axios from "axios";
import API_URL from "./Global";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

function DetailsPage() {
  const { workId } = useParams();
  const [workData, setWorkData] = useState(null); // Initialize workData as null

  useEffect(() => {
    fetchWork();
  }); // Fetch work when workId changes

  const fetchWork = async () => {
    try {
      const response = await axios.get(`${API_URL}/service/work/${workId}`);
      setWorkData(response.data);
    } catch (error) {
      console.error("Error fetching work details:", error);
    }
  };

  // Conditional rendering based on whether workData is available or not

  if (!workData) {
    return <div>Loading...</div>;
  }

  // return <div>Hello</div>;

  return (
    <div>
      <div className="mEDIAoFTHDetailedAPewgection">
        <div className="dETAOSLDSectionDivWidth">
          {/* <!-------------------------Contact us First Page---------------> */}
          <div>
            <div className="BulifingNames">{workData.workName}</div>
          </div>
          {/* <!-------------------------Contact us First Page--------------->

        <!-------------------------Contact us Second Page---------------> */}

          <div>
            <div className="ContactPageDFlECXXS">
              <div className="WorkPagedivimahed">
                <img src={workData.workImage} alt="" />
              </div>

              <div className="displymainoftheoiurswecvbbs">
                {workData &&
                  workData.workSpecification.map((work, index) => (
                    <div key={index} className="WrokdsDetaislpASHDBHD">
                      <div className="WorkssDERSGoNE"> {work.topic}</div>
                      <div className="WorkssDERSTHREE">
                        :&nbsp;&nbsp;&nbsp;
                        <span className="MainPOnmistdhHidecommac">
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                        {work.detail}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {/*
        <!-------------------------Contact us Second Page--------------->

        <!-------------------------Contact us Third Page---------------> */}
          <div className="WdithContactushirdPageStylings">
            <div
              className="ContactushirdPageStylings"
              //  data-aos="slide-up"
            >
              {workData.workDescription}
            </div>
          </div>
          {/*
        <!-------------------------Contact us Third Page--------------->

        <!-------------------------Contact us Four Page---------------> */}

          {workData && workData.planning && (
            <div
            //  data-aos="slide-up"
            >
              <div className="PalnningMaindivsectsihon">
                <div className="planningoftheourservvspahe">Planning</div>
                <div className="Maindivotheoursecrvsimas">
                  <img src={workData.planning} alt="" />
                </div>
              </div>
            </div>
          )}
          {/*
        <!-------------------------Contact us Four Page--------------->*/}

          {/* <!-------------------------Contact us Five Page---------------> */}

          {/* {console.log("workData", workData)} */}

          {workData &&
            workData.renderModelBefore &&
            workData.renderModelAfter && (
              <div
              // data-aos="slide-up"
              >
                <div className="PalnningMaindivsectsihon">
                  <div className="planningoftheourservvspahe">
                    3d Render Model
                  </div>

                  <div className="CompareBEfpreAndFATERsLIDERdIV">
                    <ReactCompareSlider
                      itemOne={
                        <ReactCompareSliderImage
                          className="BeforeAndAFAterIamegone"
                          src={workData.renderModelBefore}
                          alt="Image one"
                        />
                      }
                      itemTwo={
                        <ReactCompareSliderImage
                          className="BeforeAndAFAterIamegtwo"
                          src={workData.renderModelAfter}
                          alt="Image two"
                        />
                      }
                    />
                  </div>
                </div>
              </div>
            )}

          {/* <!-------------------------Contact us Five Page---------------> */}

          {/* <!-------------------------Contact us Six Page--------------->  */}

          {workData && workData.gallery.length > 0 && (
            <div className="ContactusiPageSecton">
              <div>
                <div className="Gallerysectionforthedinmains">Gallery</div>

                <div className="MobilscreforBeddfacdhjWIRTH">
                  <div className="MobileScreemDisplyforthDetails">
                    <div className="GallerSectionOamhesFlex">
                      {workData &&
                        workData.gallery.map((work, index) => (
                          <div
                            key={index}
                            className="GallerySectriondivImagesize"
                          >
                            <img src={work} alt="" />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* <!-------------------------Contact us Six Page---------------> */}
        </div>
      </div>
    </div>
  );
}

AOS.init({
  duration: 1500,
});

export default DetailsPage;
