
export const initialCars = [
  {
    id: 1,
    name: "Hyundai Creta",
    price: 2500,
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800",
    category: "SUV"
  },
  {
    id: 2,
    name: "BMW 3 Series",
    price: 5000,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
    category: "Luxury"
  },
  {
    id: 3,
    name: "Honda City",
    price: 2000,
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800",
    category: "Sedan"
  },
  {
    id: 4,
    name: "Mahindra Thar",
    price: 3500,
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800",
    category: "SUV"
  },
  {
    id: 5,
    name: "Mercedes Benz",
    price: 6000,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800",
    category: "Luxury"
  },
  {
    id: 6,
    name: "Toyota Camry",
    price: 3000,
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800",
    category: "Sedan"
  }
];



export const getCars = () => {
  const savedCars = localStorage.getItem("cars");

  if (savedCars) {
    return JSON.parse(savedCars);
  }

  localStorage.setItem("cars", JSON.stringify(initialCars));
  return initialCars;
};
