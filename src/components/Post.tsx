
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Heart, MessageCircle, Share } from "lucide-react";

interface PostProps {
  username: string;
  avatar: string;
  content: string;
  image?: string;
  timestamp: string;
}

export function Post({ username, avatar, content, image, timestamp }: PostProps) {
  const [comment, setComment] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);
  const { toast } = useToast();

  const handleComment = async () => {
    const response = await fetch("https://api.openai.com/v1/moderations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer YOUR_API_KEY", // We'll handle this securely later
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

    toast({
      title: "Success",
      description: "Comment posted successfully!",
    });
    setComment("");
    setShowCommentBox(false);
  };

  return (
    <Card className="p-4 mb-4 animate-fadeIn">
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
            <button
              onClick={() => setShowCommentBox(!showCommentBox)}
              className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Comment</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
              <Share className="h-5 w-5" />
              <span>Share</span>
            </button>
          </div>
          {showCommentBox && (
            <div className="mt-4 space-y-2">
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full"
              />
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowCommentBox(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleComment}>Post</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
