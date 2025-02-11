// Validação de Nome Completo
export const validarNome = (nome) => {
  return nome.trim().split(' ').length >= 2; // Pelo menos dois nomes
};

// Validação de CPF (apenas números, 11 dígitos)
export const validarCpf = (cpf) => {
  return /^\d{11}$/.test(cpf); // Apenas 11 números
};

// Validação de Telefone Fixo (apenas números, 10 dígitos)
export const validarTelefoneFixo = (telefone) => {
  return /^\d{10}$/.test(telefone); // Apenas 10 números
};

// Validação de Celular (apenas números, 11 dígitos)
export const validarCelular = (celular) => {
  return /^\d{11}$/.test(celular); // Apenas 11 números
};

// Validação de Email
export const validarEmail = (email) => {
  const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regexEmail.test(email);
};

// Validação de Data de Nascimento (DD/MM/AAAA)
export const validarDataNascimento = (dataNascimento) => {
  const regexData = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  return regexData.test(dataNascimento);
};

// Validação de Senha
export const validarSenha = (senha) => {
  const regexSenha = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regexSenha.test(senha);
};

// Validação de Confirmação de Senha
export const validarConfirmacaoSenha = (senha, confirmarSenha) => {
  return senha === confirmarSenha;
};

// Validação de CEP
export const validarCep = (cep) => {
  const regexCep = /^\d{5}-\d{3}$/;
  return regexCep.test(cep);
};
