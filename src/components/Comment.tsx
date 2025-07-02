interface CommentData {
  id: string;
  text: string;
  issueId: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: string;
    name: string;
    email: string;
    picture?: string | null;
  };
}

interface CommentProps {
  comment: CommentData;
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

export default function Comment({ comment }: CommentProps) {
  const initials = getInitials(comment.author.name);

  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 overflow-hidden rounded-full">
        {comment.author.picture ? (
          <img
            src={comment.author.picture}
            alt={comment.author.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 bg-gradient-to-br from-[#ff6600] to-[#ffae42] rounded-full flex items-center justify-center text-white font-semibold text-sm">
            {initials}
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-white">
              {comment.author.name}
            </span>
            <span className="text-sm text-gray-400">
              {formatDate(comment.createdAt)}
            </span>
          </div>
          <p className="text-gray-300 leading-relaxed">{comment.text}</p>
        </div>
      </div>
    </div>
  );
}
