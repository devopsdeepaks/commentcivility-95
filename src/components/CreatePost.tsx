
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus } from "lucide-react";

export function CreatePost() {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle post creation here
    console.log({ content, image });
    setContent("");
    setImage(null);
  };

  return (
    <Card className="p-4 mb-6">
      <form onSubmit={handleSubmit}>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's happening?"
          className="mb-4 resize-none"
          rows={3}
        />
        <div className="flex items-center justify-between">
          <label className="cursor-pointer">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
            <ImagePlus className="h-6 w-6 text-gray-500 hover:text-blue-500 transition-colors" />
          </label>
          <Button type="submit">Post</Button>
        </div>
        {image && (
          <div className="mt-4">
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="max-h-48 rounded-lg object-cover"
            />
          </div>
        )}
      </form>
    </Card>
  );
}
