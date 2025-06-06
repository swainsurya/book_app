import { View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, ActivityIndicator, Platform } from 'react-native'
import React, { useState } from 'react'
import styles from '@/styles/login.styles'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import COLORS from '@/constants/colors'
import { Link } from 'expo-router'
import { useAuthStore } from '@/store/authStore'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const index = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);

    const {login, isLoading, token,user} = useAuthStore();

    const handleLogin = async()=>{
        login(email,password)
        const currUser = await AsyncStorage.getItem("user")
        const tokens = await AsyncStorage.getItem("token")
        console.log(currUser)
        console.log(tokens);
    }
    return (
        <KeyboardAvoidingView
            style={{flex:1}}
            behavior={Platform.OS=="ios"?"padding":"height"}
        >
            <View style={styles.container}>
                <View style={styles.topIllustration}>
                    <Image
                        source={require("@/assets/public/signupImage.png")}
                        style={styles.illustrationImage}
                        resizeMode='contain'
                    />
                </View>

                <View style={styles.card}>
                    <KeyboardAvoidingView>
                        <View style={styles.formContainer}>
                            {/* email */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Email</Text>
                                <View style={styles.inputContainer}>
                                    <Ionicons
                                        name='mail-outline'
                                        size={20}
                                        color={COLORS.primary}
                                        style={styles.inputIcon}
                                    />

                                    <TextInput
                                        style={styles.input}
                                        placeholder='Enter your Email'
                                        placeholderTextColor={COLORS.placeholderText}
                                        value={email}
                                        onChangeText={setEmail}
                                        keyboardType='email-address'
                                        autoCapitalize='none'
                                    />
                                </View>
                            </View>
                            {/* password */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Password</Text>
                                <View style={styles.inputContainer}>
                                    <Ionicons
                                        name='key-outline'
                                        size={20}
                                        color={COLORS.primary}
                                        style={styles.inputIcon}
                                    />

                                    <TextInput
                                        style={styles.input}
                                        placeholder='Enter your Password'
                                        placeholderTextColor={COLORS.placeholderText}
                                        value={password}
                                        onChangeText={setPassword}
                                        autoCapitalize='none'
                                        secureTextEntry={!showPass}
                                    />
                                    <Ionicons
                                        name={showPass ? 'eye-off-outline' : 'eye-outline'}
                                        size={20}
                                        style={styles.eyeIcon}
                                        onPress={() => setShowPass(!showPass)}
                                        color={COLORS.primary}
                                    />
                                </View>
                            </View>
                            {/* Login Btn */}
                            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                                {isLoading ? (
                                    <ActivityIndicator size={"small"} color={"white"} />
                                ) : (
                                    <Text style={styles.buttonText} >Login</Text>
                                )}
                            </TouchableOpacity>
                            {/* Dont have account */}
                            <View style={styles.footer}>
                                <Text style={styles.footerText}>Don't have an account?</Text>
                                <Link href={"/signup"} style={styles.link}>Signup</Link>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default index