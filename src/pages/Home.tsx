import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MainHeader from '../component/MainHeader';
import CommonColors from '../common/CommonColors';
import {useNavigation} from '@react-navigation/native';
import OrganizationCard from '../component/OrganizationCard';

const {width, height} = Dimensions.get('window');

const Home = () => {
  // Dummy data for the organization cards
  const orgsData = [
    {
      name: 'Acme Corporation',
      department: 'Human Resources',
      adminName: 'John Doe',
      documentCount: 42,
      logoUrl:
        'https://media.9curry.com/uploads/organization/image/462/mhrd.png',
    },
  ];

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={CommonColors.GRADIENT_ONE} />
      <MainHeader title={'TransformoDocs'} />
      <ScrollView style={styles.content}>
        <Text style={styles.heading}>Your Organizations</Text>
        {orgsData.map((org, index) => (
          <OrganizationCard key={index} org={org} />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.aiButton}
        onPress={() => navigation.navigate('ChatBot')}>
        <Image
          source={require('../assets/images/ai.png')}
          style={styles.aiLogo}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  heading: {
    fontSize: 25,
    marginBottom: 20,
    color: CommonColors.FONT_COLOUR,
    fontFamily: 'Mulish-Black',
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  orgName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  department: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  adminName: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  documentCount: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  viewButton: {
    backgroundColor: CommonColors.GRADIENT_ONE,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  viewButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  aiButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    height: height * 0.1,
    width: width * 0.2,
    overflow: 'hidden',
  },
  aiLogo: {
    height: '100%',
    width: '100%',
  },
});
