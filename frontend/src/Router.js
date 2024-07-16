import Home from "./Components/Home";
import About from "./Components/About";
import OurService from "./Components/OurService";
import DetailsPage from "./Components/DetailsPage";
import ContactUs from "./Components/ContactUs";
import OurServicePageOne from "./Components/OurServiceOne";
import OurWORKS from "./Components/OurWorks";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashHome from "./Components/Dashboard/dash-home";
import DashAbout from "./Components/Dashboard/dash-AboutUs";
import DashService from "./Components/Dashboard/dash-Service";
import DashWork from "./Components/Dashboard/dash-Work";
import DashContact from "./Components/Dashboard/dash-contact";
import DashProject from "./Components/Dashboard/dash-Project";
import DashEditWork from "./Components/Dashboard/dash-EditWork";
import "./App.css";
import { Navbar } from "./Components/Header";
import Footer from "./Components/Footer";
import FeedBackForm from "./Components/Dashboard/FeedBackForm";
import Login from "./Components/LoginPage";
import Protect from "./Components/Protectedroutes/Protect";

function Router() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Services" element={<OurService />} />
          <Route path="/Works/:workId" element={<DetailsPage />} />
          <Route path="/Services/:serviceId" element={<OurServicePageOne />} />
          <Route path="/Works" element={<OurWORKS />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/FeedBackForm" element={<FeedBackForm />} />

          <Route element={<Protect />}>
            <Route path="/edit/home" element={<DashHome />} />
            <Route path="/edit/About" element={<DashAbout />} />
            <Route path="/edit/OurService" element={<DashService />} />
            <Route
              path="/edit/DetailsPage/:workId"
              element={<DashEditWork />}
            />
            <Route
              path="/edit/OurServicePageOne/:serviceId"
              element={<DashProject />}
            />
            <Route path="/edit/OurWORKS" element={<DashWork />} />
            <Route path="/edit/ContactUs" element={<DashContact />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default Router;
