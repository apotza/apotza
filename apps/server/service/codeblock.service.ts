/**
 * CodeBlock Service : It will Assume that You have done all the Validation Checks
 */

import { and, eq, desc } from "drizzle-orm";
import { db } from "../database";
import { CodeBlock, CodeBlockInterface, StepBlock } from "../schema";
import StepBlockService from "./stepblock.service";

class CodeBlockService {
  static async getById(id: string): Promise<CodeBlockInterface | null> {
    try {
      const codeBlock = await db.query.CodeBlock.findFirst({
        with: {
          stepBlocks: {
            orderBy: [StepBlock.createdAt],
          },
        },
        where: eq(CodeBlock.id, id),
      });

      return codeBlock ? codeBlock : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async getOneByConstaint(
    where: any,
    orderBy?: any
  ): Promise<CodeBlockInterface | null> {
    try {
      const [codeBlock] = await db
        .select()
        .from(CodeBlock)
        .where(where)
        .orderBy(orderBy)
        .limit(1);

      return codeBlock ? codeBlock : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async getByName(
    name: string,
    projectId: string
  ): Promise<CodeBlockInterface | null> {
    try {
      const codeBlock = await this.getOneByConstaint(
        and(eq(CodeBlock.name, name), eq(CodeBlock.project, projectId)),
        {
          createdAt: "desc",
        }
      );
      return codeBlock ? codeBlock : null;
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  }

  static async create(
    project_id: string,
    _name: string,
    language?: string
  ): Promise<CodeBlockInterface | null> {
    try {
      const prevCodeblock = await this.getOneByConstaint(
        eq(CodeBlock.project, project_id),
        desc(CodeBlock.createdAt)
      );

      let name = `API1`; // Adding default name to be "CodeBlock 1"
      let order_no = 1;

      if (prevCodeblock) {
        const prevCodeNo = prevCodeblock.order_no;
        order_no = prevCodeNo + 1;
        name = `API${prevCodeNo + 1}`;
      }

      const [codeBlock] = await db
        .insert(CodeBlock)
        .values({
          name: name,
          order_no: order_no,
          project: project_id,
          error: null,
          response: null,
        })
        .returning();

      if (!codeBlock) return null;
      if (language) {
        const stepBlock = await StepBlockService.create(
          project_id,
          codeBlock.id,
          language
        );
        if (!stepBlock) return null;
        return codeBlock;
      }

      return codeBlock ? codeBlock : null;
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  }

  //   static async updateCodeBlock(id: string, codeBlock: typeof CodeBlock) {
  //     // Todo : Update Todo to some Strong UseCase
  //     return await CodeBlock.findByIdAndUpdate(id, codeBlock);
  //   }

  static async update(
    id: string,
    clause = {}
  ): Promise<CodeBlockInterface | null> {
    try {
      const [codeBlock] = await db
        .update(CodeBlock)
        .set(clause)
        .where(eq(CodeBlock.id, id))
        .returning();
      return codeBlock ? codeBlock : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async delete(id: string): Promise<CodeBlockInterface | null> {
    try {
      const [codeBlock] = await db
        .delete(CodeBlock)
        .where(eq(CodeBlock.id, id))
        .returning();
      return codeBlock ? codeBlock : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export default CodeBlockService;
