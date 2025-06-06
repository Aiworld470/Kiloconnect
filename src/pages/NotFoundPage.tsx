import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Package } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <Package size={64} className="text-primary-500" />
        </div>
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <h2 className="mb-6 text-2xl">Page non trouvée</h2>
        <p className="mb-8 text-gray-600">
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <Link to="/" className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft size={18} />
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;