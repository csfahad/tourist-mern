import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";

import "./Booking.css";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";
import { toast } from "react-toastify";

const Booking = ({ tour, avgRating }) => {
  const { price, reviews, title } = tour;
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const [booking, setBooking] = useState({
    userId: user && user?._id,
    userEmail: user && user?.email,
    tourName: title,
    fullName: user && user?.username,
    phone: "",
    guestSize: 1,
    bookAt: "",
  });

  const [btndisabled, setBtnDisabled] = useState(true);

  const handleChange = (e) => {
    setBooking((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
    setBtnDisabled(false);
  };

  const serviceFee = 10;
  const totalAmount =
    Number(price) * Number(booking?.guestSize) + Number(serviceFee);

  //   send data to the server
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      if (!user || user === undefined || user === null) {
        toast.error("Please sign-in first");
        return navigate("/login");
      }

      const res = await fetch(`${BASE_URL}/booking`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(booking),
      });

      const result = await res.json();

      if (!res.ok) {
        return toast.error(result.message);
      }
      navigate("/thank-you");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ${price}
          <span>/per person</span>
        </h3>
        <span className="tour__location d-flex align-items-center">
          <i class="ri-star-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      {/* =========== booking form start =========== */}
      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={handleClick}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full name"
              id="fullName"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="number"
              placeholder="Phone"
              id="phone"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              placeholder=""
              id="bookAt"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Number of guests"
              id="guestSize"
              required
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </div>
      {/* =========== booking form end =========== */}

      {/* =========== booking bottom start =========== */}
      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              ${price} <i class="ri-close-line"></i> 1 person
            </h5>
            <span>${price}</span>
          </ListGroupItem>

          <ListGroupItem className="border-0 px-0">
            <h5>Service charge</h5>
            <span>${serviceFee}</span>
          </ListGroupItem>

          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span>${totalAmount}</span>
          </ListGroupItem>
        </ListGroup>

        <Button
          disabled={btndisabled}
          className="btn primary__btn w-100 mt-4"
          onClick={handleClick}
        >
          Book now
        </Button>
      </div>
      {/* =========== booking bottom end =========== */}
    </div>
  );
};

export default Booking;
