import {Query, Resolver} from "type-graphql";

@Resolver()
export class HelloResolver {
  @Query(() => String)

  hello() {
    return "You did it u sick fuck";
  }
}