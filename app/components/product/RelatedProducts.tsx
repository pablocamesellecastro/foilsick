import RelatedProductCard from "./RelatedProductCard";

export default function RelatedProducts({ products }: { products: any[] }) {
  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-[960px] px-6 pb-24 pt-16 text-black">
      <div className="grid grid-cols-2 gap-x-6 gap-y-16 md:grid-cols-3 md:gap-x-20">
        {products.map((product) => (
          <RelatedProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
