import React from 'react'
import "../stylesheets/Register.css"

const Register = () => {
  const [current_fs, setCurrent_fs] = React.useState(null);
  const [next_fs, setNext_fs] = React.useState(null);
  const [previous_fs, setPrevious_fs] = React.useState(null);
  const [left, setLeft] = React.useState('0%');
  const [opacity, setOpacity] = React.useState(0);
  const [scale, setScale] = React.useState(1);
  const [animating, setAnimating] = React.useState(false);

  const animate = () => {
    if (animating) return;
    setAnimating(true);

    setScale(1 - (1 - opacity) * 0.2);
    setLeft(opacity * 50 + '%');
    setOpacity(1 - opacity);

    current_fs.style.transform = `scale(${scale})`;
    next_fs.style.left = left;
    next_fs.style.opacity = opacity;

    if (opacity === 0) {
      current_fs.style.display = 'none';
      setAnimating(false);
    }
  }

  const next = (e) => {
    e.preventDefault();
    setCurrent_fs(e.target.parentElement);
    setNext_fs(e.target.parentElement.nextElementSibling);
    setAnimating(true);

    //activate next step on progressbar using the index of next_fs
    const progressbar = document.getElementById("progressbar");
    const active = progressbar.querySelector(".active");
    active.classList.remove("active");
    active.nextElementSibling.classList.add("active");

    animate();
  }

  const previous = (e) => {
    e.preventDefault();
    setCurrent_fs(e.target.parentElement);
    setPrevious_fs(e.target.parentElement.previousElementSibling);
    setAnimating(true);

    //de-activate current step on progressbar
    const progressbar = document.getElementById("progressbar");
    const active = progressbar.querySelector(".active");
    active.classList.remove("active");

    animate();
  }

  const submit = (e) => {
    e.preventDefault();
    // handle form submission here
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <form id="msform">
            <ul id="progressbar">
              <li className="active">Account Setup</li>
              <li>Social Profiles</li>
              <li>Personal Details</li>
            </ul>
            <fieldset>
              <h2 className="fs-title">Create your account</h2>
              <h3 className="fs-subtitle">This is step 1</h3>
              <input type="text" name="email" placeholder="Email" />
              <input type="password" name="pass" placeholder="Password" />
              <input type="password" name="cpass" placeholder="Confirm Password" />
              <input type="button" name="next" className="next action-button" value="Next" onClick={next} />
            </fieldset>
            <fieldset>
              <h2 className="fs-title">Social Profiles</h2>
              <h3 className="fs-subtitle">Your presence on the social network</h3>
              <input type="text" name="twitter" placeholder="Twitter" />
              <input type="text" name="facebook" placeholder="Facebook" />
              <input type="text" name="gplus" placeholder="Google Plus" />
              <input type="button" name="previous" className="previous action-button" value="Previous" onClick={previous} />
              <input type="button" name="next" className="next action-button" value="Next" onClick={next} />
            </fieldset>
            <fieldset>
              <h2 className="fs-title">Personal Details</h2>
              <h3 className="fs-subtitle">We will never sell it</h3>
              <input type="text" name="fname" placeholder="First Name" />
              <input type="text" name="lname" placeholder="Last Name" />
              <input type="text" name="phone" placeholder="Phone" />
              <textarea name="address" placeholder="Address"></textarea>
              <input type="button" name="previous" className="previous action-button" value="Previous" onClick={previous} />
              <input type="submit" name="submit" className="submit action-button" value="Submit" onClick={submit} />
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register