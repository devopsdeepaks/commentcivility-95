
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Heart, MessageCircle, Share, Send } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface PostProps {
  username: string;
  avatar: string;
  content: string;
  image?: string;
  timestamp: string;
}

interface Comment {
  username: string;
  avatar: string;
  content: string;
  timestamp: string;
}

export function Post({ username, avatar, content, image, timestamp }: PostProps) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    {
      username: "AliceJohnson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      content: "This is amazing! Thanks for sharing.",
      timestamp: "1 hour ago",
    },
    {
      username: "BobWilson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      content: "Great work! Looking forward to seeing more.",
      timestamp: "30 minutes ago",
    },
  ]);
  const { toast } = useToast();

  const handleComment = async () => {
    const response = await fetch("https://api.openai.com/v1/moderations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer YOUR_API_KEY",
      },
      body: JSON.stringify({
        input: comment,
      }),
    });

    const data = await response.json();
    if (data.results[0].flagged) {
      toast({
        title: "Warning",
        description: "Your comment may contain inappropriate content. Please revise it.",
        variant: "destructive",
      });
      return;
    }

    setComments([
      ...comments,
      {
        username: "CurrentUser",
        avatar: "https://github.com/shadcn.png",
        content: comment,
        timestamp: "Just now",
      },
    ]);

    toast({
      title: "Success",
      description: "Comment posted successfully!",
    });
    setComment("");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card className="p-4 mb-4 animate-fadeIn cursor-pointer hover:shadow-md transition-shadow">
          <div className="flex items-start space-x-4">
            <Avatar>
              <AvatarImage src={avatar} />
              <AvatarFallback>{username[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{username}</h3>
                  <p className="text-sm text-gray-500">{timestamp}</p>
                </div>
              </div>
              <p className="mt-2 text-gray-700">{content}</p>
              {image && (
                <img
                  src={image}
                  alt="Post content"
                  className="mt-3 rounded-lg w-full object-cover max-h-96"
                />
              )}
              <div className="flex items-center space-x-4 mt-4">
                <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors">
                  <Heart className="h-5 w-5" />
                  <span>Like</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                  <MessageCircle className="h-5 w-5" />
                  <span>Comment</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
                  <Share className="h-5 w-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </Card>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[90vh] w-full sm:h-screen">
        <SheetHeader>
          <SheetTitle>Post Details</SheetTitle>
        </SheetHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 h-full overflow-hidden">
          {/* Left side - Post content */}
          <div className="overflow-y-auto pr-4">
            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src={avatar} />
                <AvatarFallback>{username[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{username}</h3>
                <p className="text-sm text-gray-500">{timestamp}</p>
                <p className="mt-2 text-gray-700">{content}</p>
                {image && (
                  <img
                    src={image}
                    alt="Post content"
                    className="mt-3 rounded-lg w-full object-cover max-h-96"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right side - Comments */}
          <div className="flex flex-col h-full bg-[#F1F0FB] rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Comments ({comments.length})</h2>
            <div className="flex-1 overflow-y-auto pr-4">
              <div className="space-y-4">
                {comments.map((comment, index) => (
                  <div 
                    key={index} 
                    className="flex items-start space-x-4 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <Avatar>
                      <AvatarImage src={comment.avatar} />
                      <AvatarFallback>{comment.username[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold">{comment.username}</h4>
                        <span className="text-sm text-gray-500">
                          {comment.timestamp}
                        </span>
                      </div>
                      <p className="text-gray-700 mt-1">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comment input */}
            <div className="mt-4">
              <div className="relative">
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="min-h-[80px] pr-[100px] bg-white"
                />
                <Button 
                  onClick={handleComment}
                  className="absolute bottom-2 right-2 px-4 py-2"
                  size="sm"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Post
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
