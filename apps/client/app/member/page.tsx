'use client';

import React, { useEffect, useState } from 'react';
import Header from '$/components/Header';
import { UserVO } from '@org/types';
import API from '$/utils/fetch';
import { typedObjectEntries } from '@org/common/src';

type Columns = {
  [K in keyof UserVO]: {
    title: string;
    editable?: boolean;
  };
};

const ATTRS: Columns = {
  id: {
    title: 'Member ID',
  },
  phone: {
    title: 'Phone number'
  },
  type: {
    title: 'Type',
  },
  first_name: {
    title: 'First name',
    editable: true,
  },
  mid_name: {
    title: 'Mid name',
    editable: true,
  },
  last_name: {
    title: 'Last name',
    editable: true,
  },
  email: {
    title: 'Email',
    editable: true,
  },
  address_city: {
    title: 'City',
    editable: true,
  },
  address_state: {
    title: 'State',
    editable: true,
  },
  address_detail: {
    title: 'Address',
    editable: true,
  },
  birthday: {
    title: 'Birthday',
    editable: true,
  },
  whatsapp: {
    title: 'Whatsapp',
    editable: true,
  },
  facebook: {
    title: 'Facebook',
    editable: true,
  },
  source: {
    title: 'Source',
    editable: true,
  },
};

const Member = () => {
  const [user, setUser] = useState<UserVO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        const data = await API.get<UserVO>('/user/info');
        setUser(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching user info:', err);
        setError('Failed to load user information. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="w-full  min-h-full flex-1">
      <Header title="Member" />
      <div className="p-6 bg-gray-300 relative">
        <div className="border-white rounded-full border-4 w-16 h-16 ml-6" />
        <img src="/assets/mail.png" className="absolute right-6 top-6" />
      </div>
      <div>
        {typedObjectEntries(ATTRS).map(([key, data]) => {
          return (
            <div
              className="flex justify-between items-center py-3 pl-12 pr-6 border-b-2 border-gray-100"
              key={key}
            >
              <div className="flex flex-col text-gray-400">
                <span className="text-xs mb-1">{data?.title}</span>
                <span className="font-semibold">{user?.[key]}</span>
              </div>
              {data?.editable && <img src='/assets/pencil.png' />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Member;
