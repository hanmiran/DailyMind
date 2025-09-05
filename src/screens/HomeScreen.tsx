import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { Calendar, Plus, Search, Settings, Heart, Star, Tag, Camera, Lock } from 'lucide-react-native';

const DailyMindHome = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMood, setCurrentMood] = useState(7);
  const [refreshing, setRefreshing] = useState(false);

  const moodEmojis = ['😭', '😢', '😔', '😕', '😐', '🙂', '😊', '😄', '😍', '🥰'];
  
  const recentEntries = [
    {
      id: 1,
      title: "설레는 새로운 시작",
      date: "2025-09-05",
      mood: 8,
      preview: "오늘 새로운 프로젝트를 시작했다. 많이 기대되고...",
      tags: ["#새시작", "#프로젝트"],
      hasImages: true,
      isFavorite: true
    },
    {
      id: 2,
      title: "평온한 일상",
      date: "2025-09-04",
      mood: 6,
      preview: "오늘은 특별한 일은 없었지만 평안한 하루였다...",
      tags: ["#일상", "#평온"],
      hasImages: false,
      isFavorite: false
    },
    {
      id: 3,
      title: "카페에서의 여유",
      date: "2025-09-03",
      mood: 7,
      preview: "좋아하는 카페에서 책을 읽으며 보낸 시간...",
      tags: ["#카페", "#독서"],
      hasImages: true,
      isFavorite: false
    }
  ];

  const formatDate = (date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) return "오늘";
    if (date.toDateString() === yesterday.toDateString()) return "어제";
    return date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <View className="flex-1 bg-gradient-to-br from-indigo-50 via-white to-violet-50">
      {/* Header */}
      <View className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-10">
        <View className="max-w-md mx-auto px-4 py-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center space-x-3">
              <View className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-lg items-center justify-center">
                <Heart size={20} color="white" />
              </View>
              <View>
                <Text className="text-lg font-bold text-gray-900">DailyMind</Text>
                <Text className="text-sm text-gray-500">나의 소중한 기록</Text>
              </View>
            </View>
            <View className="flex-row items-center space-x-2">
              <TouchableOpacity className="p-2 hover:bg-gray-100 rounded-lg">
                <Search size={20} color="#6b7280" />
              </TouchableOpacity>
              <TouchableOpacity className="p-2 hover:bg-gray-100 rounded-lg">
                <Settings size={20} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <ScrollView 
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <View className="max-w-md mx-auto px-4 py-6 space-y-6">
          {/* Today's Mood */}
          <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <Text className="text-lg font-semibold text-gray-900 mb-4">오늘의 기분</Text>
            <View className="flex-row items-center justify-between">
              <View className="flex-row space-x-2">
                {moodEmojis.map((emoji, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setCurrentMood(index + 1)}
                    className={`text-2xl p-2 rounded-lg ${
                      currentMood === index + 1 
                        ? 'bg-indigo-100 scale-110' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <Text className="text-2xl">{emoji}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View className="mt-4 items-center">
              <Text className="text-sm text-gray-600">
                현재 기분: <Text className="font-medium text-indigo-600">{currentMood}/10</Text>
              </Text>
            </View>
          </View>

          {/* Quick Stats */}
          <View className="flex-row space-x-4">
            <View className="flex-1 bg-white rounded-xl p-4 items-center shadow-sm border border-gray-100">
              <Text className="text-2xl font-bold text-indigo-600">7</Text>
              <Text className="text-sm text-gray-600">연속 작성일</Text>
            </View>
            <View className="flex-1 bg-white rounded-xl p-4 items-center shadow-sm border border-gray-100">
              <Text className="text-2xl font-bold text-violet-600">23</Text>
              <Text className="text-sm text-gray-600">이번 달</Text>
            </View>
            <View className="flex-1 bg-white rounded-xl p-4 items-center shadow-sm border border-gray-100">
              <Text className="text-2xl font-bold text-cyan-600">156</Text>
              <Text className="text-sm text-gray-600">전체 일기</Text>
            </View>
          </View>

          {/* Recent Entries */}
          <View className="space-y-4">
            <View className="flex-row items-center justify-between">
              <Text className="text-lg font-semibold text-gray-900">최근 일기</Text>
              <TouchableOpacity>
                <Text className="text-indigo-600 text-sm font-medium">더보기</Text>
              </TouchableOpacity>
            </View>

            {recentEntries.map((entry) => (
              <View key={entry.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-1">
                    <View className="flex-row items-center space-x-2 mb-1">
                      <Text className="font-semibold text-gray-900">{entry.title}</Text>
                      {entry.isFavorite && (
                        <Star size={16} color="#fbbf24" fill="#fbbf24" />
                      )}
                    </View>
                    <Text className="text-sm text-gray-500">{entry.date}</Text>
                  </View>
                  <View className="flex-row items-center space-x-2">
                    <Text className="text-xl">{moodEmojis[entry.mood - 1]}</Text>
                    {entry.hasImages && (
                      <Camera size={16} color="#9ca3af" />
                    )}
                  </View>
                </View>
                
                <Text className="text-gray-700 text-sm mb-3" numberOfLines={2}>
                  {entry.preview}
                </Text>
                
                <View className="flex-row flex-wrap gap-2">
                  {entry.tags.map((tag, index) => (
                    <View key={index} className="px-2 py-1 bg-indigo-50 rounded-full">
                      <Text className="text-xs text-indigo-600">#{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>

          {/* Calendar Preview */}
          <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-semibold text-gray-900">9월 작성 현황</Text>
              <Calendar size={20} color="#6b7280" />
            </View>
            
            <View className="flex-row flex-wrap justify-between">
              {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                <View key={day} className="w-8 h-8 items-center justify-center">
                  <Text className="text-xs font-medium text-gray-500">{day}</Text>
                </View>
              ))}
              
              {Array.from({ length: 30 }, (_, i) => {
                const day = i + 1;
                const hasEntry = [1, 3, 4, 5, 8, 12, 15, 18, 22, 25, 28].includes(day);
                const isToday = day === 5;
                
                return (
                  <TouchableOpacity
                    key={day}
                    className={`w-8 h-8 rounded-lg items-center justify-center ${
                      isToday
                        ? 'bg-indigo-600'
                        : hasEntry
                        ? 'bg-indigo-100'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <Text className={`text-sm ${
                      isToday ? 'text-white' : hasEntry ? 'text-indigo-600' : 'text-gray-400'
                    }`}>
                      {day}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity className="absolute bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full shadow-lg items-center justify-center">
        <Plus size={24} color="white" />
      </TouchableOpacity>

      {/* Security Indicator */}
      <View className="absolute top-4 right-4 bg-green-100 px-2 py-1 rounded-full flex-row items-center space-x-1">
        <Lock size={12} color="#059669" />
        <Text className="text-xs text-green-600">보안</Text>
      </View>
    </View>
  );
};

export default DailyMindHome;
