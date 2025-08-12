import Link from "next/link";
import Image from "next/image";
import { EyeIcon } from "lucide-react";
import { PostType } from "@/app/(root)/page";
import formateDate from "@/lib/utils";
import { Button } from "@/components/ui/button";

const StartupCard = ({ post }: { post: PostType }) => {
  return (
    <li key={post._id} className="startup-card group">
      <div className="flex-between">
        <p className="startup_card_date">{formateDate(post._createdAt)}</p>
        <div className="flex gap-1 5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{post.views}</span>
        </div>
      </div>
      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${post.author._id}`}>
            <p className="text-16-medium line-clap-1">{post.author.name}</p>
          </Link>
          <Link href={`/startup/${post._id}`}>
            <h3 className="text-26-semibold line clamp-1">{post.title}</h3>
          </Link>
        </div>
        <Link href={`/user/${post.author._id}`}>
          <Image
            src={post.author.image}
            width={48}
            height={48}
            className="rounded-full aspect-square"
            alt={post.author.name}
          />
        </Link>
      </div>
      <Link href={`/startup/${post._id}`}>
        <p className="startup-card_desc">{post.description}</p>
        <Image
          src={post.image}
          width={1000}
          height={500}
          className="startup-card_img"
          alt={post.title}
        />
      </Link>
      <div className="flex-between gap-3 m-3">
        <Link href={`/?query=${post.category.toLowerCase()}`}>
          <p className="text-16-medium">{post.category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${post._id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export default StartupCard;
