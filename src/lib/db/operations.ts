import { count, eq, ilike, desc, and, gte, lte } from 'drizzle-orm';
import { db } from './client';
import { 
  products, 
  SelectProduct,
  archetypes,
  SelectArchetype,
  sources,
  SelectSource,
  automations,
  SelectAutomation,
  workflows,
  SelectWorkflow,
  agents,
  SelectAgent,
  forecasts,
  SelectForecast,
  schedules,
  SelectSchedule,
  dashboards,
  SelectDashboard,
  reports,
  SelectReport
} from './schema';

// Product operations (legacy)
export async function getProducts(
  search: string,
  offset: number
): Promise<{
  products: SelectProduct[];
  newOffset: number | null;
  totalProducts: number;
}> {
  try {
    // Always search the full table, not per page
    if (search) {
      const searchResults = await db
        .select()
        .from(products)
        .where(ilike(products.name, `%${search}%`));
      
      return {
        products: searchResults,
        newOffset: null,
        totalProducts: searchResults.length
      };
    }

    if (offset === null) {
      return { products: [], newOffset: null, totalProducts: 0 };
    }

    const totalProducts = await db.select({ count: count() }).from(products);
    const moreProducts = await db.select().from(products).limit(5).offset(offset);
    const newOffset = moreProducts.length >= 5 ? offset + 5 : null;

    return {
      products: moreProducts,
      newOffset,
      totalProducts: totalProducts[0].count
    };
  } catch (error) {
    console.error('Database error:', error);
    return { products: [], newOffset: null, totalProducts: 0 };
  }
}

export async function deleteProductById(id: number) {
  try {
    await db.delete(products).where(eq(products.id, id));
  } catch (error) {
    console.error('Error deleting product:', error);
  }
}

// Archetype operations
export async function getArchetypes(
  search?: string,
  limit: number = 20,
  offset: number = 0,
  type?: string
): Promise<{
  archetypes: SelectArchetype[];
  total: number;
}> {
  try {
    let query = db.select().from(archetypes);
    let countQuery = db.select({ count: count() }).from(archetypes);
    
    const conditions = [];
    
    if (search) {
      conditions.push(ilike(archetypes.name, `%${search}%`));
    }
    
    if (type) {
      conditions.push(eq(archetypes.type, type));
    }
    
    if (conditions.length > 0) {
      const whereClause = and(...conditions);
      query = query.where(whereClause);
      countQuery = countQuery.where(whereClause);
    }
    
    const results = await query
      .orderBy(desc(archetypes.updatedAt))
      .limit(limit)
      .offset(offset);
    
    const totalCount = await countQuery;
    
    return {
      archetypes: results,
      total: totalCount[0].count
    };
  } catch (error) {
    console.error('Database error:', error);
    return { archetypes: [], total: 0 };
  }
}

export async function getArchetypeById(id: number): Promise<SelectArchetype | null> {
  try {
    const result = await db
      .select()
      .from(archetypes)
      .where(eq(archetypes.id, id))
      .limit(1);
    
    return result[0] || null;
  } catch (error) {
    console.error('Error fetching archetype:', error);
    return null;
  }
}

// Source operations
export async function getSources(
  search?: string,
  limit: number = 20,
  offset: number = 0,
  type?: string
): Promise<{
  sources: SelectSource[];
  total: number;
}> {
  try {
    let query = db.select().from(sources);
    let countQuery = db.select({ count: count() }).from(sources);
    
    const conditions = [];
    
    if (search) {
      conditions.push(ilike(sources.name, `%${search}%`));
    }
    
    if (type) {
      conditions.push(eq(sources.type, type));
    }
    
    if (conditions.length > 0) {
      const whereClause = and(...conditions);
      query = query.where(whereClause);
      countQuery = countQuery.where(whereClause);
    }
    
    const results = await query
      .orderBy(desc(sources.updatedAt))
      .limit(limit)
      .offset(offset);
    
    const totalCount = await countQuery;
    
    return {
      sources: results,
      total: totalCount[0].count
    };
  } catch (error) {
    console.error('Database error:', error);
    return { sources: [], total: 0 };
  }
}

export async function getSourceById(id: number): Promise<SelectSource | null> {
  try {
    const result = await db
      .select()
      .from(sources)
      .where(eq(sources.id, id))
      .limit(1);
    
    return result[0] || null;
  } catch (error) {
    console.error('Error fetching source:', error);
    return null;
  }
}

// Automation operations
export async function getAutomations(
  search?: string,
  limit: number = 20,
  offset: number = 0,
  type?: string
): Promise<{
  automations: SelectAutomation[];
  total: number;
}> {
  try {
    let query = db.select().from(automations);
    let countQuery = db.select({ count: count() }).from(automations);
    
    const conditions = [];
    
    if (search) {
      conditions.push(ilike(automations.name, `%${search}%`));
    }
    
    if (type) {
      conditions.push(eq(automations.type, type));
    }
    
    if (conditions.length > 0) {
      const whereClause = and(...conditions);
      query = query.where(whereClause);
      countQuery = countQuery.where(whereClause);
    }
    
    const results = await query
      .orderBy(desc(automations.updatedAt))
      .limit(limit)
      .offset(offset);
    
    const totalCount = await countQuery;
    
    return {
      automations: results,
      total: totalCount[0].count
    };
  } catch (error) {
    console.error('Database error:', error);
    return { automations: [], total: 0 };
  }
}

export async function getAutomationById(id: number): Promise<SelectAutomation | null> {
  try {
    const result = await db
      .select()
      .from(automations)
      .where(eq(automations.id, id))
      .limit(1);
    
    return result[0] || null;
  } catch (error) {
    console.error('Error fetching automation:', error);
    return null;
  }
}

// Workflow operations
export async function getWorkflows(
  search?: string,
  limit: number = 20,
  offset: number = 0,
  automationId?: number
): Promise<{
  workflows: SelectWorkflow[];
  total: number;
}> {
  try {
    let query = db.select().from(workflows);
    let countQuery = db.select({ count: count() }).from(workflows);
    
    const conditions = [];
    
    if (search) {
      conditions.push(ilike(workflows.name, `%${search}%`));
    }
    
    if (automationId) {
      conditions.push(eq(workflows.automationId, automationId));
    }
    
    if (conditions.length > 0) {
      const whereClause = and(...conditions);
      query = query.where(whereClause);
      countQuery = countQuery.where(whereClause);
    }
    
    const results = await query
      .orderBy(desc(workflows.updatedAt))
      .limit(limit)
      .offset(offset);
    
    const totalCount = await countQuery;
    
    return {
      workflows: results,
      total: totalCount[0].count
    };
  } catch (error) {
    console.error('Database error:', error);
    return { workflows: [], total: 0 };
  }
}

export async function getWorkflowById(id: number): Promise<SelectWorkflow | null> {
  try {
    const result = await db
      .select()
      .from(workflows)
      .where(eq(workflows.id, id))
      .limit(1);
    
    return result[0] || null;
  } catch (error) {
    console.error('Error fetching workflow:', error);
    return null;
  }
}

// Dashboard operations
export async function getDashboards(
  search?: string,
  limit: number = 20,
  offset: number = 0
): Promise<{
  dashboards: SelectDashboard[];
  total: number;
}> {
  try {
    let query = db.select().from(dashboards);
    let countQuery = db.select({ count: count() }).from(dashboards);
    
    if (search) {
      query = query.where(ilike(dashboards.name, `%${search}%`));
      countQuery = countQuery.where(ilike(dashboards.name, `%${search}%`));
    }
    
    const results = await query
      .orderBy(desc(dashboards.updatedAt))
      .limit(limit)
      .offset(offset);
    
    const totalCount = await countQuery;
    
    return {
      dashboards: results,
      total: totalCount[0].count
    };
  } catch (error) {
    console.error('Database error:', error);
    return { dashboards: [], total: 0 };
  }
}

export async function getDashboardById(id: number): Promise<SelectDashboard | null> {
  try {
    const result = await db
      .select()
      .from(dashboards)
      .where(eq(dashboards.id, id))
      .limit(1);
    
    return result[0] || null;
  } catch (error) {
    console.error('Error fetching dashboard:', error);
    return null;
  }
}

// Report operations
export async function getReports(
  search?: string,
  limit: number = 20,
  offset: number = 0
): Promise<{
  reports: SelectReport[];
  total: number;
}> {
  try {
    let query = db.select().from(reports);
    let countQuery = db.select({ count: count() }).from(reports);
    
    if (search) {
      query = query.where(ilike(reports.name, `%${search}%`));
      countQuery = countQuery.where(ilike(reports.name, `%${search}%`));
    }
    
    const results = await query
      .orderBy(desc(reports.updatedAt))
      .limit(limit)
      .offset(offset);
    
    const totalCount = await countQuery;
    
    return {
      reports: results,
      total: totalCount[0].count
    };
  } catch (error) {
    console.error('Database error:', error);
    return { reports: [], total: 0 };
  }
}

export async function getReportById(id: number): Promise<SelectReport | null> {
  try {
    const result = await db
      .select()
      .from(reports)
      .where(eq(reports.id, id))
      .limit(1);
    
    return result[0] || null;
  } catch (error) {
    console.error('Error fetching report:', error);
    return null;
  }
}

// Forecast operations
export async function getForecasts(
  search?: string,
  limit: number = 20,
  offset: number = 0,
  startDate?: Date,
  endDate?: Date
): Promise<{
  forecasts: SelectForecast[];
  total: number;
}> {
  try {
    let query = db.select().from(forecasts);
    let countQuery = db.select({ count: count() }).from(forecasts);
    
    const conditions = [];
    
    if (search) {
      conditions.push(ilike(forecasts.name, `%${search}%`));
    }
    
    if (startDate) {
      conditions.push(gte(forecasts.startDate, startDate));
    }
    
    if (endDate) {
      conditions.push(lte(forecasts.endDate, endDate));
    }
    
    if (conditions.length > 0) {
      const whereClause = and(...conditions);
      query = query.where(whereClause);
      countQuery = countQuery.where(whereClause);
    }
    
    const results = await query
      .orderBy(desc(forecasts.updatedAt))
      .limit(limit)
      .offset(offset);
    
    const totalCount = await countQuery;
    
    return {
      forecasts: results,
      total: totalCount[0].count
    };
  } catch (error) {
    console.error('Database error:', error);
    return { forecasts: [], total: 0 };
  }
}

export async function getForecastById(id: number): Promise<SelectForecast | null> {
  try {
    const result = await db
      .select()
      .from(forecasts)
      .where(eq(forecasts.id, id))
      .limit(1);
    
    return result[0] || null;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    return null;
  }
}

// Schedule operations
export async function getSchedules(
  search?: string,
  limit: number = 20,
  offset: number = 0,
  startDate?: Date,
  endDate?: Date,
  agentId?: number
): Promise<{
  schedules: SelectSchedule[];
  total: number;
}> {
  try {
    let query = db.select().from(schedules);
    let countQuery = db.select({ count: count() }).from(schedules);
    
    const conditions = [];
    
    if (agentId) {
      conditions.push(eq(schedules.agentId, agentId));
    }
    
    if (startDate) {
      conditions.push(gte(schedules.startTime, startDate));
    }
    
    if (endDate) {
      conditions.push(lte(schedules.endTime, endDate));
    }
    
    if (conditions.length > 0) {
      const whereClause = and(...conditions);
      query = query.where(whereClause);
      countQuery = countQuery.where(whereClause);
    }
    
    const results = await query
      .orderBy(desc(schedules.startTime))
      .limit(limit)
      .offset(offset);
    
    const totalCount = await countQuery;
    
    return {
      schedules: results,
      total: totalCount[0].count
    };
  } catch (error) {
    console.error('Database error:', error);
    return { schedules: [], total: 0 };
  }
}

export async function getScheduleById(id: number): Promise<SelectSchedule | null> {
  try {
    const result = await db
      .select()
      .from(schedules)
      .where(eq(schedules.id, id))
      .limit(1);
    
    return result[0] || null;
  } catch (error) {
    console.error('Error fetching schedule:', error);
    return null;
  }
}

// Agent operations
export async function getAgents(
  search?: string,
  limit: number = 20,
  offset: number = 0,
  status?: string
): Promise<{
  agents: SelectAgent[];
  total: number;
}> {
  try {
    let query = db.select().from(agents);
    let countQuery = db.select({ count: count() }).from(agents);
    
    const conditions = [];
    
    if (search) {
      conditions.push(ilike(agents.name, `%${search}%`));
    }
    
    if (status) {
      conditions.push(eq(agents.status, status));
    }
    
    if (conditions.length > 0) {
      const whereClause = and(...conditions);
      query = query.where(whereClause);
      countQuery = countQuery.where(whereClause);
    }
    
    const results = await query
      .limit(limit)
      .offset(offset);
    
    const totalCount = await countQuery;
    
    return {
      agents: results,
      total: totalCount[0].count
    };
  } catch (error) {
    console.error('Database error:', error);
    return { agents: [], total: 0 };
  }
}

export async function getAgentById(id: number): Promise<SelectAgent | null> {
  try {
    const result = await db
      .select()
      .from(agents)
      .where(eq(agents.id, id))
      .limit(1);
    
    return result[0] || null;
  } catch (error) {
    console.error('Error fetching agent:', error);
    return null;
  }
}