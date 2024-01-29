import { Module } from '@nestjs/common';
import { PostsModule } from './posts.module';

@Module({
  imports: [PostsModule],
})
export class AppModule {}
