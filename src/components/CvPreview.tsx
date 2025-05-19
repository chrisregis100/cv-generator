/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Education,
  Experience,
  Hobby,
  Language,
  PersonalDetails,
  Skill,
} from "@/types/type";
import Image from "next/image";
import {
  BriefcaseBusiness,
  GraduationCap,
  Mail,
  MapPinCheckInside,
  Phone,
  Star,
} from "lucide-react";

type Props = {
  personnalDetails: PersonalDetails;
  file: File | null;
  theme: string;
  experiences: Experience[];
  educations: Education[];
  lanquages: Language[];
  skills: Skill[];
  hobbies: Hobby[];
  download?: boolean;
  ref?: any;
};

const getStarRating = (proficiency: string) => {
  const maxStar = 5;
  let filledStar = 0;

  switch (proficiency) {
    case "Débutant":
      filledStar = 1;
      break;
    case "Intermédiaire":
      filledStar = 2;
      break;
    case "Avancé":
      filledStar = 3;
      break;
    default:
      filledStar = 0;
  }

  return (
    <>
      {Array.from({ length: filledStar }, (_, i) => (
        <Star className={`w-4 h-4 text-primary`} key={i} />
      ))}
      {Array.from({ length: maxStar - filledStar }, (_, i) => (
        <Star className={`w-4 h-4 text-gray-300`} key={i + filledStar} />
      ))}
    </>
  );
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return date.toLocaleDateString("fr-FR", options);
}

const CvPreview: React.FC<Props> = ({
  personnalDetails,
  file,
  theme,
  experiences,
  educations,
  lanquages,
  skills,
  hobbies,
  download,
  ref,
}) => {
  return (
    <div
      className={`flex p-16 mx-auto  transf lg:w-[950px] lg:h-[1200px] shadow-lg ${
        download ? "mb-10" : ""
      }`}
      ref={ref}
      data-theme={theme}
    >
      <div className="flex flex-col w-1/3">
        <div className="h-80 rounded-full border-8 overflow-hidden border-primary">
          {file && (
            <Image
              src={URL.createObjectURL(file)}
              alt="cv"
              width={300}
              height={300}
              className="w-full h-full object-cover rounded-lg"
              onLoadingComplete={() => {
                if (typeof file !== "string") {
                  URL.revokeObjectURL(URL.createObjectURL(file));
                }
              }}
            />
          )}
        </div>

        <div className="mt-4 flex-col w-full">
          <div>
            <h1 className="text-2xl my-2 uppercase font-bold">Contact</h1>
            <ul className="space-y-2">
              <li className="flex">
                <div className="break-all text-sm relative">
                  <div className="flex gap-4 items-center">
                    <Mail className="w-5 text-primary" />
                    <div className="">{personnalDetails.email}</div>
                  </div>
                </div>
              </li>
              <li className="flex">
                <div className="break-all text-sm relative">
                  <div className="flex gap-4 items-center">
                    <Phone className="w-5 text-primary" />
                    <div className="">{personnalDetails.phone}</div>
                  </div>
                </div>
              </li>
              <li className="flex">
                <div className="break-all text-sm relative">
                  <div className="flex gap-4 items-center">
                    <MapPinCheckInside className="w-5 text-primary" />
                    <div className="">{personnalDetails.address}</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-4 flex-col w-full">
          <div>
            <h1 className="text-2xl my-2 uppercase font-bold">Skills</h1>
            <div className="flex flex-col gap-4">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <span className="capitalize font-bold">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-2xl my-2 uppercase font-bold">Loisirs</h1>
            <div className="flex flex-col gap-4">
              {hobbies.map((hobby) => (
                <div key={hobby.id}>
                  <span className="capitalize font-bold">{hobby.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-2xl my-2 uppercase font-bold">Languages</h1>
            <div className="flex flex-col gap-4">
              {lanquages.map((language) => (
                <div key={language.id}>
                  <span className="capitalize font-bold">
                    {language.language}
                  </span>
                  <div className="flex gap-2">
                    {getStarRating(language.proficiency)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-2/3 ml-8">
        <div className="w-full flex flex-col space-y-4">
          <h1 className="uppercase text-xl">{personnalDetails.fullName} </h1>
          <h2 className="uppercase text-5xl text-primary font-bold">
            {personnalDetails.postSeeking}
          </h2>
          <p className="break-all w-full text-sm">
            {personnalDetails.description}
          </p>
        </div>
        <section className="w-full h-fit p-5">
          <div>
            <h1 className="uppercase font-bold mb-2">Expériences</h1>
            <ul className="steps steps-vertical space-y-3">
              {experiences.map((experience, index) => (
                <li key={index} className="step step-primary">
                  <div className="text-left">
                    <h2 className="flex items-center uppercase text-lg font-bold">
                      <BriefcaseBusiness className="w-5" />
                      <span>{experience.jobTitle}</span>
                    </h2>
                    <div className="text-sm my-2">
                      <span className="badge badge-primary">
                        {experience.companyName}
                      </span>
                      <span className="italic ml-2">
                        {formatDate(experience.startDate)} au{" "}
                        {formatDate(experience.endDate)}{" "}
                      </span>
                    </div>
                    <p className="text-sm">{experience.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="w-full h-fit p-5">
          <div>
            <h1 className="uppercase font-bold mb-2">Educations</h1>
            <ul className="steps steps-vertical space-y-3">
              {educations.map((education, index) => (
                <li key={index} className="step step-primary">
                  <div className="text-left">
                    <h2 className="flex items-center uppercase text-lg font-bold">
                      <GraduationCap className="w-5" />
                      <span>{education.degree}</span>
                    </h2>
                    <div className="text-sm my-2">
                      <span className="badge badge-primary">
                        {education.school}
                      </span>
                      <span className="italic ml-2">
                        {formatDate(education.startDate)} au{" "}
                        {formatDate(education.endDate)}{" "}
                      </span>
                    </div>
                    <p className="text-sm">{education.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CvPreview;
