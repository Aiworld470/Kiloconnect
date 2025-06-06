import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Calendar, Package, Filter, ChevronDown, ChevronRight, ArrowRight, Plane, User, X, Star, DollarSign, Clock } from 'lucide-react';
import { mockTrips, mockUsers } from '../data/mockData';
import { format } from 'date-fns';

interface TripWithUser {
  trip: typeof mockTrips[0];
  user: typeof mockUsers[0];
}

const SearchPage: React.FC = () => {
  const [fromLocation, setFromLocation] = useState<string>('');
  const [toLocation, setToLocation] = useState<string>('');
  const [departureDate, setDepartureDate] = useState<string>('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [weightRange, setWeightRange] = useState<[number, number]>([0, 50]);
  const [sortBy, setSortBy] = useState<'date' | 'price' | 'weight' | 'rating'>('date');
  const [filteredTrips, setFilteredTrips] = useState<TripWithUser[]>([]);
  
  // Generate trips with user data
  const tripsWithUsers = mockTrips.map(trip => ({
    trip,
    user: mockUsers.find(user => user.id === trip.userId) || mockUsers[0]
  }));
  
  // Apply filters and sorting
  useEffect(() => {
    let results = tripsWithUsers;
    
    if (fromLocation) {
      results = results.filter(item => 
        item.trip.from.toLowerCase().includes(fromLocation.toLowerCase())
      );
    }
    
    if (toLocation) {
      results = results.filter(item => 
        item.trip.to.toLowerCase().includes(toLocation.toLowerCase())
      );
    }
    
    if (departureDate) {
      const selectedDate = new Date(departureDate);
      results = results.filter(item => {
        const tripDate = new Date(item.trip.departureDate);
        return tripDate.toDateString() === selectedDate.toDateString();
      });
    }
    
    // Apply price filter
    results = results.filter(item => 
      item.trip.pricePerKg >= priceRange[0] && item.trip.pricePerKg <= priceRange[1]
    );
    
    // Apply weight filter
    results = results.filter(item => 
      item.trip.availableWeight >= weightRange[0] && item.trip.availableWeight <= weightRange[1]
    );
    
    // Apply sorting
    results.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.trip.pricePerKg - b.trip.pricePerKg;
        case 'weight':
          return b.trip.availableWeight - a.trip.availableWeight;
        case 'rating':
          return (b.user.rating || 0) - (a.user.rating || 0);
        case 'date':
        default:
          return new Date(a.trip.departureDate).getTime() - new Date(b.trip.departureDate).getTime();
      }
    });
    
    setFilteredTrips(results);
  }, [fromLocation, toLocation, departureDate, priceRange, weightRange, sortBy]);
  
  // Handle price range change
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (e.target.id === 'minPrice') {
      setPriceRange([value, priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], value]);
    }
  };
  
  // Handle weight range change
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (e.target.id === 'minWeight') {
      setWeightRange([value, weightRange[1]]);
    } else {
      setWeightRange([weightRange[0], value]);
    }
  };
  
  // Clear all filters
  const clearFilters = () => {
    setFromLocation('');
    setToLocation('');
    setDepartureDate('');
    setPriceRange([0, 50]);
    setWeightRange([0, 50]);
    setSortBy('date');
  };
  
  // Popular destinations for quick search
  const popularDestinations = [
    { from: 'Paris', to: 'Dakar', flag: '🇸🇳' },
    { from: 'Bruxelles', to: 'Abidjan', flag: '🇨🇮' },
    { from: 'Montréal', to: 'Casablanca', flag: '🇲🇦' },
    { from: 'Londres', to: 'Accra', flag: '🇬🇭' },
  ];
  
  return (
    <div className="page-transition">
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-bold sm:text-3xl">Rechercher un voyage</h1>
        <p className="text-gray-600">Trouvez des voyageurs disponibles pour transporter vos colis.</p>
      </div>
      
      {/* Quick destinations */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-medium text-gray-700">Destinations populaires</h3>
        <div className="flex flex-wrap gap-2">
          {popularDestinations.map((dest, index) => (
            <button
              key={index}
              className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm transition hover:border-primary-500 hover:bg-primary-50"
              onClick={() => {
                setFromLocation(dest.from);
                setToLocation(dest.to);
              }}
            >
              <span>{dest.flag}</span>
              <span>{dest.from} → {dest.to}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Search Form */}
      <div className="mb-8 rounded-xl bg-white p-4 shadow-md sm:p-6">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="form-group">
            <label htmlFor="fromLocation" className="form-label">Départ</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="fromLocation"
                className="form-input pl-10"
                placeholder="Ville ou pays de départ"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="toLocation" className="form-label">Destination</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="toLocation"
                className="form-input pl-10"
                placeholder="Ville ou pays d'arrivée"
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="departureDate" className="form-label">Date</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                id="departureDate"
                className="form-input pl-10"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-end">
            <button 
              type="button" 
              className="btn-primary flex w-full items-center justify-center gap-2"
              onClick={() => {}}
            >
              <Search size={18} />
              <span className="hidden sm:inline">Rechercher</span>
            </button>
          </div>
        </div>
        
        <div className="mt-4">
          <button 
            type="button" 
            className="flex items-center gap-2 text-sm font-medium text-secondary-600 hover:text-secondary-500"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <Filter size={16} />
            Filtres avancés
            <ChevronDown size={16} className={`transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {filterOpen && (
            <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <div className="mb-4 grid gap-6 md:grid-cols-2">
                <div>
                  <label className="form-label">Prix par kg (€)</label>
                  <div className="flex items-center gap-4">
                    <div className="w-1/2">
                      <input 
                        type="number" 
                        id="minPrice"
                        className="form-input" 
                        placeholder="Min"
                        min="0" 
                        max={priceRange[1]}
                        value={priceRange[0]}
                        onChange={handlePriceChange}
                      />
                    </div>
                    <span>-</span>
                    <div className="w-1/2">
                      <input 
                        type="number" 
                        id="maxPrice"
                        className="form-input" 
                        placeholder="Max"
                        min={priceRange[0]} 
                        value={priceRange[1]}
                        onChange={handlePriceChange}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="form-label">Poids disponible (kg)</label>
                  <div className="flex items-center gap-4">
                    <div className="w-1/2">
                      <input 
                        type="number" 
                        id="minWeight"
                        className="form-input" 
                        placeholder="Min"
                        min="0" 
                        max={weightRange[1]}
                        value={weightRange[0]}
                        onChange={handleWeightChange}
                      />
                    </div>
                    <span>-</span>
                    <div className="w-1/2">
                      <input 
                        type="number" 
                        id="maxWeight"
                        className="form-input" 
                        placeholder="Max"
                        min={weightRange[0]} 
                        value={weightRange[1]}
                        onChange={handleWeightChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  className="btn border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  onClick={clearFilters}
                >
                  <X size={16} className="mr-1" />
                  Effacer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Results */}
      <div>
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold">
            {filteredTrips.length} {filteredTrips.length === 1 ? 'résultat trouvé' : 'résultats trouvés'}
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Trier par:</span>
            <select 
              className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="date">Date (plus proche)</option>
              <option value="price">Prix (croissant)</option>
              <option value="weight">Poids disponible</option>
              <option value="rating">Évaluation</option>
            </select>
          </div>
        </div>
        
        <div className="space-y-6">
          {filteredTrips.length > 0 ? (
            filteredTrips.map(({ trip, user }) => (
              <div key={trip.id} className="card overflow-hidden transition-all duration-300 hover:-translate-y-1">
                <div className="flex flex-col lg:flex-row">
                  <div className="flex-grow p-4 sm:p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="h-12 w-12 rounded-full object-cover" 
                      />
                      <div className="flex-grow">
                        <Link to={`/profile/${user.id}`} className="font-semibold hover:text-primary-500">{user.name}</Link>
                        <div className="flex items-center gap-1 text-sm text-yellow-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              size={14} 
                              fill={i < Math.floor(user.rating || 0) ? 'currentColor' : 'none'} 
                              className={i < Math.floor(user.rating || 0) ? 'text-yellow-500' : 'text-gray-300'} 
                            />
                          ))}
                          <span className="ml-1 text-gray-700">{user.rating}</span>
                          <span className="ml-2 text-gray-500">({user.trips} voyages)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col lg:flex-row lg:gap-12">
                      <div className="mb-4 lg:mb-0">
                        <div className="mb-3 flex items-center gap-2 text-lg font-medium">
                          <Plane size={18} className="text-secondary-500" />
                          <div className="flex items-center">
                            <span>{trip.from}</span>
                            <ChevronRight size={16} className="mx-1 text-gray-400" />
                            <span>{trip.to}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-gray-400" />
                            <span>Départ: {format(trip.departureDate, 'dd MMMM yyyy')}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Package size={16} className="text-gray-400" />
                            <span>Poids disponible: {trip.availableWeight} kg</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign size={16} className="text-gray-400" />
                            <span>Prix: {trip.pricePerKg} {trip.currency}/kg</span>
                          </div>
                          {trip.airline && trip.flightNumber && (
                            <div className="flex items-center gap-2">
                              <Clock size={16} className="text-gray-400" />
                              <span>Vol {trip.airline} {trip.flightNumber}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="lg:border-l lg:border-gray-200 lg:pl-12">
                        <h4 className="mb-2 font-medium">Description</h4>
                        <p className="text-sm text-gray-600">{trip.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-around border-t bg-gray-50 p-4 lg:w-48 lg:flex-col lg:justify-center lg:border-l lg:border-t-0">
                    <Link 
                      to={`/booking/${trip.id}`} 
                      className="btn-sm btn-primary lg:w-full"
                    >
                      Réserver
                    </Link>
                    <Link 
                      to={`/chat`} 
                      className="btn-sm btn-outline border-gray-300 bg-white text-gray-600 hover:bg-gray-50 lg:mt-3 lg:w-full"
                    >
                      Contacter
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
              <Plane className="mx-auto mb-4 text-gray-400" size={48} />
              <h3 className="mb-2 text-lg font-medium">Aucun trajet trouvé</h3>
              <p className="mb-4 text-gray-500">
                {fromLocation || toLocation || departureDate 
                  ? "Aucun trajet ne correspond à vos critères. Essayez de modifier votre recherche."
                  : "Utilisez les filtres ci-dessus pour rechercher des trajets disponibles."
                }
              </p>
              <button 
                className="btn-outline border-primary-500 text-primary-500"
                onClick={clearFilters}
              >
                Effacer les filtres
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;