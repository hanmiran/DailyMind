import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { 
  House, 
  Plus, 
  Calendar, 
  Heart, 
  User,
  Settings,
  Lock
} from 'lucide-react-native';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import WriteScreen from '../screens/WriteScreen';
import CalendarScreen from '../screens/CalendarScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LockScreen from '../screens/LockScreen';

const AppNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [isLocked, setIsLocked] = useState(false);

  const screens = {
    home: HomeScreen,
    write: WriteScreen,
    calendar: CalendarScreen,
    settings: SettingsScreen,
    lock: LockScreen,
  };

  const CurrentScreen = screens[currentScreen];

  const tabs = [
    {
      id: 'home',
      label: '홈',
      icon: House,
    },
    {
      id: 'write',
      label: '작성',
      icon: Plus,
      isSpecial: true,
    },
    {
      id: 'calendar',
      label: '달력',
      icon: Calendar,
    },
    {
      id: 'settings',
      label: '설정',
      icon: Settings,
    },
  ];

  const handleTabPress = (tabId) => {
    if (tabId === 'write') {
      setCurrentScreen('write');
    } else if (tabId === 'home') {
      setCurrentScreen('home');
    } else if (tabId === 'calendar') {
      setCurrentScreen('calendar');
    } else if (tabId === 'settings') {
      setCurrentScreen('settings');
    }
  };

  const handleBackPress = () => {
    setCurrentScreen('home');
  };

  const handleLockPress = () => {
    setIsLocked(true);
    setCurrentScreen('lock');
  };

  const handleUnlock = () => {
    setIsLocked(false);
    setCurrentScreen('home');
  };

  // Show lock screen if locked
  if (isLocked) {
    return <LockScreen onUnlock={handleUnlock} />;
  }

  return (
    <View className="flex-1">
      {/* Main Content */}
      <View className="flex-1">
        <CurrentScreen 
          onBack={handleBackPress}
          onLock={handleLockPress}
        />
      </View>

      {/* Bottom Navigation */}
      {currentScreen !== 'lock' && (
        <View className="px-4 py-2 border-t border-gray-200 bg-white">
          <View className="flex-row items-center justify-around">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentScreen === tab.id;
              const isSpecial = tab.isSpecial;

              return (
                <TouchableOpacity
                  key={tab.id}
                  onPress={() => handleTabPress(tab.id)}
                  className={`items-center justify-center ${
                    isSpecial 
                      ? 'bg-indigo-500 rounded-full p-3 -mt-2 shadow-lg' 
                      : 'p-2'
                  }`}
                >
                  <Icon
                    size={isSpecial ? 24 : 20}
                    color={
                      isSpecial 
                        ? '#ffffff'
                        : isActive
                        ? '#6366f1'
                        : '#9ca3af'
                    }
                    weight={isActive ? 'fill' : 'regular'}
                  />
                  
                  {!isSpecial && (
                    <Text
                      className={`text-xs mt-1 ${
                        isActive
                          ? 'text-indigo-600'
                          : 'text-gray-400'
                      }`}
                    >
                      {tab.label}
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
};

export default AppNavigator;
