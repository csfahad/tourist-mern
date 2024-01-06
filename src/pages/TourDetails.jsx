import { useState, useEffect, useRef, useContext } from "react";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";

import useFetch from "../hooks/useFetch";
import { BASE_URL } from "./../utils/config";
import { AuthContext } from "./../context/AuthContext";
import { toast } from "react-toastify";
import moment from "moment";

import "../styles/TourDetails.css";
import calculateAvgRating from "../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";
import NewsLetter from "./../shared/NewsLetter";

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);
  const { user } = useContext(AuthContext);

  // fetch data from DB
  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);

  const {
    photo,
    title,
    desc,
    price,
    address,
    reviews,
    city,
    distance,
    maxGroupSize,
  } = tour;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  // submit request to the server
  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    try {
      if (!user || user === undefined || user === null) {
        return toast.error("Please login to submit a review");
      }

      const reviewObj = {
        username: user?.username,
        reviewText,
        rating: tourRating,
      };

      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(reviewObj),
      });

      const result = await res.json();
      if (!res.ok) {
        return toast.error(result.message);
      }
      toast.success("Review submitted");
    } catch (err) {
      toast.error(err.message);
    }

    // API call
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);

  return (
    <>
      <section>
        <Container>
          {loading && <h4 className="text-center pt-5">Loading...</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}

          {!loading && !error && (
            <Row>
              <Col lg="8">
                <div className="tour__content">
                  <img src={photo} alt="" />

                  <div className="tour__info">
                    <h2>{title}</h2>
                    <div className="d-flex align-items-center gap-5">
                      <span className="tour__location d-flex align-items-center gap-1">
                        <i
                          class="ri-star-fill"
                          style={{ color: "var(--secondary-color)" }}
                        ></i>
                        {avgRating === 0 ? null : avgRating}{" "}
                        {totalRating === 0 ? (
                          "No ratings"
                        ) : (
                          <span>({reviews?.length})</span>
                        )}
                      </span>

                      <span>
                        <i class="ri-map-pin-user-fill"></i> {address}
                      </span>
                    </div>

                    <div className="tour__extra-details">
                      <span>
                        <i class="ri-map-pin-2-fill"></i> {city}
                      </span>

                      <span>
                        <i class="ri-money-dollar-circle-line"></i> ${price}{" "}
                        /per person
                      </span>

                      <span>
                        <i class="ri-map-pin-time-line"></i> {distance} Km
                      </span>

                      <span>
                        <i class="ri-group-line"></i> {maxGroupSize} people
                      </span>
                    </div>

                    <h5>Description</h5>
                    <p>{desc}</p>
                  </div>

                  {/* =========== tour reviews section start =========== */}
                  <div className="tour__reviews mt-4">
                    <h4>Reviews ({reviews?.length} reviews)</h4>

                    <Form onSubmit={submitHandler}>
                      <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                        <span onClick={() => setTourRating(1)}>
                          <i class="ri-star-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(2)}>
                          <i class="ri-star-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(3)}>
                          <i class="ri-star-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(4)}>
                          <i class="ri-star-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(5)}>
                          <i class="ri-star-fill"></i>
                        </span>
                      </div>

                      <div className="review__input">
                        <input
                          type="text"
                          ref={reviewMsgRef}
                          placeholder="Share your thoughts..."
                          required
                        />
                        <button className="btn primary__btn text-white">
                          Submit
                        </button>
                      </div>
                    </Form>

                    <ListGroup className="user__reviews">
                      {reviews?.map((review) => (
                        <div className="review__item">
                          <img src={avatar} alt="avatar" />

                          <div className="w-100">
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <h5>{review?.username}</h5>
                                <p>
                                  {moment(review?.createdAt).format(
                                    "d MMM YYYY, h:mm a"
                                  )}
                                </p>
                              </div>

                              <span className="d-flex align-items-center">
                                {review?.rating} <i class="ri-star-s-fill"></i>
                              </span>
                            </div>

                            <h6>{review?.reviewText}</h6>
                          </div>
                        </div>
                      ))}
                    </ListGroup>
                  </div>
                  {/* =========== tour reviews section end =========== */}
                </div>
              </Col>

              <Col lg="4">
                <Booking tour={tour} avgRating={avgRating} />
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <NewsLetter />
    </>
  );
};

export default TourDetails;
