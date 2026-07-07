async function getMessages() {
  const res = await fetch("http://localhost:3000/api/contact", {
    cache: "no-store",
  });

  const data = await res.json();
  return data.contacts || [];
}

export default async function MessagesPage() {
  const messages = await getMessages();

  return (
    <div className="px-6 py-28 text-white">
      <h1 className="text-4xl font-semibold">Client Messages</h1>

      <div className="mt-10 space-y-5">
        {messages.map((msg: any) => (
          <div
            key={msg._id}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
          >
            <h2 className="text-xl font-semibold">{msg.name}</h2>
            <p className="mt-1 text-sm text-neutral-400">{msg.email}</p>
            <p className="mt-3 font-medium">{msg.subject}</p>
            <p className="mt-3 text-neutral-300">{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}