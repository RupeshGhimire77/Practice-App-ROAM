import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';

export type Booking = {
  id: string;
  carId: string;
  startDate: string;
  days: number;
  total: number;
  createdAt: string;
};

type RentalStore = {
  favorites: string[];
  bookings: Booking[];
  toggleFavorite: (carId: string) => void;
  addBooking: (booking: Booking) => void;
};

const RentalContext = createContext<RentalStore | null>(null);

export function RentalProvider({ children }: PropsWithChildren) {
  const [favorites, setFavorites] = useState<string[]>(['porsche-taycan']);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const value = useMemo<RentalStore>(
    () => ({
      favorites,
      bookings,
      toggleFavorite: (carId) =>
        setFavorites((current) =>
          current.includes(carId) ? current.filter((id) => id !== carId) : [...current, carId],
        ),
      addBooking: (booking) => setBookings((current) => [booking, ...current]),
    }),
    [favorites, bookings],
  );

  return <RentalContext.Provider value={value}>{children}</RentalContext.Provider>;
}

export function useRentalStore() {
  const context = useContext(RentalContext);
  if (!context) {
    throw new Error('useRentalStore must be used within RentalProvider');
  }
  return context;
}
