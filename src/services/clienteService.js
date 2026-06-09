import { supabase } from "./supabaseClient";

export async function getClientes() {
  const { data, error } = await supabase.from('usuarios').select('*');
  if (error) { console.error("Erro usuarios:", error); return []; }
  return data;
}

export async function getClienteById(id) {
  const { data, error } = await supabase.from('usuarios').select('*').eq('id', id).single();
  if (error) return null;
  return data;
}

export async function saveCliente(clienteData) {
  if (clienteData.id) {
    await supabase.from('usuarios').update({
      nome: clienteData.name || clienteData.nome, 
      email: clienteData.email, 
      senha: clienteData.password || clienteData.senha, 
      tipo: clienteData.tipo
    }).eq('id', clienteData.id);
  } else {
    await supabase.from('usuarios').insert([{
      nome: clienteData.name || clienteData.nome, 
      email: clienteData.email, 
      senha: clienteData.password || clienteData.senha, 
      tipo: clienteData.tipo || 'cliente'
    }]);
  }
}

export async function deleteCliente(id) {
  await supabase.from('usuarios').delete().eq('id', id);
}