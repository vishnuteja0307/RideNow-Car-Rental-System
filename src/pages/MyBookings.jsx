
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCars } from "../data/cars";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const savedBookings = JSON.parse(
      localStorage.getItem("bookings") || "[]"
    );

    setBookings(savedBookings);
    setCars(getCars());
  }, []);

  const cancelBooking = (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    const updatedBookings = bookings.map((booking) =>
      booking.id === id
        ? { ...booking, status: "Cancelled" }
        : booking
    );

    localStorage.setItem(
      "bookings",
      JSON.stringify(updatedBookings)
    );

    setBookings(updatedBookings);
  };

  const formatPrice = (amount) =>
    Number(amount || 0).toLocaleString("en-IN");

  return (
    <div className="container py-5">

      <div className="text-center mb-5">
        <h1 className="fw-bold">My Bookings</h1>
        <p className="text-muted">
          View and manage your car rental bookings.
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-5">
          <h4>No Bookings Found</h4>

          <p className="text-muted">
            You haven't booked any cars yet.
          </p>

          <Link to="/cars" className="btn btn-danger px-4">
            Explore Cars
          </Link>
        </div>
      ) : (
        <div className="row g-4">

          {bookings.map((booking) => {
            const carDetails = cars.find(
              (car) => car.name === booking.car
            );

            return (
              <div className="col-md-6 col-lg-4" key={booking.id}>

                <div className="booking-card p-3 h-100">

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="fw-bold mb-0">
                      {booking.car}
                    </h4>

                    <span
                      className={`badge ${
                        booking.status === "Confirmed"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {booking.status || "Confirmed"}
                    </span>
                  </div>

                  {carDetails?.image && (
                    <img
                      src={carDetails.image}
                      alt={booking.car}
                      className="w-100 rounded mb-3"
                      style={{
                        height: "200px",
                        objectFit: "cover"
                      }}
                      onError={(e) => {
                        e.target.src =
                          "https://placehold.co/600x400?text=Car+Image";
                      }}
                    />
                  )}

                  <hr />

                  <p>
                    <strong>Customer:</strong> {booking.customer}
                  </p>

                  <p>
                    <strong>Phone:</strong> {booking.phone}
                  </p>

                  <p>
                    <strong>Pickup Date:</strong> {booking.pickupDate}
                  </p>

                  <p>
                    <strong>Return Date:</strong> {booking.returnDate}
                  </p>

                  <p>
                    <strong>Rental Duration:</strong>{" "}
                    {booking.rentalDays} Days
                  </p>

                  <p>
                    <strong>Price Per Day:</strong>{" "}
                    ₹{formatPrice(booking.pricePerDay)}
                  </p>

                  <hr />

                  <div className="d-flex justify-content-between align-items-center">
                    <strong>Total Amount</strong>

                    <h4 className="text-danger fw-bold mb-0">
                      ₹{formatPrice(booking.totalPrice)}
                    </h4>
                  </div>

                  {booking.status === "Confirmed" && (
                    <button
                      className="btn btn-outline-danger w-100 mt-4"
                      onClick={() => cancelBooking(booking.id)}
                    >
                      Cancel Booking
                    </button>
                  )}

                  {booking.status === "Cancelled" && (
                    <p className="text-danger text-center mt-4 mb-0">
                      This booking has been cancelled.
                    </p>
                  )}

                </div>
              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}

export default MyBookings;
