
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Settings } from "lucide-react";

const Profile = () => {
  const posts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=800&fit=crop",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=800&h=800&fit=crop",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&h=800&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
          <Avatar className="w-32 h-32">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=256&h=256&fit=crop" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
              <h1 className="text-2xl font-semibold">John Doe</h1>
              <div className="flex gap-2">
                <Button variant="outline">Edit Profile</Button>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="flex justify-center md:justify-start gap-8 mb-4 text-sm">
              <div className="text-center md:text-left">
                <span className="font-semibold block">234</span>
                <span className="text-muted-foreground">posts</span>
              </div>
              <div className="text-center md:text-left">
                <span className="font-semibold block">14.2k</span>
                <span className="text-muted-foreground">followers</span>
              </div>
              <div className="text-center md:text-left">
                <span className="font-semibold block">1,234</span>
                <span className="text-muted-foreground">following</span>
              </div>
            </div>

            <div className="text-sm">
              <p className="font-medium">John Doe</p>
              <p className="text-muted-foreground">Digital artist & photographer</p>
              <p>Creating visual stories through pixels and perspectives 📸✨</p>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-3 gap-1">
          {posts.map((post) => (
            <Card 
              key={post.id} 
              className="aspect-square relative group cursor-pointer overflow-hidden"
            >
              <img 
                src={post.image} 
                alt={`Post ${post.id}`}
                className="object-cover w-full h-full transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-white font-medium">View Post</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
