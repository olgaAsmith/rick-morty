import FormSearching from './components/FormSearching';
import Results from './components/Results';

export default function Home() {
  return (
    <section>
      <div className='flex flex-col justify-center'>
        <h1 className='text-2xl lg:text-[46px] m-auto mb-12'>Rick & Morty</h1>
        <div className='w-full flex flex-col gap-8 lg:flex-row items-center lg:items-stretch'>
          <FormSearching></FormSearching>
          <Results></Results>
        </div>
      </div>
    </section>
  );
}
