import { Education } from "@/types/type";
import { Plus } from "lucide-react";
import React, { useState } from "react";

type Props = {
  educations: Education[];
  setEducations: (educations: Education[]) => void;
};

const EducationForm: React.FC<Props> = ({ educations, setEducations }) => {
  const [newEducation, setNewEducation] = useState<Education>({
    id: "",
    degree: "",
    school: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const handlechange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Education
  ) => {
    setNewEducation({ ...newEducation, [field]: e.target.value });
  };

  const handleAddEducation = () => {
    setEducations([...educations, newEducation]);
    setNewEducation({
      id: "",
      degree: "",
      school: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  };
  return (
    <div>
      <div>
        <div className="flex flex-col gap-4 ">
          <div className="flex justify-between">
            <input
              type="text"
              placeholder="Diplôme"
              className="input input-bordered w-full"
              value={newEducation.degree}
              onChange={(e) => handlechange(e, "degree")}
            />
            <input
              type="text"
              placeholder=" Nom de l'école"
              className="input input-bordered w-full ml-4"
              value={newEducation.school}
              onChange={(e) => handlechange(e, "school")}
            />
          </div>
          <div className="flex justify-between">
            <input
              type="text"
              placeholder="Date de début"
              onFocus={(e) => (e.target.type = "date")}
              className="input input-bordered w-full"
              value={newEducation.startDate}
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
              value={newEducation.endDate}
              onBlur={(e) => {
                if (!e.target.value) e.target.type = "text";
              }}
              onChange={(e) => handlechange(e, "endDate")}
            />
          </div>
          <textarea
            placeholder=" description"
            className="input input-bordered w-full"
            value={newEducation.description}
            onChange={(e) => handlechange(e, "description")}
          />
        </div>
        <button onClick={handleAddEducation} className="btn btn-primary mt-4">
          <Plus className="w-4" /> Ajouter
        </button>
      </div>
    </div>
  );
};

export default EducationForm;
