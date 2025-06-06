import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Plane, MapPin, Calendar, ArrowRight, Star, MessageSquare, ShieldCheck, Users, Globe, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { popularDestinations } from '../data/mockData';
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
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 animate-slide-down leading-tight">
              Connectez la diaspora et transportez vos colis en toute sécurité
            </h1>
            <p className="mb-8 animate-slide-down text-lg opacity-90 md:text-xl">
              KiloConnect met en relation les voyageurs et les personnes ayant besoin d'envoyer des colis. 
              Économisez jusqu'à 70% sur vos frais d'expédition tout en aidant votre communauté.
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
          
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: <Package />, text: "12 000+ colis transportés", color: "text-primary-400" },
              { icon: <Users />, text: "8 500+ voyageurs actifs", color: "text-green-400" },
              { icon: <Star />, text: "4.8/5 note moyenne", color: "text-yellow-400" },
              { icon: <Globe />, text: "150+ pays desservis", color: "text-blue-400" }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="flex animate-slide-up items-center justify-center gap-3 rounded-lg bg-white/10 p-4 backdrop-blur-sm"
                style={{ animationDelay: `${(index + 3) * 100}ms` }}
              >
                <span className={stat.color}>{stat.icon}</span>
                <span className="font-medium text-sm sm:text-base">{stat.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How it works */}
      <section className="py-16 md:py-20">
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
                description: "Trouvez un voyageur qui se rend à votre destination en utilisant notre système de recherche avancé avec filtres par prix, poids et dates.",
                step: "01"
              },
              {
                icon: <MessageSquare size={32} className="text-primary-500" />,
                title: "Contactez le voyageur",
                description: "Discutez des détails de l'envoi, du volume, du poids et négociez le prix du transport via notre messagerie intégrée.",
                step: "02"
              },
              {
                icon: <ShieldCheck size={32} className="text-success-500" />,
                title: "Réservez en toute sécurité",
                description: "Effectuez le paiement via notre plateforme sécurisée et suivez votre colis jusqu'à destination avec notre système de tracking.",
                step: "03"
              }
            ].map((step, index) => (
              <div key={index} className="card relative p-6 transition-transform duration-300 hover:-translate-y-2">
                <div className="absolute -top-4 -right-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-white font-bold">
                  {step.step}
                </div>
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  {step.icon}
                </div>
                <h3 className="mb-3 text-xl font-semibold">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured destinations */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4">Destinations populaires</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Découvrez nos trajets les plus demandés et rejoignez notre communauté mondiale de voyageurs solidaires.
            </p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {popularDestinations.map((destination, index) => (
              <Link to="/search\" key={index} className="group overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={destination.image} 
                    alt={`${destination.from} to ${destination.to}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 w-full p-4 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{destination.from}</span>
                      <ArrowRight size={16} />
                      <span className="font-semibold">{destination.to}</span>
                    </div>
                    <p className="text-sm text-gray-200">{destination.tripCount}+ trajets disponibles</p>
                    <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-1 text-xs backdrop-blur-sm">
                      <TrendingUp size={12} />
                      Populaire
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Link to="/search" className="btn-secondary inline-flex items-center gap-2">
              Voir toutes les destinations
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4">Ce que disent nos utilisateurs</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Découvrez les expériences authentiques de notre communauté de voyageurs et expéditeurs à travers le monde.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Aminata D.",
                role: "Expéditrice régulière",
                location: "Paris → Dakar",
                avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                quote: "Grâce à KiloConnect, j'ai pu envoyer des cadeaux à ma famille au Sénégal à un prix abordable. Le service est rapide et les voyageurs sont très fiables. J'ai économisé plus de 200€ par rapport aux services traditionnels!",
                rating: 5
              },
              {
                name: "Jean-Pierre K.",
                role: "Voyageur transporteur",
                location: "Bruxelles → Kinshasa",
                avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                quote: "Je voyage régulièrement entre l'Europe et l'Afrique. KiloConnect me permet de rentabiliser mes voyages tout en aidant ma communauté. C'est vraiment gagnant-gagnant et les utilisateurs sont reconnaissants!",
                rating: 5
              },
              {
                name: "Sophie M.",
                role: "Utilisatrice occasionnelle",
                location: "Lyon → Abidjan",
                avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                quote: "J'ai pu envoyer des médicaments urgents à ma mère à Abidjan en seulement 3 jours, alors que les services postaux traditionnels auraient pris des semaines. La plateforme est intuitive et sécurisée.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="card p-6 transition-transform duration-300 hover:-translate-y-1">
                <div className="mb-4 flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                    <p className="text-xs text-gray-400">{testimonial.location}</p>
                  </div>
                </div>
                <p className="mb-4 text-gray-600 text-sm leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex text-primary-500">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Trust & Security */}
      <section className="bg-primary-50 py-16 md:py-20">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4">Votre sécurité, notre priorité</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              KiloConnect met en place des mesures de sécurité strictes pour protéger vos envois et garantir des transactions fiables.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <ShieldCheck size={32} className="text-green-500" />,
                title: "Vérification d'identité",
                description: "Tous nos transporteurs sont vérifiés avec pièce d'identité et justificatifs."
              },
              {
                icon: <Star size={32} className="text-yellow-500" />,
                title: "Système d'évaluation",
                description: "Notez et consultez les avis pour choisir les meilleurs transporteurs."
              },
              {
                icon: <Package size={32} className="text-blue-500" />,
                title: "Assurance colis",
                description: "Vos envois sont protégés jusqu'à 500€ en cas de perte ou dommage."
              },
              {
                icon: <MessageSquare size={32} className="text-purple-500" />,
                title: "Support 24/7",
                description: "Notre équipe est disponible pour vous aider à tout moment."
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="mb-2 font-semibold">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="bg-primary-500 py-16 text-white md:py-20">
        <div className="container text-center">
          <h2 className="mb-4">Prêt à rejoindre notre communauté?</h2>
          <p className="mx-auto mb-8 max-w-2xl opacity-90">
            Créez votre compte gratuitement et commencez à envoyer ou transporter des colis dès aujourd'hui. 
            Rejoignez plus de 8 500 voyageurs qui font confiance à KiloConnect.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link to={currentUser ? "/dashboard" : "/auth"} className="btn-lg btn bg-white font-semibold text-primary-500 hover:bg-gray-100">
              Commencer maintenant
              <ArrowRight size={18} className="ml-2" />
            </Link>
            <Link to="/search" className="btn-lg btn-outline border-white text-white hover:bg-white hover:text-primary-500">
              Explorer les trajets
              <MapPin size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 py-12 text-gray-300">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Package className="text-primary-500" size={28} />
                <span className="text-xl font-bold">
                  <span className="text-primary-500">Kilo</span>
                  <span className="text-secondary-500">Connect</span>
                </span>
              </div>
              <p className="mb-4 text-sm leading-relaxed">
                KiloConnect connecte la diaspora mondiale en facilitant le transport de colis entre voyageurs et expéditeurs. 
                Une solution économique, rapide et sécurisée pour vos envois internationaux.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Liens Rapides</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="hover:text-primary-500 transition">Accueil</Link>
                </li>
                <li>
                  <Link to="/search" className="hover:text-primary-500 transition">Rechercher un trajet</Link>
                </li>
                <li>
                  <Link to="/dashboard" className="hover:text-primary-500 transition">Mon compte</Link>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-500 transition">Comment ça marche</a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-500 transition">Sécurité</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-primary-500 transition">Centre d'aide</a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-500 transition">Conditions générales</a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-500 transition">Politique de confidentialité</a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary-500 transition">Nous contacter</a>
                </li>
                <li className="pt-2">
                  <p className="text-xs">support@kiloconnect.com</p>
                  <p className="text-xs">+33 1 23 45 67 89</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} KiloConnect. Tous droits réservés. Fait avec ❤️ pour la diaspora mondiale.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;