import {
  Image,
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppIcon } from "../../components/ui/app-icon";
import { CarCard } from "../../components/ui/car-card";

import {
  AppDialog,
  type AppDialogConfig,
} from "../../components/ui/app-dialog";
import { palette } from "../../theme/colors";
import ProfileScreen from "./profile";
import SearchScreen from "./search";
import { useState } from "react";
import { router } from "expo-router";
import { cars } from "../../features/cars/data";
import { SectionTitle } from "../../components/ui/section-title";

const locations = [
  "San Francisco, CA",
  "Oakland, CA",
  "San Jose, CA",
  "Berkeley, CA",
];

export default function HomeScreen() {
  const [location, setLocation] = useState(locations[0]);
  const [dialog, setDialog] = useState<AppDialogConfig | null>(null);
  const { width } = useWindowDimensions();
  const contentWidth = Math.min(width, 680);

  const featuredCars = cars.filter((car) => car.featured);

  const chooseLocation = () =>
    setDialog({
      title: "Choose a location",
      message: "Where would you like to pick up your car?",
      actions: [
        ...locations.map((place) => ({
          label: place,
          variant:
            place === location ? ("primary" as const) : ("secondary" as const),
          onPress: () => setLocation(place),
        })),
        { label: "Cancel", variant: "secondary" },
      ],
    });
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.pageContent, { width: contentWidth }]}
      >
        <View style={styles.topBar}>
          <Pressable
            accessibilityRole="button"
            onPress={chooseLocation}
            style={styles.locationButton}
          >
            <View style={styles.locationIcon}>
              <AppIcon name="location" size={18} color={palette.green} />
            </View>
            <View>
              <Text style={styles.locationLabel}>YOUR LOCATION</Text>
              <Text style={styles.locationValue}>{location}</Text>
            </View>
            <AppIcon name="chevron" size={14} color={palette.muted} />
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Notifications"
            onPress={() =>
              setDialog({
                title: "You're all caught up",
                message: "New trip updates and offers will show up here.",
                actions: [{ label: "Got it", variant: "primary" }],
              })
            }
          >
            <View style={styles.notificationButton}>
              <AppIcon name="bell" size={20} />
            </View>
            <View style={styles.notificationBadge} />
          </Pressable>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroCopy}>
            <Text style={styles.heroEyebrow}>YOUR NEXT GETAWAY</Text>
            <Text style={styles.heroTitle}>
              Find a ride. {"\n"}Feel the freedom.
            </Text>
            <Pressable
              onPress={() => router.navigate("/search")}
              style={({ pressed }) => [
                styles.heroButton,
                { opacity: pressed ? 0.8 : 1 },
              ]}
            >
              <Text style={styles.heroButtonLabel}>Explore cars</Text>
            </Pressable>
          </View>
          <Image
            source={{ uri: cars[0].image }}
            resizeMode="cover"
            style={styles.heroImage}
          />
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeLabel}>100% electric</Text>
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => router.navigate("/search")}
          style={styles.searchShortcut}
        >
          <AppIcon name="filter" color={palette.green} />
          <View style={styles.searchShortcutCopy}>
            <Text style={styles.searchShortcutTitle}>
              FInd your perfect car
            </Text>
            <Text style={styles.searchShortcutSubtitle}>
              Dates · category · price
            </Text>
          </View>
          <AppIcon name="arrow" size={17} color={palette.green} />
        </Pressable>

        <View style={styles.featuredSection}>
          <SectionTitle
            title="Popular near you"
            action="See all"
            onAction={() => router.navigate("/search")}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredList}
          >
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} compact />
            ))}
          </ScrollView>
        </View>

        <View style={styles.electricSection}>
          <SectionTitle
            title="Easy on the planet"
            action="View electric"
            onAction={() =>
              router.navigate({
                pathname: "/search",
                params: { category: "Electric" },
              })
            }
          />
          <Pressable
            onPress={() =>
              router.navigate({
                pathname: "/search",
                params: { category: "Electric" },
              })
            }
            style={styles.electricCard}
          >
            <View style={styles.electricIcon}>
              <AppIcon name="bolt" color={palette.green} />
            </View>
            <View style={styles.electricCopy}>
              <Text style={styles.electricTitle}>Go electric, go further</Text>
              <Text style={styles.electricSubtitle}>
                Discover our most-loved EVs
              </Text>
            </View>
            <AppIcon name="arrow" size={18} color={palette.green} />
          </Pressable>
        </View>
      </ScrollView>
      <AppDialog dialog={dialog} onClose={() => setDialog(null)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: palette.canvas,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  pageTitle: {
    color: palette.ink,
    fontSize: 27,
    fontWeight: "800",
    marginTop: 9,
  },
  pageContent: {
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  locationIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: palette.greenPale,
    alignItems: "center",
    justifyContent: "center",
  },
  locationLabel: {
    color: palette.muted,
    fontSize: 11,
  },
  locationValue: {
    color: palette.ink,
    fontWeight: "700",
    fontSize: 14,
    marginTop: 2,
  },
  notificationButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: palette.white,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: palette.line,
  },
  notificationBadge: {
    position: "absolute",
    right: 9,
    top: 9,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: palette.green,
  },
  heroCard: {
    marginTop: 25,
    padding: 21,
    borderRadius: 24,
    backgroundColor: palette.ink,
    minHeight: 208,
    overflow: "hidden",
  },
  heroCopy: {
    width: "63%",
  },
  heroEyebrow: {
    color: palette.lime,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
  },
  heroTitle: {
    color: palette.white,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "800",
    marginTop: 10,
  },
  heroButton: {
    marginTop: 17,
    borderRadius: 12,
    alignSelf: "flex-start",
    paddingHorizontal: 15,
    paddingVertical: 11,
    backgroundColor: palette.lime,
  },
  heroButtonLabel: {
    color: palette.ink,
    fontWeight: "800",
    fontSize: 13,
  },
  heroImage: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: "54%",
    height: 110,
    opacity: 0.92,
  },
  heroBadge: {
    position: "absolute",
    right: 16,
    top: 16,
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#FFFFFF1A",
  },
  heroBadgeLabel: {
    color: palette.white,
    fontSize: 10,
    fontWeight: "700",
  },
  searchShortcut: {
    marginTop: 16,
    height: 54,
    borderRadius: 16,
    paddingHorizontal: 15,
    backgroundColor: palette.line,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  searchShortcutCopy: {
    flex: 1,
  },
  searchShortcutTitle: {
    color: palette.ink,
    fontSize: 13,
    fontWeight: "700",
  },
  searchShortcutSubtitle: {
    color: palette.muted,
    fontSize: 11,
    marginTop: 2,
  },
  featuredSection: {
    marginTop: 26,
    gap: 14,
  },
  featuredList: {
    gap: 12,
  },
  electricSection: {
    marginTop: 26,
    gap: 14,
  },
  electricCard: {
    padding: 17,
    borderRadius: 20,
    backgroundColor: palette.greenPale,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  electricIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: palette.white,
    alignItems: "center",
    justifyContent: "center",
  },
  electricCopy: {
    flex: 1,
  },
  electricTitle: { color: palette.ink, fontWeight: "700", fontSize: 14 },
  electricSubtitle: { color: palette.muted, fontSize: 12, marginTop: 4 },
});
