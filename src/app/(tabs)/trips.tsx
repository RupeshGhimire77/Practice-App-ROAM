import { router } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRentalStore } from "../../features/rentals/rental-context";
import { cars } from "../../features/cars/data";
import { AppIcon } from "../../components/ui/app-icon";
import { palette } from "../../theme/colors";

export default function TripesScreen() {
  const { bookings } = useRentalStore();
  const { width } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.pageContent,
          { width: Math.min(width, 680) },
        ]}
      >
        <Text style={styles.pageTitle}>My trips</Text>
        <Text style={styles.pageSubtitle}>
          All your getaways, in one place.
        </Text>

        {bookings.length ? (
          <View style={styles.tripList}>
            {bookings.map((booking) => {
              const car = cars.find((item) => item.id === booking.carId);

              if (!car) return null;
              return (
                <Pressable
                  key={booking.id}
                  onPress={() =>
                    router.push({
                      pathname: "/booking-confirmed/[id]",
                      params: { id: booking.id },
                    })
                  }
                  style={styles.tripCard}
                >
                  <Image
                    source={{ uri: car.image }}
                    resizeMode="cover"
                    style={[styles.tripImage, { backgroundColor: car.accent }]}
                  />

                  <View style={styles.tripDetails}>
                    <Text style={styles.bookingEyebrow}>BOOKING CONFIRMED</Text>
                    <Text numberOfLines={1} style={styles.carName}>
                      {car.make} {car.model}
                    </Text>
                    <Text style={styles.bookingDate}>
                      {new Date(booking.startDate).toLocaleDateString()} ·{" "}
                      {booking.days} days
                    </Text>
                    <Text style={styles.tripTotal}>
                      ${booking.total.toFixed(2)} total
                    </Text>
                  </View>

                  <View style={styles.tripChevron}>
                    <AppIcon name="chevron" size={17} color={palette.muted} />
                  </View>
                </Pressable>
              );
            })}
          </View>
        ) : (
          <View style={styles.emptyStateCard}>
            <View style={styles.emptyStateIcon}>
              <AppIcon name="car" size={26} color={palette.green} />
            </View>
            <Text style={styles.emptyStateTitle}>No trips booked yet</Text>
            <Text style={styles.emptyStateMessage}>
              Your next road trip is just a few taps away.
            </Text>
            <Pressable
              onPress={() => router.navigate("/search")}
              style={styles.emptyStateButton}
            >
              <Text style={styles.emptyStateButtonText}>Find a car</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: palette.canvas },
  pageTitle: {
    color: palette.ink,
    fontSize: 27,
    fontWeight: "800",
    marginTop: 9,
  },
  pageSubtitle: {
    color: palette.muted,
    fontSize: 13,
    marginTop: 5,
    marginBottom: 19,
  },
  tripList: { gap: 13 },
  tripCard: {
    backgroundColor: palette.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: palette.line,
    padding: 12,
    flexDirection: "row",
    gap: 13,
  },
  tripDetails: { flex: 1, justifyContent: "center" },
  bookingEyebrow: {
    color: palette.green,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  carName: {
    color: palette.ink,
    fontWeight: "700",
    fontSize: 15,
    marginTop: 5,
  },
  bookingDate: { color: palette.muted, fontSize: 12, marginTop: 4 },
  tripTotal: {
    color: palette.ink,
    fontSize: 13,
    fontWeight: "700",
    marginTop: 5,
  },
  tripChevron: { justifyContent: "center" },
  emptyStateCard: {
    backgroundColor: palette.white,
    borderColor: palette.line,
    borderWidth: 1,
    borderRadius: 22,
    alignItems: "center",
    padding: 28,
    marginTop: 28,
  },
  emptyStateIcon: {
    width: 58,
    height: 58,
    backgroundColor: palette.greenPale,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyStateTitle: {
    color: palette.ink,
    fontSize: 17,
    fontWeight: "700",
    marginTop: 14,
  },
  emptyStateMessage: {
    color: palette.muted,
    fontSize: 13,
    textAlign: "center",
    marginTop: 6,
  },
  emptyStateButton: {
    marginTop: 18,
    backgroundColor: palette.green,
    borderRadius: 13,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  emptyStateButtonText: { color: palette.white, fontWeight: "700" },

  pageContent: {
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingBottom: 25,
  },
  tripImage: { width: 108, height: 92, borderRadius: 14 },
});
