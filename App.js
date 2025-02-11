import React, { useState } from 'react';
import { Text, View, TextInput, Button, Alert, ScrollView } from 'react-native';
import {
  validarNome,
  validarDataNascimento,
  validarCpf,
  validarTelefoneFixo,
  validarCelular,
  validarCep,
  validarEmail,
  validarSenha,
  validarConfirmacaoSenha,
} from './validations';
import styles from './styles';

export default function App() {
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefoneFixo, setTelefoneFixo] = useState('');
  const [celular, setCelular] = useState('');
  const [nomePai, setNomePai] = useState('');
  const [nomeMae, setNomeMae] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [cadastroSucesso, setCadastroSucesso] = useState(false);
  const [erros, setErros] = useState({});

  const handleSubmit = () => {
    const erros = {};

    // Validações
    if (!validarNome(nome)) {
      erros.nome = 'Nome deve conter pelo menos dois nomes.';
    }

    if (!validarDataNascimento(dataNascimento)) {
      erros.dataNascimento = 'Data de nascimento inválida.';
    }

    if (!validarCpf(cpf)) {
      erros.cpf = 'CPF inválido.';
    }

    if (!validarTelefoneFixo(telefoneFixo)) {
      erros.telefoneFixo = 'Telefone fixo inválido.';
    }

    if (!validarCelular(celular)) {
      erros.celular = 'Celular inválido.';
    }

    if (!validarCep(cep)) {
      erros.cep = 'CEP inválido.';
    }

    if (!validarEmail(email)) {
      erros.email = 'Email inválido.';
    }

    if (!validarSenha(senha)) {
      erros.senha = 'Senha deve ter no mínimo 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial.';
    }

    if (!validarConfirmacaoSenha(senha, confirmarSenha)) {
      erros.confirmarSenha = 'As senhas não coincidem.';
    }

    // Verifica se o usuário é menor de idade
    const idade = calcularIdade(dataNascimento);
    if (idade < 18) {
      if (!nomePai.trim()) {
        erros.nomePai = 'Nome do Pai é obrigatório para menores de idade.';
      }
      if (!nomeMae.trim()) {
        erros.nomeMae = 'Nome da Mãe é obrigatório para menores de idade.';
      }
    }

    // Exibe erros ou sucesso
    if (Object.keys(erros).length > 0) {
      setErros(erros);
      Alert.alert('Erro', 'Corrija os campos destacados.');
    } else {
      setCadastroSucesso(true); // Mostra a tela de sucesso
    }
  };

  // Função para calcular a idade
  const calcularIdade = (dataNascimento) => {
    const [dia, mes, ano] = dataNascimento.split('/');
    const dataNasc = new Date(ano, mes - 1, dia);
    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNasc.getFullYear();

    if (
      hoje.getMonth() < dataNasc.getMonth() ||
      (hoje.getMonth() === dataNasc.getMonth() && hoje.getDate() < dataNasc.getDate())
    ) {
      idade--;
    }

    return idade;
  };

  // Função para formatar a data de nascimento
  const formatarDataNascimento = (text) => {
    let formattedText = text.replace(/\D/g, ''); // Remove tudo que não é número
    if (formattedText.length > 2) {
      formattedText = formattedText.replace(/^(\d{2})/, '$1/');
    }
    if (formattedText.length > 5) {
      formattedText = formattedText.replace(/^(\d{2})\/(\d{2})/, '$1/$2/');
    }
    setDataNascimento(formattedText.substring(0, 10)); // Limita a 10 caracteres (DD/MM/AAAA)
  };

  // Tela de sucesso
  if (cadastroSucesso) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Cadastro realizado com sucesso!</Text>
        <Button title="Voltar" onPress={() => setCadastroSucesso(false)} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Formulário de Cadastro</Text>

      {/* Seção 1: Informações Pessoais */}
      <Text style={styles.subtitulo}>Informações Pessoais</Text>
      <TextInput
        style={[styles.input, erros.nome && styles.inputErro]}
        placeholder="Nome Completo"
        value={nome}
        onChangeText={setNome}
      />
      {erros.nome && <Text style={styles.erro}>{erros.nome}</Text>}
      <TextInput
        style={[styles.input, erros.dataNascimento && styles.inputErro]}
        placeholder="Data de Nascimento (DD/MM/AAAA)"
        value={dataNascimento}
        onChangeText={formatarDataNascimento}
        keyboardType="numeric"
        maxLength={10}
      />
      {erros.dataNascimento && <Text style={styles.erro}>{erros.dataNascimento}</Text>}
      <TextInput
        style={[styles.input, erros.cpf && styles.inputErro]}
        placeholder="CPF (apenas números)"
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
        maxLength={11}
      />
      {erros.cpf && <Text style={styles.erro}>{erros.cpf}</Text>}
      <TextInput
        style={[styles.input, erros.telefoneFixo && styles.inputErro]}
        placeholder="Telefone Fixo ((XX) XXXX-XXXX)"
        value={telefoneFixo}
        onChangeText={setTelefoneFixo}
      />
      {erros.telefoneFixo && <Text style={styles.erro}>{erros.telefoneFixo}</Text>}
      <TextInput
        style={[styles.input, erros.celular && styles.inputErro]}
        placeholder="Celular ((XX) 9XXXX-XXXX)"
        value={celular}
        onChangeText={setCelular}
      />
      {erros.celular && <Text style={styles.erro}>{erros.celular}</Text>}

      {/* Seção 2: Informações Complementares (para menores de idade) */}
      <Text style={styles.subtitulo}>Informações Complementares</Text>
      <TextInput
        style={[styles.input, erros.nomePai && styles.inputErro]}
        placeholder="Nome do Pai"
        value={nomePai}
        onChangeText={setNomePai}
      />
      {erros.nomePai && <Text style={styles.erro}>{erros.nomePai}</Text>}
      <TextInput
        style={[styles.input, erros.nomeMae && styles.inputErro]}
        placeholder="Nome da Mãe"
        value={nomeMae}
        onChangeText={setNomeMae}
      />
      {erros.nomeMae && <Text style={styles.erro}>{erros.nomeMae}</Text>}

      {/* Seção 3: Endereço */}
      <Text style={styles.subtitulo}>Endereço</Text>
      <TextInput
        style={[styles.input, erros.cep && styles.inputErro]}
        placeholder="CEP (XXXXX-XXX)"
        value={cep}
        onChangeText={setCep}
      />
      {erros.cep && <Text style={styles.erro}>{erros.cep}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={endereco}
        onChangeText={setEndereco}
      />
      <TextInput
        style={styles.input}
        placeholder="Número"
        value={numero}
        onChangeText={setNumero}
      />
      <TextInput
        style={styles.input}
        placeholder="Complemento (opcional)"
        value={complemento}
        onChangeText={setComplemento}
      />
      <TextInput
        style={styles.input}
        placeholder="Cidade"
        value={cidade}
        onChangeText={setCidade}
      />
      <TextInput
        style={styles.input}
        placeholder="Estado"
        value={estado}
        onChangeText={setEstado}
      />

      {/* Seção 4: Informações da Conta */}
      <Text style={styles.subtitulo}>Informações da Conta</Text>
      <TextInput
        style={[styles.input, erros.email && styles.inputErro]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      {erros.email && <Text style={styles.erro}>{erros.email}</Text>}
      <TextInput
        style={[styles.input, erros.senha && styles.inputErro]}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      {erros.senha && <Text style={styles.erro}>{erros.senha}</Text>}
      <TextInput
        style={[styles.input, erros.confirmarSenha && styles.inputErro]}
        placeholder="Confirmar Senha"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
      />
      {erros.confirmarSenha && <Text style={styles.erro}>{erros.confirmarSenha}</Text>}

      <Button title="Cadastrar" onPress={handleSubmit} />
    </ScrollView>
  );
}
