import Navbar from "../components/Navbar";
import React from "react";
import Products from "../components/Products";
import { Link } from "react-router-dom";
import Homestyle from "../styles/Home.module.css";
import Banner from "../components/Banner";

import bannerImg1 from "../assets/bannerImg1.png";
import bannerImg2 from "../assets/bannerImg2.png";
import bannerImg3 from "../assets/bannerImg3.png";

console.log("Navbar: ", Navbar);
console.log("Banner: ", Banner);
export default function Home() {
  return (
    <>
      <Navbar />
      <div className={Homestyle["page"]}>
        <main className="Page">
          <Banner />
          <div className={Homestyle["Navigate"]}>
            <div className={Homestyle["Featured"]}>
              <h3>Featured Items</h3>
              <div className={Homestyle["line"]}></div>
              <div className={Homestyle["items"]}>
                <Products text="1. I hammad" image={bannerImg1} />
                <Products text="2. I the hammad" image={bannerImg2} />
                <Products text="3. I not hammad" image={bannerImg3} />
              </div>
            </div>
            <Link to="/Catalog" className={Homestyle["button"]}>
              <h3>View More</h3>
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
