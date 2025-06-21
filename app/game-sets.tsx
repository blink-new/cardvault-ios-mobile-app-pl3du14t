import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, router } from 'expo-router';
import { 
  ArrowLeft, 
  Search,
  Filter,
  Grid3X3,
  List,
  Star,
  TrendingUp,
  Calendar
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const gameData = {
  pokemon: {
    name: 'Pokémon',
    gradient: ['#FFD700', '#FFA500'],
    sets: [
      {
        id: 'scarlet-violet-base',
        name: 'Scarlet & Violet Base Set',
        code: 'SVI',
        releaseDate: '2023-03-31',
        totalCards: 198,
        collectedCards: 156,
        estimatedValue: 1240,
        rarity: 'Common',
        imageUrl: 'https://images.pokemontcg.io/sv1/logo.png',
        completion: 79
      },
      {
        id: 'paldea-evolved',
        name: 'Paldea Evolved',
        code: 'PAL',
        releaseDate: '2023-06-09',
        totalCards: 193,
        collectedCards: 95,
        estimatedValue: 890,
        rarity: 'Uncommon',
        imageUrl: 'https://images.pokemontcg.io/sv2/logo.png',
        completion: 49
      },
      {
        id: 'obsidian-flames',
        name: 'Obsidian Flames',
        code: 'OBF',
        releaseDate: '2023-08-11',
        totalCards: 197,
        collectedCards: 178,
        estimatedValue: 1580,
        rarity: 'Rare',
        imageUrl: 'https://images.pokemontcg.io/sv3/logo.png',
        completion: 90
      },
      {
        id: 'paradox-rift',
        name: 'Paradox Rift',
        code: 'PAR',
        releaseDate: '2023-11-03',
        totalCards: 182,
        collectedCards: 45,
        estimatedValue: 340,
        rarity: 'Common',
        imageUrl: 'https://images.pokemontcg.io/sv4/logo.png',
        completion: 25
      },
      {
        id: 'paldean-fates',
        name: 'Paldean Fates',
        code: 'PAF',
        releaseDate: '2024-01-26',
        totalCards: 91,
        collectedCards: 67,
        estimatedValue: 920,
        rarity: 'Ultra Rare',
        imageUrl: 'https://images.pokemontcg.io/sv4pt5/logo.png',
        completion: 74
      },
      {
        id: 'temporal-forces',
        name: 'Temporal Forces',
        code: 'TEF',
        releaseDate: '2024-03-22',
        totalCards: 162,
        collectedCards: 23,
        estimatedValue: 185,
        rarity: 'Common',
        imageUrl: 'https://images.pokemontcg.io/sv5/logo.png',
        completion: 14
      }
    ]
  },
  magic: {
    name: 'Magic: The Gathering',
    gradient: ['#CD853F', '#8B4513'],
    sets: [
      {
        id: 'bloomburrow',
        name: 'Bloomburrow',
        code: 'BLB',
        releaseDate: '2024-08-02',
        totalCards: 261,
        collectedCards: 189,
        estimatedValue: 1650,
        rarity: 'Mythic Rare',
        imageUrl: 'https://cards.scryfall.io/large/front/0/0/00000000-0000-0000-0000-000000000000.jpg',
        completion: 72
      },
      {
        id: 'duskmourn',
        name: 'Duskmourn: House of Horror',
        code: 'DSK',
        releaseDate: '2024-09-27',
        totalCards: 276,
        collectedCards: 134,
        estimatedValue: 980,
        rarity: 'Rare',
        imageUrl: 'https://cards.scryfall.io/large/front/0/0/00000000-0000-0000-0000-000000000000.jpg',
        completion: 49
      },
      {
        id: 'foundations',
        name: 'Foundations',
        code: 'FDN',
        releaseDate: '2024-11-15',
        totalCards: 291,
        collectedCards: 87,
        estimatedValue: 560,
        rarity: 'Common',
        imageUrl: 'https://cards.scryfall.io/large/front/0/0/00000000-0000-0000-0000-000000000000.jpg',
        completion: 30
      }
    ]
  },
  onepiece: {
    name: 'One Piece',
    gradient: ['#FF8C69', '#FF6B35'],
    sets: [
      {
        id: 'romance-dawn',
        name: 'Romance Dawn',
        code: 'OP01',
        releaseDate: '2022-07-22',
        totalCards: 121,
        collectedCards: 98,
        estimatedValue: 780,
        rarity: 'Super Rare',
        imageUrl: 'https://onepiece-cardgame.dev/images/cardlist/booster/OP-01/OP01-001.png',
        completion: 81
      },
      {
        id: 'paramount-war',
        name: 'Paramount War',
        code: 'OP02',
        releaseDate: '2022-11-25',
        totalCards: 114,
        collectedCards: 67,
        estimatedValue: 450,
        rarity: 'Rare',
        imageUrl: 'https://onepiece-cardgame.dev/images/cardlist/booster/OP-02/OP02-001.png',
        completion: 59
      },
      {
        id: 'pillars-of-strength',
        name: 'Pillars of Strength',
        code: 'OP03',
        releaseDate: '2023-02-25',
        totalCards: 114,
        collectedCards: 42,
        estimatedValue: 320,
        rarity: 'Common',
        imageUrl: 'https://onepiece-cardgame.dev/images/cardlist/booster/OP-03/OP03-001.png',
        completion: 37
      }
    ]
  }
};

export default function GameSets() {
  const { gameId } = useLocalSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'completion' | 'value' | 'date'>('name');
  
  const game = gameData[gameId as keyof typeof gameData];
  
  if (!game) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Game not found</Text>
      </SafeAreaView>
    );
  }

  const sortedSets = [...game.sets].sort((a, b) => {
    switch (sortBy) {
      case 'completion':
        return b.completion - a.completion;
      case 'value':
        return b.estimatedValue - a.estimatedValue;
      case 'date':
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const handleSetPress = (setId: string) => {
    router.push(`/set-details?gameId=${gameId}&setId=${setId}`);\n  };\n\n  const totalValue = game.sets.reduce((sum, set) => sum + set.estimatedValue, 0);\n  const totalCards = game.sets.reduce((sum, set) => sum + set.collectedCards, 0);\n  const totalPossible = game.sets.reduce((sum, set) => sum + set.totalCards, 0);\n  const averageCompletion = Math.round(game.sets.reduce((sum, set) => sum + set.completion, 0) / game.sets.length);\n\n  return (\n    <SafeAreaView style={styles.container}>\n      <ScrollView showsVerticalScrollIndicator={false}>\n        {/* Header */}\n        <View style={styles.header}>\n          <TouchableOpacity \n            style={styles.backButton}\n            onPress={() => router.back()}\n          >\n            <ArrowLeft size={24} color=\"#111827\" />\n          </TouchableOpacity>\n          <Text style={styles.headerTitle}>{game.name} Sets</Text>\n          <TouchableOpacity style={styles.searchButton}>\n            <Search size={24} color=\"#6366F1\" />\n          </TouchableOpacity>\n        </View>\n\n        {/* Game Overview */}\n        <LinearGradient\n          colors={game.gradient}\n          start={{ x: 0, y: 0 }}\n          end={{ x: 1, y: 1 }}\n          style={styles.overviewCard}\n        >\n          <View style={styles.overviewStats}>\n            <View style={styles.overviewStat}>\n              <Text style={styles.overviewStatValue}>{game.sets.length}</Text>\n              <Text style={styles.overviewStatLabel}>Total Sets</Text>\n            </View>\n            <View style={styles.overviewStat}>\n              <Text style={styles.overviewStatValue}>{totalCards}/{totalPossible}</Text>\n              <Text style={styles.overviewStatLabel}>Cards Collected</Text>\n            </View>\n            <View style={styles.overviewStat}>\n              <Text style={styles.overviewStatValue}>${totalValue.toLocaleString()}</Text>\n              <Text style={styles.overviewStatLabel}>Total Value</Text>\n            </View>\n          </View>\n          \n          <View style={styles.completionBar}>\n            <View style={styles.completionBarBackground}>\n              <View \n                style={[\n                  styles.completionBarFill,\n                  { width: `${averageCompletion}%` }\n                ]}\n              />\n            </View>\n            <Text style={styles.completionText}>\n              {averageCompletion}% Average Completion\n            </Text>\n          </View>\n        </LinearGradient>\n\n        {/* Controls */}\n        <View style={styles.controls}>\n          <View style={styles.sortControls}>\n            <TouchableOpacity \n              style={[styles.sortButton, sortBy === 'name' && styles.sortButtonActive]}\n              onPress={() => setSortBy('name')}\n            >\n              <Text style={[styles.sortButtonText, sortBy === 'name' && styles.sortButtonTextActive]}>Name</Text>\n            </TouchableOpacity>\n            <TouchableOpacity \n              style={[styles.sortButton, sortBy === 'completion' && styles.sortButtonActive]}\n              onPress={() => setSortBy('completion')}\n            >\n              <Text style={[styles.sortButtonText, sortBy === 'completion' && styles.sortButtonTextActive]}>Progress</Text>\n            </TouchableOpacity>\n            <TouchableOpacity \n              style={[styles.sortButton, sortBy === 'value' && styles.sortButtonActive]}\n              onPress={() => setSortBy('value')}\n            >\n              <Text style={[styles.sortButtonText, sortBy === 'value' && styles.sortButtonTextActive]}>Value</Text>\n            </TouchableOpacity>\n            <TouchableOpacity \n              style={[styles.sortButton, sortBy === 'date' && styles.sortButtonActive]}\n              onPress={() => setSortBy('date')}\n            >\n              <Text style={[styles.sortButtonText, sortBy === 'date' && styles.sortButtonTextActive]}>Date</Text>\n            </TouchableOpacity>\n          </View>\n          \n          <View style={styles.viewControls}>\n            <TouchableOpacity \n              style={[styles.viewButton, viewMode === 'grid' && styles.viewButtonActive]}\n              onPress={() => setViewMode('grid')}\n            >\n              <Grid3X3 size={20} color={viewMode === 'grid' ? '#FFFFFF' : '#6B7280'} />\n            </TouchableOpacity>\n            <TouchableOpacity \n              style={[styles.viewButton, viewMode === 'list' && styles.viewButtonActive]}\n              onPress={() => setViewMode('list')}\n            >\n              <List size={20} color={viewMode === 'list' ? '#FFFFFF' : '#6B7280'} />\n            </TouchableOpacity>\n          </View>\n        </View>\n\n        {/* Sets Grid/List */}\n        <View style={styles.setsContainer}>\n          {viewMode === 'grid' ? (\n            <View style={styles.setsGrid}>\n              {sortedSets.map((set, index) => (\n                <TouchableOpacity \n                  key={set.id}\n                  style={styles.setGridCard}\n                  onPress={() => handleSetPress(set.id)}\n                >\n                  <View style={styles.setImageContainer}>\n                    <View style={[styles.setImagePlaceholder, { backgroundColor: game.gradient[0] }]}>\n                      <Text style={styles.setCode}>{set.code}</Text>\n                    </View>\n                    <View style={styles.completionBadge}>\n                      <Text style={styles.completionBadgeText}>{set.completion}%</Text>\n                    </View>\n                  </View>\n                  \n                  <View style={styles.setGridInfo}>\n                    <Text style={styles.setGridName} numberOfLines={2}>{set.name}</Text>\n                    <Text style={styles.setGridCards}>{set.collectedCards}/{set.totalCards} cards</Text>\n                    <Text style={styles.setGridValue}>${set.estimatedValue.toLocaleString()}</Text>\n                  </View>\n                </TouchableOpacity>\n              ))}\n            </View>\n          ) : (\n            <View style={styles.setsList}>\n              {sortedSets.map((set, index) => (\n                <TouchableOpacity \n                  key={set.id}\n                  style={styles.setListCard}\n                  onPress={() => handleSetPress(set.id)}\n                >\n                  <View style={styles.setListLeft}>\n                    <View style={[styles.setListImagePlaceholder, { backgroundColor: game.gradient[0] }]}>\n                      <Text style={styles.setListCode}>{set.code}</Text>\n                    </View>\n                    \n                    <View style={styles.setListInfo}>\n                      <Text style={styles.setListName}>{set.name}</Text>\n                      <Text style={styles.setListDetails}>{set.collectedCards}/{set.totalCards} cards • Released {new Date(set.releaseDate).getFullYear()}</Text>\n                      \n                      <View style={styles.setListProgressBar}>\n                        <View style={styles.setListProgressBackground}>\n                          <View \n                            style={[\n                              styles.setListProgressFill,\n                              { width: `${set.completion}%`, backgroundColor: game.gradient[0] }\n                            ]}\n                          />\n                        </View>\n                        <Text style={styles.setListProgressText}>{set.completion}%</Text>\n                      </View>\n                    </View>\n                  </View>\n                  \n                  <View style={styles.setListRight}>\n                    <Text style={styles.setListValue}>${set.estimatedValue.toLocaleString()}</Text>\n                    <View style={styles.setListTrend}>\n                      <TrendingUp size={14} color=\"#10B981\" />\n                      <Text style={styles.setListTrendText}>+5.2%</Text>\n                    </View>\n                  </View>\n                </TouchableOpacity>\n              ))}\n            </View>\n          )}\n        </View>\n      </ScrollView>\n    </SafeAreaView>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    backgroundColor: '#F9FAFB',\n  },\n  header: {\n    flexDirection: 'row',\n    justifyContent: 'space-between',\n    alignItems: 'center',\n    paddingHorizontal: 20,\n    paddingTop: 10,\n    paddingBottom: 20,\n  },\n  backButton: {\n    width: 44,\n    height: 44,\n    borderRadius: 12,\n    backgroundColor: '#FFFFFF',\n    justifyContent: 'center',\n    alignItems: 'center',\n    shadowColor: '#000',\n    shadowOffset: { width: 0, height: 2 },\n    shadowOpacity: 0.1,\n    shadowRadius: 4,\n    elevation: 3,\n  },\n  headerTitle: {\n    fontSize: 20,\n    fontWeight: 'bold',\n    color: '#111827',\n  },\n  searchButton: {\n    width: 44,\n    height: 44,\n    borderRadius: 12,\n    backgroundColor: '#FFFFFF',\n    justifyContent: 'center',\n    alignItems: 'center',\n    shadowColor: '#000',\n    shadowOffset: { width: 0, height: 2 },\n    shadowOpacity: 0.1,\n    shadowRadius: 4,\n    elevation: 3,\n  },\n  overviewCard: {\n    marginHorizontal: 20,\n    borderRadius: 20,\n    padding: 24,\n    marginBottom: 24,\n  },\n  overviewStats: {\n    flexDirection: 'row',\n    justifyContent: 'space-between',\n    marginBottom: 20,\n  },\n  overviewStat: {\n    alignItems: 'center',\n  },\n  overviewStatValue: {\n    fontSize: 18,\n    fontWeight: 'bold',\n    color: '#FFFFFF',\n  },\n  overviewStatLabel: {\n    fontSize: 12,\n    color: '#FFFFFF',\n    opacity: 0.8,\n    marginTop: 2,\n    textAlign: 'center',\n  },\n  completionBar: {\n    marginTop: 12,\n  },\n  completionBarBackground: {\n    height: 6,\n    backgroundColor: 'rgba(255, 255, 255, 0.3)',\n    borderRadius: 3,\n    overflow: 'hidden',\n  },\n  completionBarFill: {\n    height: '100%',\n    backgroundColor: '#FFFFFF',\n    borderRadius: 3,\n  },\n  completionText: {\n    fontSize: 12,\n    color: '#FFFFFF',\n    opacity: 0.8,\n    marginTop: 8,\n    textAlign: 'center',\n  },\n  controls: {\n    flexDirection: 'row',\n    justifyContent: 'space-between',\n    alignItems: 'center',\n    paddingHorizontal: 20,\n    marginBottom: 20,\n  },\n  sortControls: {\n    flexDirection: 'row',\n    flex: 1,\n  },\n  sortButton: {\n    paddingHorizontal: 12,\n    paddingVertical: 6,\n    borderRadius: 8,\n    marginRight: 8,\n    backgroundColor: '#FFFFFF',\n    borderWidth: 1,\n    borderColor: '#E5E7EB',\n  },\n  sortButtonActive: {\n    backgroundColor: '#6366F1',\n    borderColor: '#6366F1',\n  },\n  sortButtonText: {\n    fontSize: 12,\n    fontWeight: '500',\n    color: '#6B7280',\n  },\n  sortButtonTextActive: {\n    color: '#FFFFFF',\n  },\n  viewControls: {\n    flexDirection: 'row',\n  },\n  viewButton: {\n    width: 36,\n    height: 36,\n    borderRadius: 8,\n    justifyContent: 'center',\n    alignItems: 'center',\n    marginLeft: 8,\n    backgroundColor: '#FFFFFF',\n    borderWidth: 1,\n    borderColor: '#E5E7EB',\n  },\n  viewButtonActive: {\n    backgroundColor: '#6366F1',\n    borderColor: '#6366F1',\n  },\n  setsContainer: {\n    paddingHorizontal: 20,\n    paddingBottom: 40,\n  },\n  setsGrid: {\n    flexDirection: 'row',\n    flexWrap: 'wrap',\n    justifyContent: 'space-between',\n  },\n  setGridCard: {\n    width: (width - 60) / 2,\n    backgroundColor: '#FFFFFF',\n    borderRadius: 16,\n    padding: 16,\n    marginBottom: 16,\n    shadowColor: '#000',\n    shadowOffset: { width: 0, height: 2 },\n    shadowOpacity: 0.1,\n    shadowRadius: 4,\n    elevation: 3,\n  },\n  setImageContainer: {\n    position: 'relative',\n    marginBottom: 12,\n  },\n  setImagePlaceholder: {\n    width: '100%',\n    height: 80,\n    borderRadius: 12,\n    justifyContent: 'center',\n    alignItems: 'center',\n  },\n  setCode: {\n    fontSize: 16,\n    fontWeight: 'bold',\n    color: '#FFFFFF',\n  },\n  completionBadge: {\n    position: 'absolute',\n    top: 8,\n    right: 8,\n    backgroundColor: 'rgba(0, 0, 0, 0.7)',\n    paddingHorizontal: 8,\n    paddingVertical: 4,\n    borderRadius: 12,\n  },\n  completionBadgeText: {\n    fontSize: 10,\n    fontWeight: 'bold',\n    color: '#FFFFFF',\n  },\n  setGridInfo: {\n    alignItems: 'center',\n  },\n  setGridName: {\n    fontSize: 14,\n    fontWeight: '600',\n    color: '#111827',\n    textAlign: 'center',\n    marginBottom: 4,\n  },\n  setGridCards: {\n    fontSize: 12,\n    color: '#6B7280',\n    marginBottom: 4,\n  },\n  setGridValue: {\n    fontSize: 14,\n    fontWeight: 'bold',\n    color: '#10B981',\n  },\n  setsList: {\n    // List styles\n  },\n  setListCard: {\n    backgroundColor: '#FFFFFF',\n    borderRadius: 16,\n    padding: 16,\n    marginBottom: 12,\n    flexDirection: 'row',\n    alignItems: 'center',\n    shadowColor: '#000',\n    shadowOffset: { width: 0, height: 2 },\n    shadowOpacity: 0.1,\n    shadowRadius: 4,\n    elevation: 3,\n  },\n  setListLeft: {\n    flex: 1,\n    flexDirection: 'row',\n    alignItems: 'center',\n  },\n  setListImagePlaceholder: {\n    width: 60,\n    height: 40,\n    borderRadius: 8,\n    justifyContent: 'center',\n    alignItems: 'center',\n    marginRight: 12,\n  },\n  setListCode: {\n    fontSize: 12,\n    fontWeight: 'bold',\n    color: '#FFFFFF',\n  },\n  setListInfo: {\n    flex: 1,\n  },\n  setListName: {\n    fontSize: 16,\n    fontWeight: '600',\n    color: '#111827',\n    marginBottom: 4,\n  },\n  setListDetails: {\n    fontSize: 12,\n    color: '#6B7280',\n    marginBottom: 8,\n  },\n  setListProgressBar: {\n    flexDirection: 'row',\n    alignItems: 'center',\n  },\n  setListProgressBackground: {\n    flex: 1,\n    height: 4,\n    backgroundColor: '#E5E7EB',\n    borderRadius: 2,\n    marginRight: 8,\n    overflow: 'hidden',\n  },\n  setListProgressFill: {\n    height: '100%',\n    borderRadius: 2,\n  },\n  setListProgressText: {\n    fontSize: 10,\n    fontWeight: '500',\n    color: '#6B7280',\n    minWidth: 32,\n  },\n  setListRight: {\n    alignItems: 'flex-end',\n  },\n  setListValue: {\n    fontSize: 16,\n    fontWeight: 'bold',\n    color: '#111827',\n    marginBottom: 4,\n  },\n  setListTrend: {\n    flexDirection: 'row',\n    alignItems: 'center',\n  },\n  setListTrendText: {\n    fontSize: 12,\n    fontWeight: '500',\n    color: '#10B981',\n    marginLeft: 4,\n  },\n});"