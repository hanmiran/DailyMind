import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, Alert } from 'react-native';
import { 
  ArrowLeft,
  Shield,
  Palette,
  Cloud,
  Bell,
  Download,
  Upload,
  Trash2,
  Info,
  ChevronRight,
  Moon,
  Sun,
  Smartphone,
  Lock,
  Fingerprint,
  Key,
  Globe,
  Type,
  Eye,
  Volume2,
  MapPin,
  RotateCcw,
  Star,
  Heart,
  HelpCircle,
  Mail,
  MessageSquare,
  AlertTriangle
} from 'lucide-react-native';

const DailyMindSettings = () => {
  const [settings, setSettings] = useState({
    autoLock: true,
    autoLockTime: 5,
    biometricEnabled: true,
    theme: 'auto',
    fontSize: 'medium',
    eyeProtection: false,
    cloudBackup: true,
    autoBackup: true,
    reminderEnabled: true,
    reminderTime: '21:00',
    locationEnabled: false,
    soundEnabled: true,
    hapticEnabled: true
  });

  const [showConfirmDialog, setShowConfirmDialog] = useState(null);

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const ToggleSwitch = ({ enabled, onChange }) => (
    <TouchableOpacity
      onPress={onChange}
      className={`w-12 h-6 rounded-full ${
        enabled ? 'bg-indigo-500' : 'bg-gray-300'
      }`}
    >
      <View className={`absolute w-5 h-5 bg-white rounded-full top-0.5 ${
        enabled ? 'right-0.5' : 'left-0.5'
      }`} />
    </TouchableOpacity>
  );

  const SettingItem = ({ 
    icon: Icon, 
    title, 
    description, 
    children, 
    danger = false,
    onPress,
    showArrow = false 
  }) => (
    <TouchableOpacity 
      className={`flex-row items-center justify-between py-4 px-4 ${
        onPress ? 'active:bg-gray-50' : ''
      }`}
      onPress={onPress}
    >
      <View className="flex-row items-center space-x-3 flex-1">
        <View className={`w-8 h-8 rounded-lg items-center justify-center ${
          danger ? 'bg-red-100' : 'bg-gray-100'
        }`}>
          <Icon size={20} color={danger ? '#dc2626' : '#6b7280'} />
        </View>
        <View className="flex-1">
          <Text className={`font-medium ${danger ? 'text-red-600' : 'text-gray-900'}`}>
            {title}
          </Text>
          {description && (
            <Text className="text-sm text-gray-500">{description}</Text>
          )}
        </View>
      </View>
      <View className="flex-row items-center space-x-2">
        {children}
        {showArrow && (
          <ChevronRight size={20} color="#9ca3af" />
        )}
      </View>
    </TouchableOpacity>
  );

  const ConfirmDialog = ({ title, message, onConfirm, onCancel, danger = false }) => (
    <Modal
      visible={showConfirmDialog !== null}
      transparent
      animationType="fade"
    >
      <View className="flex-1 bg-black/50 items-center justify-center p-4">
        <View className="bg-white rounded-2xl p-6 max-w-sm w-full">
          <View className={`w-12 h-12 rounded-full items-center justify-center mx-auto mb-4 ${
            danger ? 'bg-red-100' : 'bg-indigo-100'
          }`}>
            {danger ? (
              <AlertTriangle size={24} color="#dc2626" />
            ) : (
              <Info size={24} color="#6366f1" />
            )}
          </View>
          <Text className="text-lg font-semibold text-gray-900 text-center mb-2">
            {title}
          </Text>
          <Text className="text-gray-600 text-center mb-6">
            {message}
          </Text>
          <View className="flex-row space-x-3">
            <TouchableOpacity
              onPress={onCancel}
              className="flex-1 py-3 px-4 bg-gray-100 rounded-xl"
            >
              <Text className="text-gray-700 font-medium text-center">취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onConfirm}
              className={`flex-1 py-3 px-4 rounded-xl ${
                danger 
                  ? 'bg-red-500' 
                  : 'bg-indigo-500'
              }`}
            >
              <Text className="text-white font-medium text-center">확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View className="flex-1 bg-gradient-to-br from-indigo-50 via-white to-violet-50">
      {/* Header */}
      <View className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-10">
        <View className="max-w-md mx-auto px-4 py-4">
          <View className="flex-row items-center space-x-4">
            <TouchableOpacity className="p-2">
              <ArrowLeft size={20} color="#6b7280" />
            </TouchableOpacity>
            <View>
              <Text className="text-lg font-bold text-gray-900">설정</Text>
              <Text className="text-sm text-gray-500">앱 환경을 설정하세요</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="max-w-md mx-auto px-4 py-6 space-y-6">
          {/* 보안 설정 */}
          <View className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <View className="px-4 py-3 border-b border-gray-100">
              <View className="flex-row items-center space-x-2">
                <Shield size={20} color="#6366f1" />
                <Text className="font-semibold text-gray-900">보안 및 개인정보</Text>
              </View>
            </View>
            
            <SettingItem
              icon={Lock}
              title="자동 잠금"
              description={`${settings.autoLock ? settings.autoLockTime + '분 후' : '비활성화'}`}
            >
              <ToggleSwitch 
                enabled={settings.autoLock} 
                onChange={() => toggleSetting('autoLock')} 
              />
            </SettingItem>

            <SettingItem
              icon={Fingerprint}
              title="생체인증"
              description="지문 또는 얼굴 인식 사용"
            >
              <ToggleSwitch 
                enabled={settings.biometricEnabled} 
                onChange={() => toggleSetting('biometricEnabled')} 
              />
            </SettingItem>

            <SettingItem
              icon={Key}
              title="PIN 변경"
              description="현재 4자리 PIN"
              showArrow
              onPress={() => console.log('PIN 변경')}
            />

            <SettingItem
              icon={MapPin}
              title="위치 정보"
              description="일기에 위치 정보 포함"
            >
              <ToggleSwitch 
                enabled={settings.locationEnabled} 
                onChange={() => toggleSetting('locationEnabled')} 
              />
            </SettingItem>
          </View>

          {/* 테마 및 표시 */}
          <View className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <View className="px-4 py-3 border-b border-gray-100">
              <View className="flex-row items-center space-x-2">
                <Palette size={20} color="#6366f1" />
                <Text className="font-semibold text-gray-900">테마 및 표시</Text>
              </View>
            </View>

            <SettingItem
              icon={settings.theme === 'dark' ? Moon : Sun}
              title="테마"
              description={settings.theme === 'light' ? '라이트 모드' : settings.theme === 'dark' ? '다크 모드' : '시스템 설정 따름'}
              showArrow
              onPress={() => console.log('테마 설정')}
            />

            <SettingItem
              icon={Type}
              title="글꼴 크기"
              description={settings.fontSize === 'small' ? '작게' : settings.fontSize === 'large' ? '크게' : '보통'}
              showArrow
              onPress={() => console.log('글꼴 설정')}
            />

            <SettingItem
              icon={Eye}
              title="눈 보호 모드"
              description="블루라이트 필터 적용"
            >
              <ToggleSwitch 
                enabled={settings.eyeProtection} 
                onChange={() => toggleSetting('eyeProtection')} 
              />
            </SettingItem>
          </View>

          {/* 백업 및 동기화 */}
          <View className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <View className="px-4 py-3 border-b border-gray-100">
              <View className="flex-row items-center space-x-2">
                <Cloud size={20} color="#6366f1" />
                <Text className="font-semibold text-gray-900">백업 및 동기화</Text>
              </View>
            </View>

            <SettingItem
              icon={Cloud}
              title="클라우드 백업"
              description="Google 드라이브 사용 중"
            >
              <ToggleSwitch 
                enabled={settings.cloudBackup} 
                onChange={() => toggleSetting('cloudBackup')} 
              />
            </SettingItem>

            <SettingItem
              icon={RotateCcw}
              title="자동 백업"
              description="매일 자동으로 백업"
            >
              <ToggleSwitch 
                enabled={settings.autoBackup} 
                onChange={() => toggleSetting('autoBackup')} 
              />
            </SettingItem>

            <SettingItem
              icon={Upload}
              title="지금 백업"
              description="수동으로 백업 실행"
              showArrow
              onPress={() => setShowConfirmDialog('backup')}
            />

            <SettingItem
              icon={Download}
              title="데이터 내보내기"
              description="PDF, TXT, DOCX 형식으로 내보내기"
              showArrow
              onPress={() => console.log('데이터 내보내기')}
            />
          </View>

          {/* 알림 설정 */}
          <View className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <View className="px-4 py-3 border-b border-gray-100">
              <View className="flex-row items-center space-x-2">
                <Bell size={20} color="#6366f1" />
                <Text className="font-semibold text-gray-900">알림</Text>
              </View>
            </View>

            <SettingItem
              icon={Bell}
              title="일기 작성 알림"
              description={`매일 ${settings.reminderTime}`}
            >
              <ToggleSwitch 
                enabled={settings.reminderEnabled} 
                onChange={() => toggleSetting('reminderEnabled')} 
              />
            </SettingItem>

            <SettingItem
              icon={Star}
              title="주간 리포트"
              description="매주 일기 작성 현황 알림"
            >
              <ToggleSwitch 
                enabled={true} 
                onChange={() => console.log('주간 리포트')} 
              />
            </SettingItem>

            <SettingItem
              icon={Heart}
              title="동기부여 메시지"
              description="격려 메시지 받기"
            >
              <ToggleSwitch 
                enabled={true} 
                onChange={() => console.log('동기부여')} 
              />
            </SettingItem>
          </View>

          {/* 기타 설정 */}
          <View className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <View className="px-4 py-3 border-b border-gray-100">
              <View className="flex-row items-center space-x-2">
                <Smartphone size={20} color="#6366f1" />
                <Text className="font-semibold text-gray-900">기타</Text>
              </View>
            </View>

            <SettingItem
              icon={Volume2}
              title="사운드"
              description="버튼 터치음 및 알림음"
            >
              <ToggleSwitch 
                enabled={settings.soundEnabled} 
                onChange={() => toggleSetting('soundEnabled')} 
              />
            </SettingItem>

            <SettingItem
              icon={Smartphone}
              title="햅틱 피드백"
              description="진동 피드백 사용"
            >
              <ToggleSwitch 
                enabled={settings.hapticEnabled} 
                onChange={() => toggleSetting('hapticEnabled')} 
              />
            </SettingItem>

            <SettingItem
              icon={Globe}
              title="언어"
              description="한국어"
              showArrow
              onPress={() => console.log('언어 설정')}
            />
          </View>

          {/* 지원 및 정보 */}
          <View className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <View className="px-4 py-3 border-b border-gray-100">
              <View className="flex-row items-center space-x-2">
                <HelpCircle size={20} color="#6366f1" />
                <Text className="font-semibold text-gray-900">지원 및 정보</Text>
              </View>
            </View>

            <SettingItem
              icon={HelpCircle}
              title="도움말"
              description="사용법 및 FAQ"
              showArrow
              onPress={() => console.log('도움말')}
            />

            <SettingItem
              icon={Mail}
              title="문의하기"
              description="개발팀에 문의"
              showArrow
              onPress={() => console.log('문의하기')}
            />

            <SettingItem
              icon={MessageSquare}
              title="피드백 보내기"
              description="앱 개선 의견 제안"
              showArrow
              onPress={() => console.log('피드백')}
            />

            <SettingItem
              icon={Info}
              title="앱 정보"
              description="버전 1.0.0"
              showArrow
              onPress={() => console.log('앱 정보')}
            />
          </View>

          {/* 위험한 작업 */}
          <View className="bg-white rounded-2xl shadow-sm border border-red-100">
            <View className="px-4 py-3 border-b border-red-100">
              <View className="flex-row items-center space-x-2">
                <AlertTriangle size={20} color="#dc2626" />
                <Text className="font-semibold text-red-600">위험한 작업</Text>
              </View>
            </View>

            <SettingItem
              icon={RotateCcw}
              title="앱 초기화"
              description="모든 설정을 기본값으로 되돌리기"
              danger
              showArrow
              onPress={() => setShowConfirmDialog('reset')}
            />

            <SettingItem
              icon={Trash2}
              title="모든 데이터 삭제"
              description="모든 일기와 설정을 영구 삭제"
              danger
              showArrow
              onPress={() => setShowConfirmDialog('delete')}
            />
          </View>

          {/* 버전 정보 */}
          <View className="items-center py-4">
            <Text className="text-sm text-gray-500">DailyMind v1.0.0</Text>
            <Text className="text-xs text-gray-400 mt-1">
              © 2025 DailyMind. All rights reserved.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Confirm Dialogs */}
      <ConfirmDialog
        title={showConfirmDialog === 'backup' ? '백업 실행' : 
               showConfirmDialog === 'reset' ? '앱 초기화' : '모든 데이터 삭제'}
        message={showConfirmDialog === 'backup' ? '현재 모든 데이터를 클라우드에 백업하시겠습니까?' :
                 showConfirmDialog === 'reset' ? '모든 설정이 기본값으로 되돌아갑니다. 일기 데이터는 유지됩니다.' :
                 '이 작업은 되돌릴 수 없습니다. 모든 일기와 설정이 영구 삭제됩니다.'}
        onConfirm={() => {
          console.log(showConfirmDialog);
          setShowConfirmDialog(null);
        }}
        onCancel={() => setShowConfirmDialog(null)}
        danger={showConfirmDialog === 'reset' || showConfirmDialog === 'delete'}
      />
    </View>
  );
};

export default DailyMindSettings;
