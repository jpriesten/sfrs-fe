export class User {
  'data': {
    user: {
      userId: string;
      userName: string;
      createDate: string;
      passwordResetRequired: boolean;
    };
    credentials: {
      access: {
        sessionToken: string;
        expiration: string;
      };
      refresh: {
        sessionToken: string;
        expiration: string;
      };
    };
  };
  'meta': {
    requestId: string;
  };
}
