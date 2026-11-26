
export const initialCars = [
  {
    id: 1,
    name: "Hyundai Creta",
    price: 2500,
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800",
    category: "SUV",
    seats: 5
  },
  {
    id: 2,
    name: "BMW 3 Series",
    price: 5000,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
    category: "Luxury",
    seats: 5
  },
  {
    id: 3,
    name: "Honda City",
    price: 2000,
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800",
    category: "Sedan",
    seats: 5
  },
  {
    id: 4,
    name: "Mahindra Thar",
    price: 3500,
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800",
    category: "SUV",
    seats: 4
  },
  {
    id: 5,
    name: "Mercedes Benz",
    price: 6000,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800",
    category: "Luxury",
    seats: 5
  },
  {
    id: 6,
    name: "Toyota Camry",
    price: 3000,
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800",
    category: "Sedan",
    seats: 5
  },
  {
    id: 7,
    name: "Maruti Swift",
    category: "Hatchback",
    price: 1800,
    seats: 5,
    image: "https://placehold.co/600x400?text=Maruti+Swift"
  },
  {
    id: 8,
    name: "Hyundai i20",
    category: "Hatchback",
    price: 2000,
    seats: 5,
    image: "https://placehold.co/600x400?text=Hyundai+i20"
  },
  {
    id: 9,
    name: "Honda City",
    category: "Sedan",
    price: 2800,
    seats: 5,
    image: "https://placehold.co/600x400?text=Honda+City"
  },
  {
    id: 10,
    name: "Hyundai Verna",
    category: "Sedan",
    price: 2700,
    seats: 5,
    image: "https://placehold.co/600x400?text=Hyundai+Verna"
  },
  {
    id: 11,
    name: "Tata Nexon",
    category: "SUV",
    price: 2500,
    seats: 5,
    image: "https://placehold.co/600x400?text=Tata+Nexon"
  },
  {
    id: 12,
    name: "Kia Seltos",
    category: "SUV",
    price: 3000,
    seats: 5,
    image: "https://placehold.co/600x400?text=Kia+Seltos"
  },
  {
    id: 13,
    name: "Maruti Ertiga",
    category: "MUV",
    price: 3200,
    seats: 7,
    image: "https://placehold.co/600x400?text=Maruti+Ertiga"
  },
  {
    id: 14,
    name: "Toyota Innova Crysta",
    category: "MUV",
    price: 4000,
    seats: 7,
    image: "https://placehold.co/600x400?text=Innova+Crysta"
  },
  {
    id: 15,
    name: "MG Comet EV",
    category: "Electric",
    price: 1700,
    seats: 4,
    image: "https://placehold.co/600x400?text=MG+Comet+EV"
  },
  {
    id: 16,
    name: "Tata Altroz",
    category: "Hatchback",
    price: 1900,
    seats: 5,
    image: "https://placehold.co/600x400?text=Tata+Altroz"
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
