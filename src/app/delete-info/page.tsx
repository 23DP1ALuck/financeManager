
const DeleteInfoPage = () => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-white text-black px-4">
            <div className="max-w-xl text-center space-y-6">
                <h1 className="text-3xl font-bold">User Data Deletion</h1>
                <p className="text-base text-gray-700">
                    In accordance with Meta Platform requirements and GDPR regulations, you can request the deletion of your user data from this application.
                </p>
                <p className="text-base text-gray-700">
                    If you signed in using Facebook and wish to delete your data, please send an email to: <br />
                    <a href="mailto:luckijartem@gmail.com" className="text-blue-600 underline">luckijartem@gmail.com</a>
                </p>
                <p className="text-sm text-gray-500">
                    Your request will be processed within 72 hours.
                </p>
            </div>
        </main>
    )
}
export default DeleteInfoPage;