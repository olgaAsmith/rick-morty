'use client';
import { MoveLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button onClick={() => router.push('/')} className='rounded-full bg-gray-800 w-[50px] h-[50px] flex items-center justify-center hover:bg-gray-600 transition' title='Назад'>
      <MoveLeft></MoveLeft>
    </button>
  );
}
