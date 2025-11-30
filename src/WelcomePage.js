import React, { useEffect, useRef, useState } from "react";
import {
    View,
    FlatList,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons"; // ✅ Correct import

const { width } = Dimensions.get("window");

export default function WelcomePage() {
    const navigation = useNavigation();
    const images = [
        require("../assets/11.jpg"),
        require("../assets/12.jpg"),
        require("../assets/13.jpg"),
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);

    // ✅ Auto slide logic
    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % images.length;
            if (flatListRef.current) {
                flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
            }
            setCurrentIndex(nextIndex);
        }, 4000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    const onMomentumScrollEnd = (event) => {
        const index = Math.round(
            event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width
        );
        setCurrentIndex(index);
    };

    const renderItem = ({ item }) => (
        <ImageBackground source={item} style={styles.imageBackground} resizeMode="cover">
            <View style={styles.imageOverlay} />
        </ImageBackground>
    );

    return (
        <View style={styles.container}>
            {/* Background Slider */}
            <FlatList
                ref={flatListRef}
                data={images}
                renderItem={renderItem}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={onMomentumScrollEnd}
            />

            {/* Overlay */}
            <View style={StyleSheet.absoluteFill}>
                <TouchableOpacity
                    style={styles.signUpLaterButton}
                    onPress={() => navigation.navigate("Dashboard")} // Example navigation
                >
                    <Text style={styles.signUpLaterText}>Sign Up Later</Text>
                </TouchableOpacity>

                <View style={styles.overlay}>
                    {/* Dots Indicator */}
                    <View style={styles.dotsContainer}>
                        {images.map((_, index) => (
                            <View
                                key={index}
                                style={[styles.dot, currentIndex === index && styles.activeDot]}
                            />
                        ))}
                    </View>

                    <Text style={styles.heading}>Log in or Sign up</Text>

                    {/* Buttons */}
                    <View style={styles.buttonContainer}>
                        <View style={styles.socialButtons}>
                            <TouchableOpacity style={[styles.authButton, styles.googleButton]}>
                                <FontAwesome
                                    name="google"
                                    size={20}
                                    color="#006400"
                                    style={styles.icon}
                                />
                                <Text style={[styles.authButtonText, { color: "#006400" }]}>
                                    Google
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.authButton, styles.facebookButton]}>
                                <FontAwesome
                                    name="facebook"
                                    size={20}
                                    color="#fff"
                                    style={styles.icon}
                                />
                                <Text style={[styles.authButtonText, { color: "#fff" }]}>
                                    Facebook
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* ✅ Mobile OTP Button */}
                        <TouchableOpacity
                            style={styles.authButton}
                            onPress={() => navigation.navigate("Login")}
                        >
                            <FontAwesome name="key" size={20} color="#32CD32" style={styles.icon} />
                            <Text style={styles.authButtonText}>Log in with Mobile OTP</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#000" },
    imageBackground: { width: width, height: "100%" },
    imageOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    signUpLaterButton: { position: "absolute", top: 50, left: 20 },
    signUpLaterText: { color: "#32CD32", fontSize: 16, fontWeight: "500" },
    overlay: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 30,
    },
    dotsContainer: { flexDirection: "row", marginBottom: 25 },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#ccc",
        marginHorizontal: 4,
    },
    activeDot: { backgroundColor: "#32CD32" },
    heading: { color: "#fff", fontSize: 24, fontWeight: "bold", marginBottom: 20 },
    buttonContainer: { width: "90%", alignItems: "center" },
    socialButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 12,
    },
    googleButton: { flex: 1, backgroundColor: "#e0f2e9", marginRight: 5 },
    facebookButton: { flex: 1, backgroundColor: "#1a531b", marginLeft: 5 },
    authButton: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#32CD32",
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 12,
    },
    authButtonText: { color: "#32CD32", fontSize: 16, fontWeight: "600" },
    icon: { marginRight: 10 },
});
