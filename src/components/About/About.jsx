import iNotebook from '../../assets/about.png';

function About() {
    return (
        <>
            <div className="max-w-2xl mx-auto p-4">
                <h2 className="text-3xl font-bold mb-4">About Us</h2>
                <div className='my-5'>
                    <div>
                        <img src={iNotebook} alt="About I-Notebook" />
                    </div>
                </div>
                <p className="mb-2">
                    Welcome to our I-notebook app! This is a secure platform designed to help you organize and manage your notes effortlessly.
                </p>
                <p className="mb-2">
                    Our goal is to provide a user-friendly interface where you can easily create, read, update, and delete your notes.
                </p>
                <p className="mb-2">With our app, you can:</p>
                <ul className="list-disc pl-4 mb-4">
                    <li>Create and save notes securely in the cloud</li>
                    <li>Access your notes from anywhere, anytime</li>
                    <li>Edit and update your notes conveniently</li>
                    <li>Delete notes you no longer need</li>
                </ul>
                <p className="mb-2">We value your privacy and ensure that your notes are encrypted and accessible only to you.</p>
                <p className="mb-2">Thank you for choosing our I-notebook app for your note-taking needs!</p>
            </div>
        </>
    )
}

export default About;