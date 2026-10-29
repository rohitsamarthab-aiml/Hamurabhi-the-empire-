"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Gamepad2,
  Users,
  DollarSign,
  TrendingUp,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  AlertTriangle,
  CheckCircle,
  X,
  Server,
  Download,
  Globe,
  Sparkles,
} from "lucide-react";
import { games as initialGames, adminStats, Game, GameCategory, DeliveryMode, AccessTier } from "@/data/games";

export default function AdminPage() {
  const [gamesList, setGamesList] = useState<Game[]>(initialGames);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editGame, setEditGame] = useState<Game | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states for adding/editing a mock game
  const [formTitle, setFormTitle] = useState("");
  const [formDelivery, setFormDelivery] = useState<DeliveryMode>("browser");
  const [formTier, setFormTier] = useState<AccessTier>("free");
  const [formCategory, setFormCategory] = useState<GameCategory>("Action");
  const [formDeveloper, setFormDeveloper] = useState("");
  const [formVersion, setFormVersion] = useState("1.0.0");
  const [formFileSize, setFormFileSize] = useState("500 MB");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredGames = gamesList.filter((g) => {
    const matchesSearch =
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.developer.toLowerCase().includes(searchQuery.toLowerCase());
    if (selectedFilter === "all") return matchesSearch;
    if (selectedFilter === "browser") return matchesSearch && g.deliveryMode === "browser";
    if (selectedFilter === "download") return matchesSearch && g.deliveryMode === "download";
    if (selectedFilter === "premium") return matchesSearch && g.accessTier === "premium";
    if (selectedFilter === "free") return matchesSearch && g.accessTier === "free";
    return matchesSearch;
  });

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to remove "${title}" from the mock catalog?`)) {
      setGamesList((prev) => prev.filter((g) => g.id !== id));
      showToast(`Removed "${title}" from mock listings`);
    }
  };

  const handleAddGameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const newGame: Game = {
      id: String(Date.now()),
      title: formTitle,
      slug: formTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      description: `Newly submitted mock game ${formTitle} by ${formDeveloper || "Independent Developer"}.`,
      longDescription: `Full catalog description for ${formTitle}. Managed via the Nexus Admin Portal demonstration interface.`,
      categories: [formCategory],
      deliveryMode: formDelivery,
      accessTier: formTier,
      rating: 4.5,
      players: "1-4 Players",
      developer: formDeveloper || "Studio Nexus",
      publisher: "Nexus Publishing",
      releaseDate: new Date().toISOString().split("T")[0],
      version: formVersion,
      fileSize: formFileSize,
      coverGradient: "linear-gradient(135deg, #1f1c2c, #928dab)",
      heroGradient: "linear-gradient(135deg, #2c3e50, #3498db)",
      accentColor: "#a855f7",
      screenshots: [
        { id: "1", alt: "Screenshot", gradient: "linear-gradient(135deg, #09203f, #537895)" }
      ],
      isFeatured: false,
      isTrending: true,
      isNew: true,
    };

    setGamesList((prev) => [newGame, ...prev]);
    setIsAddModalOpen(false);
    setFormTitle("");
    setFormDeveloper("");
    showToast(`Game "${newGame.title}" successfully created!`);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-nexus-surface border border-nexus-purple text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fadeIn">
          <CheckCircle className="w-5 h-5 text-nexus-cyan" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header & Demo Disclaimer */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-nexus-purple/20 border border-nexus-purple/40 flex items-center justify-center text-nexus-purple-light">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold font-[family-name:var(--font-display)] text-white tracking-tight">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-nexus-text-muted">
                  Catalog management and platform operations demonstration
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-nexus-purple to-nexus-cyan text-white font-medium hover:opacity-90 shadow-lg shadow-nexus-purple/20 transition-all cursor-pointer self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            Add New Game Listing
          </button>
        </div>

        {/* Security & Mock Disclaimer Banner */}
        <div className="mt-6 p-4 rounded-xl bg-nexus-surface border border-nexus-amber/40 flex items-start gap-3 text-nexus-text-muted">
          <AlertTriangle className="w-5 h-5 text-nexus-amber flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <span className="font-semibold text-nexus-amber">Frontend Prototype Notice: </span>
            This interface is a frontend demonstration for viewing and managing game listings using client-side mock data. No real backend, database, or authentication system is connected in this phase, and administrative permissions are not secured.
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="glass-card p-5 rounded-2xl border border-nexus-border">
          <div className="flex items-center justify-between text-nexus-text-muted mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold">Total Catalog Games</span>
            <Gamepad2 className="w-4 h-4 text-nexus-purple-light" />
          </div>
          <div className="text-2xl font-bold text-white font-[family-name:var(--font-display)]">
            {gamesList.length}
          </div>
          <div className="text-xs text-nexus-cyan flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" />
            Active mock titles
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-nexus-border">
          <div className="flex items-center justify-between text-nexus-text-muted mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold">Registered Players</span>
            <Users className="w-4 h-4 text-nexus-cyan" />
          </div>
          <div className="text-2xl font-bold text-white font-[family-name:var(--font-display)]">
            {adminStats.totalUsers.toLocaleString()}
          </div>
          <div className="text-xs text-nexus-text-muted mt-1">
            {adminStats.activeToday.toLocaleString()} online now
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-nexus-border">
          <div className="flex items-center justify-between text-nexus-text-muted mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold">Premium Subscribers</span>
            <Sparkles className="w-4 h-4 text-nexus-amber" />
          </div>
          <div className="text-2xl font-bold text-white font-[family-name:var(--font-display)]">
            {adminStats.premiumSubscribers.toLocaleString()}
          </div>
          <div className="text-xs text-nexus-cyan flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" />
            {adminStats.monthlyGrowth} this month
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-nexus-border">
          <div className="flex items-center justify-between text-nexus-text-muted mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold">Mock Platform Revenue</span>
            <DollarSign className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white font-[family-name:var(--font-display)]">
            {adminStats.revenue}
          </div>
          <div className="text-xs text-nexus-text-muted mt-1">
            Simulated financial metric
          </div>
        </div>
      </div>

      {/* Catalog Management Section */}
      <div className="glass-card rounded-2xl border border-nexus-border overflow-hidden">
        {/* Controls Bar */}
        <div className="p-5 border-b border-nexus-border flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white">Game Catalog Registry</h2>
            <p className="text-xs text-nexus-text-muted">
              Showing {filteredGames.length} of {gamesList.length} game records
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-nexus-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search games or studio..."
                className="w-full bg-nexus-surface/80 border border-nexus-border rounded-xl pl-9 pr-3 py-1.5 text-sm text-white placeholder-nexus-text-muted focus:outline-none focus:border-nexus-purple transition-all"
              />
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1 bg-nexus-surface p-1 rounded-xl border border-nexus-border text-xs">
              {[
                { id: "all", label: "All" },
                { id: "browser", label: "Browser" },
                { id: "download", label: "Download" },
                { id: "premium", label: "Premium" },
                { id: "free", label: "Free" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-3 py-1 rounded-lg font-medium transition-all ${
                    selectedFilter === filter.id
                      ? "bg-nexus-purple text-white shadow"
                      : "text-nexus-text-muted hover:text-white"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-nexus-surface/50 text-nexus-text-muted text-xs uppercase tracking-wider border-b border-nexus-border">
              <tr>
                <th className="py-3 px-5">Game & Studio</th>
                <th className="py-3 px-4">Categories</th>
                <th className="py-3 px-4">Delivery Mode</th>
                <th className="py-3 px-4">Access Tier</th>
                <th className="py-3 px-4">Rating</th>
                <th className="py-3 px-4">Version & Size</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-nexus-border/60">
              {filteredGames.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-nexus-text-muted">
                    No games match the current search and filter criteria.
                  </td>
                </tr>
              ) : (
                filteredGames.map((game) => (
                  <tr key={game.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center text-white/50 text-xs font-bold"
                          style={{ background: game.coverGradient }}
                        >
                          {game.title.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-white hover:text-nexus-cyan transition-colors">
                            <Link href={`/games/${game.slug}`}>{game.title}</Link>
                          </div>
                          <div className="text-xs text-nexus-text-muted">{game.developer}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {game.categories.map((c) => (
                          <span
                            key={c}
                            className="text-[11px] px-2 py-0.5 rounded-md bg-nexus-surface border border-nexus-border text-nexus-text-muted"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      {game.deliveryMode === "browser" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <Globe className="w-3 h-3" />
                          Browser Play
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-nexus-cyan/10 text-nexus-cyan border border-nexus-cyan/20">
                          <Download className="w-3 h-3" />
                          PC Download
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-4">
                      {game.accessTier === "premium" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-nexus-purple/20 text-nexus-purple-light border border-nexus-purple/40">
                          <Sparkles className="w-3 h-3 text-nexus-amber" />
                          Premium
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-white/5 text-nexus-text-muted border border-white/10">
                          Free
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-4 text-white font-medium">
                      ★ {game.rating.toFixed(1)}
                    </td>

                    <td className="py-4 px-4 text-xs text-nexus-text-muted">
                      <div>v{game.version}</div>
                      <div>{game.fileSize}</div>
                    </td>

                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/games/${game.slug}`}
                          className="p-1.5 rounded-lg text-nexus-text-muted hover:text-white hover:bg-white/5 transition-colors"
                          title="View Game Page"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => {
                            showToast(`Editing "${game.title}" (Mock Modal)`);
                          }}
                          className="p-1.5 rounded-lg text-nexus-text-muted hover:text-nexus-cyan hover:bg-white/5 transition-colors cursor-pointer"
                          title="Edit Listing"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(game.id, game.title)}
                          className="p-1.5 rounded-lg text-nexus-text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                          title="Delete Listing"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mock Add Game Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-nexus-bg border border-nexus-border rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-scaleUp">
            <div className="p-5 border-b border-nexus-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-nexus-purple-light" />
                <h3 className="text-lg font-bold text-white font-[family-name:var(--font-display)]">
                  Add Game to Catalog
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-nexus-text-muted hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddGameSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-nexus-text-muted mb-1.5">
                  Game Title *
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Neon Velocity: Horizon"
                  className="w-full bg-nexus-surface border border-nexus-border rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-nexus-purple"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-nexus-text-muted mb-1.5">
                    Delivery Mode
                  </label>
                  <select
                    value={formDelivery}
                    onChange={(e) => setFormDelivery(e.target.value as DeliveryMode)}
                    className="w-full bg-nexus-surface border border-nexus-border rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-nexus-purple"
                  >
                    <option value="browser">Browser Play</option>
                    <option value="download">PC Download</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-nexus-text-muted mb-1.5">
                    Access Tier
                  </label>
                  <select
                    value={formTier}
                    onChange={(e) => setFormTier(e.target.value as AccessTier)}
                    className="w-full bg-nexus-surface border border-nexus-border rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-nexus-purple"
                  >
                    <option value="free">Free</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-nexus-text-muted mb-1.5">
                    Primary Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as GameCategory)}
                    className="w-full bg-nexus-surface border border-nexus-border rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-nexus-purple"
                  >
                    <option value="Action">Action</option>
                    <option value="Adventure">Adventure</option>
                    <option value="RPG">RPG</option>
                    <option value="Strategy">Strategy</option>
                    <option value="Puzzle">Puzzle</option>
                    <option value="Racing">Racing</option>
                    <option value="Shooter">Shooter</option>
                    <option value="Indie">Indie</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-nexus-text-muted mb-1.5">
                    Developer / Studio
                  </label>
                  <input
                    type="text"
                    value={formDeveloper}
                    onChange={(e) => setFormDeveloper(e.target.value)}
                    placeholder="e.g. Ironclad Interactive"
                    className="w-full bg-nexus-surface border border-nexus-border rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-nexus-purple"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-nexus-text-muted mb-1.5">
                    Version
                  </label>
                  <input
                    type="text"
                    value={formVersion}
                    onChange={(e) => setFormVersion(e.target.value)}
                    placeholder="1.0.0"
                    className="w-full bg-nexus-surface border border-nexus-border rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-nexus-purple"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-nexus-text-muted mb-1.5">
                    Package / File Size
                  </label>
                  <input
                    type="text"
                    value={formFileSize}
                    onChange={(e) => setFormFileSize(e.target.value)}
                    placeholder="2.4 GB"
                    className="w-full bg-nexus-surface border border-nexus-border rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-nexus-purple"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-nexus-border flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-nexus-text-muted hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-nexus-purple to-nexus-cyan text-white text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Publish Listing (Mock)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
