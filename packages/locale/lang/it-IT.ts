export default {
  vxe: {
    base: {
      pleaseInput: 'Inserisci',
      pleaseSelect: 'Seleziona',
      comma: '，',
      fullStop: '。'
    },
    loading: {
      text: 'caricamento...'
    },
    error: {
      downErr: 'Scarica non riuscita',
      errLargeData: 'Quando la quantità di dati vincolati è troppo grande, si prega di utilizzare {0}, altrimenti potrebbe causare un ritardo',
      groupFixed: 'Se si utilizzano intestazioni raggruppate, la colonna congelata deve essere impostata per gruppo',
      groupMouseRange: "L'intestazione del raggruppamento non può essere utilizzata contemporaneamente a \"{0}\" e questo può causare un errore",
      groupTag: 'Le intestazioni della colonna di raggruppamento dovrebbero usare "{0}" invece di "{1}", che può causare errori',
      scrollErrProp: 'Questo parametro "{0}" non è supportato dopo che lo scorrimento virtuale è abilitato',
      errConflicts: 'Parametro "{0}" conflitti con "{1}"',
      notSupportProp: '"{1}" non è supportato quando il parametro "{0}" è abilitato, dovrebbe essere "{2}", altrimenti si verificherà un errore',
      notConflictProp: 'Quando si utilizza "{0}", "{1}" dovrebbe essere impostato, altrimenti potrebbero esserci conflitti funzionali',
      unableInsert: 'Non può essere inserito nella posizione specificata, si prega di verificare se i parametri sono corretti',
      useErr: "Si è verificato un errore durante l'installazione del modulo \"{0}\". L'ordine può essere errato. Il modulo dipendente deve essere installato prima della tabella",
      barUnableLink: 'La barra degli strumenti non può associare le tabelle',
      expandContent: 'Lo slot per la linea espansa dovrebbe essere "contenuto", controlla se è corretto',
      reqComp: 'Manca il componente "{0}", controlla se è installato correttamente. https://vxeui.com/#/start/useglobal',
      reqModule: 'Manca il modulo "{0}"',
      reqProp: 'Manca il parametro "{0}" necessario, che può causare un errore',
      emptyProp: 'Il parametro "{0}" non può essere vuoto',
      errProp: 'Parametro non supportato "{0}", possibilmente "{1}"',
      colRepet: 'column. {0} = "{1}" viene ripetuto, il che può causare inutili alcune funzioni',
      notFunc: 'Metodo "{0}" non esiste',
      errFunc: 'Il parametro "{0}" non è un metodo',
      notValidators: 'La verifica globale "{0}" non esiste',
      notFormats: 'La formattazione globale "{0}" non esiste',
      notCommands: 'La direttiva globale "{0}" non esiste',
      notSlot: 'Lo slot "{0}" non esiste',
      noTree: "\"{0}\" non è supportato nella struttura dell'albero",
      notProp: 'Parametro non supportato "{0}"',
      checkProp: 'Quando il volume dei dati è troppo grande, la casella di controllo può essere balbettata. Si consiglia di impostare il parametro "{0}" per migliorare la velocità di rendering',
      coverProp: 'Il parametro "{1}" di "{0}" è ripetutamente definito, che può causare un errore',
      uniField: 'Il nome del campo "{0}" è ripetutamente definito, il che può causare un errore',
      repeatKey: 'Ripeti la chiave primaria {0} = "{1}", che può causare un errore',
      delFunc: 'Il metodo "{0}" è deprecato, usa "{1}"',
      delProp: 'Il parametro "{0}" è deprecato, usa "{1}"',
      delEvent: "L'evento \"{0}\" è deprecato, usa \"{1}\"",
      removeProp: 'Il parametro "{0}" è deprecato e non è raccomandato, il che può causare un errore',
      errFormat: 'Il contenuto formattato globale deve essere definito utilizzando "vxetable.formats" e il metodo di montaggio "formatter = {0}" non è più consigliato.',
      notType: 'Tipo di file non supportato "{0}"',
      notExp: 'Questo browser non supporta la funzione di importazione/esportazione',
      impFields: "L'importazione non è riuscita. Si prega di controllare se il nome del campo e il formato dei dati sono corretti.",
      treeNotImp: "Le tabelle degli alberi non supportano l'importazione",
      treeCrossDrag: 'Trascina solo il primo livello',
      treeDragChild: 'I genitori non possono trascinare con i propri figli',
      reqPlugin: '"{1}" non è installato su https://vxeui.com/other{0}/#/{1}/install',
      errMaxRow: 'Superando il volume dei dati supportato massimo {0} righe, questo può causare un errore'
    },
    table: {
      emptyText: 'Nessun dati ancora',
      allTitle: 'Seleziona All/Annulla',
      seqTitle: 'Numero di serie',
      actionTitle: 'operare',
      confirmFilter: 'filtro',
      resetFilter: 'Reset',
      allFilter: 'Tutto',
      sortAsc: 'Ordine ascendente: da più basso al più alto',
      sortDesc: 'Ordine discendente: da più alto al più basso',
      filter: 'Abilita il filtro per colonne selezionate',
      impSuccess: 'Record {0} importati correttamente',
      expLoading: 'Esportazione',
      expSuccess: 'Esportazione con successo',
      expError: "L'esportazione non è riuscita",
      expFilename: 'Export_ {0}',
      expOriginFilename: 'Export_source_ {0}',
      customTitle: 'Impostazioni della colonna',
      customAll: 'Tutto',
      customConfirm: 'confermare',
      customClose: 'chiusura',
      customCancel: 'Cancellare',
      customRestore: 'Ripristina il valore predefinito',
      maxFixedCol: 'Il numero massimo di colonne congelate non può superare {0}',
      maxGroupCol: '最大分组字段的数量不能超过 {0} 个',
      dragTip: 'Muovi: {0}',
      resizeColTip: 'Larghezza: {0} pixel',
      resizeRowTip: 'Altezza: {0} pixel',
      rowGroupContentTotal: '{0} ({1})'
    },
    grid: {
      selectOneRecord: 'Seleziona almeno un record!',
      deleteSelectRecord: 'Sei sicuro di voler eliminare il record selezionato?',
      removeSelectRecord: 'Sei sicuro di voler rimuovere il record selezionato?',
      dataUnchanged: 'Dati non modificati!',
      delSuccess: 'Il record selezionato è stato eliminato con successo!',
      saveSuccess: 'Salva con successo!',
      operError: "Si è verificato un errore e l'operazione non è riuscita!"
    },
    select: {
      search: 'ricerca',
      loadingText: 'caricamento',
      emptyText: 'Nessun dati ancora'
    },
    pager: {
      goto: 'Andare',
      gotoTitle: 'Numero di pagine',
      pagesize: '{0} elementi/pagina',
      total: 'Record totali {0}',
      pageClassifier: 'Pagina',
      homePage: 'prima pagina',
      homePageTitle: 'prima pagina',
      prevPage: 'Pagina precedente',
      prevPageTitle: 'Pagina precedente',
      nextPage: 'Pagina successiva',
      nextPageTitle: 'Pagina successiva',
      prevJump: 'Salta su pagina',
      prevJumpTitle: 'Salta su pagina',
      nextJump: 'Salta giù la pagina',
      nextJumpTitle: 'Salta giù la pagina',
      endPage: 'Ultima pagina',
      endPageTitle: 'Ultima pagina'
    },
    alert: {
      title: 'Procamenti di sistema'
    },
    button: {
      confirm: 'confermare',
      cancel: 'Cancellare',
      clear: 'Chiaro'
    },
    filter: {
      search: 'ricerca'
    },
    custom: {
      cstmTitle: 'Impostazioni della colonna',
      cstmRestore: 'Ripristina il valore predefinito',
      cstmCancel: 'Cancellare',
      cstmConfirm: 'Sicuro',
      cstmConfirmRestore: 'Si prega di confermare se è ripristinato alla configurazione della colonna predefinita?',
      cstmDragTarget: 'Muovi: {0}',
      setting: {
        colSort: 'Ordinare',
        sortHelpTip: '点击并拖动图标可以调整顺序',
        colTitle: 'Titolo della colonna',
        colResizable: 'Larghezza della colonna (pixel)',
        colVisible: 'Se visualizzare',
        colFixed: 'Colonna di congelamento',
        colFixedMax: 'Colonne di congelamento (fino a {0} colonne)',
        fixedLeft: 'Lato sinistro',
        fixedUnset: 'Non impostato',
        fixedRight: 'Lato destro'
      }
    },
    import: {
      modes: {
        covering: 'Metodo sovrascrivo (sovrascrivi direttamente i dati della tabella)',
        insert: 'Aggiungi in fondo (aggiungi nuovi dati nella parte inferiore della tabella)',
        insertTop: 'Aggiungi in alto (aggiungi nuovi dati nella parte superiore della tabella)',
        insertBottom: 'Aggiungi in fondo (aggiungi nuovi dati nella parte inferiore della tabella)'
      },
      impTitle: 'Importa dati',
      impFile: 'Nome file',
      impSelect: 'Seleziona file',
      impType: 'Tipo di file',
      impOpts: 'Impostazioni dei parametri',
      impMode: 'Modalità di importazione',
      impConfirm: 'Importare',
      impCancel: 'Cancellare'
    },
    export: {
      types: {
        csv: 'CSV (virgola separata) (*. CSV)',
        html: 'Pagina web (*.html)',
        xml: 'XML Data (*.xml)',
        txt: 'File di testo (scheda separata) (*. Txt)',
        xls: 'Excel 97-2003 Workbook (*.xls)',
        xlsx: 'Libro di lavoro Excel (*.xlsx)',
        pdf: 'Pdf (*.pdf)'
      },
      modes: {
        empty: 'Dati vuoti',
        current: 'Dati correnti (dati sulla pagina corrente)',
        selected: 'Dati selezionati (dati selezionati nella pagina corrente)',
        all: 'Dati completi (compresi tutti i dati pagati)'
      },
      printTitle: 'Stampa dati',
      expTitle: 'Dati di esportazione',
      expName: 'Nome file',
      expNamePlaceholder: 'Inserisci un nome di un file',
      expSheetName: 'titolo',
      expSheetNamePlaceholder: 'Inserisci un titolo',
      expType: 'Salva tipo',
      expMode: 'Seleziona i dati',
      expCurrentColumn: 'Tutti i campi',
      expColumn: 'Seleziona il campo',
      expOpts: 'Impostazioni dei parametri',
      expOptHeader: 'Intestazione',
      expHeaderTitle: "È richiesta l'intestazione del tavolo",
      expOptFooter: 'Fine della tabella',
      expFooterTitle: 'È richiesta la fine del tavolo?',
      expOptColgroup: 'Testa di raggruppamento',
      expOptTitle: 'Titolo della colonna',
      expTitleTitle: 'Che si tratti del titolo della colonna, altrimenti verrà visualizzato come nome del campo della colonna',
      expColgroupTitle: "Se presente, è supportata un'intestazione con una struttura di raggruppamento",
      expOptMerge: 'unire',
      expMergeTitle: 'Se presenti, le cellule con strutture unite sono supportate',
      expOptAllExpand: "Espandere l'albero",
      expAllExpandTitle: 'Se esiste, è supportato per espandere tutti i dati con strutture gerarchiche',
      expOptUseStyle: 'stile',
      expUseStyleTitle: 'Se presenti, le celle con stile sono supportate',
      expOptOriginal: 'Dati di origine',
      expOriginalTitle: "Se sono dati di origine, l'importazione nelle tabelle è supportata",
      expPrint: 'Stampa',
      expConfirm: 'Esportare',
      expCancel: 'Cancellare'
    },
    modal: {
      errTitle: 'Messaggio di errore',
      zoomMin: 'Minimizzare',
      zoomIn: 'massimizzare',
      zoomOut: 'riduzione',
      close: 'chiusura',
      miniMaxSize: 'Il numero di finestre minimizzate non può superare {0}',
      footPropErr: 'Show-footer viene utilizzato solo per abilitare la coda del tavolo e deve essere utilizzato con il pulsante show-confirm | Show-Cancel-Button | slot'
    },
    drawer: {
      close: 'chiusura'
    },
    form: {
      folding: 'Vicino',
      unfolding: 'Espandere'
    },
    toolbar: {
      import: 'Importare',
      export: 'Esportare',
      print: 'Stampa',
      refresh: 'rinfrescare',
      zoomIn: 'a schermo intero',
      zoomOut: 'riduzione',
      custom: 'Impostazioni della colonna',
      customAll: 'Tutto',
      customConfirm: 'confermare',
      customRestore: 'Reset',
      fixedLeft: 'Freeze a sinistra',
      fixedRight: 'Freeze Right',
      cancelFixed: 'Scongelare'
    },
    datePicker: {
      yearTitle: '{0} anni'
    },
    dateRangePicker: {
      pleaseRange: '请选择开始日期与结束日期'
    },
    input: {
      date: {
        m1: 'Gennaio',
        m2: 'Febbraio',
        m3: 'Marzo',
        m4: 'aprile',
        m5: 'Maggio',
        m6: 'Giugno',
        m7: 'Luglio',
        m8: 'agosto',
        m9: 'settembre',
        m10: 'ottobre',
        m11: 'novembre',
        m12: 'Dicembre',
        quarterLabel: '{0} anni',
        monthLabel: '{0} anni',
        dayLabel: '{0} anno {1}',
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
          w0: 'Sole',
          w1: 'Lun',
          w2: 'Mar',
          w3: 'Sposa',
          w4: 'Thu',
          w5: 'Ven',
          w6: 'Sab'
        },
        months: {
          m0: 'Gennaio',
          m1: 'Febbraio',
          m2: 'Marzo',
          m3: 'aprile',
          m4: 'Maggio',
          m5: 'Giugno',
          m6: 'Luglio',
          m7: 'agosto',
          m8: 'settembre',
          m9: 'ottobre',
          m10: 'novembre',
          m11: 'Dicembre'
        },
        quarters: {
          q1: 'Primo trimestre',
          q2: 'Secondo trimestre',
          q3: 'Terzo trimestre',
          q4: 'Quarto trimestre'
        }
      }
    },
    numberInput: {
      currencySymbol: '$'
    },
    imagePreview: {
      popupTitle: 'Anteprima',
      operBtn: {
        zoomOut: 'Restringersi',
        zoomIn: 'ingrandire',
        pctFull: 'Ridimensionando allo stesso modo',
        pct11: 'Mostra le dimensioni originali',
        rotateLeft: 'Ruotare a sinistra',
        rotateRight: 'Ruotare a destra',
        print: "Fare clic per stampare l'immagine",
        download: "Fai clic per scaricare l'immagine"
      }
    },
    upload: {
      fileBtnText: 'Fare clic o trascinare per caricare',
      imgBtnText: 'Fare clic o trascinare per caricare',
      dragPlaceholder: "Si prega di trascinare e rilasciare il file in quest'area per caricare",
      imgSizeHint: 'Foglie {0}',
      imgCountHint: 'Immagini massime {0}',
      fileTypeHint: 'Supporto {0} tipi di file',
      fileSizeHint: 'Una dimensione singola del file non supera {0}',
      fileCountHint: 'I file fino a {0} possono essere caricati',
      uploadTypeErr: 'Mismatch del tipo di file!',
      overCountErr: 'Solo i file {0} possono essere selezionati al massimo!',
      overCountExtraErr: 'Il numero massimo di {0} è stato superato e i file in eccesso {1} verranno ignorati!',
      overSizeErr: 'La dimensione massima del file non può superare {0}!',
      reUpload: 'Ri-caricamento',
      uploadProgress: 'Caricamento {0}%',
      uploadErr: 'Caricamento non riuscito',
      uploadSuccess: 'Carica correttamente',
      moreBtnText: 'Altro ({0})',
      viewItemTitle: 'Fare clic per visualizzare',
      morePopup: {
        readTitle: 'Visualizza elenco',
        imageTitle: 'Carica immagini',
        fileTitle: 'Carica file'
      }
    },
    empty: {
      defText: 'Nessun dati ancora'
    },
    colorPicker: {
      clear: 'Chiaro',
      confirm: 'confermare',
      copySuccess: 'Copiato sugli appunti: {0}'
    },
    formDesign: {
      formName: 'Nome del modulo',
      defFormTitle: 'Forma senza nome',
      widgetPropTab: 'Proprietà di controllo',
      widgetFormTab: 'Proprietà del modulo',
      error: {
        wdFormUni: 'Questo tipo di controllo può aggiungerne solo uno nella forma',
        wdSubUni: 'Questo tipo di controllo può aggiungerne solo uno nella sottotable'
      },
      styleSetting: {
        btn: 'Impostazioni di stile',
        title: 'Impostazioni di stile da forma',
        layoutTitle: 'Layout di controllo',
        verticalLayout: 'Layout superiore e inferiore',
        horizontalLayout: 'Layout orizzontale',
        styleTitle: 'Stile del titolo',
        boldTitle: 'Titolo audace',
        fontBold: 'Grassetto',
        fontNormal: 'convenzionale',
        colonTitle: 'Mostra il colon',
        colonVisible: 'spettacolo',
        colonHidden: 'nascondere',
        alignTitle: 'Allineamento',
        widthTitle: 'Larghezza del titolo',
        alignLeft: 'Sulla sinistra',
        alignRight: 'A destra',
        unitPx: 'Pixel',
        unitPct: 'percentuale'
      },
      widget: {
        group: {
          base: 'Controlli di base',
          layout: 'Controlli di layout',
          system: 'Controlli di sistema',
          module: 'Controlli del modulo',
          chart: 'Controllo del grafico',
          advanced: 'Controlli avanzati'
        },
        copyTitle: 'Copy_ {0}',
        component: {
          input: 'Casella di input',
          textarea: 'Campo di testo',
          select: 'Tira giù per selezionare',
          row: 'Una riga e più colonne',
          title: 'titolo',
          text: 'testo',
          subtable: 'Sotto-tavolo',
          VxeSwitch: 'se',
          VxeInput: 'Casella di input',
          VxeNumberInput: 'numero',
          VxeDatePicker: 'data',
          VxeTextarea: 'Campo di testo',
          VxeSelect: 'Tira giù per selezionare',
          VxeTreeSelect: 'Selezione degli alberi',
          VxeRadioGroup: 'Pulsante di opzione',
          VxeCheckboxGroup: 'Casella di controllo',
          VxeUploadFile: 'documento',
          VxeUploadImage: 'immagine',
          VxeRate: 'punto',
          VxeSlider: 'Slider'
        }
      },
      widgetProp: {
        name: 'Nome del controllo',
        placeholder: 'Richiesta',
        required: 'Verifica richiesta',
        multiple: 'Sono consentite più scelte',
        displaySetting: {
          name: 'Impostazioni di visualizzazione',
          pc: 'PC',
          mobile: 'Mobile',
          visible: 'spettacolo',
          hidden: 'nascondere'
        },
        dataSource: {
          name: 'Fonte di dati',
          defValue: 'Opzione {0}',
          addOption: 'Aggiungi opzioni',
          batchEditOption: 'Editing batch',
          batchEditTip: "Ogni riga corrisponde a un'opzione, che supporta copia e incolla diretta da tabelle, Excel e WPS.",
          batchEditSubTip: "Ogni riga corrisponde a un'opzione. Se si tratta di un gruppo, gli elementi figlio possono iniziare con uno spazio o un tasto TAB e supporta copia e incolla diretta da tabelle, Excel e WPS.",
          buildOption: 'Opzioni di costruzione'
        },
        rowProp: {
          colSize: 'Numero di colonne',
          col2: 'Due colonne',
          col3: 'Tre colonne',
          col4: 'Quattro colonne',
          col6: 'Sei colonne',
          layout: 'disposizione'
        },
        textProp: {
          name: 'contenuto',
          alignTitle: 'Allineamento',
          alignLeft: 'Sulla sinistra',
          alignCenter: 'Centro',
          alignRight: 'A destra',
          colorTitle: 'Colore del carattere',
          sizeTitle: 'Dimensione del carattere',
          boldTitle: 'Carattere audace',
          fontNormal: 'convenzionale',
          fontBold: 'Grassetto'
        },
        subtableProp: {
          seqTitle: 'Numero di serie',
          showSeq: 'Mostra il numero di serie',
          showCheckbox: 'Sono consentite più scelte',
          errSubDrag: 'La sottotable non supporta questo controllo, utilizza altri controlli',
          colPlace: 'Trascina il controllo'
        },
        uploadProp: {
          limitFileCount: 'Limite di quantità di file',
          limitFileSize: 'Limite di dimensioni del file',
          multiFile: 'Consenti di caricare più file',
          limitImgCount: 'Limite il numero di immagini',
          limitImgSize: "Limite di dimensione dell'immagine",
          multiImg: 'Consenti a più immagini di caricare'
        }
      }
    },
    listDesign: {
      fieldSettingTab: 'Impostazioni sul campo',
      listSettingTab: 'Impostazioni dei parametri',
      searchTitle: 'Criteri di query',
      listTitle: 'Campo elenco',
      searchField: 'Campi di query',
      listField: 'Campo elenco',
      activeBtn: {
        ActionButtonUpdate: 'modificare',
        ActionButtonDelete: 'eliminare'
      },
      search: {
        addBtn: 'modificare',
        emptyText: 'Condizioni di query non configurate',
        editPopupTitle: 'Modifica campi di query'
      },
      searchPopup: {
        colTitle: 'titolo',
        saveBtn: 'salva'
      }
    },
    text: {
      copySuccess: 'Copiato negli appunti',
      copyError: "L'ambiente attuale non supporta questa operazione"
    },
    countdown: {
      formats: {
        yyyy: 'Anno',
        MM: 'luna',
        dd: 'cielo',
        HH: 'ora',
        mm: 'punto',
        ss: 'Secondo'
      }
    },
    plugins: {
      extendCellArea: {
        area: {
          mergeErr: 'Questa operazione non può essere eseguita su celle unite',
          multiErr: 'Questa operazione non può essere eseguita su più aree di selezione',
          selectErr: "Impossibile operare su celle nell'intervallo specificato",
          extendErr: "Se l'intervallo esteso contiene celle unite, tutte le celle unite devono avere le stesse dimensioni",
          pasteMultiErr: 'Incapace di incollare, le aree copiate e incollate devono essere delle stesse dimensioni per eseguire questa operazione',
          cpInvalidErr: "L'operazione non può essere eseguita. Esistono colonne proibite ({0}) nell'intervallo selezionato."
        },
        fnr: {
          title: 'Trova e sostituisci',
          findLabel: 'Trovare',
          replaceLabel: 'sostituire',
          findTitle: 'Trova cosa:',
          replaceTitle: 'Sostituire con:',
          tabs: {
            find: 'Trovare',
            replace: 'sostituire'
          },
          filter: {
            re: 'Espressioni regolari',
            whole: 'Corrispondenza di parole complete',
            sensitive: 'maiuscole e minuscole'
          },
          btns: {
            findNext: 'Trova il prossimo',
            findAll: 'Trova tutto',
            replace: 'sostituire',
            replaceAll: 'Sostituire tutto',
            cancel: 'Cancellare'
          },
          header: {
            seq: '#',
            cell: 'Cella',
            value: 'valore'
          },
          body: {
            row: 'Riga: {0}',
            col: 'Colonna: {0}'
          },
          empty: '(Valore null)',
          reError: 'Espressione regolare non valida',
          recordCount: '{0} celle trovate',
          notCell: 'La cella corrispondente non può essere trovata',
          replaceSuccess: 'Sostituire correttamente le celle {0}'
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
          fixedColumn: 'Colonna di congelamento',
          fixedGroup: 'Gruppo di congelamento',
          cancelFixed: 'Scongelare',
          fixedLeft: 'Freeze a sinistra',
          fixedRight: 'Freeze Right'
        },
        cases: {
          equal: 'pari',
          gt: 'Maggiore di',
          lt: 'Meno di',
          begin: "L'inizio è",
          endin: 'La fine è',
          include: 'Includere',
          isSensitive: 'maiuscole e minuscole'
        }
      },
      filterCombination: {
        menus: {
          sort: 'Ordinare',
          clearSort: 'Ordine chiara',
          sortAsc: 'Ordine ascendente',
          sortDesc: 'ordine discendente',
          fixedColumn: 'Colonna di congelamento',
          fixedGroup: 'Gruppo di congelamento',
          cancelFixed: 'Scongelare',
          fixedLeft: 'Freeze a sinistra',
          fixedRight: 'Freeze Right',
          clearFilter: 'Filtro chiaro',
          textOption: 'Filtro di testo',
          numberOption: 'Filtro numerico'
        },
        popup: {
          title: 'Metodi di filtraggio personalizzati',
          currColumnTitle: 'Colonna corrente:',
          and: 'E',
          or: 'O',
          describeHtml: 'Disponibile? Rappresenta un singolo carattere <br/> usa * rappresenta più caratteri'
        },
        cases: {
          equal: 'pari',
          unequal: 'Non uguale a',
          gt: 'Maggiore di',
          ge: 'Maggiore o uguale a',
          lt: 'Meno di',
          le: 'Meno o uguale a',
          begin: "L'inizio è",
          notbegin: "Non è all'inizio",
          endin: 'La fine è',
          notendin: 'Il finale non lo è',
          include: 'Includere',
          exclude: 'Non incluso',
          between: 'Fra',
          custom: 'Filtro personalizzato',
          insensitive: 'Caso insensibile',
          isSensitive: 'maiuscole e minuscole'
        },
        empty: '(vuoto)',
        notData: 'Nessuna corrispondenza'
      }
    },
    pro: {
      area: {
        mergeErr: 'Questa operazione non può essere eseguita su celle unite',
        multiErr: 'Questa operazione non può essere eseguita su più aree di selezione',
        extendErr: "Se l'intervallo esteso contiene celle unite, tutte le celle unite devono avere le stesse dimensioni",
        pasteMultiErr: 'Incapace di incollare, le aree copiate e incollate devono essere delle stesse dimensioni per eseguire questa operazione'
      },
      fnr: {
        title: 'Trova e sostituisci',
        findLabel: 'Trovare',
        replaceLabel: 'sostituire',
        findTitle: 'Trova il contenuto:',
        replaceTitle: 'Sostituire con:',
        tabs: {
          find: 'Trovare',
          replace: 'sostituire'
        },
        filter: {
          re: 'Espressioni regolari',
          whole: 'Corrispondenza di parole complete',
          sensitive: 'maiuscole e minuscole'
        },
        btns: {
          findNext: 'Trova il prossimo',
          findAll: 'Trova tutto',
          replace: 'sostituire',
          replaceAll: 'Sostituire tutto',
          cancel: 'Cancellare'
        },
        header: {
          seq: '#',
          cell: 'Cella',
          value: 'valore'
        },
        empty: '(Valore null)',
        reError: 'Espressione regolare non valida',
        recordCount: '{0} celle trovate',
        notCell: 'Nessuna cellula corrispondente trovata',
        replaceSuccess: 'Sostituire correttamente le celle {0}'
      }
    },
    renderer: {
      search: 'ricerca',
      cases: {
        equal: 'pari',
        unequal: 'Non uguale a',
        gt: 'Maggiore di',
        ge: 'Maggiore o uguale a',
        lt: 'Meno di',
        le: 'Meno o uguale a',
        begin: "L'inizio è",
        notbegin: "Non è all'inizio",
        endin: 'La fine è',
        notendin: 'Il finale non lo è',
        include: 'Includere',
        exclude: 'Non incluso',
        between: 'Fra',
        custom: 'Filtro personalizzato',
        insensitive: 'Caso insensibile',
        isSensitive: 'maiuscole e minuscole'
      },
      combination: {
        menus: {
          sort: 'Ordinare',
          clearSort: 'Ordine chiara',
          sortAsc: 'Ordine ascendente',
          sortDesc: 'ordine discendente',
          fixedColumn: 'Colonna di congelamento',
          fixedGroup: 'Gruppo di congelamento',
          cancelFixed: 'Scongelare',
          fixedLeft: 'Freeze a sinistra',
          fixedRight: 'Freeze Right',
          clearFilter: 'Filtro chiaro',
          textOption: 'Filtro di testo',
          numberOption: 'Filtro numerico'
        },
        popup: {
          title: 'Metodi di filtraggio personalizzati',
          currColumnTitle: 'Colonna corrente:',
          and: 'E',
          or: 'O',
          describeHtml: 'Disponibile? Rappresenta un singolo carattere <br/> usa * rappresenta più caratteri'
        },
        empty: '(vuoto)',
        notData: 'Nessuna corrispondenza'
      }
    }
  }
}
