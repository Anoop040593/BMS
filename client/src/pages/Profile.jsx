import { Button, Card, Col, Row, message } from "antd";
import { useEffect, useState } from "react";
import { getAllBookings } from "../api/bookings";
import moment from "moment";
import { Link } from "react-router-dom";

const Profile = () => {
  const [bookings, setBookings] = useState([]);

  const validBookings = bookings.filter((b) => b.seats && b.seats.length > 0);

  const getData = async () => {
    try {
      const response = await getAllBookings();
      if (response.success) {
        setBookings(response.data);
      } else {
        message.error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App-header_base">
      <Row gutter={24}>
        {validBookings.length > 0 ? (
          validBookings.map((booking) => (
            <Col key={booking._id} xs={{ span: 24 }} lg={{ span: 12 }}>
              <Card className="mb-3">
                <div className="d-flex flex-column-mob">
                  <div className="flex-shrink-0">
                    <img
                      src={booking.show.movie.poster}
                      width={100}
                      alt="Movie Poster"
                    />
                  </div>

                  <div className="show-details flex-1">
                    <h3>{booking.show.movie.title}</h3>

                    <p>
                      Theatre: <b>{booking.show.theatre.name}</b>
                    </p>

                    <p>
                      Seats: <b>{booking.seats.join(", ")}</b>
                    </p>

                    <p>
                      Date & Time:{" "}
                      <b>
                        {moment(booking.show.date).format("MMM Do YYYY")}{" "}
                        {moment(booking.show.time, "HH:mm").format("hh:mm A")}
                      </b>
                    </p>

                    <p>
                      Amount:{" "}
                      <b>
                        Rs. {booking.seats.length * booking.show.ticketPrice}
                      </b>
                    </p>

                    <p>
                      Booking ID: <b>{booking.transactionId}</b>
                    </p>
                  </div>
                </div>
              </Card>
            </Col>
          ))
        ) : (
          <div className="text-center pt-3 w-100">
            <h1>You've not booked any show yet!</h1>
            <Link to="/">
              <Button type="primary">Start Booking</Button>
            </Link>
          </div>
        )}
      </Row>
    </div>
  );
};

export default Profile;
