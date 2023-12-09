import AddNote from './AddNote.jsx';
import Notes from './Notes.jsx';

function Home() {
  
  return (
    <div>
      <div className="container md:p-20 p-5">
        <div className='flex flex-col gap-y-20'>
        <div>
          <h1 className='text-3xl font-bold'>Add your notes:</h1>
          <div>
            <AddNote />
          </div>
        </div>
        <div>
          <h1 className='text-3xl font-bold'>Your notes:</h1>
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