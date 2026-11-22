import { router, useLocalSearchParams } from "expo-router";
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
import { palette } from "../../theme/colors";
import { AppIcon } from "../../components/ui/app-icon";
import { cars } from "../../features/cars/data";

export default function BookingConfimedScreen() {
  const { bookings } = useRentalStore();

  const { width } = useWindowDimensions();

  const { id } = useLocalSearchParams<{ id: string }>();
  const booking = bookings.find((item) => item.id === id);
  const car = booking
    ? cars.find((item) => item.id === booking.carId)
    : undefined;

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <ScrollView
        contentContainerStyle={[
          styles.confirmationContent,
          { width: Math.min(width, 680) },
        ]}
      >
        <View style={styles.confirmationCard}>
          <View style={styles.successIcon}>
            <AppIcon name="check" size={31} color={palette.green} />
          </View>

          <Text style={styles.confirmationTitle}>You’re going places!</Text>
          <Text style={styles.confirmationMessage}>
            Your booking is confirmed. Your next adventure is all set.
          </Text>
          {car && booking ? (
            <View style={styles.bookingDetails}>
              <Image
                source={{ uri: car.image }}
                resizeMode="cover"
                style={[
                  styles.confirmationImage,
                  { backgroundColor: car.accent },
                ]}
              />
              <Text style={styles.carName}>
                {car.make} {car.model}
              </Text>

              <View style={styles.bookingDateRow}>
                <AppIcon name="calendar" size={15} color={palette.green} />
                <Text style={styles.bookingDate}>
                    {new Date(booking.startDate).toLocaleDateString(undefined,{
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                    })}{booking.days} days
                </Text>
              </View>

              <View style={styles.pickupLocationRow}>
                <AppIcon name="pin" size={15} color={palette.green} />
                <Text style={styles.pickupLocation}>{car.location}</Text>
              </View>
              <View style={styles.detailsDivider} />

              <View style={styles.bookingReferenceRow}>
                <Text style={styles.detailLabel}>Booking reference</Text>
                <Text style={styles.bookingReference}>{booking.id}</Text>
              </View>

              <View style={styles.tripTotalRow}>
                <Text style={styles.detailLabel}>Trip total</Text>
                <Text style={styles.tripTotal}>
                  ${booking.total.toFixed(2)}
                </Text>
              </View>
            </View>
          ) : (
            <Text style={styles.unavailableMessage}>
              This booking is no longer available in this session. You can still
              browse cars and start a new reservation.
            </Text>
          )}

          <Pressable
            onPress={() => router.replace("/(tabs)/trips")}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>View my trips</Text>
          </Pressable>
          <Pressable
            onPress={() => router.replace("/(tabs)")}
            style={styles.secondaryButton}
          >
            <Text style={styles.secondaryButtonText}>Back to home</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: palette.canvas },
  confirmationCard: {
    alignItems: "center",
    padding: 25,
    borderRadius: 24,
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.line,
  },
  successIcon: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: palette.greenPale,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmationTitle: {
    color: palette.ink,
    fontSize: 23,
    fontWeight: "800",
    marginTop: 16,
  },
  confirmationMessage: {
    color: palette.muted,
    fontSize: 13,
    textAlign: "center",
    marginTop: 7,
  },
  bookingDetails: { width: "100%", marginTop: 22 },
  carName: {
    color: palette.ink,
    fontWeight: "700",
    fontSize: 17,
    marginTop: 14,
  },
  bookingDateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginTop: 8,
  },
  bookingDate: { color: palette.muted, fontSize: 12 },
  pickupLocationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginTop: 7,
  },
  pickupLocation: { color: palette.muted, fontSize: 12 },
  detailsDivider: {
    height: 1,
    backgroundColor: palette.line,
    marginVertical: 14,
  },
  bookingReferenceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailLabel: { color: palette.muted, fontSize: 12 },
  bookingReference: { color: palette.ink, fontSize: 12, fontWeight: "700" },
  tripTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 9,
  },
  tripTotal: { color: palette.ink, fontSize: 14, fontWeight: "800" },
  unavailableMessage: {
    color: palette.muted,
    textAlign: "center",
    marginTop: 18,
    fontSize: 13,
  },
  primaryButton: {
    width: "100%",
    marginTop: 22,
    alignItems: "center",
    borderRadius: 14,
    paddingVertical: 14,
    backgroundColor: palette.green,
  },
  primaryButtonText: { color: palette.white, fontSize: 14, fontWeight: "700" },
  secondaryButton: { padding: 13, marginTop: 3 },
  secondaryButtonText: {
    color: palette.green,
    fontSize: 13,
    fontWeight: "700",
  },

  confirmationContent: {
    alignSelf: "center",
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  confirmationImage: { width: "100%", height: 175, borderRadius: 17 },
});
