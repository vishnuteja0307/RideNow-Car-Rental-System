
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCars } from "../data/cars";

function Cars() {
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setCars(getCars());

    const savedBookings = JSON.parse(
      localStorage.getItem("bookings") || "[]"
    );

    setBookings(savedBookings);
  }, []);

  const hasActiveBooking = (carName) => {
    return bookings.some(
      (booking) =>
        booking.car?.trim().toLowerCase() ===
          carName.trim().toLowerCase() &&
        booking.status !== "Cancelled"
    );
  };

  return (
    <div className="container py-5">

      <div className="text-center mb-5">
        <h2 className="fw-bold">Our Available Cars</h2>
        <p className="text-muted">
          Choose your favourite car and enjoy your journey.
        </p>
      </div>

      <div className="row g-4">

        {cars.length === 0 ? (
          <div className="col-12 text-center">
            <h5>No cars available currently.</h5>
          </div>
        ) : (
          cars.map((car) => {
            const booked = hasActiveBooking(car.name);

            return (
              <div className="col-md-6 col-lg-4" key={car.id}>

                <div className="car-card">

                  <img
                    src={car.image}
                    alt={car.name}
                    onError={(e) => {
                      e.target.src =
                        "https://placehold.co/600x400?text=Car+Image";
                    }}
                  />

                  <div className="p-3">

                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="fw-bold mb-0">
                        {car.name}
                      </h5>

                      <span
                        className={`badge ${
                          booked
                            ? "bg-warning text-dark"
                            : "bg-success"
                        }`}
                      >
                        {booked ? "Has Bookings" : "Available"}
                      </span>
                    </div>

                    <p className="text-muted mb-2">
                      {car.category}
                    </p>

                    <h5 className="text-danger fw-bold">
                      ₹{car.price}
                      <small className="text-muted fs-6">
                        /day
                      </small>
                    </h5>

                    <Link
                      to={`/booking?car=${encodeURIComponent(car.name)}&price=${car.price}`}
                      className="btn btn-danger w-100 mt-2"
                    >
                      Book Now
                    </Link>

                  </div>
                </div>

              </div>
            );
          })
        )}

      </div>
    </div>
  );
}

export default Cars;
