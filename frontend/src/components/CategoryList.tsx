import { categories } from '../../mock_data/category';

export default function CategoryList() {
  return (
    <ul role='list' className='divide-y divide-gray-100'>
      {categories.map((category) => (
        <li key={category.name} className='flex justify-between gap-x-6 py-5'>
          <div className='flex min-w-0 gap-x-4'>
            <img
              className='h-12 w-12 flex-none rounded-full bg-gray-50'
              src={category.imageUrl}
              alt=''
            />
            <div className='min-w-0 flex-auto'>
              <p className='text-sm font-semibold leading-6 text-gray-900'>
                {category.name}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
