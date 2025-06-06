import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Send, Phone, Video, Info, Search, Plane, Calendar, ChevronRight, Package, MessageSquare, DollarSign } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockConversations, mockMessages, mockUsers, mockTrips } from '../data/mockData';
import { format } from 'date-fns';

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  timestamp: Date;
}

const ChatPage: React.FC = () => {
  const { conversationId } = useParams<{ conversationId?: string }>();
  const { currentUser } = useAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeConversation, setActiveConversation] = useState<typeof mockConversations[0] | null>(null);
  const [otherUser, setOtherUser] = useState<typeof mockUsers[0] | null>(null);
  const [relatedTrip, setRelatedTrip] = useState<typeof mockTrips[0] | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Filter conversations for current user
  const userConversations = mockConversations.filter(conv => 
    conv.participants.includes(currentUser?.id || '')
  );

  useEffect(() => {
    let selectedConversation;
    
    if (conversationId) {
      // Find the specific conversation if ID provided
      selectedConversation = userConversations.find(conv => conv.id === conversationId) || null;
    } else if (userConversations.length > 0) {
      // Default to first conversation if none specified
      selectedConversation = userConversations[0];
    }
    
    setActiveConversation(selectedConversation || null);
    
    if (selectedConversation) {
      // Get messages for this conversation
      setMessages(mockMessages[selectedConversation.id as keyof typeof mockMessages] || []);
      
      // Find the other user in this conversation
      const otherUserId = selectedConversation.participants.find(id => id !== currentUser?.id);
      const user = mockUsers.find(user => user.id === otherUserId);
      setOtherUser(user || null);
      
      // Find the related trip
      const trip = mockTrips.find(trip => trip.id === selectedConversation.tripId);
      setRelatedTrip(trip || null);
    }
  }, [conversationId, currentUser?.id]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || !activeConversation) return;
    
    // Create a new message
    const newMessage: Message = {
      id: `message-${Date.now()}`,
      conversationId: activeConversation.id,
      senderId: currentUser?.id || '',
      text: message,
      timestamp: new Date()
    };
    
    // Add to messages
    setMessages([...messages, newMessage]);
    setMessage('');
  };

  // Format date for grouping messages
  const formatMessageDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Aujourd\'hui';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Hier';
    } else {
      return format(date, 'dd MMMM yyyy');
    }
  };

  // Group messages by date
  const groupedMessages = messages.reduce((groups, message) => {
    const date = formatMessageDate(message.timestamp);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {} as Record<string, Message[]>);

  return (
    <div className="page-transition -mx-4 -my-6 flex h-[calc(100vh-4rem)] flex-col sm:-mx-6 lg:-mx-8">
      <div className="flex flex-1 overflow-hidden">
        {/* Conversations Sidebar */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} absolute inset-0 z-50 bg-white md:relative md:block md:w-80 md:flex-shrink-0 md:border-r md:border-gray-200`}>
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Messages</h2>
                <button 
                  className="md:hidden"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  ×
                </button>
              </div>
              <div className="mt-2 relative">
                <input
                  type="text"
                  placeholder="Rechercher une conversation"
                  className="form-input w-full pl-9"
                />
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-2">
              {userConversations.length > 0 ? (
                userConversations.map(conv => {
                  const otherUserId = conv.participants.find(id => id !== currentUser?.id);
                  const otherUser = mockUsers.find(user => user.id === otherUserId);
                  const trip = mockTrips.find(trip => trip.id === conv.tripId);
                  
                  return otherUser && trip ? (
                    <div
                      key={conv.id}
                      className={`mb-2 flex cursor-pointer items-start rounded-lg p-2 transition hover:bg-gray-100 ${
                        activeConversation?.id === conv.id ? 'bg-primary-50' : ''
                      }`}
                      onClick={() => {
                        setActiveConversation(conv);
                        setOtherUser(otherUser);
                        setRelatedTrip(trip);
                        setMessages(mockMessages[conv.id as keyof typeof mockMessages] || []);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <img
                        src={otherUser.avatar}
                        alt={otherUser.name}
                        className="mr-3 h-10 w-10 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <h4 className="font-medium truncate">{otherUser.name}</h4>
                          <span className="text-xs text-gray-500">
                            {format(conv.lastMessage.timestamp, 'HH:mm')}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                          <span className="truncate">{trip.from}</span>
                          <ChevronRight size={12} />
                          <span className="truncate">{trip.to}</span>
                        </div>
                        <p className="mt-1 truncate text-sm text-gray-600">
                          {conv.lastMessage.text}
                        </p>
                      </div>
                    </div>
                  ) : null;
                })
              ) : (
                <div className="p-4 text-center">
                  <MessageSquare className="mx-auto mb-2 text-gray-300" size={32} />
                  <p className="text-sm text-gray-500">Aucune conversation</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Chat Area */}
        <div className="flex flex-1 flex-col">
          {activeConversation && otherUser && relatedTrip ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between border-b border-gray-200 bg-white p-4">
                <div className="flex items-center">
                  <button 
                    className="mr-3 md:hidden"
                    onClick={() => setIsMobileMenuOpen(true)}
                  >
                    ☰
                  </button>
                  <img
                    src={otherUser.avatar}
                    alt={otherUser.name}
                    className="mr-3 h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{otherUser.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <span>{relatedTrip.from}</span>
                      <ChevronRight size={12} />
                      <span>{relatedTrip.to}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="rounded-full p-2 text-gray-500 hover:bg-gray-100">
                    <Phone size={20} />
                  </button>
                  <button className="rounded-full p-2 text-gray-500 hover:bg-gray-100">
                    <Video size={20} />
                  </button>
                  <button className="rounded-full p-2 text-gray-500 hover:bg-gray-100">
                    <Info size={20} />
                  </button>
                </div>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
                {Object.entries(groupedMessages).map(([date, dateMessages]) => (
                  <div key={date}>
                    <div className="my-4 flex items-center justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center">
                          <span className="bg-gray-50 px-2 text-xs font-medium text-gray-500">
                            {date}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {dateMessages.map((msg, index) => {
                      const isCurrentUser = msg.senderId === currentUser?.id;
                      const sender = isCurrentUser ? currentUser : otherUser;
                      
                      return (
                        <div
                          key={msg.id}
                          className={`mb-4 flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                        >
                          {!isCurrentUser && (
                            <img
                              src={sender?.avatar}
                              alt={sender?.name}
                              className="mr-2 h-8 w-8 rounded-full object-cover"
                            />
                          )}
                          <div
                            className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                              isCurrentUser
                                ? 'rounded-tr-sm bg-secondary-500 text-white'
                                : 'rounded-tl-sm bg-white'
                            }`}
                          >
                            <p>{msg.text}</p>
                            <div
                              className={`mt-1 text-right text-xs ${
                                isCurrentUser ? 'text-secondary-100' : 'text-gray-500'
                              }`}
                            >
                              {format(msg.timestamp, 'HH:mm')}
                            </div>
                          </div>
                          {isCurrentUser && (
                            <img
                              src={sender?.avatar}
                              alt={sender?.name}
                              className="ml-2 h-8 w-8 rounded-full object-cover"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Message Input */}
              <div className="border-t border-gray-200 bg-white p-4">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Écrivez votre message..."
                    className="form-input flex-grow"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 text-white hover:bg-primary-600"
                    disabled={!message.trim()}
                  >
                    <Send size={20} />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center bg-gray-50 p-4">
              <div className="text-center">
                <button 
                  className="mb-4 md:hidden btn-primary"
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  Voir les conversations
                </button>
                <MessageSquare className="mx-auto mb-4 text-gray-300" size={64} />
                <h3 className="mb-2 text-xl font-semibold">
                  {userConversations.length === 0 ? 'Aucune conversation' : 'Sélectionnez une conversation'}
                </h3>
                <p className="mb-4 text-gray-600">
                  {userConversations.length === 0 
                    ? "Vous n'avez pas encore de conversation. Contactez un voyageur pour commencer!"
                    : "Sélectionnez une conversation existante pour commencer à discuter."
                  }
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Trip Details Sidebar */}
        {activeConversation && relatedTrip && (
          <div className="hidden w-80 flex-shrink-0 border-l border-gray-200 bg-white xl:block">
            <div className="p-4">
              <h3 className="mb-4 text-lg font-semibold">Détails du trajet</h3>
              
              <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Plane size={18} className="text-secondary-500" />
                  <div className="flex items-center font-medium">
                    <span>{relatedTrip.from}</span>
                    <ChevronRight size={14} className="mx-1 text-gray-400" />
                    <span>{relatedTrip.to}</span>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-500" />
                    <div>
                      <div>Départ: {format(relatedTrip.departureDate, 'dd MMMM yyyy')}</div>
                      <div>Arrivée: {format(relatedTrip.arrivalDate, 'dd MMMM yyyy')}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Package size={16} className="text-gray-500" />
                    <div>
                      <span className="font-medium">{relatedTrip.availableWeight} kg</span> disponibles
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <DollarSign size={16} className="text-gray-500" />
                    <div>
                      <span className="font-medium">{relatedTrip.pricePerKg} {relatedTrip.currency}</span> par kg
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="mb-2 text-sm font-medium text-gray-700">Description</h4>
                <p className="text-sm text-gray-600">{relatedTrip.description}</p>
              </div>
              
              <div className="mt-6">
                <a
                  href={`/booking/${relatedTrip.id}`}
                  className="btn-primary w-full"
                >
                  Réserver ce trajet
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;