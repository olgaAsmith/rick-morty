'use client';
import { MoveLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button onClick={() => router.push('/')} className='absolute lg:static top-4 left-2 rounded-full bg-sky-900 p-2 size-8 lg:w-[50px] lg:h-[50px] flex items-center justify-center hover:bg-sky-700 transition' title='Назад'>
      <MoveLeft></MoveLeft>
    </button>
  );
}
