const PETS_KEY = "petco_pets";

export function getPets() {
  const pets = localStorage.getItem(PETS_KEY);
  return pets ? JSON.parse(pets) : [];
}

export function getPetById(id) {
  const pets = getPets();
  return pets.find(pet => pet.id === Number(id));
}

export function savePet(petData) {
  const pets = getPets();
  
  if (petData.id) {
    const index = pets.findIndex(p => p.id === Number(petData.id));
    if (index !== -1) {
      pets[index] = { ...pets[index], ...petData };
    }
  } else {
    const novoPet = { 
      ...petData, 
      id: Date.now()
    };
    pets.push(novoPet);
  }
  
  localStorage.setItem(PETS_KEY, JSON.stringify(pets));
}

export function deletePet(id) {
  const pets = getPets();
  const filtrados = pets.filter(pet => pet.id !== Number(id));
  localStorage.setItem(PETS_KEY, JSON.stringify(filtrados));
}