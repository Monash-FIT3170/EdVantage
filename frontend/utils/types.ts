type MediaSource = {
  src: string;
  alt: string;
};

enum UserRole {
  Student = 'student',
  Teacher = 'teacher',
  Admin = 'admin',
};

export type { MediaSource };
export { UserRole };