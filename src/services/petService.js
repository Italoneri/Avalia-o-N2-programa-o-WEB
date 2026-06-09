import { supabase } from "./supabaseClient";

export async function getPets() {
  const { data, error } = await supabase.from('pets').select('*');
  if (error) { console.error("Erro pets:", error); return []; }
  return data;
}

export async function getPetById(id) {
  const { data, error } = await supabase.from('pets').select('*').eq('id', id).single();
  if (error) return null;
  return data;
}

export async function savePet(petData) {
  if (petData.id) {
    await supabase.from('pets').update({
      nome: petData.nome, raca: petData.raca, idade: petData.idade, porte: petData.porte
    }).eq('id', petData.id);
  } else {
    await supabase.from('pets').insert([{
      nome: petData.nome, raca: petData.raca, idade: petData.idade, porte: petData.porte
    }]);
  }
}

export async function deletePet(id) {
  await supabase.from('pets').delete().eq('id', id);
}