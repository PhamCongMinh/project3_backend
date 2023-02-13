import { AuthModule } from '@modules/auth/auth.module';
import RentOutModule from '@modules/rent-out/rent-out.module';
import RentModule from '@modules/rent/rent.module';
import BlogModule from '@upload/blog/blog.module';

export const MODULES = [AuthModule, RentOutModule, RentModule, BlogModule];
