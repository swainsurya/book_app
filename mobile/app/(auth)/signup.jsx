import { ActivityIndicator, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity } from 'react-native'
import { View, Text } from 'react-native'
import styles from '@/styles/signup.styles'
import { Ionicons } from '@expo/vector-icons'
import COLORS from '@/constants/colors'
import { useState } from 'react'
import { Link, router } from 'expo-router'

const signup = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showpass, setShowPass] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
            <View style={styles.container}>
                <View style={styles.card}>
                    {/* header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>BookGyan</Text>
                        <Text style={styles.subtitle}>Share your favourite reads</Text>
                    </View>

                    {/* FORM */}
                    <View style={styles.formContainer}>
                        {/* Username */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Username</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons
                                    name='person-outline'
                                    size={20}
                                    color={COLORS.primary}
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder='Suryakanta Swain'
                                    placeholderTextColor={COLORS.placeholderText}
                                    value={username}
                                    onChangeText={setUsername}
                                />
                            </View>
                        </View>
                        {/* Email */}
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
                                    placeholder='swain@gmail.com'
                                    placeholderTextColor={COLORS.placeholderText}
                                    value={email}
                                    onChangeText={setEmail}
                                />
                            </View>
                        </View>
                        {/* Password */}
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
                                    placeholder='Enter Password'
                                    placeholderTextColor={COLORS.placeholderText}
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showpass}
                                />
                                <Ionicons
                                    name={!showpass ? 'eye-outline' : 'eye-off-outline'}
                                    size={20}
                                    style={styles.eyeIcon}
                                    color={COLORS.primary}
                                    onPress={() => { setShowPass(!showpass) }}
                                />

                            </View>
                        </View>
                        {/* Signup BTN */}
                        <TouchableOpacity style={styles.button} onPress={()=>{
                            setIsLoading(true)
                        }}>
                            {
                                isLoading?(
                                    <ActivityIndicator size="small" color={"white"} />
                                ):(<Text style={styles.buttonText}>Sign Up</Text>)
                            }
                        </TouchableOpacity>
                        {/* Footer */}
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Already have an account?</Text>
                            <TouchableOpacity onPress={()=>router.back()}>
                                <Text style={styles.link}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default signup