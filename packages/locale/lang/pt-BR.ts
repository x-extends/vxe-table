export default {
  vxe: {
    base: {
      pleaseInput: 'Por favor, insira',
      pleaseSelect: 'Selecione'
    },
    loading: {
      text: 'Carregando...'
    },
    error: {
      groupFixed: 'Se você estiver usando cabeçalhos de grupo, as colunas fixas devem ser definidas por grupo.',
      groupMouseRange: 'Agrupar cabeçalhos e "{0}" não podem ser usados ao mesmo tempo, o que pode causar erros.',
      groupTag: 'O cabeçalho da coluna de agrupamento deve usar "{0}" em vez de "{1}", o que pode causar erros.',
      scrollErrProp: 'O parâmetro "{0}" não é suportado quando a rolagem virtual está habilitada.',
      errConflicts: 'O argumento "{0}" entra em conflito com "{1}"',
      unableInsert: 'Não é possível inserir na localização especificada.',
      useErr: 'Erro ao instalar o módulo "{0}", possivelmente na ordem errada, os módulos dependentes precisam ser instalados antes da Tabela.',
      barUnableLink: 'A barra de ferramentas não pode ser associada à tabela.',
      expandContent: 'O slot de linha expandida deve ser "content", verifique se está correto.',
      reqModule: 'requerir o módulo "{0}".',
      reqProp: 'Faltando o parâmetro necessário "{0}", o que pode causar um erro.',
      emptyProp: 'A propriedade "{0}" não pode estar vazia.',
      errProp: 'Parâmetro não suportado "{0}", possivelmente "{1}".',
      colRepet: 'column.{0}="{0}" está duplicado, o que pode tornar algumas funcionalidades inutilizáveis.',
      notFunc: 'método "{0}" não existe.',
      errFunc: 'The argument "{0}" is not a method',
      notValidators: 'Validadores globais "{0}" não existem.',
      notFormats: 'Formatos globais "{0}" não existem.',
      notCommands: 'Comandos globais "{0}" não existem.',
      notSlot: 'slot "{0}" não existe',
      noTree: 'A estrutura de árvore não suporta "{0}".',
      notProp: 'Parâmetros não suportados "{0}"',
      checkProp: 'A caixa de seleção pode travar quando a quantidade de dados é muito grande, é recomendado definir o parâmetro "{0}" para aumentar a velocidade de renderização ',
      coverProp: 'O parâmetro "{1}" para "{0}" está sendo substituído. Isso pode causar um erro',
      delFunc: 'A função "{0}" está obsoleta, por favor, use "{1}".',
      delProp: 'A propriedade "{0}" está obsoleta, por favor, use "{1}".',
      delEvent: 'O evento "{0}" está obsoleto, por favor, use "{1}".',
      removeProp: 'A propriedade "{0}" está obsoleta e não é recomendada, o que pode causar um erro.',
      errFormat: 'O conteúdo formatado global deve ser definido com "VXETable.formats". Montar "formatter={0}" não é recomendado.',
      notType: 'Tipos de arquivo não suportados "{0}"',
      notExp: 'O navegador não suporta importação/exportação.',
      impFields: 'Falha na importação, verifique se o nome do campo e o formato dos dados estão corretos.',
      treeNotImp: 'A tabela de árvore não suporta importação.'
    },
    renderer: {
      search: 'Buscar',
      cases: {
        equal: 'Igual',
        unequal: 'Não igual',
        gt: 'Maior que',
        ge: 'Maior ou igual a',
        lt: 'Menor que',
        le: 'Menor ou igual a',
        begin: 'Começa com',
        notbegin: 'Não começa com',
        endin: 'Termina com',
        notendin: 'Não termina com',
        include: 'Inclui',
        exclude: 'Exclusivo',
        between: 'Entre',
        custom: 'Filtro personalizado',
        insensitive: 'Sem diferenciação de maiúsculas e minúsculas',
        isSensitive: 'Diferenciação de maiúsculas e minúsculas'
      },
      combination: {
        menus: {
          clearSort: 'Limpar ordenação',
          sortAsc: 'Ordem ascendente',
          sortDesc: 'Ordem descendente',
          fixedColumn: 'Coluna fixa',
          fixedGroup: 'Grupo fixo',
          cancelFixed: 'Limpar fixação',
          fixedLeft: 'Fixar à esquerda',
          fixedRight: 'Fixar à direita',
          clearFilter: 'Limpar filtro',
          textOption: 'Filtro de texto',
          numberOption: 'Filtro numérico'
        },
        popup: {
          title: 'Filtragem personalizada',
          currColumnTitle: 'Coluna atual:',
          and: 'E',
          or: 'Ou',
          describeHtml: 'Use ? para representar um único caractere <br/> use * para representar qualquer número de caracteres'
        },
        empty: '(Vazio)',
        notData: 'Sem dados'
      }
    },
    pro: {
      area: {
        mergeErr: 'A operação não pode ser realizada em células mescladas',
        multiErr: 'A operação não pode ser realizada em áreas de seleção múltipla',
        extendErr: 'Se a área estendida contiver células mescladas, todas as células mescladas devem ter o mesmo tamanho',
        pasteMultiErr: 'Não é possível colar, é necessário que a área copiada e a área colada tenham o mesmo tamanho para realizar esta operação'
      },
      fnr: {
        title: 'Localizar e substituir',
        findLabel: 'Localizar',
        replaceLabel: 'Substituir',
        findTitle: 'O que localizar:',
        replaceTitle: 'Substituir por:',
        tabs: {
          find: 'Localizar',
          replace: 'Substituir'
        },
        filter: {
          re: 'Expressão Regular',
          whole: 'Palavra inteira',
          sensitive: 'Diferenciar maiúsculas e minúsculas'
        },
        btns: {
          findNext: 'Localizar próximo',
          findAll: 'Localizar todos',
          replace: 'Substituir',
          replaceAll: 'Substituir tudo',
          cancel: 'Cancelar'
        },
        header: {
          seq: '#',
          cell: 'Célula',
          value: 'Valor'
        },
        empty: '(Vazio)',
        reError: 'Expressão regular inválida',
        recordCount: 'Encontradas {0} células',
        notCell: 'Não foram encontradas células correspondentes',
        replaceSuccess: 'Substituído com sucesso {0} células'
      }
    },
    table: {
      emptyText: 'Sem dados',
      allTitle: 'Selecionar todos / cancelar',
      seqTitle: '#',
      confirmFilter: 'Confirmar',
      resetFilter: 'Redefinir',
      allFilter: 'Todos',
      sortAsc: 'Ordenação ascendente: do menor para o maior',
      sortDesc: 'Ordenação descendente: do maior para o menor',
      filter: 'Habilitar filtro em colunas selecionadas',
      impSuccess: 'Importado com sucesso {0} registros',
      expLoading: 'Exportando',
      expSuccess: 'Exportado com sucesso',
      expFilename: 'Exportar_{0}',
      expOriginFilename: 'Exportar_original_{0}',
      customTitle: 'Configurações de coluna',
      customAll: 'Todos',
      customConfirm: 'Confirmar',
      customRestore: 'Redefinir',
      maxFixedCol: 'O número máximo de colunas fixas não pode exceder {0}'
    },
    grid: {
      selectOneRecord: 'Por favor, selecione pelo menos um registro!',
      deleteSelectRecord: 'Tem certeza de que deseja excluir o registro selecionado?',
      removeSelectRecord: 'Tem certeza de que deseja remover o registro selecionado?',
      dataUnchanged: 'Dados inalterados!',
      delSuccess: 'Registro selecionado excluído com sucesso!',
      saveSuccess: 'Salvo com sucesso!',
      operError: 'Ocorreu um erro, a operação falhou!'
    },
    select: {
      search: 'Buscar',
      loadingText: 'Carregando',
      emptyText: 'Sem dados'
    },
    pager: {
      goto: 'Ir para',
      pagesize: '{0}/página',
      total: 'Total de {0} registros',
      pageClassifier: '',
      prevPage: 'Página anterior',
      nextPage: 'Próxima página',
      prevJump: 'Saltar para página anterior',
      nextJump: 'Saltar para próxima página'
    },
    alert: {
      title: 'Notificação de Mensagem'
    },
    button: {
      confirm: 'Confirmar',
      cancel: 'Cancelar'
    },
    import: {
      modes: {
        covering: 'Sobrescrever',
        insert: 'Inserir'
      },
      impTitle: 'Importar dados',
      impFile: 'Nome do arquivo',
      impSelect: 'Selecionar arquivo',
      impType: 'Tipo de arquivo',
      impOpts: 'Configurações',
      impConfirm: 'Importar',
      impCancel: 'Cancelar'
    },
    export: {
      types: {
        csv: 'CSV (Separado por vírgulas) (*.csv)',
        html: 'Página da Web (*.html)',
        xml: 'Dados XML (*.xml)',
        txt: 'Texto (Separado por tabulação) (*.txt)',
        xls: 'Pasta de trabalho do Excel 97-2003 (*.xls)',
        xlsx: 'Pasta de trabalho do Excel (*.xlsx)',
        pdf: 'PDF (*.pdf)'
      },
      modes: {
        current: 'Dados atuais (dados da página atual)',
        selected: 'Dados selecionados (dados selecionados na página atual)',
        all: 'Todos os dados (incluindo todos os dados de paginação)'
      },
      printTitle: 'Imprimir dados',
      expTitle: 'Exportar dados',
      expName: 'Nome do arquivo',
      expNamePlaceholder: 'Por favor, insira o nome do arquivo',
      expSheetName: 'Título',
      expSheetNamePlaceholder: 'Por favor, insira um título',
      expType: 'Salvar o tipo',
      expMode: 'Selecionar dados',
      expCurrentColumn: 'Todos os campos',
      expColumn: 'Selecionar campo',
      expOpts: 'Configurações',
      expOptHeader: 'Cabeçalho',
      expHeaderTitle: 'Necessita de cabeçalho',
      expOptFooter: 'Rodapé',
      expFooterTitle: 'Necessita de tabela de rodapé',
      expOptColgroup: 'Cabeçalho de grupo',
      expColgroupTitle: 'Se existir, suporta cabeçalhos com estrutura de agrupamento',
      expOptMerge: 'Mesclar',
      expMergeTitle: 'Se existir, suporta células com estruturas mescladas',
      expOptAllExpand: 'Expandir nós',
      expAllExpandTitle: 'Se existir, todos os dados com estrutura de árvore podem ser expandidos',
      expOptUseStyle: 'Estilos',
      expUseStyleTitle: 'Se existir, suporta células com estilos',
      expOptOriginal: 'Dados originais',
      expOriginalTitle: 'Se for dados originais, é possível importá-los de volta para a tabela',
      expPrint: 'Imprimir',
      expConfirm: 'Exportar',
      expCancel: 'Cancelar'
    },
    modal: {
      zoomIn: 'Maximizar',
      zoomOut: 'Restaurar',
      close: 'Fechar'
    },
    form: {
      folding: 'Ocultar',
      unfolding: 'Mostrar'
    },
    toolbar: {
      import: 'Importar',
      export: 'Exportar',
      print: 'Imprimir',
      refresh: 'Atualizar',
      zoomIn: 'Tela cheia',
      zoomOut: 'Restaurar',
      custom: 'Configurações de coluna',
      customAll: 'Todos',
      customConfirm: 'Confirmar',
      customRestore: 'Redefinir',
      fixedLeft: 'Fixar à esquerda',
      fixedRight: 'Fixar à direita',
      cancelfixed: 'Não fixar'
    },
    input: {
      date: {
        m1: 'Janeiro',
        m2: 'Fevereiro',
        m3: 'Março',
        m4: 'Abril',
        m5: 'Maio',
        m6: 'Junho',
        m7: 'Julho',
        m8: 'Agosto',
        m9: 'Setembro',
        m10: 'Outubro',
        m11: 'Novembro',
        m12: 'Dezembro',
        quarterLabel: '{0} trimestre',
        monthLabel: '{0}',
        dayLabel: '{1} {0}',
        labelFormat: {
          date: 'dd/MM/yyyy',
          time: 'HH:mm:ss',
          datetime: 'dd/MM/yyyy HH:mm:ss',
          week: '[Semana] WW, yyyy',
          month: 'MM/yyyy',
          quarter: '[Trimestre] q, yyyy',
          year: 'yyyy'
        },
        weeks: {
          w: 'Semana',
          w0: 'Dom',
          w1: 'Seg',
          w2: 'Ter',
          w3: 'Qua',
          w4: 'Qui',
          w5: 'Sex',
          w6: 'Sáb'
        },
        months: {
          m0: 'Jan',
          m1: 'Fev',
          m2: 'Mar',
          m3: 'Abr',
          m4: 'Mai',
          m5: 'Jun',
          m6: 'Jul',
          m7: 'Ago',
          m8: 'Set',
          m9: 'Out',
          m10: 'Nov',
          m11: 'Dez'
        },
        quarters: {
          q1: '1º trimestre',
          q2: '2º trimestre',
          q3: '3º trimestre',
          q4: '4º trimestre'
        }
      }
    }
  }
}
