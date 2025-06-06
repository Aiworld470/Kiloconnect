import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Package, Mail, Phone, Globe, Edit, Star, MessageSquare, Clock, ChevronRight, Plane, Shield, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockUsers, mockTrips, mockReviews } from '../data/mockData';
import { format } from 'date-fns';

const ProfilePage: React.FC = () => {
  const { currentUser } = useAuth();
  const { userId } = useParams<{ userId?: string }>();
  const [activeTab, setActiveTab] = useState<'trips' | 'reviews'>('trips');

  // If userId is provided, show that user's profile, otherwise show current user's profile
  const profileUserId = userId || currentUser?.id;
  const isOwnProfile = !userId || userId === currentUser?.id;

  // Find the user profile to display
  const profileUser = mockUsers.find(user => user.id === profileUserId);
  
  // Get user's trips
  const userTrips = mockTrips.filter(trip => trip.userId === profileUserId);
  
  // Get user's reviews
  const userReviews = mockReviews.filter(review => review.reviewedUserId === profileUserId);

  // If user is not found, show a message
  if (!profileUser) {
    return (
      <div className="flex items-center justify-center p-10">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700">Utilisateur non trouvé</h2>
          <p className="mt-2 text-gray-500">Cet utilisateur n'existe pas ou a été supprimé.</p>
          <Link to="/dashboard" className="mt-4 inline-block text-primary-500 hover:underline">
            Retour au tableau de bord
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-transition">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - User Info */}
        <div className="lg:col-span-1">
          <div className="card overflow-hidden">
            {/* Cover Photo */}
            <div className="h-32 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
            
            {/* Profile Info */}
            <div className="-mt-12 px-4 pb-6 sm:px-6">
              <div className="flex justify-between">
                <img 
                  src={profileUser.avatar} 
                  alt={profileUser.name} 
                  className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-md" 
                />
                {isOwnProfile && (
                  <button className="mt-14 flex items-center gap-2 rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-200">
                    <Edit size={14} />
                    Modifier
                  </button>
                )}
              </div>
              
              <div className="mt-3">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold">{profileUser.name}</h2>
                  {profileUser.verified && (
                    <CheckCircle size={20} className="text-primary-500" title="Profil vérifié" />
                  )}
                </div>
                
                <div className="mb-3 flex items-center gap-1 text-yellow-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      fill={i < Math.floor(profileUser.rating || 0) ? 'currentColor' : 'none'}
                      className={i < Math.floor(profileUser.rating || 0) ? 'text-yellow-500' : 'text-gray-300'} 
                    />
                  ))}
                  <span className="ml-1 text-sm font-medium text-gray-700">
                    {profileUser.rating} ({userReviews.length} avis)
                  </span>
                </div>
                
                <p className="mb-4 text-sm text-gray-600">{profileUser.bio}</p>
                
                <div className="space-y-2 border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>Membre depuis {format(profileUser.joinedDate, 'MMMM yyyy')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Plane className="h-4 w-4 text-gray-500" />
                    <span>{userTrips.length} trajets publiés</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Package className="h-4 w-4 text-gray-500" />
                    <span>{profileUser.trips} voyages effectués</span>
                  </div>
                  {profileUser.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{profileUser.phone}</span>
                    </div>
                  )}
                  {profileUser.languages && (
                    <div className="flex items-center gap-2 text-sm">
                      <Globe className="h-4 w-4 text-gray-500" />
                      <span>{profileUser.languages.join(', ')}</span>
                    </div>
                  )}
                </div>
                
                {profileUser.verified && (
                  <div className="mt-4 rounded-lg bg-green-50 p-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-green-800">
                      <Shield size={16} />
                      <span>Profil vérifié</span>
                    </div>
                    <p className="mt-1 text-xs text-green-600">
                      Identité et documents vérifiés par KiloConnect
                    </p>
                  </div>
                )}
                
                {!isOwnProfile && (
                  <div className="mt-6 space-y-2">
                    <Link to={`/chat`} className="btn-primary w-full">
                      <MessageSquare size={16} className="mr-2" />
                      Contacter
                    </Link>
                    <button className="btn-outline w-full border-gray-300 text-gray-600">
                      <Mail size={16} className="mr-2" />
                      Signaler
                    </button>
                  </div>
                )}
                
                {isOwnProfile && (
                  <div className="mt-6">
                    <Link to="/search" className="btn-primary w-full">
                      <Plane size={16} className="mr-2" />
                      Poster un trajet
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column - Tabs Content */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="mb-6 border-b border-gray-200">
            <nav className="flex space-x-8">
              {[
                { id: 'trips', label: 'Trajets', icon: <Plane size={18} />, count: userTrips.length },
                { id: 'reviews', label: 'Avis', icon: <Star size={18} />, count: userReviews.length }
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
                  <span className="ml-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs">
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>
          
          {/* Tab content */}
          {activeTab === 'trips' && (
            <div className="animate-fade-in space-y-4">
              {userTrips.length > 0 ? (
                userTrips.map(trip => (
                  <div key={trip.id} className="card overflow-hidden transition-all duration-300 hover:-translate-y-1">
                    <div className="p-4 sm:p-6">
                      <div className="mb-2 flex items-center gap-2 font-medium">
                        <Plane size={18} className="text-secondary-500" />
                        <span>{trip.from}</span>
                        <ChevronRight size={14} className="text-gray-400" />
                        <span>{trip.to}</span>
                      </div>
                      
                      <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar size={15} className="text-gray-400" />
                          <span>{format(trip.departureDate, 'dd MMMM yyyy')}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Package size={15} className="text-gray-400" />
                          <span>{trip.availableWeight} kg disponibles</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Globe size={15} className="text-gray-400" />
                          <span>{trip.pricePerKg} {trip.currency}/kg</span>
                        </div>
                      </div>
                      
                      {trip.airline && trip.flightNumber && (
                        <div className="mb-3 text-sm text-gray-500">
                          Vol {trip.airline} {trip.flightNumber}
                        </div>
                      )}
                      
                      <p className="mb-4 text-sm text-gray-600">{trip.description}</p>
                      
                      <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                        {!isOwnProfile && (
                          <Link 
                            to={`/booking/${trip.id}`} 
                            className="btn-sm btn-primary"
                          >
                            Réserver
                          </Link>
                        )}
                        {isOwnProfile && (
                          <button className="btn-sm btn-outline border-gray-300 text-gray-600">
                            Modifier
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
                  <Plane className="mx-auto mb-4 text-gray-400" size={48} />
                  <h3 className="mb-2 text-lg font-medium">Aucun trajet</h3>
                  <p className="text-gray-500">
                    {isOwnProfile 
                      ? "Vous n'avez pas encore publié de trajet." 
                      : `${profileUser.name} n'a pas encore publié de trajet.`}
                  </p>
                  {isOwnProfile && (
                    <Link to="/search" className="mt-4 inline-block text-primary-500 hover:underline">
                      Créer un trajet
                    </Link>
                  )}
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div className="animate-fade-in space-y-6">
              {userReviews.length > 0 ? (
                userReviews.map(review => {
                  const reviewer = mockUsers.find(user => user.id === review.reviewerId);
                  
                  return reviewer ? (
                    <div key={review.id} className="card p-4 sm:p-6">
                      <div className="flex items-start gap-4">
                        <img 
                          src={reviewer.avatar} 
                          alt={reviewer.name}
                          className="h-10 w-10 rounded-full object-cover" 
                        />
                        <div className="flex-grow">
                          <div className="mb-1 flex items-center justify-between">
                            <h4 className="font-medium">{reviewer.name}</h4>
                            <span className="text-xs text-gray-500">{format(review.createdAt, 'dd MMMM yyyy')}</span>
                          </div>
                          <div className="mb-2 flex text-yellow-500">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                size={16} 
                                fill={i < review.rating ? 'currentColor' : 'none'} 
                                className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'} 
                              />
                            ))}
                          </div>
                          <p className="text-sm text-gray-600">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ) : null;
                })
              ) : (
                <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
                  <Star className="mx-auto mb-4 text-gray-400" size={48} />
                  <h3 className="mb-2 text-lg font-medium">Aucun avis</h3>
                  <p className="text-gray-500">
                    {isOwnProfile 
                      ? "Vous n'avez pas encore reçu d'avis." 
                      : `${profileUser.name} n'a pas encore reçu d'avis.`}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;