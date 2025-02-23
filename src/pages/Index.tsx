
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { CreatePost } from "@/components/CreatePost";
import { Post } from "@/components/Post";

const samplePosts = [
  {
    username: "JohnDoe",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    content: "Just launched my new project! Really excited to share it with everyone.",
    timestamp: "2 hours ago",
  },
  {
    username: "JaneSmith",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    content: "Beautiful sunset today!",
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    timestamp: "4 hours ago",
  },
];

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <div className="flex-1">
          <header className="bg-white border-b border-gray-200 px-4 py-4">
            <div className="max-w-2xl mx-auto flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Social Dashboard</h1>
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  Overall Sentiment: Positive
                </span>
              </div>
            </div>
          </header>
          <main className="max-w-2xl mx-auto px-4 py-6">
            <CreatePost />
            <div className="space-y-4">
              {samplePosts.map((post, index) => (
                <Post key={index} {...post} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
