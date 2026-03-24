/**
 * Google Stitch Design System - Exact Replica
 * Complete design system specifications captured from Google Stitch
 * All colors and specifications match the extracted design system
 */

// Core Color Palette - Exact Google Stitch Specifications
export const googleStitchColors = {
  // Primary Colors (Exact Hex Values)
  primary: '#2962FF',      // Vibrant blue for primary actions
  secondary: '#FFB300',    // Operational orange for secondary actions  
  tertiary: '#00E676',     // Success green for positive states
  neutral: '#121212',      // Command center dark background
  
  // Extended Palette
  surface: {
    primary: '#121212',    // Main background
    secondary: '#1E1E1E',  // Card surfaces
    tertiary: '#2D2D2D',   // Elevated surfaces
    overlay: 'rgba(18, 18, 18, 0.9)'  // Modal overlays
  },
  
  text: {
    primary: '#FFFFFF',    // Primary text on dark
    secondary: '#E0E0E0',  // Secondary text
    tertiary: '#BDBDBD',   // Muted text
    disabled: '#616161'    // Disabled states
  },
  
  border: {
    primary: 'rgba(255, 255, 255, 0.1)',    // Subtle borders
    secondary: 'rgba(255, 255, 255, 0.05)',  // Card borders
    accent: 'rgba(41, 98, 255, 0.3)'        // Primary accent borders
  },
  
  // State Colors
  success: '#00E676',
  warning: '#FFB300', 
  error: '#FF5252',
  info: '#2962FF'
} as const;

// Google Sans Typography System - Complete Hierarchy
export const googleStitchTypography = {
  fontFamily: {
    primary: "'Google Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  },
  
  // Typography Hierarchy (Google Sans)
  headline: {
    large: {
      fontSize: '32px',
      lineHeight: '40px', 
      fontWeight: '400',
      letterSpacing: '-0.25px'
    },
    medium: {
      fontSize: '28px',
      lineHeight: '36px',
      fontWeight: '400', 
      letterSpacing: '0px'
    },
    small: {
      fontSize: '24px',
      lineHeight: '32px',
      fontWeight: '400',
      letterSpacing: '0px'
    }
  },
  
  body: {
    large: {
      fontSize: '16px', 
      lineHeight: '24px',
      fontWeight: '400',
      letterSpacing: '0.5px'
    },
    medium: {
      fontSize: '14px',
      lineHeight: '20px', 
      fontWeight: '400',
      letterSpacing: '0.25px'
    },
    small: {
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: '400',
      letterSpacing: '0.4px'
    }
  },
  
  label: {
    large: {
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: '500',
      letterSpacing: '0.1px'
    },
    medium: {
      fontSize: '12px', 
      lineHeight: '16px',
      fontWeight: '500',
      letterSpacing: '0.5px'
    },
    small: {
      fontSize: '11px',
      lineHeight: '16px',
      fontWeight: '500', 
      letterSpacing: '0.5px'
    }
  }
} as const;

// Google Stitch Component Library
export const googleStitchComponents = {
  // Button Components (4 Variants)
  buttons: {
    primary: {
      backgroundColor: googleStitchColors.primary,
      color: '#FFFFFF',
      border: 'none',
      borderRadius: '8px',
      padding: '12px 24px',
      fontSize: '14px',
      fontWeight: '500',
      textTransform: 'none' as const,
      boxShadow: '0 2px 8px rgba(41, 98, 255, 0.3)'
    },
    
    secondary: {
      backgroundColor: 'transparent',
      color: googleStitchColors.primary,
      border: `1px solid ${googleStitchColors.primary}`,
      borderRadius: '8px', 
      padding: '12px 24px',
      fontSize: '14px',
      fontWeight: '500',
      textTransform: 'none' as const
    },
    
    inverted: {
      backgroundColor: '#FFFFFF',
      color: googleStitchColors.neutral,
      border: 'none',
      borderRadius: '8px',
      padding: '12px 24px', 
      fontSize: '14px',
      fontWeight: '500',
      textTransform: 'none' as const
    },
    
    outlined: {
      backgroundColor: 'transparent', 
      color: googleStitchColors.text.primary,
      border: `1px solid ${googleStitchColors.border.primary}`,
      borderRadius: '8px',
      padding: '12px 24px',
      fontSize: '14px', 
      fontWeight: '500',
      textTransform: 'none' as const
    }
  },
  
  // Search Interface
  search: {
    container: {
      backgroundColor: googleStitchColors.surface.secondary,
      border: `1px solid ${googleStitchColors.border.primary}`,
      borderRadius: '24px',
      padding: '0 16px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    input: {
      backgroundColor: 'transparent',
      border: 'none',
      color: googleStitchColors.text.primary,
      fontSize: '14px',
      padding: '12px 0',
      outline: 'none',
      flex: 1
    }
  },
  
  // Card Components
  cards: {
    primary: {
      backgroundColor: googleStitchColors.surface.secondary,
      border: `1px solid ${googleStitchColors.border.secondary}`,
      borderRadius: '12px',
      padding: '24px'
    },
    elevated: {
      backgroundColor: googleStitchColors.surface.tertiary,
      border: `1px solid ${googleStitchColors.border.primary}`, 
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
    }
  }
} as const;

// Material Design Icons Integration
export const materialIcons = {
  dashboard: 'dashboard',
  agents: 'smart_toy',
  tasks: 'assignment',
  profile: 'account_circle', 
  map: 'public',
  logs: 'description',
  settings: 'settings',
  search: 'search',
  notifications: 'notifications',
  menu: 'menu',
  close: 'close',
  add: 'add',
  edit: 'edit',
  delete: 'delete',
  refresh: 'refresh'
} as const;

// Screen Layout Specifications
export const screenLayouts = {
  // Command Center Overview
  commandCenter: {
    grid: 'grid-cols-12 gap-6',
    sidebar: 'col-span-2',
    main: 'col-span-7', 
    stats: 'col-span-3'
  },
  
  // Agent Status Monitor
  agentStatus: {
    grid: 'grid-cols-1 lg:grid-cols-3 gap-6',
    agentCard: 'p-6 rounded-lg'
  },
  
  // Task Board
  taskBoard: {
    columns: 'grid-cols-1 md:grid-cols-3 gap-4',
    kanban: 'flex flex-col gap-4'
  }
} as const;

// Responsive Breakpoints (Google Stitch Standards)
export const breakpoints = {
  sm: '640px',
  md: '768px', 
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
} as const;

// Dark Theme Implementation (Google Stitch Exact Match)
export const darkTheme = {
  background: googleStitchColors.neutral,
  surface: googleStitchColors.surface.secondary,
  onSurface: googleStitchColors.text.primary,
  primary: googleStitchColors.primary,
  secondary: googleStitchColors.secondary, 
  tertiary: googleStitchColors.tertiary,
  
  // CSS Custom Properties
  cssVariables: {
    '--color-primary': googleStitchColors.primary,
    '--color-secondary': googleStitchColors.secondary,
    '--color-tertiary': googleStitchColors.tertiary,
    '--color-neutral': googleStitchColors.neutral,
    '--color-surface': googleStitchColors.surface.secondary,
    '--color-text-primary': googleStitchColors.text.primary,
    '--color-text-secondary': googleStitchColors.text.secondary,
    '--font-family': googleStitchTypography.fontFamily.primary
  }
} as const;

// Animation Specifications (Material Design Motion)
export const motionTokens = {
  duration: {
    short: '200ms',
    medium: '300ms', 
    long: '500ms'
  },
  
  easing: {
    standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)'
  }
} as const;

// Export complete design system
export const googleStitchDesignSystem = {
  colors: googleStitchColors,
  typography: googleStitchTypography,
  components: googleStitchComponents,
  icons: materialIcons,
  layouts: screenLayouts,
  theme: darkTheme,
  motion: motionTokens,
  breakpoints
} as const;