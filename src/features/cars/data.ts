export type CarCategory = 'ALL' | 'Electric' | 'SUV' | 'Luxury' | 'Compact';

export type Car = {
    id: string;
    make: string;
    model: string;
    year: number;
    category: Exclude<CarCategory, 'ALL'>;
    pricePerDay: number;
    rating: number;
    reviews: number;
    location: string;
    seats: number;
    transmission: 'Automatic' | 'Manual';
    fuel: 'Electric' | 'Hybrid' | 'Petrol';
    range?: number;
    image: string;
    accent: string;
    featured?: boolean;
};

const photo = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=85`;

export const cars: Car[] = [
    {
        id: 'tesla-model-3',
        make: 'Tesla',
        model: 'Model 3 Long Range',
        year: 2024,
        category: "Electric",
        pricePerDay: 89,
        rating: 4.96,
        reviews: 128,
        location: 'San Francisco, CA',
        seats: 5,
        transmission: "Automatic",
        fuel: "Electric",
        range: 341,
        image: photo('photo-1560958089-b8a1929cea89'),
        accent: '#DCEAE4',
        featured: true,
    },
    {
        id: 'porsche-taycan',
        make: 'Porsche',
        model: 'Taycan 4S',
        year: 2024,
        category: 'Luxury',
        pricePerDay: 189,
        rating: 4.93,
        reviews: 86,
        location: 'San Francisco, CA',
        seats: 4,
        transmission: 'Automatic',
        fuel: 'Electric',
        range: 227,
        image: photo('photo-1611859266238-4b98091d9d9b'),
        accent: '#EDE4DC',
        featured: true,
    },
    {
        id: 'bmw-x5',
        make: 'BMW',
        model: 'X5 xDrive40i',
        year: 2023,
        category: 'SUV',
        pricePerDay: 112,
        rating: 4.89,
        reviews: 74,
        location: 'Oakland, CA',
        seats: 5,
        transmission: 'Automatic',
        fuel: 'Hybrid',
        image: photo('photo-1555215695-3004980ad54e'),
        accent: '#E5E8ED',
    },
    {
        id: 'range-rover-sport',
        make: 'Land Rover',
        model: 'Range Rover Sport',
        year: 2024,
        category: 'SUV',
        pricePerDay: 145,
        rating: 4.91,
        reviews: 52,
        location: 'San Jose, CA',
        seats: 5,
        transmission: 'Automatic',
        fuel: 'Hybrid',
        image: photo('photo-1606664515524-ed2f786a0bd6'),
        accent: '#EAE5DC',
    },
    {
        id: 'mini-cooper',
        make: 'MINI',
        model: 'Cooper S',
        year: 2023,
        category: 'Compact',
        pricePerDay: 59,
        rating: 4.87,
        reviews: 43,
        location: 'San Francisco, CA',
        seats: 4,
        transmission: 'Automatic',
        fuel: 'Petrol',
        image: photo('photo-1503376780353-7e6692767b70'),
        accent: '#E5E9DF',
    },
    {
        id: 'mercedes-e-class',
        make: 'Mercedes-Benz',
        model: 'E-Class Sedan',
        year: 2024,
        category: 'Luxury',
        pricePerDay: 132,
        rating: 4.94,
        reviews: 61,
        location: 'Berkeley, CA',
        seats: 5,
        transmission: 'Automatic',
        fuel: 'Hybrid',
        image: photo('photo-1618843479313-40f8afb4b4d8'),
        accent: '#E6E7E4',
    },
];