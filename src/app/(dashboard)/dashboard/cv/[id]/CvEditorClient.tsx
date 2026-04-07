"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, RotateCw, Save, ArrowLeft, Globe, Check, Loader2, AlertCircle } from "lucide-react";
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
import {
  CV_TEMPLATE_IDS,
  CV_TEMPLATE_LABELS,
  DEFAULT_CV_THEMES,
  mergeCvTheme,
  normalizeTemplateId,
  type CvTemplateId,
  type CvThemeColors,
} from "@/lib/cv-template";
import { fileToDataUrl } from "@/lib/cv-photo";

const PUBLISH_MODAL_ID = "publish-modal-editor";

interface CvEditorClientProps {
  isPremium: boolean;
}

type SaveStatus = "saved" | "saving" | "idle" | "error";

interface CvMeta {
  id: string;
  title: string;
  slug: string | null;
  isPublished: boolean;
}

export default function CvEditorPage({ isPremium }: CvEditorClientProps) {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [personnalDetails, setPersonnalDetails] = useState<PersonalDetails>(personalDetailsPreset);
  const [file, setFile] = useState<File | null>(null);
  const [templateId, setTemplateId] = useState<CvTemplateId>("commercial_sidebar");
  const [cvTheme, setCvTheme] = useState<CvThemeColors>(DEFAULT_CV_THEMES.commercial_sidebar);
  const [zoom, setZoom] = useState<number>(163);
  const [experiences, setExperiences] = useState<Experience[]>(experiencesPreset);
  const [educations, setEducations] = useState<Education[]>(educationsPreset);
  const [languages, setLanguages] = useState<Language[]>(languagesPreset);
  const [skills, setSkills] = useState<Skill[]>(skillsPreset);
  const [hobby, setHobby] = useState<Hobby[]>(hobbiesPreset);

  const [isDownloading, setIsDownloading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [saveErrorMessage, setSaveErrorMessage] = useState<string | null>(null);
  const [cvMeta, setCvMeta] = useState<CvMeta | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const cvPreviewRef = useRef<HTMLDivElement>(null);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

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
        const tid = normalizeTemplateId(cv.templateId);
        setTemplateId(tid);
        setCvTheme(mergeCvTheme(tid, cv.cvTheme));
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

  const performSave = useCallback(async () => {
    let personalToSave = personnalDetails;
    if (file) {
      try {
        const dataUrl = await fileToDataUrl(file);
        personalToSave = { ...personnalDetails, photoUrl: dataUrl };
      } catch (e) {
        console.error("Photo non enregistrée:", e);
      }
    }

    const result = await updateCv(id, {
      data: {
        personalDetails: personalToSave,
        experiences,
        educations,
        skills,
        languages,
        hobbies: hobby,
      },
      theme: "cupcake",
      zoom,
      templateId,
      cvTheme: { accent: cvTheme.accent, sidebar: cvTheme.sidebar },
    });

    if ("error" in result && result.error) {
      setSaveStatus("error");
      setSaveErrorMessage(result.error);
      console.error("Sauvegarde refusée:", result.error);
      return;
    }

    setSaveStatus("saved");
    setSaveErrorMessage(null);
  }, [
    id,
    personnalDetails,
    file,
    experiences,
    educations,
    skills,
    languages,
    hobby,
    zoom,
    templateId,
    cvTheme,
  ]);

  const triggerAutoSave = useCallback(() => {
    if (!isInitialized) return;

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

    setSaveStatus("saving");
    setSaveErrorMessage(null);
    saveTimeoutRef.current = setTimeout(() => {
      void performSave();
    }, 1500);
  }, [isInitialized, performSave]);

  const handleRetrySave = useCallback(() => {
    setSaveErrorMessage(null);
    setSaveStatus("saving");
    void performSave();
  }, [performSave]);

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
    if (!element) return;

    setIsDownloading(true);
    try {
      const canvas = await html2canvas(element, { scale: 3, useCORS: true });
      const imgData = canvas.toDataURL("image/png");
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
  };

  const handleTemplateChange = (next: CvTemplateId) => {
    setTemplateId(next);
    setCvTheme(DEFAULT_CV_THEMES[next]);
  };

  const handleOpenPublishModal = () => {
    const modal = document.getElementById(PUBLISH_MODAL_ID) as HTMLDialogElement | null;
    modal?.showModal();
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-screen" style={{ backgroundColor: "var(--bg-deep)" }}>
        <div className="flex flex-col items-center gap-4">
          <span
            className="loading loading-spinner loading-lg"
            style={{ color: "var(--accent-lime)" }}
          />
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Chargement du CV...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="lg:block">
        <section className="flex items-center h-screen">
          {/* Left Panel — forms */}
          <div
            className="lg:w-1/3 h-full p-10 scrollable no-scrollbar overflow-y-auto"
            style={{ backgroundColor: "var(--bg-elevated)" }}
          >
            <div className="mb-4 flex justify-between items-center gap-2 flex-wrap">
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="btn-brutal-ghost inline-flex items-center gap-1 px-3 py-1.5 text-xs"
                  aria-label="Retour au dashboard"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Dashboard
                </Link>

                <div className="flex flex-wrap items-center gap-1.5 text-sm">
                  {saveStatus === "saving" && (
                    <>
                      <Loader2
                        className="w-3.5 h-3.5 animate-spin"
                        style={{ color: "var(--text-muted)" }}
                      />
                      <span style={{ color: "var(--text-muted)" }}>Sauvegarde...</span>
                    </>
                  )}
                  {saveStatus === "saved" && (
                    <>
                      <Check
                        className="w-3.5 h-3.5"
                        style={{ color: "var(--accent-lime)" }}
                      />
                      <span style={{ color: "var(--accent-lime)" }}>Sauvegardé</span>
                    </>
                  )}
                  {saveStatus === "error" && saveErrorMessage && (
                    <>
                      <AlertCircle
                        className="w-3.5 h-3.5 shrink-0"
                        style={{ color: "var(--accent-coral)" }}
                        aria-hidden
                      />
                      <span className="max-w-[200px] sm:max-w-xs" style={{ color: "var(--accent-coral)" }}>
                        {saveErrorMessage}
                      </span>
                      <button
                        type="button"
                        onClick={handleRetrySave}
                        className="btn-brutal-ghost px-2 py-0.5 text-xs underline"
                        aria-label="Réessayer la sauvegarde"
                      >
                        Réessayer
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleOpenPublishModal}
                  className="btn-brutal-ghost inline-flex items-center gap-1 px-3 py-1.5 text-xs"
                  aria-label="Publier le CV"
                >
                  <Globe className="w-4 h-4" />
                  Publier
                </button>
                <button
                  className="btn-brutal btn-brutal-sm inline-flex items-center gap-1"
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
                <h2
                  className="brutal-badge brutal-badge-lime"
                  style={{ borderLeft: "2px solid var(--accent-lime)" }}
                >
                  Qui êtes-vous ?
                </h2>
                <button
                  onClick={handleResetPersonnalDetails}
                  className="btn-brutal btn-brutal-sm"
                  aria-label="Réinitialiser les informations personnelles"
                >
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
                <h2
                  className="brutal-badge brutal-badge-lime"
                  style={{ borderLeft: "2px solid var(--accent-lime)" }}
                >
                  Expériences
                </h2>
                <button
                  onClick={handleResetExperiences}
                  className="btn-brutal btn-brutal-sm"
                  aria-label="Réinitialiser les expériences"
                >
                  <RotateCw className="w-4" />
                </button>
              </div>
              <ExperiencesForm experiences={experiences} setExperiences={setExperiences} />

              {/* Education */}
              <div className="flex justify-between items-center">
                <h2
                  className="brutal-badge brutal-badge-lime"
                  style={{ borderLeft: "2px solid var(--accent-lime)" }}
                >
                  Éducations
                </h2>
                <button
                  onClick={handleResetEducations}
                  className="btn-brutal btn-brutal-sm"
                  aria-label="Réinitialiser les formations"
                >
                  <RotateCw className="w-4" />
                </button>
              </div>
              <EducationForm educations={educations} setEducations={setEducations} />

              {/* Languages */}
              <div className="flex justify-between items-center">
                <h2
                  className="brutal-badge brutal-badge-lime"
                  style={{ borderLeft: "2px solid var(--accent-lime)" }}
                >
                  Langues
                </h2>
                <button
                  onClick={handleResetLangues}
                  className="btn-brutal btn-brutal-sm"
                  aria-label="Réinitialiser les langues"
                >
                  <RotateCw className="w-4" />
                </button>
              </div>
              <LanguageForm languages={languages} setLanguages={setLanguages} />

              {/* Skills & Hobbies */}
              <div className="flex justify-between">
                <div className="w-1/2">
                  <div className="flex justify-between items-center">
                    <h2
                      className="brutal-badge brutal-badge-lime"
                      style={{ borderLeft: "2px solid var(--accent-lime)" }}
                    >
                      Compétences
                    </h2>
                    <button
                      onClick={handleResetSkill}
                      className="btn-brutal btn-brutal-sm"
                      aria-label="Réinitialiser les compétences"
                    >
                      <RotateCw className="w-4" />
                    </button>
                  </div>
                  <SkillForm skills={skills} setSkills={setSkills} />
                </div>
                <div className="ml-4 w-1/2">
                  <div className="flex justify-between items-center">
                    <h2
                      className="brutal-badge brutal-badge-lime"
                      style={{ borderLeft: "2px solid var(--accent-lime)" }}
                    >
                      Loisirs
                    </h2>
                    <button
                      onClick={handleResetHobby}
                      className="btn-brutal btn-brutal-sm"
                      aria-label="Réinitialiser les loisirs"
                    >
                      <RotateCw className="w-4" />
                    </button>
                  </div>
                  <HobbyForm hobby={hobby} setHobby={setHobby} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel — Preview */}
          <div
            className="hidden lg:block w-2/3 h-full bg-[url('/file.svg')] bg-cover bg-center scrollable-preview relative overflow-hidden"
            style={{ backgroundColor: "var(--bg-deep)" }}
          >
            {/* Zoom control */}
            <div className="flex items-center justify-center fixed z-9999 top-5 right-5 gap-3">
              <input
                type="range"
                min={50}
                max={200}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="brutal-range w-28"
                aria-label="Contrôle du zoom"
              />
              <p className="text-sm font-mono" style={{ color: "var(--accent-lime)" }}>
                {zoom}%
              </p>
            </div>

            {/* Gabarit + couleurs CV */}
            <div
              className="fixed z-[9999] top-12 right-5 flex flex-col gap-2 rounded-md p-2 text-xs"
              style={{
                backgroundColor: "var(--bg-elevated)",
                border: "2px solid var(--border-thick)",
              }}
            >
              <label className="flex flex-col gap-1 font-mono" style={{ color: "var(--text-muted)" }}>
                Gabarit
                <select
                  value={templateId}
                  onChange={(e) => handleTemplateChange(e.target.value as CvTemplateId)}
                  className="brutal-select max-w-[200px] text-[11px]"
                  aria-label="Gabarit du CV"
                >
                  {CV_TEMPLATE_IDS.map((tid) => (
                    <option key={tid} value={tid}>
                      {CV_TEMPLATE_LABELS[tid]}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex items-center gap-2 font-mono" style={{ color: "var(--text-muted)" }}>
                Accent
                <input
                  type="color"
                  value={cvTheme.accent}
                  onChange={(e) => setCvTheme((t) => ({ ...t, accent: e.target.value }))}
                  className="h-8 w-12 cursor-pointer rounded border-2 bg-transparent p-0"
                  aria-label="Couleur d’accent du CV"
                />
              </label>
              <label className="flex items-center gap-2 font-mono" style={{ color: "var(--text-muted)" }}>
                Sidebar
                <input
                  type="color"
                  value={cvTheme.sidebar}
                  onChange={(e) => setCvTheme((t) => ({ ...t, sidebar: e.target.value }))}
                  className="h-8 w-12 cursor-pointer rounded border-2 bg-transparent p-0"
                  aria-label="Couleur de la colonne latérale du CV"
                />
              </label>
            </div>

            <div
              className="flex justify-center items-center"
              style={{ transform: `scale(${zoom / 200})` }}
            >
              <CvPreview
                personalDetails={personnalDetails}
                file={file}
                experiences={experiences}
                educations={educations}
                languages={languages}
                hobbies={hobby}
                skills={skills}
                templateId={templateId}
                themeColors={cvTheme}
              />
            </div>
          </div>
        </section>

        {/* Preview Modal */}
        <dialog id="cv_preview_modal" className="modal">
          <div
            className="modal-box w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "2px solid var(--border-thick)",
              borderRadius: "var(--radius-brutal)",
            }}
          >
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                style={{ color: "var(--text-muted)" }}
                aria-label="Fermer"
              >
                ✕
              </button>
            </form>
            <div className="mt-5">
              <div className="flex justify-end mb-5">
                <button
                  onClick={handleDownloadPdf}
                  className="btn-brutal flex items-center gap-2 px-6 py-3"
                  aria-label="Télécharger le CV en PDF"
                >
                  {isDownloading ? "Téléchargement en cours..." : "Télécharger"}
                  <Save className="w-4" />
                </button>
              </div>
              <div className="w-full max-w-full overflow-auto">
                <div className="w-full max-w-full flex justify-center items-center">
                  <CvPreview
                    ref={cvPreviewRef}
                    personalDetails={personnalDetails}
                    file={file}
                    experiences={experiences}
                    educations={educations}
                    languages={languages}
                    hobbies={hobby}
                    skills={skills}
                    templateId={templateId}
                    themeColors={cvTheme}
                    download={true}
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
            isPremium={isPremium}
          />
        )}
      </div>
    </div>
  );
}
