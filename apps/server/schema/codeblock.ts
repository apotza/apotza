import {
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { Page } from "./component";
import { Project, Workspace } from "./user";

// ++++++++++++++++++++++++++++++++++++++++++++++++ CodeBlock Tables +++++++++++++++++++++++++++++++++++++++++++++++++
export const CodeBlock = pgTable("codeblock", {
  id: uuid("id").defaultRandom().primaryKey(),
  order_no: serial("order_no").notNull(),
  project: uuid("project_id").references(() => Project.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  name: text("name").notNull(),
  referencedContext: jsonb("referenced_context").notNull().default([]),
  configuration: jsonb("configuration").notNull().default({}),
  response: jsonb("output"),
  error: jsonb("error"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export type CodeBlockInterface = InferSelectModel<typeof CodeBlock>;

export const StepBlock = pgTable("stepblock", {
  id: uuid("id").defaultRandom().primaryKey(),
  order_no: serial("order_no").notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  project: uuid("project_id").references(() => Project.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  codeblock: uuid("codeblock_id").references(() => CodeBlock.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  referencedContext: jsonb("referenced_context").notNull().default([]),
  configuration: jsonb("configuration").notNull().default({}),
  error: jsonb("error"),
  response: jsonb("response"),
  stdout: jsonb("stdout"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export type StepBlockInterface = InferSelectModel<typeof StepBlock>;

export const codeBlockRelations = relations(CodeBlock, ({ one, many }) => ({
  project: one(Project, {
    fields: [CodeBlock.project],
    references: [Project.id],
  }),
  stepBlocks: many(StepBlock),
}));

export const stepBlockRelations = relations(StepBlock, ({ one, many }) => ({
  codeBlock: one(CodeBlock, {
    fields: [StepBlock.codeblock],
    references: [CodeBlock.id],
  }),
  project: one(Project, {
    fields: [StepBlock.project],
    references: [Project.id],
  }),
}));
