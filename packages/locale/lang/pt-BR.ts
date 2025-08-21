export default {
  vxe: {
    base: {
      pleaseInput: 'Por favor, digite',
      pleaseSelect: 'Selecione',
      comma: '，',
      fullStop: '。'
    },
    loading: {
      text: 'carregando...'
    },
    error: {
      downErr: 'Download falhou',
      errLargeData: 'Quando a quantidade de dados vinculados for muito grande, use {0}, caso contrário, pode causar atraso',
      groupFixed: 'Se estiver usando cabeçalhos agrupados, a coluna congelada deve ser definida pelo grupo',
      groupMouseRange: 'O cabeçalho de agrupamento não pode ser usado ao mesmo tempo que "{0}" e isso pode causar um erro',
      groupTag: 'Os cabeçalhos da coluna de agrupamento devem usar "{0}" em vez de "{1}", o que pode causar erros',
      scrollErrProp: 'Este parâmetro "{0}" não é suportado após a rolagem virtual ser ativada',
      errConflicts: 'Parâmetro "{0}" conflita com "{1}"',
      modelConflicts: '绑定的字段值 "{0}" 与 "{1}" 存在冲突，将会出现错误',
      reqSupportProp: '当使用 "{0}" 时，应该设置 "{1}"，否则可能会出现错误',
      notSupportProp: '"{1}" não é suportado quando o parâmetro "{0}" estiver ativado, ele deve ser "{2}", caso contrário, um erro ocorrerá',
      notConflictProp: 'Ao usar "{0}", "{1}" deve ser definido, caso contrário, pode haver conflitos funcionais',
      unableInsert: 'Não pode ser inserido no local especificado, verifique se os parâmetros estão corretos',
      useErr: 'Ocorreu um erro ao instalar o módulo "{0}". O pedido pode estar incorreto. O módulo dependente precisa ser instalado antes da tabela',
      barUnableLink: 'A barra de ferramentas não pode associar tabelas',
      expandContent: 'O slot para a linha expandida deve ser "conteúdo", verifique se está correto',
      reqComp: 'O componente "{0}" está ausente, verifique se está instalado corretamente. https://vxeui.com/#/start/useglobal',
      reqModule: 'Módulo "{0}" ausente',
      reqProp: 'O parâmetro "{0}" necessário está faltando, o que pode causar um erro',
      emptyProp: 'Parâmetro "{0}" não tem permissão para estar vazio',
      errProp: 'Parâmetro não suportado "{0}", possivelmente "{1}"',
      colRepet: 'coluna. {0} = "{1}" é repetida, o que pode causar algumas funções inutilizáveis',
      notFunc: 'Método "{0}" não existe',
      errFunc: 'Parâmetro "{0}" não é um método',
      notValidators: 'Verificação global "{0}" não existe',
      notFormats: 'Formatação global "{0}" não existe',
      notCommands: 'A diretiva global "{0}" não existe',
      notSlot: 'Slot "{0}" não existe',
      noTree: '"{0}" não é suportado na estrutura da árvore',
      noGroup: '数据分组后不支持 "{0}"',
      notProp: 'Parâmetro não suportado "{0}"',
      checkProp: 'Quando o volume de dados é muito grande, a caixa de seleção pode ser gaguejada. Recomenda -se definir o parâmetro "{0}" para melhorar a velocidade de renderização',
      coverProp: 'O parâmetro "{1}" de "{0}" é definido repetidamente, o que pode causar um erro',
      uniField: 'O nome do campo "{0}" é definido repetidamente, o que pode causar um erro',
      repeatKey: 'Repita a chave primária {0} = "{1}", que pode causar um erro',
      repeatProp: '参数重复 {0}="{1}"，这可能会出现错误',
      delFunc: 'Método "{0}" está depreciado, use "{1}"',
      delProp: 'O parâmetro "{0}" está depreciado, use "{1}"',
      delEvent: 'Evento "{0}" está descontinuado, use "{1}"',
      removeProp: 'O parâmetro "{0}" está preguiçoso e não é recomendado, o que pode causar um erro',
      errFormat: 'O conteúdo formatado global deve ser definido usando "vxetable.formats" e o método de montagem "formatter = {0}" não é mais recomendado.',
      notType: 'Tipo de arquivo não suportado "{0}"',
      notExp: 'Este navegador não suporta função de importação/exportação',
      impFields: 'A importação falhou. Verifique se o nome do campo e o formato de dados estão corretos.',
      treeNotImp: 'As mesas de árvores não suportam a importação',
      treeCrossDrag: 'Apenas arraste o primeiro nível',
      treeDragChild: 'Os pais não podem arrastar para seus próprios filhos',
      reqPlugin: '"{1}" não está instalado em https://vxeui.com/other {0a }/# {1age/install',
      errMaxRow: 'Excedendo o volume máximo de dados suportado {0} linhas, isso pode causar um erro',
      useNew: '不建议使用 {0}，请使用 {1}',
      errorVersion: '版本不匹配，当前版本 {0}，最低支持版本为 {1}'
    },
    table: {
      emptyText: 'Ainda não há dados',
      allTitle: 'Selecione tudo/Cancelar',
      seqTitle: 'Número de série',
      actionTitle: 'operar',
      confirmFilter: 'filtro',
      resetFilter: 'Reiniciar',
      allFilter: 'todos',
      sortAsc: 'Ordem ascendente: mais baixo para o mais alto',
      sortDesc: 'Ordem descendente: mais alto ao menor',
      filter: 'Ativar filtragem para colunas selecionadas',
      impSuccess: 'Records {0} importados com sucesso',
      expLoading: 'Exportador',
      expSuccess: 'Exportar com sucesso',
      expError: 'A exportação falhou',
      expFilename: 'Export_ {0}',
      expOriginFilename: 'Export_source_ {0}',
      customTitle: 'Configurações da coluna',
      customAll: 'todos',
      customConfirm: 'confirmar',
      customClose: 'encerramento',
      customCancel: 'Cancelar',
      customRestore: 'Restaure o padrão',
      maxFixedCol: 'O número máximo de colunas congeladas não pode exceder {0}',
      maxGroupCol: '最大分组字段的数量不能超过 {0} 个',
      dragTip: 'Move: {0}',
      resizeColTip: 'Largura: {0} pixels',
      resizeRowTip: 'Altura: {0} pixels',
      rowGroupContentTotal: '{0} ({1})'
    },
    grid: {
      selectOneRecord: 'Selecione pelo menos um registro!',
      deleteSelectRecord: 'Tem certeza de que deseja excluir o registro selecionado?',
      removeSelectRecord: 'Tem certeza de que deseja remover o registro selecionado?',
      dataUnchanged: 'Dados não alterados!',
      delSuccess: 'O registro selecionado foi excluído com sucesso!',
      saveSuccess: 'Economize com sucesso!',
      operError: 'Ocorreu um erro e a operação falhou!'
    },
    select: {
      clear: '清除',
      allChecked: '全选',
      total: '{0} / {1}',
      search: 'procurar',
      loadingText: 'carregando',
      emptyText: 'Ainda não há dados',
      maxOpt: '最大可选择的数量不能超过 {0} 个',
      overSizeErr: '已超出最大可选数量 {0} 个，超出部分将被忽略！',
      searchEmpty: '未匹配到数据！'
    },
    tree: {
      searchEmpty: '未匹配到数据！'
    },
    treeSelect: {
      clearChecked: '清除',
      allChecked: '全选',
      allExpand: '全部展开',
      clearExpand: '全部收起',
      total: '已选 {0}',
      search: '搜索',
      emptyText: '暂无数据'
    },
    pager: {
      goto: 'Ir',
      gotoTitle: 'Número de páginas',
      pagesize: '{0} itens/página',
      total: 'Total {0} registros',
      pageClassifier: 'Página',
      homePage: 'primeira página',
      homePageTitle: 'primeira página',
      prevPage: 'Página anterior',
      prevPageTitle: 'Página anterior',
      nextPage: 'Próxima página',
      nextPageTitle: 'Próxima página',
      prevJump: 'Página de salto',
      prevJumpTitle: 'Página de salto',
      nextJump: 'Página para baixo',
      nextJumpTitle: 'Página para baixo',
      endPage: 'Última página',
      endPageTitle: 'Última página'
    },
    alert: {
      title: 'Prompts do sistema'
    },
    button: {
      confirm: 'confirmar',
      cancel: 'Cancelar',
      clear: 'Claro'
    },
    filter: {
      search: 'procurar'
    },
    custom: {
      cstmTitle: 'Configurações da coluna',
      cstmRestore: 'Restaure o padrão',
      cstmCancel: 'Cancelar',
      cstmConfirm: 'Claro',
      cstmConfirmRestore: 'Confirme se é restaurado na configuração padrão da coluna?',
      cstmDragTarget: 'Move: {0}',
      setting: {
        colSort: 'Organizar',
        sortHelpTip: '点击并拖动图标可以调整顺序',
        colTitle: 'Título da coluna',
        colResizable: 'Largura da coluna (pixels)',
        colVisible: 'Se deve exibir',
        colFixed: 'Coluna de congelamento',
        colFixedMax: 'Colunas congeladas (até {0} colunas)',
        fixedLeft: 'Lado esquerdo',
        fixedUnset: 'Não definido',
        fixedRight: 'Lado direito'
      }
    },
    import: {
      modes: {
        covering: 'Substituir o método (substitua diretamente os dados da tabela)',
        insert: 'Anexe na parte inferior (anexa novos dados na parte inferior da tabela)',
        insertTop: 'Anexe no topo (anexar novos dados na parte superior da tabela)',
        insertBottom: 'Anexe na parte inferior (anexa novos dados na parte inferior da tabela)'
      },
      impTitle: 'Importação de dados',
      impFile: 'Nome do arquivo',
      impSelect: 'Selecione Arquivo',
      impType: 'Tipo de arquivo',
      impOpts: 'Configurações de parâmetros',
      impMode: 'Modo de importação',
      impConfirm: 'Importar',
      impCancel: 'Cancelar'
    },
    export: {
      types: {
        csv: 'CSV (vírgula separada) (*. CSV)',
        html: 'Página da web (*.html)',
        xml: 'Dados XML (*.xml)',
        txt: 'Arquivo de texto (guia separado) (*. TXT)',
        xls: 'Excel 97-2003 Book (*.xls)',
        xlsx: 'Pasta de trabalho do Excel (*.xlsx)',
        pdf: 'Pdf (*.pdf)'
      },
      modes: {
        empty: 'Dados vazios',
        current: 'Dados atuais (dados na página atual)',
        selected: 'Dados selecionados (dados selecionados na página atual)',
        all: 'Dados completos (incluindo todos os dados paginos)'
      },
      printTitle: 'Dados de impressão',
      expTitle: 'Dados de exportação',
      expName: 'Nome do arquivo',
      expNamePlaceholder: 'Por favor, insira um nome de arquivo',
      expSheetName: 'título',
      expSheetNamePlaceholder: 'Por favor, insira um título',
      expType: 'Salvar tipo',
      expMode: 'Selecione dados',
      expCurrentColumn: 'Todos os campos',
      expColumn: 'Selecione o campo',
      expOpts: 'Configurações de parâmetros',
      expOptHeader: 'Cabeçalho',
      expHeaderTitle: 'É o cabeçalho da tabela necessário',
      expOptFooter: 'Fim da tabela',
      expFooterTitle: 'O final da tabela é necessário?',
      expOptColgroup: 'Cabeçalho de agrupamento',
      expOptTitle: 'Título da coluna',
      expTitleTitle: 'Seja o título da coluna, caso contrário, será exibido como o nome do campo da coluna',
      expColgroupTitle: 'Se estiver presente, um cabeçalho com uma estrutura de agrupamento é suportado',
      expOptMerge: 'mesclar',
      expMergeTitle: 'Se presente, as células com estruturas mescladas são suportadas',
      expOptAllExpand: 'Expandir a árvore',
      expAllExpandTitle: 'Se existir, é suportado para expandir todos os dados com estruturas hierárquicas',
      expOptUseStyle: 'estilo',
      expUseStyleTitle: 'Se presente, células com estilo são suportadas',
      expOptOriginal: 'Dados de origem',
      expOriginalTitle: 'Se são dados de origem, a importação para as tabelas é suportada',
      expPrint: 'Imprimir',
      expConfirm: 'Exportar',
      expCancel: 'Cancelar'
    },
    modal: {
      errTitle: 'Mensagem de erro',
      zoomMin: 'Minimizar',
      zoomIn: 'maximizar',
      zoomOut: 'redução',
      close: 'encerramento',
      miniMaxSize: 'O número de janelas minimizadas não pode exceder {0}',
      footPropErr: 'O Show-Footer é usado apenas para ativar a cauda da tabela e deve ser usado com o programa de confirmação | Mostra-cancelamento-botão | slots'
    },
    drawer: {
      close: 'encerramento'
    },
    form: {
      folding: 'Fechar',
      unfolding: 'Expandir'
    },
    toolbar: {
      import: 'Importar',
      export: 'Exportar',
      print: 'Imprimir',
      refresh: 'Atualizar',
      zoomIn: 'tela cheia',
      zoomOut: 'redução',
      custom: 'Configurações da coluna',
      customAll: 'todos',
      customConfirm: 'confirmar',
      customRestore: 'Reiniciar',
      fixedLeft: 'Congele à esquerda',
      fixedRight: 'Congele à direita',
      cancelFixed: 'Descongelar'
    },
    datePicker: {
      yearTitle: '{0} anos'
    },
    dateRangePicker: {
      pleaseRange: '请选择开始日期与结束日期'
    },
    input: {
      date: {
        m1: 'Janeiro',
        m2: 'Fevereiro',
        m3: 'Marchar',
        m4: 'abril',
        m5: 'Poderia',
        m6: 'Junho',
        m7: 'Julho',
        m8: 'Agosto',
        m9: 'Setembro',
        m10: 'outubro',
        m11: 'novembro',
        m12: 'dezembro',
        quarterLabel: '{0} anos',
        monthLabel: '{0} anos',
        dayLabel: '{0} ano {1}',
        labelFormat: {
          date: 'yyyy-MM-dd',
          time: 'HH:mm:ss',
          datetime: 'yyyy-MM-dd HH:mm:ss',
          week: 'Week WW of year yyyy',
          month: 'yyyy-MM',
          quarter: 'quarter q of year yyyy',
          year: 'yyyy'
        },
        weeks: {
          w: '',
          w0: 'Sol',
          w1: 'seg',
          w2: 'ter',
          w3: 'qua',
          w4: 'qui',
          w5: 'sex',
          w6: 'Sentado'
        },
        months: {
          m0: 'Janeiro',
          m1: 'Fevereiro',
          m2: 'Marchar',
          m3: 'abril',
          m4: 'Poderia',
          m5: 'Junho',
          m6: 'Julho',
          m7: 'Agosto',
          m8: 'Setembro',
          m9: 'outubro',
          m10: 'novembro',
          m11: 'dezembro'
        },
        quarters: {
          q1: 'Primeiro trimestre',
          q2: 'Segundo trimestre',
          q3: 'Terceiro trimestre',
          q4: 'Quarto trimestre'
        }
      }
    },
    numberInput: {
      currencySymbol: '$'
    },
    imagePreview: {
      popupTitle: 'Visualização',
      operBtn: {
        zoomOut: 'Encolher',
        zoomIn: 'ampliar',
        pctFull: 'Escala igualmente',
        pct11: 'Mostre o tamanho original',
        rotateLeft: 'Gire para a esquerda',
        rotateRight: 'Girar para a direita',
        print: 'Clique para imprimir a imagem',
        download: 'Clique para baixar a imagem'
      }
    },
    upload: {
      fileBtnText: 'Clique ou arraste para fazer o upload',
      imgBtnText: 'Clique ou arraste para fazer o upload',
      dragPlaceholder: 'Arraste e solte o arquivo para esta área para fazer upload',
      imgSizeHint: 'Folheto {0}',
      imgCountHint: 'Máximo {0} imagens',
      fileTypeHint: 'Suporte {0} tipos de arquivo',
      fileSizeHint: 'Um único tamanho de arquivo não excede {0}',
      fileCountHint: 'Até {0} arquivos podem ser carregados',
      uploadTypeErr: 'Tipo de arquivo Incompatch!',
      overCountErr: 'Somente os arquivos {0} podem ser selecionados no máximo!',
      overCountExtraErr: 'O número máximo de {0} foi excedido e os arquivos excedentes {1} serão ignorados!',
      overSizeErr: 'O tamanho máximo do arquivo não pode exceder {0}!',
      manualUpload: '点击上传',
      reUpload: 'Re-applar',
      uploadProgress: 'Upload {0}%',
      uploadErr: 'Falha no upload',
      uploadSuccess: 'Carregar com sucesso',
      moreBtnText: 'Mais ({0})',
      viewItemTitle: 'Clique para visualizar',
      morePopup: {
        readTitle: 'Lista de visualização',
        imageTitle: 'Carregue fotos',
        fileTitle: 'Faça o upload do arquivo'
      }
    },
    empty: {
      defText: 'Ainda não há dados'
    },
    colorPicker: {
      clear: 'Claro',
      confirm: 'confirmar',
      copySuccess: 'Copiado para a área de transferência: {0}',
      hex: 'HEX'
    },
    formDesign: {
      formName: 'Nome do formulário',
      defFormTitle: 'Forma sem nome',
      widgetPropTab: 'Propriedades de controle',
      widgetFormTab: 'Formulário de propriedades',
      error: {
        wdFormUni: 'Este tipo de controle pode adicionar apenas um no formulário',
        wdSubUni: 'Este tipo de controle é permitido adicionar apenas um na subtable'
      },
      styleSetting: {
        btn: 'Configurações de estilo',
        title: 'Configurações de estilo de formulário',
        layoutTitle: 'Layout de controle',
        verticalLayout: 'Layout superior e inferior',
        horizontalLayout: 'Layout horizontal',
        styleTitle: 'Estilo de título',
        boldTitle: 'Título ousado',
        fontBold: 'Audacioso',
        fontNormal: 'convencional',
        colonTitle: 'Mostre o cólon',
        colonVisible: 'mostrar',
        colonHidden: 'esconder',
        alignTitle: 'Alinhamento',
        widthTitle: 'Largura do título',
        alignLeft: 'À esquerda',
        alignRight: 'À direita',
        unitPx: 'Pixels',
        unitPct: 'percentagem'
      },
      widget: {
        group: {
          base: 'Controles básicos',
          layout: 'Controles de layout',
          system: 'Controles do sistema',
          module: 'Controles do módulo',
          chart: 'Controle de gráfico',
          advanced: 'Controles avançados'
        },
        copyTitle: 'Copy_ {0}',
        component: {
          input: 'Caixa de entrada',
          textarea: 'Campo de texto',
          select: 'Puxe para baixo para selecionar',
          row: 'Uma linha e várias colunas',
          title: 'título',
          text: 'texto',
          subtable: 'Subtable',
          VxeSwitch: 'se',
          VxeInput: 'Caixa de entrada',
          VxeNumberInput: 'número',
          VxeDatePicker: 'data',
          VxeTextarea: 'Campo de texto',
          VxeSelect: 'Puxe para baixo para selecionar',
          VxeTreeSelect: 'Seleção de árvores',
          VxeRadioGroup: 'Botão de rádio',
          VxeCheckboxGroup: 'Caixa de seleção',
          VxeUploadFile: 'documento',
          VxeUploadImage: 'foto',
          VxeRate: 'pontuação',
          VxeSlider: 'Slider'
        }
      },
      widgetProp: {
        name: 'Nome de controle',
        placeholder: 'Incitar',
        required: 'Verificação necessária',
        multiple: 'Várias opções são permitidas',
        displaySetting: {
          name: 'Configurações de exibição',
          pc: 'PC',
          mobile: 'Móvel',
          visible: 'mostrar',
          hidden: 'esconder'
        },
        dataSource: {
          name: 'Fonte de dados',
          defValue: 'Opção {0}',
          addOption: 'Adicione opções',
          batchEditOption: 'Edição em lote',
          batchEditTip: 'Cada linha corresponde a uma opção, que suporta cópia direta e colar de tabelas, Excel e WPS.',
          batchEditSubTip: 'Cada linha corresponde a uma opção. Se for um grupo, os itens da criança podem começar com um espaço ou uma tecla de guia e suporta cópias diretas e colar de tabelas, Excel e WPS.',
          buildOption: 'Construir opções'
        },
        rowProp: {
          colSize: 'Número de colunas',
          col2: 'Duas colunas',
          col3: 'Três colunas',
          col4: 'Quatro colunas',
          col6: 'Seis colunas',
          layout: 'layout'
        },
        textProp: {
          name: 'contente',
          alignTitle: 'Alinhamento',
          alignLeft: 'À esquerda',
          alignCenter: 'Centro',
          alignRight: 'À direita',
          colorTitle: 'Cor da fonte',
          sizeTitle: 'Tamanho da fonte',
          boldTitle: 'Fonte em negrito',
          fontNormal: 'convencional',
          fontBold: 'Audacioso'
        },
        subtableProp: {
          seqTitle: 'Número de série',
          showSeq: 'Mostre número de série',
          showCheckbox: 'Várias opções são permitidas',
          errSubDrag: 'O subtable não suporta esse controle, use outros controles',
          colPlace: 'Arraste o controle em'
        },
        uploadProp: {
          limitFileCount: 'Limite de quantidade do arquivo',
          limitFileSize: 'Limite de tamanho do arquivo',
          multiFile: 'Permitir que vários arquivos sejam carregados',
          limitImgCount: 'Número limite de fotos',
          limitImgSize: 'Limite de tamanho da imagem',
          multiImg: 'Permitir que várias fotos enviem'
        }
      }
    },
    listDesign: {
      fieldSettingTab: 'Configurações de campo',
      listSettingTab: 'Configurações de parâmetros',
      searchTitle: 'Critérios de consulta',
      listTitle: 'Campo de lista',
      searchField: 'Campos de consulta',
      listField: 'Campo de lista',
      activeBtn: {
        ActionButtonUpdate: 'editar',
        ActionButtonDelete: 'excluir'
      },
      search: {
        addBtn: 'editar',
        emptyText: 'Condições de consulta não configuradas',
        editPopupTitle: 'Editar campos de consulta'
      },
      searchPopup: {
        colTitle: 'título',
        saveBtn: 'salvar'
      }
    },
    text: {
      copySuccess: 'Copiado para a área de transferência',
      copyError: 'O ambiente atual não suporta esta operação'
    },
    countdown: {
      formats: {
        yyyy: 'Ano',
        MM: 'lua',
        dd: 'céu',
        HH: 'hora',
        mm: 'apontar',
        ss: 'Segundo'
      }
    },
    gantt: {
      tFullFormat: {
        year: '{yy}年',
        quarter: '{yy}年第{q}季度',
        month: '{yy}年{M}月',
        week: '{yy}年第{W}周',
        day: '{yy}年{M}月{d}日',
        hour: '{yy}年 {M}月{d}日{H}时',
        minute: '{yy}年{M}月{d}日{H}时{m}分'
      },
      tSimpleFormat: {
        year: '{yy}年',
        quarter: '{q}季度',
        month: '{M}月',
        week: '{W}周',
        day: '{d}',
        hour: '{H}时',
        minute: '{m}分'
      },
      dayss: {
        w0: '日',
        w1: '一',
        w2: '二',
        w3: '三',
        w4: '四',
        w5: '五',
        w6: '六'
      }
    },
    plugins: {
      extendCellArea: {
        area: {
          mergeErr: 'Esta operação não pode ser realizada em células mescladas',
          multiErr: 'Esta operação não pode ser realizada em várias áreas de seleção',
          selectErr: 'Incapaz de operar em células no intervalo especificado',
          extendErr: 'Se a faixa estendida contiver células mescladas, todas as células mescladas devem ter o mesmo tamanho',
          pasteMultiErr: 'Incapaz de colar, as áreas copiadas e coladas precisam ter o mesmo tamanho para executar esta operação',
          cpInvalidErr: 'A operação não pode ser realizada. Existem colunas proibidas ({0}) no intervalo que você selecionou.'
        },
        fnr: {
          title: 'Encontre e substitua',
          findLabel: 'Encontrar',
          replaceLabel: 'substituir',
          findTitle: 'Encontre o que:',
          replaceTitle: 'Substitua por:',
          tabs: {
            find: 'Encontrar',
            replace: 'substituir'
          },
          filter: {
            re: 'Expressões regulares',
            whole: 'Combinação de palavras completas',
            sensitive: 'maiúsculas e minúsculas'
          },
          btns: {
            findNext: 'Encontre a seguir',
            findAll: 'Encontre tudo',
            replace: 'substituir',
            replaceAll: 'Substitua tudo',
            cancel: 'Cancelar'
          },
          header: {
            seq: '#',
            cell: 'Célula',
            value: 'valor'
          },
          body: {
            row: 'Linha: {0}',
            col: 'Coluna: {0}'
          },
          empty: '(Valor nulo)',
          reError: 'Expressão regular inválida',
          recordCount: '{0} células encontradas',
          notCell: 'A célula correspondente não pode ser encontrada',
          replaceSuccess: 'Células substituídas com sucesso {0}'
        }
      },
      extendPivotTable: {
        aggregation: {
          grouping: '分组',
          values: '值',
          groupPlaceholder: '拖至此处进行分组',
          valuesPlaceholder: '拖至此处进行聚合',
          dragExistCol: '该列已存在',
          sortHelpTip: '点击并拖动图标可以调整顺序'
        },
        aggFuncs: {
          sum: '求和',
          count: '计数',
          avg: '平均值',
          min: '最小值',
          max: '最大值',
          first: '首个值',
          last: '末尾值'
        }
      },
      filterComplexInput: {
        menus: {
          fixedColumn: 'Coluna de congelamento',
          fixedGroup: 'Grupo de congelamento',
          cancelFixed: 'Descongelar',
          fixedLeft: 'Congele à esquerda',
          fixedRight: 'Congele à direita'
        },
        cases: {
          equal: 'igual',
          gt: 'Maior que',
          lt: 'Menor que',
          begin: 'O começo é',
          endin: 'O fim é',
          include: 'Incluir',
          isSensitive: 'maiúsculas e minúsculas'
        }
      },
      filterCombination: {
        menus: {
          sort: 'Organizar',
          clearSort: 'Classificação clara',
          sortAsc: 'Ordem ascendente',
          sortDesc: 'ordem descendente',
          fixedColumn: 'Coluna de congelamento',
          fixedGroup: 'Grupo de congelamento',
          cancelFixed: 'Descongelar',
          fixedLeft: 'Congele à esquerda',
          fixedRight: 'Congele à direita',
          clearFilter: 'Filtro transparente',
          textOption: 'Filtro de texto',
          numberOption: 'Filtro numérico'
        },
        popup: {
          title: 'Métodos de filtragem personalizados',
          currColumnTitle: 'Coluna atual:',
          and: 'e',
          or: 'ou',
          describeHtml: 'Disponível? Representa um único caractere <br/> Use * representa qualquer caractere múltiplo'
        },
        cases: {
          equal: 'igual',
          unequal: 'Não igual a',
          gt: 'Maior que',
          ge: 'Maior ou igual a',
          lt: 'Menor que',
          le: 'Menor ou igual a',
          begin: 'O começo é',
          notbegin: 'Não é no começo',
          endin: 'O fim é',
          notendin: 'O final não é',
          include: 'Incluir',
          exclude: 'Não incluído',
          between: 'Entre',
          custom: 'Filtro personalizado',
          insensitive: 'Caso insensível',
          isSensitive: 'maiúsculas e minúsculas'
        },
        empty: '(em branco)',
        notData: 'Sem correspondência'
      }
    },
    pro: {
      area: {
        mergeErr: 'Esta operação não pode ser realizada em células mescladas',
        multiErr: 'Esta operação não pode ser realizada em várias áreas de seleção',
        extendErr: 'Se a faixa estendida contiver células mescladas, todas as células mescladas devem ter o mesmo tamanho',
        pasteMultiErr: 'Incapaz de colar, as áreas copiadas e coladas precisam ter o mesmo tamanho para executar esta operação'
      },
      fnr: {
        title: 'Encontre e substitua',
        findLabel: 'Encontrar',
        replaceLabel: 'substituir',
        findTitle: 'Encontre conteúdo:',
        replaceTitle: 'Substitua por:',
        tabs: {
          find: 'Encontrar',
          replace: 'substituir'
        },
        filter: {
          re: 'Expressões regulares',
          whole: 'Combinação de palavras completas',
          sensitive: 'maiúsculas e minúsculas'
        },
        btns: {
          findNext: 'Encontre a seguir',
          findAll: 'Encontre tudo',
          replace: 'substituir',
          replaceAll: 'Substitua tudo',
          cancel: 'Cancelar'
        },
        header: {
          seq: '#',
          cell: 'Célula',
          value: 'valor'
        },
        empty: '(Valor nulo)',
        reError: 'Expressão regular inválida',
        recordCount: '{0} células encontradas',
        notCell: 'Nenhuma célula correspondente encontrada',
        replaceSuccess: 'Células substituídas com sucesso {0}'
      }
    },
    renderer: {
      search: 'procurar',
      cases: {
        equal: 'igual',
        unequal: 'Não igual a',
        gt: 'Maior que',
        ge: 'Maior ou igual a',
        lt: 'Menor que',
        le: 'Menor ou igual a',
        begin: 'O começo é',
        notbegin: 'Não é no começo',
        endin: 'O fim é',
        notendin: 'O final não é',
        include: 'Incluir',
        exclude: 'Não incluído',
        between: 'Entre',
        custom: 'Filtro personalizado',
        insensitive: 'Caso insensível',
        isSensitive: 'maiúsculas e minúsculas'
      },
      combination: {
        menus: {
          sort: 'Organizar',
          clearSort: 'Classificação clara',
          sortAsc: 'Ordem ascendente',
          sortDesc: 'ordem descendente',
          fixedColumn: 'Coluna de congelamento',
          fixedGroup: 'Grupo de congelamento',
          cancelFixed: 'Descongelar',
          fixedLeft: 'Congele à esquerda',
          fixedRight: 'Congele à direita',
          clearFilter: 'Filtro transparente',
          textOption: 'Filtragem de texto',
          numberOption: 'Filtragem numérica'
        },
        popup: {
          title: 'Métodos de filtragem personalizados',
          currColumnTitle: 'Coluna atual:',
          and: 'e',
          or: 'ou',
          describeHtml: 'Disponível? Representa um único caractere <br/> Use * representa qualquer caractere múltiplo'
        },
        empty: '(em branco)',
        notData: 'Sem correspondência'
      }
    }
  }
}
