import { Language } from "@/types/type";
import { Plus } from "lucide-react";
import React, { useState } from "react";

type Props = {
  languages: Language[];
  setLanguages: (languages: Language[]) => void;
};

const LanguageForm: React.FC<Props> = ({ languages, setLanguages }) => {
  const [newLanguage, setNewLanguage] = useState<Language>({
    id: "",
    language: "",
    proficiency: "",
  });

  const handlechange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    field: keyof Language
  ) => {
    setNewLanguage({ ...newLanguage, [field]: e.target.value });
  };

  const handleAddLanguage = () => {
    setLanguages([...languages, newLanguage]);
    setNewLanguage({
      id: "",
      language: "",
      proficiency: "",
    });
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="langage"
        className="input input-bordered w-full"
        value={newLanguage.language}
        onChange={(e) => handlechange(e, "language")}
      />

      <select
        name=""
        id=""
        value={newLanguage.proficiency}
        onChange={(e) => handlechange(e, "proficiency")}
        className="select select-bordered w-full select-sm"
      >
        <option value="">Selectionner la maitrise</option>
        <option value="Débutant">Débutant</option>
        <option value="Intermédiaire">Intermédiaire</option>
        <option value="Avancé">Avancé</option>
      </select>

      <button onClick={handleAddLanguage} className="btn btn-primary mt-4">
        <Plus className="w-4" /> Ajouter
      </button>
    </div>
  );
};

export default LanguageForm;
