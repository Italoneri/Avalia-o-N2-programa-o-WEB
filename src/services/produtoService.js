const PRODUTOS_KEY = "petco_produtos";

export function getProdutos() {
  const produtos = localStorage.getItem(PRODUTOS_KEY);
  return produtos ? JSON.parse(produtos) : [];
}

export function getProdutoById(id) {
  const produtos = getProdutos();
  return produtos.find(p => p.id === Number(id));
}

export function saveProduto(produtoData) {
  const produtos = getProdutos();
  
  if (produtoData.id) {
    const index = produtos.findIndex(p => p.id === Number(produtoData.id));
    if (index !== -1) {
      produtos[index] = { ...produtos[index], ...produtoData };
    }
  } else {
    const novoProduto = { 
      ...produtoData, 
      id: Date.now() 
    };
    produtos.push(novoProduto);
  }
  
  localStorage.setItem(PRODUTOS_KEY, JSON.stringify(produtos));
}

export function deleteProduto(id) {
  const produtos = getProdutos();
  const filtrados = produtos.filter(p => p.id !== Number(id));
  localStorage.setItem(PRODUTOS_KEY, JSON.stringify(filtrados));
}