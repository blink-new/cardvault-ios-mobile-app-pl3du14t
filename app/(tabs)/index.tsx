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
import { router } from 'expo-router';
import { 
  TrendingUp, 
  Star, 
  Filter, 
  BarChart3,
  Plus,
  Search,
  ChevronRight
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const gameData = [
  {
    id: 'pokemon',
    name: 'Pokémon',
    color: '#FFD700',
    gradient: ['#FFD700', '#FFA500'],
    totalCards: 1247,
    totalValue: 4850,
    completedSets: 12,
    totalSets: 18,
    recentCards: 5,
  },
  {
    id: 'magic',
    name: 'Magic: The Gathering',
    color: '#8B4513',
    gradient: ['#CD853F', '#8B4513'],
    totalCards: 892,
    totalValue: 3200,
    completedSets: 8,
    totalSets: 25,
    recentCards: 3,
  },
  {
    id: 'onepiece',
    name: 'One Piece',
    color: '#FF6B35',
    gradient: ['#FF8C69', '#FF6B35'],
    totalCards: 324,
    totalValue: 1150,
    completedSets: 3,
    totalSets: 7,
    recentCards: 12,
  },
];

export default function Home() {
  const [selectedGame, setSelectedGame] = useState('pokemon');
  
  const currentGame = gameData.find(game => game.id === selectedGame) || gameData[0];
  const totalValue = gameData.reduce((sum, game) => sum + game.totalValue, 0);
  const totalCards = gameData.reduce((sum, game) => sum + game.totalCards, 0);

  const handleGamePress = (gameId: string) => {
    router.push(`/game-sets?gameId=${gameId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back!</Text>
            <Text style={styles.username}>Card Collector</Text>
          </View>
          <TouchableOpacity style={styles.searchButton}>
            <Search size={24} color="#6366F1" />
          </TouchableOpacity>
        </View>

        {/* Portfolio Overview */}
        <LinearGradient
          colors={['#6366F1', '#8B5CF6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.portfolioCard}
        >
          <Text style={styles.portfolioTitle}>Total Collection Value</Text>
          <Text style={styles.portfolioValue}>${totalValue.toLocaleString()}</Text>
          <View style={styles.portfolioStats}>
            <View style={styles.portfolioStat}>
              <Text style={styles.portfolioStatValue}>{totalCards}</Text>
              <Text style={styles.portfolioStatLabel}>Total Cards</Text>
            </View>
            <View style={styles.portfolioStat}>
              <TrendingUp size={20} color="#FFFFFF" />
              <Text style={styles.portfolioStatLabel}>+12.5% this month</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickAction}>
            <View style={[styles.quickActionIcon, { backgroundColor: '#F3F4F6' }]}>
              <Plus size={24} color="#6366F1" />
            </View>
            <Text style={styles.quickActionText}>Add Cards</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <View style={[styles.quickActionIcon, { backgroundColor: '#F3F4F6' }]}>
              <BarChart3 size={24} color="#6366F1" />
            </View>
            <Text style={styles.quickActionText}>Analytics</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <View style={[styles.quickActionIcon, { backgroundColor: '#F3F4F6' }]}>
              <Filter size={24} color="#6366F1" />
            </View>
            <Text style={styles.quickActionText}>Filter</Text>
          </TouchableOpacity>
        </View>

        {/* Game Tabs */}
        <View style={styles.gameTabsContainer}>
          <Text style={styles.sectionTitle}>Your Collections</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.gameTabs}
          >
            {gameData.map((game) => (
              <TouchableOpacity
                key={game.id}
                style={[
                  styles.gameTab,
                  selectedGame === game.id && styles.gameTabActive
                ]}
                onPress={() => setSelectedGame(game.id)}
              >
                <Text style={[
                  styles.gameTabText,
                  selectedGame === game.id && styles.gameTabTextActive
                ]}>
                  {game.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Selected Game Overview */}
        <TouchableOpacity onPress={() => handleGamePress(currentGame.id)}>
          <LinearGradient
            colors={currentGame.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gameOverviewCard}
          >
            <View style={styles.gameOverviewHeader}>
              <Text style={styles.gameOverviewTitle}>{currentGame.name}</Text>
              <View style={styles.gameOverviewActions}>
                <TouchableOpacity style={styles.starButton}>
                  <Star size={20} color="#FFFFFF" fill="#FFFFFF" />
                </TouchableOpacity>
                <View style={styles.chevronButton}>
                  <ChevronRight size={20} color="#FFFFFF" />
                </View>
              </View>
            </View>
            
            <View style={styles.gameStats}>
              <View style={styles.gameStat}>
                <Text style={styles.gameStatValue}>{currentGame.totalCards}</Text>
                <Text style={styles.gameStatLabel}>Cards</Text>
              </View>
              <View style={styles.gameStat}>
                <Text style={styles.gameStatValue}>${currentGame.totalValue.toLocaleString()}</Text>
                <Text style={styles.gameStatLabel}>Value</Text>
              </View>
              <View style={styles.gameStat}>
                <Text style={styles.gameStatValue}>{currentGame.completedSets}/{currentGame.totalSets}</Text>
                <Text style={styles.gameStatLabel}>Sets</Text>
              </View>
            </View>

            <View style={styles.completionBar}>
              <View style={styles.completionBarBackground}>
                <View 
                  style={[
                    styles.completionBarFill,
                    { width: `${(currentGame.completedSets / currentGame.totalSets) * 100}%` }
                  ]}
                />
              </View>
              <Text style={styles.completionText}>
                {Math.round((currentGame.completedSets / currentGame.totalSets) * 100)}% Complete
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* All Games Quick Access */}
        <View style={styles.allGamesSection}>
          <Text style={styles.sectionTitle}>Browse All Collections</Text>
          {gameData.map((game) => (
            <TouchableOpacity 
              key={game.id}
              style={styles.gameQuickCard}
              onPress={() => handleGamePress(game.id)}
            >
              <View style={styles.gameQuickLeft}>
                <LinearGradient
                  colors={game.gradient}
                  style={styles.gameQuickIcon}
                >
                  <Text style={styles.gameQuickIconText}>{game.name.charAt(0)}</Text>
                </LinearGradient>
                <View style={styles.gameQuickInfo}>
                  <Text style={styles.gameQuickName}>{game.name}</Text>
                  <Text style={styles.gameQuickStats}>
                    {game.totalCards} cards • ${game.totalValue.toLocaleString()} value
                  </Text>
                </View>
              </View>
              <View style={styles.gameQuickRight}>
                <Text style={styles.gameQuickCompletion}>
                  {Math.round((game.completedSets / game.totalSets) * 100)}%
                </Text>
                <ChevronRight size={20} color="#6B7280" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Activity */}
        <View style={styles.recentActivity}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Plus size={16} color="#10B981" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Added {currentGame.recentCards} new cards</Text>
                <Text style={styles.activityTime}>2 hours ago</Text>
              </View>
              <View style={styles.activityValue}>
                <Text style={styles.activityValueText}>+$125</Text>
              </View>
            </View>
            
            <View style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: '#FEF3C7' }]}>
                <TrendingUp size={16} color="#F59E0B" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Price increase detected</Text>
                <Text style={styles.activityTime}>1 day ago</Text>
              </View>
              <View style={styles.activityValue}>
                <Text style={styles.activityValueText}>+$45</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 2,
  },
  searchButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  portfolioCard: {
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
  },
  portfolioTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    fontWeight: '500',
  },
  portfolioValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 8,
  },
  portfolioStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  portfolioStat: {
    alignItems: 'center',
  },
  portfolioStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  portfolioStatLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
    marginTop: 2,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginBottom: 32,
  },
  quickAction: {
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
  gameTabsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  gameTabs: {
    paddingHorizontal: 16,
  },
  gameTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 4,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  gameTabActive: {
    backgroundColor: '#6366F1',
    borderColor: '#6366F1',
  },
  gameTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  gameTabTextActive: {
    color: '#FFFFFF',
  },
  gameOverviewCard: {
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
  },
  gameOverviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gameOverviewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  gameOverviewActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chevronButton: {
    marginLeft: 8,
  },
  gameStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 20,
  },
  gameStat: {
    alignItems: 'center',
  },
  gameStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  gameStatLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
    marginTop: 2,
  },
  completionBar: {
    marginTop: 12,
  },
  completionBarBackground: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  completionBarFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
  },
  completionText: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
    marginTop: 8,
    textAlign: 'center',
  },
  allGamesSection: {
    marginHorizontal: 20,
    marginBottom: 32,
  },
  gameQuickCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gameQuickLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  gameQuickIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  gameQuickIconText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  gameQuickInfo: {
    flex: 1,
  },
  gameQuickName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  gameQuickStats: {
    fontSize: 12,
    color: '#6B7280',
  },
  gameQuickRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gameQuickCompletion: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366F1',
    marginRight: 8,
  },
  recentActivity: {
    marginHorizontal: 20,
    marginBottom: 40,
  },
  activityList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  activityTime: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  activityValue: {
    alignItems: 'flex-end',
  },
  activityValueText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#10B981',
  },
});