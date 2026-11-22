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
import { useRentalStore } from "../../features/rentals/rental-context";
import { cars } from "../../features/cars/data";
import { SafeAreaView } from "react-native-safe-area-context";
import { palette } from "../../theme/colors";
import { AppIcon } from "../../components/ui/app-icon";

export default function CarDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const car = cars.find((item) => item.id === id);
  const { favorites, toggleFavorite } = useRentalStore();
  const { width } = useWindowDimensions();

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

  const isSaved = favorites.includes(car.id);
  const contentWidth = Math.min(width, 680);

  return (
    <SafeAreaView style={styles.screen2} edges={["top", "bottom"]}>
      <View style={[styles.contentFrame, { width: contentWidth }]}>
        <View style={styles.headerBar}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={() => router.back()}
            style={styles.headerBackButton}
          >
            <AppIcon name="back" size={18} />
          </Pressable>
          <Text style={styles.headerTitle}>Car details</Text>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={isSaved ? "Remove from saved cars" : "Save car"}
            onPress={()=> toggleFavorite(car.id)}
            style={styles.headerSaveButton}
          >
            <AppIcon name={isSaved ? "heartFill" : "heart"} color={isSaved ? palette.red : palette.ink} />
          </Pressable>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.detailslContent}
        >
          <Image 
            source={{uri: car.image}}
            resizeMode="cover"
            style={[styles.detailsImage , {backgroundColor: car.accent}]}
          />
          <View style={styles.carOverview}>
            <View style={styles.carSummary}>
              <View style={styles.carInfo}>
                <Text style={styles.carCategory}>
                  {car.year} · {car.category}
                </Text>
                <Text style={styles.carTitle}>
                  {car.make} {car.model}
                </Text>
              </View>
              <View style={styles.rating}>
                <AppIcon name="star" size={15} color={palette.amber} />
                <Text style={styles.ratingValue}>{car.rating}</Text>
              </View>
            </View>
            <View style={styles.specsRow}>
              {[
                {icon: "seats" as const, label: `${car.seats} seats` },
                {icon: "car" as const, label: car.transmission},
                {
                  icon: car.fuel === "Electric" ? ("bolt" as const) : ("fuel" as const),
                  label: car.fuel,
                }
              ].map((spec)=> (
                <View key={spec.icon}  style={styles.specCard}>
                  <AppIcon name={spec.icon} size={19} color={palette.green}/>
                  <Text style={styles.specLabel}>{spec.label}</Text>
                </View>
              ) )}
            </View>

            {car.range ? (
              <View style={styles.rangeNotice}>
                <AppIcon name="bolt" size={18} color={palette.green} />
                <Text style={styles.rangeText}>
                  Up to {car.range} miles of range on a full charge
                </Text>
              </View>
            ): null}

            <View style={styles.detailsDivider}/>
            <Text style={styles.hostSectionTitle}>Your host</Text>
            <View style={styles.hostRow}>
              <View style={styles.hostAvatar}>
                <Text style={styles.hostInitial}>A</Text>
              </View>
              <View style={styles.hostDetails}>
                <Text style={styles.hostName}>Alex Morgan</Text>
                <Text style={styles.hostMeta}>Trusted host · 3 years</Text>
              </View>
              <AppIcon name="check" size={18} color={palette.green} />
            </View>
            <View style={styles.protectionNotice}>
              <AppIcon name="shield" size={18} color={palette.green} />
              <Text style={styles.protectionText}>
                Every trip includes roadside assistance and verified protection.
              </Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.bookingBar}>
          <View style={styles.priceSummary}>
            <Text style={styles.dailyPrice}>
              ${car.pricePerDay}
              <Text style={styles.priceUnit}> / day</Text>
            </Text>
            <Text style={styles.feeNote}>All fees shown at checkout</Text>
          </View>
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/checkout/[id]",
                params: { id: car.id },
              })
            }
            style={({ pressed }) => [
              styles.reserveButton,
              { backgroundColor: pressed ? palette.greenDark : palette.green },
            ]}
          >

            <Text style={styles.reserveButtonLabel}>Reserve car</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
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
    fontSize: 18,
    fontWeight: "700",
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
    backgroundColor: palette.white,
  },
  contentFrame:{
    alignSelf: "center",
    flex: 1,
  },
  headerBar:{
    height: 48,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // borderWidth: 1
  },
  headerBackButton:{
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.line,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle:{
    color: palette.ink, 
    fontWeight: "700", 
    fontSize: 14
  },
  headerSaveButton:{
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.line,
    alignItems: "center",
    justifyContent: "center",
  },
  detailslContent:{
    paddingBottom: 18,
  },
  detailsImage:{
    width: "100%",
    height: 270,
  },
  carOverview:{
    paddingHorizontal: 21, 
    paddingTop: 20
  },
  carSummary:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  carInfo:{
    flex: 1
  },
  carCategory:{
    color: palette.muted, fontSize: 12, fontWeight: "600"
  },
  carTitle:{
    color: palette.ink,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "800",
    marginTop: 4,
  },
  rating:{
    flexDirection: "row", 
    alignItems: "center", 
    gap: 5, 
    paddingTop: 5
  },
  ratingValue:{
    color: palette.ink, 
    fontWeight: "700"
  },
  specsRow:{
    flexDirection: "row", 
    marginTop: 20, 
    gap: 9
  },
  specCard:{
    flex: 1,
    alignItems: "center",
    paddingVertical: 13,
    backgroundColor: palette.canvas,
    borderRadius: 15,
  },
  specLabel:{
    color: palette.ink,
    fontSize: 11,
    fontWeight: "600",
    marginTop: 7,
  },
  rangeNotice:{
    marginTop: 16,
    padding: 14,
    borderRadius: 15,
    backgroundColor: palette.greenPale,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  rangeText:{
    color: palette.greenDark,
    fontSize: 12,
    fontWeight: "600",
    flex: 1,
  },
  detailsDivider: {
    height: 1,
    backgroundColor: palette.line,
    marginVertical: 20,
  },
  hostSectionTitle: {
    color: palette.ink, fontSize: 17, fontWeight: "700"
  },
  hostRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    marginTop: 12,
  },
  hostAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: palette.greenPale,
    alignItems: "center",
    justifyContent: "center",
  },
  hostInitial: {
    color: palette.green, fontWeight: "800"
  },
  hostDetails: {
    flex: 1
  },
  hostName: {
    color: palette.ink, fontSize: 13, fontWeight: "700"
  },
  hostMeta: {
    color: palette.muted, fontSize: 11, marginTop: 3
  },
  protectionNotice: {
    marginTop: 17,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  protectionText: {
    color: palette.muted, fontSize: 12, flex: 1
  },
  bookingBar:{
    borderTopWidth: 1,
    borderTopColor: palette.line,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 7,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  priceSummary:{
    flex: 1,
  },
  dailyPrice:{
    color: palette.ink, fontSize: 19, fontWeight: "800"
  },
  priceUnit:{
    color: palette.muted, fontSize: 12, fontWeight: "500"
  },
  feeNote:{
    color: palette.muted, fontSize: 10, marginTop: 2
  },
  reserveButton:{
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
  },
  reserveButtonLabel:{
    color: palette.white, fontWeight: "700", fontSize: 14
  },
});
