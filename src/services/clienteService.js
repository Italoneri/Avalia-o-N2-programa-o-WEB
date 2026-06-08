const CLIENTES_KEY = "petco_users";

export function getClientes() {
  const clientes = localStorage.getItem(CLIENTES_KEY);
  return clientes ? JSON.parse(clientes) : [];
}

export function getClienteById(id) {
  const clientes = getClientes();
  // Compara como string caso o ID original do login não exista
  return clientes.find(c => String(c.id) === String(id));
}

export function saveCliente(clienteData) {
  const clientes = getClientes();
  
  if (clienteData.id) {
    // Atualização (Update)
    const index = clientes.findIndex(c => String(c.id) === String(clienteData.id));
    if (index !== -1) {
      clientes[index] = { ...clientes[index], ...clienteData };
    }
  } else {
    // Criação (Create)
    const novoCliente = { 
      ...clienteData, 
      id: Date.now(), // Simula o AUTO_INCREMENT
      tipo: clienteData.tipo || "cliente"
    };
    clientes.push(novoCliente);
  }
  
  localStorage.setItem(CLIENTES_KEY, JSON.stringify(clientes));
}

export function deleteCliente(id) {
  const clientes = getClientes();
  const filtrados = clientes.filter(c => String(c.id) !== String(id));
  localStorage.setItem(CLIENTES_KEY, JSON.stringify(filtrados));
}