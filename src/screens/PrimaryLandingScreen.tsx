import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const PrimaryLandingScreen = () => {
  // Dummy online users data
  const onlineUsers = ['User1', 'User2', 'User3', 'User4', 'User5'];

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.onlineUsersContainer}>
        {onlineUsers.map((user, index) => (
          <View key={index} style={styles.userBox}>
            <Text>{user}</Text>
          </View>
        ))}
      </ScrollView>
      <Text style={styles.content}>Primary Landing Content</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff'
  },
  onlineUsersContainer: {
    padding: 10,
    backgroundColor: '#eee'
  },
  userBox: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 10,
    marginRight: 10
  },
  content: {
    padding: 20,
    fontSize: 18
  }
});

export default PrimaryLandingScreen;
