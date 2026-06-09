import { supabase } from "./supabaseClient";

export async function getProdutos() {
  const { data, error } = await supabase.from('produtos').select('*');
  if (error) { console.error("Erro produtos:", error); return []; }
  return data;
}

export async function getProdutoById(id) {
  const { data, error } = await supabase.from('produtos').select('*').eq('id', id).single();
  if (error) return null;
  return data;
}

export async function saveProduto(produtoData) {
  if (produtoData.id) {
    await supabase.from('produtos').update({
      nome: produtoData.nome, descricao: produtoData.descricao, 
      preco: Number(produtoData.preco), estoque: Number(produtoData.estoque)
    }).eq('id', produtoData.id);
  } else {
    await supabase.from('produtos').insert([{
      nome: produtoData.nome, descricao: produtoData.descricao, 
      preco: Number(produtoData.preco), estoque: Number(produtoData.estoque)
    }]);
  }
}

export async function deleteProduto(id) {
  await supabase.from('produtos').delete().eq('id', id);
}