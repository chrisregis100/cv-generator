export type PersonalDetails = {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  photoUrl?: string;
  /** Texte court pour la zone « Profil » (gabarit commercial). */
  profileShort?: string;
  /** Paragraphe de présentation principal (gabarit développeur / colonne droite). */
  summary?: string;
  /** @deprecated Préférer profileShort + summary ; conservé pour rétrocompatibilité. */
  description?: string;
  postSeeking?: string;
  website?: string;
  driverLicense?: string;
};

export type Experience = {
  id?: string;
  jobTitle: string;
  companyName: string;
  location?: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type Education = {
  id?: string;
  school: string;
  degree: string;
  location?: string;
  description: string;
  startDate: string;
  endDate: string;
};

export type Skill = {
  id?: string;
  name: string;
};

export type Language = {
  id?: string;
  language: string;
  proficiency: string; // Ex: Débutant, Intermédiaire, Avancé
};

export type Hobby = {
  id?: string;
  name: string;
  /** Ex. SPORTS, VOYAGES (gabarit commercial structuré). */
  category?: string;
  /** Ex. Football, vélo, natation */
  detail?: string;
};
