/**
 * Workspace Service : It will Assume that You have done all the Validation Checks
 */

import { eq } from "drizzle-orm";
import { db } from "../database";
import { User, UserType, Workspace, WorkspaceType } from "../schema/user";

class WorkspaceService {
  static async getById(workspaceId: string): Promise<WorkspaceType | null> {
    /**
     * (Get Workspace By Id) Return : Workspace Object Containing Workspace with Populated Details
     */
    try {
      const workspace = await db.query.Workspace.findFirst({
        with: {
          projects: true,
        },
        where: eq(Workspace.id, workspaceId),
      });
      return workspace ? workspace : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async new(userId: string): Promise<WorkspaceType | null> {
    /**
     * (Create Workspace) Return : Workspace Object Containing Workspace Details
     */
    try {
      const [workspace] = await db
        .insert(Workspace)
        .values({ name: "Untitled Workspace", user: userId })
        .returning();
      return workspace ? workspace : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async delete(workspaceId: string): Promise<WorkspaceType | null> {
    /**
     * (Delete Workspace) Return : null
     */
    try {
      const [workspace] = await db
        .delete(Workspace)
        .where(eq(Workspace.id, workspaceId))
        .returning();
      return workspace ? workspace : null;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  // static async updateWorkspace(workspaceId: string): Promise<any> {
  //   /**
  //    * (Update Workspace) Return : Workspace Object Containing Workspace Details
  //    */
  //   try {
  //     return await Workspace.findByIdAndUpdate(workspaceId);
  //   } catch (error) {
  //     throw new Error(error as string);
  //   }
  // }
}

export default WorkspaceService;
