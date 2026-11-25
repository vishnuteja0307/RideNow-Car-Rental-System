
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function Booking() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const carName = searchParams.get("car") || "";
  const price = Number(searchParams.get("price")) || 0;

  const today = new Date().toLocaleDateString("en-CA");

  const [form, setForm] = useState({
    customer: "",
    phone: "",
    pickupDate: "",
    returnDate: ""
  });

  const rentalDays =
    form.pickupDate && form.returnDate
      ? Math.max(
          0,
          (Date.parse(form.returnDate + "T00:00:00Z") -
            Date.parse(form.pickupDate + "T00:00:00Z")) / 86400000
        )
      : 0;

  const totalPrice = rentalDays * price;

  // Check car availability for selected dates
  const existingBookings = JSON.parse(
    localStorage.getItem("bookings") || "[]"
  );

  const isAlreadyBooked = existingBookings.some((booking) => {
    const sameCar =
      booking.car?.trim().toLowerCase() ===
      carName.trim().toLowerCase();

    const isActive = booking.status !== "Cancelled";

    const datesOverlap =
      form.pickupDate &&
      form.returnDate &&
      form.pickupDate < booking.returnDate &&
      form.returnDate > booking.pickupDate;

    return sameCar && isActive && datesOverlap;
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "pickupDate" ? { returnDate: "" } : {})
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!carName || price <= 0 || rentalDays < 1) {
      alert("Please check your booking details.");
      return;
    }

    const latestBookings = JSON.parse(
      localStorage.getItem("bookings") || "[]"
    );

    const bookingConflict = latestBookings.some((booking) => {
      const sameCar =
        booking.car?.trim().toLowerCase() ===
        carName.trim().toLowerCase();

      const isActive = booking.status !== "Cancelled";

      const datesOverlap =
        form.pickupDate < booking.returnDate &&
        form.returnDate > booking.pickupDate;

      return sameCar && isActive && datesOverlap;
    });

    if (bookingConflict) {
      alert("Sorry! This car is already booked for these dates.");
      return;
    }

    const booking = {
      id: Date.now(),
      car: carName,
      customer: form.customer,
      phone: form.phone,
      pickupDate: form.pickupDate,
      returnDate: form.returnDate,
      rentalDays,
      pricePerDay: price,
      totalPrice,
      status: "Confirmed"
    };

    localStorage.setItem(
      "bookings",
      JSON.stringify([...latestBookings, booking])
    );

    alert("Booking Successful!");
    navigate("/my-bookings");
  };

  const datesSelected = form.pickupDate && form.returnDate;

  return (
    <div className="container py-5">
      <div className="booking-form mx-auto">

        <h2 className="text-center fw-bold mb-2">
          Book Your Ride
        </h2>

        <p className="text-center text-muted mb-4">
          Enter your details and confirm your booking.
        </p>

        <form onSubmit={handleSubmit}>

          <label className="form-label">Selected Car</label>
          <input
            className="form-control mb-3"
            value={carName}
            readOnly
          />

          <label className="form-label">Price Per Day</label>
          <input
            className="form-control mb-3"
            value={`₹${price.toLocaleString("en-IN")}`}
            readOnly
          />

          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control mb-3"
            name="customer"
            value={form.customer}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />

          <label className="form-label">Phone Number</label>
          <input
            type="tel"
            className="form-control mb-3"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter 10-digit phone number"
            pattern="[0-9]{10}"
            required
          />

          <label className="form-label">Pickup Date</label>
          <input
            type="date"
            className="form-control mb-3"
            name="pickupDate"
            min={today}
            value={form.pickupDate}
            onChange={handleChange}
            required
          />

          <label className="form-label">Return Date</label>
          <input
            type="date"
            className="form-control mb-3"
            name="returnDate"
            min={form.pickupDate || today}
            value={form.returnDate}
            onChange={handleChange}
            required
          />

          {datesSelected && rentalDays >= 1 && (
            <div
              className={`alert ${
                isAlreadyBooked ? "alert-danger" : "alert-success"
              } mt-3`}
            >
              {isAlreadyBooked
                ? "Sorry! This car is already booked for the selected dates. Please choose different dates."
                : "Good news! This car is available for your selected dates."}
            </div>
          )}

          <div className="price-summary mt-4 mb-4">

            <h5 className="fw-bold mb-3">
              Booking Summary
            </h5>

            <div className="d-flex justify-content-between mb-2">
              <span>Price Per Day</span>
              <span>₹{price.toLocaleString("en-IN")}</span>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span>Rental Duration</span>
              <span>{rentalDays} Days</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between align-items-center">
              <strong>Total Amount</strong>
              <strong className="text-danger fs-4">
                ₹{totalPrice.toLocaleString("en-IN")}
              </strong>
            </div>

          </div>

          <button
            type="submit"
            className="btn btn-danger w-100"
            disabled={
              !carName ||
              price <= 0 ||
              rentalDays < 1 ||
              isAlreadyBooked
            }
          >
            Confirm Booking
          </button>

        </form>
      </div>
    </div>
  );
}

export default Booking;
