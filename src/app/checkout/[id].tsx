import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
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
import { cars } from "../../features/cars/data";
import { useRentalStore } from "../../features/rentals/rental-context";
import { AppDialog, AppDialogConfig } from "../../components/ui/app-dialog";
import { AppIcon } from "../../components/ui/app-icon";
import { palette } from "../../theme/colors";

const startChoices = [0, 1, 2];

export default function CheckoutScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const car = cars.find((item) => item.id === id);
  const { addBooking } = useRentalStore();
  const [days, setDays] = useState(3);

  const [startOffset, setStartOffset] = useState(1);
  const [protection, setProtection] = useState(true);

  const [paymentMethod, setPaymentMethod] = useState<
    "Visa •••• 4242" | "Apple Pay"
  >("Visa •••• 4242");
  const [dialog, setDialog] = useState<AppDialogConfig | null>(null);
  const { width } = useWindowDimensions();

  const startDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + startOffset);
    date.setHours(12, 0, 0, 0);
    return date;
  }, [startOffset]);

  const rentalCost = car ? car.pricePerDay * days : 0;
  const protectionCost = protection ? 15 * days : 0;
  const serviceFee = Math.round(rentalCost * 0.1);
  const total = rentalCost + protectionCost + serviceFee;

  if (!car) {
    return (
      <SafeAreaView style={styles.screen}>
        <Text style={styles.notFoundTitle}>Car not found</Text>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonLabel}>Go back</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const selectPayment = () =>
    setDialog({
      title: "Payment method",
      message: "Choose how would you like to pay.",
      actions: [
        {
          label: "Visa •••• 4242",
          variant: paymentMethod === "Visa •••• 4242" ? "primary" : "secondary",
          onPress: () => setPaymentMethod("Visa •••• 4242"),
        },
        {
          label: "Apple Pay",
          variant: paymentMethod === "Apple Pay" ? "primary" : "secondary",
          onPress: () => setPaymentMethod("Apple Pay"),
        },
        { label: "Cancel", variant: "secondary" },
      ],
    });

  const confirmBooking = () => {
    const bookingId = `RM-${Date.now().toString().slice(-7)}`;
    addBooking({
      id: bookingId,
      carId: car.id,
      startDate: startDate.toISOString(),
      days,
      total,
      createdAt: new Date().toISOString(),
    });
    router.replace({
      pathname: "/booking-confirmed/[id]",
      params: { id: bookingId },
    });
  };

  return (
    <SafeAreaView style={styles.screen2} edges={["top", "bottom"]}>
      <View style={[styles.contentFrame, { width: Math.min(width, 680) }]}>
        <View style={styles.headerBar}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={() => router.back()}
            style={styles.headerBackButton}
          >
            <AppIcon name="back" size={18} />
          </Pressable>
          <Text style={styles.headerTitle}>Review your trip</Text>
          <View style={styles.headerSpacer} />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.checkoutContent}
        >
          <View style={styles.carCard}>
            <Image
              source={{ uri: car.image }}
              resizeMode="cover"
              style={[styles.checkoutImage, { backgroundColor: car.accent }]}
            />
            <View style={styles.carDetails}>
              <Text style={styles.carTitle}>
                {car.make} {car.model}
              </Text>
              <Text style={styles.carMeta}>
                {car.year} · {car.location}
              </Text>
              <Text style={styles.carDailyPrice}>${car.pricePerDay} / day</Text>
            </View>
          </View>

          <Text style={styles.dateSectionTitle}>When do you need it?</Text>

          <View style={styles.dateChoices}>
            {startChoices.map((offset) => {
              const date = new Date();
              date.setDate(date.getDate() + offset);
              const selected = startOffset === offset;
              return (
                <Pressable
                  key={offset}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  onPress={() => setStartOffset(offset)}
                  style={[
                    styles.categoryOption,
                    {
                      backgroundColor: selected
                        ? palette.greenPale
                        : palette.white,
                      borderColor: selected ? palette.green : palette.line,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryDateLabel,
                      { color: selected ? palette.green : palette.muted },
                    ]}
                  >
                    {offset === 0
                      ? "TODAY"
                      : offset === 1
                        ? "TOMORROW"
                        : date
                            .toLocaleDateString(undefined, { weekday: "short" })
                            .toUpperCase()}
                  </Text>

                  <Text style={styles.dateValue}>
                    {date.toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          <View style={styles.durationCard}>
            <View style={styles.durationCopy}>
              <Text style={styles.durationTitle}>Rental length</Text>
              <Text style={styles.durationDescription}>
                {days} days · return by 10:00 AM
              </Text>
            </View>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Remove one rental day"
              disabled={days <= 1}
              onPress={() => setDays((count) => Math.max(1, count - 1))}
              style={[
                styles.decreaseDayButton,
                { opacity: days <= 1 ? 0.4 : 1 },
              ]}
            >
              <Text style={styles.decreaseDayLabel}>−</Text>
            </Pressable>

            <Text style={styles.dayCount}>{days}</Text>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Add one rental day"
              disabled={days >= 14}
              onPress={() => setDays((count) => Math.min(14, count + 1))}
              style={[
                styles.increaseDayButton,
                { opacity: days >= 14 ? 0.4 : 1 },
              ]}
            >
              <Text style={styles.increaseDayLabel}>+</Text>
            </Pressable>
          </View>

          <Text style={styles.protectionSectionTitle}>Add peace of mind</Text>

          <Pressable
            accessibilityRole="switch"
            accessibilityState={{ checked: protection }}
            onPress={() => setProtection((value) => !value)}
            style={[
              styles.protectionOption,
              {
                backgroundColor: protection ? palette.greenPale : palette.white,
                borderColor: protection ? palette.green : palette.line,
              },
            ]}
          >
            <AppIcon name="shield" size={21} color={palette.green} />

            <View style={styles.protectionCopy}>
              <Text style={styles.protectionTitle}>Trip protection</Text>
              <Text style={styles.protectionDescription}>
                Roadside assistance · ${15}/day
              </Text>
            </View>

            <View
              style={[
                styles.protectionIndicator,
                {
                  backgroundColor: protection ? palette.green : palette.white,
                  borderColor: protection ? palette.green : palette.muted,
                },
              ]}
            >
              {protection ? (
                <AppIcon name="check" size={13} color={palette.white} />
              ) : null}
            </View>
          </Pressable>

          <Text style={styles.paymentSectionTitle}>Payment method</Text>
          <Pressable onPress={selectPayment} style={styles.paymentButton}>
            <AppIcon name="card" size={20} color={palette.green} />
            <Text style={styles.paymentLabel}>{paymentMethod}</Text>
            <AppIcon name="chevron" size={15} color={palette.muted} />
          </Pressable>

          <View style={styles.priceDetailsCard}>
            <Text style={styles.priceDetailsTitle}>Price details</Text>
            <PriceRow label={`Car rental · ${days} days`} amount={rentalCost} />

            {protection ? (
              <PriceRow label="Trip protection" amount={protectionCost} />
            ) : null}

            <PriceRow label="Service fee" amount={serviceFee} />
            <View style={styles.priceDivider} />
            <PriceRow label="Total" amount={total} strong />
          </View>

          <Text style={styles.termsNotice}>
            Review your rental terms before confirming. This demo stores
            bookings on this device only and does not process payments.
          </Text>
        </ScrollView>

        <View style={styles.bookingFooter}>
          <View style={styles.bookingTotalCopy}>
            <Text style={styles.bookingTotal}>${total.toFixed(2)}</Text>
            <Text style={styles.bookingTotalCaption}>Total · {days} days</Text>
          </View>
          <Pressable
            onPress={confirmBooking}
            style={({ pressed }) => [
              styles.confirmButton,
              { backgroundColor: pressed ? palette.greenDark : palette.green },
            ]}
          >
            <Text style={styles.confirmButtonLabel}>Confirm booking</Text>
          </Pressable>
        </View>
        <AppDialog dialog={dialog} onClose={() => setDialog(null)} />
      </View>
    </SafeAreaView>
  );
}

function PriceRow({
  label,
  amount,
  strong = false,
}: {
  label: string;
  amount: number;
  strong?: boolean;
}) {
  return (
    <View style={styles.priceRow}>
      <Text
        style={[
          styles.priceLabel,
          {
            color: strong ? palette.ink : palette.muted,
            fontSize: strong ? 14 : 12,
            fontWeight: strong ? "700" : "500",
          },
        ]}
      >
        {label}
      </Text>
      <Text
        style={[
          styles.priceValue,
          { fontSize: strong ? 14 : 12, fontWeight: strong ? "800" : "600" },
        ]}
      >
        ${amount.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.canvas,
  },
  notFoundTitle: {
    color: palette.ink,
    fontWeight: "700",
    fontSize: 18,
  },
  backButton: {
    padding: 14,
  },
  backButtonLabel: {
    color: palette.green,
    fontWeight: "700",
  },
  screen2: {
    flex: 1,
    backgroundColor: palette.canvas,
  },
  contentFrame: {
    alignSelf: "center",
    flex: 1,
  },
  headerBar: {
    height: 50,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerBackButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: palette.white,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: palette.ink,
    fontSize: 15,
    fontWeight: "700",
  },
  headerSpacer: {
    width: 40,
  },
  checkoutContent: {
    paddingHorizontal: 20,
    paddingBottom: 18,
  },
  carCard: {
    backgroundColor: palette.white,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: palette.line,
    padding: 12,
    flexDirection: "row",
    gap: 13,
    alignItems: "center",
  },
  checkoutImage: {
    width: 100,
    height: 80,
    borderRadius: 13,
  },
  carDetails: {
    flex: 1,
  },
  carTitle: {
    color: palette.ink,
    fontSize: 14,
    fontWeight: "700",
  },
  carMeta: {
    color: palette.muted,
    fontSize: 11,
    marginTop: 5,
  },
  carDailyPrice: {
    color: palette.green,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 7,
  },
  dateSectionTitle: {
    color: palette.ink,
    fontSize: 17,
    fontWeight: "700",
    marginTop: 22,
  },
  dateChoices: {
    flexDirection: "row",
    gap: 9,
    marginTop: 11,
  },
  categoryOption: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 14,
  },
  categoryDateLabel: {
    fontSize: 10,
    fontWeight: "700",
  },
  dateValue: {
    color: palette.ink,
    fontSize: 14,
    fontWeight: "700",
    marginTop: 5,
  },
  durationCard: {
    marginTop: 12,
    backgroundColor: palette.white,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: palette.line,
    paddingHorizontal: 14,
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
  },
  durationCopy: {
    flex: 1,
  },
  durationTitle: {
    color: palette.ink,
    fontSize: 13,
    fontWeight: "700",
  },
  durationDescription: {
    color: palette.muted,
    fontSize: 11,
    marginTop: 3,
  },
  decreaseDayButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: palette.line,
    alignItems: "center",
    justifyContent: "center",
  },
  decreaseDayLabel: {
    color: palette.ink,
    fontSize: 20,
    lineHeight: 23,
  },
  dayCount: {
    color: palette.ink,
    fontSize: 14,
    fontWeight: "700",
    paddingHorizontal: 12,
  },
  increaseDayButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: palette.greenPale,
    alignItems: "center",
    justifyContent: "center",
  },
  increaseDayLabel: {
    color: palette.green,
    fontSize: 20,
    lineHeight: 23,
  },
  protectionSectionTitle: {
    color: palette.ink,
    fontSize: 17,
    fontWeight: "700",
    marginTop: 22,
  },
  protectionOption: {
    marginTop: 10,
    borderRadius: 15,
    borderWidth: 1,
    padding: 14,
    flexDirection: "row",
    gap: 11,
    alignItems: "center",
  },
  protectionCopy: {
    flex: 1,
  },
  protectionTitle: {
    color: palette.ink,
    fontSize: 12,
    fontWeight: "700",
  },
  protectionDescription: {
    color: palette.muted,
    fontSize: 11,
    marginTop: 3,
  },
  protectionIndicator: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  paymentSectionTitle: {
    color: palette.ink,
    fontSize: 17,
    fontWeight: "700",
    marginTop: 22,
  },
  paymentButton: {
    marginTop: 10,
    backgroundColor: palette.white,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: palette.line,
    minHeight: 56,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  paymentLabel: {
    color: palette.ink,
    fontSize: 13,
    fontWeight: "600",
    flex: 1,
  },
  priceDetailsCard: {
    marginTop: 22,
    backgroundColor: palette.white,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: palette.line,
    padding: 15,
    gap: 11,
  },
  priceDetailsTitle: {
    color: palette.ink,
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 2,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priceLabel: {
    color: palette.muted,
    fontSize: 12,
    fontWeight: "500",
  },
  priceValue: {
    color: palette.ink,
  },
  priceDivider: {
    height: 1,
    backgroundColor: palette.line,
    marginVertical: 1,
  },
  termsNotice: {
    color: palette.muted,
    fontSize: 10,
    lineHeight: 15,
    textAlign: "center",
    marginTop: 12,
  },
  bookingFooter: {
    paddingHorizontal: 20,
    paddingTop: 11,
    borderTopWidth: 1,
    borderTopColor: palette.line,
    backgroundColor: palette.white,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  bookingTotalCopy: {
    flex: 1,
  },
  bookingTotal: {
    color: palette.ink,
    fontSize: 18,
    fontWeight: "800",
  },
  bookingTotalCaption: {
    color: palette.muted,
    fontSize: 10,
    marginTop: 2,
  },
  confirmButton: {
    minWidth: 160,
    alignItems: "center",
    borderRadius: 14,
    paddingHorizontal: 19,
    paddingVertical: 14,
  },
  confirmButtonLabel: {
    color: palette.white,
    fontWeight: "700",
    fontSize: 14,
  },
});
