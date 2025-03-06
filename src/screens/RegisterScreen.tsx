import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, StyleSheet, ScrollView } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [avatar, setAvatar] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [facebook, setFacebook] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [bluesky, setBluesky] = useState('');

  // Dummy function to handle avatar upload
  const handleAvatarUpload = () => {
    // Implement image picker logic here
    alert('Avatar upload not implemented.');
  };

  const handleRegister = () => {
    // Handle registration logic and then navigate back to login on success
    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.avatarContainer} onPress={handleAvatarUpload}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <Text style={styles.avatarText}>Upload Avatar</Text>
        )}
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Zip Code"
        value={zipCode}
        onChangeText={setZipCode}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Facebook"
        value={facebook}
        onChangeText={setFacebook}
      />
      <TextInput
        style={styles.input}
        placeholder="TikTok"
        value={tiktok}
        onChangeText={setTiktok}
      />
      <TextInput
        style={styles.input}
        placeholder="Instagram"
        value={instagram}
        onChangeText={setInstagram}
      />
      <TextInput
        style={styles.input}
        placeholder="Twitter/X"
        value={twitter}
        onChangeText={setTwitter}
      />
      <TextInput
        style={styles.input}
        placeholder="LinkedIn"
        value={linkedIn}
        onChangeText={setLinkedIn}
      />
      <TextInput
        style={styles.input}
        placeholder="Bluesky"
        value={bluesky}
        onChangeText={setBluesky}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Back to Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ccc',
    justifyContent:'center',
    alignItems:'center',
    marginBottom: 20,
    overflow: 'hidden'
  },
  avatar: {
    width: '100%',
    height: '100%'
  },
  avatarText: {
    color: '#fff'
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
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18
  },
  link: {
    color: '#007AFF',
    marginVertical: 10,
    textDecorationLine: 'underline'
  }
});

export default RegisterScreen;