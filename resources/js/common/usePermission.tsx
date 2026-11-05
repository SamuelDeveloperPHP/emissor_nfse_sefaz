import React from "react";
import { usePage } from "@inertiajs/react";

export const usePermissions = (): string[] => {
  const { auth }: any = usePage().props;
  return auth?.permissions ?? [];
};

export const useCan = (permission: string): boolean => {
  return usePermissions().includes(permission);
};

interface CanProps {
  permission: string;
  children: React.ReactNode;
}

export const Can = ({ permission, children }: CanProps) => {
  return useCan(permission) ? <>{children}</> : null;
};
