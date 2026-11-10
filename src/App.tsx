/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye,
  EyeOff,
  Globe,
  AlertTriangle,
  Lock,
  Trash2,
  Edit2,
  Copy,
  Plus,
  Clock
} from 'lucide-react';

// --- TRANSLATIONS ---
const TRANSLATIONS = {
  en: {
    title: "SECURE PASSWORD VAULT",
    protection: "OFFLINE PROTECTION",
    add_new: "Create Entry",
    site_label: "App / Website Name",
    cat_label: "Category",
    user_label: "Username",
    pass_label: "Password",
    safety_level: "Safety Level",
    save_btn: "SAVE TO VAULT",
    gen_title: "Password Generator",
    gen_len: "Length",
    gen_chars: "Chars",
    run_gen: "Generate Random Code",
    hint: "Hint: Stronger passwords use a mix of symbols, numbers, and capital letters.",
    vault_site: "Account / Site",
    vault_status: "Safety Scale",
    vault_updated: "Status",
    no_records: "No passwords saved yet.",
    new: "NEW",
    edited: "EDITED",
    reused: "REUSED!",
    reuse_alert: "Alert: This password is also used in another account! Change it to stay safe.",
    edit_pass: "Edit Password",
    copy: "Copy",
    delete: "Delete",
    save: "Save",
    cancel: "Cancel",
    privacy: "Privacy: No web servers involved. Data is local.",
    items: "Items",
    status_ready: "Ready",
    confirm_delete: "Delete this password forever?",
    search_placeholder: "Search your vault...",
    health_title: "Security Health",
    weak_count: "Weak",
    strong_count: "Strong",
    reused_count: "Reused",
    console_log: "System Console",
    action_saved: "RECORD_SAVED",
    action_deleted: "RECORD_DELETED",
    action_updated: "PASSWORD_CHANGED",
    action_generated: "KEY_GENERATED",
    action_logged_in: "VAULT_ACCESS_GRANTED",
    action_logged_out: "SESSION_TERMINATED",
    action_auth_failed: "ACCESS_DENIED",
    action_copy_user: "USERNAME_COPIED",
    action_copy_pass: "PASSWORD_COPIED",
    action_vault_locked: "VAULT_LOCKED",
    cat_social: "Social Media",
    cat_work: "Work",
    cat_personal: "Personal",
    cat_financial: "Financial",
    cat_gaming: "Gaming",
    dir: "ltr",
    login_title: "LOGIN TO VAULT",
    signup_title: "CREATE YOUR VAULT",
    master_user: "Master Username",
    master_pass: "Master Password",
    login_btn: "LOGIN",
    signup_btn: "INITIALIZE VAULT",
    auth_error: "Invalid username or password!",
    setup_hint: "These credentials will be stored locally on this device.",
    logout: "LOGOUT",
    expiry_label: "Expiration Period",
    expiry_none: "No Expiration",
    expiry_30: "30 Days",
    expiry_90: "90 Days",
    expiry_180: "180 Days",
    expiry_expired: "EXPIRED",
    expiry_near: "EXPIRES SOON",
    expiry_days_left: "days left",
    expiry_warning: "Security Warning: This password has expired. Update it immediately!",
    export_btn: "EXPORT_DATA",
    import_btn: "IMPORT_DATA",
    notes_label: "SECURE_NOTES",
    logs_view: "SYSTEM_LOGS",
    back_to_vault: "BACK_TO_VAULT",
    log_title: "VAULT_OPERATION_JOURNAL",
    date_label: "DATE_STAMP",
    time_label: "TIME_STAMP",
    lock_vault: "LOCK_SESSION",
    import_success: "Vault data imported successfully.",
    import_error: "Invalid file format."
  },
  ar: {
    title: "خزنة كلمات المرور",
    protection: "حماية بدون إنترنت",
    add_new: "إضافة إدخال جديد",
    site_label: "اسم التطبيق / الموقع",
    cat_label: "الفئة",
    user_label: "اسم المستخدم",
    pass_label: "كلمة المرور",
    safety_level: "مستوى الأمان",
    save_btn: "حفظ في الخزنة",
    gen_title: "مولد كلمات المرور",
    gen_len: "الطول",
    gen_chars: "رموز",
    run_gen: "توليد رمز عشوائي",
    hint: "نصيحة: كلمات المرور القوية تستخدم مزيجاً من الرموز والأرقام والحروف الكبيرة.",
    vault_site: "الحساب / الموقع",
    vault_status: "مقياس الأمان",
    vault_updated: "الحالة",
    no_records: "لا توجد كلمات مرور محفوظة بعد.",
    new: "جديد",
    edited: "معدل",
    reused: "مكرر!",
    reuse_alert: "تنبيه: كلمة المرور هذه مستخدمة في حساب آخر! قم بتغييرها للأمان.",
    edit_pass: "تعديل كلمة المرور",
    copy: "نسخ",
    delete: "حذف",
    save: "حفظ",
    cancel: "إلغاء",
    privacy: "الخصوصية: لا توجد خوادم خارجية. البيانات محلية.",
    items: "عناصر",
    status_ready: "جاهز",
    confirm_delete: "حذف كلمة المرور هذه نهائياً؟",
    search_placeholder: "ابحث في الخزنة...",
    health_title: "صحة الأمان",
    weak_count: "ضعيف",
    strong_count: "قوي",
    reused_count: "مكرر",
    console_log: "لوحة التحكم",
    action_saved: "تم_الحفظ",
    action_deleted: "تم_الحذف",
    action_updated: "تم_تغيير_كلمة_المرور",
    action_generated: "تم_توليد_مفتاح",
    action_logged_in: "تم_منح_الدخول",
    action_logged_out: "تم_إنهاء_الجلسة",
    action_auth_failed: "تم_رفض_الدخول",
    action_copy_user: "نسخ_اسم_المستخدم",
    action_copy_pass: "نسخ_كلمة_المرور",
    action_vault_locked: "تم_قفل_الخزنة",
    cat_social: "وسائل التواصل",
    cat_work: "عمل",
    cat_personal: "شخصي",
    cat_financial: "مالي",
    cat_gaming: "ألعاب",
    dir: "rtl",
    login_title: "تسجيل الدخول للخزنة",
    signup_title: "إنشاء الخزنة الخاصة بك",
    master_user: "المستخدم الرئيسي",
    master_pass: "كلمة المرور الرئيسية",
    login_btn: "دخول",
    signup_btn: "بدء الاستخدام",
    auth_error: "اسم المستخدم أو كلمة المرور غير صحيحة!",
    setup_hint: "سيتم حفظ هذه البيانات محلياً على جهازك فقط.",
    logout: "خروج",
    expiry_label: "فترة الصلاحية",
    expiry_none: "بدون انتهاء",
    expiry_30: "30 يوم",
    expiry_90: "90 يوم",
    expiry_180: "180 يوم",
    expiry_expired: "منتهي",
    expiry_near: "ينتهي قريباً",
    expiry_days_left: "أيام متبقية",
    expiry_warning: "تحذير أمني: كلمة المرور هذه منتهية الصلاحية. قم بتحديثها فوراً!",
    export_btn: "تصدير_البيانات",
    import_btn: "استيراد_البيانات",
    notes_label: "ملاحظات_آمنة",
    logs_view: "سجلات_النظام",
    back_to_vault: "العودة_للخزنة",
    log_title: "سجل_عمليات_الخزنة",
    date_label: "التاريخ",
    time_label: "الوقت",
    lock_vault: "قفل_الجلسة",
    import_success: "تم استيراد بيانات الخزنة بنجاح.",
    import_error: "صيغة ملف غير صالحة."
  },
  ku: {
    title: "خەزێنەی وشەی نهێنی",
    protection: "پاراستنی ئۆفلاین",
    add_new: "زیادکردنی تۆمار",
    site_label: "ناوی بەرنامە / ماڵپەڕ",
    cat_label: "پۆلێن",
    user_label: "ناوی بەکارهێنەر",
    pass_label: "وشەی نهێنی",
    safety_level: "ئاستی دڵنیایی",
    save_btn: "پاشەکەوتکردن",
    gen_title: "دروستکەری وشە",
    gen_len: "درێژی",
    gen_chars: "پیت",
    run_gen: "دروستکردنی وشەی نهێنی",
    hint: "ئامۆژگاری: وشەی نهێنی بەهێز پێکدێت لە هێما و ژمارە و پیتی گەورە.",
    vault_site: "هەژمار / شوێن",
    vault_status: "پێوەری دڵنیایی",
    vault_updated: "دۆخ",
    no_records: "تا ئێستا هیچ وشەیەکی نهێنی پاشەکەوت نەکراوە.",
    new: "نوێ",
    edited: "گۆڕاو",
    reused: "دووبارە!",
    reuse_alert: "ئاگاداری: ئەم وشەیە لە هەژمارێکی تردا بەکارهاتووە! بیگۆڕە بۆ پاراستنی زیاتر.",
    edit_pass: "گۆڕینی وشە",
    copy: "کۆپی",
    delete: "سڕینەوە",
    save: "پاشەکەوت",
    cancel: "پاشگەزبوونەوە",
    privacy: "تایبەتمەندی: هیچ سێرڤەرێک تێوەنەگلاوە. داتاکە ناوخۆییە.",
    items: "تۆمار",
    status_ready: "ئامادەیە",
    confirm_delete: "ئایا دڵنیای لە سڕینەوەی ئەم وشەیە؟",
    search_placeholder: "گەڕان لەناو خەزێنەدا...",
    health_title: "دۆخی دڵنیایی",
    weak_count: "بێهێز",
    strong_count: "بەهێز",
    reused_count: "دووبارە",
    console_log: "کۆنسۆڵی سیستەم",
    action_saved: "تۆمار_پاشەکەوتکرا",
    action_deleted: "تۆمار_سڕایەوە",
    action_updated: "وشە_گۆڕدرا",
    action_generated: "وشەی_نوێ_دروستکرا",
    action_logged_in: "چوونەژوورە_سەرکەوتووبوو",
    action_logged_out: "دانیشتن_کۆتایی_پێهات",
    action_auth_failed: "چوونەژوورە_ڕەتکرایەوە",
    action_copy_user: "ناوەکە_کۆپی_کرا",
    action_copy_pass: "وشەکە_کۆپی_کرا",
    action_vault_locked: "خەزێنە_داخرا",
    cat_social: "سۆشیاڵ میدیا",
    cat_work: "کار",
    cat_personal: "تایبەت",
    cat_financial: "دارایی",
    cat_gaming: "یاری",
    dir: "rtl",
    login_title: "چوونەژوورە بۆ خەزێنە",
    signup_title: "دروستکردنی خەزێنە",
    master_user: "ناوی سەرەکی",
    master_pass: "وشەی نهێنی سەرەکی",
    login_btn: "چوونەژوورەوە",
    signup_btn: "دەستپێکردن",
    auth_error: "ناو یاخود وشەی نهێنی هەڵەیە!",
    setup_hint: "ئەم ناو و وشە نهێنییە تەنها لەسەر ئەم ئامێرە پاشەکەوت دەکرێت.",
    logout: "چوونەدەرەوە",
    expiry_label: "ماوەی بەسەرچوون",
    expiry_none: "بەسەرناچێت",
    expiry_30: "30 ڕۆژ",
    expiry_90: "90 ڕۆژ",
    expiry_180: "180 ڕۆژ",
    expiry_expired: "بەسەرچووە",
    expiry_near: "بەسەردەچێت",
    expiry_days_left: "ڕۆژی ماوە",
    expiry_warning: "ئاگاداریی دڵنیایی: ئەم وشەیە بەسەرچووە. تکایە بیگۆڕە بۆ پاراستنی هەژمارەکەت.",
    export_btn: "ناردنی_داتا",
    import_btn: "هێنانی_داتا",
    notes_label: "تێبینی_پارێزراو",
    logs_view: "تۆمارەکانی_سیستەم",
    back_to_vault: "گەڕانەوە_بۆ_خەزێنە",
    log_title: "وۆردی_تۆمارەکان",
    date_label: "ڕێکەوت",
    time_label: "کات",
    lock_vault: "داخستنی_سەرەتا",
    import_success: "داتای خەزێنە بە سەرکەوتوویی هێنرا.",
    import_error: "فۆرماتی فایلەکە هەڵەیە."
  }
};

const COLORS = {
  bg: "#020205",
  card: "#0c0d19",
  cyan: "#00f0ff",
  pink: "#ff007f",
  green: "#00ff9f",
  yellow: "#f7ff00",
  red: "#ff3131",
  text: "#e2e8f0",
  grid: "#161938"
};

interface Account {
  id: string;
  site: string;
  username: string;
  password: string;
  category: string;
  date: string;
  notes?: string;
  expiryDate?: string | null;
  strength: number;
  isNew?: boolean;
}

export default function App() {
  const [lang, setLang] = useState<'en'|'ar'|'ku'>('en');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Auth inputs
  const [mUser, setMUser] = useState('');
  const [mPass, setMPass] = useState('');
  
  // Navigation
  const [currView, setCurrView] = useState<'vault' | 'logs'>('vault');
  
  // Console & Search
  const [consoleLogs, setConsoleLogs] = useState<{ id: number; actionKey: string; time: string; fullDate: string }[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Vault inputs
  const [site, setSite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState('cat_personal');
  const [expiryDays, setExpiryDays] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [securityFilter, setSecurityFilter] = useState<'weak' | 'strong' | 'reused' | null>(null);
  const [editPassword, setEditPassword] = useState('');
  const [editExpiryDays, setEditExpiryDays] = useState<number | null>(null);
  const [notes, setNotes] = useState('');
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [genLength, setGenLength] = useState(16);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Sync state with user-specific localStorage
  useEffect(() => {
    if (isAuthenticated && mUser && isDataLoaded) {
      const storageKey = `vault_data_${mUser.toLowerCase()}`;
      localStorage.setItem(storageKey, JSON.stringify(accounts));
    }
  }, [accounts, isAuthenticated, mUser, isDataLoaded]);

  // Sync console logs with user-specific localStorage
  useEffect(() => {
    if (isAuthenticated && mUser && isDataLoaded) {
      const logKey = `vault_logs_${mUser.toLowerCase()}`;
      localStorage.setItem(logKey, JSON.stringify(consoleLogs));
    }
  }, [consoleLogs, isAuthenticated, mUser, isDataLoaded]);

  // Load user data on authentication
  useEffect(() => {
    if (isAuthenticated && mUser && !isDataLoaded) {
      const normalizedUser = mUser.toLowerCase();
      
      const dataKey = `vault_data_${normalizedUser}`;
      const savedData = localStorage.getItem(dataKey);
      if (savedData) setAccounts(JSON.parse(savedData));
      else setAccounts([]);

      const logKey = `vault_logs_${normalizedUser}`;
      const savedLogs = localStorage.getItem(logKey);
      if (savedLogs) setConsoleLogs(JSON.parse(savedLogs));
      else setConsoleLogs([]);

      setIsDataLoaded(true);
    }
  }, [isAuthenticated, mUser, isDataLoaded]);

  const addConsoleLog = (actionKey: string) => {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const fullDate = now.toLocaleDateString(lang, { day: '2-digit', month: '2-digit', year: 'numeric' });
    setConsoleLogs(prev => [{ id: Date.now(), actionKey, time, fullDate }, ...prev].slice(0, 50)); // Keep more logs for the page
  };

  const handleAuth = () => {
    if (!mUser || !mPass) return;
    
    const usersJson = localStorage.getItem('vault_users') || '{}';
    const users = JSON.parse(usersJson);
    
    const normalizedUser = mUser.toLowerCase();
    
    if (!users[normalizedUser]) {
      // Create new user vault
      users[normalizedUser] = mPass;
      localStorage.setItem('vault_users', JSON.stringify(users));
      setIsAuthenticated(true);
      addConsoleLog('action_logged_in');
    } else {
      // Verify existing user
      if (users[normalizedUser] === mPass) {
        setIsAuthenticated(true);
        addConsoleLog('action_logged_in');
      } else {
        addConsoleLog('action_auth_failed');
        alert(t.auth_error);
      }
    }
  };

  const handleLogout = (isManual = true) => {
    let finalLogs = consoleLogs;
    if (isManual) {
      const actionKey = 'action_logged_out';
      const now = new Date();
      const time = now.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const fullDate = now.toLocaleDateString(lang, { day: '2-digit', month: '2-digit', year: 'numeric' });
      const newLog = { id: Date.now(), actionKey, time, fullDate };
      finalLogs = [newLog, ...consoleLogs].slice(0, 50);
    }
    
    if (mUser) {
      const logKey = `vault_logs_${mUser.toLowerCase()}`;
      localStorage.setItem(logKey, JSON.stringify(finalLogs));
    }

    setIsAuthenticated(false);
    setIsDataLoaded(false);
    setCurrView('vault');
    setSecurityFilter(null);
    setMUser('');
    setMPass('');
    setAccounts([]);
    setConsoleLogs([]);
    setExpandedIds(new Set());
  };

  const calculateStrength = useCallback((pw: string) => {
    if (!pw) return 0;
    let score = 0;
    if (pw.length >= 8) score += 20;
    if (pw.length >= 14) score += 20;
    if (/[A-Z]/.test(pw)) score += 15;
    if (/[a-z]/.test(pw)) score += 15;
    if (/[0-9]/.test(pw)) score += 15;
    if (/[^A-Za-z0-9]/.test(pw)) score += 15;
    return Math.min(score, 100);
  }, []);

  const strength = calculateStrength(password);

  const generatePassword = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let newPass = "";
    for (let i = 0; i < genLength; i++) {
        newPass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPass);
    addConsoleLog('action_generated');
  };

  const addRecord = () => {
    if (!site || !username || !password) {
      alert("Please fill in all fields.");
      return;
    }

    let expiryDate = null;
    if (expiryDays) {
      const date = new Date();
      date.setDate(date.getDate() + expiryDays);
      expiryDate = date.toISOString();
    }

    const newAccount: Account = {
      id: Date.now().toString(),
      site: site.toUpperCase(),
      username,
      password,
      category,
      notes,
      strength: calculateStrength(password),
      date: new Date().toLocaleString(),
      expiryDate,
      isNew: true
    };
    setAccounts(prev => [newAccount, ...prev]);
    setSite('');
    setUsername('');
    setPassword('');
    setNotes('');
    setExpiryDays(null);
    addConsoleLog('action_saved');
  };

  const updateRecordPassword = (id: string) => {
    setAccounts(prev => prev.map(acc => {
      if (acc.id === id) {
        let newExpiryDate = acc.expiryDate;
        if (editExpiryDays !== null) {
          const date = new Date();
          date.setDate(date.getDate() + editExpiryDays);
          newExpiryDate = date.toISOString();
        }

        return {
          ...acc,
          password: editPassword,
          strength: calculateStrength(editPassword),
          date: new Date().toLocaleString(),
          expiryDate: editExpiryDays === 0 ? null : (editExpiryDays ? newExpiryDate : acc.expiryDate),
          isNew: false
        };
      }
      return acc;
    }));
    setEditingId(null);
    setEditPassword('');
    setEditExpiryDays(null);
    addConsoleLog('action_updated');
  };

  const exportVault = () => {
    const dataStr = JSON.stringify(accounts, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `vault_backup_${mUser}_${new Date().toISOString().split('T')[0]}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    addConsoleLog('export_btn');
  };

  const importVault = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (Array.isArray(json)) {
            setAccounts(json);
            alert(t.import_success);
            addConsoleLog('import_btn');
        } else {
            throw new Error();
        }
      } catch {
        alert(t.import_error);
      }
    };
    reader.readAsText(file);
  };

  const getExpiryStatus = (expiryStr: string | null | undefined) => {
    if (!expiryStr) return { status: 'safe', days: null };
    const expiry = new Date(expiryStr);
    const now = new Date();
    const diff = expiry.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    
    if (days <= 0) return { status: 'expired', days };
    if (days <= 7) return { status: 'near', days };
    return { status: 'safe', days };
  };

  const deleteRecord = (id: string) => {
    if (deletingId === id) {
      setAccounts(prev => prev.filter(acc => acc.id !== id));
      addConsoleLog('action_deleted');
      setDeletingId(null);
    } else {
      setDeletingId(id);
    }
  };

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) newExpanded.delete(id);
    else newExpanded.add(id);
    setExpandedIds(newExpanded);
  };

  const isPasswordReused = useCallback((pw: string, currentId: string) => {
    return accounts.some(acc => acc.password === pw && acc.id !== currentId);
  }, [accounts]);

  const getStrengthColor = (score: number) => {
    if (score < 40) return COLORS.red;
    if (score < 75) return COLORS.yellow;
    return COLORS.green;
  };

  let filteredAccounts = accounts.filter(acc => 
    acc.site.toLowerCase().includes(searchQuery.toLowerCase()) || 
    acc.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (securityFilter === 'weak') {
    filteredAccounts = filteredAccounts.filter(a => a.strength < 40);
  } else if (securityFilter === 'strong') {
    filteredAccounts = filteredAccounts.filter(a => a.strength >= 75);
  } else if (securityFilter === 'reused') {
    filteredAccounts = filteredAccounts.filter(a => isPasswordReused(a.password, a.id));
  }

  const securityStats = {
    weak: accounts.filter(a => a.strength < 40).length,
    strong: accounts.filter(a => a.strength >= 75).length,
    reused: accounts.filter(a => isPasswordReused(a.password, a.id)).length
  };

  return (
    <div className={`min-h-screen bg-cyber-bg text-cyber-text font-mono flex flex-col selection:bg-cyber-cyan selection:text-black`} dir={t.dir}>
      {/* Header */}
      <header className="border-b border-cyber-grid bg-[#030308]/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-2.5 h-2.5 bg-cyber-cyan rounded-full animate-pulse shadow-[0_0_12px_#00f0ff]"></div>
          <h1 className="text-xl font-bold tracking-[0.3em] text-cyber-cyan uppercase transition-all hover:tracking-[0.4em]">
            {t.title} <span className="text-cyber-pink opacity-50 scale-75 inline-block">V7.0</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          {isAuthenticated && currView === 'logs' && (
            <button 
              onClick={() => setCurrView('vault')}
              className="text-cyber-cyan border border-cyber-cyan/30 px-3 py-1 text-[9px] font-bold uppercase hover:bg-cyber-cyan hover:text-black transition-all rounded-sm flex items-center gap-1.5"
            >
              <Globe className="w-3 h-3" /> {t.back_to_vault}
            </button>
          )}
          <div className="flex bg-[#0a0a14] border border-cyber-grid p-0.5 rounded-sm overflow-hidden">
            {(['en', 'ar', 'ku'] as const).map(l => (
              <button 
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1 text-[9px] font-black transition-all ${lang === l ? 'bg-cyber-cyan text-black' : 'text-cyber-cyan/50 hover:text-cyber-cyan'}`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          {isAuthenticated && (
            <button 
              onClick={() => handleLogout(true)}
              className="text-cyber-red border border-cyber-red/30 px-3 py-1 text-[9px] font-bold uppercase hover:bg-cyber-red hover:text-white transition-all rounded-sm flex items-center gap-1.5"
            >
              <Trash2 className="w-3 h-3" /> {t.logout}
            </button>
          )}
        </div>
      </header>

      {/* Auth Screen or Main Content */}
      {!isAuthenticated ? (
        <main className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
          {/* Decorative geometric elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-cyber-cyan/5 rounded-full animate-[spin_20s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-cyber-pink/5 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-sm bg-cyber-card/90 backdrop-blur-xl border border-cyber-cyan/30 p-1 rounded-sm shadow-[0_0_50px_rgba(0,240,255,0.1)]"
          >
            <div className="p-8 space-y-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-cyber-bg border border-cyber-cyan/20 flex items-center justify-center mx-auto mb-2 transform rotate-45 group">
                  <Lock className="w-8 h-8 text-cyber-cyan -rotate-45 transition-transform group-hover:scale-110" />
                </div>
                <h2 className="text-sm font-black tracking-[0.2em] text-cyber-cyan uppercase">
                  {t.login_title} / {t.signup_title}
                </h2>
                <div className="text-[9px] bg-cyber-pink/10 text-cyber-pink border border-cyber-pink/20 py-1.5 px-3 inline-block rounded-full uppercase tracking-widest font-bold">
                  {t.protection}
                </div>
              </div>

              <div className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[8px] uppercase font-black tracking-widest text-cyber-cyan/40 px-1">{t.master_user}</label>
                  <input 
                    type="text" 
                    value={mUser} 
                    onChange={(e) => setMUser(e.target.value)}
                    className="w-full bg-[#05050a] border border-cyber-grid px-4 py-3 text-cyber-cyan focus:outline-none focus:border-cyber-cyan/60 transition-colors text-sm"
                    placeholder="ADMIN"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[8px] uppercase font-black tracking-widest text-cyber-cyan/40 px-1">{t.master_pass}</label>
                  <input 
                    type="password" 
                    value={mPass} 
                    onChange={(e) => setMPass(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
                    className="w-full bg-[#05050a] border border-cyber-grid px-4 py-3 text-cyber-cyan focus:outline-none focus:border-cyber-cyan/60 transition-colors text-sm"
                    placeholder="••••••••"
                  />
                </div>
                
                <button 
                  onClick={handleAuth}
                  className="group relative w-full bg-cyber-cyan text-cyber-bg py-4 font-black uppercase tracking-[0.3em] overflow-hidden transition-all hover:bg-white"
                >
                  <span className="relative z-10">{t.login_btn}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </button>
              </div>
              
              <p className="text-[8px] text-center text-cyber-text opacity-30 uppercase leading-relaxed font-bold">
                {t.setup_hint}
              </p>
            </div>
          </motion.div>
        </main>
      ) : currView === 'vault' ? (
        <main className="flex-1 p-4 md:p-8 flex flex-col gap-6 overflow-hidden max-w-[1600px] mx-auto w-full">
          
          {/* Security Dashboard Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div 
              onClick={() => setSecurityFilter(null)}
              className={`cursor-pointer bg-cyber-card border p-4 flex items-center justify-between group transition-colors ${securityFilter === null ? 'border-cyber-cyan bg-cyber-cyan/5' : 'border-cyber-grid hover:border-cyber-cyan/30'}`}
            >
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold opacity-40">{t.health_title}</p>
                <p className="text-xl font-black text-cyber-cyan tracking-tight">{accounts.length}</p>
              </div>
              <Lock className="w-8 h-8 text-cyber-cyan/20 group-hover:text-cyber-cyan/40 transition-colors" />
            </div>
            <div 
              onClick={() => setSecurityFilter(securityFilter === 'strong' ? null : 'strong')}
              className={`cursor-pointer bg-cyber-card border p-4 flex items-center justify-between transition-colors ${securityFilter === 'strong' ? 'border-cyber-green bg-cyber-green/5' : 'border-cyber-grid hover:border-cyber-green/30'}`}
            >
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold opacity-40 text-cyber-green">{t.strong_count}</p>
                <p className="text-xl font-black text-cyber-green tracking-tight">{securityStats.strong}</p>
              </div>
              <div className={`w-2 h-2 bg-cyber-green rounded-full shadow-[0_0_8px_#00ff9f] ${securityFilter === 'strong' ? 'animate-pulse' : ''}`} />
            </div>
            <div 
              onClick={() => setSecurityFilter(securityFilter === 'weak' ? null : 'weak')}
              className={`cursor-pointer bg-cyber-card border p-4 flex items-center justify-between transition-colors ${securityFilter === 'weak' ? 'border-cyber-yellow bg-cyber-yellow/5' : 'border-cyber-grid hover:border-cyber-yellow/30'}`}
            >
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold opacity-40 text-cyber-yellow">{t.weak_count}</p>
                <p className="text-xl font-black text-cyber-yellow tracking-tight">{securityStats.weak}</p>
              </div>
              <AlertTriangle className={`w-5 h-5 text-cyber-yellow/40 ${securityFilter === 'weak' ? 'text-cyber-yellow opacity-100' : ''}`} />
            </div>
            <div 
              onClick={() => setSecurityFilter(securityFilter === 'reused' ? null : 'reused')}
              className={`cursor-pointer bg-cyber-card border p-4 flex items-center justify-between transition-colors ${securityFilter === 'reused' ? 'border-cyber-red bg-cyber-red/5' : 'border-cyber-grid hover:border-cyber-red/30'}`}
            >
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold opacity-40 text-cyber-red">{t.reused_count}</p>
                <p className="text-xl font-black text-cyber-red tracking-tight">{securityStats.reused}</p>
              </div>
              <div className={`w-1.5 h-1.5 bg-cyber-red rounded-full ${securityFilter === 'reused' ? 'animate-ping' : ''}`} />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6 flex-1 overflow-hidden">
            {/* Left Column: Form & Gen */}
            <div className="col-span-12 lg:col-span-5 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
              <section className="bg-cyber-card border border-cyber-grid p-6 relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-cyan/5 -mr-16 -mt-16 rounded-full blur-3xl transition-transform group-hover:scale-150" />
                <div className={`absolute -top-3 ${t.dir === 'rtl' ? 'right-6' : 'left-6'} bg-cyber-bg px-3 text-[9px] text-cyber-cyan font-black uppercase tracking-[0.2em]`}>
                  [ {t.add_new} ]
                </div>
                
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[8px] uppercase text-cyber-pink font-black tracking-widest px-1">{t.site_label}</label>
                      <input 
                        type="text" value={site} onChange={(e) => setSite(e.target.value)}
                        className="w-full bg-[#05050a] border border-cyber-grid px-3 py-2.5 text-cyber-cyan focus:outline-none focus:border-cyber-pink/50 transition-colors text-xs"
                        placeholder="NAME_HERE"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[8px] uppercase text-cyber-pink font-black tracking-widest px-1">{t.cat_label}</label>
                      <select 
                        value={category} onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-[#05050a] border border-cyber-grid px-3 py-2.5 text-cyber-cyan focus:outline-none focus:border-cyber-pink/50 text-xs appearance-none"
                      >
                        {['cat_social', 'cat_work', 'cat_personal', 'cat_financial', 'cat_gaming'].map(cat => (
                          <option key={cat} value={cat}>{t[cat as keyof typeof t]}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[8px] uppercase text-cyber-pink font-black tracking-widest px-1">{t.user_label}</label>
                      <input 
                        type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-[#05050a] border border-cyber-grid px-3 py-2.5 text-cyber-cyan focus:outline-none focus:border-cyber-pink/50 text-xs"
                        placeholder="IDENTIFIER"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[8px] uppercase text-cyber-pink font-black tracking-widest px-1">{t.expiry_label}</label>
                      <select 
                        value={expiryDays || ''} 
                        onChange={(e) => setExpiryDays(e.target.value ? parseInt(e.target.value) : null)}
                        className="w-full bg-[#05050a] border border-cyber-grid px-3 py-2.5 text-cyber-cyan focus:outline-none focus:border-cyber-pink/50 text-xs appearance-none"
                      >
                        <option value="">{t.expiry_none}</option>
                        <option value="30">{t.expiry_30}</option>
                        <option value="90">{t.expiry_90}</option>
                        <option value="180">{t.expiry_180}</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[8px] uppercase text-cyber-pink font-black tracking-widest px-1">{t.notes_label}</label>
                    <textarea 
                      value={notes} onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-[#05050a] border border-cyber-grid px-3 py-2 text-cyber-cyan focus:outline-none focus:border-cyber-pink/50 text-xs h-16 resize-none"
                      placeholder="ADDITIONAL_SECRET_INFO..."
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[8px] uppercase text-cyber-pink font-black tracking-widest px-1">{t.pass_label}</label>
                    <div className="bg-[#05050a] border border-cyber-grid px-4 py-3 flex justify-between items-center group/pass focus-within:border-cyber-pink/50 transition-colors">
                      <input 
                        type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                        className="bg-transparent border-none w-full text-base text-cyber-cyan focus:outline-none"
                        placeholder="••••••••"
                      />
                      <button onClick={() => setShowPassword(!showPassword)} className="text-cyber-cyan/30 hover:text-cyber-cyan transition-colors">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex justify-between text-[8px] font-black uppercase tracking-widest opacity-40">
                      <span>{t.safety_level}</span>
                      <span>{strength}%</span>
                    </div>
                    <div className="h-1 bg-cyber-grid w-full overflow-hidden flex">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${strength}%` }} className="h-full" style={{ backgroundColor: getStrengthColor(strength) }} />
                    </div>
                  </div>

                  <button onClick={addRecord} className="w-full bg-[#111122] border border-cyber-cyan/50 text-cyber-cyan py-4 font-black uppercase tracking-[0.4em] hover:bg-cyber-cyan hover:text-black transition-all active:scale-[0.98]">
                    {t.save_btn}
                  </button>
                </div>
              </section>

              {/* Generator Section */}
              <section className="bg-cyber-card border border-cyber-grid p-6 relative overflow-hidden">
                <h2 className="text-[9px] font-black uppercase tracking-[0.2em] text-cyber-pink mb-6 flex items-center gap-2">
                  <Globe className="w-3 h-3" /> {t.gen_title}
                </h2>
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex justify-between text-[10px] font-bold">
                      <span className="opacity-40">{t.gen_len}</span>
                      <span className="text-cyber-cyan font-black">{genLength} {t.gen_chars}</span>
                    </div>
                    <input 
                      type="range" min="8" max="64" value={genLength} onChange={(e) => setGenLength(parseInt(e.target.value))}
                      className="w-full accent-cyber-cyan bg-cyber-grid h-1 appearance-none cursor-pointer"
                    />
                  </div>
                  <button onClick={generatePassword} className="group w-full border border-cyber-green text-cyber-green py-3 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-cyber-green hover:text-black transition-all flex items-center justify-center gap-3">
                    <Lock className="w-3 h-3 transition-transform group-hover:rotate-12" /> {t.run_gen}
                  </button>
                  <p className="text-[8px] uppercase opacity-30 leading-normal font-bold italic border-t border-cyber-grid/20 pt-4">
                    {t.hint}
                  </p>
                </div>
              </section>

              {/* Maintenance Protocols */}
              <section className="bg-cyber-card border border-cyber-grid p-6 relative overflow-hidden">
                <h2 className="text-[9px] font-black uppercase tracking-[0.2em] text-cyber-cyan mb-6 flex items-center gap-2">
                  <Plus className="w-3 h-3" /> MAINTENANCE_PROTOCOLS
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={exportVault}
                      className="flex-1 border border-cyber-cyan/30 text-cyber-cyan py-3 text-[9px] font-black uppercase tracking-[0.1em] hover:bg-cyber-cyan hover:text-black transition-all flex items-center justify-center gap-2 px-1"
                    >
                      {t.export_btn}
                    </button>
                    <label className="flex-1 cursor-pointer">
                      <input type="file" accept=".json" onChange={importVault} className="hidden" />
                      <div className="w-full h-full border border-cyber-pink/30 text-cyber-pink py-3 text-[9px] font-black uppercase tracking-[0.1em] hover:bg-cyber-pink hover:text-white transition-all flex items-center justify-center gap-2 text-center flex px-1">
                        {t.import_btn}
                      </div>
                    </label>
                  </div>
                  <button 
                    onClick={() => setCurrView('logs')}
                    className="w-full border border-cyber-cyan text-cyber-cyan py-3 text-[9px] font-black uppercase tracking-[0.2em] hover:bg-cyber-cyan hover:text-black transition-all flex items-center justify-center gap-2"
                  >
                    <Clock className="w-3 h-3" /> {t.logs_view}
                  </button>
                  <button 
                    onClick={() => handleLogout(true)}
                    className="w-full bg-cyber-red/10 border border-cyber-red text-cyber-red py-3 text-[9px] font-black uppercase tracking-[0.2em] hover:bg-cyber-red hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <Lock className="w-3 h-3" /> {t.lock_vault}
                  </button>
                </div>
              </section>


            </div>

            {/* Right Column: Vault Grid */}
            <section className="col-span-12 lg:col-span-7 bg-cyber-card border border-cyber-grid flex flex-col overflow-hidden">
              <div className="p-4 border-b border-cyber-grid bg-[#0a0a14] flex flex-wrap gap-4 items-center">
                <div className="relative flex-1 min-w-[200px]">
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.search_placeholder}
                    className="w-full bg-cyber-bg border border-cyber-grid px-10 py-2.5 text-xs text-cyber-cyan focus:outline-none focus:border-cyber-cyan/40 transition-colors"
                  />
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-20" />
                </div>
                {securityFilter && (
                  <button 
                    onClick={() => setSecurityFilter(null)}
                    className="bg-cyber-cyan/10 border border-cyber-cyan text-cyber-cyan text-[8px] font-black uppercase px-3 py-2 flex items-center gap-2 hover:bg-cyber-cyan hover:text-black transition-colors"
                  >
                    FILTER: {securityFilter} [X]
                  </button>
                )}
                <div className="hidden sm:flex items-center gap-2 px-3 border-l border-cyber-grid opacity-30">
                  <div className="w-2 h-2 bg-cyber-green rounded-full" />
                  <span className="text-[10px] font-bold uppercase">Uplink: Live</span>
                </div>
              </div>

              <div className="grid grid-cols-12 bg-[#05050a] p-3 text-[9px] font-black text-cyber-pink uppercase tracking-[0.2em] border-b border-cyber-grid">
                <div className="col-span-5">{t.vault_site}</div>
                <div className="col-span-3">{t.vault_status}</div>
                <div className="col-span-4">{t.vault_updated}</div>
              </div>
              
              <div className="divide-y divide-cyber-grid flex-1 overflow-y-auto custom-scrollbar">
                {filteredAccounts.length === 0 ? (
                  <div className="p-20 text-center flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border border-cyber-grid flex items-center justify-center opacity-10">
                      <Lock className="w-6 h-6" />
                    </div>
                    <p className="opacity-20 italic text-xs uppercase font-bold tracking-[0.2em]">{t.no_records}</p>
                  </div>
                ) : (
                  filteredAccounts.map((acc, index) => (
                    <motion.div 
                      key={acc.id} 
                      className={`group hover:bg-cyber-cyan/5 transition-colors ${expandedIds.has(acc.id) ? 'bg-cyber-cyan/[0.03]' : ''}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div 
                        onClick={() => toggleExpand(acc.id)}
                        className="grid grid-cols-12 p-4 text-xs items-center cursor-pointer"
                      >
                        <div className="col-span-5 flex items-center gap-3">
                           <div className={`w-8 h-8 flex items-center justify-center text-[10px] border transform rotate-45 transition-all group-hover:bg-cyber-cyan group-hover:text-black ${expandedIds.has(acc.id) ? 'border-cyber-cyan bg-cyber-cyan text-black' : 'border-cyber-grid text-cyber-pink/40'}`}>
                             <span className="-rotate-45">{acc.site.charAt(0)}</span>
                           </div>
                           <div className="ml-1">
                              <p className="font-black text-cyber-cyan uppercase tracking-wider">{acc.site}</p>
                              <p className="text-[8px] opacity-30 font-bold uppercase">{t[acc.category as keyof typeof t]}</p>
                           </div>
                        </div>
                        <div className="col-span-3 flex items-center gap-2">
                          <div className="w-16 h-0.5 bg-cyber-grid hidden sm:block">
                            <motion.div 
                              initial={{ width: 0 }} animate={{ width: `${acc.strength}%` }}
                              className="h-full" style={{ backgroundColor: getStrengthColor(acc.strength) }} 
                            />
                          </div>
                          <span className="text-[9px] font-black" style={{ color: getStrengthColor(acc.strength) }}>{acc.strength}%</span>
                        </div>
                        <div className="col-span-4 flex flex-wrap gap-2 items-center justify-end">
                           {(() => {
                              const exp = getExpiryStatus(acc.expiryDate);
                              if (exp.status === 'expired') return (
                                <span className="text-[7px] px-1.5 py-0.5 bg-cyber-red text-white font-black uppercase tracking-widest animate-pulse">
                                  {t.expiry_expired}
                                </span>
                              );
                              if (exp.status === 'near') return (
                                <span className="text-[7px] px-1.5 py-0.5 border border-cyber-yellow text-cyber-yellow font-black uppercase tracking-widest">
                                  {t.expiry_near}
                                </span>
                              );
                              return null;
                           })()}
                           <span className={`text-[7px] px-1.5 py-0.5 font-black uppercase tracking-widest border transition-all ${acc.isNew ? 'border-cyber-green/50 text-cyber-green' : 'border-cyber-yellow/50 text-cyber-yellow'}`}>
                            {acc.isNew ? t.new : t.edited}
                          </span>
                          {isPasswordReused(acc.password, acc.id) && (
                            <span className="text-[7px] px-1.5 py-0.5 bg-cyber-red/20 border border-cyber-red text-cyber-red font-black animate-pulse uppercase tracking-[0.1em]">
                              {t.reused}
                            </span>
                          )}
                        </div>
                      </div>

                      <AnimatePresence>
                        {expandedIds.has(acc.id) && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                            className="bg-black/40 border-t border-cyber-grid overflow-hidden"
                          >
                            <div className="p-6 space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <p className="text-[8px] uppercase font-black tracking-[0.2em] text-cyber-cyan/40">{t.user_label}</p>
                                    <div className="bg-cyber-bg border border-cyber-grid p-3 flex justify-between items-center">
                                      <p className="text-sm font-bold">{acc.username}</p>
                                      <button 
                                        onClick={() => {
                                          navigator.clipboard.writeText(acc.username);
                                          addConsoleLog('action_copy_user');
                                        }}
                                        className="text-cyber-cyan/40 hover:text-cyber-cyan p-1"
                                      >
                                        <Copy className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[8px] uppercase font-black tracking-[0.2em] text-cyber-cyan/40">{t.vault_updated}</p>
                                    <p className="text-[10px] font-bold opacity-60 bg-cyber-[#111122] p-3 border border-cyber-grid/20">{acc.date}</p>
                                </div>
                                {acc.expiryDate && (
                                  <div className="space-y-2">
                                      <p className="text-[8px] uppercase font-black tracking-[0.2em] text-cyber-cyan/40">{t.expiry_label}</p>
                                      <div className={`p-3 border flex items-center justify-between ${getExpiryStatus(acc.expiryDate).status === 'expired' ? 'border-cyber-red bg-cyber-red/10' : 'border-cyber-grid bg-[#111122]'}`}>
                                        <div className="flex items-center gap-2">
                                          <Clock className={`w-3.5 h-3.5 ${getExpiryStatus(acc.expiryDate).status === 'expired' ? 'text-cyber-red animate-pulse' : 'text-cyber-cyan'}`} />
                                          <span className="text-[10px] font-bold">
                                            {new Date(acc.expiryDate).toLocaleDateString()}
                                          </span>
                                        </div>
                                        {getExpiryStatus(acc.expiryDate).days !== null && (
                                          <span className={`text-[8px] font-black uppercase ${getExpiryStatus(acc.expiryDate).status === 'expired' ? 'text-cyber-red' : 'opacity-40'}`}>
                                            {getExpiryStatus(acc.expiryDate).days} {t.expiry_days_left}
                                          </span>
                                        )}
                                      </div>
                                  </div>
                                )}
                              </div>
                              {acc.notes && (
                                <div className="space-y-2">
                                    <p className="text-[8px] uppercase font-black tracking-[0.2em] text-cyber-cyan/40">{t.notes_label}</p>
                                    <div className="bg-[#111122] border border-cyber-grid/20 p-3 text-[10px] opacity-70 whitespace-pre-wrap leading-relaxed font-bold">
                                      {acc.notes}
                                    </div>
                                </div>
                              )}

                              {getExpiryStatus(acc.expiryDate).status === 'expired' && (
                                <motion.div 
                                  initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
                                  className="p-4 bg-cyber-red text-white text-[9px] font-black flex items-center gap-3 rounded-sm shadow-[0_0_20px_rgba(255,49,49,0.3)]"
                                >
                                    <AlertTriangle className="w-5 h-5 shrink-0" />
                                    <span className="tracking-widest uppercase leading-relaxed">{t.expiry_warning}</span>
                                </motion.div>
                              )}

                              <div className="pt-6 border-t border-cyber-grid/10 space-y-4">
                                <p className="text-[8px] uppercase font-black tracking-[0.2em] text-cyber-pink">{t.edit_pass}</p>
                                {editingId === acc.id ? (
                                  <div className="flex flex-col gap-3">
                                    <div className="flex gap-2">
                                      <input 
                                        type="text" value={editPassword} 
                                        onChange={(e) => setEditPassword(e.target.value)}
                                        className="flex-1 bg-cyber-bg border border-cyber-cyan p-3 text-sm focus:outline-none placeholder:opacity-20"
                                        autoFocus
                                        placeholder="NEW_PASSWORD"
                                      />
                                      <select 
                                        value={editExpiryDays === null ? 'current' : editExpiryDays}
                                        onChange={(e) => {
                                          const val = e.target.value;
                                          if (val === 'current') setEditExpiryDays(null);
                                          else setEditExpiryDays(parseInt(val));
                                        }}
                                        className="bg-[#05050a] border border-cyber-grid px-3 text-cyber-cyan text-[10px] focus:outline-none"
                                      >
                                        <option value="current">{acc.expiryDate ? "Keep Current" : t.expiry_none}</option>
                                        <option value="0">{t.expiry_none}</option>
                                        <option value="30">{t.expiry_30}</option>
                                        <option value="90">{t.expiry_90}</option>
                                        <option value="180">{t.expiry_180}</option>
                                      </select>
                                    </div>
                                    <div className="flex gap-2 justify-end">
                                        <button onClick={() => updateRecordPassword(acc.id)} className="bg-cyber-green text-black px-6 py-1.5 text-[9px] font-black uppercase hover:bg-white transition-colors">{t.save}</button>
                                        <button onClick={() => { setEditingId(null); setEditExpiryDays(null); }} className="bg-cyber-red/20 text-cyber-red border border-cyber-red/30 px-4 py-1.5 text-[9px] font-black uppercase hover:bg-cyber-red hover:text-white transition-colors">{t.cancel}</button>
                                    </div>
                                  </div>
                                ) : (
                                    <div className="flex flex-wrap gap-4 items-center">
                                        <div className="flex-1 bg-cyber-bg border border-cyber-grid p-3 flex justify-between items-center group/pfield hover:border-cyber-cyan/40 transition-colors">
                                          <span className="text-cyber-cyan tracking-[0.4em] text-xl font-black">••••••••</span>
                                          <div className="flex gap-3">
                                            <button 
                                              onClick={() => {
                                                navigator.clipboard.writeText(acc.password);
                                                addConsoleLog('action_copy_pass');
                                              }}
                                              className="flex items-center gap-2 text-[9px] font-black uppercase text-cyber-cyan/40 hover:text-cyber-cyan"
                                            >
                                              <Copy className="w-3.5 h-3.5" />
                                            </button>
                                          </div>
                                        </div>
                                        
                                        <div className="flex gap-3 ml-auto">
                                          <button 
                                            onClick={() => {
                                              setEditingId(acc.id);
                                              setEditPassword(acc.password);
                                            }}
                                            className="px-4 py-2 bg-cyber-yellow/10 border border-cyber-yellow/30 text-cyber-yellow text-[9px] font-black uppercase hover:bg-cyber-yellow hover:text-black transition-all flex items-center gap-2"
                                          >
                                            <Edit2 className="w-3 h-3" /> {t.edit_pass}
                                          </button>
                                          <button 
                                            onClick={() => deleteRecord(acc.id)} 
                                            className={`px-4 py-2 border text-[9px] font-black uppercase transition-all flex items-center gap-2 ${deletingId === acc.id ? 'bg-cyber-red text-white border-cyber-red animate-pulse' : 'bg-cyber-red/10 border-cyber-red/30 text-cyber-red hover:bg-cyber-red hover:text-white'}`}
                                          >
                                            <Trash2 className="w-3 h-3" /> {deletingId === acc.id ? t.delete.toUpperCase() + "?" : t.delete}
                                          </button>
                                          {deletingId === acc.id && (
                                             <button 
                                               onClick={() => setDeletingId(null)}
                                               className="px-4 py-2 bg-white/10 border border-white/20 text-white text-[9px] font-black uppercase hover:bg-white/20 transition-all"
                                             >
                                               {t.cancel}
                                             </button>
                                          )}
                                        </div>
                                    </div>
                                )}
                              </div>

                              {isPasswordReused(acc.password, acc.id) && (
                                <motion.div 
                                  initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                                  className="p-4 bg-cyber-red/10 border border-cyber-red/40 text-[9px] text-cyber-red flex items-start gap-3 rounded-sm"
                                >
                                    <AlertTriangle className="w-4 h-4 shrink-0 -mt-0.5" />
                                    <span className="font-bold tracking-wider leading-relaxed">{t.reuse_alert}</span>
                                </motion.div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))
                )}
              </div>
            </section>
          </div>
        </main>
      ) : (
        <main className="flex-1 p-4 md:p-8 flex flex-col gap-6 overflow-hidden max-w-[1200px] mx-auto w-full">
          <motion.section 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 bg-cyber-card border border-cyber-grid flex flex-col overflow-hidden"
          >
             <div className="p-6 border-b border-cyber-grid bg-[#0a0a14] flex justify-between items-center">
                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-cyber-pink flex items-center gap-3">
                  <Clock className="w-4 h-4" /> {t.log_title}
                </h2>
                <button 
                  onClick={() => setCurrView('vault')}
                  className="text-[9px] font-black uppercase border border-cyber-cyan/30 px-4 py-2 text-cyber-cyan hover:bg-cyber-cyan hover:text-black transition-all"
                >
                  {t.back_to_vault}
                </button>
             </div>
             
             <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-black">
                <div className="min-w-full">
                   <div className="grid grid-cols-12 gap-4 text-[9px] font-black uppercase text-cyber-cyan/40 border-b border-cyber-grid/20 pb-4 px-2 mb-4">
                      <div className="col-span-3">{t.date_label}</div>
                      <div className="col-span-2">{t.time_label}</div>
                      <div className="col-span-7">ACTION_DESCRIPTION</div>
                   </div>
                   
                   <div className="space-y-2">
                      {consoleLogs.map((log) => (
                         <div key={log.id} className="grid grid-cols-12 gap-4 items-center p-3 text-[10px] sm:text-xs border border-cyber-grid/10 bg-cyber-[#111122]/30 hover:bg-cyber-cyan/5 transition-colors font-bold group">
                            <div className="col-span-3 text-cyber-pink/70 font-black">{log.fullDate}</div>
                            <div className="col-span-2 opacity-50 font-mono tracking-tighter">{log.time}</div>
                            <div className="col-span-7 text-cyber-cyan tracking-wider flex items-center gap-2">
                               <Plus className="w-2 h-2 opacity-30 group-hover:opacity-100" />
                               {(t[log.actionKey as keyof typeof t] || log.actionKey) as string}
                            </div>
                         </div>
                      ))}
                      {consoleLogs.length === 0 && (
                        <div className="p-10 text-center text-xs opacity-20 uppercase tracking-widest italic">
                           NO_DATA_LOGGED_YET
                        </div>
                      )}
                   </div>
                </div>
             </div>
          </motion.section>
        </main>
      )}

      {/* Footer */}
      <footer className="h-8 border-t border-cyber-grid flex items-center px-6 md:px-10 justify-between text-[8px] opacity-40 bg-black z-50">
        <div className="uppercase tracking-[0.2em] font-black">{t.privacy}</div>
        <div className="flex gap-8 uppercase font-black">
          <span>{t.items}: {accounts.length}</span>
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-cyber-green rounded-full shadow-[0_0_4px_#00ff9f]" />
            {t.status_ready}
          </span>
        </div>
      </footer>

      {/* Modern Scanning Effect */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-40">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-cyber-cyan/10 animate-[scan_8s_linear_infinite]" />
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-cyber-cyan/5" />
        <div className="absolute top-0 left-2/4 w-[1px] h-full bg-cyber-cyan/5" />
        <div className="absolute top-0 left-3/4 w-[1px] h-full bg-cyber-cyan/5" />
      </div>
      
      <style>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #161938;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ff007f;
        }
      `}</style>

      {/* Scanning Overlay (Removed Audit Feature) */}
    </div>
  );
}
