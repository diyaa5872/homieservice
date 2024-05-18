import React, { useState, useEffect } from 'react';
import "../stylesheets/Frontpage.css"

const Frontpage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const form = document.getElementById("form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      // Add form submission logic here
    });
  }, []);

  return (
    <div>
      <section>
      <div class="navbar-area">
    <div class="container">
      <nav class="site-navbar">
        <a href="#home" class="site-logo"><img class="logo" src='https://th.bing.com/th/id/OIP.WxoLwC-UeHOJ1Cfwf8ZZ6wHaHa?w=176&h=180&c=7&r=0&o=5&pid=1.7'></img></a>
        <button onClick={handleToggle}>
          <img src='https://www.bing.com/th?id=OIP.egW1bdz_4GBP4IL1B5eQ0AHaHa&w=150&h=150&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2' class="menuicon" onClick={handleToggle}></img>
        </button>
        {/* <button class="nav-toggler">
          <span></span>
        </button> */}
      </nav>
    </div>
  </div>
      </section>
      <section className="home">
        <div className="description">
          <h1 className="title">
            <span className="gradient-text">Your Trusted Partner</span>  for Home Services
          </h1>
          <p className="paragraph">
          Choose ___ for reliable, efficient, and high-quality home services. Our experienced professionals are here to provide comprehensive solutions that keep your home in top condition. We are dedicated to exceeding your expectations and delivering peace of mind.
          </p>
          <form id="form" autoComplete="off">
            <input
              type="email"
              id="email-id"
              name="email_address"
              aria-label="email address"
              placeholder=""
              required
            />
            <button type="submit" className="btn" aria-label="submit">
              <span>Login</span>
              <ion-icon name="arrow-forward-outline"></ion-icon>
            </button>
          </form>
        </div>
        <div className="users-color-container">
          <span className="item" style={{ '--i': 1 }}></span>
          <img
            className="item"
            src="https://th.bing.com/th?id=OIP.5blBpsEQxPV8QxQMukWV8gHaHK&w=254&h=245&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
            style={{ '--i': 2 }}
            alt=""
          />
          <span className="item" style={{ '--i': 3 }}></span>
          <img
            className="item"
            src="https://th.bing.com/th/id/OIP.ErLt-pjuGad94L-_bu1CYgHaGL?w=219&h=184&c=7&r=0&o=5&pid=1.7"
            style={{ '--i': 4 }}
            alt=""
          />
          <img
            className="item"
            src="https://th.bing.com/th/id/OIP.hMEof5CObAgDETy---FEfgHaEK?w=303&h=180&c=7&r=0&o=5&pid=1.7"
            style={{ '--i': 10 }}
            alt=""
          />
          <span className="item" style={{ '--i': 11 }}></span>
          <img
            className="item"
            src="https://th.bing.com/th/id/OIP.UBEZyAqYkr05a1tbVyIROQHaE8?w=225&h=187&c=7&r=0&o=5&pid=1.7"
            style={{ '--i': 12 }}
            alt=""
          />
          <span className="item" style={{ '--i': 5 }}></span>
          <span className="item" style={{ '--i': 9 }}></span>
          <img
            className="item"
            src="https://th.bing.com/th/id/OIP.4zMNOJTpirwkGidlMnpEpQHaGn?w=184&h=180&c=7&r=0&o=5&pid=1.7"
            style={{ '--i': 8 }}
            alt=""
          />
          <span className="item" style={{ '--i': 7 }}></span>
          <img
            className="item"
            src="https://th.bing.com/th/id/OIP.R3tXkVUuuHQMmNWjEVdjZwHaGE?w=231&h=189&c=7&r=0&o=5&pid=1.7"
            style={{ '--i': 6 }}
            alt=""
          />
        </div>
      </section>

      <section className="card-container" id="card-container">
        <div className="slider">
          <div className="card" data-tilt>
            <div className="content">
              <img src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/10088b1a-c0aa-42a9-8dff-1a692eb597d6" alt="" />
              <h1>Personalized Guidance</h1>
              <p>
                Whether you are pursuing a career change, entrepreneurship, or
                personal development, a mentor offers substantial advice and
                support to navigate your unique path.
              </p>
              <button className="btn btn-grad">
                <span>Learn More</span>
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </button>
            </div>
          </div>
          {/* Repeat the card structure for other cards */}
        </div>

        <ul className="control" id="custom-control">
          <li className="prev">
            <ion-icon className="arrow" name="caret-back-outline"></ion-icon>
          </li>
          <li className="next">
            <ion-icon className="arrow" name="caret-forward-outline"></ion-icon>
          </li>
        </ul>
      </section>

<section>
  <div className={sidebarOpen ? "sidebar open" : "sidebar"}>
      <div class="sidebar">
			<div class="sidebar-overlay"></div>
			<div class="sidebar-content">
				<div class="top-head">
					<div class="name">Diya Dhankhar</div>
					<div class="email">contact@dhankhardiya.8</div>
				</div>
				<div class="nav-left">
					<a href="#home"><span class="ion-ios-home-outline"></span> Home</a>
					<a href="#alarm"><span class="ion-ios-list-outline"></span> profile</a>
					<a href="#compose"><span class="ion-ios-compose-outline"></span> About Us</a>
					<a href="#chats"><span class="ion-ios-chatboxes-outline"></span> Chats</a>
					<a href="#profile"><span class="ion-ios-person-outline"></span> </a>
					<a href="#settings"><span class="ion-ios-gear-outline"></span> Login</a>
					<a href="#credits"><span class="ion-ios-information-outline"></span>Register</a>
				</div>
			</div>
		</div>
    </div>
    </section>

    </div>
  );
};

export default Frontpage;
