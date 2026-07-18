"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Milestone, milestones as defaultMilestones } from "@/data/milestones";

interface User {
  name: string;
  email: string;
}

interface PortfolioContextType {
  milestones: Milestone[];
  user: User | null;
  addMilestone: (milestone: Omit<Milestone, "position"> & { position?: [number, number, number] }) => void;
  removeMilestone: (id: string) => void;
  updateMilestone: (id: string, updated: Partial<Milestone>) => void;
  login: (email: string) => void;
  signup: (name: string, email: string) => void;
  logout: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on client mount
  useEffect(() => {
    const storedMilestones = localStorage.getItem("orbitfolio_milestones");
    if (storedMilestones) {
      try {
        setMilestones(JSON.parse(storedMilestones));
      } catch (e) {
        setMilestones(defaultMilestones);
      }
    } else {
      setMilestones(defaultMilestones);
    }

    const storedUser = localStorage.getItem("orbitfolio_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {}
    }

    setIsLoaded(true);
  }, []);

  // Save milestones to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("orbitfolio_milestones", JSON.stringify(milestones));
    }
  }, [milestones, isLoaded]);

  // Save user to localStorage
  useEffect(() => {
    if (isLoaded) {
      if (user) {
        localStorage.setItem("orbitfolio_user", JSON.stringify(user));
      } else {
        localStorage.removeItem("orbitfolio_user");
      }
    }
  }, [user, isLoaded]);

  const addMilestone = (newMilestone: Omit<Milestone, "position"> & { position?: [number, number, number] }) => {
    // Generate a semi-random 3D coordinate if not specified to spread stars out
    const position: [number, number, number] = newMilestone.position || [
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 8,
    ];

    const completedMilestone: Milestone = {
      ...newMilestone,
      position,
    };

    setMilestones((prev) => [...prev, completedMilestone]);
  };

  const removeMilestone = (id: string) => {
    setMilestones((prev) => prev.filter((m) => m.id !== id));
  };

  const updateMilestone = (id: string, updated: Partial<Milestone>) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updated } : m))
    );
  };

  const login = (email: string) => {
    const mockUser = {
      name: email.split("@")[0].toUpperCase(),
      email,
    };
    setUser(mockUser);
  };

  const signup = (name: string, email: string) => {
    setUser({ name, email });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <PortfolioContext.Provider
      value={{
        milestones,
        user,
        addMilestone,
        removeMilestone,
        updateMilestone,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
