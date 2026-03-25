"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

async function getAuthSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/login");
  return session;
}

export async function updateProfile(formData: FormData) {
  const session = await getAuthSession();
  const name = formData.get("name") as string;

  if (!name || name.trim().length === 0) {
    return { error: "Le nom ne peut pas être vide" };
  }

  if (name.length > 100) {
    return { error: "Le nom ne peut pas dépasser 100 caractères" };
  }

  try {
    await auth.api.updateUser({
      headers: await headers(),
      body: { name: name.trim() },
    });
    revalidatePath("/dashboard/settings");
    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil:", error);
    return { error: "Une erreur est survenue lors de la mise à jour du profil" };
  }
}

export async function deleteAccount() {
  const session = await getAuthSession();

  try {
    await auth.api.deleteUser({
      headers: await headers(),
      body: {},
    });
    redirect("/");
  } catch (error) {
    console.error("Erreur lors de la suppression du compte:", error);
    return { error: "Une erreur est survenue lors de la suppression du compte" };
  }
}
