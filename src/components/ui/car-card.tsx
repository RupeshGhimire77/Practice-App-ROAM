import {router} from 'expo-router';
import { Image, StyleSheet, Pressable, Text, View } from 'react-native';

import { AppIcon } from './app-icon';

import type { Car } from '../../features/cars/data';
import { palette } from '../../theme/colors';
import { useRentalStore } from '../../features/rentals/rental-context';

export function CarCard({ car, compact = false }: {car: Car, compact?:boolean}){
    const { favorites, toggleFavorite } = useRentalStore();
    const saved = favorites.includes(car.id);

    return(
    <View style={[styles.carCard,{width: compact ? 270 : "100%"}]}>
        <Pressable
            accessibilityRole='button'
            accessibilityLabel={`${car.year} ${car.make} ${car.model}, ${car.pricePerDay} per day`}
            onPress={() => router.push({ pathname: "/car/[id]", params: {id: car.id}})
            }
            style={({ pressed }) => ({ opacity: pressed ? 0.94 : 1})}
        >
            <View
                style={[
                    styles.imageFrame, {height: compact ? 150: 190, backgroundColor: car.accent},
                ]}
            >
                <Image 
                    source={{uri: car.image}}
                    resizeMode="cover"
                    style={styles.image}
                />
                </View>
                <View style= {styles.cardBody}>
                    <View style={styles.carSummary}>
                        <View style={styles.carDescription}>
                            <Text numberOfLines={1} style={styles.carName}>
                                {car.make} {car.model}
                            </Text>
                            <Text style={styles.carMeta}>
                                {car.year} {car.category} {car.seats} seats
                            </Text>
                        </View>
                        <View style={styles.rating}>
                            <AppIcon name='star' size={14} color={palette.amber}/>
                            <Text style={styles.ratingValue}>{car.rating}</Text>
                        </View>
                    </View>
                    <View style={styles.priceRow}>
                        <Text style={styles.price}>${car.pricePerDay}</Text>
                        <Text style={styles.priceSuffix}> / day</Text>
                        <Text style={styles.carLocation}>{car.location.split(",")[0]}</Text>
                    </View>
                </View>
                <Pressable
                    accessibilityRole='button'
                    accessibilityLabel= {saved ? "Remove from saved cars" : "Save car"}
                    onPress={()=> toggleFavorite(car.id)}
                    style={styles.favoriteButton}
                >
                    <AppIcon 
                        name={saved ? "heartFill" :"heart" }
                        color={saved ? palette.red : palette.ink}
                        
                    />
                </Pressable>
        </Pressable>
    </View>);
}

const styles= StyleSheet.create(
    {
        carCard: {
            backgroundColor: palette.white,
            borderRadius: 20,
            borderWidth:1,
            borderColor: palette.line,
            overflow: 'hidden'
        },
        imageFrame: {
            width: "100%"
        },
        image: {
            height: "100%",
            width: "100%",
        },
        cardBody:{
            padding: 15,
        },
        carSummary:{
            flexDirection: "row",
            justifyContent: 'space-between',
            gap: 8,
        },
        carDescription:{
            flex: 1,
        },
        carName:{
            color: palette.ink,
            fontSize: 16,
            fontWeight: "700",
        },

        carMeta:{color: palette.muted, marginTop: 4, fontSize: 12},
        rating:{flexDirection: "row", alignItems: "center", gap: 4},
        ratingValue:{color: palette.ink, fontWeight: "700", fontSize: 13},
        priceRow:{
            borderTopWidth: 1,
            borderTopColor: palette.line,
            marginTop: 14,
            paddingTop: 12,
            flexDirection: "row",
            alignItems: "baseline",
        },
        price:{
            color: palette.ink, fontSize: 18, fontWeight: "800"
        },
        priceSuffix:{color: palette.muted, fontSize: 12},
        carLocation:{
            color: palette.muted, fontSize: 12, marginLeft: "auto"
        },
        favoriteButton: {
            position: "absolute",
            right: 12,
            top: 12,
            width: 38,
            height: 38,
            borderRadius: 19,
            backgroundColor: palette.white,
            alignItems: "center",
            justifyContent: "center"
        }
    }
);