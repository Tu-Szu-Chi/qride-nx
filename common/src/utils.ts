// import { UserSourceType } from '@org/types';

import { UserSourceType } from "types/src";

export const fromDate = (date: Date): string => {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(
    2,
    '0'
  )}-${String(date.getDate()).padStart(2, '0')}`;
};
export const fromDateWithSlash = (date: Date): string => {
  return `${date.getUTCFullYear()}/${String(date.getUTCMonth() + 1).padStart(
    2,
    '0'
  )}/${String(date.getDate()).padStart(2, '0')}`;
};

export function typedObjectEntries<T extends object>(
  obj: T
): [keyof T, T[keyof T]][] {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
}

export const UserSourceDisplay: Record<UserSourceType, string> = {
  [UserSourceType.NONE]: '',
  [UserSourceType.FriendsOrFamilyReferrals]: 'Friends or Family Referrals',
  [UserSourceType.Online]: 'Online',
  [UserSourceType.RetailShop]: 'Retail Shop',
  [UserSourceType.SalesEvent]: 'Sales Event',
  [UserSourceType.ServiceCenter]: 'Service Center',
};
