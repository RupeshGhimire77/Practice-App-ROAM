import { useState } from "react";

import {
  StyleSheet,
  Pressable,
  View,
  Text,
  ScrollView,
  Switch,
  useWindowDimensions,
  
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { AppIcon } from "../../components/ui/app-icon";
import { AppDialog, AppDialogConfig } from "../../components/ui/app-dialog";
import { palette } from "../../theme/colors";

const menuItems = [
  {
    icon: "person" as const,
    label: "Personal Information",
    detail: "Manage your details",
  },
  {
    icon: "document" as const,
    label: "Driver’s license",
    detail: "Add or update your license",
  },
  {
    icon: "card" as const,
    label: "Payment methods",
    detail: "Cards and payment options",
  },
  {
    icon: "help" as const,
    label: "Help & support",
    detail: "We’re here to help",
  },
];

export default function ProfileScreen() {
  const [notifications, setNotifications] = useState(true);
  const [dialog, setDialog] = useState<AppDialogConfig | null>(null);
  const { width } = useWindowDimensions();
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.pageContent,
          { width: Math.min(width, 680) },
        ]}
      >
        <Text style={styles.pageTitle}>Profile</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Personal Information"
          onPress={() =>
            setDialog({
              title: "Personal Information",
              message:
                "Your profile details can be managed when your account is connected.",
              actions: [{ label: "Got it", variant: "primary" }],
            })
          }
          style={styles.profileCard}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarInitials}>RG</Text>
          </View>
          <View style={styles.profileDetails}>
            <Text style={styles.profileName}>Rupesh Ghimire</Text>
            <Text style={styles.profileEmail}>rupeshghimire111@gmail.com</Text>
          </View>
          <AppIcon name="chevron" size={20} color={palette.muted}></AppIcon>
        </Pressable>
        <Text style={styles.accountHeading}>ACCOUNT</Text>
        <View style={styles.accountMenu}>
          {menuItems.map((item, index) => (
            <Pressable
              key={item.label}
              onPress={() =>
                setDialog({
                  title: item.label,
                  message: `${item.detail}. This section will be available when your account is connected.`,
                  actions: [{ label: "Got it", variant: "primary" }],
                })
              }
              style={[
                styles.menuItem,
                { borderBottomWidth: index === menuItems.length - 1 ? 0 : 1 },
              ]}
            >
              <View style={styles.menuIcon}>
                <AppIcon name={item.icon} size={18} color={palette.green} />
              </View>
              <View style={styles.menuCopy}>
                <Text style={styles.menuTitle}>{item.label}</Text>
                <Text style={styles.menuDescription}>{item.detail}</Text>
              </View>
              <AppIcon name="chevron" size={15} color={palette.muted} />
            </Pressable>
          ))}
        </View>

        <Text style={styles.preferencesHeading}>PREFERENCES</Text>
        <View style={styles.preferencesCard}>
          <View style={styles.preferencesCopy}>
            <Text style={styles.preferencesTitle}>Push notifications</Text>
            <Text style={styles.preferencesDescription}>
              Trip updates and offeres
            </Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: palette.red, true: palette.green }}
            thumbColor={palette.white}
          />
        </View>

        <Pressable onPress={() => setDialog({
            title: "You're signed in",
            message: "Sign-out will be available when authentication is connected.",
            actions: [{label: "Got It", variant: "primary"}],
        })
        }
        style={styles.signOutButton}
        >
            <AppIcon name="logout" size={17} color={palette.red}/>
            <Text style={styles.signOutLabel}>Sign Out</Text>
        </Pressable>
        <Text style={styles.appVersion}>ROAM · Version 1.0.0</Text>
      </ScrollView>
      <AppDialog dialog={dialog} onClose={() => setDialog(null)}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: palette.canvas,
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
    paddingBottom: 25,
  },
  profileCard: {
    marginTop: 20,
    padding: 15,
    borderRadius: 20,
    backgroundColor: palette.ink,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: palette.lime,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitials: {
    color: palette.ink,
    fontSize: 19,
    fontWeight: "800",
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    color: palette.white,
    fontSize: 17,
    fontWeight: "700",
  },
  profileEmail: {
    color: palette.white,
    fontSize: 12,
    marginTop: 4,
  },
  accountHeading: {
    color: palette.muted,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0,
    marginTop: 25,
    marginBottom: 9,
  },
  accountMenu: {
    backgroundColor: palette.white,
    borderWidth: 1,
    borderRadius: 18,
    borderColor: palette.line,
    paddingHorizontal: 14,
  },
  menuItem: {
    minHeight: 68,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderBottomColor: palette.line,
  },
  menuIcon: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: palette.greenPale,
    alignItems: "center",
    justifyContent: "center",
  },
  menuCopy: {
    flex: 1,
  },
  menuTitle: {
    color: palette.ink,
    fontSize: 13,
    fontWeight: "700",
  },
  menuDescription: {
    color: palette.muted,
    fontSize: 11,
    marginTop: 3,
  },

  preferencesHeading: {
    color: palette.muted,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.9,
    marginTop: 23,
    marginBottom: 9,
  },
  preferencesCard: {
    backgroundColor: palette.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: palette.line,
    paddingHorizontal: 15,
    minHeight: 62,
    flexDirection: "row",
    alignItems: "center",
  },
  preferencesCopy: {
    flex: 1,
  },
  preferencesTitle: {
    color: palette.ink,
    fontSize: 13,
    fontWeight: "700",
  },
  preferencesDescription: {
    color: palette.muted,
    fontSize: 11,
    marginTop: 3 
  },
  signOutButton: {
    marginTop: 22,
    height: 52,
    borderRadius: 15,
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.line,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },
  signOutLabel: {
    color: palette.red,
    fontWeight: "700",
    fontSize: 13
  },
  appVersion:{
    color: palette.muted,
    fontSize: 11,
    textAlign: "center",
    marginTop: 16,
  },
 
});
