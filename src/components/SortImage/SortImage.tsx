import Image from "next/image";

interface Props {
  sort: string;
  order: string;
  colName: string;
}

export default function SortImage({ sort, order, colName }: Props) {
  const getImage = () => {
    if (sort === colName.toLowerCase() && order) {
      return "sorted-desc.svg";
    } else if (sort === colName.toLowerCase()) {
      return "sorted-asc.svg";
    } else {
      return "no-sorted.svg";
    }
  };

  return <Image src={getImage()} height={20} width={20} alt="Sort icon" />;
}
