'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Bot, 
  LayoutGrid, 
  Activity, 
  Users,
  Command,
  Menu,
  RefreshCw,
  Eye,
  GitBranch,
  Terminal,
  Gauge,
  Settings
} from 'lucide-react';

import { designTokens, componentTokens } from '@/lib/design-tokens';

interface UnifiedLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const navigationItems: NavItem[] = [
  { href: '/', label: 'OVERVIEW', icon: Eye },
  { href: '/agents', label: 'AGENTS', icon: Bot },
  { href: '/chart', label: 'ORG STRUCTURE', icon: GitBranch },
  { href: '/teams', label: 'TEAMS', icon: Users },
  { href: '/operations', label: 'OPERATIONS', icon: Activity },
  { href: '/system', label: 'SYSTEM', icon: Terminal }
];

export function UnifiedLayout({ children, title = 'MISSION CONTROL', subtitle = 'OPENCLAW COMMAND INTERFACE • v2.0 • ENHANCED' }: UnifiedLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className={`min-h-screen ${designTokens.colors.background.primary} ${designTokens.colors.text.primary} relative overflow-hidden`}>
      {/* Animated Background */}
      <div className={`fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black`} />
      <div 
        className="fixed inset-0"
        style={designTokens.patterns.grid}
      />

      {/* Header Command Bar */}
      <header className={`relative z-20 ${designTokens.colors.border.primary} border-b ${designTokens.colors.background.overlay} backdrop-blur-xl`}>
        <div className={`px-6 py-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
              
              {/* Command Identity */}
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-600 ${designTokens.radius.lg} flex items-center justify-center ${designTokens.shadows.lg}`}>
                  <Command className="h-7 w-7 text-slate-900" />
                </div>
                <div>
                  <h1 className={`${designTokens.typography.sizes.xl} ${designTokens.typography.weights.black} uppercase ${designTokens.typography.tracking.widest} ${designTokens.typography.fonts.mono} ${designTokens.colors.text.primary}`}>
                    {title}
                  </h1>
                  <div className={`${designTokens.typography.sizes.xs} ${designTokens.colors.text.tertiary} ${designTokens.typography.fonts.mono} ${designTokens.typography.tracking.wider}`}>
                    {subtitle}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Control Panel */}
            <div className="flex items-center gap-3">
              <button
                className={`flex items-center gap-2 px-3 py-1.5 ${designTokens.colors.background.tertiary} hover:bg-slate-700 ${designTokens.radius.lg} ${designTokens.typography.sizes.xs} ${designTokens.typography.fonts.mono} ${designTokens.typography.weights.bold} uppercase ${designTokens.typography.tracking.wider} transition-colors`}
              >
                <RefreshCw className="h-3 w-3" />
                REFRESH
              </button>
              
              <div className={`flex items-center gap-2 px-3 py-1.5 ${designTokens.colors.accent.success.split(' ')[0]}/20 border ${designTokens.colors.accent.success.split(' ')[0].replace('text-', 'border-')}/30 ${designTokens.radius.lg}`}>
                <div className={componentTokens.statusActive} />
                <span className={`text-[10px] ${designTokens.typography.fonts.mono} ${designTokens.typography.weights.bold} ${designTokens.colors.accent.success.split(' ')[0]} uppercase ${designTokens.typography.tracking.wider}`}>
                  LIVE FEED ACTIVE
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex relative z-10">
        {/* Command Sidebar */}
        <aside className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-30 w-72 transform ${designTokens.colors.border.primary} border-r ${designTokens.colors.background.overlay} backdrop-blur-xl transition-transform lg:relative lg:translate-x-0`}>
          <nav className="flex h-full flex-col p-6">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`${componentTokens.navItem} ${
                      isActive 
                        ? `${componentTokens.navItemActive}`
                        : `${designTokens.colors.text.tertiary} hover:${designTokens.colors.text.secondary} hover:${designTokens.colors.background.tertiary}`
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                    {item.badge && (
                      <span className={`ml-auto px-2 py-1 ${designTokens.colors.background.tertiary} ${designTokens.colors.text.secondary} ${designTokens.typography.sizes.xs} ${designTokens.radius.md}`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* System Status */}
            <div className="mt-auto pt-6 space-y-3">
              <div className={`p-4 ${designTokens.colors.background.card} ${designTokens.colors.border.primary} border ${designTokens.radius.lg}`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className={componentTokens.statusActive} />
                  <span className={`${designTokens.typography.sizes.xs} ${designTokens.typography.fonts.mono} ${designTokens.typography.weights.bold} ${designTokens.colors.accent.success.split(' ')[0]} uppercase`}>
                    SYSTEMS OPERATIONAL
                  </span>
                </div>
                <div className={`${designTokens.typography.sizes.xs} ${designTokens.colors.text.tertiary}`}>
                  All services running normally
                </div>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800;900&display=swap');
        
        .font-mono {
          font-family: 'JetBrains Mono', monospace;
        }
      `}</style>
    </div>
  );
}