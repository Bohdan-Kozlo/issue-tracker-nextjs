interface CommentData {
  id: number;
  author: string;
  content: string;
  createdAt: string;
  avatar: string;
}

interface CommentProps {
  comment: CommentData;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function Comment({ comment }: CommentProps) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 bg-gradient-to-br from-[#ff6600] to-[#ffae42] rounded-full flex items-center justify-center text-white font-semibold text-sm">
        {comment.avatar}
      </div>
      <div className="flex-1">
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-white">{comment.author}</span>
            <span className="text-sm text-gray-400">
              {formatDate(comment.createdAt)}
            </span>
          </div>
          <p className="text-gray-300 leading-relaxed">{comment.content}</p>
        </div>
      </div>
    </div>
  );
}
