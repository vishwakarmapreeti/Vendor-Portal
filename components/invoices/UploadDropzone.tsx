"use client";

import { useCallback, useRef, useState } from "react";
import { UploadCloud, FileText, CheckCircle2, Loader2, X, Sparkles, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type FileEntry = {
  id: string;
  name: string;
  size: string;
  stage: "uploading" | "matching" | "matched" | "review";
};

interface UploadDropzoneProps {
  onPdfProcessed: (data: any) => void;
}

const STAGE_LABEL: Record<FileEntry["stage"], string> = {
  uploading: "Uploading",
  matching: "Matching to SAP PO",
  matched: "3-way match complete",
  review: "Needs review",
};

export function UploadDropzone({ onPdfProcessed }: UploadDropzoneProps) {
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const addFiles = useCallback(
    async (list: FileList | null) => {
      if (!list) return;

      const file = list[0];

      if (!file) return;

      setUploadError("");
      setIsProcessing(true);

      const entry: FileEntry = {
        id: `${file.name}-${Date.now()}`,
        name: file.name,
        size: `${(file.size / 1024).toFixed(0)} KB`,
        stage: "uploading",
      };

      setFiles((prev) => [entry, ...prev]);

      try {
        const formData = new FormData();
        formData.append("file", file);

        setFiles((prev) =>
          prev.map((f) => (f.id === entry.id ? { ...f, stage: "matching" } : f))
        );

        const res = await fetch("/api/invoice", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const error = await res.json();
          console.error("API Error:", error);

          throw new Error(error.error || "Failed to process document");
        }

        const json = await res.json();

        console.log("Invoice JSON:", json.data);
        onPdfProcessed(json.data);

        setFiles((prev) =>
          prev.map((f) =>
            f.id === entry.id ? { ...f, stage: "matched" } : f
          )
        );
      } catch (error) {
        console.error(error);

        setUploadError("Failed to process PDF");

        setFiles((prev) =>
          prev.map((f) =>
            f.id === entry.id ? { ...f, stage: "review" } : f
          )
        );
      } finally {
        setIsProcessing(false);
      }
    },
    [onPdfProcessed]
  );

  return (
    <div className="space-y-">
      {/* Dropzone Area */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          addFiles(e.dataTransfer.files);
        }}
        onClick={() => {
          if (!isProcessing) {
            inputRef.current?.click();
          }
        }}
        className={cn(
          "group relative cursor-pointer overflow-hidden rounded-3xl border-2 border-dashed p-2 text-center transition-all duration-500",
          dragOver
            ? "border-orange-400 bg-gradient-to-br from-orange-50 via-orange-100/50 to-orange-50 shadow-2xl shadow-orange-200/40 scale-[1.02]"
            : "border-orange-200 bg-gradient-to-br from-white via-orange-50/30 to-white hover:border-orange-300 hover:shadow-xl hover:shadow-orange-100/30"
        )}
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={cn(
              "absolute -inset-[100%] bg-[linear-gradient(45deg,transparent_45%,rgba(251,146,60,0.03)_50%,transparent_55%)] animate-[spin_20s_linear_infinite]",
              dragOver && "animate-[spin_8s_linear_infinite]"
            )}
          />
        </div>

        {/* Floating Orbs */}
        <div className="absolute -right-20 -top-20 h-15 w-40 rounded-full bg-gradient-to-br from-orange-200/40 to-orange-100/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-15 w-40 rounded-full bg-gradient-to-br from-orange-100/30 to-orange-50/10 blur-3xl" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Icon Container */}
          <div
            className={cn(
              "relative flex h-20 w-20 items-center justify-center rounded-3xl shadow-2xl transition-all duration-500",
              isProcessing
                ? "bg-gradient-to-br from-orange-400 to-orange-500 shadow-orange-300/50"
                : dragOver
                  ? "bg-gradient-to-br from-orange-500 to-orange-600 shadow-orange-400/60 scale-110"
                  : "bg-gradient-to-br from-orange-400 to-orange-500 shadow-orange-300/40 group-hover:scale-105 group-hover:shadow-orange-400/50"
            )}
          >
            {isProcessing ? (
              <Loader2 size={32} className="animate-spin text-white" />
            ) : (
              <UploadCloud size={32} className="text-white" strokeWidth={2} />
            )}

            {/* Animated Ring */}
            {!isProcessing && (
              <div
                className={cn(
                  "absolute inset-0 rounded-3xl border-2 border-orange-300/50 transition-all duration-500",
                  dragOver ? "scale-125 opacity-0" : "scale-100 opacity-100"
                )}
              />
            )}

            {/* Sparkles */}
            {!isProcessing && !dragOver && (
              <Sparkles
                size={16}
                className="absolute -right-1 -top-1 text-orange-300 animate-pulse"
              />
            )}
          </div>

          {/* Text */}
          <h3 className="mt-6 text-lg font-bold text-gray-800">
            {isProcessing
              ? "Processing your document..."
              : dragOver
                ? "Drop your invoice here"
                : "Drag & drop invoice PDFs"}
          </h3>

          <p className="mt-2 max-w-md text-sm text-gray-500">
            {isProcessing
              ? "Please wait, this may take 10-20 seconds to match with SAP POs."
              : "or click to browse · PDF, JPG, PNG up to 15MB · auto-matched to open SAP POs"}
          </p>

          {/* Feature Pills */}
          {!isProcessing && !dragOver && (
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <span className="rounded-full bg-orange-100/80 px-3 py-1 text-xs font-medium text-orange-700">
                AI-Powered Matching
              </span>
              <span className="rounded-full bg-orange-100/80 px-3 py-1 text-xs font-medium text-orange-700">
                SAP Integration
              </span>
              <span className="rounded-full bg-orange-100/80 px-3 py-1 text-xs font-medium text-orange-700">
                3-Way Validation
              </span>
            </div>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {/* Error Message */}
      {uploadError && (
        <div className="flex items-center gap-3 rounded-2xl bg-red-50 p-4 border border-red-100">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100">
            <AlertCircle size={20} className="text-red-500" />
          </div>
          <div>
            <p className="font-semibold text-red-700">Upload Failed</p>
            <p className="text-sm text-red-500">{uploadError}</p>
          </div>
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <p className="text-sm font-semibold text-gray-700">
              Uploaded Documents
            </p>
            <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-bold text-orange-600">
              {files.length} file{files.length !== 1 ? "s" : ""}
            </span>
          </div>

          {files.map((f) => (
            <div
              key={f.id}
              className="group relative overflow-hidden rounded-2xl bg-white border border-orange-100/80 p-4 shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-300"
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-50/0 via-orange-50/50 to-orange-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative flex items-center justify-between">
                {/* Left Side - File Info */}
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300",
                      f.stage === "matched"
                        ? "bg-gradient-to-br from-emerald-100 to-emerald-50"
                        : f.stage === "review"
                          ? "bg-gradient-to-br from-red-100 to-red-50"
                          : "bg-gradient-to-br from-orange-100 to-orange-50"
                    )}
                  >
                    <FileText
                      size={20}
                      className={cn(
                        f.stage === "matched"
                          ? "text-emerald-600"
                          : f.stage === "review"
                            ? "text-red-500"
                            : "text-orange-500"
                      )}
                    />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800 group-hover:text-orange-700 transition-colors">
                      {f.name}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-xs text-gray-400">{f.size}</p>
                      <span className="h-1 w-1 rounded-full bg-gray-200" />
                      <p className="text-xs text-gray-400">
                        Added just now
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Side - Badge & Actions */}
                <div className="flex items-center gap-3">
                  <StageBadge stage={f.stage} />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setFiles((prev) => prev.filter((x) => x.id !== f.id));
                    }}
                    className="rounded-xl p-2 text-gray-300 hover:bg-red-50 hover:text-red-500 transition-colors"
                    aria-label="Remove"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StageBadge({ stage }: { stage: FileEntry["stage"] }) {
  if (stage === "uploading" || stage === "matching") {
    return (
      <span className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-50 to-blue-50 px-4 py-2 text-xs font-semibold text-sky-700 ring-1 ring-sky-200/60 shadow-sm">
        <Loader2 size={14} className="animate-spin" />
        {STAGE_LABEL[stage]}
      </span>
    );
  }
  if (stage === "matched") {
    return (
      <span className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 px-4 py-2 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200/60 shadow-sm">
        <CheckCircle2 size={14} />
        {STAGE_LABEL[stage]}
      </span>
    );
  }
  return (
    <span className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 px-4 py-2 text-xs font-semibold text-orange-700 ring-1 ring-orange-200/60 shadow-sm">
      <AlertCircle size={14} />
      {STAGE_LABEL[stage]}
    </span>
  );
}
