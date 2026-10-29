"use client";

import Link from "next/link";
import {
  User,
  Crown,
  Gamepad2,
  Clock,
  Trophy,
  Star,
  Settings,
  Edit3,
  Calendar,
} from "lucide-react";
import { mockUser, getGameById } from "@/data/games";

export default function ProfilePage() {
  const recentGames = mockUser.library.slice(0, 3).map((id) => getGameById(id)).filter(Boolean);
  const xpPercent = Math.round((mockUser.xp / mockUser.xpToNextLevel) * 100);

  return (
    <div className="pt-20 pb-16 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile header */}
        <div className="animate-fadeInUp">
          <div className="relative rounded-2xl overflow-hidden mb-6">
            <div className="h-40 bg-gradient-to-r from-nexus-purple-dark via-nexus-purple to-nexus-cyan" />
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-nexus-bg to-transparent" />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-16 relative z-10 px-4">
            <div className="w-24 h-24 rounded-2xl bg-nexus-card border-4 border-nexus-bg flex items-center justify-center">
              <User className="w-10 h-10 text-nexus-purple-light" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold font-[family-name:var(--font-display)]">
                  {mockUser.displayName}
                </h1>
                {mockUser.membership === "premium" && (
                  <span className="px-2 py-0.5 rounded-md bg-nexus-amber/20 text-nexus-amber text-xs font-semibold flex items-center gap-1">
                    <Crown className="w-3 h-3" /> Premium
                  </span>
                )}
              </div>
              <p className="text-sm text-nexus-text-muted">
                @{mockUser.username} • Member since{" "}
                {new Date(mockUser.memberSince).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </p>
            </div>
            <button className="px-4 py-2 rounded-lg bg-nexus-card border border-nexus-border text-sm text-nexus-text-muted hover:text-nexus-text hover:border-nexus-border-light transition-all flex items-center gap-2">
              <Edit3 className="w-4 h-4" /> Edit Profile
            </button>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 stagger-children">
          {[
            {
              icon: Star,
              label: "Level",
              value: mockUser.level.toString(),
              color: "text-nexus-amber",
            },
            {
              icon: Gamepad2,
              label: "Games Played",
              value: mockUser.gamesPlayed.toString(),
              color: "text-nexus-purple-light",
            },
            {
              icon: Clock,
              label: "Hours Played",
              value: mockUser.hoursPlayed.toString(),
              color: "text-nexus-cyan",
            },
            {
              icon: Trophy,
              label: "Achievements",
              value: mockUser.achievements.toString(),
              color: "text-nexus-green",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-4 rounded-xl bg-nexus-card border border-nexus-border text-center"
            >
              <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-nexus-text-muted mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* XP bar */}
        <div className="mt-8 p-4 rounded-xl bg-nexus-card border border-nexus-border animate-fadeInUp">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-nexus-text">
              Level {mockUser.level} Progress
            </span>
            <span className="text-sm text-nexus-text-muted">
              {mockUser.xp.toLocaleString()} / {mockUser.xpToNextLevel.toLocaleString()} XP
            </span>
          </div>
          <div className="h-3 rounded-full bg-nexus-surface overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-nexus-purple to-nexus-cyan transition-all duration-1000"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
        </div>

        {/* Recent games */}
        <div className="mt-10 animate-fadeInUp">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold font-[family-name:var(--font-display)]">
              Recent Games
            </h2>
            <Link
              href="/library"
              className="text-sm text-nexus-purple-light hover:text-nexus-purple transition-colors"
            >
              View Library →
            </Link>
          </div>
          {recentGames.length > 0 ? (
            <div className="space-y-3">
              {recentGames.map((game) =>
                game ? (
                  <Link
                    key={game.id}
                    href={`/games/${game.slug}`}
                    className="flex items-center gap-4 p-4 rounded-xl bg-nexus-card border border-nexus-border hover:border-nexus-purple/40 transition-all group"
                  >
                    <div
                      className="w-16 h-12 rounded-lg flex-shrink-0"
                      style={{ background: game.coverGradient }}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-nexus-text group-hover:text-nexus-purple-light transition-colors truncate">
                        {game.title}
                      </h3>
                      <p className="text-xs text-nexus-text-muted">
                        {game.categories.join(", ")}
                      </p>
                    </div>
                    <span className="text-xs text-nexus-text-dim hidden sm:block">
                      {game.deliveryMode === "browser" ? "Browser" : "PC"}
                    </span>
                  </Link>
                ) : null
              )}
            </div>
          ) : (
            <div className="text-center py-12 rounded-xl bg-nexus-card border border-nexus-border">
              <Gamepad2 className="w-10 h-10 text-nexus-text-dim mx-auto mb-2" />
              <p className="text-sm text-nexus-text-muted">
                No recent games. Start playing to build your history!
              </p>
            </div>
          )}
        </div>

        {/* Settings shortcut */}
        <div className="mt-10">
          <button className="px-4 py-3 rounded-xl bg-nexus-card border border-nexus-border text-sm text-nexus-text-muted hover:text-nexus-text hover:border-nexus-border-light transition-all flex items-center gap-2 w-full sm:w-auto">
            <Settings className="w-4 h-4" /> Account Settings
          </button>
        </div>
      </div>
    </div>
  );
}
