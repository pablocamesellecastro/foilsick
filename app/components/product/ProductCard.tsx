export default function ProductCard({ product }) {
  return (
    <div>
      <a href={`/products/${product.id}`}>
        <p>{product.name}</p>
      </a>
    </div>
  );
}
