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
    category: "",
    detail: "",
  });

  const handlechange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Hobby
  ) => {
    setNewHobby({ ...newHobby, [field]: e.target.value });
  };

  const handleAddHobby = () => {
    const cat = newHobby.category?.trim() ?? "";
    const det = newHobby.detail?.trim() ?? "";
    const nameFromParts =
      cat && det ? `${cat.toUpperCase()} : ${det}` : "";
    const name = newHobby.name.trim() || nameFromParts;
    if (!name) return;

    setHobby([
      ...hobby,
      {
        ...newHobby,
        name,
        category: cat || undefined,
        detail: det || undefined,
      },
    ]);
    setNewHobby({
      id: "",
      name: "",
      category: "",
      detail: "",
    });
  };
  return (
    <div>
      <div className="mt-4 flex flex-col gap-3">
        <input
          type="text"
          placeholder="Libellé simple (ex. Lecture)"
          className="input input-bordered w-full"
          value={newHobby.name}
          onChange={(e) => handlechange(e, "name")}
        />
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Catégorie (ex. SPORTS)"
            className="input input-bordered w-full"
            value={newHobby.category ?? ""}
            onChange={(e) => handlechange(e, "category")}
          />
          <input
            type="text"
            placeholder="Détail (ex. Football, natation)"
            className="input input-bordered w-full"
            value={newHobby.detail ?? ""}
            onChange={(e) => handlechange(e, "detail")}
          />
        </div>
      </div>
      <button onClick={handleAddHobby} className="btn btn-primary mt-4">
        <Plus className="w-4" /> Ajouter
      </button>
    </div>
  );
};

export default HobbyForm;
