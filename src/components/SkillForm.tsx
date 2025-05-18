import { Skill } from "@/types/type";
import { Plus } from "lucide-react";
import React, { useState } from "react";

type Props = {
  skills: Skill[];
  setSkills: (skills: Skill[]) => void;
};
const SkillForm: React.FC<Props> = ({ skills, setSkills }) => {
  const [newSkill, setNewSkill] = useState<Skill>({
    id: "",
    name: "",
  });

  const handlechange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Skill
  ) => {
    setNewSkill({ ...newSkill, [field]: e.target.value });
  };

  const handleAddSkill = () => {
    setSkills([...skills, newSkill]);
    setNewSkill({
      id: "",
      name: "",
    });
  };
  return (
    <div>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Langue"
          className="input input-bordered w-full"
          value={newSkill.name}
          onChange={(e) => handlechange(e, "name")}
        />
      </div>
      <button onClick={handleAddSkill} className="btn btn-primary mt-4">
        <Plus className="w-4" /> Ajouter
      </button>
    </div>
  );
};

export default SkillForm;
