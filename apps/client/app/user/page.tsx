'use client';

/* eslint-disable-next-line */
export interface UserProps {}

export default function User(props: UserProps) {
  return (
    <div>
      <style jsx>{`
        div {
          color: pink;
        }
      `}</style>
      <h1>Welcome to User!</h1>
    </div>
  );
}
