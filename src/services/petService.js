import { supabase } from "./supabaseClient";

export async function getPets() {
  const { data, error } = await supabase.from('pets').select('*');
  if (error) { console.error("Erro pets:", error); return []; }
  return data;
}
export async function getPetsSemDono() {
  const { data, error } = await supabase
      .from('pets')
      .select('*')
      .is('dono_id', null);

  if (error) {
    console.error("Erro pets:", error);
    return [];
  }
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

export async function adotarPet(petId,userId){
  console.log(userId)
  if (petId && userId){
  await supabase.from('pets').update({
    dono_id: userId
  }).eq('id', petId);
  }
}

export async function deletePet(id) {
  await supabase.from('pets').delete().eq('id', id);
}

export async function getAdocoes() {
  try {
    const { data, error } = await supabase
        .from("pets")
        .select(`
          id,
          nome,
          dono_id,
          raca,          
          idade,         
          porte,         
          usuarios!inner (
            id,
            nome,
            email,       
            tipo         
          )
        `)
        .not("dono_id", "is", null);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Erro ao buscar adoções:", error);
    return [];
  }
}
export async function desfazerAdocao(petId) {
  try {
    const {data, error} = await supabase
        .from("pets")
        .update({dono_id: null})
        .eq("id", petId);

    if (error) throw error;
    return {success: true};
  } catch (error) {
    console.error("Erro ao desfazer adoção:", error);
    return {success: false, error};
  }
}