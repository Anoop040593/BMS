import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getShowsById } from "../api/shows.js";
import { makePayment, bookShow } from "../api/bookings.js";
import { Card, Row, Col, Button, message } from "antd";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";

const BookShow = () => {
  const { showId } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Function to generate seat layout dynamically
  const getSeats = () => {
    let columns = 12; // Number of columns for seating arrangement
    let totalSeats = 120; // Total number of seats
    let rows = totalSeats / columns; // Calculating number of rows
    console.log(show.bookedSeats);

    return (
      <div className="d-flex flex-column align-items-center">
        <div className="w-100 max-width-600 mx-auto mb-25px">
          <p className="text-center mb-10px">
            Screen this side, you will be watching in this direction
          </p>
          <div className="screen-div">
            {/* Placeholder for screen display */}
          </div>
        </div>
        <ul
          className="seat-ul justify-content-center"
          style={{ marginLeft: "25%" }}
        >
          {Array.from(Array(rows).keys()).map((row) =>
            // Mapping rows
            Array.from(Array(columns).keys()).map((column) => {
              let seatNumber = row * columns + column + 1; // Calculating seat number

              let seatClass = "seat-btn"; // Default class for seat button
              if (selectedSeats.includes(seatNumber)) {
                seatClass += " selected"; // Adding 'selected' class if seat is selected
              }
              if (show.bookedSeats.includes(String(seatNumber))) {
                seatClass += " booked"; // Adding 'booked' class if seat is already booked
              }
              if (seatNumber <= totalSeats) {
                // Rendering seat button if seat number is valid
                return (
                  <li key={seatNumber}>
                    {/* Key added for React list rendering optimization */}
                    <button
                      disabled={show.bookedSeats.includes(String(seatNumber))}
                      className={seatClass}
                      onClick={() => {
                        // Function to handle seat selection/deselection
                        if (selectedSeats.includes(seatNumber)) {
                          setSelectedSeats(
                            selectedSeats.filter(
                              (curSeatNumber) => curSeatNumber !== seatNumber,
                            ),
                          );
                        } else {
                          setSelectedSeats([...selectedSeats, seatNumber]);
                        }
                      }}
                    >
                      {seatNumber}
                    </button>
                  </li>
                );
              }
            }),
          )}
        </ul>

        <div className="d-flex bottom-card justify-content-between w-100 max-width-600 mx-auto mb-25px mt-3">
          <div className="flex-1">
            Selected Seats: <span>{selectedSeats.join(", ")}</span>
          </div>
          <div className="flex-shrink-0 ms-3">
            Total Price:{" "}
            <span>Rs. {selectedSeats.length * show.ticketPrice}</span>
          </div>
        </div>
      </div>
    );
  };

  const handlePayment = async () => {
    try {
      const paymentResponse = await makePayment();

      if (paymentResponse.success) {
        // Then process payment
        const bookingPayload = {
          show: showId,
          seats: selectedSeats,
          amount: selectedSeats.length * show.ticketPrice * 100, // Amount in cents
          transactionId: paymentResponse.data,
        };

        const bookingResponse = await bookShow(bookingPayload);

        if (bookingResponse.success) {
          message.success("Booking successful! Your tickets are booked.");
          navigate("/profile");
        } else {
          message.error(
            bookingResponse.message || "Booking failed. Please try again.",
          );
        }
      } else {
        message.error(
          paymentResponse.message || "Payment failed. Please try again.",
        );
      }
    } catch (error) {
      console.error("Payment error:", error);
      message.error("An error occurred during payment. Please try again.");
    }
  };

  const onToken = (token) => {
    console.log("Token genreated: ", token);
  };

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await getShowsById(showId);
        console.log("Show Details Response:", response);
        setShow(response.data);
      } catch (error) {
        console.error("Error fetching show details:", error);
      }
    };

    if (showId) {
      fetchShowDetails();
    }
  }, [showId]);

  return (
    <div className="App-header_base">
      {show && (
        <Row gutter={24}>
          <Col span={24}>
            <Card
              title={
                <div className="movie-title-details">
                  <h1>{show.movie.title}</h1>
                  <p>
                    Theatre: {show.theatre.name}, {show.theatre.address}
                  </p>
                </div>
              }
              extra={
                <div className="show-name py-3">
                  <h3>
                    <span>Date & Time: </span>
                    {moment(show.date).format("MMM Do YYYY")} at{" "}
                    {moment(show.time, "HH:mm").format("hh:mm A")}
                  </h3>
                  <h3>
                    <span>Ticket Price:</span> Rs. {show.ticketPrice}/-
                  </h3>
                  <h3>
                    <span>Total Seats:</span> 120
                    <span> &nbsp;|&nbsp; Available Seats:</span>
                    {120 - show.bookedSeats}
                  </h3>
                </div>
              }
              style={{ width: "100%" }}
            >
              {getSeats()} {/* Rendering dynamic seat layout */}
              {selectedSeats.length > 0 && (
                <StripeCheckout
                  //token={onToken}
                  billingAddress
                  amount={selectedSeats.length * show.ticketPrice}
                  stripeKey="pk_test_51TSiVi2c4Bf3fFvgWdvFHsPWuR1709cAC4EHXUojl0xqwZUcMkF5Wdwrc7QnmHIPw6nq5YbIn7vn740PxVc9DyoO00EDR77Cyt"
                >
                  <div className="max-width-600 mx-auto">
                    <Button type="primary" shape="round" size="large" block>
                      Pay Now
                    </Button>
                  </div>
                </StripeCheckout>
              )}
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default BookShow;
