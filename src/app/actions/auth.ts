"use server";

import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

const secretKey = process.env.JWT_SECRET || "fallback-secret-key-for-admin";
const key = new TextEncoder().encode(secretKey);

export async function loginAdmin(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { success: false, message: "Email and password are required" };
  }

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASS
  ) {
    // Sign Admin JWT
    const token = await new SignJWT({ role: "admin", email })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(key);

    const cookieStore = await cookies();
    cookieStore.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return { success: true };
  }

  return { success: false, message: "Invalid admin credentials" };
}

export async function loginCourt(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, message: "Email and password are required" };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, message: "Invalid court credentials" };
  }

  return { success: true };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");

  const supabase = await createClient();
  await supabase.auth.signOut();
  
  return { success: true };
}

export async function createCourt(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  if (!email || !password || !name) {
    return { success: false, message: "All fields are required" };
  }

  const { createServerClient } = await import('@supabase/ssr');
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  
  // Use the Service Role Key so we can use the Admin API
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // Use service role instead of anon key
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    }
  );

  // Use Admin API to create user. 
  // This bypasses rate limits and lets us auto-confirm the email!
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // Instantly confirm the email so they can log in
    user_metadata: {
      name: name,
      role: 'court'
    }
  });

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, message: "Court created successfully!" };
}

export async function getCourts() {
  const { createServerClient } = await import('@supabase/ssr');
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  
  // We MUST use the service role key to list users
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    }
  );

  const { data, error } = await supabase.auth.admin.listUsers();

  if (error) {
    console.error("Error fetching courts:", error);
    return { success: false, courts: [] };
  }

  const formattedCourts = data.users.map((user) => {
    return {
      id: user.id,
      name: user.user_metadata?.name || 'Unknown Court',
      email: user.email,
      status: user.email_confirmed_at ? 'Active' : 'Unconfirmed',
      added: new Date(user.created_at).toLocaleDateString(),
    };
  });

  return { success: true, courts: formattedCourts };
}

export async function deleteCourt(userId: string) {
  const { createServerClient } = await import('@supabase/ssr');
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    }
  );

  const { error } = await supabase.auth.admin.deleteUser(userId);

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, message: "Court deleted successfully" };
}
