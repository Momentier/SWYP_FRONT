"use client";

import QueryProvider from "@/components/QueryProvider";
import { ModalProvider } from "@/providers/ModalProvider";
import LayoutSelector from "@/components/layout/LayoutSelector";
import ToastContainer from "@/components/ToastContainer";
import MswProvider from "@/mocks/MswProvider";
import { ReactNode } from "react";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <MswProvider>
      <QueryProvider>
        <ModalProvider>
          <LayoutSelector>
            {children}
            <ToastContainer />
          </LayoutSelector>
        </ModalProvider>
      </QueryProvider>
    </MswProvider>
  );
}
