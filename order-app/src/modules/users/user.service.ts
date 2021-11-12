import { Injectable } from '@nestjs/common';

export type User = {
  name: string;
  username: string;
  password: string;
  email: string;
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      name: 'Admin',
      username: 'admin',
      password: 'password',
      email: 'admin@gmail.com.vn',
    },
    {
      name: 'Member',
      username: 'member',
      password: 'password',
      email: 'member@gmail.com.vn',
    },
    {
      name: 'Customer',
      username: 'customer',
      password: 'password',
      email: 'customer@gmail.com.vn',
    },
  ];

  async findOne(username: string, password: string): Promise<User | undefined> {
    return this.users.find(
      (user) => user.username === username && user.password === password,
    );
  }
}
