const DB = {
  CLIENTES: "vcm_clientes",
  FILMES: "vcm_filmes",
  LOCACOES: "vcm_locacoes",
  DATA: "vcm_data_virtual",
  INICIADO: "vcm_demo_iniciada"
};

function carregar(chave) {
  return JSON.parse(localStorage.getItem(chave)) || [];
}

function salvar(chave, dados) {
  localStorage.setItem(chave, JSON.stringify(dados));
}

function dataParaISO(data) {
  return data.toISOString().split("T")[0];
}

function somarDias(dataISO, dias) {
  const d = new Date(dataISO + "T12:00:00");
  d.setDate(d.getDate() + dias);
  return dataParaISO(d);
}

function hojeRealISO() {
  return dataParaISO(new Date());
}

function dataVirtual() {
  let valor = localStorage.getItem(DB.DATA);
  if (!valor) {
    valor = hojeRealISO();
    localStorage.setItem(DB.DATA, valor);
  }
  return valor;
}

function definirDataVirtual(valor) {
  localStorage.setItem(DB.DATA, valor);
}

function proximoId(lista) {
  if (lista.length === 0) return 1;
  return Math.max(...lista.map(item => item.id)) + 1;
}

function dinheiro(valor) {
  return Number(valor || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function diasEntre(inicial, final) {
  const a = new Date(inicial + "T12:00:00");
  const b = new Date(final + "T12:00:00");
  return Math.floor((b - a) / 86400000);
}

function avisar(elemento, mensagem, erro = false) {
  if (!elemento) return;
  elemento.textContent = mensagem;
  elemento.classList.add("show");
  elemento.classList.toggle("error", erro);
  setTimeout(() => elemento.classList.remove("show"), 3500);
}

function semearDemo(force = false) {
  if (!force && localStorage.getItem(DB.INICIADO)) return;

  const hoje = hojeRealISO();

  const clientes = [
    { id: 1, nome: "Carlos Almeida", endereco: "Rua das Palmeiras, 118", cpf: "111.222.333-44", telefone: "(11) 98811-2201" },
    { id: 2, nome: "Mariana Costa", endereco: "Av. Brasil, 902", cpf: "222.333.444-55", telefone: "(11) 97654-3388" },
    { id: 3, nome: "Rafael Martins", endereco: "Rua do Cinema, 45", cpf: "333.444.555-66", telefone: "(11) 96543-7710" },
    { id: 4, nome: "Beatriz Souza", endereco: "Rua das Flores, 321", cpf: "444.555.666-77", telefone: "(11) 95432-1199" },
    { id: 5, nome: "Lucas Ferreira", endereco: "Av. Central, 1570", cpf: "555.666.777-88", telefone: "(11) 94321-8822" },
    { id: 6, nome: "Camila Ribeiro", endereco: "Rua Videocassete, 77", cpf: "666.777.888-99", telefone: "(11) 93210-4411" }
  ];

  const filmes = [
    { id: 1, titulo: "Jurassic Park", genero: "Aventura", ano: 1993, classificacao: "12", estoque: 3, disponiveis: 2 },
    { id: 2, titulo: "Matrix", genero: "Ficção Científica", ano: 1999, classificacao: "14", estoque: 2, disponiveis: 1 },
    { id: 3, titulo: "Titanic", genero: "Drama", ano: 1997, classificacao: "12", estoque: 3, disponiveis: 3 },
    { id: 4, titulo: "Toy Story", genero: "Animação", ano: 1995, classificacao: "Livre", estoque: 2, disponiveis: 2 },
    { id: 5, titulo: "Esqueceram de Mim", genero: "Comédia", ano: 1990, classificacao: "Livre", estoque: 2, disponiveis: 1 },
    { id: 6, titulo: "O Rei Leão", genero: "Animação", ano: 1994, classificacao: "Livre", estoque: 3, disponiveis: 3 },
    { id: 7, titulo: "Pulp Fiction", genero: "Drama", ano: 1994, classificacao: "18", estoque: 1, disponiveis: 1 },
    { id: 8, titulo: "O Exterminador do Futuro 2", genero: "Ação", ano: 1991, classificacao: "14", estoque: 2, disponiveis: 2 },
    { id: 9, titulo: "Pânico", genero: "Terror", ano: 1996, classificacao: "16", estoque: 2, disponiveis: 2 },
    { id: 10, titulo: "MIB - Homens de Preto", genero: "Ficção Científica", ano: 1997, classificacao: "12", estoque: 2, disponiveis: 2 },
    { id: 11, titulo: "Forrest Gump", genero: "Drama", ano: 1994, classificacao: "12", estoque: 2, disponiveis: 2 },
    { id: 12, titulo: "Ghost: Do Outro Lado da Vida", genero: "Romance", ano: 1990, classificacao: "12", estoque: 1, disponiveis: 1 },
    { id: 13, titulo: "Space Jam", genero: "Comédia", ano: 1996, classificacao: "Livre", estoque: 2, disponiveis: 2 },
    { id: 14, titulo: "O Máskara", genero: "Comédia", ano: 1994, classificacao: "Livre", estoque: 2, disponiveis: 2 },
    { id: 15, titulo: "Uma Linda Mulher", genero: "Romance", ano: 1990, classificacao: "14", estoque: 2, disponiveis: 2 }
  ];

  const locacoes = [
    {
      id: 1, clienteId: 1, filmeId: 1,
      dataLocacao: somarDias(hoje, -2),
      dataPrevista: somarDias(hoje, 1),
      dataDevolucao: null, multa: 0, status: "aberta"
    },
    {
      id: 2, clienteId: 2, filmeId: 2,
      dataLocacao: somarDias(hoje, -5),
      dataPrevista: somarDias(hoje, -1),
      dataDevolucao: null, multa: 0, status: "aberta"
    },
    {
      id: 3, clienteId: 3, filmeId: 5,
      dataLocacao: somarDias(hoje, -1),
      dataPrevista: somarDias(hoje, 2),
      dataDevolucao: null, multa: 0, status: "aberta"
    },
    {
      id: 4, clienteId: 4, filmeId: 6,
      dataLocacao: somarDias(hoje, -10),
      dataPrevista: somarDias(hoje, -7),
      dataDevolucao: somarDias(hoje, -7),
      multa: 0, status: "finalizada"
    },
    {
      id: 5, clienteId: 5, filmeId: 14,
      dataLocacao: somarDias(hoje, -12),
      dataPrevista: somarDias(hoje, -9),
      dataDevolucao: somarDias(hoje, -7),
      multa: 4, status: "finalizada"
    }
  ];

  salvar(DB.CLIENTES, clientes);
  salvar(DB.FILMES, filmes);
  salvar(DB.LOCACOES, locacoes);
  definirDataVirtual(hoje);
  localStorage.setItem(DB.INICIADO, "1");
}

function bootstrap() {
  semearDemo(false);
}
bootstrap();

/* MENU PRINCIPAL */
function iniciarMenu() {
  const input = document.querySelector("#menu-opcao");
  if (!input) return;

  const mapa = {
    "1": "clientes.html",
    "2": "filmes.html",
    "3": "locacao.html",
    "4": "devolucao.html",
    "5": "acervo.html"
  };

  function executarOpcao() {
    const destino = mapa[input.value.trim()];
    const msg = document.querySelector("#menu-msg");
    if (destino) {
      msg.textContent = "Abrindo módulo...";
      window.location.href = destino;
    } else {
      msg.textContent = "Opção inválida. Digite um número de 1 a 5.";
    }
  }

  input.addEventListener("keydown", e => {
    if (e.key === "Enter") executarOpcao();
  });
  document.querySelector("#btn-menu-executar")?.addEventListener("click", executarOpcao);
}

/* DASHBOARD + SIMULAÇÃO */
function iniciarDashboard() {
  const totalClientes = document.querySelector("#total-clientes");
  if (!totalClientes) return;

  function atualizar() {
    const clientes = carregar(DB.CLIENTES);
    const filmes = carregar(DB.FILMES);
    const locacoes = carregar(DB.LOCACOES);
    totalClientes.textContent = clientes.length;
    document.querySelector("#total-filmes").textContent = filmes.length;
    document.querySelector("#locacoes-abertas").textContent = locacoes.filter(l => l.status === "aberta").length;
    document.querySelector("#locacoes-finalizadas").textContent = locacoes.filter(l => l.status === "finalizada").length;
    document.querySelector("#data-virtual").textContent = dataVirtual();

    const atrasadas = locacoes.filter(l => l.status === "aberta" && diasEntre(l.dataPrevista, dataVirtual()) > 0).length;
    document.querySelector("#atrasadas").textContent = atrasadas;
  }

  function log(texto) {
    document.querySelector("#simulation-log").textContent = texto;
  }

  document.querySelector("#btn-avancar-dia")?.addEventListener("click", () => {
    const nova = somarDias(dataVirtual(), 1);
    definirDataVirtual(nova);
    atualizar();
    log(`Calendário avançado para ${nova}. Verifique possíveis atrasos na tela de devolução.`);
  });

  document.querySelector("#btn-simular-movimento")?.addEventListener("click", () => {
    let clientes = carregar(DB.CLIENTES);
    let filmes = carregar(DB.FILMES);
    let locacoes = carregar(DB.LOCACOES);

    const abertas = locacoes.filter(l => l.status === "aberta");
    const disponiveis = filmes.filter(f => f.disponiveis > 0);

    const podeDevolver = abertas.length > 0;
    const podeAlugar = clientes.length > 0 && disponiveis.length > 0;

    const fazerDevolucao = podeDevolver && (!podeAlugar || Math.random() < 0.5);

    if (fazerDevolucao) {
      const locacao = abertas[Math.floor(Math.random() * abertas.length)];
      const atraso = Math.max(0, diasEntre(locacao.dataPrevista, dataVirtual()));
      const multa = atraso * 2;
      locacao.dataDevolucao = dataVirtual();
      locacao.multa = multa;
      locacao.status = "finalizada";

      const filme = filmes.find(f => f.id === locacao.filmeId);
      const cliente = clientes.find(c => c.id === locacao.clienteId);
      if (filme) filme.disponiveis = Math.min(filme.estoque, filme.disponiveis + 1);

      salvar(DB.LOCACOES, locacoes);
      salvar(DB.FILMES, filmes);
      log(`${cliente?.nome || "Cliente"} devolveu "${filme?.titulo || "Filme"}". Multa: ${dinheiro(multa)}.`);
    } else if (podeAlugar) {
      const cliente = clientes[Math.floor(Math.random() * clientes.length)];
      const filme = disponiveis[Math.floor(Math.random() * disponiveis.length)];
      const nova = {
        id: proximoId(locacoes),
        clienteId: cliente.id,
        filmeId: filme.id,
        dataLocacao: dataVirtual(),
        dataPrevista: somarDias(dataVirtual(), 3),
        dataDevolucao: null,
        multa: 0,
        status: "aberta"
      };
      locacoes.push(nova);
      filme.disponiveis -= 1;
      salvar(DB.LOCACOES, locacoes);
      salvar(DB.FILMES, filmes);
      log(`${cliente.nome} alugou "${filme.titulo}". Devolução prevista para ${nova.dataPrevista}.`);
    } else {
      log("Não há movimento possível no momento.");
    }

    atualizar();
  });

  document.querySelector("#btn-reset-demo")?.addEventListener("click", () => {
    if (confirm("Restaurar todos os dados de demonstração?")) {
      semearDemo(true);
      atualizar();
      log("Dados de demonstração restaurados.");
    }
  });

  atualizar();
}

/* CLIENTES */
function iniciarClientes() {
  const form = document.querySelector("#form-cliente");
  if (!form) return;

  let clientes = carregar(DB.CLIENTES);
  let editandoId = null;
  const aviso = document.querySelector("#aviso-cliente");
  const tabela = document.querySelector("#tabela-clientes");
  const busca = document.querySelector("#busca-cliente");
  const btn = document.querySelector("#btn-salvar-cliente");

  function renderizar() {
    const termo = (busca?.value || "").toLowerCase().trim();
    const locacoes = carregar(DB.LOCACOES);

    const filtrados = clientes.filter(c =>
      c.nome.toLowerCase().includes(termo) ||
      c.cpf.toLowerCase().includes(termo) ||
      c.telefone.toLowerCase().includes(termo)
    );

    if (!filtrados.length) {
      tabela.innerHTML = `<tr><td colspan="7" class="empty">Nenhum cliente encontrado.</td></tr>`;
      return;
    }

    tabela.innerHTML = filtrados.map(c => {
      const pendentes = locacoes.filter(l => l.clienteId === c.id && l.status === "aberta").length;
      return `
      <tr>
        <td>${c.id}</td>
        <td>${c.nome}</td>
        <td>${c.cpf}</td>
        <td>${c.telefone}</td>
        <td>${c.endereco || "-"}</td>
        <td>${pendentes}</td>
        <td>
          <div class="row-actions">
            <button type="button" data-editar="${c.id}">Editar</button>
            <button type="button" class="danger" data-excluir="${c.id}">Excluir</button>
          </div>
        </td>
      </tr>`;
    }).join("");
  }

  form.addEventListener("submit", e => {
    e.preventDefault();

    const nome = document.querySelector("#cliente-nome").value.trim();
    const endereco = document.querySelector("#cliente-endereco").value.trim();
    const cpf = document.querySelector("#cliente-cpf").value.trim();
    const telefone = document.querySelector("#cliente-telefone").value.trim();

    if (!nome || !cpf || !telefone) {
      avisar(aviso, "Preencha nome, CPF e telefone.", true);
      return;
    }

    if (clientes.some(c => c.cpf === cpf && c.id !== editandoId)) {
      avisar(aviso, "Já existe cliente com esse CPF.", true);
      return;
    }

    if (editandoId) {
      const c = clientes.find(c => c.id === editandoId);
      Object.assign(c, { nome, endereco, cpf, telefone });
      avisar(aviso, "Cliente atualizado.");
    } else {
      clientes.push({ id: proximoId(clientes), nome, endereco, cpf, telefone });
      avisar(aviso, "Cliente cadastrado.");
    }

    salvar(DB.CLIENTES, clientes);
    form.reset();
    editandoId = null;
    btn.textContent = "F1 - Salvar";
    renderizar();
  });

  tabela.addEventListener("click", e => {
    const editar = Number(e.target.dataset.editar);
    const excluir = Number(e.target.dataset.excluir);

    if (editar) {
      const c = clientes.find(c => c.id === editar);
      document.querySelector("#cliente-nome").value = c.nome;
      document.querySelector("#cliente-endereco").value = c.endereco;
      document.querySelector("#cliente-cpf").value = c.cpf;
      document.querySelector("#cliente-telefone").value = c.telefone;
      editandoId = c.id;
      btn.textContent = "Salvar alterações";
      window.scrollTo({top:0, behavior:"smooth"});
    }

    if (excluir) {
      const locacoes = carregar(DB.LOCACOES);
      if (locacoes.some(l => l.clienteId === excluir && l.status === "aberta")) {
        avisar(aviso, "Cliente possui locação em aberto.", true);
        return;
      }
      if (confirm("Excluir este cliente?")) {
        clientes = clientes.filter(c => c.id !== excluir);
        salvar(DB.CLIENTES, clientes);
        renderizar();
      }
    }
  });

  busca?.addEventListener("input", renderizar);
  document.querySelector("#btn-cancelar-edicao")?.addEventListener("click", () => {
    editandoId = null;
    form.reset();
    btn.textContent = "F1 - Salvar";
  });

  renderizar();
}

/* FILMES */
function iniciarFilmes() {
  const form = document.querySelector("#form-filme");
  if (!form) return;

  let filmes = carregar(DB.FILMES);
  let editandoId = null;
  const tabela = document.querySelector("#tabela-filmes");
  const busca = document.querySelector("#busca-filme-cadastro");
  const aviso = document.querySelector("#aviso-filme");
  const btn = document.querySelector("#btn-salvar-filme");

  function renderizar() {
    const termo = (busca?.value || "").toLowerCase().trim();
    const filtrados = filmes.filter(f =>
      f.titulo.toLowerCase().includes(termo) ||
      f.genero.toLowerCase().includes(termo)
    );

    if (!filtrados.length) {
      tabela.innerHTML = `<tr><td colspan="8" class="empty">Nenhum filme cadastrado.</td></tr>`;
      return;
    }

    tabela.innerHTML = filtrados.map(f => `
      <tr>
        <td>${f.id}</td>
        <td>${f.titulo}</td>
        <td>${f.genero}</td>
        <td>${f.ano}</td>
        <td>${f.classificacao}</td>
        <td>${f.estoque}</td>
        <td>${f.disponiveis}</td>
        <td>
          <div class="row-actions">
            <button type="button" data-editar="${f.id}">Editar</button>
            <button type="button" class="danger" data-excluir="${f.id}">Excluir</button>
          </div>
        </td>
      </tr>`).join("");
  }

  form.addEventListener("submit", e => {
    e.preventDefault();

    const titulo = document.querySelector("#filme-titulo").value.trim();
    const genero = document.querySelector("#filme-genero").value;
    const ano = Number(document.querySelector("#filme-ano").value);
    const classificacao = document.querySelector("#filme-classificacao").value.trim();
    const estoque = Number(document.querySelector("#filme-estoque").value);

    if (!titulo || !genero || !ano || estoque < 1) {
      avisar(aviso, "Preencha título, gênero, ano e estoque.", true);
      return;
    }

    if (editandoId) {
      const f = filmes.find(f => f.id === editandoId);
      const alugados = f.estoque - f.disponiveis;
      if (estoque < alugados) {
        avisar(aviso, `Há ${alugados} cópia(s) alugadas.`, true);
        return;
      }
      Object.assign(f, { titulo, genero, ano, classificacao, estoque, disponiveis: estoque - alugados });
      avisar(aviso, "Filme atualizado.");
    } else {
      filmes.push({ id:proximoId(filmes), titulo, genero, ano, classificacao, estoque, disponiveis:estoque });
      avisar(aviso, "Filme cadastrado.");
    }

    salvar(DB.FILMES, filmes);
    form.reset();
    document.querySelector("#filme-estoque").value = 1;
    editandoId = null;
    btn.textContent = "F1 - Salvar";
    renderizar();
  });

  tabela.addEventListener("click", e => {
    const editar = Number(e.target.dataset.editar);
    const excluir = Number(e.target.dataset.excluir);

    if (editar) {
      const f = filmes.find(f => f.id === editar);
      document.querySelector("#filme-titulo").value = f.titulo;
      document.querySelector("#filme-genero").value = f.genero;
      document.querySelector("#filme-ano").value = f.ano;
      document.querySelector("#filme-classificacao").value = f.classificacao;
      document.querySelector("#filme-estoque").value = f.estoque;
      editandoId = f.id;
      btn.textContent = "Salvar alterações";
      window.scrollTo({top:0, behavior:"smooth"});
    }

    if (excluir) {
      const locacoes = carregar(DB.LOCACOES);
      if (locacoes.some(l => l.filmeId === excluir && l.status === "aberta")) {
        avisar(aviso, "Filme possui locação em aberto.", true);
        return;
      }
      if (confirm("Excluir este filme?")) {
        filmes = filmes.filter(f => f.id !== excluir);
        salvar(DB.FILMES, filmes);
        renderizar();
      }
    }
  });

  busca?.addEventListener("input", renderizar);
  document.querySelector("#btn-cancelar-filme")?.addEventListener("click", () => {
    editandoId = null;
    form.reset();
    document.querySelector("#filme-estoque").value = 1;
    btn.textContent = "F1 - Salvar";
  });

  renderizar();
}

/* LOCAÇÕES */
function iniciarLocacao() {
  const form = document.querySelector("#form-locacao");
  if (!form) return;

  let clientes = carregar(DB.CLIENTES);
  let filmes = carregar(DB.FILMES);
  let locacoes = carregar(DB.LOCACOES);

  const selCliente = document.querySelector("#locacao-cliente");
  const selFilme = document.querySelector("#locacao-filme");
  const aviso = document.querySelector("#aviso-locacao");
  const tabela = document.querySelector("#tabela-locacoes");

  function preencher() {
    clientes = carregar(DB.CLIENTES);
    filmes = carregar(DB.FILMES);

    selCliente.innerHTML = `<option value="">Selecione um cliente</option>` +
      clientes.map(c => `<option value="${c.id}">${c.nome} - ${c.cpf}</option>`).join("");

    selFilme.innerHTML = `<option value="">Selecione um filme disponível</option>` +
      filmes.filter(f => f.disponiveis > 0)
        .map(f => `<option value="${f.id}">${f.titulo} (${f.disponiveis} disponível/is)</option>`).join("");
  }

  function renderizar() {
    const abertas = locacoes.filter(l => l.status === "aberta");
    if (!abertas.length) {
      tabela.innerHTML = `<tr><td colspan="7" class="empty">Nenhuma locação em aberto.</td></tr>`;
      return;
    }

    tabela.innerHTML = abertas.map(l => {
      const c = clientes.find(c => c.id === l.clienteId);
      const f = filmes.find(f => f.id === l.filmeId);
      const atraso = diasEntre(l.dataPrevista, dataVirtual()) > 0;
      return `<tr>
        <td>${l.id}</td>
        <td>${c?.nome || "-"}</td>
        <td>${f?.titulo || "-"}</td>
        <td>${l.dataLocacao}</td>
        <td>${l.dataPrevista}</td>
        <td>${atraso ? '<span class="badge danger">Atrasada</span>' : '<span class="badge warn">Em aberto</span>'}</td>
        <td>${atraso ? dinheiro(diasEntre(l.dataPrevista, dataVirtual()) * 2) : dinheiro(0)}</td>
      </tr>`;
    }).join("");
  }

  document.querySelector("#locacao-data").value = dataVirtual();
  document.querySelector("#locacao-devolucao").value = somarDias(dataVirtual(), 3);

  form.addEventListener("submit", e => {
    e.preventDefault();

    const clienteId = Number(selCliente.value);
    const filmeId = Number(selFilme.value);
    const dataLocacao = document.querySelector("#locacao-data").value;
    const dataPrevista = document.querySelector("#locacao-devolucao").value;

    if (!clienteId || !filmeId || !dataLocacao || !dataPrevista) {
      avisar(aviso, "Preencha todos os campos.", true);
      return;
    }

    const filme = filmes.find(f => f.id === filmeId);
    if (!filme || filme.disponiveis < 1) {
      avisar(aviso, "Filme indisponível.", true);
      return;
    }

    locacoes.push({
      id:proximoId(locacoes), clienteId, filmeId,
      dataLocacao, dataPrevista, dataDevolucao:null, multa:0, status:"aberta"
    });
    filme.disponiveis -= 1;

    salvar(DB.LOCACOES, locacoes);
    salvar(DB.FILMES, filmes);

    avisar(aviso, "Locação registrada.");
    form.reset();
    document.querySelector("#locacao-data").value = dataVirtual();
    document.querySelector("#locacao-devolucao").value = somarDias(dataVirtual(),3);
    preencher();
    renderizar();
  });

  preencher();
  renderizar();
}

/* DEVOLUÇÃO */
function iniciarDevolucao() {
  const form = document.querySelector("#form-devolucao");
  if (!form) return;

  let clientes = carregar(DB.CLIENTES);
  let filmes = carregar(DB.FILMES);
  let locacoes = carregar(DB.LOCACOES);

  const select = document.querySelector("#devolucao-locacao");
  const dataInput = document.querySelector("#devolucao-data");
  const multaInput = document.querySelector("#devolucao-multa");
  const aviso = document.querySelector("#aviso-devolucao");
  const tabela = document.querySelector("#tabela-historico");

  function preencher() {
    clientes = carregar(DB.CLIENTES);
    filmes = carregar(DB.FILMES);
    locacoes = carregar(DB.LOCACOES);
    const abertas = locacoes.filter(l => l.status === "aberta");

    select.innerHTML = `<option value="">Selecione uma locação</option>` +
      abertas.map(l => {
        const c = clientes.find(c => c.id === l.clienteId);
        const f = filmes.find(f => f.id === l.filmeId);
        return `<option value="${l.id}">${c?.nome} - ${f?.titulo} - prevista ${l.dataPrevista}</option>`;
      }).join("");
  }

  function calcular() {
    const l = locacoes.find(l => l.id === Number(select.value));
    if (!l || !dataInput.value) {
      multaInput.value = dinheiro(0);
      return 0;
    }
    const atraso = Math.max(0, diasEntre(l.dataPrevista, dataInput.value));
    const multa = atraso * 2;
    multaInput.value = dinheiro(multa);
    return multa;
  }

  function renderizar() {
    const finalizadas = locacoes.filter(l => l.status === "finalizada").slice().reverse();
    if (!finalizadas.length) {
      tabela.innerHTML = `<tr><td colspan="7" class="empty">Nenhuma devolução.</td></tr>`;
      return;
    }
    tabela.innerHTML = finalizadas.map(l => {
      const c = clientes.find(c => c.id === l.clienteId);
      const f = filmes.find(f => f.id === l.filmeId);
      return `<tr>
        <td>${l.id}</td><td>${c?.nome || "-"}</td><td>${f?.titulo || "-"}</td>
        <td>${l.dataLocacao}</td><td>${l.dataPrevista}</td><td>${l.dataDevolucao}</td><td>${dinheiro(l.multa)}</td>
      </tr>`;
    }).join("");
  }

  dataInput.value = dataVirtual();
  select.addEventListener("change", calcular);
  dataInput.addEventListener("change", calcular);

  form.addEventListener("submit", e => {
    e.preventDefault();
    const l = locacoes.find(l => l.id === Number(select.value));
    if (!l) {
      avisar(aviso, "Selecione uma locação.", true);
      return;
    }
    const multa = calcular();
    l.dataDevolucao = dataInput.value;
    l.multa = multa;
    l.status = "finalizada";

    const filme = filmes.find(f => f.id === l.filmeId);
    if (filme) filme.disponiveis = Math.min(filme.estoque, filme.disponiveis + 1);

    salvar(DB.LOCACOES, locacoes);
    salvar(DB.FILMES, filmes);

    avisar(aviso, `Devolução registrada. Multa: ${dinheiro(multa)}.`);
    form.reset();
    dataInput.value = dataVirtual();
    multaInput.value = dinheiro(0);
    preencher();
    renderizar();
  });

  preencher();
  renderizar();
}

/* ACERVO */
function iniciarAcervo() {
  const tabela = document.querySelector("#tabela-acervo");
  if (!tabela) return;

  const busca = document.querySelector("#busca-acervo");
  const filtro = document.querySelector("#filtro-disponibilidade");

  function renderizar() {
    const filmes = carregar(DB.FILMES);
    const termo = busca.value.toLowerCase().trim();
    const status = filtro.value;

    const filtrados = filmes.filter(f => {
      const texto = f.titulo.toLowerCase().includes(termo) || f.genero.toLowerCase().includes(termo);
      const disponibilidade =
        status === "todos" ||
        (status === "disponivel" && f.disponiveis > 0) ||
        (status === "indisponivel" && f.disponiveis === 0);
      return texto && disponibilidade;
    });

    tabela.innerHTML = filtrados.length ? filtrados.map(f => `
      <tr>
        <td>${f.id}</td><td>${f.titulo}</td><td>${f.genero}</td><td>${f.ano}</td>
        <td>${f.classificacao}</td><td>${f.estoque}</td><td>${f.disponiveis}</td>
        <td>${f.disponiveis > 0 ? '<span class="badge ok">Disponível</span>' : '<span class="badge warn">Alugado</span>'}</td>
      </tr>`).join("")
      : `<tr><td colspan="8" class="empty">Nenhum filme encontrado.</td></tr>`;
  }

  busca.addEventListener("input", renderizar);
  filtro.addEventListener("change", renderizar);
  renderizar();
}

iniciarMenu();
iniciarDashboard();
iniciarClientes();
iniciarFilmes();
iniciarLocacao();
iniciarDevolucao();
iniciarAcervo();
