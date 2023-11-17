import Notes from './Notes.jsx';

function Home() {
  
  return (
    <div>
      <div className="container p-20">
        <div className='flex flex-col gap-y-20'>
        <div>
          <h1 className='text-3xl'>Add your notes:</h1>
          <div>
            <form action="" className='flex flex-col gap-y-5 mt-8'>
              <input type="text" placeholder='Enter your title' className='rounded p-3 border-2 border-#[000]' />
              <textarea name="" cols="30" rows="10" placeholder='Enter your content' className='p-3 border-2 border-#[000] rounded'></textarea>
              <button type='submit' className='w-fit px-10 py-2 rounded bg-[#000] text-[#fff]'>Save</button>
            </form>
          </div>
        </div>
        <div>
          <h1 className='text-3xl'>Your notes:</h1>
          <div>
            <Notes />
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Home