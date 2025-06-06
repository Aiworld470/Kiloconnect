import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Plane, Calendar, Package, MapPin, DollarSign, CreditCard, ChevronRight, ArrowLeft, Check, User, Lock, Edit, ShieldCheck, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockTrips, mockUsers } from '../data/mockData';
import { format } from 'date-fns';

type BookingStep = 'details' | 'payment' | 'confirmation';

const BookingPage: React.FC = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState<BookingStep>('details');
  const [packageWeight, setPackageWeight] = useState<number>(1);
  const [packageDescription, setPackageDescription] = useState<string>('');
  const [pickupAddress, setPickupAddress] = useState<string>('');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  
  // Find the trip
  const trip = mockTrips.find(t => t.id === tripId);
  // Find the traveler
  const traveler = trip ? mockUsers.find(u => u.id === trip.userId) : null;
  
  // Calculate total price
  const totalPrice = trip ? packageWeight * trip.pricePerKg : 0;
  const serviceFee = totalPrice * 0.05; // 5% service fee
  const finalPrice = totalPrice + serviceFee;
  
  // Redirect if trip or traveler not found
  useEffect(() => {
    if (!trip || !traveler) {
      navigate('/search');
    }
  }, [trip, traveler, navigate]);
  
  // Handle form submission
  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
    window.scrollTo(0, 0);
  };
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep('confirmation');
      window.scrollTo(0, 0);
    }, 2000);
  };
  
  if (!trip || !traveler) {
    return null;
  }
  
  return (
    <div className="page-transition">
      {/* Breadcrumbs */}
      <nav className="mb-4 flex items-center text-sm">
        <Link to="/search" className="flex items-center gap-1 text-gray-500 hover:text-primary-500">
          <ArrowLeft size={14} />
          Retour à la recherche
        </Link>
      </nav>
      
      {/* Page header */}
      <div className="mb-6">
        <h1 className="mb-2 text-2xl font-bold sm:text-3xl">
          Réservation de trajet
        </h1>
        <p className="text-gray-600">
          {trip.from} → {trip.to} | {format(trip.departureDate, 'dd MMMM yyyy')}
        </p>
      </div>
      
      {/* Progress steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[
            { id: 'details', label: 'Détails du colis' },
            { id: 'payment', label: 'Paiement' },
            { id: 'confirmation', label: 'Confirmation' }
          ].map((stepItem, index) => (
            <React.Fragment key={stepItem.id}>
              <div className="flex flex-col items-center">
                <div 
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium ${
                    step === stepItem.id
                      ? 'bg-primary-500 text-white'
                      : step === 'payment' && stepItem.id === 'details'
                      ? 'bg-primary-500 text-white'
                      : step === 'confirmation'
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step === 'confirmation' || (step === 'payment' && stepItem.id === 'details') ? (
                    <Check size={20} />
                  ) : (
                    index + 1
                  )}
                </div>
                <span className="mt-2 text-xs font-medium sm:text-sm">{stepItem.label}</span>
              </div>
              
              {index < 2 && (
                <div 
                  className={`h-1 w-20 flex-grow ${
                    (step === 'payment' && index === 0) ||
                    (step === 'confirmation') 
                      ? 'bg-primary-500' 
                      : 'bg-gray-200'
                  }`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2">
          {/* Package details step */}
          {step === 'details' && (
            <div className="card p-4 sm:p-6">
              <h2 className="mb-4 text-xl font-semibold">Détails du colis</h2>
              
              <form onSubmit={handleDetailsSubmit}>
                <div className="form-group">
                  <label htmlFor="packageWeight" className="form-label">
                    Poids du colis (kg) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="packageWeight"
                    className="form-input"
                    min="0.1"
                    step="0.1"
                    max={trip.availableWeight}
                    value={packageWeight}
                    onChange={(e) => setPackageWeight(parseFloat(e.target.value))}
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Maximum disponible: {trip.availableWeight} kg
                  </p>
                </div>
                
                <div className="form-group">
                  <label htmlFor="packageDescription" className="form-label">
                    Description du contenu <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="packageDescription"
                    rows={3}
                    className="form-input"
                    placeholder="Décrivez le contenu de votre colis (vêtements, documents, cadeaux...)"
                    value={packageDescription}
                    onChange={(e) => setPackageDescription(e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="pickupAddress" className="form-label">
                    Adresse de récupération <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="pickupAddress"
                    className="form-input"
                    placeholder="Adresse complète où le voyageur pourra récupérer le colis"
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="deliveryAddress" className="form-label">
                    Adresse de livraison <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="deliveryAddress"
                    className="form-input"
                    placeholder="Adresse complète où le colis devra être livré"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    required
                  />
                </div>
                
                <div className="mt-6 flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mt-1"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    required
                  />
                  <label htmlFor="terms" className="text-sm">
                    J'accepte les <a href="#" className="text-secondary-500 hover:underline">conditions générales</a> et 
                    je certifie que le contenu de mon colis respecte les lois et réglementations en vigueur.
                  </label>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={!acceptedTerms}
                  >
                    Continuer vers le paiement
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Payment step */}
          {step === 'payment' && (
            <div className="card p-4 sm:p-6">
              <h2 className="mb-4 text-xl font-semibold">Paiement</h2>
              
              <form onSubmit={handlePaymentSubmit}>
                <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Lock size={16} className="text-green-500" />
                    <span>Paiement sécurisé</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Votre paiement est sécurisé et ne sera versé au transporteur qu'après la confirmation 
                    de la bonne réception de votre colis.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-3 font-medium">Mode de paiement</h3>
                    
                    {/* Payment methods */}
                    <div className="space-y-3">
                      {['card', 'paypal', 'applepay'].map((method) => (
                        <label 
                          key={method}
                          className="flex cursor-pointer items-center rounded-lg border border-gray-300 p-3 transition hover:border-primary-500"
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method}
                            className="mr-3"
                            defaultChecked={method === 'card'}
                          />
                          {method === 'card' && (
                            <div className="flex items-center">
                              <CreditCard size={20} className="mr-2 text-secondary-500" />
                              <span>Carte bancaire</span>
                            </div>
                          )}
                          {method === 'paypal' && (
                            <div className="flex items-center">
                              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none">
                                <path d="M7.4 5H20.8C21.3 5 21.8 5.2 22.1 5.6C22.4 5.9 22.6 6.4 22.5 6.9L20.2 18.9C20.1 19.7 19.4 20.3 18.6 20.3H5.1L5.9 16.3H7.4H16.6L18.6 6H7.4V5Z" fill="#002F86"/>
                                <path d="M17.5 13.8L18.6 6H7.4V5H20.8C21.3 5 21.8 5.2 22.1 5.6C22.4 5.9 22.6 6.4 22.5 6.9L20.2 18.9C20.1 19.7 19.4 20.3 18.6 20.3H5.1" stroke="#002F86" strokeWidth="1.5"/>
                                <path d="M1.5 2H6.4L7.4 5M7.4 5V6M7.4 5H20.8C21.3 5 21.8 5.2 22.1 5.6C22.4 5.9 22.6 6.4 22.5 6.9L20.2 18.9C20.1 19.7 19.4 20.3 18.6 20.3H5.1M7.4 6H18.6L16.6 16.3H7.4M7.4 6V16.3M5.9 16.3L5.1 20.3M5.9 16.3H7.4" stroke="#0079C1" strokeWidth="1.5"/>
                              </svg>
                              <span>PayPal</span>
                            </div>
                          )}
                          {method === 'applepay' && (
                            <div className="flex items-center">
                              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.6 8.4C7.3 8.4 8.1 7.9 8.6 7.2C9 6.6 9.3 5.8 9.2 5C8.5 5.1 7.6 5.6 7.1 6.3C6.7 6.9 6.4 7.7 6.5 8.4C6.5 8.4 6.6 8.4 6.6 8.4Z" fill="black"/>
                                <path d="M9.2 8.8C8.2 8.8 7.3 9.4 6.8 9.4C6.2 9.4 5.4 8.9 4.6 8.9C3.5 8.9 2.3 9.8 1.6 11.1C0.3 13.8 1.3 18 2.6 20.2C3.2 21.3 4 22.5 5 22.5C5.9 22.5 6.3 21.9 7.3 21.9C8.4 21.9 8.7 22.5 9.7 22.5C10.7 22.5 11.4 21.4 12 20.3C12.7 19.1 13 17.9 13 17.8C13 17.8 11.1 17 11.1 14.9C11.1 13.1 12.6 12.1 12.7 12C11.8 10.7 10.4 10.6 9.9 10.6C8.9 8.8 9.2 8.8 9.2 8.8Z" fill="black"/>
                                <path d="M18.9 5C19.9 5 22.1 5.8 22.1 8.6C22.1 11.4 19.4 12.2 19.3 12.2C19.3 12.2 19.7 13.2 20.5 14.3C21.2 15.3 22 16.4 22 16.4L20.4 16.5C20.4 16.5 19.5 15.2 18.8 14.3C18.1 13.4 17.3 12.4 16.2 12.4H15.8V16.5H14.1V5H18.9ZM19.4 6.6H16V10.6H19.3C20.3 10.6 20.5 9.4 20.5 8.6C20.5 7.8 20.2 6.6 19.4 6.6Z" fill="black"/>
                              </svg>
                              <span>Apple Pay</span>
                            </div>
                          )}
                        </label>
                      ))}
                    </div>
                    
                    {/* Card details form */}
                    <div className="mt-4 space-y-4">
                      <div className="form-group">
                        <label className="form-label">Numéro de carte</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="form-group">
                          <label className="form-label">Date d'expiration</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="MM/AA"
                            maxLength={5}
                          />
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">Code de sécurité (CVC)</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="123"
                            maxLength={4}
                          />
                        </div>
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">Nom sur la carte</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="mb-3 font-medium">Adresse de facturation</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{currentUser?.name}</p>
                        <p className="text-sm text-gray-600">123 Rue Example, Paris, France</p>
                      </div>
                      <button className="flex items-center gap-1 text-sm font-medium text-secondary-500 hover:text-secondary-600">
                        <Edit size={14} />
                        Modifier
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-between">
                  <button
                    type="button"
                    className="btn border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    onClick={() => setStep('details')}
                  >
                    Retour
                  </button>
                  
                  <button
                    type="submit"
                    className="btn-primary flex items-center justify-center gap-2"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Traitement en cours...
                      </>
                    ) : (
                      <>
                        <Lock size={16} />
                        Payer {finalPrice.toFixed(2)} €
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Confirmation step */}
          {step === 'confirmation' && (
            <div className="card p-4 sm:p-6">
              <div className="mb-6 flex flex-col items-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Check size={32} className="text-green-500" />
                </div>
                <h2 className="mb-2 text-xl font-semibold text-green-700">Réservation confirmée !</h2>
                <p className="text-center text-gray-600">
                  Votre réservation a été confirmée. Nous avons envoyé les détails de la réservation à votre email.
                </p>
              </div>
              
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <h3 className="mb-3 font-medium">Détails de la réservation</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <User size={16} className="mt-0.5 text-gray-500" />
                    <div>
                      <span className="text-sm font-medium">Transporteur:</span>
                      <p>{traveler.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Plane size={16} className="mt-0.5 text-gray-500" />
                    <div>
                      <span className="text-sm font-medium">Trajet:</span>
                      <p>{trip.from} → {trip.to}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Calendar size={16} className="mt-0.5 text-gray-500" />
                    <div>
                      <span className="text-sm font-medium">Date:</span>
                      <p>{format(trip.departureDate, 'dd MMMM yyyy')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Package size={16} className="mt-0.5 text-gray-500" />
                    <div>
                      <span className="text-sm font-medium">Colis:</span>
                      <p>{packageWeight} kg - {packageDescription}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <DollarSign size={16} className="mt-0.5 text-gray-500" />
                    <div>
                      <span className="text-sm font-medium">Total payé:</span>
                      <p>{finalPrice.toFixed(2)} {trip.currency}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 rounded-lg border border-gray-200 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-500">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium">Que se passe-t-il maintenant ?</h4>
                    <ol className="mt-2 list-inside space-y-2 text-sm text-gray-600">
                      <li>1. Le transporteur a été notifié et prendra contact avec vous.</li>
                      <li>2. Organisez la remise du colis avant la date du départ.</li>
                      <li>3. Le transporteur vous tiendra informé de l'avancement de la livraison.</li>
                      <li>4. À la livraison, confirmez la bonne réception pour débloquer le paiement.</li>
                    </ol>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-between">
                <Link to="/chat" className="btn-outline flex items-center justify-center gap-2">
                  <MessageSquare size={16} />
                  Contacter le transporteur
                </Link>
                
                <Link to="/dashboard" className="btn-primary">
                  Voir mes réservations
                </Link>
              </div>
            </div>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <div className="card p-4 sm:p-6">
              <h3 className="mb-4 text-lg font-semibold">Résumé</h3>
              
              <div className="mb-4 flex items-center gap-3">
                <img
                  src={traveler.avatar}
                  alt={traveler.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <Link to={`/profile/${traveler.id}`} className="font-medium hover:text-primary-500">
                    {traveler.name}
                  </Link>
                  <div className="flex items-center gap-1 text-sm">
                    <div className="flex text-yellow-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          size={12} 
                          fill={i < Math.floor(traveler.rating || 0) ? 'currentColor' : 'none'} 
                          className={i < Math.floor(traveler.rating || 0) ? 'text-yellow-500' : 'text-gray-300'} 
                        />
                      ))}
                    </div>
                    <span className="text-gray-600">({traveler.rating})</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-4 space-y-3 border-b border-gray-200 pb-4 text-sm">
                <div className="flex items-center gap-2">
                  <Plane size={16} className="text-gray-500" />
                  <div className="flex items-center">
                    <span>{trip.from}</span>
                    <ChevronRight size={14} className="mx-1 text-gray-400" />
                    <span>{trip.to}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-gray-500" />
                  <span>{format(trip.departureDate, 'dd MMMM yyyy')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package size={16} className="text-gray-500" />
                  <span>{step !== 'details' ? packageWeight : trip.availableWeight} kg</span>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Prix ({step !== 'details' ? packageWeight : 1} kg × {trip.pricePerKg} €)</span>
                  <span>{totalPrice.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between">
                  <span>Frais de service (5%)</span>
                  <span>{serviceFee.toFixed(2)} €</span>
                </div>
                <div className="mt-2 flex justify-between border-t border-gray-200 pt-2 font-semibold">
                  <span>Total</span>
                  <span>{finalPrice.toFixed(2)} €</span>
                </div>
              </div>
              
              <div className="mt-6">
                {step === 'details' && (
                  <div className="rounded-lg bg-primary-50 p-3 text-xs text-primary-700">
                    <p className="flex items-start gap-1.5">
                      <ShieldCheck size={16} className="flex-shrink-0" />
                      <span>
                        Le paiement est sécurisé et ne sera versé au transporteur qu'après confirmation de la 
                        livraison de votre colis.
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;