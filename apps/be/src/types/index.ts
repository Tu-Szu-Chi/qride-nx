export interface RequestWithUser extends Request {
    user: {
      userId: string;
      phone: string;
    };
  }