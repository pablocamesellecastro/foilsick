export async function handleCheckout(items: any[]) {
  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });

  const text = await response.text();
  console.log("Respuesta API", text);

  const { url } = JSON.parse(text);
  window.location.href = url;
}
