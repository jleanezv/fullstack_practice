import { MyContext } from 'src/types';
import { Resolver, InputType, Mutation, Arg, Ctx, Field, ObjectType } from 'type-graphql';
import { User } from '../entities/User';
import argon2 from 'argon2'

@InputType()
class UserInput {
  @Field(() => String)
  username: string;
  @Field(() => String)
  password: string;
}

@ObjectType()
class FieldError {
  @Field(() => String)
  field: string

  @Field(() => String)
  message: string
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true})
  errors?: FieldError[]

  @Field(() => User, {nullable: true})
  user?: User
}

@Resolver(User)
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg("options", () => UserInput) options: UserInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    if (options.username.length <= 3) {
      return {
        errors: [
          {
            field: 'username',
            message: 'That username is too short.'
          }
        ]
      }
    }

    if (options.password.length <= 7) {
      return {
        errors: [
          {
            field: 'password',
            message: 'That password is too short.'
          }
        ]
      }
    }

    const alphanumericRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;
  if (!alphanumericRegex.test(options.password)) {
    return {
      errors: [
        {
          field: "password",
          message: "Password must contain letters and numbers.",
        },
      ],
    };
  }

    const hashedPassword = await argon2.hash(options.password);
    const user = em.create(User, {
      username: options.username,
      password: hashedPassword,
      createdAt: '',
      updatedAt: ''
    });
    try {
      await em.persistAndFlush(user);
    } catch(err) {
      // make sure code 23505 is the username already exists error
      if (err.code === '23505') {
        return {
          errors: [
            {
              field: 'username',
              message: "username is already taken!"
            }
          ]
        }
      }
    }
    
    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options", () => UserInput) options: UserInput,
    @Ctx() { em, req }: MyContext
  ): Promise <UserResponse> {
    const user = await em.findOne(User, {username: options.username});

    if (!user) {
      return {
        errors: [
          {
            field: 'username',
            message: "Incorrect username or password"
          },
        ],
      }
    }
    const valid = await argon2.verify(user.password, options.password);
    if (!valid) {
      return {
        errors: [
          {
            field: 'password',
            message: 'Incorrect username or password'
          },
        ],
      };
    }

    req.session.userId = user.id;


    return {
      user,
    };
  }
}