type MediaSource = {
  src: string;
  alt: string;
};

enum UserRole {
  Student = 'student',
  Teacher = 'teacher',
  Admin = 'admin',
};

export const AllRoles: UserRole[] = [
  UserRole.Student,
  UserRole.Teacher,
  UserRole.Admin,
]

export type Unit = {
  unitCode: string;
  unitName: string;
}

export type { MediaSource };
export { UserRole };