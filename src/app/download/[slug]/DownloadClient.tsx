"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Monitor,
  Cpu,
  MemoryStick,
  HardDrive,
  Shield,
  CheckCircle,
  AlertTriangle,
  Info,
} from "lucide-react";
import type { Game } from "@/data/games";

interface Props {
  game: Game;
}

export default function DownloadClient({ game }: Props) {
  const handleDownload = () => {
    alert(
      "Download functionality will be connected in a later phase. This button is for demonstration purposes only."
    );
  };

  return (
    <div className="pt-20 pb-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          href={`/games/${game.slug}`}
          className="inline-flex items-center gap-2 text-sm text-nexus-text-muted hover:text-nexus-text mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to {game.title}
        </Link>

        <div className="animate-fadeInUp">
          {/* Header */}
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div
              className="w-32 h-32 rounded-xl flex-shrink-0"
              style={{ background: game.coverGradient }}
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold font-[family-name:var(--font-display)]">
                Download {game.title}
              </h1>
              <p className="mt-2 text-nexus-text-muted">{game.description}</p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-nexus-text-muted">
                <span>Version {game.version}</span>
                <span>•</span>
                <span>{game.fileSize}</span>
                <span>•</span>
                <span>
                  {game.developer}
                </span>
              </div>
            </div>
          </div>

          {/* Notice */}
          <div className="mt-8 p-4 rounded-xl bg-nexus-amber/10 border border-nexus-amber/30 flex items-start gap-3">
            <Info className="w-5 h-5 text-nexus-amber flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-nexus-amber">
                Demonstration Only
              </p>
              <p className="text-sm text-nexus-text-muted mt-1">
                The download button below is for demonstration purposes. Real
                game downloads will be available once the backend
                infrastructure is connected in a later phase.
              </p>
            </div>
          </div>

          {/* Download button */}
          <div className="mt-8">
            <button
              onClick={handleDownload}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-nexus-purple-dark to-nexus-purple text-white font-bold text-lg flex items-center justify-center gap-3 hover:opacity-90 transition-all glow-purple"
            >
              <Download className="w-6 h-6" />
              Download for PC
              <span className="text-sm font-normal text-white/70">
                ({game.fileSize})
              </span>
            </button>
          </div>

          {/* System requirements */}
          {game.systemRequirements && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-6">
                System Requirements
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: Monitor,
                    label: "Operating System",
                    value: game.systemRequirements.os,
                  },
                  {
                    icon: Cpu,
                    label: "Processor",
                    value: game.systemRequirements.processor,
                  },
                  {
                    icon: MemoryStick,
                    label: "Memory",
                    value: game.systemRequirements.memory,
                  },
                  {
                    icon: Monitor,
                    label: "Graphics",
                    value: game.systemRequirements.graphics,
                  },
                  {
                    icon: HardDrive,
                    label: "Storage",
                    value: game.systemRequirements.storage,
                  },
                ].map((req) => (
                  <div
                    key={req.label}
                    className="p-4 rounded-xl bg-nexus-card border border-nexus-border"
                  >
                    <div className="flex items-center gap-2 text-nexus-text-dim text-xs uppercase tracking-wider mb-2">
                      <req.icon className="w-4 h-4" />
                      {req.label}
                    </div>
                    <div className="text-sm text-nexus-text font-medium">
                      {req.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Installation notes */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-6">
              Installation Notes
            </h2>
            <div className="space-y-3">
              {[
                {
                  icon: CheckCircle,
                  color: "text-nexus-green",
                  text: "Download the installer and run the setup wizard",
                },
                {
                  icon: CheckCircle,
                  color: "text-nexus-green",
                  text: "Follow the on-screen instructions to complete installation",
                },
                {
                  icon: Shield,
                  color: "text-nexus-cyan",
                  text: "All downloads are verified and malware-free",
                },
                {
                  icon: AlertTriangle,
                  color: "text-nexus-amber",
                  text: "Ensure you have enough disk space before downloading",
                },
              ].map((note, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg bg-nexus-card/50"
                >
                  <note.icon className={`w-5 h-5 ${note.color} flex-shrink-0`} />
                  <span className="text-sm text-nexus-text-muted">
                    {note.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
