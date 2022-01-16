import React, { Component, lazy } from "react";
import {
   BrowserRouter as Router,
   Switch,
   Route,
   Redirect,
} from "react-router-dom";

import Header from "components/Header";
import BottomNavigation from "components/BottomNavigation";

const Home = lazy(() => import("pages/Home"));
const Image = lazy(() => import("pages/ImagePage/ImagePage"));
const Video = lazy(() => import("pages/VideoPage/VideoPage"));
const Document = lazy(() => import("pages/DocumentPage/DocumentPage"));
const Audio = lazy(() => import("pages/AudioPage/AudioPage"));
const MyProfile = lazy(() => import("pages/Profile"));
const FileUpload = lazy(() => import("pages/FileUpload"));

class Main extends Component {
   render() {
      return (
         <div>
            <Router>
               <Header />
               <Switch>
                  <Route path="/image" component={Image} />
                  <Route path="/video" component={Video} />
                  <Route path="/document" component={Document} />
                  <Route path="/audio" component={Audio} />
                  <Route path="/profile" component={MyProfile} />
                  <Route path="/upload" component={FileUpload} />
                  <Route exact="/" component={Home} />
                  <Redirect from="/" to="/" />
               </Switch>
               <BottomNavigation />
            </Router>
         </div>
      );
   }
}

export default Main;
