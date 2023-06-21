import { Job } from "../entities/Job"
import {Resolver, Query, Ctx, Arg, Int, Mutation} from "type-graphql"
import { MyContext } from "../types"

// A resolver is a class that contains a bunch of methods that are called resolvers.
// These methods are called whenever a query or mutation is called.

@Resolver()
export class JobResolver {
  @Query(() => [Job])
  jobs(@Ctx() { em }: MyContext): Promise<Job[]> {
    return em.find(Job, {})
  }

  @Query(() => Job, { nullable: true })
  job(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<Job | null> {
    return em.findOne(Job, { id })
  }

  @Mutation(() => Job)
  async createJob(
    @Arg("title") title: string,
    @Ctx() { em }: MyContext
  ): Promise<Job> {
    const job = em.create(Job, {
      title,
      createdAt: "",
      updatedAt: ""
    });
    await em.persistAndFlush(job);
    return job;
  }

  @Mutation(() => Job, {nullable: true})
  async updateJob(
    @Arg("id") id: number,
    @Arg("title", () => String, { nullable: true }) title: string,
    @Ctx() { em }: MyContext
  ): Promise<Job | null> {
    const job = await em.findOne(Job, { id });
    if (!job) {
      return null;
    }
    
    if (typeof title !== "undefined") {
      job.title = title;
      await em.persistAndFlush(job);
    }
    return job;
  }

  @Mutation(() => Boolean)
  async deleteJob(
    @Arg("id") id: number,
    @Ctx() { em }: MyContext
  ): Promise<boolean> {
    try {
      await em.nativeDelete(Job, { id });
      return true
    } catch {
      return false
    }
  }
}