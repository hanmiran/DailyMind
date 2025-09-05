import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { 
  ArrowLeft, 
  Save, 
  Camera, 
  Image, 
  Mic, 
  MapPin, 
  Tag, 
  Bold, 
  Italic, 
  Palette,
  Cloud,
  Sun,
  CloudRain,
  Snowflake,
  X,
  Plus
} from 'lucide-react-native';

const DailyMindWrite = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedMood, setSelectedMood] = useState(null);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [weather, setWeather] = useState('sunny');
  const [location, setLocation] = useState('서울, 대한민국');
  const [isFormatting, setIsFormatting] = useState(false);
  const contentRef = useRef(null);

  const moodEmojis = [
    { emoji: '😭', label: '매우 슬픔', value: 1 },
    { emoji: '😢', label: '슬픔', value: 2 },
    { emoji: '😔', label: '우울', value: 3 },
    { emoji: '😕', label: '약간 안좋음', value: 4 },
    { emoji: '😐', label: '보통', value: 5 },
    { emoji: '🙂', label: '괜찮음', value: 6 },
    { emoji: '😊', label: '좋음', value: 7 },
    { emoji: '😄', label: '매우 좋음', value: 8 },
    { emoji: '😍', label: '최고', value: 9 },
    { emoji: '🥰', label: '행복', value: 10 }
  ];

  const weatherIcons = {
    sunny: { icon: Sun, label: '맑음', color: 'text-yellow-500' },
    cloudy: { icon: Cloud, label: '흐림', color: 'text-gray-500' },
    rainy: { icon: CloudRain, label: '비', color: 'text-blue-500' },
    snowy: { icon: Snowflake, label: '눈', color: 'text-blue-300' }
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString('ko-KR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      weekday: 'long'
    });
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gradient-to-br from-indigo-50 via-white to-violet-50"
    >
      {/* Header */}
      <View className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-10">
        <View className="max-w-md mx-auto px-4 py-4">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity className="p-2">
              <ArrowLeft size={20} color="#6b7280" />
            </TouchableOpacity>
            <View className="items-center">
              <Text className="font-semibold text-gray-900">새 일기</Text>
              <Text className="text-xs text-gray-500">{getCurrentDate()}</Text>
            </View>
            <TouchableOpacity className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-lg">
              <View className="flex-row items-center">
                <Save size={16} color="white" />
                <Text className="text-white text-sm font-medium ml-1">저장</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="max-w-md mx-auto px-4 py-6 space-y-6">
          {/* Title Input */}
          <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <TextInput
              placeholder="제목을 입력하세요..."
              value={title}
              onChangeText={setTitle}
              className="w-full text-lg font-semibold text-gray-900"
              style={{ fontFamily: 'System' }}
            />
          </View>

          {/* Mood Selector */}
          <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <Text className="text-sm font-semibold text-gray-900 mb-4">오늘의 기분</Text>
            <View className="flex-row flex-wrap justify-between">
              {moodEmojis.map((mood) => (
                <TouchableOpacity
                  key={mood.value}
                  onPress={() => setSelectedMood(mood.value)}
                  className={`p-3 rounded-xl w-16 h-16 items-center justify-center ${
                    selectedMood === mood.value
                      ? 'bg-indigo-100 scale-110 shadow-md'
                      : 'bg-gray-50'
                  }`}
                >
                  <Text className="text-2xl">{mood.emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {selectedMood && (
              <View className="mt-4 items-center">
                <Text className="text-sm text-indigo-600 font-medium">
                  {moodEmojis.find(m => m.value === selectedMood)?.label} ({selectedMood}/10)
                </Text>
              </View>
            )}
          </View>

          {/* Context Info */}
          <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <View className="flex-row justify-between items-center">
              {/* Weather */}
              <View className="flex-row space-x-1">
                {Object.entries(weatherIcons).map(([key, { icon: Icon, color }]) => (
                  <TouchableOpacity
                    key={key}
                    onPress={() => setWeather(key)}
                    className={`p-2 rounded-lg ${
                      weather === key ? 'bg-indigo-100' : 'hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={16} color={weather === key ? '#6366f1' : '#6b7280'} />
                  </TouchableOpacity>
                ))}
              </View>
              
              {/* Location */}
              <View className="flex-row items-center space-x-2">
                <MapPin size={16} color="#9ca3af" />
                <Text className="text-sm text-gray-600" numberOfLines={1}>{location}</Text>
              </View>
            </View>
          </View>

          {/* Content Editor */}
          <View className="bg-white rounded-2xl shadow-sm border border-gray-100">
            {/* Formatting Toolbar */}
            <View className="p-4 border-b border-gray-100">
              <View className="flex-row items-center justify-between">
                <View className="flex-row space-x-2">
                  <TouchableOpacity className="p-2 rounded-lg">
                    <Bold size={16} color="#6b7280" />
                  </TouchableOpacity>
                  <TouchableOpacity className="p-2 rounded-lg">
                    <Italic size={16} color="#6b7280" />
                  </TouchableOpacity>
                  <TouchableOpacity className="p-2 rounded-lg">
                    <Palette size={16} color="#6b7280" />
                  </TouchableOpacity>
                </View>
                
                <View className="flex-row space-x-2">
                  <TouchableOpacity className="p-2 rounded-lg">
                    <Camera size={16} color="#6b7280" />
                  </TouchableOpacity>
                  <TouchableOpacity className="p-2 rounded-lg">
                    <Image size={16} color="#6b7280" />
                  </TouchableOpacity>
                  <TouchableOpacity className="p-2 rounded-lg">
                    <Mic size={16} color="#6b7280" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Content Area */}
            <View className="p-4">
              <TextInput
                ref={contentRef}
                placeholder="오늘 하루는 어땠나요? 자유롭게 적어보세요..."
                value={content}
                onChangeText={setContent}
                multiline
                textAlignVertical="top"
                className="w-full h-64 text-gray-900"
                style={{ fontFamily: 'System', lineHeight: 24 }}
              />
            </View>
          </View>

          {/* Tags */}
          <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <Text className="text-sm font-semibold text-gray-900 mb-3">태그</Text>
            
            {/* Existing Tags */}
            {tags.length > 0 && (
              <View className="flex-row flex-wrap gap-2 mb-3">
                {tags.map((tag, index) => (
                  <View key={index} className="flex-row items-center px-3 py-1 bg-indigo-100 rounded-full">
                    <Tag size={12} color="#6366f1" />
                    <Text className="text-sm text-indigo-600 ml-1">#{tag}</Text>
                    <TouchableOpacity onPress={() => removeTag(tag)} className="ml-2">
                      <X size={12} color="#6366f1" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
            
            {/* Add New Tag */}
            <View className="flex-row space-x-2">
              <TextInput
                placeholder="태그 추가..."
                value={newTag}
                onChangeText={setNewTag}
                onSubmitEditing={addTag}
                className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
              />
              <TouchableOpacity
                onPress={addTag}
                className="px-4 py-2 bg-indigo-500 rounded-lg"
              >
                <Plus size={16} color="white" />
              </TouchableOpacity>
            </View>
            
            {/* Suggested Tags */}
            <View className="mt-3">
              <Text className="text-xs text-gray-500 mb-2">추천 태그</Text>
              <View className="flex-row flex-wrap gap-2">
                {['일상', '감정', '성찰', '여행', '음식', '친구'].map((suggestion) => (
                  <TouchableOpacity
                    key={suggestion}
                    onPress={() => {
                      if (!tags.includes(suggestion)) {
                        setTags([...tags, suggestion]);
                      }
                    }}
                    className="px-2 py-1 bg-gray-100 rounded-md"
                  >
                    <Text className="text-xs text-gray-600">#{suggestion}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Auto-save Status */}
          <View className="items-center">
            <View className="flex-row items-center space-x-1">
              <View className="w-2 h-2 bg-green-500 rounded-full" />
              <Text className="text-xs text-gray-500">자동 저장됨</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default DailyMindWrite;
