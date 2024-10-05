'use client';
import { MoveRight } from 'lucide-react';
import { useStore } from '@/lib/store';
import Link from 'next/link';

export default function ResultList() {
  const { characters, search } = useStore();

  if (!search) {
    return <span className='text-xl'>Пора заняться поисками....</span>;
  }

  if (characters.length === 0) {
    return <span className='text-xl'>Уууупс... Ничего не нашлось</span>;
  }

  return (
    <>
      <ul className='flex flex-col gap-4'>
        {characters.map((char) => (
          <li
            key={char.id}
            className='border-2 p-2 rounded-md cursor-pointer hover:font-bold hover:bg-indigo-900 transition'
          >
            <Link
              href={`details/${char.id}`}
              className='w-full h-full flex gap-4'
            >
              <h3 className='text-md'>{char.name}</h3>
              <p className='text-md hidden md:block'>{char.species}</p>
              <button type='button' title='Подробнее' className='ml-auto'>
                <MoveRight />
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
