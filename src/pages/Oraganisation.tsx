import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonColors from '../common/CommonColors';

const folderData = [
  {
    id: '1',
    title: 'Web Design',
    icon: 'web',
    files: '8 files',
    date: '20 Sep, 2023',
    selected: false,
  },
  {
    id: '2',
    title: 'App Design',
    icon: 'cellphone',
    files: '12 files',
    date: '18 Sep, 2023',
    selected: true,
  },
  {
    id: '3',
    title: 'Music',
    icon: 'music',
    files: '24 GB',
    date: '15 Sep, 2023',
    selected: false,
  },
  {
    id: '4',
    title: 'Video',
    icon: 'video',
    files: '5 files',
    date: '12 Sep, 2023',
    selected: false,
  },
  {
    id: '5',
    title: 'Images',
    icon: 'image',
    files: '15 files',
    date: '10 Sep, 2023',
    selected: false,
  },
];

const Oraganisation = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Folders</Text>
        <TouchableOpacity>
          <Icon
            name="bell-outline"
            size={24}
            color={CommonColors.textPrimary}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.createButton}>
        <Icon name="plus" size={24} color={CommonColors.background} />
        <Text style={styles.createButtonText}>Create New Folder</Text>
      </TouchableOpacity>

      <ScrollView style={styles.folderList}>
        {folderData.map(folder => (
          <TouchableOpacity
            key={folder.id}
            style={[
              styles.folderItem,
              folder.selected && styles.folderItemSelected,
            ]}>
            <View style={styles.folderIcon}>
              <Icon
                name={folder.icon}
                size={24}
                color={CommonColors.textPrimary}
              />
            </View>
            <View style={styles.folderInfo}>
              <Text style={styles.folderTitle}>{folder.title}</Text>
              <Text style={styles.folderMeta}>
                {folder.files} • {folder.date}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommonColors.background,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: CommonColors.textPrimary,
  },
  createButton: {
    backgroundColor: CommonColors.theme,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginVertical: 16,
  },
  createButtonText: {
    color: CommonColors.background,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  folderList: {
    flex: 1,
  },
  folderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: CommonColors.itemBackground,
    borderRadius: 12,
    marginBottom: 8,
  },
  folderItemSelected: {
    backgroundColor: '#E3F2FD',
  },
  folderIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: CommonColors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  folderInfo: {
    flex: 1,
  },
  folderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: CommonColors.textPrimary,
    marginBottom: 4,
  },
  folderMeta: {
    fontSize: 12,
    color: CommonColors.textSecondary,
  },
});

export default Oraganisation;
