import { PersonalDetails } from "@/types/type";
import React from "react";

type Props = {
  personnalDetails: PersonalDetails;
  setPersonnalDetails: (pd: PersonalDetails) => void;
  setFile: (file: File | null) => void;
};

const PersonnalsDetailsForm: React.FC<Props> = ({
  personnalDetails,
  setPersonnalDetails,
  setFile,
}) => {
  const handlechange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof PersonalDetails
  ) => {
    setPersonnalDetails({ ...personnalDetails, [field]: e.target.value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };
  return (
    <div className="flex flex-col gap-4 ">
      <input
        type="text"
        placeholder="nom complet"
        className="input input-bordered w-full"
        value={personnalDetails.fullName}
        onChange={(e) => handlechange(e, "fullName")}
      />
      <input
        type="email"
        placeholder="Email"
        className="input input-bordered w-full"
        value={personnalDetails.email}
        onChange={(e) => handlechange(e, "email")}
      />
      <input
        type="text"
        placeholder=" Numéro de Téléphone"
        className="input input-bordered w-full"
        value={personnalDetails.phone}
        onChange={(e) => handlechange(e, "phone")}
      />
      <input
        type="text"
        placeholder=" Adresse"
        className="input input-bordered w-full"
        value={personnalDetails.address}
        onChange={(e) => handlechange(e, "address")}
      />
      <input
        type="file"
        accept="image/*"
        className="file-input file-input-primary file-input-bordered w-full"
        onChange={handleFileUpload}
      />
      <input
        type="text"
        placeholder=" Poste de recherche"
        className="input input-bordered w-full"
        value={personnalDetails.postSeeking}
        onChange={(e) => handlechange(e, "postSeeking")}
      />
      <textarea
        placeholder=" Décrivez-vous"
        className="input input-bordered w-full"
        value={personnalDetails.description}
        onChange={(e) => handlechange(e, "description")}
      />
    </div>
  );
};

export default PersonnalsDetailsForm;
