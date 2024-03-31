export interface IUser {
  _id: string;
  id: string;
  username: string;
  imageUrl: string;
  email: string;
  grade: UserGrade;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaginatedUserResponse {
  users: IUser[];
  pagination: {
    currentPage: number;
    totalUsers: number;
    totalPages: number;
    hasNextPage: boolean;
  };
}
