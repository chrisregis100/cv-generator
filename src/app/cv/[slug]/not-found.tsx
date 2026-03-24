import Link from "next/link";

export default function CvNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 gap-4">
      <h1 className="text-4xl font-bold">CV introuvable</h1>
      <p className="text-base-content/60">
        Ce CV n&apos;existe pas ou n&apos;est pas publié.
      </p>
      <Link href="/" className="btn btn-primary">
        Créer mon CV
      </Link>
    </div>
  );
}
