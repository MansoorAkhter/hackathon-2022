import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="home-page">
        <div className="home-div">
          <p className="pt-5">WELCOME</p>
          <h1>SMIT Student Portal</h1>
          <Link to="/viewcourses">
            <button className="home-view-courses">VIEW COURSES</button>
          </Link>
        </div>

        <div className="home-facebook-Feed">
          <div className="facebookFeed-Cont" 
            dangerouslySetInnerHTML={{
              __html:
                "<iframe src='https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FSaylaniMassTraining%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId' width='340' height='500' style='border:none;overflow:hidden' scrolling='no' frameborder='0' allowfullscreen='true' allow='autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share'></iframe>",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
