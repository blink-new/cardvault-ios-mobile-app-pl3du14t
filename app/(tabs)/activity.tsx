import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Bell,
  TrendingUp,
  TrendingDown,
  Plus,
  Award,
  Users,
  Star,
  Target,
  Filter,
  Settings
} from 'lucide-react-native';

const activities = [
  {
    id: '1',
    type: 'price_increase',
    title: 'Price Alert',
    description: 'Charizard Base Set increased by 15%',
    value: '+$52.50',
    time: '2 hours ago',
    icon: TrendingUp,
    iconColor: '#10B981',
    backgroundColor: '#DCFCE7',
  },
  {
    id: '2',
    type: 'card_added',
    title: 'Card Added',
    description: 'Added Blastoise to your collection',
    value: '+$180.00',
    time: '4 hours ago',
    icon: Plus,
    iconColor: '#6366F1',
    backgroundColor: '#EEF2FF',
  },
  {
    id: '3',
    type: 'milestone',
    title: 'Milestone Achieved',
    description: 'Completed Base Set collection!',
    value: '🎉',
    time: '1 day ago',
    icon: Award,
    iconColor: '#F59E0B',
    backgroundColor: '#FEF3C7',
  },
  {
    id: '4',
    type: 'trade_proposal',
    title: 'Trade Proposal',
    description: 'Alex Chen wants to trade cards',
    value: '',
    time: '1 day ago',
    icon: Users,
    iconColor: '#8B5CF6',
    backgroundColor: '#F3E8FF',
  },
  {
    id: '5',
    type: 'price_decrease',
    title: 'Price Alert',
    description: 'Venusaur decreased by 8%',
    value: '-$24.00',
    time: '2 days ago',
    icon: TrendingDown,
    iconColor: '#EF4444',
    backgroundColor: '#FEE2E2',
  },
  {
    id: '6',
    type: 'achievement',
    title: 'Achievement Unlocked',
    description: 'Rare Card Hunter - Found 50 rare cards',
    value: '🏆',
    time: '3 days ago',
    icon: Star,
    iconColor: '#F59E0B',
    backgroundColor: '#FEF3C7',
  },
  {
    id: '7',
    type: 'goal_progress',
    title: 'Goal Progress',
    description: 'Collection goal: 80% complete',
    value: '80%',
    time: '1 week ago',
    icon: Target,
    iconColor: '#6366F1',
    backgroundColor: '#EEF2FF',
  },
];

const stats = [
  {
    label: 'This Week',
    value: '+$425',
    change: '+12.5%',
    trend: 'up',
  },
  {
    label: 'New Cards',
    value: '18',
    change: '+6 this week',
    trend: 'up',
  },
  {
    label: 'Trades',
    value: '3',
    change: '2 pending',
    trend: 'neutral',
  },
];

export default function Activity() {
  const [filter, setFilter] = useState('all');

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(activity => activity.type === filter);

  const renderActivity = ({ item }) => {
    const IconComponent = item.icon;
    
    return (
      <TouchableOpacity style={styles.activityItem}>
        <View style={[styles.activityIcon, { backgroundColor: item.backgroundColor }]}>
          <IconComponent size={20} color={item.iconColor} />
        </View>
        
        <View style={styles.activityContent}>
          <Text style={styles.activityTitle}>{item.title}</Text>
          <Text style={styles.activityDescription}>{item.description}</Text>
          <Text style={styles.activityTime}>{item.time}</Text>
        </View>
        
        {item.value && (
          <View style={styles.activityValue}>
            <Text style={[
              styles.activityValueText,
              item.value.startsWith('+') && styles.positiveValue,
              item.value.startsWith('-') && styles.negativeValue,
            ]}>
              {item.value}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Activity</Text>
          <Text style={styles.headerSubtitle}>Stay updated with your collection</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Filter size={20} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Settings size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Weekly Stats */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>This Week's Summary</Text>
          <LinearGradient
            colors={['#6366F1', '#8B5CF6']}
            style={styles.statsCard}
          >
            <View style={styles.statsGrid}>
              {stats.map((stat, index) => (
                <View key={index} style={styles.statItem}>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                  <Text style={styles.statChange}>{stat.change}</Text>
                </View>
              ))}
            </View>
          </LinearGradient>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#EEF2FF' }]}>
                <Bell size={24} color="#6366F1" />
              </View>
              <Text style={styles.quickActionText}>Notifications</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickAction}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#DCFCE7' }]}>
                <TrendingUp size={24} color="#10B981" />
              </View>
              <Text style={styles.quickActionText}>Price Alerts</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickAction}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#FEF3C7' }]}>
                <Award size={24} color="#F59E0B" />
              </View>
              <Text style={styles.quickActionText}>Achievements</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickAction}>
              <View style={[styles.quickActionIcon, { backgroundColor: '#F3E8FF' }]}>
                <Target size={24} color="#8B5CF6" />
              </View>
              <Text style={styles.quickActionText}>Goals</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filterTabs}>
              {[
                { key: 'all', label: 'All' },
                { key: 'price_increase', label: 'Price Alerts' },
                { key: 'card_added', label: 'New Cards' },
                { key: 'milestone', label: 'Milestones' },
                { key: 'trade_proposal', label: 'Trades' },
              ].map((tab) => (
                <TouchableOpacity
                  key={tab.key}
                  style={[
                    styles.filterTab,
                    filter === tab.key && styles.activeFilterTab
                  ]}
                  onPress={() => setFilter(tab.key)}
                >
                  <Text style={[
                    styles.filterTabText,
                    filter === tab.key && styles.activeFilterTabText
                  ]}>
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Activity Feed */}
        <View style={styles.activityContainer}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityFeed}>
            <FlatList
              data={filteredActivities}
              renderItem={renderActivity}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>

        {/* Achievements Section */}
        <View style={styles.achievementsContainer}>
          <Text style={styles.sectionTitle}>Recent Achievements</Text>
          <View style={styles.achievementsList}>
            <View style={styles.achievementItem}>
              <View style={styles.achievementIcon}>
                <Text style={styles.achievementEmoji}>🎯</Text>
              </View>
              <View style={styles.achievementContent}>
                <Text style={styles.achievementTitle}>Set Completion Master</Text>
                <Text style={styles.achievementDescription}>Completed 5 different sets</Text>
                <View style={styles.achievementProgress}>
                  <View style={styles.achievementProgressBar}>
                    <View style={[styles.achievementProgressFill, { width: '100%' }]} />
                  </View>
                  <Text style={styles.achievementProgressText}>5/5</Text>
                </View>
              </View>
            </View>

            <View style={styles.achievementItem}>
              <View style={styles.achievementIcon}>
                <Text style={styles.achievementEmoji}>💎</Text>
              </View>
              <View style={styles.achievementContent}>
                <Text style={styles.achievementTitle}>Rare Card Hunter</Text>
                <Text style={styles.achievementDescription}>Collect 100 rare cards</Text>
                <View style={styles.achievementProgress}>
                  <View style={styles.achievementProgressBar}>
                    <View style={[styles.achievementProgressFill, { width: '75%' }]} />
                  </View>
                  <Text style={styles.achievementProgressText}>75/100</Text>
                </View>
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
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
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
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  statsCard: {
    borderRadius: 16,
    padding: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
    marginTop: 4,
  },
  statChange: {
    fontSize: 10,
    color: '#FFFFFF',
    opacity: 0.7,
    marginTop: 2,
  },
  quickActionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAction: {
    alignItems: 'center',
    flex: 1,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    textAlign: 'center',
  },
  filterContainer: {
    marginBottom: 20,
  },
  filterTabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activeFilterTab: {
    backgroundColor: '#6366F1',
    borderColor: '#6366F1',
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeFilterTabText: {
    color: '#FFFFFF',
  },
  activityContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  activityFeed: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  activityDescription: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
  activityValue: {
    alignItems: 'flex-end',
  },
  activityValueText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  positiveValue: {
    color: '#10B981',
  },
  negativeValue: {
    color: '#EF4444',
  },
  achievementsContainer: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  achievementsList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementEmoji: {
    fontSize: 20,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  achievementProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  achievementProgressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#F3F4F6',
    borderRadius: 2,
    marginRight: 12,
  },
  achievementProgressFill: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 2,
  },
  achievementProgressText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    minWidth: 40,
    textAlign: 'right',
  },
});