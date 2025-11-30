import React, { useEffect, useRef, useState } from "react";
import { View, Text, Animated, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function LandingPage() {
    const navigation = useNavigation(); // ✅ Correct hook for React Navigation
    const logoAnim = useRef(new Animated.Value(0)).current;
    const [showExplore, setShowExplore] = useState(false);

    useEffect(() => {
        Animated.sequence([
            Animated.timing(logoAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.delay(2000),
            Animated.timing(logoAnim, {
                toValue: 2,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start(() => setShowExplore(true));
    }, [logoAnim]);

    const logoTranslateY = logoAnim.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [50, 0, -50],
    });

    const logoOpacity = logoAnim.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [0, 1, 1],
    });

    return (
        <View style={styles.container}>
            <Animated.Image
                source={require("../assets/logo-lms.png")}
                style={[
                    styles.logo,
                    { opacity: logoOpacity, transform: [{ translateY: logoTranslateY }] },
                ]}
            />
            {showExplore && (
                <TouchableOpacity
                    style={styles.exploreBtn}
                    onPress={() => navigation.navigate("WelcomePage")} // ✅ Correct navigation
                >
                    <Text style={styles.exploreText}>Explore</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 200,
        height: 200,
        resizeMode: "contain",
    },
    exploreBtn: {
        marginTop: 40,
        backgroundColor: "#289e28",
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 8,
        elevation: 4,
    },
    exploreText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});
