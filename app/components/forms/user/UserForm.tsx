"use client";

export default function UserForm({ user }) {
  return (
    <div>
      <img src={user.image} className="w-20 h-20 rounded-lg" />
      <p>{user.name}</p>
      <p>{user.email}</p>
    </div>
  );
}
