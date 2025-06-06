import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plane, Package, MessageSquare, Calendar, ChevronRight, Plus, MapPin, Clock, DollarSign, Check, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockTrips, mockBookings, mockConversations, mockUsers } from '../data/mockData';
import { format } from 'date-fns';

const DashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'trips' | 'bookings' | 'messages'>('trips');
  
  // Filter data based on current user
  const userTrips = mockTrips.filter(trip => trip.userId === currentUser?.id);
  const userBookings = mockBookings.filter(booking => booking.userId === currentUser?.id);
  const userConversations = mockConversations.filter(conv => 
    conv.participants.includes(currentUser?.id || '')
  );
  
  // Calculate total weight transported
  const totalWeightTransported = userBookings
    .filter(booking => booking.status === 'delivered')
    .reduce((total, booking) => total + booking.packageWeight, 0);
  
  return (
    <div className="page-transition">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="mb-2 text-2xl font-bold sm:text-3xl">Tableau de bord</h1>
          <p className="text-gray-600">Bienvenue, {currentUser?.name}! Gérez vos trajets et vos réservations.</p>
        </div>
        <Link to="/search" className="btn-primary flex items-center gap-2">
          <Plus size={18} />
          Nouveau trajet
        </Link>
      </div>
      
      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { 
            title: "Mes trajets", 
            value: userTrips.length, 
            icon: <Plane className="text-secondary-500" />, 
            color: "bg-secondary-50",
            link: "/search"
          },
          { 
            title: "Mes réservations", 
            value: userBookings.length, 
            icon: <Package className="text-primary-500" />, 
            color: "bg-primary-50",
            link: "#bookings"
          },
          { 
            title: "Messages", 
            value: userConversations.length, 
            icon: <MessageSquare className="text-green-500" />, 
            color: "bg-green-50",
            link: "/chat"
          },
          { 
            title: "Kg transportés", 
            value: `${totalWeightTransported.toFixed(1)}`, 
            icon: <Calendar className="text-purple-500" />, 
            color: "bg-purple-50",
            link: "#"
          },
        ].map((stat, index) => (
          <Link 
            key={index} 
            to={stat.link}
            className={`card flex items-center p-4 transition-transform hover:-translate-y-1 ${stat.color}`}
          >
            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'trips', label: 'Mes trajets', icon: <Plane size={18} /> },
            { id: 'bookings', label: 'Mes réservations', icon: <Package size={18} /> },
            { id: 'messages', label: 'Messages', icon: <MessageSquare size={18} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              className={`flex items-center gap-2 border-b-2 px-1 pb-4 pt-2 text-sm font-medium transition ${
                activeTab === tab.id 
                  ? 'border-primary-500 text-primary-500' 
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab(tab.id as any)}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Tab content */}
      <div className="mb-8">
        {activeTab === 'trips' && (
          <div className="animate-fade-in">
            {userTrips.length > 0 ? (
              <div className="space-y-4">
                {userTrips.map(trip => (
                  <div key={trip.id} className="card overflow-hidden transition-all duration-300 hover:-translate-y-1">
                    <div className="flex flex-col lg:flex-row">
                      <div className="flex-grow p-4 sm:p-6">
                        <div className="mb-4 flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                              <Plane size={20} />
                            </div>
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{trip.from}</span>
                              <ChevronRight size={16} className="text-gray-400" />
                              <span className="font-semibold">{trip.to}</span>
                            </div>
                            <div className="mt-1 text-sm text-gray-500">
                              {format(trip.departureDate, 'dd MMMM yyyy')}
                            </div>
                            <div className="mt-3 flex flex-wrap gap-3">
                              <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                                <Check size={14} /> Actif
                              </span>
                              <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                                <Package size={14} /> {trip.availableWeight} kg disponibles
                              </span>
                              <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
                                <DollarSign size={14} /> {trip.pricePerKg} {trip.currency}/kg
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{trip.description}</p>
                      </div>
                      <div className="flex items-center justify-around border-t bg-gray-50 p-4 lg:w-48 lg:flex-col lg:justify-center lg:border-l lg:border-t-0">
                        <Link 
                          to={`/trip/${trip.id}`} 
                          className="btn-sm btn-primary"
                        >
                          Détails
                        </Link>
                        <button className="btn-sm btn-outline border-gray-300 bg-white text-gray-600 hover:bg-gray-50">
                          Modifier
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
                <Plane className="mx-auto mb-4 text-gray-400" size={48} />
                <h3 className="mb-2 text-lg font-medium">Aucun trajet</h3>
                <p className="mb-4 text-gray-500">Vous n'avez pas encore publié de trajet. Créez votre premier trajet maintenant!</p>
                <Link to="/search" className="btn-primary inline-flex items-center gap-2">
                  <Plus size={18} />
                  Créer un trajet
                </Link>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'bookings' && (
          <div className="animate-fade-in">
            {userBookings.length > 0 ? (
              <div className="space-y-4">
                {userBookings.map(booking => {
                  const trip = mockTrips.find(t => t.id === booking.tripId);
                  const traveler = mockUsers.find(u => u.id === trip?.userId);
                  
                  return trip && traveler ? (
                    <div key={booking.id} className="card overflow-hidden transition-all duration-300 hover:-translate-y-1">
                      <div className="flex flex-col lg:flex-row">
                        <div className="flex-grow p-4 sm:p-6">
                          <div className="mb-4 flex items-start gap-4">
                            <img 
                              src={traveler.avatar} 
                              alt={traveler.name}
                              className="h-10 w-10 rounded-full object-cover" 
                            />
                            <div className="flex-grow">
                              <div className="font-semibold">{traveler.name}</div>
                              <div className="flex items-center gap-2">
                                <span>{trip.from}</span>
                                <ChevronRight size={14} className="text-gray-400" />
                                <span>{trip.to}</span>
                              </div>
                              <div className="mt-1 text-sm text-gray-500">
                                {format(trip.departureDate, 'dd MMMM yyyy')}
                              </div>
                              <div className="mt-3 flex flex-wrap gap-3">
                                <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                                  booking.status === 'confirmed' 
                                    ? 'bg-green-100 text-green-800' 
                                    : booking.status === 'pending'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : booking.status === 'delivered'
                                    ? 'bg-blue-100 text-blue-800'
                                    : booking.status === 'in_transit'
                                    ? 'bg-purple-100 text-purple-800'
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  <Check size={14} /> 
                                  {booking.status === 'confirmed' ? 'Confirmé' : 
                                   booking.status === 'pending' ? 'En attente' : 
                                   booking.status === 'delivered' ? 'Livré' :
                                   booking.status === 'in_transit' ? 'En transit' : 'Annulé'}
                                </span>
                                <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                                  <Package size={14} /> {booking.packageWeight} kg
                                </span>
                                <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800">
                                  <DollarSign size={14} /> {booking.totalPrice} {booking.currency}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{booking.packageDescription}</p>
                          {booking.trackingNumber && (
                            <p className="mt-2 text-xs text-gray-500">
                              Numéro de suivi: <span className="font-mono">{booking.trackingNumber}</span>
                            </p>
                          )}
                        </div>
                        <div className="flex items-center justify-around border-t bg-gray-50 p-4 lg:w-48 lg:flex-col lg:justify-center lg:border-l lg:border-t-0">
                          <Link 
                            to={`/booking/${booking.id}`} 
                            className="btn-sm btn-primary"
                          >
                            Détails
                          </Link>
                          <Link 
                            to={`/chat/${mockConversations.find(c => c.tripId === trip.id && c.participants.includes(currentUser?.id || ''))?.id || ''}`}
                            className="btn-sm btn-outline border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
                          >
                            Message
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : null;
                })}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
                <Package className="mx-auto mb-4 text-gray-400" size={48} />
                <h3 className="mb-2 text-lg font-medium">Aucune réservation</h3>
                <p className="mb-4 text-gray-500">Vous n'avez pas encore effectué de réservation. Trouvez un voyageur maintenant!</p>
                <Link to="/search" className="btn-primary inline-flex items-center gap-2">
                  <MapPin size={18} />
                  Rechercher un transporteur
                </Link>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'messages' && (
          <div className="animate-fade-in">
            {userConversations.length > 0 ? (
              <div className="space-y-4">
                {userConversations.map(conversation => {
                  const otherUserId = conversation.participants.find(id => id !== currentUser?.id);
                  const otherUser = mockUsers.find(user => user.id === otherUserId);
                  const trip = mockTrips.find(trip => trip.id === conversation.tripId);
                  
                  return otherUser && trip ? (
                    <Link key={conversation.id} to={`/chat/${conversation.id}`} className="block">
                      <div className="card overflow-hidden p-4 transition-all duration-200 hover:shadow-md sm:p-6">
                        <div className="flex items-start gap-4">
                          <img 
                            src={otherUser.avatar} 
                            alt={otherUser.name}
                            className="h-12 w-12 rounded-full object-cover" 
                          />
                          <div className="flex-grow">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold">{otherUser.name}</h4>
                              <span className="text-xs text-gray-500">
                                {format(conversation.lastMessage.timestamp, 'dd/MM/yyyy HH:mm')}
                              </span>
                            </div>
                            <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                              <MapPin size={14} />
                              <span>{trip.from}</span>
                              <ChevronRight size={14} />
                              <span>{trip.to}</span>
                              <span className="text-xs text-gray-500">({format(trip.departureDate, 'dd/MM/yyyy')})</span>
                            </div>
                            <p className="mt-2 truncate text-sm text-gray-500">{conversation.lastMessage.text}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ) : null;
                })}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
                <MessageSquare className="mx-auto mb-4 text-gray-400" size={48} />
                <h3 className="mb-2 text-lg font-medium">Aucun message</h3>
                <p className="mb-4 text-gray-500">Vous n'avez pas encore de conversation active. Contactez un voyageur pour commencer!</p>
                <Link to="/search" className="btn-primary inline-flex items-center gap-2">
                  <MapPin size={18} />
                  Rechercher un transporteur
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;