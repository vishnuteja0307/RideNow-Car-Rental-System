
import { useEffect, useState } from "react";
import { getCars } from "../data/cars";

const START_DATE = "2026-11-19";
const END_DATE = "2026-11-25";

const formatDate = (date) => {
  const [year, month, day] = date.split("-");
  return `${day}-${month}-${year}`;
};

const addDays = (dateString, days) => {
  const date = new Date(`${dateString}T00:00:00`);
  date.setDate(date.getDate() + days);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const createDemoBookings = (cars) => {
  const dailyCounts = [4, 4, 4, 5, 4, 5, 4];
  const demoBookings = [];
  let customerNumber = 1;

  dailyCounts.forEach((count, dayIndex) => {
    const bookingDate = addDays(START_DATE, dayIndex);

    for (let i = 0; i < count; i++) {
      const car = cars.length
        ? cars[(customerNumber - 1) % cars.length]
        : { name: "Demo Car", price: 1000 };

      const rentalDays = customerNumber % 2 === 0 ? 2 : 1;
      const price = Number(car.price) || 1000;

      demoBookings.push({
        id: `demo-${bookingDate}-${i + 1}`,
        customer: `Demo Customer ${String(customerNumber).padStart(2, "0")}`,
        phone: "Demo Record",
        car: car.name,
        pickupDate: bookingDate,
        returnDate: addDays(bookingDate, rentalDays),
        rentalDays,
        totalPrice: price * rentalDays,
        status: customerNumber % 10 === 0 ? "Cancelled" : "Confirmed",
        bookingDate,
        isDemo: true,
      });

      customerNumber++;
    }
  });

  return demoBookings;
};

function Admin() {
  const [bookings, setBookings] = useState([]);
  const [cars, setCars] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("SUV");
  const [image, setImage] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const availableCars = getCars();
    setCars(availableCars);

    let savedBookings = [];

    try {
      savedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    } catch {
      savedBookings = [];
    }

    // Add the 30 demo records only once.
    const demoAlreadyExists = savedBookings.some(
      (booking) => booking.isDemo === true
    );

    if (!demoAlreadyExists) {
      const demoBookings = createDemoBookings(availableCars);
      savedBookings = [...savedBookings, ...demoBookings];

      localStorage.setItem("bookings", JSON.stringify(savedBookings));
    }

    setBookings(savedBookings);
  }, []);

  const saveCars = (updatedCars) => {
    localStorage.setItem("cars", JSON.stringify(updatedCars));
    setCars(updatedCars);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const carData = {
      id: editId || Date.now(),
      name,
      price: Number(price),
      category,
      image: image.trim(),
    };

    let updatedCars;

    if (editId) {
      updatedCars = cars.map((car) =>
        car.id === editId ? carData : car
      );
    } else {
      updatedCars = [...cars, carData];
    }

    saveCars(updatedCars);
    resetForm();

    alert(editId ? "Car updated successfully!" : "Car added successfully!");
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setCategory("SUV");
    setImage("");
    setEditId(null);
  };

  const editCar = (car) => {
    setEditId(car.id);
    setName(car.name);
    setPrice(car.price);
    setCategory(car.category);
    setImage(car.image);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteCar = (id) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      const updatedCars = cars.filter((car) => car.id !== id);
      saveCars(updatedCars);

      if (editId === id) {
        resetForm();
      }

      alert("Car deleted successfully!");
    }
  };

  const cancelBooking = (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) {
      return;
    }

    const updatedBookings = bookings.map((booking) =>
      booking.id === id
        ? { ...booking, status: "Cancelled" }
        : booking
    );

    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    setBookings(updatedBookings);

    alert("Booking cancelled successfully!");
  };

  // Booking statistics
  const confirmed = bookings.filter(
    (booking) => booking.status === "Confirmed"
  ).length;

  const cancelled = bookings.filter(
    (booking) => booking.status === "Cancelled"
  ).length;

  const totalRevenue = bookings
    .filter((booking) => booking.status === "Confirmed")
    .reduce(
      (total, booking) => total + Number(booking.totalPrice || 0),
      0
    );

  // Prepare the seven-day booking report.
  const sevenDays = Array.from({ length: 7 }, (_, index) =>
    addDays(START_DATE, index)
  );

  const dailyBookings = sevenDays.map((date) => ({
    date,
    count: bookings.filter(
      (booking) => booking.bookingDate === date
    ).length,
  }));

  const bookingsInPeriod = dailyBookings.reduce(
    (total, day) => total + day.count,
    0
  );

  const averageBookings = (bookingsInPeriod / 7).toFixed(2);

  const maxDailyBookings = Math.max(
    ...dailyBookings.map((day) => day.count),
    1
  );

  // Show newest booking dates first.
  const sortedBookings = [...bookings].sort((a, b) => {
    return (b.bookingDate || "").localeCompare(a.bookingDate || "");
  });

  return (
    <div className="container py-5">

      <div className="mb-4">
        <h2 className="fw-bold">Admin Dashboard</h2>
        <p className="text-muted">
          Manage cars, bookings and customers.
        </p>
      </div>

      {/* Statistics */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-5 g-4 mb-5">

        <div className="col">
          <div className="admin-stat-card h-100">
            <h6>Total Cars</h6>
            <h2>{cars.length}</h2>
          </div>
        </div>

        <div className="col">
          <div className="admin-stat-card h-100">
            <h6>Total Bookings</h6>
            <h2>{bookings.length}</h2>
          </div>
        </div>

        <div className="col">
          <div className="admin-stat-card h-100">
            <h6>Confirmed</h6>
            <h2 className="text-success">{confirmed}</h2>
          </div>
        </div>

        <div className="col">
          <div className="admin-stat-card h-100">
            <h6>Cancelled</h6>
            <h2 className="text-danger">{cancelled}</h2>
          </div>
        </div>

        <div className="col">
          <div className="admin-stat-card h-100">
            <h6>Average Bookings / Day</h6>
            <h2 className="text-primary">{averageBookings}</h2>
            <small className="text-muted">Last 7 days</small>
          </div>
        </div>

      </div>

      {/* Seven Day Booking Report */}
      <div className="admin-form-card mb-5">
        <h4 className="fw-bold mb-1">Booking Analytics</h4>

        <p className="text-muted mb-4">
          Daily booking history from 19 November 2026 to 25 November 2026.
        </p>

        <div className="row g-3 mb-4">

          <div className="col-md-6">
            <div className="admin-stat-card h-100">
              <h6>Total Bookings in 7 Days</h6>
              <h2>{bookingsInPeriod}</h2>
            </div>
          </div>

          <div className="col-md-6">
            <div className="admin-stat-card h-100">
              <h6>Average Bookings Per Day</h6>
              <h2 className="text-primary">{averageBookings}</h2>
              <small className="text-muted">
                {bookingsInPeriod} bookings divided by 7 days
              </small>
            </div>
          </div>

        </div>

        <h5 className="fw-bold mb-3">Daily Booking History</h5>

        {dailyBookings.map((day) => (
          <div className="mb-3" key={day.date}>

            <div className="d-flex justify-content-between mb-1">
              <span>{formatDate(day.date)}</span>
              <strong>{day.count} bookings</strong>
            </div>

            <div
              className="progress"
              style={{ height: "12px" }}
            >
              <div
                className="progress-bar bg-primary"
                role="progressbar"
                style={{
                  width: `${(day.count / maxDailyBookings) * 100}%`,
                }}
                aria-valuenow={day.count}
                aria-valuemin="0"
                aria-valuemax={maxDailyBookings}
              />
            </div>

          </div>
        ))}

        <small className="text-muted">
          This report includes clearly labelled sample records created
          for the project demonstration.
        </small>
      </div>

      {/* Add / Edit Car */}
      <div className="admin-form-card mb-5">

        <h4 className="fw-bold mb-4">
          {editId ? "Edit Car" : "Add New Car"}
        </h4>

        <form onSubmit={handleSubmit}>

          <div className="row g-3">

            <div className="col-md-6">
              <label className="form-label">Car Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter car name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Price Per Day (₹)</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter daily price"
                min="1"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Luxury">Luxury</option>
                <option value="Hatchback">Hatchback</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Car Image URL</label>
              <input
                type="url"
                className="form-control"
                placeholder="Paste image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
            </div>

          </div>

          <div className="mt-4">
            <button type="submit" className="btn btn-danger me-2">
              {editId ? "Update Car" : "Add Car"}
            </button>

            {editId && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={resetForm}
              >
                Cancel Edit
              </button>
            )}
          </div>

        </form>
      </div>

      {/* Car Inventory */}
      <h4 className="fw-bold mb-3">Manage Cars</h4>

      <div className="row g-4 mb-5">

        {cars.map((car) => (
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

                <h5 className="fw-bold">{car.name}</h5>

                <p className="text-muted">{car.category}</p>

                <h5 className="text-danger">
                  ₹{car.price}/day
                </h5>

                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => editCar(car)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteCar(car.id)}
                >
                  Delete
                </button>

              </div>
            </div>

          </div>
        ))}

      </div>

      {/* Booking Management */}
      <div className="mb-3">
        <h4 className="fw-bold mb-1">Booking Management</h4>
        <p className="text-muted">
          View customer bookings, rental details and booking history.
        </p>
      </div>

      <div className="admin-stat-card mb-4">
        <h6>Total Confirmed Booking Revenue</h6>
        <h2 className="text-success">
          ₹{totalRevenue.toLocaleString("en-IN")}
        </h2>
        <small className="text-muted">
          Excludes cancelled bookings. Includes demo records.
        </small>
      </div>

      {bookings.length === 0 ? (
        <div className="alert alert-info">
          No bookings available yet.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">

            <thead className="table-dark">
              <tr>
                <th>Booking Date</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Car</th>
                <th>Pickup Date</th>
                <th>Return Date</th>
                <th>Duration</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {sortedBookings.map((booking) => (
                <tr key={booking.id}>

                  <td>
                    {booking.bookingDate
                      ? formatDate(booking.bookingDate)
                      : "Not recorded"}
                  </td>

                  <td>
                    {booking.customer}
                    {booking.isDemo && (
                      <span className="badge bg-secondary ms-1">
                        Demo
                      </span>
                    )}
                  </td>

                  <td>{booking.phone}</td>

                  <td>{booking.car}</td>

                  <td>{booking.pickupDate}</td>

                  <td>{booking.returnDate}</td>

                  <td>{booking.rentalDays} Days</td>

                  <td>
                    ₹{Number(booking.totalPrice || 0).toLocaleString("en-IN")}
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        booking.status === "Confirmed"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>

                  <td>
                    {booking.status === "Confirmed" ? (
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => cancelBooking(booking.id)}
                      >
                        Cancel
                      </button>
                    ) : (
                      <span className="text-muted">Cancelled</span>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

    </div>
  );
}

export default Admin;
