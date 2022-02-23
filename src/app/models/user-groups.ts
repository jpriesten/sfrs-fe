export class UserGroups {
  'data': {
    groups: [Group];
    isTruncated: boolean;
    marker: string;
  };
  'meta': {
    requestId: string;
  };
}

export class Group {
  'groupId': string;
  'groupName': string;
  'createDate': string;
}
