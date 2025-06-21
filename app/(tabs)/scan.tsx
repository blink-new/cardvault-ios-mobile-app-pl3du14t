import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
  Animated,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import {
  Camera,
  FlashOn,
  FlashOff,
  Image as ImageIcon,
  X,
  Check,
  RotateCcw,
  Zap
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');
const scanAreaSize = width * 0.75;

export default function Scan() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [flash, setFlash] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(false);
  const [scannedCard, setScannedCard] = useState(null);
  const scanAnimation = useRef(new Animated.Value(0)).current;

  if (Platform.OS === 'web') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.webPlaceholderContainer}>
          <Camera size={48} color="#6366F1" />
          <Text style={styles.webPlaceholderTitle}>Camera Not Available</Text>
          <Text style={styles.webPlaceholderText}>
            The camera functionality for scanning cards is only available on a mobile device. Please use the Expo Go app to test this feature.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <View style={styles.permissionIcon}>
            <Camera size={48} color="#6366F1" />
          </View>
          <Text style={styles.permissionTitle}>Camera Access Required</Text>
          <Text style={styles.permissionText}>
            CardVault needs camera access to scan your trading cards and add them to your collection.
          </Text>
          <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Enable Camera</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const toggleFlash = () => {
    setFlash(!flash);
  };

  const startScanAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scanAnimation, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const handleScan = () => {
    if (isScanning) return;
    
    setIsScanning(true);
    startScanAnimation();
    
    // Simulate card detection
    setTimeout(() => {
      setIsScanning(false);
      setScannedCard({
        name: "Charizard",
        set: "Base Set",
        number: "4/102",
        rarity: "Holo Rare",
        estimatedPrice: "$350.00",
        condition: "Near Mint"
      });
    }, 3000);
  };

  const confirmScan = () => {
    Alert.alert("Card Added!", "Charizard has been added to your collection.", [
      { text: "OK", onPress: () => setScannedCard(null) }
    ]);
  };

  const rescan = () => {
    setScannedCard(null);
  };

  const scanLineTranslate = scanAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-scanAreaSize / 2, scanAreaSize / 2],
  });

  if (scannedCard) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.confirmationContainer}>
          <View style={styles.confirmationHeader}>
            <Text style={styles.confirmationTitle}>Card Detected!</Text>
            <TouchableOpacity onPress={rescan} style={styles.closeButton}>
              <X size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.cardPreview}>
            <LinearGradient
              colors={['#FFD700', '#FFA500']}
              style={styles.cardImage}
            >
              <Text style={styles.cardImagePlaceholder}>🐉</Text>
            </LinearGradient>
          </View>

          <View style={styles.cardInfo}>
            <Text style={styles.cardName}>{scannedCard.name}</Text>
            <Text style={styles.cardSet}>{scannedCard.set} • {scannedCard.number}</Text>
            <View style={styles.cardDetails}>
              <View style={styles.cardDetail}>
                <Text style={styles.cardDetailLabel}>Rarity</Text>
                <Text style={styles.cardDetailValue}>{scannedCard.rarity}</Text>
              </View>
              <View style={styles.cardDetail}>
                <Text style={styles.cardDetailLabel}>Est. Price</Text>
                <Text style={styles.cardDetailValue}>{scannedCard.estimatedPrice}</Text>
              </View>
              <View style={styles.cardDetail}>
                <Text style={styles.cardDetailLabel}>Condition</Text>
                <Text style={styles.cardDetailValue}>{scannedCard.condition}</Text>
              </View>
            </View>
          </View>

          <View style={styles.confirmationActions}>
            <TouchableOpacity style={styles.rescanButton} onPress={rescan}>
              <RotateCcw size={20} color="#6366F1" />
              <Text style={styles.rescanButtonText}>Rescan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={confirmScan}>
              <Check size={20} color="#FFFFFF" />
              <Text style={styles.confirmButtonText}>Add to Collection</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CameraView 
        style={styles.camera} 
        facing={facing}
        flash={flash ? 'on' : 'off'}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton} onPress={toggleFlash}>
            {flash ? (
              <FlashOn size={24} color="#FFFFFF" />
            ) : (
              <FlashOff size={24} color="#FFFFFF" />
            )}
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Scan Card</Text>
          <TouchableOpacity style={styles.headerButton} onPress={toggleCameraFacing}>
            <RotateCcw size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Scan Area Overlay */}
        <View style={styles.overlay}>
          <View style={styles.scanArea}>
            <View style={styles.scanFrame}>
              {/* Corner brackets */}
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
              
              {/* Scanning line animation */}
              {isScanning && (
                <Animated.View
                  style={[
                    styles.scanLine,
                    {
                      transform: [{ translateY: scanLineTranslate }],
                    },
                  ]}
                />
              )}
            </View>
          </View>
          
          <Text style={styles.instructionText}>
            {isScanning ? 'Scanning card...' : 'Position card within the frame'}
          </Text>
        </View>

        {/* Bottom Controls */}
        <View style={styles.controls}>
          <TouchableOpacity style={styles.galleryButton}>
            <ImageIcon size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.scanButton, isScanning && styles.scanButtonActive]} 
            onPress={handleScan}
            disabled={isScanning}
          >
            {isScanning ? (
              <Zap size={32} color="#FFFFFF" />
            ) : (
              <Camera size={32} color="#FFFFFF" />
            )}
          </TouchableOpacity>
          
          <View style={styles.placeholder} />
        </View>

        {/* Tips */}
        <View style={styles.tips}>
          <Text style={styles.tipsText}>
            💡 Tip: Ensure good lighting and hold camera steady for best results
          </Text>
        </View>
      </CameraView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  camera: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    backgroundColor: '#F9FAFB',
  },
  permissionIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 12,
  },
  permissionText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  permissionButton: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  permissionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: scanAreaSize,
    height: scanAreaSize * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: '#6366F1',
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#6366F1',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  instructionText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 40,
    paddingHorizontal: 40,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 40,
  },
  galleryButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  scanButtonActive: {
    backgroundColor: '#8B5CF6',
  },
  placeholder: {
    width: 56,
    height: 56,
  },
  tips: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  tipsText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
  confirmationContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 20,
  },
  confirmationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
  },
  confirmationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardPreview: {
    alignItems: 'center',
    marginBottom: 32,
  },
  cardImage: {
    width: width * 0.6,
    height: width * 0.6 * 1.4,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
  cardImagePlaceholder: {
    fontSize: 60,
  },
  cardInfo: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  cardSet: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 20,
  },
  cardDetails: {
    gap: 16,
  },
  cardDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardDetailLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  cardDetailValue: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '600',
  },
  confirmationActions: {
    flexDirection: 'row',
    gap: 12,
  },
  rescanButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  rescanButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6366F1',
  },
  confirmButton: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#6366F1',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  webPlaceholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    backgroundColor: '#F9FAFB',
  },
  webPlaceholderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 12,
  },
  webPlaceholderText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});