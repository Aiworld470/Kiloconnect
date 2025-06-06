// Mock Users Data
export const mockUsers = [
  {
    id: 'user-1',
    name: 'Sophie Dupont',
    email: 'sophie@example.com',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    bio: 'Je voyage régulièrement entre Paris et Dakar pour des raisons professionnelles. Heureuse de pouvoir aider la communauté!',
    rating: 4.8,
    joinedDate: new Date('2023-05-15'),
    verified: true,
    trips: 24
  },
  {
    id: 'user-2',
    name: 'Jean-Paul Mbarga',
    email: 'jeanpaul@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    bio: 'Étudiant à Bruxelles, je rentre à Yaoundé pendant les vacances scolaires. Disponible pour transporter vos colis!',
    rating: 4.5,
    joinedDate: new Date('2023-08-10'),
    verified: true,
    trips: 8
  },
  {
    id: 'user-3',
    name: 'Aminata Diallo',
    email: 'aminata@example.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    bio: 'Femme d\'affaires voyageant entre Abidjan et Paris chaque mois. Fiable et ponctuelle.',
    rating: 4.9,
    joinedDate: new Date('2023-03-22'),
    verified: true,
    trips: 36
  },
  {
    id: 'user-4',
    name: 'Omar Sy',
    email: 'omar@example.com',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    bio: 'Consultant en informatique basé à Montréal, je voyage souvent vers le Sénégal et le Maroc.',
    rating: 4.6,
    joinedDate: new Date('2023-07-05'),
    verified: true,
    trips: 15
  },
  {
    id: 'user-5',
    name: 'Fatou Ndiaye',
    email: 'fatou@example.com',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    bio: 'Étudiante en médecine à Lyon, je rentre régulièrement à Dakar. Je peux transporter des petits colis.',
    rating: 4.7,
    joinedDate: new Date('2023-09-18'),
    verified: true,
    trips: 6
  }
];

// Mock Trips Data
export const mockTrips = [
  {
    id: 'trip-1',
    userId: 'user-1',
    from: 'Paris, France',
    to: 'Dakar, Sénégal',
    departureDate: new Date('2025-07-10'),
    arrivalDate: new Date('2025-07-10'),
    availableWeight: 15,
    pricePerKg: 12,
    currency: 'EUR',
    description: 'Vol direct Air France, disponible pour transporter des vêtements, documents et petits appareils électroniques.',
    status: 'active',
    createdAt: new Date('2025-06-15')
  },
  {
    id: 'trip-2',
    userId: 'user-2',
    from: 'Bruxelles, Belgique',
    to: 'Yaoundé, Cameroun',
    departureDate: new Date('2025-07-25'),
    arrivalDate: new Date('2025-07-26'),
    availableWeight: 20,
    pricePerKg: 10,
    currency: 'EUR',
    description: 'Vol avec escale à Paris. Je peux transporter tous types de colis sauf nourriture périssable.',
    status: 'active',
    createdAt: new Date('2025-06-20')
  },
  {
    id: 'trip-3',
    userId: 'user-3',
    from: 'Abidjan, Côte d\'Ivoire',
    to: 'Paris, France',
    departureDate: new Date('2025-07-15'),
    arrivalDate: new Date('2025-07-15'),
    availableWeight: 10,
    pricePerKg: 15,
    currency: 'EUR',
    description: 'Vol direct Air Côte d\'Ivoire. Je peux transporter des petits colis et documents.',
    status: 'active',
    createdAt: new Date('2025-06-10')
  },
  {
    id: 'trip-4',
    userId: 'user-4',
    from: 'Montréal, Canada',
    to: 'Casablanca, Maroc',
    departureDate: new Date('2025-07-18'),
    arrivalDate: new Date('2025-07-19'),
    availableWeight: 25,
    pricePerKg: 9,
    currency: 'EUR',
    description: 'Vol direct Royal Air Maroc. Espace disponible pour des valises entières.',
    status: 'active',
    createdAt: new Date('2025-06-18')
  },
  {
    id: 'trip-5',
    userId: 'user-5',
    from: 'Lyon, France',
    to: 'Dakar, Sénégal',
    departureDate: new Date('2025-07-20'),
    arrivalDate: new Date('2025-07-20'),
    availableWeight: 8,
    pricePerKg: 14,
    currency: 'EUR',
    description: 'Vol avec escale à Paris. Idéal pour de petits colis comme des médicaments, documents ou petits cadeaux.',
    status: 'active',
    createdAt: new Date('2025-06-12')
  },
  {
    id: 'trip-6',
    userId: 'user-1',
    from: 'Dakar, Sénégal',
    to: 'Paris, France',
    departureDate: new Date('2025-07-30'),
    arrivalDate: new Date('2025-07-30'),
    availableWeight: 12,
    pricePerKg: 13,
    currency: 'EUR',
    description: 'Vol direct Air Sénégal. Je peux transporter des vêtements, de l\'artisanat local et des produits non périssables.',
    status: 'active',
    createdAt: new Date('2025-06-25')
  }
];

// Mock Bookings Data
export const mockBookings = [
  {
    id: 'booking-1',
    tripId: 'trip-3',
    userId: 'user-5',
    packageWeight: 2.5,
    packageDescription: 'Livres et médicaments pour ma famille',
    status: 'confirmed',
    totalPrice: 37.5,
    currency: 'EUR',
    createdAt: new Date('2025-06-20'),
    deliveryAddress: '15 Rue de la Liberté, Paris, France',
    pickupAddress: '7 Boulevard Central, Abidjan, Côte d\'Ivoire'
  },
  {
    id: 'booking-2',
    tripId: 'trip-1',
    userId: 'user-4',
    packageWeight: 5,
    packageDescription: 'Vêtements et cadeaux pour enfants',
    status: 'pending',
    totalPrice: 60,
    currency: 'EUR',
    createdAt: new Date('2025-06-23'),
    deliveryAddress: '23 Avenue Senghor, Dakar, Sénégal',
    pickupAddress: '42 Avenue de la République, Paris, France'
  },
  {
    id: 'booking-3',
    tripId: 'trip-6',
    userId: 'user-2',
    packageWeight: 3,
    packageDescription: 'Épices et produits alimentaires non périssables',
    status: 'confirmed',
    totalPrice: 39,
    currency: 'EUR',
    createdAt: new Date('2025-06-26'),
    deliveryAddress: '8 Rue du Commerce, Paris, France',
    pickupAddress: '56 Rue Félix Faure, Dakar, Sénégal'
  }
];

// Mock Conversations Data
export const mockConversations = [
  {
    id: 'conversation-1',
    participants: ['user-1', 'user-5'],
    tripId: 'trip-1',
    lastMessage: {
      id: 'message-5',
      senderId: 'user-5',
      text: 'Super ! Je vous enverrai les détails du colis bientôt.',
      timestamp: new Date('2025-06-23T10:15:00')
    },
    createdAt: new Date('2025-06-22T14:30:00')
  },
  {
    id: 'conversation-2',
    participants: ['user-3', 'user-4'],
    tripId: 'trip-3',
    lastMessage: {
      id: 'message-10',
      senderId: 'user-3',
      text: 'Oui, je peux prendre des médicaments sans problème.',
      timestamp: new Date('2025-06-24T09:45:00')
    },
    createdAt: new Date('2025-06-21T11:20:00')
  },
  {
    id: 'conversation-3',
    participants: ['user-2', 'user-1'],
    tripId: 'trip-2',
    lastMessage: {
      id: 'message-15',
      senderId: 'user-1',
      text: 'Est-ce que vous acceptez les paiements par PayPal?',
      timestamp: new Date('2025-06-25T16:30:00')
    },
    createdAt: new Date('2025-06-20T08:15:00')
  }
];

// Mock Messages Data
export const mockMessages = {
  'conversation-1': [
    {
      id: 'message-1',
      conversationId: 'conversation-1',
      senderId: 'user-5',
      text: 'Bonjour, je suis intéressée par votre trajet Paris-Dakar du 10 juillet.',
      timestamp: new Date('2025-06-22T14:30:00')
    },
    {
      id: 'message-2',
      conversationId: 'conversation-1',
      senderId: 'user-1',
      text: 'Bonjour ! Bien sûr, j\'ai encore de la place disponible. Qu\'est-ce que vous souhaitez envoyer ?',
      timestamp: new Date('2025-06-22T14:45:00')
    },
    {
      id: 'message-3',
      conversationId: 'conversation-1',
      senderId: 'user-5',
      text: 'Je voudrais envoyer quelques vêtements et des médicaments pour ma famille. Environ 5 kg au total.',
      timestamp: new Date('2025-06-22T15:00:00')
    },
    {
      id: 'message-4',
      conversationId: 'conversation-1',
      senderId: 'user-1',
      text: 'Pas de problème, je peux transporter ça. Mon tarif est de 12€/kg, donc ce serait 60€ au total.',
      timestamp: new Date('2025-06-23T09:30:00')
    },
    {
      id: 'message-5',
      conversationId: 'conversation-1',
      senderId: 'user-5',
      text: 'Super ! Je vous enverrai les détails du colis bientôt.',
      timestamp: new Date('2025-06-23T10:15:00')
    }
  ],
  'conversation-2': [
    {
      id: 'message-6',
      conversationId: 'conversation-2',
      senderId: 'user-4',
      text: 'Salut Aminata, j\'ai vu que tu voyages d\'Abidjan à Paris le 15 juillet.',
      timestamp: new Date('2025-06-21T11:20:00')
    },
    {
      id: 'message-7',
      conversationId: 'conversation-2',
      senderId: 'user-3',
      text: 'Bonjour Omar, oui c\'est exact. Tu as un colis à envoyer ?',
      timestamp: new Date('2025-06-21T11:35:00')
    },
    {
      id: 'message-8',
      conversationId: 'conversation-2',
      senderId: 'user-4',
      text: 'Oui, j\'ai quelques médicaments à envoyer à ma mère à Paris. C\'est assez urgent.',
      timestamp: new Date('2025-06-21T11:50:00')
    },
    {
      id: 'message-9',
      conversationId: 'conversation-2',
      senderId: 'user-4',
      text: 'Est-ce que tu acceptes de transporter des médicaments ? C\'est environ 2 kg.',
      timestamp: new Date('2025-06-24T09:30:00')
    },
    {
      id: 'message-10',
      conversationId: 'conversation-2',
      senderId: 'user-3',
      text: 'Oui, je peux prendre des médicaments sans problème.',
      timestamp: new Date('2025-06-24T09:45:00')
    }
  ],
  'conversation-3': [
    {
      id: 'message-11',
      conversationId: 'conversation-3',
      senderId: 'user-1',
      text: 'Bonjour Jean-Paul, j\'ai vu votre voyage vers Yaoundé.',
      timestamp: new Date('2025-06-20T08:15:00')
    },
    {
      id: 'message-12',
      conversationId: 'conversation-3',
      senderId: 'user-2',
      text: 'Bonjour Sophie, en effet je pars le 25 juillet. Que souhaitez-vous envoyer ?',
      timestamp: new Date('2025-06-20T09:22:00')
    },
    {
      id: 'message-13',
      conversationId: 'conversation-3',
      senderId: 'user-1',
      text: 'J\'ai des livres et du matériel scolaire pour une association, environ 8 kg.',
      timestamp: new Date('2025-06-20T10:05:00')
    },
    {
      id: 'message-14',
      conversationId: 'conversation-3',
      senderId: 'user-2',
      text: 'Je peux le faire pour 80€ au total. Est-ce que ça vous convient?',
      timestamp: new Date('2025-06-25T15:45:00')
    },
    {
      id: 'message-15',
      conversationId: 'conversation-3',
      senderId: 'user-1',
      text: 'Est-ce que vous acceptez les paiements par PayPal?',
      timestamp: new Date('2025-06-25T16:30:00')
    }
  ]
};

// Mock Reviews Data
export const mockReviews = [
  {
    id: 'review-1',
    tripId: 'trip-6',
    reviewerId: 'user-2',
    reviewedUserId: 'user-1',
    rating: 5,
    comment: 'Sophie a été extrêmement professionnelle et fiable. Mon colis est arrivé en parfait état et à temps. Je recommande vivement!',
    createdAt: new Date('2025-05-10')
  },
  {
    id: 'review-2',
    tripId: 'trip-3',
    reviewerId: 'user-4',
    reviewedUserId: 'user-3',
    rating: 5,
    comment: 'Aminata est très sérieuse et organisée. Communication parfaite et livraison sans problème. Merci!',
    createdAt: new Date('2025-05-02')
  },
  {
    id: 'review-3',
    tripId: 'trip-2',
    reviewerId: 'user-1',
    reviewedUserId: 'user-2',
    rating: 4,
    comment: 'Bon service, colis livré à temps. La communication aurait pu être meilleure, mais dans l\'ensemble très satisfaisant.',
    createdAt: new Date('2025-04-15')
  },
  {
    id: 'review-4',
    tripId: 'trip-5',
    reviewerId: 'user-3',
    reviewedUserId: 'user-5',
    rating: 5,
    comment: 'Fatou est très sympathique et professionnelle. La transaction s\'est déroulée sans problème. Je recommande!',
    createdAt: new Date('2025-03-28')
  }
];