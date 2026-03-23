/**
 * Design System Tokens for Mission Control
 * Unified design system for consistent theming across all pages
 */

export const designTokens = {
  // Color Palette - Command Center Dark Theme
  colors: {
    // Primary backgrounds
    background: {
      primary: 'bg-slate-950',
      secondary: 'bg-slate-900',
      tertiary: 'bg-slate-800',
      overlay: 'bg-slate-900/90',
      card: 'bg-slate-900/60'
    },
    
    // Text colors
    text: {
      primary: 'text-white',
      secondary: 'text-slate-300',
      tertiary: 'text-slate-400',
      muted: 'text-slate-500'
    },
    
    // Accent colors
    accent: {
      primary: 'text-amber-400 bg-amber-400',
      secondary: 'text-cyan-400 bg-cyan-400', 
      success: 'text-emerald-400 bg-emerald-400',
      warning: 'text-yellow-400 bg-yellow-400',
      danger: 'text-red-400 bg-red-400'
    },
    
    // Border colors
    border: {
      primary: 'border-slate-700/50',
      secondary: 'border-slate-800/50',
      accent: 'border-amber-400/30'
    }
  },
  
  // Typography
  typography: {
    fonts: {
      mono: 'font-mono', // JetBrains Mono
      sans: 'font-sans'   // System UI
    },
    
    sizes: {
      xs: 'text-xs',
      sm: 'text-sm', 
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl'
    },
    
    weights: {
      normal: 'font-normal',
      medium: 'font-medium',
      bold: 'font-bold',
      black: 'font-black'
    },
    
    tracking: {
      tight: 'tracking-tight',
      normal: 'tracking-normal', 
      wide: 'tracking-wide',
      wider: 'tracking-wider',
      widest: 'tracking-widest'
    }
  },
  
  // Spacing
  spacing: {
    xs: 'p-2',
    sm: 'p-4',
    md: 'p-6', 
    lg: 'p-8',
    xl: 'p-12'
  },
  
  // Border radius
  radius: {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl'
  },
  
  // Shadows
  shadows: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  },
  
  // Animations
  animations: {
    pulse: 'animate-pulse',
    spin: 'animate-spin',
    bounce: 'animate-bounce'
  },
  
  // Grid patterns for command center aesthetic
  patterns: {
    grid: {
      backgroundImage: `
        linear-gradient(rgba(148, 163, 184, 0.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(148, 163, 184, 0.02) 1px, transparent 1px)
      `,
      backgroundSize: '50px 50px'
    },
    
    fineGrid: {
      backgroundImage: `
        linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)
      `,
      backgroundSize: '20px 20px'
    }
  }
} as const;

// Component-specific token combinations
export const componentTokens = {
  // Command card styling
  commandCard: `
    ${designTokens.colors.background.card} 
    ${designTokens.colors.border.primary} 
    border 
    backdrop-blur-sm 
    ${designTokens.radius.md}
  `,
  
  // Metric card styling  
  metricCard: `
    ${designTokens.colors.background.secondary} 
    ${designTokens.colors.border.primary} 
    border 
    ${designTokens.radius.lg} 
    ${designTokens.shadows.md}
  `,
  
  // Navigation item styling
  navItem: `
    flex items-center gap-3 px-4 py-3 
    ${designTokens.radius.lg} 
    ${designTokens.typography.fonts.mono} 
    ${designTokens.typography.weights.medium} 
    ${designTokens.typography.sizes.sm} 
    uppercase 
    ${designTokens.typography.tracking.wider}
    transition-colors
  `,
  
  // Active navigation item
  navItemActive: `
    ${designTokens.colors.accent.primary.split(' ')[0]}/20 
    border 
    ${designTokens.colors.border.accent} 
    ${designTokens.colors.accent.primary.split(' ')[0]}
  `,
  
  // Button styling
  button: `
    px-4 py-2 
    ${designTokens.radius.lg} 
    ${designTokens.typography.fonts.mono} 
    ${designTokens.typography.weights.bold} 
    ${designTokens.typography.sizes.sm} 
    uppercase 
    ${designTokens.typography.tracking.wider}
    transition-colors
  `,
  
  // Status indicators
  statusActive: `
    w-2 h-2 
    ${designTokens.colors.accent.success.split(' ')[1]} 
    rounded-full 
    ${designTokens.animations.pulse}
  `,
  
  statusIdle: `
    w-2 h-2 
    ${designTokens.colors.accent.secondary.split(' ')[1]} 
    rounded-full
  `,
  
  statusOffline: `
    w-2 h-2 
    ${designTokens.colors.text.muted.replace('text-', 'bg-')} 
    rounded-full
  `
} as const;

// Utility functions for dynamic styling
export const getStatusColor = (status: 'active' | 'idle' | 'busy' | 'offline' | 'completed') => {
  const colors = {
    active: 'text-emerald-400 bg-emerald-400',
    idle: 'text-blue-400 bg-blue-400', 
    busy: 'text-yellow-400 bg-yellow-400',
    offline: 'text-slate-500 bg-slate-500',
    completed: 'text-emerald-400 bg-emerald-400'
  };
  return colors[status];
};

export const getAccentGradient = (type: 'command' | 'operational' | 'critical' | 'intel') => {
  const gradients = {
    command: 'bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-600',
    operational: 'bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600',
    critical: 'bg-gradient-to-br from-red-400 via-pink-500 to-purple-600', 
    intel: 'bg-gradient-to-br from-blue-400 via-cyan-500 to-indigo-600'
  };
  return gradients[type];
};