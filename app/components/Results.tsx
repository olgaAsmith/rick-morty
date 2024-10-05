import ResultList from './ResultList';

export default function Results() {
  return (
    <div className='w-full flex flex-col border-2 rounded-2xl p-4 grow'>
      <h2 className='text-[32px] mb-4'>Найдено</h2>
      <ResultList></ResultList>
    </div>
  );
}
