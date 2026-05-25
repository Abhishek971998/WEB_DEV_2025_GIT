export default function SeniorReactProjectGuide() {
  const categories = [
    {
      title: "Architecture & Scalability",
      icon: "🏗️",
      gradient: "from-cyan-500 to-blue-600",
      topics: [
        {
          title: "Feature Driven Architecture",
          points: [
            "Use domain-based folder structure",
            "Separate business logic from UI",
            "Avoid gigantic shared folders",
            "Keep feature ownership isolated",
            "Use barrel exports carefully",
          ],
        },
        {
          title: "Monorepo Strategy",
          points: [
            "Use Turborepo or Nx",
            "Share design systems across apps",
            "Separate packages/ui, packages/utils",
            "Version internal libraries properly",
          ],
        },
        {
          title: "Micro Frontends",
          points: [
            "Useful only for very large organizations",
            "Avoid unless multiple teams deploy independently",
            "Module federation for runtime sharing",
          ],
        },
      ],
    },
    {
      title: "Styling System",
      icon: "🎨",
      gradient: "from-pink-500 to-rose-600",
      topics: [
        {
          title: "REM vs PX",
          points: [
            "Use REM for typography and spacing",
            "Use PX for borders and hairlines only",
            "REM improves accessibility and scaling",
            "Use fluid typography with clamp()",
          ],
        },
        {
          title: "Tailwind CSS",
          points: [
            "Best for large scalable systems",
            "Avoids CSS conflicts",
            "Improves consistency",
            "Use CVA for variants",
            "Use tailwind-merge and clsx",
          ],
        },
        {
          title: "Design Tokens",
          points: [
            "Use CSS variables for themes",
            "Maintain spacing scales",
            "Create typography systems",
            "Support dark/light themes",
          ],
        },
      ],
    },
    {
      title: "Assets & Media",
      icon: "🖼️",
      gradient: "from-orange-500 to-amber-600",
      topics: [
        {
          title: "SVG vs PNG",
          points: [
            "SVG for icons and logos",
            "SVG supports animations and CSS styling",
            "SVG scales infinitely without blur",
            "PNG only for complex raster graphics",
            "Use WebP/AVIF for modern image optimization",
          ],
        },
        {
          title: "Image Optimization",
          points: [
            "Always lazy load images",
            "Use responsive image sizes",
            "Compress assets aggressively",
            "Avoid giant hero images",
          ],
        },
      ],
    },
    {
      title: "State Management",
      icon: "⚡",
      gradient: "from-violet-500 to-purple-700",
      topics: [
        {
          title: "Modern State Strategy",
          points: [
            "useState for local state",
            "Zustand for app state",
            "TanStack Query for server state",
            "Avoid massive Redux stores",
            "Separate UI state from backend state",
          ],
        },
        {
          title: "Caching Strategy",
          points: [
            "Use stale-while-revalidate",
            "Background refresh improves UX",
            "Optimistic updates reduce latency",
            "Invalidate queries carefully",
          ],
        },
      ],
    },
    {
      title: "Performance",
      icon: "🚀",
      gradient: "from-emerald-500 to-green-700",
      topics: [
        {
          title: "Frontend Performance",
          points: [
            "Use route-based code splitting",
            "Lazy load heavy components",
            "Use virtualization for large lists",
            "Avoid unnecessary re-renders",
            "Memoize only when needed",
          ],
        },
        {
          title: "Core Web Vitals",
          points: [
            "Optimize LCP images",
            "Reduce CLS using dimensions",
            "Minimize JS execution time",
            "Use skeleton loaders",
          ],
        },
      ],
    },
    {
      title: "Component Design",
      icon: "🧩",
      gradient: "from-indigo-500 to-blue-700",
      topics: [
        {
          title: "Reusable Components",
          points: [
            "Build atomic UI systems",
            "Prefer composition over inheritance",
            "Keep components small",
            "Avoid prop explosion",
            "Use slots and compound patterns",
          ],
        },
        {
          title: "Patterns",
          points: [
            "Compound components",
            "Render props",
            "Custom hooks",
            "Headless components",
          ],
        },
      ],
    },
    {
      title: "Forms & Validation",
      icon: "📋",
      gradient: "from-fuchsia-500 to-pink-700",
      topics: [
        {
          title: "Best Stack",
          points: [
            "React Hook Form",
            "Zod validation",
            "Debounced validations",
            "Accessible error states",
            "Schema driven forms",
          ],
        },
      ],
    },
    {
      title: "API & Networking",
      icon: "🌐",
      gradient: "from-sky-500 to-cyan-700",
      topics: [
        {
          title: "API Layer",
          points: [
            "Never call APIs directly in components",
            "Use repository/service layers",
            "Centralize error handling",
            "Handle token refresh globally",
            "Use interceptors",
          ],
        },
        {
          title: "GraphQL vs REST",
          points: [
            "REST simpler for most apps",
            "GraphQL useful for complex data dependencies",
            "Use persisted queries for performance",
          ],
        },
      ],
    },
    {
      title: "Security",
      icon: "🔐",
      gradient: "from-red-500 to-rose-700",
      topics: [
        {
          title: "Frontend Security",
          points: [
            "Prevent XSS attacks",
            "Sanitize HTML content",
            "Avoid dangerouslySetInnerHTML",
            "Protect tokens",
            "Use CSP headers",
            "Validate all user inputs",
          ],
        },
      ],
    },
    {
      title: "Accessibility",
      icon: "♿",
      gradient: "from-lime-500 to-green-700",
      topics: [
        {
          title: "A11Y Essentials",
          points: [
            "Keyboard navigation",
            "Proper semantic HTML",
            "ARIA labels",
            "Focus management",
            "Screen reader support",
            "Color contrast compliance",
          ],
        },
      ],
    },
    {
      title: "Testing Strategy",
      icon: "🧪",
      gradient: "from-yellow-500 to-orange-700",
      topics: [
        {
          title: "Testing Pyramid",
          points: [
            "Vitest/Jest for unit tests",
            "React Testing Library for behavior",
            "Playwright for E2E testing",
            "Avoid implementation-detail tests",
          ],
        },
      ],
    },
    {
      title: "Developer Experience",
      icon: "💻",
      gradient: "from-teal-500 to-emerald-700",
      topics: [
        {
          title: "DX Tooling",
          points: [
            "ESLint + Prettier",
            "Husky pre-commit hooks",
            "lint-staged",
            "Commit conventions",
            "Storybook documentation",
          ],
        },
      ],
    },
    {
      title: "Senior Engineering Mindset",
      icon: "🧠",
      gradient: "from-slate-500 to-gray-700",
      topics: [
        {
          title: "How Senior Engineers Think",
          points: [
            "Optimize for maintainability",
            "Code for future developers",
            "Reduce cognitive load",
            "Design scalable systems",
            "Prefer simplicity over cleverness",
            "Measure before optimizing",
          ],
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.12),transparent_35%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-8">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-slate-300 tracking-wide uppercase">
              Enterprise React Engineering Handbook
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-black leading-tight mb-8">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 text-transparent bg-clip-text">
              Senior React
            </span>
            <br />
            <span className="text-white">Architecture Guide</span>
          </h1>

          <p className="max-w-4xl mx-auto text-xl text-slate-400 leading-9">
            A complete modern frontend engineering handbook covering
            architecture, scalability, performance, accessibility, TypeScript,
            design systems, security, testing, DX, optimization, patterns, and
            enterprise-grade React development.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl hover:border-white/20 transition-all duration-500 hover:-translate-y-2"
            >
              <div
                className={`absolute inset-0 opacity-10 bg-gradient-to-br ${category.gradient}`}
              />

              <div className="relative p-8">
                <div className="flex items-center gap-5 mb-8">
                  <div
                    className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${category.gradient} flex items-center justify-center text-3xl shadow-2xl`}
                  >
                    {category.icon}
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold leading-tight">
                      {category.title}
                    </h2>
                  </div>
                </div>

                <div className="space-y-8">
                  {category.topics.map((topic, topicIndex) => (
                    <div
                      key={topicIndex}
                      className="rounded-2xl border border-white/10 bg-black/20 p-5 hover:bg-black/30 transition-all"
                    >
                      <h3 className="text-lg font-semibold mb-4 text-cyan-300">
                        {topic.title}
                      </h3>

                      <div className="space-y-3">
                        {topic.points.map((point, pointIndex) => (
                          <div
                            key={pointIndex}
                            className="flex items-start gap-3 text-slate-300 leading-7"
                          >
                            <div className="mt-2 w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0" />
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 relative overflow-hidden rounded-[40px] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-violet-500/10 p-12 backdrop-blur-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.2),transparent_30%)]" />

          <div className="relative z-10">
            <h2 className="text-5xl font-black mb-8 bg-gradient-to-r from-cyan-300 to-violet-300 text-transparent bg-clip-text">
              Recommended 2026 React Stack
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {[
                {
                  title: "Core",
                  items: ["React", "TypeScript", "Vite", "Next.js"],
                },
                {
                  title: "Styling",
                  items: ["Tailwind CSS", "shadcn/ui", "CVA", "Framer Motion"],
                },
                {
                  title: "State & Data",
                  items: [
                    "TanStack Query",
                    "Zustand",
                    "Axios",
                    "React Hook Form",
                  ],
                },
                {
                  title: "Quality",
                  items: ["Vitest", "Playwright", "ESLint", "Storybook"],
                },
              ].map((stack, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-white/10 bg-black/20 p-6"
                >
                  <h3 className="text-2xl font-bold mb-5 text-cyan-300">
                    {stack.title}
                  </h3>

                  <div className="space-y-3">
                    {stack.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex items-center gap-3 text-slate-300"
                      >
                        <div className="w-2 h-2 rounded-full bg-violet-400" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
