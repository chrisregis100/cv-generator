"use client";

import type { CvTemplateId } from "@/lib/cv-template";
import { CvTemplateCommercialSidebar } from "./commercial-sidebar";
import { CvTemplateDeveloperSidebar } from "./developer-sidebar";
import type { CvTemplateLayoutProps } from "./commercial-sidebar";

export interface CvTemplateRouterProps extends CvTemplateLayoutProps {
  templateId: CvTemplateId;
}

export function CvTemplateRouter({ templateId, ...rest }: CvTemplateRouterProps) {
  if (templateId === "developer_sidebar") {
    return <CvTemplateDeveloperSidebar {...rest} />;
  }
  return <CvTemplateCommercialSidebar {...rest} />;
}
