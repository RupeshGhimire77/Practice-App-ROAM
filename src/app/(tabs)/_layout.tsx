import { Tabs } from "expo-router";
import { SymbolView } from "expo-symbols";
import { StyleSheet } from "react-native";

import { palette } from "../../theme/colors";

const icons = {
  index: { ios: "house.fill", android: "home", web: "home" },
  search: { ios: "magnifyingglass", android: "search", web: "search" },
  saved: { ios: "heart.fill", android: "favorite", web: "favorite" },
  trips: { ios: "car.fill", android: "directions_car", web: "directions_car" },
  profile: { ios: "person.fill", android: "person", web: "person" },
} as const;

export default function TabLayout(){
    return(
        <Tabs
            screenOptions= {({ route }) =>({
                headerShown: false,
                tabBarActiveTintColor: palette.ink,
                tabBarInactiveTintColor: palette.muted,
                tabBarStyle: styles.tabBar,
                tabBarLabelStyle: styles.tabBarLabel,
                tabBarIcon: ({ color }) => (
                    <SymbolView
                        name= {icons[route.name as keyof typeof icons] ?? icons.profile}
                        tintColor ={color}
                        size= {21}
                        />
                ),
            })}>
                <Tabs.Screen name='index' options={{ title: 'Home' }} />
                <Tabs.Screen name='search' options={{ title: 'Explore' }} />
                <Tabs.Screen name="saved" options={{title: 'Saved'}} />`
                
                <Tabs.Screen name="trips" options={{title: 'My trips'}}/>
                <Tabs.Screen name="profile" options={{title: 'Profile'}}/>
            </Tabs>
    );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 66,
    paddingTop: 8,
    paddingBottom: 8,
    borderTopColor: palette.line,
    backgroundColor: palette.white,
  },
  tabBarLabel: { 
    fontSize: 10,
    fontWeight: "600" },
});
