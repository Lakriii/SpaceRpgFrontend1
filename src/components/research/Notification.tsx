'use client';

type NotificationProps = {
  message: string;
};

export default function Notification({ message }: NotificationProps) {
  if (!message) return null;

  return (
    <div className="fixed top-6 right-6 bg-gray-800 text-white px-5 py-3 rounded-lg shadow-lg z-50 transition-all duration-300">
      {message}
    </div>
  );
}
