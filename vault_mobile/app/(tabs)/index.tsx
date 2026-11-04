import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ImageBackground, TouchableOpacity, FlatList, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import { allNodes } from '../../AsiaData'; // Keeps your database logic connected

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const categories = ["MOUNTAINS", "COASTAL", "CITY VIBES", "HIKING", "PARTY"];

  // Filter the Kerala/Asia Data Vault as you type
  const filteredData = allNodes.filter(node => 
    node.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* 1. The Mountain Background Image (Matching your Voyager Website) */}
      <ImageBackground 
        source={{ uri: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1774' }} 
        style={styles.heroImage}
      >
        <SafeAreaView style={styles.overlay}>
          
          {/* 2. Bold Branding: VOYAGER (Matching the italicized bold look) */}
          <View style={styles.header}>
            <Text style={styles.brandText}>VOYAGER<Text style={{color: '#00aaff'}}>.</Text></Text>
          </View>

          {/* 3. The Pill-Shaped Category Buttons */}
          <View style={{height: 50, marginBottom: 20}}>
            <FlatList 
              data={categories}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 15 }}
              renderItem={({item, index}) => (
                <TouchableOpacity style={[styles.pill, index === 0 ? styles.pillActive : null]}>
                  <Text style={[styles.pillText, index === 0 ? styles.pillTextActive : null]}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
          </View>

          {/* 4. The White Search Container with "EXPLORE" Button */}
          <View style={styles.searchParent}>
            <View style={styles.searchInner}>
              <TextInput 
                style={styles.input}
                placeholder="Search destinations..."
                placeholderTextColor="#999"
                value={search}
                onChangeText={(text) => setSearch(text)}
              />
              <TouchableOpacity style={styles.exploreBtn}>
                <Text style={styles.exploreText}>EXPLORE</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 5. Results Area with White Furniture look */}
          <FlatList 
            data={filteredData}
            style={styles.resultScroll}
            contentContainerStyle={{ paddingBottom: 150 }}
            renderItem={({item}) => (
              <View style={styles.card}>
                <Text style={styles.districtName}>{item.name}</Text>
                <Text style={styles.statusBadge}>{item.status}</Text>
                <View style={styles.divider} />
                <Text style={styles.itemText} numberOfLines={1}>• Stays: {item.details.stayOptions[0]}</Text>
                <Text style={styles.itemText} numberOfLines={1}>• Must Visit: {item.details.mustVisit[0]}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={
              <Text style={{textAlign: 'center', color: '#fff', marginTop: 20}}>No destinations found</Text>
            }
          />

          {/* 6. The Bottom status bar: VERIFIED LUXE (Semi-transparent Black) */}
          <View style={styles.footerInfo}>
             <Text style={styles.footerText}>VERIFIED LUXE • CHILLY ALPINE | 4°C</Text>
          </View>

        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  heroImage: { width: '100%', height: '100%' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.15)' },
  header: { alignItems: 'center', marginTop: 80, marginBottom: 20 },
  brandText: { fontSize: 60, fontWeight: '900', color: '#fff', letterSpacing: -2, fontStyle: 'italic' },
  pill: { 
    backgroundColor: 'rgba(255,255,255,0.85)', paddingHorizontal: 20, 
    height: 35, borderRadius: 20, justifyContent: 'center', marginHorizontal: 5 
  },
  pillActive: { backgroundColor: '#1a1a1a' },
  pillText: { fontSize: 11, fontWeight: 'bold', color: '#1a1a1a' },
  pillTextActive: { color: '#fff' },
  searchParent: { alignItems: 'center', marginBottom: 20 },
  searchInner: { 
    flexDirection: 'row', backgroundColor: '#fff', width: '90%', 
    height: 55, borderRadius: 30, alignItems: 'center', paddingHorizontal: 5,
    elevation: 10, shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 10
  },
  input: { flex: 1, paddingLeft: 20, fontSize: 16, color: '#333' },
  exploreBtn: { backgroundColor: '#1a1a1a', height: 45, paddingHorizontal: 25, borderRadius: 25, justifyContent: 'center' },
  exploreText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  resultScroll: { width: '100%', paddingHorizontal: 15 },
  card: { 
    backgroundColor: '#fff', borderRadius: 25, padding: 20, marginBottom: 15,
    elevation: 4, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 5
  },
  districtName: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  statusBadge: { fontSize: 12, color: '#00aaff', marginTop: 3 },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 10 },
  itemText: { fontSize: 15, color: '#444', marginBottom: 2 },
  footerInfo: { 
    position: 'absolute', bottom: 50, alignSelf: 'center', width: '80%', 
    backgroundColor: 'rgba(0, 0, 0, 0.7)', paddingVertical: 12, borderRadius: 25, alignItems: 'center' 
  },
  footerText: { fontSize: 11, fontWeight: 'bold', letterSpacing: 1, color: '#fff' }
});