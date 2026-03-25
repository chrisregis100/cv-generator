"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, RotateCw, Save, ArrowLeft, Globe, Check, Loader2 } from "lucide-react";
import PersonnalsDetailsForm from "@/components/PersonnalsDetailsForm";
import ExperiencesForm from "@/components/ExperiencesForm";
import EducationForm from "@/components/EducationForm";
import LanguageForm from "@/components/LanguageForm";
import SkillForm from "@/components/SkillForm";
import HobbyForm from "@/components/HobbyForm";
import CvPreview from "@/components/CvPreview";
import PublishModal from "@/components/dashboard/PublishModal";
import {
  Education,
  Experience,
  Hobby,
  Language,
  PersonalDetails,
  Skill,
} from "@/types/type";
import {
  educationsPreset,
  experiencesPreset,
  hobbiesPreset,
  languagesPreset,
  personalDetailsPreset,
  skillsPreset,
} from "@/preset";
import { getCvById, updateCv, type CvData } from "@/lib/actions/cv";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import confetti from "canvas-confetti";

const PUBLISH_MODAL_ID = "publish-modal-editor";

const themes = [
  "light", "dark", "cupcake", "bumblebee", "emerald", "corporate",
  "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden",
  "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black",
  "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade",
  "night", "coffee", "winter", "dim", "nord", "sunset",
];

type SaveStatus = "saved" | "saving" | "idle";

interface CvMeta {
  id: string;
  title: string;
  slug: string | null;
  isPublished: boolean;
}

export default function CvEditorPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [personnalDetails, setPersonnalDetails] = useState<PersonalDetails>(personalDetailsPreset);
  const [file, setFile] = useState<File | null>(null);
  const [theme, setTheme] = useState<string>("cupcake");
  const [zoom, setZoom] = useState<number>(163);
  const [experiences, setExperiences] = useState<Experience[]>(experiencesPreset);
  const [educations, setEducations] = useState<Education[]>(educationsPreset);
  const [languages, setLanguages] = useState<Language[]>(languagesPreset);
  const [skills, setSkills] = useState<Skill[]>(skillsPreset);
  const [hobby, setHobby] = useState<Hobby[]>(hobbiesPreset);

  const [isDownloading, setIsDownloading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [cvMeta, setCvMeta] = useState<CvMeta | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const cvPreviewRef = useRef<HTMLDivElement>(null);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Load CV data from DB on mount
  useEffect(() => {
    const loadCv = async () => {
      setIsFetching(true);
      try {
        const cv = await getCvById(id);
        if (!cv) {
          router.push("/dashboard");
          return;
        }

        const data = cv.data as CvData;

        setCvMeta({
          id: cv.id,
          title: cv.title,
          slug: cv.slug ?? null,
          isPublished: cv.isPublished,
        });

        if (data.personalDetails) setPersonnalDetails(data.personalDetails);
        if (data.experiences) setExperiences(data.experiences);
        if (data.educations) setEducations(data.educations);
        if (data.skills) setSkills(data.skills);
        if (data.languages) setLanguages(data.languages);
        if (data.hobbies) setHobby(data.hobbies);
        setTheme(cv.theme ?? "cupcake");
        setZoom(cv.zoom ?? 163);
      } catch (err) {
        console.error("Erreur lors du chargement du CV:", err);
      } finally {
        setIsFetching(false);
        setIsInitialized(true);
      }
    };

    loadCv();
  }, [id, router]);

  // Load default profile image
  useEffect(() => {
    fetch("/profil.jpg")
      .then((res) => res.blob())
      .then((blob) => {
        setFile(new File([blob], "profile.jpg", { type: blob.type }));
      })
      .catch(() => {});
  }, []);

  // Auto-save with debounce
  const triggerAutoSave = useCallback(() => {
    if (!isInitialized) return;

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

    setSaveStatus("saving");
    saveTimeoutRef.current = setTimeout(async () => {
      try {
        await updateCv(id, {
          data: {
            personalDetails: personnalDetails,
            experiences,
            educations,
            skills,
            languages,
            hobbies: hobby,
          },
          theme,
          zoom,
        });
        setSaveStatus("saved");
      } catch (err) {
        console.error("Erreur lors de la sauvegarde:", err);
        setSaveStatus("idle");
      }
    }, 1500);
  }, [id, isInitialized, personnalDetails, experiences, educations, skills, languages, hobby, theme, zoom]);

  useEffect(() => {
    triggerAutoSave();
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [triggerAutoSave]);

  const handleResetPersonnalDetails = () => setPersonnalDetails(personalDetailsPreset);
  const handleResetExperiences = () => setExperiences([]);
  const handleResetEducations = () => setEducations([]);
  const handleResetLangues = () => setLanguages([]);
  const handleResetSkill = () => setSkills([]);
  const handleResetHobby = () => setHobby([]);

  const handleDownloadPdf = async () => {
    const element = cvPreviewRef.current;
    setIsDownloading(true);

    if (element) {
      try {
        const canvas = await html2canvas(element, { scale: 3, useCORS: true });
        const imgData = canvas.toDataURL("image/pdf");
        const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "A4" });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${cvMeta?.title ?? "cv"}.pdf`);

        const modal = document.getElementById("cv_preview_modal") as HTMLDialogElement | null;
        modal?.close();

        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, zIndex: 9999 });
      } catch (error) {
        console.error("Erreur lors de la génération du PDF:", error);
      } finally {
        setIsDownloading(false);
      }
    }
  };

  const handleOpenPublishModal = () => {
    const modal = document.getElementById(PUBLISH_MODAL_ID) as HTMLDialogElement | null;
    modal?.showModal();
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-primary" />
          <p className="text-base-content/50 text-sm">Chargement du CV...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="lg:block">
        <section className="flex items-center h-screen">
          {/* Left Panel */}
          <div className="lg:w-1/3 h-full p-10 bg-base-200 scrollable no-scrollbar overflow-y-auto">
            <div className="mb-4 flex justify-between items-center gap-2 flex-wrap">
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="btn btn-ghost btn-sm gap-1"
                  aria-label="Retour au dashboard"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Dashboard
                </Link>

                <div className="flex items-center gap-1.5 text-sm text-base-content/50">
                  {saveStatus === "saving" && (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Sauvegarde...</span>
                    </>
                  )}
                  {saveStatus === "saved" && (
                    <>
                      <Check className="w-3.5 h-3.5 text-success" />
                      <span className="text-success">Sauvegardé</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleOpenPublishModal}
                  className="btn btn-outline btn-sm gap-1"
                  aria-label="Publier le CV"
                >
                  <Globe className="w-4 h-4" />
                  Publier
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() =>
                    (document.getElementById("cv_preview_modal") as HTMLDialogElement)?.showModal()
                  }
                  aria-label="Prévisualiser le CV"
                >
                  Prévisualiser
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-6 rounded-lg">
              {/* Personal Details */}
              <div className="flex justify-between items-center">
                <h2 className="badge badge-primary badge-outline">Qui êtes-vous ?</h2>
                <button onClick={handleResetPersonnalDetails} className="btn btn-primary btn-sm">
                  <RotateCw className="w-4" />
                </button>
              </div>
              <PersonnalsDetailsForm
                personnalDetails={personnalDetails}
                setPersonnalDetails={setPersonnalDetails}
                setFile={setFile}
              />

              {/* Experiences */}
              <div className="flex justify-between items-center">
                <h2 className="badge badge-primary badge-outline">Expériences</h2>
                <button onClick={handleResetExperiences} className="btn btn-primary btn-sm">
                  <RotateCw className="w-4" />
                </button>
              </div>
              <ExperiencesForm experiences={experiences} setExperiences={setExperiences} />

              {/* Education */}
              <div className="flex justify-between items-center">
                <h2 className="badge badge-primary badge-outline">Éducations</h2>
                <button onClick={handleResetEducations} className="btn btn-primary btn-sm">
                  <RotateCw className="w-4" />
                </button>
              </div>
              <EducationForm educations={educations} setEducations={setEducations} />

              {/* Languages */}
              <div className="flex justify-between items-center">
                <h2 className="badge badge-primary badge-outline">Langues</h2>
                <button onClick={handleResetLangues} className="btn btn-primary btn-sm">
                  <RotateCw className="w-4" />
                </button>
              </div>
              <LanguageForm languages={languages} setLanguages={setLanguages} />

              {/* Skills & Hobbies */}
              <div className="flex justify-between">
                <div className="w-1/2">
                  <div className="flex justify-between items-center">
                    <h2 className="badge badge-primary badge-outline">Compétences</h2>
                    <button onClick={handleResetSkill} className="btn btn-primary btn-sm">
                      <RotateCw className="w-4" />
                    </button>
                  </div>
                  <SkillForm skills={skills} setSkills={setSkills} />
                </div>
                <div className="ml-4 w-1/2">
                  <div className="flex justify-between items-center">
                    <h2 className="badge badge-primary badge-outline">Loisirs</h2>
                    <button onClick={handleResetHobby} className="btn btn-primary btn-sm">
                      <RotateCw className="w-4" />
                    </button>
                  </div>
                  <HobbyForm hobby={hobby} setHobby={setHobby} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel — Preview */}
          <div className="hidden lg:block w-2/3 h-full bg-base-100 bg-[url('/file.svg')] bg-cover bg-center scrollable-preview relative overflow-hidden">
            {/* Zoom control */}
            <div className="flex items-center justify-center fixed z-[9999] top-5 right-5">
              <input
                type="range"
                min={50}
                max={200}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="range range-xs range-primary"
                aria-label="Contrôle du zoom"
              />
              <p className="ml-4 text-sm text-primary">{zoom}%</p>
            </div>

            {/* Theme selector */}
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="select select-bordered fixed z-[9999] select-sm top-12 right-5"
              aria-label="Sélecteur de thème"
            >
              {themes.map((themeName) => (
                <option key={themeName} value={themeName}>
                  {themeName}
                </option>
              ))}
            </select>

            <div
              className="flex justify-center items-center"
              style={{ transform: `scale(${zoom / 200})` }}
            >
              <CvPreview
                personnalDetails={personnalDetails}
                file={file}
                theme={theme}
                experiences={experiences}
                educations={educations}
                lanquages={languages}
                hobbies={hobby}
                skills={skills}
              />
            </div>
          </div>
        </section>

        {/* Preview Modal */}
        <dialog id="cv_preview_modal" className="modal">
          <div className="modal-box w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" aria-label="Fermer">
                ✕
              </button>
            </form>
            <div className="mt-5">
              <div className="flex justify-end mb-5">
                <button onClick={handleDownloadPdf} className="btn btn-primary">
                  {isDownloading ? "Téléchargement en cours..." : "Télécharger"}
                  <Save className="w-4" />
                </button>
              </div>
              <div className="w-full max-w-full overflow-auto">
                <div className="w-full max-w-full flex justify-center items-center">
                  <CvPreview
                    personnalDetails={personnalDetails}
                    file={file}
                    theme={theme}
                    experiences={experiences}
                    educations={educations}
                    lanquages={languages}
                    hobbies={hobby}
                    skills={skills}
                    download={true}
                    ref={cvPreviewRef}
                  />
                </div>
              </div>
            </div>
          </div>
        </dialog>

        {/* Publish Modal */}
        {cvMeta && (
          <PublishModal
            cv={cvMeta}
            modalId={PUBLISH_MODAL_ID}
          />
        )}
      </div>
    </div>
  );
}
