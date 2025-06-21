import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Users, 
  UserPlus, 
  Trophy, 
  ArrowUpRight,
  MessageCircle,
  Star,
  TrendingUp,
  Crown,
  Medal,
  Search
} from 'lucide-react-native';

const friends = [
  {
    id: '1',
    name: 'Alex Chen',
    username: '@alexc',
    avatar: '👤',
    collectionValue: 8750,
    totalCards: 1547,
    recentActivity: 'Added 12 new cards',
    isOnline: true,
    badges: ['🏆', '⭐'],
  },
  {
    id: '2',
    name: 'Sarah Kim',
    username: '@sarahk',
    avatar: '👤',
    collectionValue: 6200,
    totalCards: 923,
    recentActivity: 'Completed Base Set',
    isOnline: false,
    badges: ['🔥'],
  },
  {
    id: '3',
    name: 'Mike Torres',
    username: '@miket',
    avatar: '👤',
    collectionValue: 12400,
    totalCards: 2104,
    recentActivity: 'New rare find!',
    isOnline: true,
    badges: ['👑', '💎', '🏆'],
  },
];

const leaderboard = [
  { id: '1', name: 'CardMaster99', value: 45000, cards: 5600, position: 1 },
  { id: '2', name: 'PokeFan2024', value: 38500, cards: 4200, position: 2 },
  { id: '3', name: 'MagicCollector', value: 32100, cards: 3800, position: 3 },
  { id: '4', name: 'You', value: 9200, cards: 2463, position: 4 },
  { id: '5', name: 'TradeWizard', value: 8900, cards: 2341, position: 5 },
];

const trades = [
  {
    id: '1',
    from: 'Alex Chen',
    offering: ['Charizard Base Set', 'Blastoise'],
    requesting: ['Venusaur', 'Alakazam'],
    status: 'pending',
    timeAgo: '2 hours ago',
  },
  {
    id: '2',
    from: 'Sarah Kim',
    offering: ['Black Lotus'],
    requesting: ['Mox Ruby', 'Mox Sapphire'],
    status: 'accepted',
    timeAgo: '1 day ago',
  },
];

export default function Social() {
  const [activeTab, setActiveTab] = useState('friends');

  const renderFriend = ({ item }) => (
    <View style={styles.friendCard}>
      <View style={styles.friendHeader}>
        <View style={styles.friendAvatar}>
          <Text style={styles.friendAvatarText}>{item.avatar}</Text>
          {item.isOnline && <View style={styles.onlineIndicator} />}
        </View>
        <View style={styles.friendInfo}>
          <Text style={styles.friendName}>{item.name}</Text>
          <Text style={styles.friendUsername}>{item.username}</Text>
          <View style={styles.friendBadges}>
            {item.badges.map((badge, index) => (
              <Text key={index} style={styles.badge}>{badge}</Text>
            ))}
          </View>
        </View>
        <TouchableOpacity style={styles.messageButton}>
          <MessageCircle size={20} color="#6366F1" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.friendStats}>
        <View style={styles.friendStat}>
          <Text style={styles.friendStatValue}>${item.collectionValue.toLocaleString()}</Text>
          <Text style={styles.friendStatLabel}>Collection Value</Text>
        </View>
        <View style={styles.friendStat}>
          <Text style={styles.friendStatValue}>{item.totalCards.toLocaleString()}</Text>
          <Text style={styles.friendStatLabel}>Total Cards</Text>
        </View>
      </View>
      
      <View style={styles.friendActivity}>
        <Text style={styles.friendActivityText}>{item.recentActivity}</Text>
        <TouchableOpacity>
          <ArrowUpRight size={16} color="#6366F1" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderLeaderboardItem = ({ item }) => {
    const isCurrentUser = item.name === 'You';
    
    return (
      <View style={[styles.leaderboardItem, isCurrentUser && styles.currentUserItem]}>
        <View style={styles.leaderboardRank}>
          {item.position === 1 ? (
            <Crown size={24} color="#FFD700" />
          ) : item.position === 2 ? (
            <Medal size={24} color="#C0C0C0" />
          ) : item.position === 3 ? (
            <Medal size={24} color="#CD7F32" />
          ) : (
            <Text style={[styles.rankText, isCurrentUser && styles.currentUserRank]}>
              #{item.position}
            </Text>
          )}
        </View>
        
        <View style={styles.leaderboardInfo}>
          <Text style={[styles.leaderboardName, isCurrentUser && styles.currentUserName]}>
            {item.name}
          </Text>
          <Text style={styles.leaderboardCards}>{item.cards.toLocaleString()} cards</Text>
        </View>
        
        <View style={styles.leaderboardValue}>
          <Text style={[styles.leaderboardValueText, isCurrentUser && styles.currentUserValue]}>
            ${item.value.toLocaleString()}
          </Text>
          <TrendingUp size={16} color="#10B981" />
        </View>
      </View>
    );
  };

  const renderTrade = ({ item }) => (
    <View style={styles.tradeCard}>
      <View style={styles.tradeHeader}>
        <Text style={styles.tradeFrom}>From {item.from}</Text>
        <View style={[
          styles.tradeStatus,
          item.status === 'pending' ? styles.tradePending : styles.tradeAccepted
        ]}>
          <Text style={[
            styles.tradeStatusText,
            item.status === 'pending' ? styles.tradePendingText : styles.tradeAcceptedText
          ]}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>
      
      <View style={styles.tradeContent}>
        <View style={styles.tradeSection}>
          <Text style={styles.tradeSectionTitle}>Offering:</Text>
          {item.offering.map((card, index) => (
            <Text key={index} style={styles.tradeCard}>{card}</Text>
          ))}
        </View>
        
        <View style={styles.tradeArrow}>
          <ArrowUpRight size={20} color="#6B7280" />
        </View>
        
        <View style={styles.tradeSection}>
          <Text style={styles.tradeSectionTitle}>Requesting:</Text>
          {item.requesting.map((card, index) => (
            <Text key={index} style={styles.tradeCard}>{card}</Text>
          ))}
        </View>
      </View>
      
      <Text style={styles.tradeTime}>{item.timeAgo}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Social</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Search size={24} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <UserPlus size={24} color="#6366F1" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'friends' && styles.activeTab]}
          onPress={() => setActiveTab('friends')}
        >
          <Users size={20} color={activeTab === 'friends' ? '#6366F1' : '#6B7280'} />
          <Text style={[styles.tabText, activeTab === 'friends' && styles.activeTabText]}>
            Friends
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'leaderboard' && styles.activeTab]}
          onPress={() => setActiveTab('leaderboard')}
        >
          <Trophy size={20} color={activeTab === 'leaderboard' ? '#6366F1' : '#6B7280'} />
          <Text style={[styles.tabText, activeTab === 'leaderboard' && styles.activeTabText]}>
            Leaderboard
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'trades' && styles.activeTab]}
          onPress={() => setActiveTab('trades')}
        >
          <Star size={20} color={activeTab === 'trades' ? '#6366F1' : '#6B7280'} />
          <Text style={[styles.tabText, activeTab === 'trades' && styles.activeTabText]}>
            Trades
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'friends' && (
          <View style={styles.friendsContainer}>
            <LinearGradient
              colors={['#6366F1', '#8B5CF6']}
              style={styles.statsCard}
            >
              <Text style={styles.statsTitle}>Your Network</Text>
              <View style={styles.statsContent}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{friends.length}</Text>
                  <Text style={styles.statLabel}>Friends</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>12</Text>
                  <Text style={styles.statLabel}>Shared Collections</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>3</Text>
                  <Text style={styles.statLabel}>Active Trades</Text>
                </View>
              </View>
            </LinearGradient>

            <FlatList
              data={friends}
              renderItem={renderFriend}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.friendsList}
            />
          </View>
        )}

        {activeTab === 'leaderboard' && (
          <View style={styles.leaderboardContainer}>
            <Text style={styles.sectionTitle}>Global Rankings</Text>
            <FlatList
              data={leaderboard}
              renderItem={renderLeaderboardItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.leaderboardList}
            />
          </View>
        )}

        {activeTab === 'trades' && (
          <View style={styles.tradesContainer}>
            <Text style={styles.sectionTitle}>Trade Proposals</Text>
            <FlatList
              data={trades}
              renderItem={renderTrade}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.tradesList}
            />
          </View>
        )}
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
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#6366F1',
  },
  content: {
    flex: 1,
  },
  friendsContainer: {
    paddingHorizontal: 20,
  },
  statsCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  statsContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
    marginTop: 4,
  },
  friendsList: {
    gap: 16,
  },
  friendCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  friendHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  friendAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    position: 'relative',
  },
  friendAvatarText: {
    fontSize: 20,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  friendUsername: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  friendBadges: {
    flexDirection: 'row',
    marginTop: 4,
    gap: 4,
  },
  badge: {
    fontSize: 12,
  },
  messageButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  friendStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  friendStat: {
    alignItems: 'center',
  },
  friendStatValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  friendStatLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  friendActivity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  friendActivityText: {
    fontSize: 14,
    color: '#6B7280',
  },
  leaderboardContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  leaderboardList: {
    gap: 12,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  currentUserItem: {
    backgroundColor: '#EEF2FF',
    borderWidth: 2,
    borderColor: '#6366F1',
  },
  leaderboardRank: {
    width: 40,
    alignItems: 'center',
    marginRight: 16,
  },
  rankText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  currentUserRank: {
    color: '#6366F1',
  },
  leaderboardInfo: {
    flex: 1,
  },
  leaderboardName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  currentUserName: {
    color: '#6366F1',
  },
  leaderboardCards: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  leaderboardValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  leaderboardValueText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  currentUserValue: {
    color: '#6366F1',
  },
  tradesContainer: {
    paddingHorizontal: 20,
  },
  tradesList: {
    gap: 16,
  },
  tradeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  tradeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  tradeFrom: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  tradeStatus: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tradePending: {
    backgroundColor: '#FEF3C7',
  },
  tradeAccepted: {
    backgroundColor: '#DCFCE7',
  },
  tradeStatusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  tradePendingText: {
    color: '#F59E0B',
  },
  tradeAcceptedText: {
    color: '#10B981',
  },
  tradeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tradeSection: {
    flex: 1,
  },
  tradeSectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 8,
  },
  tradeCard: {
    fontSize: 14,
    color: '#111827',
    marginBottom: 4,
  },
  tradeArrow: {
    marginHorizontal: 16,
  },
  tradeTime: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'right',
  },
});