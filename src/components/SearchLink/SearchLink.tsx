import { SearchParams, getSearchWith } from "@/utils/searchHepler";
import Link, { LinkProps } from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type Props = Omit<LinkProps, "href"> & {
  params: SearchParams;
  children?: React.ReactNode;
};

export default function SearchLink({ children, params, ...props }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  return (
    <Link
      {...props}
      href={{
        pathname,
        query: getSearchWith(searchParams, params),
      }}
    >
      {children}
    </Link>
  );
}
