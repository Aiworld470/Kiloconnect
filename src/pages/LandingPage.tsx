import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Plane, MapPin, Calendar, ArrowRight, Star, MessageSquare, ShieldCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/landing/Header';

const LandingPage: React.FC = () => {
  const { currentUser } = useAuth();
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-secondary-600 to-secondary-500 py-16 text-white md:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2773522/pexels-photo-2773522.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')] bg-cover bg-center opacity-20"></div>
        </div>
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 animate-slide-down leading-tight">
              Connectez la diaspora et transportez vos colis
            </h1>
            <p className="mb-8 animate-slide-down text-lg opacity-90 md:text-xl">
              KiloConnect met en relation les voyageurs et les personnes ayant besoin d'envoyer des colis. Économisez sur les frais d'expédition et aidez votre communauté.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/search" className="btn-primary btn-lg w-full animate-slide-up delay-100 sm:w-auto">
                <MapPin size={18} />
                <span className="ml-2">Chercher un transporteur</span>
              </Link>
              <Link to={currentUser ? "/dashboard" : "/auth"} className="btn-outline btn-lg w-full animate-slide-up bg-white delay-200 sm:w-auto">
                <Plane size={18} />
                <span className="ml-2">Poster un trajet</span>
              </Link>
            </div>
          </div>
          
          <div className="mt-16 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[
              { icon: <Package />, text: "10 000+ colis transportés" },
              { icon: <Plane />, text: "5 000+ voyageurs actifs" },
              { icon: <Star />, text: "4.8/5 note moyenne" },
              { icon: <MapPin />, text: "120+ pays desservis" }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="flex animate-slide-up items-center justify-center gap-2 rounded-lg bg-white/10 p-4 backdrop-blur-sm"
                style={{ animationDelay: `${(index + 3) * 100}ms` }}
              >
                <span className="text-primary-400">{stat.icon}</span>
                <span className="font-medium">{stat.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How it works */}
      <section className="py-16">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4">Comment ça marche</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              KiloConnect vous permet de trouver facilement des voyageurs pour transporter vos colis ou de proposer vos services de transport lors de vos voyages.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <MapPin size={32} className="text-secondary-500" />,
                title: "Recherchez un trajet",
                description: "Trouvez un voyageur qui se rend à votre destination en utilisant notre système de recherche avancé."
              },
              {
                icon: <MessageSquare size={32} className="text-primary-500" />,
                title: "Contactez le voyageur",
                description: "Discutez des détails de l'envoi, du volume, du poids et négociez le prix du transport."
              },
              {
                icon: <ShieldCheck size={32} className="text-success-500" />,
                title: "Réservez en toute sécurité",
                description: "Effectuez le paiement via notre plateforme sécurisée et suivez votre colis jusqu'à destination."
              }
            ].map((step, index) => (
              <div key={index} className="card p-6 transition-transform duration-300 hover:-translate-y-1">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  {step.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured destinations */}
      <section className="bg-gray-50 py-16">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4">Destinations populaires</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Découvrez nos trajets les plus demandés et rejoignez notre communauté mondiale.
            </p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                image: "https://images.pexels.com/photos/2570063/pexels-photo-2570063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                from: "Paris",
                to: "Dakar",
                count: "150+ trajets disponibles"
              },
              {
                image: "https://images.pexels.com/photos/2193300/pexels-photo-2193300.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                from: "Bruxelles",
                to: "Abidjan",
                count: "82+ trajets disponibles"
              },
              {
                image: "https://images.pexels.com/photos/2835562/pexels-photo-2835562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                from: "Montréal",
                to: "Casablanca",
                count: "95+ trajets disponibles"
              },
              {
                image: "https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                from: "Lyon",
                to: "Cotonou",
                count: "63+ trajets disponibles"
              },
              {
                image: "https://images.pexels.com/photos/2406731/pexels-photo-2406731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                from: "Londres",
                to: "Douala",
                count: "78+ trajets disponibles"
              },
              {
                image: "https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                from: "New York",
                to: "Tunis",
                count: "110+ trajets disponibles"
              }
            ].map((destination, index) => (
              <Link to="/search" key={index} className="group overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={destination.image} 
                    alt={`${destination.from} to ${destination.to}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 w-full p-4 text-white">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{destination.from}</span>
                      <ArrowRight size={16} />
                      <span className="font-semibold">{destination.to}</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-200">{destination.count}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Link to="/search" className="btn-secondary">
              Voir toutes les destinations
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4">Ce que disent nos utilisateurs</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Découvrez les expériences de notre communauté de voyageurs et expéditeurs.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Aminata D.",
                role: "Expéditrice",
                avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                quote: "Grâce à KiloConnect, j'ai pu envoyer des cadeaux à ma famille au Sénégal à un prix abordable. Le service est rapide et les voyageurs sont très fiables."
              },
              {
                name: "Jean-Pierre K.",
                role: "Voyageur",
                avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                quote: "Je voyage régulièrement entre Paris et Kinshasa. KiloConnect me permet de rentabiliser mes voyages tout en aidant ma communauté. C'est gagnant-gagnant!"
              },
              {
                name: "Sophie M.",
                role: "Expéditrice",
                avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                quote: "J'ai pu envoyer des médicaments urgents à ma mère à Abidjan en seulement 3 jours, alors que les services postaux traditionnels auraient pris des semaines."
              }
            ].map((testimonial, index) => (
              <div key={index} className="card p-6">
                <div className="mb-4 flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600">"{testimonial.quote}"</p>
                <div className="mt-4 flex text-primary-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="bg-primary-500 py-16 text-white">
        <div className="container text-center">
          <h2 className="mb-4">Prêt à rejoindre notre communauté?</h2>
          <p className="mx-auto mb-8 max-w-2xl opacity-90">
            Créez votre compte gratuitement et commencez à envoyer ou transporter des colis dès aujourd'hui.
          </p>
          <Link to={currentUser ? "/dashboard" : "/auth"} className="btn-lg btn bg-white font-semibold text-primary-500 hover:bg-gray-100">
            Commencer maintenant
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;