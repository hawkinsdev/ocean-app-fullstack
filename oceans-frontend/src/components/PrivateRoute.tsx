"use client";
import { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Container, LinearProgress } from "@mui/material";
import Navbar from "./Navbar";

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const { loading, authenticated } = useAuth();

  if (loading) {
    return <LinearProgress />;
  }

  if (!authenticated) {
    return null;
  }

  return (
    <div>
      <Navbar />
      <Container maxWidth="lg">
        <div className="w-full h-screen flex justify-center !mt-20 overflow-hidden">
          {children}
        </div>
      </Container>
    </div>
  );
}
