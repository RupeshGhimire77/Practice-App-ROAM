import { useLocalSearchParams } from "expo-router";
import { use, useMemo, useState } from "react";
import {
  StyleSheet,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppIcon } from "../../components/ui/app-icon";
import { palette } from "../../theme/colors";
import { CarCategory, cars } from "../../features/cars/data";
import { sortRoutes } from "expo-router/build/sortRoutes.js";
import { CarCard } from "../../components/ui/car-card";

const categories: CarCategory[] = [
    "ALL",
    "Electric",
    "SUV",
    "Luxury",
    "Compact",
];

export default function SearchScreen() {
    const params = useLocalSearchParams<{ category?: string }>();
    const [query, setQuery]  = useState("");
    const [categorySelection, setCategorySelection] = useState<{
        routeCategory?: String;
        value: CarCategory;
    } | null>(null);

    const { width } = useWindowDimensions();
    const contentWidth = Math.min(width, 680);

    const routeCategory = categories.find((item) => item === params.category);
    const category = categorySelection && categorySelection.routeCategory === params.category ? categorySelection.value : (routeCategory ?? "ALL")

    const [sortByPrice, setSortByPrice] = useState(false);

    const results= useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();
        const filtered = cars.filter((car) => {
            const matchesCategory = category === "ALL" || car.category === category;
            const matchesQuery = !normalizedQuery || `${car.make} ${car.category} ${car.location}`.toLowerCase().includes(normalizedQuery);
            return matchesCategory && matchesQuery;
        });
        return sortByPrice ? filtered.sort((a,b) => a.pricePerDay - b.pricePerDay) : filtered;
    }, [category, query, sortByPrice]);

    return (
        <SafeAreaView style={styles.screen}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[styles.pageContent, {width: contentWidth}]}
            >
                <Text style={styles.pageTitle}>Find Your Ride </Text>
                <Text style={styles.pageSubtitle}>
                    The right car makes the whole trip.
                </Text>
                <View style={styles.searchBox}>
                    <AppIcon name= "filter" size={19} color={palette.muted}/>
                    <TextInput
                        value={query}
                        onChangeText={setQuery}
                        placeholder="Try 'Tesla' or 'SUV'"
                        placeholderTextColor={palette.muted}
                        returnKeyType="search"
                        style={styles.searchInput}
                        accessibilityLabel="Search cars"
                    />
                    {query.length > 0 ? (
                        <Pressable
                            accessibilityRole="button" onPress={() => setQuery("")}>
                                <AppIcon name="close" size={17} color={palette.muted}/>
                            </Pressable>
                    ) : null}
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoryList}
                >
                    {categories.map((item) => {
                        const selected = category === item;
                        return(
                            <Pressable
                                key={item}
                                accessibilityRole="button"
                                accessibilityState={{selected}}
                                onPress={() => 
                                    setCategorySelection({
                                        routeCategory: params.category,
                                        value: item,
                                    })
                                }
                                style={[
                                    styles.categoryChip,{
                                        backgroundColor: selected ? palette.ink : palette.white,
                                        borderColor: selected ? palette.ink : palette.line,
                                    },
                                ]}
                                >
                                    <Text style={[
                                        styles.categoryLabel, {color: selected ? palette.white : palette.ink}
                                    ]}>
                                        {item}
                                    </Text>
                                </Pressable>
                        );
                    })}
                </ScrollView>

                <View style={styles.resultsToolbar}>
                    <Text style= {styles.resultCount}>
                        {results.length} {results.length === 1 ? "car" : " cars " } available
                    </Text>
                    <Pressable
                        accessibilityRole="button"
                        accessibilityState={{ selected: sortByPrice }}
                        onPress={() => setSortByPrice((value) => !value)}
                        style= {styles.sortButton}
                    >
                        <AppIcon name="filter" size={15} color={palette.green}/>
                        <Text style={styles.sortButtonLabel}>
                            {sortByPrice ? "Price: low to high" : "Sort by price"}
                        </Text>
                    </Pressable>
                </View>
                <View style={styles.resultsList}>
                    {results.map((car) => (
                        <CarCard key={car.id} car={car}/>
                    ))}
                </View>
                {results.length === 0 ? (
                    <View style={styles.emptyState}>
                        <AppIcon name="car" size={32} color={palette.muted}/>
                        <Text style={styles.emptyStateTitle}>No cars Found</Text>
                        <Text style={styles.emptyStateMessage}>
                            Try a different search or category.
                        </Text>
                    </View>
                ) : null}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles= StyleSheet.create({
    screen: {
        flex:1, 
        backgroundColor: palette.canvas,
    },
    pageContent:{
        // flexGrow: 1,
        alignSelf: "center",
        paddingHorizontal: 20,
        paddingBottom: 24,
    },
    pageTitle:{
        color: palette.ink,
        fontSize: 27,
        fontWeight: "800",
        marginTop: 9,
    },
    pageSubtitle:{
        color: palette.muted,
        fontSize: 13,
        marginTop: 5,
    },
    searchBox: {
        height: 52,
        marginTop: 19,
        borderRadius: 15,
        borderWidth: 1,
        paddingHorizontal: 5,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderColor: palette.line,
        backgroundColor: palette.white,      
    },
    searchInput:{
        flex: 1,
        color: palette.ink,
        fontSize: 14,
        paddingVertical: 10,
    },
    categoryList: {
        gap: 8,
        paddingVertical: 15,
    },
    categoryChip: {
        paddingHorizontal: 15,
        paddingVertical: 9,
        borderRadius: 22,
        borderWidth: 1,
    },
    categoryLabel: {
        fontSize: 12,
        fontWeight: "700",
    },

    resultsToolbar:{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 13,
    },
    resultCount: {
        color: palette.muted,
        fontSize: 12,
        flex:1,
    },
    sortButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        padding: 5,
    },
    sortButtonLabel:{
        color: palette.green,
        fontSize: 17,
        fontWeight: "700",
    },
    resultsList:{
        gap: 13,
    },
    emptyState: {
        alignItems: "center",
        paddingVertical: 58,
    },
    emptyStateTitle: {
        color: palette.ink,
        fontSize: 16,
        fontWeight: "700",
        marginTop: 12
    },
    emptyStateMessage: {
        color: palette.muted,
        fontSize: 13,
        marginTop: 5,
    }
}
); 