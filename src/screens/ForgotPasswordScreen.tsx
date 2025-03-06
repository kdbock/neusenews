import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleReset = () => {
    // Handle password reset logic (e.g., API call)
    alert('Password reset link sent. Check your email (and spam folder).');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your email address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
      <Text style={styles.spamWarning}>
        Warning: Check your spam folder if you do not see the reset link.
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 20,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#fff'
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginVertical: 10
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    width: '100%',
    alignItems:'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18
  },
  spamWarning: {
    color: 'red',
    marginVertical: 10,
    textAlign: 'center'
  },
  link: {
    color: '#007AFF',
    marginVertical: 10,
    textDecorationLine: 'underline'
  }
});

export default ForgotPasswordScreen;
