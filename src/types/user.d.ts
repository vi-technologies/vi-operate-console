/**
 * User type definitions
 * 
 * Users represent individuals who interact with the system
 */

import { BaseEntity, Status } from './common';
import React from 'react';

// User roles
export type UserRole = 'admin' | 'manager' | 'analyst' | 'viewer';

// User permissions
export type UserPermission = 
  'view:dashboards' | 
  'edit:dashboards' | 
  'view:reports' | 
  'edit:reports' | 
  'view:archetypes' | 
  'edit:archetypes' | 
  'view:sources' | 
  'edit:sources' | 
  'view:automations' | 
  'edit:automations' | 
  'view:users' | 
  'edit:users' | 
  'system:admin';

// Database User model
export interface User extends BaseEntity {
  email: string;
  name: string;
  role: UserRole;
  permissions: UserPermission[];
  lastLogin?: Date;
  status: Status;
}

// User settings
export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  dashboardLayout?: string;
  favoriteReports?: number[];
  favoriteArchetypes?: number[];
}

// Current user with settings
export interface CurrentUser extends User {
  settings: UserSettings;
}

// User UI model with additional display properties
export interface UserViewModel {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: string;
  statusColor: string;
  lastLogin: string;
  avatar?: React.ReactNode;
}

// User card props for component
export interface UserCardProps {
  name: string;
  email: string;
  role: string;
  lastLogin?: string;
  avatar?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

// Create user request payload
export interface CreateUserPayload {
  email: string;
  name: string;
  role: UserRole;
  permissions?: UserPermission[];
}

// Update user request payload
export interface UpdateUserPayload {
  name?: string;
  role?: UserRole;
  permissions?: UserPermission[];
  status?: Status;
}

// Update user settings payload
export interface UpdateUserSettingsPayload {
  theme?: 'light' | 'dark' | 'system';
  notifications?: boolean;
  dashboardLayout?: string;
  favoriteReports?: number[];
  favoriteArchetypes?: number[];
}

// User search response
export interface UserSearchResponse {
  users: User[];
  total: number;
}