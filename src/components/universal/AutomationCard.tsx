import React, { cloneElement, isValidElement } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/_common/ui/card";

export interface AutomationCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  onClick?: () => void;
  className?: string;
}

export function AutomationCard({ title, icon, description, onClick, className }: AutomationCardProps) {
  const processedIcon = isValidElement(icon)
    ? cloneElement(icon, { className: `h-4 w-4 text-muted-foreground ${icon.props.className || ""}`.trim() })
    : icon;

  return (
    <Card onClick={onClick} className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {processedIcon}
      </CardHeader>
      <CardContent>
        <div className="text-sm">{description}</div>
      </CardContent>
    </Card>
  );
}

export default AutomationCard;
