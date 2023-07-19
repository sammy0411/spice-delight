/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { useState, useEffect } from "react";

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    let response = await fetch("/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();

    // console.log(response[0] , response[1])
    setFoodItem(response[0]); // state me data save ho gya h
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (

    <div>

      <Navbar />

      <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
                <div className="carousel-inner" id="carousel">
                    <div className='carousel-caption' style={{ zIndex: '10' }}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control mr-sm-2 " type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => {setSearch(e.target.value)}}/>
                             { /*  <button className="btn btn-outline-success my-2 my-sm-0 text-white bg-success" type="submit">Search</button> */}
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="d-block w-100" alt="..." style={{ filter: "brightness(30%" }} />
                    </div>
                    <div className="carousel-item">
                        <img src="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="d-block w-100" alt="..." style={{ filter: "brightness(30%" }} />
                    </div>
                    <div className="carousel-item">
                        <img src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="d-block w-100" alt="..." style={{ filter: "brightness(30%" }} />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
      </div>


      <div className="container" >
        {foodCat !== [] ? ( foodCat.map((data) => { return (
              <div key={data._id} className="mb-3">
                <div className="fs-3 m-3" style={{backgroundColor:"#874000",padding:"0"}}>{data.CategoryName}</div>
                <hr />
                <div className="row">
                  {foodItem !== [] ? ( foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                    .map((filterItems) => {
                        return (
                          <div key={filterItems._id} className="col-12 col-md-6 col-lg-3" >
                            <Card
                              foodItem={filterItems}             // foodName={filterItems.name}
                              options={filterItems.options[0]}
                              // imgSrc={filterItems.img}
                              // description={filterItems.description}
                            />
                          </div>
                        );
                      })
                  )
                   : 
                   (
                    <div>No such data Found</div>
                  )}
                </div>
              </div>
            );
          })
        ) 
        :
        (
          <div>""</div>
        )}

      </div>


      <Footer />
    </div>
  );
}
