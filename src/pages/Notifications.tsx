
import { Bell, Heart, MessageCircle, UserPlus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Notification {
  id: number;
  type: 'like' | 'comment' | 'follow';
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  time: string;
  read: boolean;
}

const sampleNotifications: Notification[] = [
  {
    id: 1,
    type: 'like',
    user: {
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    content: 'liked your post',
    time: '2 minutes ago',
    read: false,
  },
  {
    id: 2,
    type: 'comment',
    user: {
      name: 'Alice Johnson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    content: 'commented on your post: "This is amazing!"',
    time: '1 hour ago',
    read: false,
  },
  {
    id: 3,
    type: 'follow',
    user: {
      name: 'Bob Wilson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    content: 'started following you',
    time: '2 hours ago',
    read: true,
  },
];

const NotificationIcon = ({ type }: { type: Notification['type'] }) => {
  switch (type) {
    case 'like':
      return <Heart className="h-4 w-4 text-red-500" />;
    case 'comment':
      return <MessageCircle className="h-4 w-4 text-blue-500" />;
    case 'follow':
      return <UserPlus className="h-4 w-4 text-green-500" />;
    default:
      return <Bell className="h-4 w-4 text-gray-500" />;
  }
};

const Notifications = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Bell className="h-6 w-6" />
            Notifications
          </h1>
        </header>

        <div className="space-y-4">
          {sampleNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`p-4 transition-all hover:shadow-md ${
                !notification.read ? 'bg-blue-50 border-blue-100' : ''
              }`}
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={notification.user.avatar} />
                  <AvatarFallback>{notification.user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <NotificationIcon type={notification.type} />
                    <p className="text-sm font-medium text-gray-900">
                      <span className="font-semibold">{notification.user.name}</span>{' '}
                      {notification.content}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{notification.time}</p>
                </div>
                {!notification.read && (
                  <div className="h-2 w-2 bg-blue-500 rounded-full" />
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
