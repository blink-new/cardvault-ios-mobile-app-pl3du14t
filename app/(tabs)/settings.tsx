import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  User,
  Bell,
  Shield,
  Palette,
  HelpCircle,
  FileDown,
  FileUp,
  LogOut,
  ChevronRight,
  Moon,
  Globe,
  Camera,
  Vibrate,
  Mail,
  Star,
  Heart
} from 'lucide-react-native';

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [hapticFeedback, setHapticFeedback] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Sign Out", style: "destructive", onPress: () => {} }
      ]
    );
  };

  const handleExport = () => {
    Alert.alert(
      "Export Collection",
      "Export your collection data as CSV file?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Export", onPress: () => {} }
      ]
    );
  };

  const SettingsSection = ({ title, children }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>
        {children}
      </View>
    </View>
  );

  const SettingsItem = ({ icon: Icon, title, subtitle, onPress, rightElement, showChevron = true }) => (
    <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
      <View style={styles.settingsItemLeft}>
        <View style={styles.settingsIcon}>
          <Icon size={20} color="#6366F1" />
        </View>
        <View style={styles.settingsItemContent}>
          <Text style={styles.settingsItemTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingsItemSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <View style={styles.settingsItemRight}>
        {rightElement}
        {showChevron && !rightElement && (
          <ChevronRight size={20} color="#9CA3AF" />
        )}
      </View>
    </TouchableOpacity>
  );

  const ToggleItem = ({ icon: Icon, title, subtitle, value, onValueChange }) => (
    <SettingsItem
      icon={Icon}
      title={title}
      subtitle={subtitle}
      rightElement={
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: '#E5E7EB', true: '#6366F1' }}
          thumbColor={value ? '#FFFFFF' : '#FFFFFF'}
        />
      }
      showChevron={false}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileContainer}>
          <LinearGradient
            colors={['#6366F1', '#8B5CF6']}
            style={styles.profileCard}
          >
            <View style={styles.profileAvatar}>
              <Text style={styles.profileAvatarText}>👤</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Card Collector</Text>
              <Text style={styles.profileEmail}>collector@cardvault.com</Text>
              <View style={styles.profileStats}>
                <Text style={styles.profileStat}>2,463 Cards • $9,200 Value</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editProfileButton}>
              <Text style={styles.editProfileText}>Edit</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Account Settings */}
        <SettingsSection title="Account">
          <SettingsItem
            icon={User}
            title="Profile"
            subtitle="Manage your profile information"
            onPress={() => {}}
          />
          <SettingsItem
            icon={Shield}
            title="Privacy & Security"
            subtitle="Control your privacy settings"
            onPress={() => {}}
          />
          <SettingsItem
            icon={Bell}
            title="Notifications"
            subtitle="Customize your notification preferences"
            onPress={() => {}}
          />
        </SettingsSection>

        {/* App Preferences */}
        <SettingsSection title="Preferences">
          <ToggleItem
            icon={Bell}
            title="Push Notifications"
            subtitle="Receive notifications for important updates"
            value={notifications}
            onValueChange={setNotifications}
          />
          <ToggleItem
            icon={Star}
            title="Price Alerts"
            subtitle="Get notified when card prices change"
            value={priceAlerts}
            onValueChange={setPriceAlerts}
          />
          <ToggleItem
            icon={Moon}
            title="Dark Mode"
            subtitle="Use dark theme for better night viewing"
            value={darkMode}
            onValueChange={setDarkMode}
          />
          <ToggleItem
            icon={Vibrate}
            title="Haptic Feedback"
            subtitle="Feel vibrations when interacting with the app"
            value={hapticFeedback}
            onValueChange={setHapticFeedback}
          />
        </SettingsSection>

        {/* Collection Settings */}
        <SettingsSection title="Collection">
          <SettingsItem
            icon={Camera}
            title="Scan Settings"
            subtitle="Configure card scanning preferences"
            onPress={() => {}}
          />
          <SettingsItem
            icon={FileUp}
            title="Import Collection"
            subtitle="Import cards from CSV or other apps"
            onPress={() => {}}
          />
          <SettingsItem
            icon={FileDown}
            title="Export Collection"
            subtitle="Export your collection data"
            onPress={handleExport}
          />
        </SettingsSection>

        {/* General */}
        <SettingsSection title="General">
          <SettingsItem
            icon={Globe}
            title="Language"
            subtitle="English"
            onPress={() => {}}
          />
          <SettingsItem
            icon={Palette}
            title="Theme"
            subtitle="Customize app appearance"
            onPress={() => {}}
          />
          <SettingsItem
            icon={HelpCircle}
            title="Help & Support"
            subtitle="Get help and contact support"
            onPress={() => {}}
          />
        </SettingsSection>

        {/* About */}
        <SettingsSection title="About">
          <SettingsItem
            icon={Heart}
            title="Rate CardVault"
            subtitle="Help us improve by rating the app"
            onPress={() => {}}
          />
          <SettingsItem
            icon={Mail}
            title="Send Feedback"
            subtitle="Share your thoughts and suggestions"
            onPress={() => {}}
          />
          <SettingsItem
            icon={FileDown}
            title="Privacy Policy"
            subtitle="Read our privacy policy"
            onPress={() => {}}
          />
          <SettingsItem
            icon={Shield}
            title="Terms of Service"
            subtitle="View terms and conditions"
            onPress={() => {}}
          />
        </SettingsSection>

        {/* Sign Out */}
        <View style={styles.signOutSection}>
          <TouchableOpacity style={styles.signOutButton} onPress={handleLogout}>
            <LogOut size={20} color="#EF4444" />
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>CardVault v1.0.0</Text>
          <Text style={styles.versionSubtext}>Build 2024.1.1</Text>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  profileContainer: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 20,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileAvatarText: {
    fontSize: 24,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileEmail: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    marginTop: 2,
  },
  profileStats: {
    marginTop: 8,
  },
  profileStat: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  editProfileButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
  },
  editProfileText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 12,
    marginHorizontal: 20,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionContent: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingsIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingsItemContent: {
    flex: 1,
  },
  settingsItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  settingsItemSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  settingsItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signOutSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    gap: 8,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#EF4444',
  },
  versionContainer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  versionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  versionSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
});