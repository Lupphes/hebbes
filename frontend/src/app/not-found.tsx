export default function NotFound() {
  return (
    <div className='flex h-screen flex-col items-center justify-center p-4'>
      <h1 className='text-2xl md:text-3xl lg:text-4xl mb-4 text-center font-bold'>
        Not found – 404!
      </h1>
      <div className='text-lg md:text-xl'>
        <a href='/' className='text-blue-600 hover:text-blue-800'>
          Go back to Home
        </a>
      </div>
    </div>
  );
}
