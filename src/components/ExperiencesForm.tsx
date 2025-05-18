import { Experience } from "@/types/type";
import { Plus } from "lucide-react";
import React, { useState } from "react";

type Props = {
  experiences: Experience[];
  setExperiences: (experience: Experience[]) => void;
};
const ExperiencesForm: React.FC<Props> = ({ experiences, setExperiences }) => {
  const [newExperience, setNewExperience] = useState<Experience>({
    jobTitle: "",
    companyName: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const handlechange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Experience
  ) => {
    setNewExperience({ ...newExperience, [field]: e.target.value });
  };

  const handleAddExperience = () => {
    setExperiences([...experiences, newExperience]);
    setNewExperience({
      jobTitle: "",
      companyName: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  };

  return (
    <div>
      <div className="flex flex-col gap-4 ">
        <div className="flex justify-between">
          <input
            type="text"
            placeholder=" Expérience"
            className="input input-bordered w-full"
            value={newExperience.jobTitle}
            onChange={(e) => handlechange(e, "jobTitle")}
          />
          <input
            type="text"
            placeholder=" Nom de l'entreprise"
            className="input input-bordered w-full ml-4"
            value={newExperience.companyName}
            onChange={(e) => handlechange(e, "companyName")}
          />
        </div>
        <div className="flex justify-between">
          <input
            type="text"
            placeholder="Date de début"
            onFocus={(e) => (e.target.type = "date")}
            className="input input-bordered w-full"
            value={newExperience.startDate}
            onBlur={(e) => {
              if (!e.target.value) e.target.type = "text";
            }}
            onChange={(e) => handlechange(e, "startDate")}
          />
          <input
            type="text"
            placeholder="Date de fin"
            onFocus={(e) => (e.target.type = "date")}
            className="input input-bordered w-full ml-4"
            value={newExperience.endDate}
            onBlur={(e) => {
              if (!e.target.value) e.target.type = "text";
            }}
            onChange={(e) => handlechange(e, "endDate")}
          />
        </div>
        <textarea
          placeholder=" description"
          className="input input-bordered w-full"
          value={newExperience.description}
          onChange={(e) => handlechange(e, "description")}
        />
      </div>
      <button onClick={handleAddExperience} className="btn btn-primary mt-4">
        <Plus className="w-4" /> Ajouter une expérience
      </button>
    </div>
  );
};

export default ExperiencesForm;
