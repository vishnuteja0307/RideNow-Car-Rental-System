
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCars } from "../data/cars";

function Home() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    setCars(getCars().slice(0, 3));
  }, []);

  const reviews = [
    {
      name: "Rahul Kumar",
      location: "Hyderabad",
      rating: 5,
      review:
        "Excellent experience! The car was clean and booking was very easy. I had a comfortable journey."
    },
    {
      name: "Priya Sharma",
      location: "Vijayawada",
      rating: 5,
      review:
        "Great collection of cars at affordable prices. The booking process was simple and smooth."
    },
    {
      name: "Arjun Reddy",
      location: "Guntur",
      rating: 4,
      review:
        "Good experience overall. The car was in good condition and perfect for our family trip."
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section
        className="py-5"
        style={{
          background: "linear-gradient(120deg, #f8f9fa, #eaf1f8)"
        }}
      >
        <div className="container py-4">
          <div className="row align-items-center">

            <div className="col-lg-6">
              <p className="text-danger fw-bold">
                YOUR JOURNEY STARTS HERE
              </p>

              <h1 className="display-3 fw-bold mb-3">
                Find Your <span className="text-danger">Perfect Ride</span>
              </h1>

              <p className="text-secondary fs-5 mb-4">
                Explore our collection of cars and enjoy
                comfortable, safe and affordable journeys.
              </p>

              <Link to="/cars" className="btn btn-danger btn-lg me-2">
                Explore Cars
              </Link>
            </div>

            <div className="col-lg-6 mt-4 mt-lg-0">
              <img
                src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1000"
                alt="RideNow car"
                className="img-fluid rounded-4 shadow"
                style={{
                  width: "100%",
                  height: "340px",
                  objectFit: "cover"
                }}
              />
            </div>

          </div>
        </div>
      </section>

      {/* RideNow Highlights */}
      <section className="container py-4">
        <div className="row g-3 text-center">

          <div className="col-md-4">
            <div className="p-4 rounded-3 shadow-sm bg-white">
              <h2 className="fw-bold text-danger">
                {cars.length}+
              </h2>
              <p className="text-muted mb-0">Cars Available</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-4 rounded-3 shadow-sm bg-white">
              <h2 className="fw-bold text-danger">Easy</h2>
              <p className="text-muted mb-0">Online Booking</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-4 rounded-3 shadow-sm bg-white">
              <h2 className="fw-bold text-danger">3+</h2>
              <p className="text-muted mb-0">Car Categories</p>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Cars */}
      <section className="container py-5">

        <div className="text-center mb-5">
          <p className="text-danger fw-bold mb-2">OUR COLLECTION</p>
          <h2 className="fw-bold">Featured Cars</h2>
          <p className="text-muted">
            Find the right car for your next journey.
          </p>
        </div>

        <div className="row g-4">

          {cars.map((car) => (
            <div className="col-md-6 col-lg-4" key={car.id}>
              <div className="card h-100 border-0 shadow-sm">

                <img
                  src={car.image}
                  alt={car.name}
                  className="card-img-top"
                  style={{
                    height: "200px",
                    objectFit: "cover"
                  }}
                  onError={(e) => {
                    e.target.src =
                      "https://placehold.co/600x400?text=Car+Image";
                  }}
                />

                <div className="card-body p-3">

                  <p className="text-muted mb-1">
                    {car.category}
                  </p>

                  <h5 className="fw-bold">{car.name}</h5>

                  <div className="d-flex justify-content-between align-items-center mt-3">

                    <h5 className="text-danger fw-bold mb-0">
                      ₹{Number(car.price).toLocaleString("en-IN")}
                      <small className="text-muted fs-6">/day</small>
                    </h5>

                    <Link
                      to={`/booking?car=${encodeURIComponent(car.name)}&price=${car.price}`}
                      className="btn btn-danger btn-sm"
                    >
                      Book Now
                    </Link>

                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>

        <div className="text-center mt-4">
          <Link to="/cars" className="btn btn-outline-dark px-4">
            View All Cars
          </Link>
        </div>

      </section>

      {/* Why Choose Us */}
      <section className="py-5 bg-light">
        <div className="container">

          <div className="text-center mb-5">
            <p className="text-danger fw-bold">WHY RIDENOW?</p>
            <h2 className="fw-bold">Why Choose RideNow?</h2>
            <p className="text-muted">
              Making every journey simple and comfortable.
            </p>
          </div>

          <div className="row g-4">

            <div className="col-md-4">
              <div className="bg-white rounded-3 shadow-sm p-4 h-100 text-center">
                <h1>₹</h1>
                <h5 className="fw-bold">Affordable Prices</h5>
                <p className="text-muted mb-0">
                  Choose cars that match your budget.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="bg-white rounded-3 shadow-sm p-4 h-100 text-center">
                <h1>✓</h1>
                <h5 className="fw-bold">Easy Booking</h5>
                <p className="text-muted mb-0">
                  Book your favourite car in just a few steps.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="bg-white rounded-3 shadow-sm p-4 h-100 text-center">
                <h1>🚘</h1>
                <h5 className="fw-bold">Wide Selection</h5>
                <p className="text-muted mb-0">
                  Explore different cars for every journey.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="container py-5">

        <div className="text-center mb-4">
          <p className="text-danger fw-bold">CUSTOMER FEEDBACK</p>
          <h2 className="fw-bold">What Our Customers Say</h2>
          <p className="text-muted">
            Experiences shared by our customers.
          </p>
        </div>

        {/* Overall Rating */}
        <div className="text-center mb-5">
          <h1 className="fw-bold text-danger mb-1">4.8/5</h1>

          <div className="mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                style={{ color: "#F5A623", fontSize: "25px" }}
              >
                ★
              </span>
            ))}
          </div>

          <p className="text-muted mb-0">
            Overall sample rating
          </p>
        </div>

        {/* Review Cards */}
        <div className="row g-4">

          {reviews.map((review, index) => (
            <div className="col-md-4" key={index}>
              <div className="bg-white rounded-3 shadow-sm p-4 h-100">

                <div className="mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      style={{
                        color: star <= review.rating ? "#F5A623" : "#D3D3D3",
                        fontSize: "20px"
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <p className="text-secondary">
                  "{review.review}"
                </p>

                <hr />

                <h6 className="fw-bold mb-1">
                  {review.name}
                </h6>

                <small className="text-muted">
                  {review.location}
                </small>

              </div>
            </div>
          ))}

        </div>

        <p className="text-center text-muted mt-3 small">
          Sample reviews and ratings for project demonstration.
        </p>

      </section>

      {/* Call To Action */}
      <section className="container py-5">
        <div
          className="text-center text-white rounded-4 p-5"
          style={{ backgroundColor: "#212529" }}
        >
          <h2 className="fw-bold mb-3">
            Ready for Your Next Journey?
          </h2>

          <p className="text-light mb-4">
            Choose your favourite car and start exploring today.
          </p>

          <Link to="/cars" className="btn btn-danger btn-lg px-4">
            Book Your Car
          </Link>
        </div>
      </section>

    </>
  );
}

export default Home;
