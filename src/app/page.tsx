export default function Home() {
  return (
    <main className="h-screen bg-black text-white">
      <section className="flex flex-col items-center justify-center h-full text-center px-6">
        <h1 className="text-5xl font-bold text-blue-400">Welcome to the Galaxy</h1>
        <p className="text-lg mt-4 max-w-2xl">
          Embark on a journey through the stars, command your fleet, and shape the destiny of the universe.
        </p>
        <div className="mt-6 space-x-4">
          <a href="/register" className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg text-lg font-semibold">Join Now</a>
          <a href="/login" className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg text-lg font-semibold">Sign In</a>
        </div>
      </section>
    </main>
  );
}