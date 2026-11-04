import React, { useState, useEffect, useRef } from 'react';
import {
  Hash,
  Volume2,
  Send,
  Smile,
  PlusCircle,
  ShieldAlert,
  Users,
  Search,
  Pin,
  Bell,
  Trash2,
  CheckCircle2,
  Lock,
  ArrowRight,
  Cookie,
  Gamepad2,
  Mic,
  Headphones,
  Settings,
  Sparkles,
} from 'lucide-react';

export const DiscordChat = ({ user, onUpdateUserAge, onSwitchToGames }) => {
  const is13Plus = Boolean(user?.is13OrOlder);

  // Channels definition
  const channels = [
    { id: 'general', name: 'general', icon: '💬', topic: 'General hangout for C00K13 gamers & friends' },
    { id: 'game-talk', name: 'game-talk', icon: '🎮', topic: 'Talk games, high scores, walkthroughs, and secrets' },
    { id: 'minecraft-realm', name: 'minecraft-realm', icon: '⛏️', topic: 'Mining coords, diamond depths, nether portals & bases' },
    { id: 'skate-session', name: 'skate-session', icon: '🛹', topic: 'Skate 3 trick lines, kickflips, and hall of meat clips' },
    { id: 'homework-help', name: 'homework-help', icon: '🧮', topic: 'Math equations, biology study notes, and physics formulas' },
  ];

  const [activeChannel, setActiveChannel] = useState('general');
  const [inputText, setInputText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMembersList, setShowMembersList] = useState(true);

  // Initial pre-seeded community messages
  const defaultMessages = {
    general: [
      {
        id: 'msg-1',
        sender: 'PixelMaster',
        role: 'MOD',
        avatarColor: 'from-amber-500 to-red-600',
        text: 'Welcome to the C00K13 Community Lounge! Keep it friendly and have fun gaming.',
        timestamp: 'Today at 4:10 PM',
        reactions: { '🍪': 7, '🔥': 5 },
      },
      {
        id: 'msg-2',
        sender: 'RetroRunner',
        role: 'PRO',
        avatarColor: 'from-sky-500 to-indigo-600',
        text: 'Anyone know what the secret code is for the calculator disguise? Trying to tell my friend',
        timestamp: 'Today at 4:18 PM',
        reactions: {},
      },
      {
        id: 'msg-3',
        sender: 'VoxelCrafter',
        role: 'MEMBER',
        avatarColor: 'from-emerald-500 to-teal-700',
        text: 'It is 6692 then press = on the keypad! Works every time.',
        timestamp: 'Today at 4:19 PM',
        reactions: { '❤️': 4, '🍪': 3 },
      },
      {
        id: 'msg-4',
        sender: 'NeonDrifter',
        role: 'MEMBER',
        avatarColor: 'from-fuchsia-500 to-pink-600',
        text: 'CRUM3L AI in the sidebar actually solved my quadratic formula homework too lol it is so fast',
        timestamp: 'Today at 4:26 PM',
        reactions: { '🎉': 6 },
      },
    ],
    'game-talk': [
      {
        id: 'gt-1',
        sender: 'BossSlayer',
        role: 'PRO',
        avatarColor: 'from-red-500 to-rose-700',
        text: 'Finally beat World 2 in Cuphead! Spread gun + Smoke bomb dash is the meta.',
        timestamp: 'Today at 3:45 PM',
        reactions: { '🏆': 8, '🔥': 5 },
      },
      {
        id: 'gt-2',
        sender: 'SkateKid99',
        role: 'MEMBER',
        avatarColor: 'from-amber-500 to-yellow-600',
        text: 'Hit a 100k line in Skate 3 Port Carverton. Anyone tried Ultrakill yet?',
        timestamp: 'Today at 4:02 PM',
        reactions: { '🛹': 4 },
      },
    ],
    'minecraft-realm': [
      {
        id: 'mc-1',
        sender: 'VoxelCrafter',
        role: 'MEMBER',
        avatarColor: 'from-emerald-500 to-teal-700',
        text: 'Reminder: Diamonds spawn most at Y = -58 now! Do branch mining 3 blocks apart.',
        timestamp: 'Today at 2:30 PM',
        reactions: { '💎': 9, '⛏️': 6 },
      },
    ],
    'skate-session': [
      {
        id: 'sk-1',
        sender: 'SkateKid99',
        role: 'MEMBER',
        avatarColor: 'from-amber-500 to-yellow-600',
        text: 'Hold space and release + left arrow for kickflips. Use Shift on rails to 50-50 grind!',
        timestamp: 'Today at 1:15 PM',
        reactions: { '🛹': 5 },
      },
    ],
    'homework-help': [
      {
        id: 'hw-1',
        sender: 'StudyMaster',
        role: 'HELPER',
        avatarColor: 'from-blue-500 to-cyan-600',
        text: 'If anyone needs photosynthesis or cellular respiration notes, hit the Panic button or ask CRUM3L AI!',
        timestamp: 'Today at 11:40 AM',
        reactions: { '📚': 6, '🍪': 4 },
      },
    ],
  };

  // State of all messages
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('c00k13_discord_messages');
      if (saved) return JSON.parse(saved);
    } catch {}
    return defaultMessages;
  });

  const chatEndRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeChannel]);

  // Sync via BroadcastChannel across local tabs/windows
  useEffect(() => {
    let bc;
    try {
      bc = new BroadcastChannel('c00k13_discord_channel');
      bc.onmessage = (event) => {
        if (event.data?.type === 'NEW_MESSAGE') {
          setMessages(event.data.payload);
        }
      };
    } catch (e) {
      console.error('BroadcastChannel error', e);
    }
    return () => {
      bc?.close();
    };
  }, []);

  // Save to localStorage & broadcast
  const saveAndBroadcast = (updated) => {
    setMessages(updated);
    try {
      localStorage.setItem('c00k13_discord_messages', JSON.stringify(updated));
      const bc = new BroadcastChannel('c00k13_discord_channel');
      bc.postMessage({ type: 'NEW_MESSAGE', payload: updated });
      bc.close();
    } catch {}
  };

  // Send new message
  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    const text = inputText.trim();
    if (!text) return;

    const newMessage = {
      id: 'msg-' + Date.now(),
      sender: user?.username || 'You',
      role: 'MEMBER',
      avatarColor: 'from-[#ff5b79] to-[#d93858]',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reactions: {},
    };

    const currentChanMsgs = messages[activeChannel] || [];
    const updated = {
      ...messages,
      [activeChannel]: [...currentChanMsgs, newMessage],
    };

    saveAndBroadcast(updated);
    setInputText('');
    setShowEmojiPicker(false);
  };

  // Toggle emoji reaction
  const handleToggleReaction = (msgId, emoji) => {
    const chanMsgs = messages[activeChannel] || [];
    const updatedMsgs = chanMsgs.map((m) => {
      if (m.id === msgId) {
        const reactions = { ...(m.reactions || {}) };
        if (reactions[emoji]) {
          reactions[emoji] += 1;
        } else {
          reactions[emoji] = 1;
        }
        return { ...m, reactions };
      }
      return m;
    });

    const updated = {
      ...messages,
      [activeChannel]: updatedMsgs,
    };
    saveAndBroadcast(updated);
  };

  // Delete message (if sent by user)
  const handleDeleteMessage = (msgId) => {
    const chanMsgs = messages[activeChannel] || [];
    const updatedMsgs = chanMsgs.filter((m) => m.id !== msgId);
    const updated = {
      ...messages,
      [activeChannel]: updatedMsgs,
    };
    saveAndBroadcast(updated);
  };

  // Common emojis list
  const emojiList = ['🍪', '🔥', '❤️', '🎮', '💀', '🛹', '⛏️', '💎', '🏆', '😎', '😂', '💯', '✨'];

  // Online community members mock
  const members = [
    { name: user?.username || 'You', role: 'You', status: 'online', activity: 'In Lounge Chat', isSelf: true },
    { name: 'PixelMaster', role: 'MOD', status: 'online', activity: 'Playing Minecraft' },
    { name: 'BossSlayer', role: 'PRO', status: 'online', activity: 'Fighting Cuphead Bosses' },
    { name: 'NeonDrifter', role: 'MEMBER', status: 'online', activity: 'Tuning Drift Hunters' },
    { name: 'SkateKid99', role: 'MEMBER', status: 'idle', activity: 'Port Carverton Halfpipe' },
    { name: 'CRUM3L', role: 'BOT', status: 'online', activity: 'AI Knowledge Engine', isBot: true },
  ];

  // 1. AGE GATE SCREEN (If user selected <13 in age verification)
  if (!is13Plus) {
    return (
      <div className="w-full max-w-2xl mx-auto my-12 p-8 bg-[#1e141a] border border-[#3d1e31] rounded-3xl text-center shadow-2xl relative overflow-hidden animate-in fade-in">
        {/* Glow backdrop */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#ff5b79]/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="w-16 h-16 rounded-3xl bg-[#ff5b79]/15 border border-[#ff5b79]/30 flex items-center justify-center mx-auto mb-5 text-[#ff5b79] shadow-lg shadow-[#ff5b79]/20">
          <Lock className="w-8 h-8" />
        </div>

        <span className="px-3 py-1 rounded-full bg-[#ff5b79]/20 text-[#ff5b79] border border-[#ff5b79]/30 text-xs font-mono font-bold uppercase tracking-wider">
          Age Restricted (13+)
        </span>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3 mb-2 tracking-tight">
          C00K13 Community Chat Locked
        </h2>

        <p className="text-sm text-slate-300 leading-relaxed max-w-md mx-auto mb-6">
          Discord-style local community chat is strictly reserved for users who are <strong>13 or older</strong> in accordance with community safety guidelines.
        </p>

        <div className="p-4 bg-[#140b11] border border-[#2d1624] rounded-2xl max-w-md mx-auto text-xs text-slate-400 mb-6 text-left space-y-1.5">
          <p className="font-semibold text-slate-200 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Did you make a mistake during sign up?</span>
          </p>
          <p>
            If you are 13 or older, you can verify your age below to unlock the Discord channels immediately.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => onUpdateUserAge(true)}
            className="w-full sm:w-auto px-6 py-3 bg-[#ff5b79] hover:bg-[#ff4365] text-white font-bold text-xs rounded-xl shadow-lg shadow-[#ff5b79]/25 transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Verify I am 13 or Older</span>
          </button>

          <button
            onClick={onSwitchToGames}
            className="w-full sm:w-auto px-5 py-3 bg-[#261521] hover:bg-[#341b2c] border border-[#3d1e31] text-slate-300 hover:text-white font-medium text-xs rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <span>Back to Games</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // 2. DISCORD-STYLE CHAT INTERFACE (For 13+ Users)
  const currentChannelData = channels.find((c) => c.id === activeChannel) || channels[0];
  const activeMessages = messages[activeChannel] || [];

  return (
    <div className="w-full h-[calc(100vh-130px)] min-h-[580px] bg-[#1a0e16] border border-[#2b1722] rounded-3xl overflow-hidden shadow-2xl flex antialiased select-none text-slate-200">
      
      {/* 1. Left Channels Sidebar */}
      <div className="w-56 sm:w-60 bg-[#140b11] border-r border-[#26141f] flex flex-col justify-between shrink-0">
        <div>
          {/* Server Header */}
          <div className="h-12 px-4 border-b border-[#26141f] flex items-center justify-between font-bold text-sm text-white shadow-sm bg-[#160d13]">
            <div className="flex items-center gap-2 truncate">
              <div className="w-5 h-5 rounded-md bg-[#ff5b79]/20 flex items-center justify-center text-[#ff5b79] text-xs">
                🍪
              </div>
              <span className="truncate">C00K13 Lounge</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400" title="Server Online" />
          </div>

          {/* Channels List */}
          <div className="p-2 space-y-4 overflow-y-auto">
            {/* Text Channels Header */}
            <div>
              <div className="px-2 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                <span>Text Channels</span>
                <span className="text-[9px] px-1 py-0.2 rounded bg-[#ff5b79]/20 text-[#ff5b79] font-mono">13+</span>
              </div>

              <div className="space-y-0.5 mt-1">
                {channels.map((ch) => {
                  const isActive = activeChannel === ch.id;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => setActiveChannel(ch.id)}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all text-left group ${
                        isActive
                          ? 'bg-[#ff5b79] text-white shadow-md shadow-[#ff5b79]/20'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-[#20111b]'
                      }`}
                    >
                      <span className="text-sm shrink-0">{ch.icon}</span>
                      <span className="truncate">{ch.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Voice Rooms (Discord style) */}
            <div>
              <div className="px-2 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Voice Lounges
              </div>
              <div className="space-y-0.5 mt-1 text-slate-400 text-xs">
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-[#20111b] cursor-pointer">
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                  <span className="truncate">🔊 Squad Room 1</span>
                </div>
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-[#20111b] cursor-pointer">
                  <Volume2 className="w-4 h-4 text-sky-400" />
                  <span className="truncate">🔊 Study &amp; Chill</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Current User Discord Bottom Profile Bar */}
        <div className="h-14 bg-[#10070d] border-t border-[#26141f] px-3 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#ff5b79] to-[#d93858] flex items-center justify-center text-white font-bold text-xs uppercase shadow-sm">
              {(user?.username || 'U').charAt(0)}
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-white truncate leading-tight">
                {user?.username || 'You'}
              </p>
              <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Verified 13+</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-0.5 text-slate-400">
            <button className="p-1 hover:text-white rounded hover:bg-[#22101c]" title="Mute Mic">
              <Mic className="w-3.5 h-3.5" />
            </button>
            <button className="p-1 hover:text-white rounded hover:bg-[#22101c]" title="Deafen Audio">
              <Headphones className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Center Chat Main Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#180e15]">
        
        {/* Channel Top Header Bar */}
        <div className="h-12 border-b border-[#26141f] px-4 flex items-center justify-between bg-[#170d14] shadow-sm">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-base">{currentChannelData.icon}</span>
            <span className="font-extrabold text-sm text-white">{currentChannelData.name}</span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-xs text-slate-400 truncate max-w-md">
              {currentChannelData.topic}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowMembersList(!showMembersList)}
              title="Toggle Members Panel"
              className={`p-1.5 rounded-lg transition-colors ${
                showMembersList ? 'text-[#ff5b79] bg-[#291421]' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {/* Channel Welcome Hero Banner */}
          <div className="pt-4 pb-2 border-b border-[#26141f]/80">
            <div className="w-12 h-12 rounded-2xl bg-[#ff5b79]/20 border border-[#ff5b79]/40 flex items-center justify-center text-2xl mb-2">
              {currentChannelData.icon}
            </div>
            <h3 className="text-lg font-extrabold text-white">
              Welcome to #{currentChannelData.name}!
            </h3>
            <p className="text-xs text-slate-400">
              This is the start of the #{currentChannelData.name} channel.
            </p>
          </div>

          {/* Message List */}
          {activeMessages.map((msg) => {
            const isOwn = msg.sender === (user?.username || 'You');
            return (
              <div
                key={msg.id}
                className="flex items-start gap-3 hover:bg-[#20111b]/50 -mx-2 px-2 py-1.5 rounded-2xl group transition-colors relative"
              >
                {/* Avatar */}
                <div
                  className={`w-9 h-9 rounded-2xl bg-gradient-to-tr ${
                    msg.avatarColor || 'from-[#ff5b79] to-[#d93858]'
                  } flex items-center justify-center text-white font-bold text-xs uppercase shadow-md shrink-0`}
                >
                  {msg.sender.charAt(0)}
                </div>

                {/* Message Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-white hover:underline cursor-pointer">
                      {msg.sender}
                    </span>

                    {/* Role Pill */}
                    {msg.role && (
                      <span
                        className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded uppercase ${
                          msg.role === 'MOD'
                            ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                            : msg.role === 'PRO'
                            ? 'bg-purple-400/20 text-purple-300 border border-purple-400/30'
                            : msg.role === 'HELPER'
                            ? 'bg-sky-400/20 text-sky-300 border border-sky-400/30'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {msg.role}
                      </span>
                    )}

                    <span className="text-[10px] text-slate-500 font-mono">
                      {msg.timestamp}
                    </span>
                  </div>

                  <p className="text-xs text-slate-200 mt-0.5 leading-relaxed break-words">
                    {msg.text}
                  </p>

                  {/* Reaction Badges */}
                  {msg.reactions && Object.keys(msg.reactions).length > 0 && (
                    <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                      {Object.entries(msg.reactions).map(([emoji, count]) => (
                        <button
                          key={emoji}
                          onClick={() => handleToggleReaction(msg.id, emoji)}
                          className="px-2 py-0.5 rounded-lg bg-[#251320] hover:bg-[#341b2c] border border-[#3b192c] text-xs font-mono flex items-center gap-1 transition-all"
                        >
                          <span>{emoji}</span>
                          <span className="text-[11px] text-slate-300 font-semibold">{count}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Floating Quick Actions Bar on Hover */}
                <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#281322] border border-[#3d1e31] rounded-xl px-1.5 py-0.5 flex items-center gap-1 shadow-lg">
                  <button
                    onClick={() => handleToggleReaction(msg.id, '🍪')}
                    className="p-1 hover:scale-125 transition-transform"
                    title="React with Cookie"
                  >
                    🍪
                  </button>
                  <button
                    onClick={() => handleToggleReaction(msg.id, '🔥')}
                    className="p-1 hover:scale-125 transition-transform"
                    title="React with Fire"
                  >
                    🔥
                  </button>
                  <button
                    onClick={() => handleToggleReaction(msg.id, '❤️')}
                    className="p-1 hover:scale-125 transition-transform"
                    title="React with Heart"
                  >
                    ❤️
                  </button>

                  {isOwn && (
                    <button
                      onClick={() => handleDeleteMessage(msg.id)}
                      className="p-1 text-slate-400 hover:text-rose-400 transition-colors ml-1"
                      title="Delete message"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          <div ref={chatEndRef} />
        </div>

        {/* Message Input Box (Discord style) */}
        <div className="p-3 bg-[#160d13] border-t border-[#26141f] relative">
          {/* Quick Emoji Drawer */}
          {showEmojiPicker && (
            <div className="absolute bottom-16 left-4 bg-[#23121d] border border-[#3d1e31] rounded-2xl p-2 shadow-2xl flex items-center gap-1.5 flex-wrap max-w-xs z-30 animate-in fade-in zoom-in-95">
              {emojiList.map((em) => (
                <button
                  key={em}
                  onClick={() => {
                    setInputText((prev) => prev + em);
                    setShowEmojiPicker(false);
                  }}
                  className="p-1.5 hover:bg-[#341b2c] rounded-lg text-lg hover:scale-110 transition-transform"
                >
                  {em}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-2 text-slate-400 hover:text-amber-300 hover:bg-[#251320] rounded-xl transition-colors focus:outline-none"
              title="Add emoji reaction"
            >
              <Smile className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Message #${currentChannelData.name}... (Enter to send)`}
              className="flex-1 px-4 py-2.5 bg-[#12070e] border border-[#2b1722] focus:border-[#ff5b79] focus:ring-1 focus:ring-[#ff5b79] rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-colors"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 bg-[#ff5b79] hover:bg-[#ff4365] disabled:opacity-40 disabled:hover:bg-[#ff5b79] text-white rounded-2xl transition-all shadow-md shadow-[#ff5b79]/20 focus:outline-none shrink-0"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* 3. Right Members Panel */}
      {showMembersList && (
        <div className="w-48 bg-[#140b11] border-l border-[#26141f] p-3 hidden lg:flex flex-col shrink-0 overflow-y-auto">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Online — {members.length}
          </div>

          <div className="space-y-1">
            {members.map((m, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-[#22101c] cursor-pointer group transition-colors"
              >
                <div className="relative">
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#ff5b79] to-[#d93858] flex items-center justify-center text-white font-bold text-xs uppercase shadow-xs">
                    {m.name.charAt(0)}
                  </div>
                  <span
                    className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#140b11] ${
                      m.status === 'online' ? 'bg-emerald-400' : 'bg-amber-400'
                    }`}
                  />
                </div>

                <div className="truncate">
                  <p className="text-xs font-semibold text-slate-200 truncate group-hover:text-white flex items-center gap-1">
                    <span>{m.name}</span>
                    {m.isBot && (
                      <span className="text-[8px] px-1 rounded bg-[#ff5b79]/20 text-[#ff5b79] font-mono">
                        BOT
                      </span>
                    )}
                  </p>
                  <p className="text-[10px] text-slate-500 truncate">{m.activity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
