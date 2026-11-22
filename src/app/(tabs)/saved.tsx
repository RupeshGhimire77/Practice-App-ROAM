import { router } from "expo-router";
import {
  StyleSheet,
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppIcon } from "../../components/ui/app-icon";
import { CarCard } from "../../components/ui/car-card";
import { cars } from "../../features/cars/data";
import { useRentalStore } from "../../features/rentals/rental-context";
import { palette } from "../../theme/colors";

export default function SavedScreen() {
  const { favorites } = useRentalStore();
  const savedCars = cars.filter((car) => favorites.includes(car.id));
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
        <Text style={styles.pageTitle}>Saved cars</Text>
        <Text style={styles.pageSubtitle}>
          Your shortlist for the next adventure.
        </Text>
        {savedCars.length ? (
          <View style={styles.carList}>
            {savedCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </View>
        ) : (
          <View style={styles.emptyStateCard}>
            <View style={styles.emptyStateIcon}>
              <AppIcon name="heart" size={25} color={palette.green} />
            </View>
            <Text style={styles.emptyStateTitle}>Start your wishlist</Text>
            <Text style={styles.emptyStateMessage}>
              Tap the heart on any car to save it here.
            </Text>
            <Pressable
              onPress={() => router.navigate("/search")}
              style={styles.emptyStateButton}
            >
              <Text style={styles.emptyStateButtonText}>Explore cars</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: palette.canvas,
  },
  pageContent: {
    alignSelf: 'center', 
    paddingHorizontal: 20, 
    paddingBottom: 25
  },
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
  carList: {
    gap: 13,
  },
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
  emptyStateButtonText: {
    color: palette.white,
    fontWeight: "700",
  },
});
