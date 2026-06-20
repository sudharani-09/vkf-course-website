"use client";

import { createContext, useContext, type ReactNode } from "react";
import { DEFAULT_CMS, type CmsData } from "@/lib/cms";

const CmsContext = createContext<CmsData>(DEFAULT_CMS);

export function CmsProvider({ cms, children }: { cms: CmsData; children: ReactNode }) {
  return <CmsContext.Provider value={cms}>{children}</CmsContext.Provider>;
}

export function useCms() {
  return useContext(CmsContext);
}
