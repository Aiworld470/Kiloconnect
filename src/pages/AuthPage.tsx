import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Package, ArrowLeft, Mail, Lock, User, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AuthPage: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login, register, socialLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if redirected from another page
  const from = location.state?.from?.pathname || '/dashboard';
  
  useEffect(() => {
    // Check URL params for register flag
    const searchParams = new URLSearchParams(location.search);
    const shouldRegister = searchParams.get('register');
    if (shouldRegister === 'true') {
      setIsRegistering(true);
    }
  }, [location]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);
    
    try {
      let success = false;
      
      if (isRegistering) {
        if (!name.trim()) {
          throw new Error('Veuillez entrer votre nom');
        }
        success = await register(name, email, password);
        if (success) {
          setSuccess('Compte créé avec succès!');
          setTimeout(() => navigate(from), 1500);
        } else {
          throw new Error('Cet email est déjà utilisé');
        }
      } else {
        success = await login(email, password);
        if (success) {
          navigate(from);
        } else {
          throw new Error('Email ou mot de passe incorrect');
        }
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    setError(null);
    setIsLoading(true);
    
    try {
      const success = await socialLogin(provider);
      if (success) {
        navigate(from);
      } else {
        throw new Error(`Connexion avec ${provider} a échoué`);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left side - Image */}
      <div className="relative hidden bg-secondary-500 md:block md:w-1/2 lg:w-2/3">
        <img 
          src="https://images.pexels.com/photos/6169693/pexels-photo-6169693.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          alt="People traveling"
          className="h-full w-full object-cover opacity-70" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-500/80 to-secondary-600/70"></div>
        <div className="absolute inset-0 flex items-center justify-center p-10">
          <div className="max-w-md text-white">
            <h2 className="mb-4 text-3xl font-bold leading-tight md:text-4xl">
              Rejoignez la communauté KiloConnect
            </h2>
            <p className="mb-6 text-lg opacity-90">
              Connectez-vous avec des voyageurs du monde entier et facilitez le transport de vos colis à travers les frontières.
            </p>
            <div className="space-y-4">
              {[
                "Économisez jusqu'à 70% sur vos frais d'envoi",
                "Livraison plus rapide que les services postaux traditionnels",
                "Communauté fiable avec système de vérification et d'évaluation",
                "Paiements sécurisés et assurance pour vos colis"
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle size={20} className="mt-1 flex-shrink-0 text-primary-400" />
                  <p>{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Form */}
      <div className="flex flex-grow items-center justify-center p-6 md:w-1/2 lg:w-1/3">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Package className="text-primary-500" size={28} />
              <span className="text-xl font-bold">
                <span className="text-primary-500">Kilo</span>
                <span className="text-secondary-500">Connect</span>
              </span>
            </Link>
            <Link to="/" className="flex items-center gap-1 text-sm text-gray-600 hover:text-primary-500">
              <ArrowLeft size={16} />
              Retour à l'accueil
            </Link>
          </div>
          
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            {isRegistering ? 'Créer un compte' : 'Se connecter'}
          </h2>
          
          {/* Social Login Buttons */}
          <div className="mb-6 space-y-3">
            <button
              type="button"
              onClick={() => handleSocialLogin('google')}
              className="btn w-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              disabled={isLoading}
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continuer avec Google
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin('facebook')}
              className="btn w-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              disabled={isLoading}
            >
              <svg className="mr-2 h-5 w-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Continuer avec Facebook
            </button>
          </div>
          
          <div className="relative mb-6 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <span className="relative bg-white px-3 text-sm text-gray-500">ou</span>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                <XCircle size={18} />
                {error}
              </div>
            )}
            
            {success && (
              <div className="mb-4 flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-600">
                <CheckCircle size={18} />
                {success}
              </div>
            )}
            
            {isRegistering && (
              <div className="form-group">
                <label htmlFor="name" className="form-label">Nom complet</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    className="form-input pl-10"
                    placeholder="Votre nom complet"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  className="form-input pl-10"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="password" className="form-label">Mot de passe</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  className="form-input pl-10"
                  placeholder={isRegistering ? 'Choisir un mot de passe' : 'Votre mot de passe'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {!isRegistering && (
                <div className="mt-1 text-right">
                  <a href="#" className="text-sm text-secondary-600 hover:text-secondary-500">
                    Mot de passe oublié?
                  </a>
                </div>
              )}
            </div>
            
            <button
              type="submit"
              className="btn-primary mt-4 w-full py-2.5"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="mr-2 h-5 w-5 animate-spin\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                    <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Chargement...
                </span>
              ) : (
                isRegistering ? "S'inscrire" : "Se connecter"
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm">
            {isRegistering ? (
              <p>
                Vous avez déjà un compte?{' '}
                <button
                  className="font-medium text-secondary-600 hover:text-secondary-500"
                  onClick={() => setIsRegistering(false)}
                >
                  Se connecter
                </button>
              </p>
            ) : (
              <p>
                Vous n'avez pas de compte?{' '}
                <button
                  className="font-medium text-secondary-600 hover:text-secondary-500"
                  onClick={() => setIsRegistering(true)}
                >
                  S'inscrire
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;