'use client';
import { useForm } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { fetchFilterRickAndMortyCharacters } from '@/lib/api/api';
import { Character } from '@/lib/interfaces';
import { useStore } from '@/lib/store';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Loader2 } from 'lucide-react';

interface FormSearchingProps {
  personName?: string;
  episode?: string;
  asAlive?: string;
  race?: string;
}

export default function FormSearching() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(true);

  const setCookieValue = (name: string, value: string | undefined) => {
    Cookies.set(name, value || '', { expires: 7 });
  };

  const getCookieValue = (name: string) => Cookies.get(name) || '';

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormSearchingProps>();
  const { setCharacters, setSearch } = useStore();

  useEffect(() => {
    ['personName', 'episode', 'asAlive', 'race'].forEach((field) => {
      setValue(field as keyof FormSearchingProps, getCookieValue(field));
    });
    setIsLoadingForm(false);
  }, [setValue]);

  const onSubmit = async (data: FormSearchingProps) => {
    setIsLoading(true);

    ['personName', 'episode', 'asAlive', 'race'].forEach((field) =>
      setCookieValue(field, data[field as keyof FormSearchingProps])
    );

    try {
      const filters: Record<string, string> = {};

      if (data.personName) {
        filters.name = data.personName;
      }

      if (data.asAlive) {
        if (data.asAlive === 'alive') {
          filters.status = 'alive';
        } else if (data.asAlive === 'dead') {
          filters.status = 'dead';
        } else if (data.asAlive === 'unknown') {
          filters.status = 'unknown';
        }
      }

      if (data.race && data.race !== 'all') {
        filters.species = data.race;
      }

      const chars = await fetchFilterRickAndMortyCharacters(filters);
      let filteredChars = chars;

      if (data.episode) {
        filteredChars = chars.filter((char: Character) => {
          return char.episode.some((ep) => {
            const episodeNumber = ep.split('/').pop();
            return episodeNumber === data.episode;
          });
        });
      }

      setCharacters(filteredChars);
      setSearch();
      setIsLoading(false);
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  if (isLoadingForm)
    return <Loader2 className='mt-12 w-full max-w-md animate-spin'></Loader2>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-4 lg:gap-6 w-full max-w-md p-6 border-2 rounded-2xl h-[520px] md:h-auto md:max-h-[450px]'
      noValidate
    >
      <h2 className='text-2xl mb-4 text-center lg:text-left'>
        Вселенная Рик и Морти
      </h2>
      <div className='relative'>
        <label htmlFor='personName' className='block mb-1'>
          Имя персонажа
        </label>
        <input
          id='personName'
          type='text'
          {...register('personName', {
            pattern: {
              value: /^[a-zA-Z]*$/,
              message: 'Только латинские буквы.',
            },
          })}
          className={`w-full h-[30px] p-2 border-2 rounded-md bg-transparent outline-none hover:opacity-80 transition cursor-pointer text-xl ${
            errors.personName ? 'border-red-700' : 'border-white'
          }`}
        />
        {errors.personName && (
          <p className='absolute bottom-[-15px] left-0 text-red-700 text-[10px]'>
            {errors.personName.message}
          </p>
        )}
      </div>

      <div className='w-full flex gap-4 flex-col md:flex-row'>
        <div className='w-full md:w-1/2'>
          <label htmlFor='asAlive' className='block mb-1'>
            Жив?
          </label>
          <Select
            defaultValue={Cookies.get('asAlive') || 'defaultValue'}
            onValueChange={(value) => {
              setValue('asAlive', value);
              Cookies.set('asAlive', value, { expires: 7 });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder='' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='alive'>Да</SelectItem>
              <SelectItem value='dead'>Нет</SelectItem>
              <SelectItem value='unknown'>Неизвестно</SelectItem>
              <SelectItem value='maybe'>Не знаю</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='w-full md:w-1/2'>
          <label htmlFor='race' className='block mb-1'>
            Раса
          </label>
          <Select
            defaultValue={Cookies.get('race') || 'defaultValue'}
            onValueChange={(value) => {
              setValue('race', value);
              Cookies.set('race', value, { expires: 7 });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder='' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='human'>Человек</SelectItem>
              <SelectItem value='alien'>Инопланетянин</SelectItem>
              <SelectItem value='all'>Любая</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='relative'>
        <label htmlFor='episode' className='block mb-1'>
          Эпизод
        </label>
        <input
          id='episode'
          type='text'
          {...register('episode', {
            validate: (value) => {
              if (!value) return true;
              if (!/^\d+$/.test(value)) return 'Введите число';
              if (Number(value) <= 0) return 'Число должно быть больше 0';
              return true;
            },
          })}
          className={`w-full h-[30px] p-2 border-2 rounded-md bg-transparent ${
            errors.episode ? 'border-red-700' : 'border-white'
          } outline-none hover:opacity-80 transition cursor-pointer text-xl`}
        />
        {errors.episode && (
          <p className='absolute bottom-[-15px] left-0 text-red-700 text-[10px]'>
            {errors.episode.message}
          </p>
        )}
      </div>

      <button
        type='submit'
        title='Давай искать'
        className='relative w-fit border rounded-md text-xl mt-4 px-10 py-2 mx-auto hover:bg-indigo-900 disabled:bg-slate-700 transition'
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className='mr-2 h-4 w-4 animate-spin absolute top-[15px] left-[15px]' />
        ) : null}
        Найти персонажа
      </button>
    </form>
  );
}
