import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";
import React from "react";

interface GuideCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: (title: string, buttonText: string) => void;
  onFileUpload?: (file: File) => void;
}

export default function GuideCard({ icon: Icon, title, description, buttonText, onButtonClick, onFileUpload }: GuideCardProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleMainButtonClick = () => {
    if (title === "Datasheet解读" && onFileUpload) {
      fileInputRef.current?.click();
    } else {
      onButtonClick(title, buttonText);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onFileUpload) {
      onFileUpload(file);
      // Optionally, inform that a file was selected for a specific action
      onButtonClick(title, `已选择文件: ${file.name}`);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input
    }
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow w-full flex flex-col">
      <CardHeader className="items-center text-center pt-6 pb-3">
        <div className="p-3 bg-primary/10 rounded-full mb-2">
          <Icon className="h-7 w-7 text-primary" />
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center text-sm text-muted-foreground flex-grow min-h-[70px] px-4 pb-4">
        {description}
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto">
        <Button onClick={handleMainButtonClick} variant="outline" className="w-full border-accent text-accent hover:bg-accent/10 hover:text-accent">
          {buttonText}
        </Button>
        {title === "Datasheet解读" && onFileUpload && (
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.txt,application/pdf,text/plain"
          />
        )}
      </CardFooter>
    </Card>
  );
}
