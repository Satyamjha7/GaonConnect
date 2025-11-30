import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithPhoneNumber } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { app } from "../firebaseConfig"; // ✅ import your Firebase app instance

const { width } = Dimensions.get("window");

export default function Login() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [code, setCode] = useState("");
    const [confirm, setConfirm] = useState(null);
    const navigation = useNavigation();

    const auth = getAuth(app);
    const firestore = getFirestore(app);

    // ✅ Step 1: Send OTP
    const signInWithPhone = async () => {
        if (!phoneNumber) {
            Alert.alert("Error", "Please enter a valid phone number.");
            return;
        }

        try {
            const confirmation = await signInWithPhoneNumber(auth, phoneNumber);
            setConfirm(confirmation);
            Alert.alert("OTP Sent", "Check your phone for the verification code.");
        } catch (error) {
            console.error("Error sending code:", error);
            Alert.alert("Error", "Failed to send verification code.");
        }
    };

    // ✅ Step 2: Confirm OTP
    const confirmCode = async () => {
        if (!code) {
            Alert.alert("Error", "Please enter the verification code.");
            return;
        }

        try {
            const userCredential = await confirm.confirm(code);
            const user = userCredential.user;

            // ✅ Step 3: Check Firestore for existing user
            const userRef = doc(firestore, "users", user.uid);
            const userSnapshot = await getDoc(userRef);

            if (userSnapshot.exists()) {
                // Existing user
                Alert.alert("Welcome Back!", "Redirecting to Dashboard...");
                navigation.navigate("Dashboard");
            } else {
                // New user → add to Firestore and navigate to Detail
                await setDoc(userRef, {
                    uid: user.uid,
                    phoneNumber: user.phoneNumber,
                    createdAt: new Date().toISOString(),
                });

                Alert.alert("New User Registered", "Redirecting to Detail Page...");
                navigation.navigate("Detail", { uid: user.uid });
            }
        } catch (error) {
            console.error("Invalid code.", error);
            Alert.alert("Error", "Invalid or expired code. Please try again.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Phone Number Authentication</Text>

            {!confirm ? (
                <>
                    <Text style={styles.label}>Enter your phone number:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. +91 9876543210"
                        placeholderTextColor="#999"
                        keyboardType="phone-pad"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                    />
                    <TouchableOpacity style={styles.button} onPress={signInWithPhone}>
                        <Text style={styles.buttonText}>Send Code</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <Text style={styles.label}>Enter the verification code:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="123456"
                        placeholderTextColor="#999"
                        keyboardType="number-pad"
                        value={code}
                        onChangeText={setCode}
                    />
                    <TouchableOpacity style={styles.button} onPress={confirmCode}>
                        <Text style={styles.buttonText}>Verify Code</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#05191d",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: width * 0.08,
    },
    title: {
        fontSize: width * 0.07,
        color: "#fff",
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center",
    },
    label: {
        fontSize: width * 0.04,
        color: "#ccc",
        marginBottom: 10,
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#32CD32",
        borderRadius: 10,
        paddingVertical: width * 0.035,
        paddingHorizontal: width * 0.04,
        fontSize: width * 0.045,
        color: "#fff",
        backgroundColor: "rgba(255,255,255,0.05)",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#32CD32",
        width: "100%",
        paddingVertical: width * 0.04,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: width * 0.045,
        fontWeight: "bold",
    },
});
