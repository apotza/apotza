// Storing User Data in Express Request
declare global {
  namespace Express {
    interface Request {
      user: {
        id: number;
        email: string;
        username: string;
      };
    }
  }
}
