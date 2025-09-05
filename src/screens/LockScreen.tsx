import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Animated, Vibration } from 'react-native';
import { 
  Heart, 
  Fingerprint, 
  Eye, 
  EyeOff, 
  Delete, 
  Shield,
  Smartphone,
  Lock
} from 'lucide-react-native';

const DailyMindLock = () => {
  const [pin, setPin] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [authMode, setAuthMode] = useState('pin'); // 'pin', 'password', 'biometric'
  const [isShaking, setIsShaking] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [shakeAnimation] = useState(new Animated.Value(0));

  const correctPin = '1234';
  const correctPassword = 'dailymind123';

  const handlePinInput = (digit) => {
    if (pin.length < 6) {
      setPin(pin + digit);
    }
  };

  const handlePinDelete = () => {
    setPin(pin.slice(0, -1));
  };

  const handlePinClear = () => {
    setPin('');
  };

  const validateAuth = () => {
    let isValid = false;
    
    if (authMode === 'pin' && pin === correctPin) {
      isValid = true;
    } else if (authMode === 'password' && password === correctPassword) {
      isValid = true;
    }

    if (isValid) {
      // 성공 - 메인 화면으로 이동
      console.log('인증 성공!');
      setPin('');
      setPassword('');
      setAttempts(0);
    } else {
      // 실패 - 흔들기 애니메이션
      setIsShaking(true);
      setAttempts(prev => prev + 1);
      
      // 흔들기 애니메이션
      Animated.sequence([
        Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
      
      setTimeout(() => setIsShaking(false), 500);
      
      if (authMode === 'pin') {
        setPin('');
      } else {
        setPassword('');
      }

      // 5회 실패시 잠금
      if (attempts >= 4) {
        setIsLocked(true);
        setTimeout(() => {
          setIsLocked(false);
          setAttempts(0);
        }, 30000); // 30초 잠금
      }
    }
  };

  useEffect(() => {
    if (pin.length === 4 || pin.length === 6) {
      setTimeout(validateAuth, 100);
    }
  }, [pin]);

  const handleBiometric = () => {
    // 생체인증 시뮬레이션
    setTimeout(() => {
      console.log('생체인증 성공!');
    }, 1000);
  };

  if (isLocked) {
    return (
      <View className="flex-1 bg-gradient-to-br from-red-50 via-white to-red-50 items-center justify-center">
        <View className="max-w-md mx-auto px-4 items-center">
          <View className="bg-white rounded-3xl p-8 shadow-xl border border-red-100">
            <View className="w-16 h-16 bg-red-100 rounded-full items-center justify-center mx-auto mb-6">
              <Shield size={32} color="#ef4444" />
            </View>
            <Text className="text-xl font-bold text-gray-900 mb-4 text-center">앱이 잠겼습니다</Text>
            <Text className="text-gray-600 mb-6 text-center">
              보안을 위해 앱이 일시적으로 잠겼습니다.{'\n'}
              잠시 후 다시 시도해주세요.
            </Text>
            <Text className="text-red-500 font-mono text-lg text-center">00:29</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gradient-to-br from-indigo-50 via-white to-violet-50 items-center justify-center">
      <View className="max-w-md mx-auto px-4 w-full">
        {/* Logo and Title */}
        <View className="items-center mb-12">
          <View className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-3xl items-center justify-center mx-auto mb-6 shadow-lg">
            <Heart size={40} color="white" />
          </View>
          <Text className="text-3xl font-bold text-gray-900 mb-2">DailyMind</Text>
          <Text className="text-gray-600">나의 소중한 기록을 보호합니다</Text>
        </View>

        {/* Auth Mode Selector */}
        <View className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
          <View className="flex-row space-x-2 mb-6">
            <TouchableOpacity
              onPress={() => setAuthMode('pin')}
              className={`flex-1 py-3 px-4 rounded-xl ${
                authMode === 'pin'
                  ? 'bg-indigo-100'
                  : 'bg-transparent'
              }`}
            >
              <Text className={`text-sm font-medium text-center ${
                authMode === 'pin' ? 'text-indigo-600' : 'text-gray-600'
              }`}>
                PIN
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setAuthMode('password')}
              className={`flex-1 py-3 px-4 rounded-xl ${
                authMode === 'password'
                  ? 'bg-indigo-100'
                  : 'bg-transparent'
              }`}
            >
              <Text className={`text-sm font-medium text-center ${
                authMode === 'password' ? 'text-indigo-600' : 'text-gray-600'
              }`}>
                비밀번호
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setAuthMode('biometric')}
              className={`flex-1 py-3 px-4 rounded-xl ${
                authMode === 'biometric'
                  ? 'bg-indigo-100'
                  : 'bg-transparent'
              }`}
            >
              <Text className={`text-sm font-medium text-center ${
                authMode === 'biometric' ? 'text-indigo-600' : 'text-gray-600'
              }`}>
                생체인증
              </Text>
            </TouchableOpacity>
          </View>

          {/* PIN Mode */}
          {authMode === 'pin' && (
            <Animated.View style={{ transform: [{ translateX: shakeAnimation }] }}>
              <View className="space-y-6">
                <View className="items-center">
                  <Text className="text-lg font-semibold text-gray-900 mb-2">PIN 입력</Text>
                  <Text className="text-sm text-gray-600">4자리 또는 6자리 PIN을 입력하세요</Text>
                </View>

                {/* PIN Display */}
                <View className="flex-row justify-center space-x-3">
                  {Array.from({ length: 6 }, (_, index) => (
                    <View
                      key={index}
                      className={`w-4 h-4 rounded-full border-2 ${
                        index < pin.length
                          ? 'bg-indigo-500 border-indigo-500'
                          : 'border-gray-300'
                      }`}
                    />
                  ))}
                </View>

                {/* Keypad */}
                <View className="flex-row flex-wrap justify-center max-w-xs mx-auto">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
                    <TouchableOpacity
                      key={digit}
                      onPress={() => handlePinInput(digit.toString())}
                      className="w-16 h-16 bg-gray-100 rounded-2xl items-center justify-center mx-1 mb-2"
                    >
                      <Text className="font-semibold text-lg text-gray-800">{digit}</Text>
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity
                    onPress={handlePinClear}
                    className="w-16 h-16 bg-gray-100 rounded-2xl items-center justify-center mx-1 mb-2"
                  >
                    <Text className="text-sm text-gray-600">지움</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handlePinInput('0')}
                    className="w-16 h-16 bg-gray-100 rounded-2xl items-center justify-center mx-1 mb-2"
                  >
                    <Text className="font-semibold text-lg text-gray-800">0</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handlePinDelete}
                    className="w-16 h-16 bg-gray-100 rounded-2xl items-center justify-center mx-1 mb-2"
                  >
                    <Delete size={20} color="#6b7280" />
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
          )}

          {/* Password Mode */}
          {authMode === 'password' && (
            <Animated.View style={{ transform: [{ translateX: shakeAnimation }] }}>
              <View className="space-y-6">
                <View className="items-center">
                  <Text className="text-lg font-semibold text-gray-900 mb-2">비밀번호 입력</Text>
                  <Text className="text-sm text-gray-600">앱 비밀번호를 입력하세요</Text>
                </View>

                <View className="relative">
                  <TextInput
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="비밀번호를 입력하세요"
                    className={`w-full px-4 py-4 bg-gray-50 border-2 rounded-xl ${
                      isShaking 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-200'
                    }`}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff size={20} color="#9ca3af" /> : <Eye size={20} color="#9ca3af" />}
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={validateAuth}
                  className="w-full py-4 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-xl"
                >
                  <Text className="text-white font-medium text-center">확인</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          )}

          {/* Biometric Mode */}
          {authMode === 'biometric' && (
            <View className="space-y-6 items-center">
              <View className="items-center">
                <Text className="text-lg font-semibold text-gray-900 mb-2">생체인증</Text>
                <Text className="text-sm text-gray-600">지문 또는 얼굴 인식을 사용하세요</Text>
              </View>

              <TouchableOpacity
                onPress={handleBiometric}
                className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full items-center justify-center"
              >
                <Fingerprint size={48} color="white" />
              </TouchableOpacity>

              <View className="space-y-2 items-center">
                <View className="flex-row items-center space-x-2">
                  <Smartphone size={16} color="#9ca3af" />
                  <Text className="text-sm text-gray-600">지문을 센서에 올려주세요</Text>
                </View>
                <Text className="text-xs text-gray-500">또는 카메라를 바라보세요</Text>
              </View>
            </View>
          )}

          {/* Attempts Warning */}
          {attempts > 0 && (
            <View className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl">
              <Text className="text-sm text-red-600 text-center">
                인증 실패 {attempts}/5회
                {attempts >= 3 && ' (2회 더 실패시 30초간 잠김)'}
              </Text>
            </View>
          )}
        </View>

        {/* Footer */}
        <View className="items-center space-y-4">
          <TouchableOpacity>
            <Text className="text-indigo-600 text-sm font-medium">비밀번호를 잊으셨나요?</Text>
          </TouchableOpacity>
          
          <View className="flex-row items-center space-x-2">
            <Lock size={16} color="#9ca3af" />
            <Text className="text-xs text-gray-500">AES-256 암호화로 보호됨</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DailyMindLock;
