import BackButton from '@/app/components/BackButton';
import { fetchByIDRickAndMortyCharacters } from '@/lib/api/api';
import Image from 'next/image';

export default async function Details({ params }: { params: { id: string } }) {
  
  const character = await fetchByIDRickAndMortyCharacters(params.id);

  const getEpisodeNumbers = (episodes: string[] | undefined) => {
    if (!episodes) return [];
    return episodes.map((episodeUrl: string) => {
      const episodeParts = episodeUrl.split('/');
      return episodeParts[episodeParts.length - 1];
    });
  };

  const episodeNumbers = getEpisodeNumbers(character?.episode);

  return (
    <section className='flex flex-col items-center justify-center'>
      <div className='flex flex-col md:flex-row gap-6 md:gap-12 items-center mb-8 '>
        <BackButton></BackButton>
        <h1 className='text-2xl lg:text-[52px] text-center'>
          Вселенная Рик и Морти
        </h1>
      </div>
      <div className='flex flex-col lg:flex-row gap-16 p-6 border-2 rounded-2xl items-start lg:w-max lg:max-w-[1000px] '>
        {character ? (
          <>
            <div className='max-w-[400px]'>
              <h2 className='text-2xl lg:text-[40px] mb-6'>{character.name}</h2>
              <p className='text-xl'>Статус: {character.status}</p>
              <p className='text-xl'>Раса: {character.species}</p>
              <p className='text-xl'>Пол: {character.gender}</p>
              <p className='text-xl'>Планета: {character.origin.name}</p>
              <p className='text-xl'>
                Персонаж участвовал в эпизодах: {episodeNumbers.join(', ')}
              </p>
            </div>
            <div className='mx-auto'>
              <Image
                alt={character.name}
                src={character.image}
                width={300}
                height={300}
                className='rounded-xl'
              ></Image>
            </div>
          </>
        ) : (
          <p className='block text-2xl'>Хм... Такого персонажа не существует</p>
        )}
      </div>
    </section>
  );
}
