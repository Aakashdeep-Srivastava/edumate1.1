import { Experience } from '../../components/Experience';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';

export default async function ClassroomPage() {
  const session = await getServerSession();

  if (!session) {
    redirect('/');
  }

  return (
    <main className="h-screen min-h-screen">
      <Experience />
    </main>
  );
}