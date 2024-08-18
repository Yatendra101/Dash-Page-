import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  role: z.string().min(1, "Role is required")
});

const AddMemberForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white shadow-md rounded-md">
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          {...register("name")}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          {...register("email")}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Role</label>
        <input
          type="text"
          {...register("role")}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
        {errors.role && <p className="text-red-500">{errors.role.message}</p>}
      </div>
      <button
        type="submit"
        className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition"
      >
        Add Member
      </button>
    </form>
  );
};

export default AddMemberForm;
