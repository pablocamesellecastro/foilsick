import Image from "next/image";
import Link from "next/link";

export default function RelatedProductCard({ product }: { product: any }) {
  return (
    <div>
      <Link
        href={`/products/${product.id}`}
        className="relative block aspect-square overflow-hidden"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 270px, 50vw"
          className="object-cover"
        />
      </Link>

      <Link href={`/products/${product.id}`}>
        <h2 className="mt-3 text-base font-bold">{product.name}</h2>
      </Link>
    </div>
  );
}
