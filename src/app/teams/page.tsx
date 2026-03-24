'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  googleStitchColors, 
  googleStitchTypography,
  materialIcons 
} from '@/lib/google-stitch-tokens'

// Material Design Icons Component
const MaterialIcon = ({ name, className = '', style }: { name: string; className?: string; style?: React.CSSProperties }) => (
  <span className={`material-icons ${className}`} style={{ fontFamily: 'Material Icons', ...style }}>
    {name}
  </span>
)

// Google Stitch Button Component
interface StitchButtonProps {
  variant: 'primary' | 'secondary' | 'inverted' | 'outlined'
  children: React.ReactNode
  onClick?: () => void
  className?: string
  size?: 'small' | 'medium' | 'large'
}

const StitchButton = ({ variant, children, onClick, className = '', size = 'medium' }: StitchButtonProps) => {
  const baseStyles = {
    primary: {
      backgroundColor: googleStitchColors.primary,
      color: '#FFFFFF',
      border: 'none',
    },
    secondary: {
      backgroundColor: 'transparent',
      color: googleStitchColors.primary,
      border: `1px solid ${googleStitchColors.primary}`,
    },
    inverted: {
      backgroundColor: '#FFFFFF',
      color: googleStitchColors.neutral,
      border: 'none',
    },
    outlined: {
      backgroundColor: 'transparent',
      color: googleStitchColors.text.primary,
      border: `1px solid ${googleStitchColors.border.primary}`,
    }
  }

  const sizeStyles = {
    small: { padding: '8px 16px', fontSize: '12px' },
    medium: { padding: '12px 24px', fontSize: '14px' },
    large: { padding: '16px 32px', fontSize: '16px' }
  }

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium hover:opacity-90 transition-opacity ${className}`}
      style={{
        ...baseStyles[variant],
        ...sizeStyles[size],
        fontFamily: googleStitchTypography.fontFamily.primary,
        fontWeight: '500'
      }}
    >
      {children}
    </button>
  )
}

// Team Member Component
interface TeamMember {
  id: string
  name: string
  role: string
  avatar?: string
  status: 'online' | 'busy' | 'away' | 'offline'
  performance: number
}

interface TeamMemberCardProps {
  member: TeamMember
}

const TeamMemberCard = ({ member }: TeamMemberCardProps) => {
  const statusColors = {
    online: googleStitchColors.tertiary,
    busy: googleStitchColors.secondary,
    away: googleStitchColors.primary,
    offline: googleStitchColors.text.disabled
  }

  return (
    <div
      className="p-4 rounded-lg flex items-center gap-3"
      style={{
        backgroundColor: googleStitchColors.surface.tertiary,
        border: `1px solid ${googleStitchColors.border.secondary}`
      }}
    >
      {/* Avatar */}
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center"
        style={{ backgroundColor: `${googleStitchColors.primary}20`, color: googleStitchColors.primary }}
      >
        <MaterialIcon name="person" className="text-lg" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4
            className="font-medium truncate"
            style={{
              ...googleStitchTypography.body.medium,
              color: googleStitchColors.text.primary,
              fontWeight: '500'
            }}
          >
            {member.name}
          </h4>
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: statusColors[member.status] }}
          />
        </div>
        <p
          className="text-sm truncate"
          style={{
            ...googleStitchTypography.body.small,
            color: googleStitchColors.text.secondary
          }}
        >
          {member.role}
        </p>
      </div>

      {/* Performance */}
      <div className="text-right">
        <div
          className="text-sm font-medium"
          style={{
            ...googleStitchTypography.label.small,
            color: googleStitchColors.text.primary
          }}
        >
          {member.performance}%
        </div>
        <div
          className="text-xs capitalize"
          style={{
            ...googleStitchTypography.label.small,
            color: statusColors[member.status]
          }}
        >
          {member.status}
        </div>
      </div>
    </div>
  )
}

// Team Card Component
interface Team {
  id: string
  name: string
  description: string
  color: string
  members: TeamMember[]
  lead: string
  projects: number
  completion: number
}

interface TeamCardProps {
  team: Team
  isSelected: boolean
  onSelect: (id: string) => void
}

const TeamCard = ({ team, isSelected, onSelect }: TeamCardProps) => {
  const onlineMembers = team.members.filter(m => m.status === 'online').length
  const avgPerformance = team.members.reduce((acc, m) => acc + m.performance, 0) / team.members.length

  return (
    <div
      className={`p-6 rounded-xl cursor-pointer transition-all hover:opacity-80 ${isSelected ? 'ring-2' : ''}`}
      style={{
        backgroundColor: googleStitchColors.surface.secondary,
        border: `1px solid ${isSelected ? googleStitchColors.primary : googleStitchColors.border.secondary}`,
        ...(isSelected && {
          '--tw-ring-color': `${googleStitchColors.primary}40`
        })
      }}
      onClick={() => onSelect(team.id)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${team.color}20`, color: team.color }}
          >
            <MaterialIcon name="groups" className="text-xl" />
          </div>
          <div>
            <h3
              className="font-semibold mb-1"
              style={{
                ...googleStitchTypography.body.large,
                color: googleStitchColors.text.primary,
                fontWeight: '600'
              }}
            >
              {team.name}
            </h3>
            <p
              style={{
                ...googleStitchTypography.body.small,
                color: googleStitchColors.text.secondary
              }}
            >
              Led by {team.lead}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: googleStitchColors.tertiary }}
          />
          <span
            style={{
              ...googleStitchTypography.label.small,
              color: googleStitchColors.text.tertiary
            }}
          >
            {onlineMembers} online
          </span>
        </div>
      </div>

      {/* Description */}
      <p
        className="mb-6"
        style={{
          ...googleStitchTypography.body.medium,
          color: googleStitchColors.text.secondary
        }}
      >
        {team.description}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <div
            className="font-bold"
            style={{
              ...googleStitchTypography.body.medium,
              color: googleStitchColors.text.primary,
              fontWeight: '600'
            }}
          >
            {team.members.length}
          </div>
          <div
            style={{
              ...googleStitchTypography.label.small,
              color: googleStitchColors.text.tertiary
            }}
          >
            Members
          </div>
        </div>
        
        <div>
          <div
            className="font-bold"
            style={{
              ...googleStitchTypography.body.medium,
              color: googleStitchColors.text.primary,
              fontWeight: '600'
            }}
          >
            {team.projects}
          </div>
          <div
            style={{
              ...googleStitchTypography.label.small,
              color: googleStitchColors.text.tertiary
            }}
          >
            Projects
          </div>
        </div>
        
        <div>
          <div
            className="font-bold"
            style={{
              ...googleStitchTypography.body.medium,
              color: googleStitchColors.text.primary,
              fontWeight: '600'
            }}
          >
            {avgPerformance.toFixed(0)}%
          </div>
          <div
            style={{
              ...googleStitchTypography.label.small,
              color: googleStitchColors.text.tertiary
            }}
          >
            Performance
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span
            style={{
              ...googleStitchTypography.label.small,
              color: googleStitchColors.text.tertiary
            }}
          >
            Project Completion
          </span>
          <span
            style={{
              ...googleStitchTypography.label.small,
              color: googleStitchColors.text.primary
            }}
          >
            {team.completion}%
          </span>
        </div>
        <div
          className="w-full h-2 rounded-full"
          style={{ backgroundColor: googleStitchColors.border.primary }}
        >
          <div
            className="h-full rounded-full"
            style={{
              backgroundColor: team.completion > 80 ? googleStitchColors.tertiary :
                              team.completion > 50 ? googleStitchColors.secondary :
                              googleStitchColors.error,
              width: `${team.completion}%`
            }}
          />
        </div>
      </div>

      {/* Member Avatars */}
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          {team.members.slice(0, 4).map((member, index) => (
            <div
              key={member.id}
              className="w-8 h-8 rounded-full border-2 flex items-center justify-center"
              style={{
                backgroundColor: googleStitchColors.surface.tertiary,
                borderColor: googleStitchColors.surface.secondary,
                color: googleStitchColors.text.secondary
              }}
            >
              <MaterialIcon name="person" style={{ fontSize: '14px' }} />
            </div>
          ))}
          {team.members.length > 4 && (
            <div
              className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-medium"
              style={{
                backgroundColor: googleStitchColors.surface.tertiary,
                borderColor: googleStitchColors.surface.secondary,
                color: googleStitchColors.text.secondary
              }}
            >
              +{team.members.length - 4}
            </div>
          )}
        </div>
        
        {team.members.length > 4 && (
          <span
            style={{
              ...googleStitchTypography.label.small,
              color: googleStitchColors.text.tertiary
            }}
          >
            and {team.members.length - 4} more
          </span>
        )}
      </div>
    </div>
  )
}

export default function GoogleStitchTeamsPage() {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null)

  const teams: Team[] = [
    {
      id: '1',
      name: 'Software Development',
      description: 'Full-stack development team responsible for building and maintaining core platform features',
      color: googleStitchColors.primary,
      lead: 'CTO Bobo',
      projects: 8,
      completion: 87,
      members: [
        { id: '1', name: 'Agent Alpha', role: 'Lead Developer', status: 'online', performance: 98 },
        { id: '2', name: 'Agent Beta', role: 'Frontend Developer', status: 'online', performance: 95 },
        { id: '3', name: 'Agent Gamma', role: 'Backend Developer', status: 'busy', performance: 89 },
        { id: '4', name: 'Agent Delta', role: 'DevOps Engineer', status: 'online', performance: 92 }
      ]
    },
    {
      id: '2',
      name: 'Content Creation',
      description: 'Strategic content development and presentation design team',
      color: googleStitchColors.secondary,
      lead: 'PM Bimbo',
      projects: 5,
      completion: 72,
      members: [
        { id: '5', name: 'Content Creator Alpha', role: 'Senior Content Strategist', status: 'online', performance: 94 },
        { id: '6', name: 'Content Creator Beta', role: 'Presentation Designer', status: 'away', performance: 88 },
        { id: '7', name: 'Content Creator Gamma', role: 'Copy Writer', status: 'online', performance: 91 }
      ]
    },
    {
      id: '3',
      name: 'Mercor Project Division',
      description: 'Specialized team handling high-value client projects with quality focus',
      color: googleStitchColors.tertiary,
      lead: 'PM Pajimo',
      projects: 12,
      completion: 95,
      members: [
        { id: '8', name: 'Auditor', role: 'Quality Auditor', status: 'online', performance: 97 },
        { id: '9', name: 'QC Judge', role: 'Quality Control Judge', status: 'online', performance: 96 },
        { id: '10', name: 'Narrator', role: 'Technical Narrator', status: 'busy', performance: 90 },
        { id: '11', name: 'Architect', role: 'Solution Architect', status: 'online', performance: 93 },
        { id: '12', name: 'Rubricist', role: 'Evaluation Specialist', status: 'online', performance: 89 }
      ]
    },
    {
      id: '4',
      name: 'Finance Operations',
      description: 'Financial analysis, trading algorithms, and risk management team',
      color: googleStitchColors.error,
      lead: 'CFO Olamide',
      projects: 6,
      completion: 78,
      members: [
        { id: '13', name: 'Trade Agent', role: 'Algorithmic Trader', status: 'online', performance: 96 },
        { id: '14', name: 'Risk Analyst', role: 'Risk Management', status: 'online', performance: 94 },
        { id: '15', name: 'Market Analyst', role: 'Market Research', status: 'away', performance: 87 }
      ]
    }
  ]

  const totalMembers = teams.reduce((acc, team) => acc + team.members.length, 0)
  const totalProjects = teams.reduce((acc, team) => acc + team.projects, 0)
  const onlineMembers = teams.reduce((acc, team) => 
    acc + team.members.filter(m => m.status === 'online').length, 0
  )

  const selectedTeamData = selectedTeam ? teams.find(t => t.id === selectedTeam) : null

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: googleStitchColors.neutral,
        color: googleStitchColors.text.primary,
        fontFamily: googleStitchTypography.fontFamily.primary
      }}
    >
      {/* Header */}
      <header
        className="border-b px-6 py-4"
        style={{
          backgroundColor: googleStitchColors.surface.secondary,
          borderColor: googleStitchColors.border.primary
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <MaterialIcon name="arrow_back" />
              <span style={{ ...googleStitchTypography.body.medium, fontWeight: '500' }}>
                Back to Dashboard
              </span>
            </Link>

            <div
              className="w-px h-6"
              style={{ backgroundColor: googleStitchColors.border.primary }}
            />

            <div>
              <h1
                style={{
                  ...googleStitchTypography.headline.small,
                  fontWeight: '600',
                  color: googleStitchColors.text.primary
                }}
              >
                Teams Overview
              </h1>
              <p
                style={{
                  ...googleStitchTypography.body.small,
                  color: googleStitchColors.text.secondary
                }}
              >
                Department structure and team performance monitoring
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <StitchButton variant="outlined" size="small">
              <MaterialIcon name="analytics" />
              Analytics
            </StitchButton>
            <StitchButton variant="primary">
              <MaterialIcon name="group_add" />
              Create Team
            </StitchButton>
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: 'Total Teams',
              value: teams.length.toString(),
              icon: 'groups',
              color: googleStitchColors.primary
            },
            {
              label: 'Team Members',
              value: totalMembers.toString(),
              icon: 'people',
              color: googleStitchColors.secondary
            },
            {
              label: 'Online Now',
              value: onlineMembers.toString(),
              icon: 'online_prediction',
              color: googleStitchColors.tertiary
            },
            {
              label: 'Active Projects',
              value: totalProjects.toString(),
              icon: 'assignment',
              color: googleStitchColors.error
            }
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 rounded-xl"
              style={{
                backgroundColor: googleStitchColors.surface.secondary,
                border: `1px solid ${googleStitchColors.border.secondary}`
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3
                  className="uppercase tracking-wider"
                  style={{
                    ...googleStitchTypography.label.medium,
                    color: googleStitchColors.text.secondary
                  }}
                >
                  {stat.label}
                </h3>
                <MaterialIcon
                  name={stat.icon}
                  style={{ color: stat.color, fontSize: '20px' }}
                />
              </div>
              <div
                style={{
                  ...googleStitchTypography.headline.medium,
                  color: googleStitchColors.text.primary,
                  fontWeight: '600'
                }}
              >
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {teams.map((team) => (
            <TeamCard
              key={team.id}
              team={team}
              isSelected={selectedTeam === team.id}
              onSelect={setSelectedTeam}
            />
          ))}
        </div>

        {/* Team Details Panel */}
        {selectedTeamData && (
          <div
            className="p-8 rounded-xl"
            style={{
              backgroundColor: googleStitchColors.surface.secondary,
              border: `1px solid ${googleStitchColors.border.primary}`
            }}
          >
            <div className="flex items-center justify-between mb-8">
              <h2
                style={{
                  ...googleStitchTypography.headline.medium,
                  fontWeight: '600',
                  color: googleStitchColors.text.primary
                }}
              >
                {selectedTeamData.name} - Team Details
              </h2>
              <StitchButton variant="outlined" onClick={() => setSelectedTeam(null)}>
                <MaterialIcon name="close" />
                Close
              </StitchButton>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Team Info */}
              <div>
                <h3
                  className="mb-6 uppercase tracking-wider"
                  style={{
                    ...googleStitchTypography.label.medium,
                    color: googleStitchColors.text.secondary
                  }}
                >
                  Team Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label
                      style={{
                        ...googleStitchTypography.label.small,
                        color: googleStitchColors.text.tertiary
                      }}
                    >
                      Description
                    </label>
                    <p
                      style={{
                        ...googleStitchTypography.body.medium,
                        color: googleStitchColors.text.primary
                      }}
                    >
                      {selectedTeamData.description}
                    </p>
                  </div>
                  <div>
                    <label
                      style={{
                        ...googleStitchTypography.label.small,
                        color: googleStitchColors.text.tertiary
                      }}
                    >
                      Team Lead
                    </label>
                    <p
                      style={{
                        ...googleStitchTypography.body.medium,
                        color: googleStitchColors.text.primary
                      }}
                    >
                      {selectedTeamData.lead}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        style={{
                          ...googleStitchTypography.label.small,
                          color: googleStitchColors.text.tertiary
                        }}
                      >
                        Active Projects
                      </label>
                      <p
                        style={{
                          ...googleStitchTypography.body.medium,
                          color: googleStitchColors.text.primary,
                          fontWeight: '600'
                        }}
                      >
                        {selectedTeamData.projects}
                      </p>
                    </div>
                    <div>
                      <label
                        style={{
                          ...googleStitchTypography.label.small,
                          color: googleStitchColors.text.tertiary
                        }}
                      >
                        Completion Rate
                      </label>
                      <p
                        style={{
                          ...googleStitchTypography.body.medium,
                          color: googleStitchColors.text.primary,
                          fontWeight: '600'
                        }}
                      >
                        {selectedTeamData.completion}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Members */}
              <div>
                <h3
                  className="mb-6 uppercase tracking-wider"
                  style={{
                    ...googleStitchTypography.label.medium,
                    color: googleStitchColors.text.secondary
                  }}
                >
                  Team Members ({selectedTeamData.members.length})
                </h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {selectedTeamData.members.map((member) => (
                    <TeamMemberCard key={member.id} member={member} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Material Icons Font */}
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
    </div>
  )
}