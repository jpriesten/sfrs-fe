export const errorTypes = [
  {
    name: 'NoSuchEntity',
    description:
      'Your information was not found. Please double check and try again.',
  },
  {
    name: 'InvalidAuthenticationValue',
    description:
      'Your authentication information is incorrect. Please try again.',
  },
  {
    name: 'MissingServiceHeader',
    description: 'Missing service header. Please contact support',
  },
  {
    name: 'EntityAlreadyExists',
    description:
      'Entity already exists. Please try again with different values',
  },
  {
    name: 'NotAuthorized',
    description:
      'You are trying to access a resource that you are not allowed to access. Please contact your administrator.',
  },
  {
    name: 'AccessDeniedException',
    description: 'Your access to this resource was denied',
  },
  {
    name: 'TokenExpired',
    description: 'Your session has expired, please login',
  },
];
