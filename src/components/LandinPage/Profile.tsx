export default function Profile({
  name,
  bio,
}: {
  name?: string;
  bio?: string;
}) {
  return (
    <div className="flex flex-col items-center mb-8">
      {name && <h1 className="text-2xl font-bold">{name}</h1>}
      {bio && <p className="text-center">{bio}</p>}
    </div>
  );
}
