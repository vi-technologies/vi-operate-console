import {
  pgTable,
  text,
  numeric,
  integer,
  timestamp,
  pgEnum,
  serial,
  json,
  foreignKey,
  jsonb,
  varchar
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

// Schema definition
export const statusEnum = pgEnum('status', ['active', 'inactive', 'archived']);
export const workflowTypeEnum = pgEnum('workflow_type', ['forecasting', 'scheduling', 'assistance']);
export const archetypeTypeEnum = pgEnum('archetype_type', ['forecasting', 'scheduling', 'support']);
export const sourceTypeEnum = pgEnum('source_type', ['callCenter', 'wfm', 'crm', 'scheduling']);
export const eventTypeEnum = pgEnum('event_type', ['trigger', 'completion', 'error']);
export const agentStatusEnum = pgEnum('agent_status', ['active', 'inactive', 'terminated']);
export const scheduleStatusEnum = pgEnum('schedule_status', ['scheduled', 'completed', 'canceled']);

// Legacy table
export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  imageUrl: text('image_url').notNull(),
  name: text('name').notNull(),
  status: statusEnum('status').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  stock: integer('stock').notNull(),
  availableAt: timestamp('available_at').notNull()
});

// Main entities for call center management system
export const archetypes = pgTable('archetypes', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  type: archetypeTypeEnum('type').notNull(),
  configParams: jsonb('config_params'),
  status: statusEnum('status').notNull().default('active'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const sources = pgTable('sources', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  type: sourceTypeEnum('type').notNull(),
  connectionConfig: jsonb('connection_config'),
  status: statusEnum('status').notNull().default('active'),
  lastSyncAt: timestamp('last_sync_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const automations = pgTable('automations', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  type: workflowTypeEnum('type').notNull(),
  status: statusEnum('status').notNull().default('active'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const workflows = pgTable('workflows', {
  id: serial('id').primaryKey(),
  automationId: integer('automation_id').notNull().references(() => automations.id),
  name: text('name').notNull(),
  description: text('description'),
  steps: jsonb('steps'),
  schedule: text('schedule'), // cron format
  status: statusEnum('status').notNull().default('active'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const agents = pgTable('agents', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  role: text('role').notNull(),
  status: agentStatusEnum('status').notNull().default('active'),
  skills: jsonb('skills'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const forecasts = pgTable('forecasts', {
  id: serial('id').primaryKey(),
  archetypeId: integer('archetype_id').notNull().references(() => archetypes.id),
  sourceId: integer('source_id').notNull().references(() => sources.id),
  name: text('name').notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  interval: integer('interval').notNull(), // minutes
  forecastData: jsonb('forecast_data'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const schedules = pgTable('schedules', {
  id: serial('id').primaryKey(),
  agentId: integer('agent_id').notNull().references(() => agents.id),
  forecastId: integer('forecast_id').references(() => forecasts.id),
  startTime: timestamp('start_time').notNull(),
  endTime: timestamp('end_time').notNull(),
  shiftType: text('shift_type').notNull(),
  status: scheduleStatusEnum('status').notNull().default('scheduled'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  workflowId: integer('workflow_id').references(() => workflows.id),
  type: eventTypeEnum('type').notNull(),
  data: jsonb('data'),
  timestamp: timestamp('timestamp').notNull().defaultNow()
});

export const callMetrics = pgTable('call_metrics', {
  id: serial('id').primaryKey(),
  sourceId: integer('source_id').notNull().references(() => sources.id),
  date: timestamp('date').notNull(),
  interval: integer('interval').notNull(), // minutes
  callVolume: integer('call_volume').notNull(),
  avgHandleTime: numeric('avg_handle_time', { precision: 10, scale: 2 }),
  abandonRate: numeric('abandon_rate', { precision: 5, scale: 2 }),
  serviceLevel: numeric('service_level', { precision: 5, scale: 2 }),
  createdAt: timestamp('created_at').notNull().defaultNow()
});

export const dashboards = pgTable('dashboards', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  config: jsonb('config'),
  status: statusEnum('status').notNull().default('active'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const reports = pgTable('reports', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  config: jsonb('config'),
  status: statusEnum('status').notNull().default('active'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});

// Type definitions
export type SelectProduct = typeof products.$inferSelect;
export type SelectArchetype = typeof archetypes.$inferSelect;
export type SelectSource = typeof sources.$inferSelect;
export type SelectAutomation = typeof automations.$inferSelect;
export type SelectWorkflow = typeof workflows.$inferSelect;
export type SelectAgent = typeof agents.$inferSelect;
export type SelectForecast = typeof forecasts.$inferSelect;
export type SelectSchedule = typeof schedules.$inferSelect;
export type SelectEvent = typeof events.$inferSelect;
export type SelectCallMetric = typeof callMetrics.$inferSelect;
export type SelectDashboard = typeof dashboards.$inferSelect;
export type SelectReport = typeof reports.$inferSelect;

// Insertion schemas
export const insertProductSchema = createInsertSchema(products);
export const insertArchetypeSchema = createInsertSchema(archetypes);
export const insertSourceSchema = createInsertSchema(sources);
export const insertAutomationSchema = createInsertSchema(automations);
export const insertWorkflowSchema = createInsertSchema(workflows);
export const insertAgentSchema = createInsertSchema(agents);
export const insertForecastSchema = createInsertSchema(forecasts);
export const insertScheduleSchema = createInsertSchema(schedules);
export const insertEventSchema = createInsertSchema(events);
export const insertCallMetricSchema = createInsertSchema(callMetrics);
export const insertDashboardSchema = createInsertSchema(dashboards);
export const insertReportSchema = createInsertSchema(reports);