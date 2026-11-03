(function (Portfolio) {
  'use strict';

  Portfolio.groups = [
    { id: 'estagio', title: 'Estágio', subtitle: 'Instituto Brain, ICT do Grupo Algar', color: '#7C4DFF' },
    { id: 'faculdade', title: 'Faculdade', subtitle: 'Sistemas de Informação na FIAP', color: '#3A2EE8' },
    { id: 'pessoal', title: 'Pessoais', subtitle: 'Projetos por conta própria', color: '#F43F5E' }
  ];

  Portfolio.areaColors = {
    dev: '#3A2EE8',
    ia: '#7C4DFF',
    dados: '#1E88E5',
    negocios: '#F59E0B',
    seguranca: '#F43F5E',
    iot: '#10B981'
  };

  Portfolio.categories = [
    { id: 'all', label: 'Todos' },
    { id: 'dev', label: 'Desenvolvimento' },
    { id: 'ia', label: 'Inteligência Artificial' },
    { id: 'dados', label: 'Dados e decisão' },
    { id: 'negocios', label: 'Inovação e negócios' },
    { id: 'seguranca', label: 'Cibersegurança' },
    { id: 'iot', label: 'IoT' }
  ];

  const img = (file, alt, caption) => ({ src: `assets/projects/${file}.webp`, alt, caption });

  Portfolio.projects = [

    {
      id: 'interagente',
      featured: true,
      group: 'estagio',
      name: 'Interagente',
      kind: 'IA / Landing page e agente de atendimento',
      categories: ['ia', 'dev'],
      size: 'xl',
      accent: '#0E9F88',
      visual: 'landing',
      cover: img('interagente-hero', 'Topo da landing page da Interagente: um agente de IA feito sob medida para o seu negócio'),
      gallery: [
        img('interagente-hero', 'Topo da landing page da Interagente', 'Topo da página'),
        img('interagente-agentes', 'Seção com exemplos de agentes de IA por área', 'Exemplos de agentes por área')
      ],
      status: { label: 'No ar', tone: 'live' },
      context: 'Instituto Brain, squad de IA (antiga NextIA)',
      problem: 'Empresas não enxergam o que um agente de IA faria na operação delas.',
      summary: 'Landing page da oferta de agentes de IA do Grupo Algar, com exemplos por área e a Clara, agente que conversa com os visitantes e qualifica os leads.',
      role: 'Front-end da landing page do zero, adaptação para a identidade da Algar e construção do backend da Clara.',
      highlights: [
        'Página em HTML, CSS e JavaScript puro, organizada em camadas de CSS e módulos de JS',
        'Exemplos de agentes por área: financeiro, vendas, RH e logística',
        'Clara: grafo em LangGraph que extrai os dados da conversa, avança as etapas e responde',
        'API em FastAPI com os leads gravados em PostgreSQL, deploy contínuo na Vercel'
      ],
      stack: ['HTML', 'CSS', 'JavaScript', 'Python', 'FastAPI', 'LangGraph', 'PostgreSQL', 'Vercel'],
      links: [{ label: 'Ver site', url: 'https://inter-agente.vercel.app' }]
    },
    {
      id: 'matriz-fabrica-agentes',
      group: 'estagio',
      name: 'Matriz de decisão da fábrica de agentes',
      kind: 'IA / Pesquisa e decisão técnica',
      categories: ['ia', 'dados', 'negocios'],
      size: 'md',
      accent: '#3A2EE8',
      visual: 'matrix',
      status: { label: 'Entregue', tone: 'live' },
      context: 'Instituto Brain, squad de IA',
      problem: 'O instituto precisava escolher as tecnologias da sua fábrica interna de agentes de IA com critério, e não por preferência.',
      summary: 'Pesquisa de campo e matriz comparando tecnologias nos quatro pilares da fábrica de agentes, com custos, prós, contras e notas.',
      role: 'Pesquisa das tecnologias e dos preços, definição de critérios e montagem da matriz.',
      highlights: [
        'Quatro pilares: Segurança e Governança, Clientes e Solicitações, Arquitetura e Mensageria, Agentes e Catálogos',
        'Custos levantados nas páginas oficiais de preço de cada ferramenta',
        'Material de apoio para explicar as decisões de arquitetura em reunião'
      ],
      stack: ['Pesquisa de mercado', 'Excel', 'Arquitetura de agentes'],
      links: []
    },
    {
      id: 'poc-hidrometros',
      group: 'estagio',
      name: 'Business case de hidrômetros inteligentes',
      kind: 'Inovação / Saneamento',
      categories: ['negocios', 'dados'],
      size: 'md',
      accent: '#0E9F88',
      visual: 'tam',
      status: { label: 'Entregue', tone: 'live' },
      context: 'Instituto Brain, squad de Utilities (participação)',
      problem: 'Avaliar se uma POC de medidores inteligentes de água fazia sentido como negócio antes de investir nela.',
      summary: 'Participação no business case de uma POC de hidrômetros inteligentes apresentado à liderança.',
      role: 'Pesquisa de mercado, cálculo de TAM, SAM e SOM, apoio ao business case, apresentação executiva e cronograma.',
      highlights: [
        'Dimensionamento de mercado em TAM, SAM e SOM',
        'Apoio na construção do business case',
        'Apresentação executiva e cronograma da POC'
      ],
      stack: ['Pesquisa de mercado', 'TAM/SAM/SOM', 'Apresentação executiva'],
      disclaimer: 'Trabalho de equipe. Os números do business case não são exibidos.',
      links: []
    },
    {
      id: 'homologacao-api',
      group: 'estagio',
      name: 'Homologação de API',
      kind: 'Qualidade de software / APIs',
      categories: ['dev'],
      size: 'md',
      accent: '#7C5CFF',
      visual: 'api-tests',
      status: { label: 'Entregue', tone: 'live' },
      context: 'Instituto Brain, apoio a outra squad',
      problem: 'Uma API precisava ser validada antes de seguir adiante, cobrindo também o que acontece quando algo dá errado.',
      summary: 'Testes da API em vários cenários, de sucesso e de erro, documentando o comportamento esperado e o obtido.',
      role: 'Execução dos testes e redação do documento de homologação.',
      highlights: [
        'Cenários positivos e negativos para cada operação',
        'Registro do comportamento da API em cada caso',
        'Documento de testes entregue à squad responsável'
      ],
      stack: ['APIs REST', 'Testes de software', 'Documentação'],
      links: []
    },
    {
      id: 'melhorias-processo-agentes',
      group: 'estagio',
      name: 'Melhorias no processo de criação de agentes',
      kind: 'IA / Processos',
      categories: ['ia', 'negocios'],
      size: 'md',
      accent: '#E8A317',
      visual: 'pipeline',
      status: { label: 'Entregue', tone: 'live' },
      context: 'Instituto Brain, parceria com a Starya AI',
      problem: 'A entrega de agentes de IA para clientes tinha gargalos que se repetiam de um projeto para outro.',
      summary: 'Documento com sugestões de melhoria para o ciclo de criação de agentes, do onboarding ao go live.',
      role: 'Mapeamento do ciclo, identificação dos gargalos e redação das sugestões.',
      highlights: [
        'Ciclo completo mapeado: onboarding, desenvolvimento, go live e acompanhamento',
        'Gargalos recorrentes identificados a partir dos projetos acompanhados',
        'Boas práticas e lições aprendidas para os próximos ciclos'
      ],
      stack: ['Mapeamento de processos', 'Agentes de IA'],
      links: []
    },
    {
      id: 'acompanhamento-agentes',
      group: 'estagio',
      name: 'Acompanhamento de projetos de agentes',
      kind: 'IA / Gestão de projetos',
      categories: ['ia', 'dados'],
      size: 'md',
      accent: '#3A2EE8',
      visual: 'tracker',
      status: { label: 'Contínuo', tone: 'progress' },
      context: 'Instituto Brain, parceria com a Starya AI',
      problem: 'A evolução de cada agente ficava espalhada entre reuniões, relatórios do parceiro e atas.',
      summary: 'Acompanhamento contínuo das reuniões e atas dos projetos de agentes, consolidado para a liderança.',
      role: 'Participação nas reuniões, follow-up das ações e consolidação do status de cada projeto.',
      highlights: [
        'Status por agente e por fase, do onboarding ao refinamento',
        'Pendências com responsável e prazo, vindas das atas',
        'Painel e planilhas criados para organizar o acompanhamento'
      ],
      stack: ['Gestão de projetos', 'HTML/JS', 'Excel'],
      disclaimer: 'A representação usa nomes e dados fictícios.',
      links: []
    },

    {
      id: 'cortex',
      featured: true,
      group: 'faculdade',
      name: 'Cortex',
      kind: 'TCC / IA em saúde',
      categories: ['ia', 'dados', 'dev'],
      size: 'xl',
      accent: '#3A2EE8',
      visual: 'network',
      cover: img('cortex-home', 'Tela inicial do Cortex com pacientes que precisam de atenção e exames processados na semana'),
      gallery: [
        img('cortex-home', 'Tela inicial com alertas e exames da semana', 'Início'),
        img('cortex-detail', 'Perfil do paciente com padrão compatível e hipóteses da IA', 'Perfil do paciente'),
        img('cortex-correlations', 'Mapa de correlações entre marcadores', 'Mapa de correlações'),
        img('cortex-clusters', 'Clusters de pacientes com padrões em comum', 'Clusters'),
        img('cortex-upload', 'Envio de exames para nova análise', 'Nova análise'),
        img('cortex-login', 'Tela de login', 'Login')
      ],
      status: { label: 'TCC em andamento', tone: 'progress' },
      context: 'Trabalho de conclusão de curso, FIAP',
      problem: 'Doenças raras levam anos para serem diagnosticadas porque os exames são lidos marcador por marcador, sem cruzar padrões.',
      summary: 'Plataforma que correlaciona múltiplos marcadores de exames laboratoriais para apoiar médicos na investigação de doenças raras.',
      role: 'Idealização, pesquisa de mercado e de campo, modelo de negócio e protótipo navegável.',
      highlights: [
        'Protótipo navegável com início, pacientes, nova análise, relatórios, glossário clínico e configurações',
        'Hipóteses da IA com probabilidade, gêmeos clínicos e sugestão de encaminhamento por especialidade',
        'Rede de correlação entre marcadores em vez de leitura isolada de cada resultado',
        'Pesquisa de campo com 31 profissionais de saúde',
        'Documento em normas ABNT, Business Model Canvas, SWOT e modelo B2B para clínicas'
      ],
      stack: ['HTML', 'CSS', 'JavaScript', 'LLMs (proposta)', 'Pesquisa de mercado'],
      disclaimer: 'Ferramenta de apoio à decisão médica em fase de protótipo. Não realiza diagnóstico.',
      links: []
    },
    {
      id: 'one-hub',
      featured: true,
      group: 'faculdade',
      name: 'Claro One Hub',
      kind: 'Empresa parceira / Atendimento omnichannel',
      categories: ['dev', 'ia'],
      size: 'lg',
      accent: '#E5484D',
      visual: 'omni',
      cover: img('onehub-home', 'Visão geral do portal One Hub com fatura em aberto e central de atendimento'),
      gallery: [
        img('onehub-login', 'Tela de login do One Hub', 'Login'),
        img('onehub-mfa', 'Verificação em duas etapas', 'Verificação em duas etapas'),
        img('onehub-home', 'Visão geral do cliente', 'Visão geral do cliente'),
        img('onehub-console', 'Console do atendente com fila de tickets e conversa', 'Console do atendente')
      ],
      status: { label: 'Top 10 do Challenge', tone: 'academic' },
      context: 'Challenge Claro 2026, FIAP, grupo de 5 pessoas',
      problem: 'Clientes repetem o mesmo problema a cada troca de canal entre app, site e WhatsApp.',
      summary: 'Portal do cliente e console de atendimento que mantêm o contexto entre canais, com a assistente virtual Clara.',
      role: 'Desenvolvimento do front-end, testes de integração via APIs (simuladas no protótipo) e definição da proposta final.',
      highlights: [
        'Sessão vinculada ao cliente, e não ao canal, para preservar o histórico',
        'Assistente com Dialogflow e transferência para atendente humano',
        'Sprint final: verificação em duas etapas, aba de incidentes, número de protocolo e console de tickets',
        'Grupo entre os 10 finalistas, com apresentação para a Claro'
      ],
      stack: ['HTML', 'CSS', 'JavaScript', 'Dialogflow', 'APIs REST'],
      links: [{ label: 'Ver vídeo da solução', url: 'https://youtu.be/UjER0JZRl3s' }]
    },
    {
      id: 'kotlin-eventos',
      group: 'faculdade',
      name: 'Eventos Extremos',
      kind: 'Android / Kotlin',
      categories: ['dev'],
      size: 'md',
      accent: '#E5484D',
      visual: 'android',
      cover: img('kotlin-eventos-addevento', 'Formulário de eventos com a lista de eventos cadastrados'),
      fit: 'phone',
      gallery: [
        img('kotlin-eventos-addevento', 'Formulário e lista de eventos', 'Cadastro e lista'),
        img('kotlin-eventos-excluindoeventos', 'Lista com exclusão de eventos', 'Exclusão de itens'),
        img('kotlin-eventos-exibiralerta', 'Campos destacados com erro de validação', 'Validação dos campos')
      ],
      status: { label: 'Concluído', tone: 'academic' },
      context: 'Global Solution, FIAP, em dupla',
      problem: 'Registrar eventos climáticos extremos e o impacto deles em cada local.',
      summary: 'App para cadastrar eventos com local, tipo, grau de impacto, data e pessoas afetadas.',
      role: 'Desenvolvimento do app em dupla.',
      highlights: [
        'Formulário com seleção do grau de impacto',
        'Lista com RecyclerView e exclusão de itens',
        'Validação que destaca os campos incorretos'
      ],
      stack: ['Kotlin', 'Android', 'RecyclerView'],
      links: []
    },
    {
      id: 'inovaeuro',
      featured: true,
      group: 'faculdade',
      name: 'InovaEuro',
      kind: 'Empresa parceira / App Flutter',
      categories: ['dev', 'negocios'],
      size: 'md',
      accent: '#7C5CFF',
      visual: 'ideas',
      cover: img('eurofarma-capa', 'Capa do relatório final do InovaEuro, Challenge Eurofarma e FIAP'),
      fit: 'contain',
      status: { label: 'Concluído', tone: 'academic' },
      context: 'Challenge Eurofarma 2025, FIAP, grupo de 5 pessoas',
      problem: 'Colaboradores deixam de propor ideias por medo de rejeição e por falta de um canal oficial.',
      summary: 'App mobile e web para colaboradores enviarem ideias, gestores avaliarem e o engajamento virar pontos e recompensas.',
      role: 'Desenvolvimento full stack do MVP em Flutter, junto com outro desenvolvedor.',
      highlights: [
        'Perfis de empreendedor (colaborador) e executivo (gestor), com código exclusivo para gestores',
        'Envio de ideias com setor, descrição e prazo; aprovação ou recusa pelo painel executivo',
        'Chat entre colaborador e gestor e gamificação com pontos e benefícios',
        'Relatório final com custos, cronograma por sprint, arquitetura e casos de teste'
      ],
      stack: ['Flutter', 'Dart', 'SQLite', 'Lottie'],
      links: [{ label: 'Ver repositório', url: 'https://github.com/AmandaCornelsen/BlueFarma---InovaEuro' }]
    },
    {
      id: 'dw-economia-espacial',
      group: 'faculdade',
      name: 'Data warehouse de telemetria',
      kind: 'Dados / Modelagem dimensional',
      categories: ['dados'],
      size: 'md',
      accent: '#0E9F88',
      visual: 'sheet',
      cover: img('dw-modelo-estrela', 'Modelo estrela com a tabela fato de telemetria e quatro dimensões'),
      fit: 'contain',
      status: { label: 'Concluído', tone: 'academic' },
      context: 'Global Solution de Enterprise Analytics, FIAP, em trio',
      problem: 'Gerar relatórios gerenciais sobre ativos monitorados por satélite, reunindo dados de várias constelações.',
      summary: 'Modelo estrela para telemetria de satélites, com cálculo do espaço necessário para a carga inicial e para um ano de dados.',
      role: 'Modelagem dimensional e cálculo de volumetria em equipe.',
      highlights: [
        'Tabela fato de telemetria com dimensões de tempo, ativo, localização e operador',
        'Volumetria da carga inicial (cerca de 3,5 MB) e incremental (cerca de 250 MB por ano)'
      ],
      stack: ['Modelagem dimensional', 'SQL', 'Excel'],
      links: []
    },
    {
      id: 'sensor-re',
      group: 'faculdade',
      name: 'Auxílio à ré com ESP32',
      kind: 'IoT / Integração',
      categories: ['iot', 'dev'],
      size: 'md',
      accent: '#E8A317',
      visual: 'circuit',
      cover: img('iot-nodered', 'Fluxo no Node-RED recebendo as medições por MQTT'),
      gallery: [
        img('iot-nodered', 'Fluxo do Node-RED com MQTT, função e requisição HTTP', 'Fluxo no Node-RED'),
        img('iot-function', 'Função que monta o JSON enviado para a API', 'Função que monta o JSON')
      ],
      status: { label: 'Concluído', tone: 'academic' },
      context: 'Checkpoint de IoT, FIAP, em trio',
      problem: 'Simular um sensor de estacionamento que registre cada medição para consulta depois.',
      summary: 'O sensor mede a distância, o ESP32 publica via MQTT e o Node-RED envia cada leitura para uma API que grava em JSON.',
      role: 'Desenvolvimento em equipe da simulação, do fluxo e da API.',
      highlights: [
        'Fluxo HC-SR04 → ESP32 → MQTT → Node-RED → API Flask → JSON',
        'Alerta de proximidade enviado junto com a distância',
        'API com rotas para gravar e consultar as leituras, com data e hora'
      ],
      stack: ['ESP32', 'MQTT', 'Node-RED', 'Python', 'Flask', 'Wokwi'],
      links: [{ label: 'Ver simulação', url: 'https://wokwi.com/projects/475905922847532033' }]
    },
    {
      id: 'monitor-estoque',
      group: 'faculdade',
      name: 'Monitor de estoque em prateleiras',
      kind: 'IoT / Arduino',
      categories: ['iot'],
      size: 'md',
      accent: '#10B981',
      cover: img('estoque-led-ligado', 'Simulação no Wokwi com dois sensores ultrassônicos, LEDs acesos e o monitor serial indicando estoque baixo'),
      gallery: [
        img('estoque-led-desligado', 'Simulação com os LEDs apagados', 'Estoque normal'),
        img('estoque-led-ligado', 'Simulação com os LEDs acesos e alerta de estoque baixo', 'Alerta de estoque baixo')
      ],
      status: { label: 'Concluído', tone: 'academic' },
      context: 'Atividade de Cognitive Computing, Computer Vision e IoT, FIAP, em trio',
      problem: 'Saber quando uma prateleira está ficando vazia sem precisar conferir manualmente.',
      summary: 'Dois sensores ultrassônicos medem a distância até os produtos e um LED acende quando o estoque da prateleira está baixo.',
      role: 'Desenvolvimento em equipe do circuito e do código.',
      highlights: [
        'Um sensor HC-SR04 e um LED para cada prateleira',
        'Três níveis de estoque pela distância medida: alto, médio e baixo',
        'LED de alerta e mensagens no monitor serial a cada leitura'
      ],
      stack: ['Arduino', 'C++', 'HC-SR04', 'Wokwi'],
      links: [{ label: 'Ver simulação', url: 'https://wokwi.com/projects/472736829962911745' }]
    },
    {
      id: 'seashield',
      group: 'faculdade',
      name: 'SeaShield Technology',
      kind: 'Dados / Proposta de solução',
      categories: ['dados', 'negocios'],
      size: 'half',
      accent: '#3A2EE8',
      visual: 'anomaly',
      cover: img('seashield-trafego', 'Protótipo de controle de tráfego marinho com mapa de áreas sensíveis'),
      gallery: [
        img('seashield-trafego', 'Protótipo de controle de tráfego marinho', 'Controle de tráfego marinho'),
        img('seashield-rastreio', 'Protótipo de rastreabilidade dos plásticos', 'Rastreabilidade dos plásticos')
      ],
      status: { label: 'Concluído', tone: 'academic' },
      context: 'Global Solution, FIAP, em trio',
      problem: 'Plásticos e poluentes chegam aos oceanos sem controle de origem nem do tráfego em áreas sensíveis.',
      summary: 'Proposta de monitoramento marinho com big data e satélites: controle do tráfego de embarcações e rastreabilidade dos plásticos.',
      role: 'Concepção da proposta, protótipos e apresentação em equipe.',
      highlights: [
        'Controle do tráfego de navios em regiões sensíveis',
        'Código de rastreabilidade para acompanhar o plástico até a logística reversa',
        'Público-alvo, recursos necessários e estimativa de custo do projeto'
      ],
      stack: ['Big data (proposta)', 'Prototipação', 'Modelo de negócio'],
      links: []
    },
    {
      id: 'fiat',
      group: 'faculdade',
      name: 'Análise de mercado da FIAT',
      kind: 'Dados / Análise e projeção',
      categories: ['dados', 'negocios'],
      size: 'half',
      accent: '#E5484D',
      visual: 'training',
      cover: img('fiat-sustentabilidade', 'Slide com gráficos de emissão de óxidos de nitrogênio e de CO2 com regressão polinomial'),
      gallery: [
        img('fiat-sustentabilidade', 'Emissões na Europa com regressão polinomial', 'Sustentabilidade (minha parte)'),
        img('fiat-vendas-eua', 'Vendas nos Estados Unidos com quatro modelos de regressão', 'Vendas nos Estados Unidos')
      ],
      status: { label: 'Concluído', tone: 'academic' },
      context: 'Projeto de análise de dados, FIAP, grupo de 6 pessoas',
      problem: 'Entender o desempenho da marca nos Estados Unidos, na Europa e na China e projetar os próximos anos.',
      summary: 'Análise de vendas, tecnologia, sustentabilidade e comércio da FIAT, com regressões para projetar vendas e emissões.',
      role: 'Responsável pela análise de sustentabilidade: emissões de óxidos de nitrogênio e de CO2 na Europa.',
      highlights: [
        'Comparação de regressões linear, exponencial, polinomial e logarítmica',
        'Escolha do modelo pelo R² para projetar vendas de 2022 e 2023',
        'Planejamento estratégico por frente: vendas, tecnologia, sustentabilidade e comércio'
      ],
      stack: ['Excel', 'Regressão', 'Análise de dados'],
      links: []
    },
    {
      id: 'cp05-pentest',
      group: 'faculdade',
      name: 'Pentest com duas flags',
      kind: 'Cibersegurança / Pentest',
      categories: ['seguranca'],
      size: 'half',
      accent: '#F43F5E',
      visual: 'terminal-ctf',
      cover: img('ciber-flag', 'Página de confirmação da primeira flag encontrada'),
      gallery: [
        img('ciber-hydra', 'Hydra encontrando a senha SSH do usuário do laboratório', 'Senha descoberta com Hydra'),
        img('ciber-flag', 'Primeira flag encontrada', 'Primeira flag'),
        img('ciber-burp', 'Requisição POST interceptada no Burp Suite', 'Segunda flag no Burp Suite')
      ],
      status: { label: 'Concluído', tone: 'academic' },
      context: 'Checkpoint 5 de Cibersegurança, FIAP, individual',
      problem: 'Encontrar duas flags em um servidor de laboratório isolado.',
      summary: 'Descobri a senha de um usuário, entrei no sistema interno e usei um túnel SSH para chegar à página de funcionários.',
      role: 'Execução e relatório individuais.',
      highlights: [
        'Senha descoberta com Hydra e lista de palavras',
        'Primeira flag ao entrar no sistema com as credenciais',
        'Túnel SSH para a página interna e segunda flag na requisição POST, vista no Burp Suite'
      ],
      stack: ['Kali Linux', 'Hydra', 'SSH', 'Burp Suite'],
      links: []
    },
    {
      id: 'spectra-ctf',
      featured: true,
      group: 'faculdade',
      name: 'SPECTRA CTF',
      kind: 'Cibersegurança / CTF',
      categories: ['seguranca'],
      size: 'half',
      accent: '#F43F5E',
      visual: 'terminal-ctf',
      cover: img('spectra-painel', 'Painel do SPECTRA CTF acessado pelo túnel SSH'),
      gallery: [
        img('spectra-hydra', 'Hydra encontrando a senha do usuário', 'Senha descoberta com Hydra'),
        img('spectra-chave', 'Acesso por chave SSH com permissão ajustada', 'Acesso por chave SSH'),
        img('spectra-painel', 'Painel interno do SPECTRA aberto pelo túnel', 'Painel interno pelo túnel'),
        img('spectra-burp', 'Flag encontrada no histórico HTTP do Burp Suite', 'Flag no Burp Suite')
      ],
      status: { label: 'Concluído', tone: 'academic' },
      context: 'Checkpoint 6 de Cibersegurança, FIAP, individual',
      problem: 'Chegar a um serviço interno que só responde dentro do servidor e encontrar a flag.',
      summary: 'Do reconhecimento da página até a flag: senha com Hydra, acesso por chave SSH, túnel e análise da requisição no Burp Suite.',
      role: 'Execução e relatório individuais.',
      highlights: [
        'Usuário descoberto inspecionando a página e senha quebrada com Hydra',
        'Portas abertas com ss, chave root copiada para o Kali e permissão ajustada para 600',
        'Túnel SSH para o serviço interno e flag no histórico HTTP do Burp Suite'
      ],
      stack: ['Kali Linux', 'Hydra', 'SSH', 'Burp Suite', 'FoxyProxy'],
      links: []
    },
    {
      id: 'tunel-ssh',
      group: 'faculdade',
      name: 'Produção e desenvolvimento com túnel SSH',
      kind: 'Cibersegurança / Infraestrutura',
      categories: ['seguranca'],
      size: 'half',
      accent: '#F43F5E',
      status: { label: 'Concluído', tone: 'academic' },
      context: 'Projeto de Cibersegurança, FIAP',
      problem: 'Um site em desenvolvimento não deve ficar exposto como o de produção.',
      summary: 'Dois sites no mesmo servidor: o de produção aberto e o de desenvolvimento acessível só por túnel SSH.',
      role: 'Configuração das máquinas, dos sites e do túnel, com vídeo e relatório.',
      highlights: [
        'Servidor Debian e cliente Kali Linux em máquinas virtuais',
        'Site de desenvolvimento escutando só dentro do servidor',
        'Com o túnel ligado o site abre; com o túnel desligado, ele para de responder'
      ],
      stack: ['Linux', 'Debian', 'Kali Linux', 'SSH'],
      links: []
    },
    {
      id: 'cybersleuth',
      group: 'faculdade',
      name: 'Operação CyberSleuth',
      kind: 'Cibersegurança / Prova prática',
      categories: ['seguranca'],
      size: 'half',
      accent: '#F43F5E',
      status: { label: 'Concluído', tone: 'academic' },
      context: 'Prova prática de pentest, FIAP, individual',
      problem: 'Investigar uma empresa fictícia e achar duas flags sem sair do escopo autorizado.',
      summary: 'Enumeração, acesso e exploração em duas máquinas virtuais isoladas, documentados em relatório técnico.',
      role: 'Execução e relatório individuais.',
      highlights: [
        'Rede interna isolada entre a máquina atacante e o alvo',
        'Enumeração do servidor web e pistas no código das páginas',
        'Teste de credenciais com Hydra e túnel SSH para o serviço interno'
      ],
      stack: ['Kali Linux', 'VirtualBox', 'Hydra', 'SSH'],
      links: []
    },
    {
      id: 'natura',
      group: 'faculdade',
      name: 'App para consultoras Natura',
      kind: 'Empresa parceira / Desktop em Java',
      categories: ['dev', 'dados'],
      size: 'half',
      accent: '#E8A317',
      visual: 'partner',
      status: { label: 'Concluído', tone: 'academic' },
      context: 'Challenge Natura, FIAP, grupo de 5 pessoas',
      problem: 'Consultoras precisavam vender e entender quem são seus clientes no mesmo lugar.',
      summary: 'Aplicação desktop com catálogo, carrinho e um dashboard com o perfil dos clientes da consultora.',
      role: 'Desenvolvimento das telas e da navegação em Java.',
      highlights: [
        'Login, cadastro, catálogo de produtos e página de detalhes',
        'Carrinho com pagamento por Pix, cartão ou boleto',
        'Dashboard com faixa etária, gênero, interesses e localidade dos clientes'
      ],
      stack: ['Java', 'Swing', 'JGoodies'],
      links: [{ label: 'Ver vídeo', url: 'https://youtu.be/Pdqf8Jq4AW0' }]
    },
    {
      id: 'astrorecruit',
      group: 'faculdade',
      name: 'AstroRecruit',
      kind: 'iOS / Swift',
      categories: ['dev'],
      size: 'half',
      accent: '#3A2EE8',
      visual: 'mobile',
      status: { label: 'Concluído', tone: 'academic' },
      context: 'Global Solution de iOS, FIAP, em trio',
      problem: 'O recrutamento de astronautas ainda é feito com fichas e planilhas, sem critério padronizado.',
      summary: 'App iOS para cadastrar candidatos, calcular a nota média e classificar cada um automaticamente.',
      role: 'Desenvolvimento em equipe das telas e da lógica em Swift.',
      highlights: [
        'Arquitetura MVC com a regra de classificação no Model',
        'Aprovado, pendente ou reprovado conforme a nota média',
        'Validação dos campos e classe única para os alertas'
      ],
      stack: ['Swift', 'UIKit', 'MVC'],
      links: []
    },
    {
      id: 'kotlin-imc',
      group: 'faculdade',
      name: 'App de IMC em Compose',
      kind: 'Android / Kotlin',
      categories: ['dev'],
      size: 'half',
      accent: '#7C5CFF',
      visual: 'imc',
      status: { label: 'Concluído', tone: 'academic' },
      context: 'Global Solution 2, FIAP, em dupla',
      problem: 'Praticar navegação entre telas e validação com a interface declarativa do Android.',
      summary: 'App com login, menu, cálculo do IMC com classificação e tela da equipe.',
      role: 'Desenvolvimento do app em dupla.',
      highlights: [
        'Interface em Jetpack Compose com Material 3',
        'Navegação entre telas com Navigation Compose',
        'Classificação do IMC em seis faixas e mensagens de erro nos campos'
      ],
      stack: ['Kotlin', 'Jetpack Compose', 'Material 3'],
      links: [{ label: 'Ver repositório', url: 'https://github.com/AmandaCornelsen/GS2-Kotlin' }]
    },
    {
      id: 'kotlin-cripto',
      group: 'faculdade',
      name: 'Monitor de criptomoedas',
      kind: 'Android / Kotlin',
      categories: ['dev'],
      size: 'half',
      accent: '#E8A317',
      visual: 'crypto',
      status: { label: 'Concluído', tone: 'academic' },
      context: 'Checkpoint de Android, FIAP',
      problem: 'Consultar a cotação do Bitcoin em tempo real sem travar a interface.',
      summary: 'App que consome a API do Mercado Bitcoin e mostra o último valor negociado e a hora da atualização.',
      role: 'Desenvolvimento individual.',
      highlights: [
        'Chamadas à API com Retrofit e conversão do JSON com Gson',
        'Coroutines para buscar os dados fora da thread principal',
        'Botão de atualização e tratamento de erros de conexão'
      ],
      stack: ['Kotlin', 'Retrofit', 'Coroutines', 'API REST'],
      links: [{ label: 'Ver repositório', url: 'https://github.com/AmandaCornelsen/CP2_Cripto_Android' }]
    },

    {
      id: 'numero-secreto',
      group: 'pessoal',
      name: 'Jogo do número secreto',
      kind: 'Front-end / JavaScript',
      categories: ['dev'],
      size: 'half',
      accent: '#3A2EE8',
      visual: 'devices',
      cover: img('numero-secreto', 'Tela do jogo do número secreto'),
      status: { label: 'Concluído', tone: 'live' },
      context: 'Projeto pessoal',
      problem: 'Praticar lógica de programação e manipulação do DOM.',
      summary: 'Jogo em que a pessoa tenta adivinhar um número sorteado de 1 a 10, com dicas de maior e menor.',
      role: 'Desenvolvimento individual.',
      highlights: [
        'Sorteio sem repetir números até esgotar a faixa',
        'Contagem de tentativas e botão para novo jogo'
      ],
      stack: ['HTML', 'CSS', 'JavaScript'],
      links: [{ label: 'Ver repositório', url: 'https://github.com/AmandaCornelsen/SecretNumberGame' }]
    },
    {
      id: 'mario-interface',
      featured: true,
      group: 'pessoal',
      name: 'Página inspirada em Mario Bros',
      kind: 'Front-end / Interface',
      categories: ['dev'],
      size: 'half',
      accent: '#E5484D',
      visual: 'platformer',
      cover: img('mario-home', 'Página inicial do projeto Mario Bros'),
      status: { label: 'No ar', tone: 'live' },
      context: 'Projeto pessoal',
      problem: 'Praticar layout responsivo e interação com JavaScript.',
      summary: 'Página temática com trailer em vídeo, layout responsivo e interações em JavaScript.',
      role: 'Desenvolvimento individual.',
      highlights: [
        'Layout responsivo com CSS separado por arquivos',
        'Interações com JavaScript'
      ],
      stack: ['HTML', 'CSS', 'JavaScript'],
      links: [
        { label: 'Ver site', url: 'https://amandacornelsen.github.io/Project-Mario-Bros/' },
        { label: 'Ver repositório', url: 'https://github.com/AmandaCornelsen/Project-Mario-Bros' }
      ]
    }
  ];

  Portfolio.experience = [
    { title: 'Squad de IA', text: 'Desenvolvo a landing page da Interagente, acompanho projetos de agentes de IA com um parceiro e apoiei a definição de tecnologias da fábrica interna de agentes.' },
    { title: 'Squad de Utilities', text: 'Participei do business case da POC de hidrômetros inteligentes para o setor de saneamento.' },
    { title: 'Squad de Saúde', text: 'Acompanhei projetos de soluções B2B para o setor de saúde.' },
    { title: 'Novos negócios', text: 'Organizo reuniões com parceiros, apresentações executivas e o fluxo ágil das squads no Jira e no Miro.' }
  ];

  Portfolio.skillLevels = [
    { id: 3, label: 'Uso no dia a dia' },
    { id: 2, label: 'Aplicado em projetos' },
    { id: 1, label: 'Fundamentos' }
  ];

  Portfolio.skills = [
    { group: 'Front-end', items: [['HTML5', 3], ['CSS3', 3], ['JavaScript', 3], ['Figma', 3], ['Swift / UIKit', 2], ['Flutter', 2]] },
    { group: 'Back-end e mobile', items: [['Java', 2], ['Python', 2], ['APIs REST', 2], ['Kotlin', 2], ['FastAPI', 1], ['Spring Boot', 1]] },
    { group: 'Banco de dados', items: [['SQL', 2], ['Oracle Database', 2], ['PostgreSQL', 1], ['SQLite', 1], ['Modelagem dimensional', 2]] },
    { group: 'Inteligência Artificial', items: [['Engenharia de prompt', 3], ['Agentes de IA', 2], ['LangGraph', 1], ['Dialogflow', 2], ['Redes neurais (CNN)', 1]] },
    { group: 'Ferramentas e infraestrutura', items: [['Git e GitHub', 3], ['Jira e Miro', 3], ['Linux', 2], ['Vercel', 2], ['AWS (EC2, RDS, S3)', 1], ['Segurança da informação', 1]] }
  ];
})(window.Portfolio);
