export interface AccountGroup {
  id: number;
  code: string;
  name: string;
  englishName: string;
  groupType: string;
  status: boolean;
}

export interface CreateAccountGroupRequest {
  code: string;
  name: string;
  englishName: string;
  groupType: string;
  status: boolean;
}

export interface UpdateAccountGroupRequest {
  code: string;
  name: string;
  englishName: string;
  groupType: string;
  status: boolean;
}

export type AccountGroupListResponse = AccountGroup[];

