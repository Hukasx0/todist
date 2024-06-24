import { getServerAuthSession } from "@/server/auth";
import { ThemeToggle } from "@/components/theme-toggle";
import { KanbanBoard } from "@/components/kanban-board/kanban-board";
import { Navbar } from "@/components/navbar";
import AddTodo from "@/components/add-todo";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import { TasksProvider } from "@/context/tasks-context";
import LoginGreeting from "@/components/login-greeting";

export default async function Home() {
  const session = await getServerAuthSession();
  if (session?.user) return (
    <main className="h-screen">
      <LoginGreeting>
        <Navbar user={session?.user} />
        <TasksProvider>
          <AddTodo />
          <KanbanBoard />
        </TasksProvider>
        <Footer />
      </LoginGreeting>
    </main>
  )
  return (
    <main className="h-screen">
      <Navbar user={session?.user} />
        <Hero />
    </main>
  );
}
