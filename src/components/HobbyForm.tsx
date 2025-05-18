import { Hobby } from "@/types/type";
import { Plus } from "lucide-react";
import React, { useState } from "react";

type Props = {
  hobby: Hobby[];
  setHobby: (hobby: Hobby[]) => void;
};

const HobbyForm: React.FC<Props> = ({ hobby, setHobby }) => {
  const [newHobby, setNewHobby] = useState<Hobby>({
    id: "",
    name: "",
  });

  const handlechange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Hobby
  ) => {
    setNewHobby({ ...newHobby, [field]: e.target.value });
  };

  const handleAddHobby = () => {
    setHobby([...hobby, newHobby]);
    setNewHobby({
      id: "",
      name: "",
    });
  };
  return (
    <div>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Loisirs"
          className="input input-bordered w-full"
          value={newHobby.name}
          onChange={(e) => handlechange(e, "name")}
        />
      </div>
      <button onClick={handleAddHobby} className="btn btn-primary mt-4">
        <Plus className="w-4" /> Ajouter
      </button>
    </div>
  );
};

export default HobbyForm;
