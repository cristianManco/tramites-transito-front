"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { AuthResponse, LoginDto, RegisterDto } from "@/types/auth";
import api from "@/libs/api";

export function useAuth() {
  const [user, setUser] = useState<AuthResponse["user"] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  const login = async (data: LoginDto) => {
    const res = await api.post<AuthResponse>("/auth/login", data);

    sessionStorage.setItem("token", res.data.access_token);
    sessionStorage.setItem("user", JSON.stringify(res.data.user));

    // 🔹 Guardamos en cookie (para middleware y SSR)
    Cookies.set("token", res.data.access_token, {
      expires: 1,
      sameSite: "strict",
    });

    setUser(res.data.user);
    return res.data;
  };

  const register = async (data: RegisterDto) => {
    const res = await api.post<AuthResponse>("/auth/register", data);

    sessionStorage.setItem("token", res.data.access_token);
    sessionStorage.setItem("user", JSON.stringify(res.data.user));
    Cookies.set("token", res.data.access_token, {
      expires: 1,
      sameSite: "strict",
    });

    setUser(res.data.user);
    return res.data;
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    Cookies.remove("token");

    setUser(null);
  };

  return { user, loading, login, register, logout };
}
