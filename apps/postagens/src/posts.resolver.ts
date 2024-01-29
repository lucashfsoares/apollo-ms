import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Post } from './models/post.model';
import { User } from './models/user.model';
import { PostsService } from './posts.service';
import { ParseIntPipe } from '@nestjs/common';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => Post)
  post(@Args({ name: 'id', type: () => ID }, ParseIntPipe) id: number): Post {
    return this.postsService.findOne(id);
  }

  @Query(() => [Post])
  posts(): Post[] {
    return this.postsService.findAll();
  }

  @ResolveField(() => User)
  user(@Parent() post: Post): any {
    return { __typename: 'User', id: post.authorId };
  }
}
