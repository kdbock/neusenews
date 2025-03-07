import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker';
import * as WebBrowser from 'expo-web-browser';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types'; // Adjust the path as necessary

// Type for the items in the dropdown
type DropdownItem = {
  label: string;
  value: string;
};

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [open, setOpen] = useState(false);
  // The 'value' can be null if nothing is selected
  const [value, setValue] = useState<string | null>(null);

  // We store an array of typed items
  const [items, setItems] = useState<DropdownItem[]>([
    { label: "Local News", value: "https://www.neusenews.com/index/category/Local+News?format=rss" },
    { label: "State News", value: "https://www.neusenews.com/index/category/NC+News?format=rss" },
    { label: "Columns", value: "https://www.neusenews.com/index/category/Columns?format=rss" },
    { label: "Matters of Record", value: "https://www.neusenews.com/index/category/Matters+of+Record?format=rss" },
    { label: "Obituaries", value: "https://www.neusenews.com/index/category/Obituaries?format=rss" },
    { label: "Public Notice", value: "https://www.neusenews.com/index/category/Public+Notices?format=rss" },
  ]);

  // Called when user picks an item
  function handleChange(item: DropdownItem) {
    navigation.navigate("news", { rssUrl: item.value });
    setValue(item.value);
  }

  const openClassifiedsOrder = async () => {
    await WebBrowser.openBrowserAsync("https://www.neusenews.com/order-classifieds");
  };

  return (
    <View style={styles.header}>
      <View style={styles.dropdownContainer}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="News Categories"
          style={styles.dropdown}
          // For more recent versions of react-native-dropdown-picker:
          dropDownContainerStyle={styles.dropdownBox}
          // If using an older version, you might need onChangeItem
          // but for newer versions, use onSelectItem or onChangeValue
          onSelectItem={(selectedItem) => handleChange(selectedItem as DropdownItem)}
          textStyle={{ color: '#000' }}
        />
      </View>
      <TouchableOpacity style={styles.orderButton} onPress={openClassifiedsOrder}>
        <Text style={styles.orderButtonText}>Order Classifieds</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: '#fff', // white background for header
    padding: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownContainer: {
    flex: 1,
    marginRight: 10,
    width: '66%', // Set width to 2/3rds of the container
  },
  dropdown: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderRadius: 10, // Make the dropdown box rounded
  },
  dropdownBox: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderRadius: 10, // Make the dropdown box rounded
  },
  orderButton: {
    borderColor: '#d2982a', // gold border
    borderWidth: 1,
    borderRadius: 10, // Make the button rounded
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff', // white background
  },
  orderButtonText: {
    color: '#d2982a', // gold text
    fontWeight: 'bold',
  },
});