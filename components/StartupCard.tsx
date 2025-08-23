import Image from 'next/image';
import { EyeIcon } from 'lucide-react';
import { StartupTypeCard } from '@/app/(root)/page';
import formateDate from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/custom-router';

const StartupCard = ({ startup }: { startup: StartupTypeCard }) => {
  return (
    <li key={startup._id} className="startup-card group">
      <div className="flex-between">
        <p className="startup_card_date">{formateDate(startup._createdAt)}</p>
        <div className="flex gap-1 5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{startup.views}</span>
        </div>
      </div>
      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${startup?.author?._id}`}>
            <p className="text-16-medium line-clap-1">{startup?.author?.name}</p>
          </Link>
          <Link href={`/startup/${startup._id}`}>
            <h3 className="max-w-[280px] text-26-semibold line truncate">{startup.title}</h3>
          </Link>
        </div>
        <Link href={`/user/${startup?.author?._id}`}>
          <Image
            src={startup?.author?.image ?? ''}
            width={48}
            height={48}
            className="rounded-full aspect-square"
            alt={startup?.author?.name ?? 'alt'}
          />
        </Link>
      </div>
      <Link href={`/startup/${startup._id}`}>
        <p className="startup-card_desc">{startup.description}</p>
        <Image
          src={startup?.image ?? ''}
          width={1000}
          height={500}
          className="startup-card_img"
          alt={startup?.title ?? ''}
        />
      </Link>
      <div className="flex-between gap-3 m-3">
        <Link href={`/?query=${startup?.category?.toLowerCase()}`}>
          <p className="text-16-medium category-tag mb-0">{startup.category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${startup._id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export default StartupCard;
