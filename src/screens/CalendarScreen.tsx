import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { 
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Plus,
  Star,
  Camera,
  MapPin,
  Edit3,
  Eye,
  Filter,
  Heart,
  Clock,
  Tag
} from 'lucide-react-native';

const DailyMindCalendarDetailed = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 5)); // September 2025
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 8, 5));
  const [showMoodFilter, setShowMoodFilter] = useState(false);
  const [moodFilter, setMoodFilter] = useState('all');

  const moodEmojis = ['😭', '😢', '😔', '😕', '😐', '🙂', '😊', '😄', '😍', '🥰'];

  // 샘플 일기 데이터
  const diaryEntries = {
    '2025-09-01': {
      mood: 8,
      title: "부산 여행 첫째 날",
      content: "드디어 기다리던 부산 여행이 시작되었다! 해운대 바다를 보니 마음이 탁 트이는 느낌이다.",
      hasImages: true,
      imageCount: 12,
      location: "부산, 해운대",
      tags: ["#여행", "#부산", "#해운대"],
      time: "19:30",
      isFavorite: true
    },
    '2025-09-03': {
      mood: 9,
      title: "친구들과의 즐거운 저녁",
      content: "오랜만에 대학교 친구들과 만났다. 웃음이 끊이지 않는 시간이었다.",
      hasImages: true,
      imageCount: 7,
      location: "서울, 잠실",
      tags: ["#친구", "#만남", "#행복"],
      time: "23:45",
      isFavorite: true
    },
    '2025-09-05': {
      mood: 8,
      title: "새로운 프로젝트 시작",
      content: "오늘 새로운 프로젝트를 시작했다. 많이 기대되고 설렌다.",
      hasImages: true,
      imageCount: 3,
      location: "서울, 강남구",
      tags: ["#새시작", "#프로젝트"],
      time: "22:30",
      isFavorite: true
    }
  };

  const getDateString = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    for (let i = 0; i < 42; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const isSelected = (date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  const getEntryForDate = (date) => {
    const dateString = getDateString(date);
    return diaryEntries[dateString];
  };

  const getMoodColor = (mood) => {
    if (mood >= 8) return 'bg-green-100 border-green-300';
    if (mood >= 6) return 'bg-yellow-100 border-yellow-300';
    if (mood >= 4) return 'bg-orange-100 border-orange-300';
    return 'bg-red-100 border-red-300';
  };

  const days = getDaysInMonth(currentDate);
  const selectedEntry = getEntryForDate(selectedDate);

  return (
    <View className="flex-1 bg-gradient-to-br from-indigo-50 via-white to-violet-50">
      {/* Header */}
      <View className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-20">
        <View className="max-w-md mx-auto px-4 py-4">
          <View className="flex-row items-center justify-between mb-4">
            <TouchableOpacity className="p-2">
              <ArrowLeft size={20} color="#6b7280" />
            </TouchableOpacity>
            <View className="items-center">
              <Text className="text-lg font-bold text-gray-900">달력</Text>
              <Text className="text-sm text-gray-500">일기 작성 현황</Text>
            </View>
            <TouchableOpacity
              onPress={() => setShowMoodFilter(!showMoodFilter)}
              className="p-2"
            >
              <Filter size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>

          {/* Month Navigation */}
          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() => navigateMonth(-1)}
              className="p-2"
            >
              <ChevronLeft size={20} color="#6b7280" />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-gray-900">
              {currentDate.toLocaleDateString('ko-KR', { 
                year: 'numeric', 
                month: 'long' 
              })}
            </Text>
            <TouchableOpacity
              onPress={() => navigateMonth(1)}
              className="p-2"
            >
              <ChevronRight size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="max-w-md mx-auto px-4 py-6 space-y-6">
          {/* Month Statistics */}
          <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <Text className="text-lg font-semibold text-gray-900 mb-4">9월 통계</Text>
            <View className="flex-row flex-wrap justify-between">
              <View className="w-1/2 items-center mb-4">
                <Text className="text-2xl font-bold text-indigo-600">3</Text>
                <Text className="text-sm text-gray-600">작성된 일기</Text>
              </View>
              <View className="w-1/2 items-center mb-4">
                <Text className="text-2xl font-bold text-violet-600">8.3점</Text>
                <Text className="text-sm text-gray-600">평균 기분</Text>
              </View>
              <View className="w-1/2 items-center">
                <Text className="text-2xl font-bold text-cyan-600">22장</Text>
                <Text className="text-sm text-gray-600">첨부 사진</Text>
              </View>
              <View className="w-1/2 items-center">
                <Text className="text-2xl font-bold text-green-600">453</Text>
                <Text className="text-sm text-gray-600">총 단어수</Text>
              </View>
            </View>
          </View>

          {/* Calendar Grid */}
          <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            {/* Week Days Header */}
            <View className="flex-row justify-between mb-3">
              {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
                <View key={day} className="w-8 h-8 items-center justify-center">
                  <Text className={`text-sm font-medium ${
                    index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-gray-600'
                  }`}>
                    {day}
                  </Text>
                </View>
              ))}
            </View>

            {/* Calendar Days */}
            <View className="flex-row flex-wrap justify-between">
              {days.map((day, index) => {
                const entry = getEntryForDate(day);
                const hasEntry = entry;
                const isCurrentMonthDay = isCurrentMonth(day);
                const isTodayDay = isToday(day);
                const isSelectedDay = isSelected(day);

                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedDate(day)}
                    className={`w-12 h-14 rounded-lg items-center justify-center mb-1 ${
                      isSelectedDay
                        ? 'bg-indigo-500'
                        : isTodayDay
                        ? 'bg-indigo-100 border-2 border-indigo-300'
                        : hasEntry
                        ? getMoodColor(entry.mood) + ' border-2'
                        : isCurrentMonthDay
                        ? 'hover:bg-gray-100'
                        : 'opacity-50'
                    }`}
                  >
                    <Text className={`text-sm font-medium ${
                      isSelectedDay
                        ? 'text-white'
                        : isTodayDay
                        ? 'text-indigo-600'
                        : hasEntry
                        ? 'text-gray-700'
                        : isCurrentMonthDay
                        ? 'text-gray-700'
                        : 'text-gray-300'
                    }`}>
                      {day.getDate()}
                    </Text>
                    
                    {/* Entry Indicators */}
                    {hasEntry && !isSelectedDay && (
                      <View className="flex-row space-x-0.5 mt-1">
                        <View className="w-1 h-1 bg-current rounded-full opacity-70" />
                        {entry.hasImages && (
                          <View className="w-1 h-1 bg-current rounded-full opacity-70" />
                        )}
                        {entry.isFavorite && (
                          <View className="w-1 h-1 bg-yellow-500 rounded-full" />
                        )}
                      </View>
                    )}

                    {/* Mood Emoji */}
                    {hasEntry && isSelectedDay && (
                      <View className="absolute -top-1 -right-1">
                        <Text className="text-xs">{moodEmojis[entry.mood - 1]}</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Selected Date Details */}
          {selectedEntry ? (
            <View className="bg-white rounded-2xl shadow-sm border border-gray-100">
              {/* Header */}
              <View className="p-6 border-b border-gray-100">
                <View className="flex-row items-center justify-between mb-4">
                  <View className="flex-1">
                    <Text className="text-xl font-bold text-gray-900">
                      {selectedDate.toLocaleDateString('ko-KR', { 
                        month: 'long', 
                        day: 'numeric',
                        weekday: 'long'
                      })}
                    </Text>
                    <View className="flex-row items-center space-x-4 mt-2">
                      <View className="flex-row items-center space-x-1">
                        <Clock size={16} color="#6b7280" />
                        <Text className="text-sm text-gray-600">{selectedEntry.time}</Text>
                      </View>
                      <View className="flex-row items-center space-x-1">
                        <Text className="text-lg">{moodEmojis[selectedEntry.mood - 1]}</Text>
                        <Text className="text-sm text-gray-600">{selectedEntry.mood}/10</Text>
                      </View>
                      {selectedEntry.isFavorite && (
                        <Star size={16} color="#fbbf24" fill="#fbbf24" />
                      )}
                    </View>
                  </View>
                  <View className="flex-row space-x-2">
                    <TouchableOpacity className="p-2 bg-indigo-100 rounded-lg">
                      <Eye size={16} color="#6366f1" />
                    </TouchableOpacity>
                    <TouchableOpacity className="p-2 bg-gray-100 rounded-lg">
                      <Edit3 size={16} color="#6b7280" />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Title and Content */}
                <View className="space-y-3">
                  <Text className="text-lg font-semibold text-gray-900">{selectedEntry.title}</Text>
                  <Text className="text-gray-700 leading-relaxed">{selectedEntry.content}</Text>
                </View>
              </View>

              {/* Meta Information */}
              <View className="p-6 space-y-4">
                {/* Location */}
                {selectedEntry.location && (
                  <View className="flex-row items-center space-x-2">
                    <MapPin size={16} color="#6b7280" />
                    <Text className="text-sm text-gray-600">{selectedEntry.location}</Text>
                  </View>
                )}

                {/* Tags */}
                {selectedEntry.tags.length > 0 && (
                  <View>
                    <Text className="text-sm font-medium text-gray-900 mb-2">태그</Text>
                    <View className="flex-row flex-wrap gap-2">
                      {selectedEntry.tags.map((tag, index) => (
                        <View key={index} className="flex-row items-center px-3 py-1 bg-indigo-50 rounded-full">
                          <Tag size={12} color="#6366f1" />
                          <Text className="text-sm text-indigo-600 ml-1">{tag}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}

                {/* Photos */}
                {selectedEntry.hasImages && (
                  <View>
                    <Text className="text-sm font-medium text-gray-900 mb-3">
                      첨부된 사진 ({selectedEntry.imageCount}장)
                    </Text>
                    <View className="flex-row flex-wrap gap-2">
                      {Array.from({ length: Math.min(4, selectedEntry.imageCount) }, (_, i) => (
                        <View key={i} className="w-16 h-16 bg-gray-100 rounded-lg items-center justify-center">
                          <Camera size={24} color="#9ca3af" />
                        </View>
                      ))}
                      {selectedEntry.imageCount > 4 && (
                        <View className="w-16 h-16 bg-indigo-50 border-2 border-dashed border-indigo-200 rounded-lg items-center justify-center">
                          <Text className="text-sm text-indigo-600 font-medium">
                            +{selectedEntry.imageCount - 4}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                )}
              </View>
            </View>
          ) : selectedDate ? (
            <View className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 items-center">
              <View className="w-20 h-20 bg-gradient-to-r from-indigo-100 to-violet-100 rounded-full items-center justify-center mb-6">
                <Plus size={40} color="#6366f1" />
              </View>
              <Text className="text-xl font-bold text-gray-900 mb-2">
                {selectedDate.toLocaleDateString('ko-KR', { 
                  month: 'long', 
                  day: 'numeric',
                  weekday: 'long'
                })}
              </Text>
              <Text className="text-gray-600 mb-6 text-center">이 날에는 작성된 일기가 없습니다</Text>
              <TouchableOpacity className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-xl">
                <Text className="text-white font-medium">일기 작성하기</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {/* Quick Actions */}
          <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <Text className="font-semibold text-gray-900 mb-3">빠른 작업</Text>
            <View className="flex-row space-x-3">
              <TouchableOpacity className="flex-1 flex-row items-center justify-center space-x-2 py-3 px-4 bg-indigo-50 rounded-xl">
                <Plus size={16} color="#6366f1" />
                <Text className="text-sm font-medium text-indigo-600">오늘 일기 쓰기</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 flex-row items-center justify-center space-x-2 py-3 px-4 bg-gray-50 rounded-xl">
                <Calendar size={16} color="#6b7280" />
                <Text className="text-sm font-medium text-gray-600">월간 요약</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DailyMindCalendarDetailed;
