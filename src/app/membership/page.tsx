"use client";

import {
  Crown,
  Check,
  X,
  Zap,
  Shield,
  Star,
  Gift,
  Info,
} from "lucide-react";
import { membershipPlans } from "@/data/games";

export default function MembershipPage() {
  const handleSubscribe = (planId: string) => {
    alert(
      "Payment processing will be connected in a later phase. This button is for demonstration purposes only."
    );
  };

  return (
    <div className="pt-20 pb-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-nexus-amber/10 border border-nexus-amber/30 text-nexus-amber text-sm font-medium mb-6">
            <Gift className="w-4 h-4" />
            3 Months Free Premium Trial
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-display)]">
            Choose Your{" "}
            <span className="gradient-text">Gaming Plan</span>
          </h1>
          <p className="mt-4 text-lg text-nexus-text-muted max-w-2xl mx-auto">
            Start with our free tier or unlock the full Nexus experience with
            Premium. Try Premium free for 3 calendar months — no payment required
            during the trial.
          </p>
        </div>

        {/* Notice */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="p-4 rounded-xl bg-nexus-purple/10 border border-nexus-purple/30 flex items-start gap-3">
            <Info className="w-5 h-5 text-nexus-purple-light flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-nexus-purple-light">
                Payment Coming Soon
              </p>
              <p className="text-sm text-nexus-text-muted mt-1">
                Payment processing is not yet connected. Subscription buttons
                are for demonstration purposes. Real payment integration will
                be added in a future phase.
              </p>
            </div>
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto stagger-children">
          {membershipPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-6 transition-all duration-300 ${
                plan.highlighted
                  ? "bg-gradient-to-b from-nexus-purple/20 to-nexus-card border-2 border-nexus-purple/50 scale-105 glow-purple"
                  : "bg-nexus-card border border-nexus-border hover:border-nexus-border-light"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span
                    className={`px-4 py-1 rounded-full text-xs font-bold ${
                      plan.badge === "Most Popular"
                        ? "bg-nexus-purple text-white"
                        : "bg-nexus-green text-white"
                    }`}
                  >
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="text-center mb-6 mt-2">
                <h3 className="text-xl font-bold font-[family-name:var(--font-display)]">
                  {plan.name}
                </h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold gradient-text">
                    {plan.price}
                  </span>
                  <span className="text-nexus-text-muted text-sm ml-1">
                    /{plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check
                      className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                        plan.highlighted
                          ? "text-nexus-purple-light"
                          : "text-nexus-green"
                      }`}
                    />
                    <span className="text-sm text-nexus-text-muted">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(plan.id)}
                className={`w-full py-3 rounded-xl font-semibold transition-all ${
                  plan.highlighted
                    ? "bg-gradient-to-r from-nexus-purple to-nexus-cyan text-white hover:opacity-90"
                    : "bg-nexus-surface border border-nexus-border text-nexus-text hover:bg-nexus-card-hover hover:border-nexus-border-light"
                }`}
              >
                {plan.id === "free" ? "Get Started" : "Start Free Trial"}
              </button>
            </div>
          ))}
        </div>

        {/* Trial details */}
        <div className="mt-16 text-center animate-fadeInUp">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-8">
            Your Premium Trial Includes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Crown,
                title: "3 Months Free",
                desc: "Full premium access for 3 calendar months",
                color: "text-nexus-amber",
              },
              {
                icon: Zap,
                title: "All Games",
                desc: "Access every premium title in the catalogue",
                color: "text-nexus-cyan",
              },
              {
                icon: Shield,
                title: "No Payment Now",
                desc: "No credit card required to start the trial",
                color: "text-nexus-green",
              },
              {
                icon: Star,
                title: "Cancel Anytime",
                desc: "No strings attached — cancel before it renews",
                color: "text-nexus-purple-light",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-xl bg-nexus-card border border-nexus-border text-center"
              >
                <item.icon
                  className={`w-8 h-8 mx-auto mb-3 ${item.color}`}
                />
                <h3 className="font-semibold text-nexus-text">{item.title}</h3>
                <p className="mt-2 text-sm text-nexus-text-muted">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison table */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-8 text-center">
            Feature Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full max-w-3xl mx-auto">
              <thead>
                <tr className="border-b border-nexus-border">
                  <th className="py-3 px-4 text-left text-sm font-medium text-nexus-text-muted">
                    Feature
                  </th>
                  <th className="py-3 px-4 text-center text-sm font-medium text-nexus-text-muted">
                    Free
                  </th>
                  <th className="py-3 px-4 text-center text-sm font-medium text-nexus-purple-light">
                    Premium
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-nexus-border">
                {[
                  { feature: "Free games", free: true, premium: true },
                  { feature: "Premium games", free: false, premium: true },
                  { feature: "Browser play", free: true, premium: true },
                  { feature: "PC downloads", free: false, premium: true },
                  { feature: "Cloud saves", free: false, premium: true },
                  { feature: "Ad-free", free: false, premium: true },
                  { feature: "Priority support", free: false, premium: true },
                  { feature: "Early access", free: false, premium: true },
                  { feature: "Exclusive cosmetics", free: false, premium: true },
                ].map((row) => (
                  <tr key={row.feature} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-4 text-sm text-nexus-text">
                      {row.feature}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {row.free ? (
                        <Check className="w-5 h-5 text-nexus-green mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-nexus-text-dim mx-auto" />
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {row.premium ? (
                        <Check className="w-5 h-5 text-nexus-purple-light mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-nexus-text-dim mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
