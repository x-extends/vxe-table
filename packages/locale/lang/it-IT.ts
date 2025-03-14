export default {
  vxe: {
    base: {
      pleaseInput: 'Per favore entra',
      pleaseSelect: 'Seleziona',
      comma: '，',
      fullStop: '。'
    },
    loading: {
      text: 'caricamento...'
    },
    error: {
      downErr: 'Download non riuscito',
      errLargeData: '当绑定的数据量过大时，应该请使用 {0}，否则可能会出现卡顿',
      groupFixed: 'Se si utilizzano intestazioni di gruppo, le colonne bloccate devono essere impostate per gruppo',
      groupMouseRange: "L'intestazione del gruppo e \"{0}\" non possono essere utilizzate contemporaneamente, il che potrebbe causare un errore.",
      groupTag: 'Le intestazioni delle colonne di raggruppamento devono utilizzare "{0}" anziché "{1}", il che potrebbe causare errori',
      scrollErrProp: 'Il parametro "{0}" non è supportato quando è abilitato lo scorrimento virtuale',
      errConflicts: 'I parametri "{0}" sono in conflitto con "{1}"',
      notSupportProp: '当启用参数 "{0}" 时不支持 "{1}"，应该为 "{2}"，否则将会出现错误',
      unableInsert: 'Impossibile inserire nella posizione specificata, verificare se i parametri sono corretti',
      useErr: "Si è verificato un errore durante l'installazione del modulo \"{0}\". L'ordine potrebbe essere errato. I moduli dipendenti devono essere installati prima della Tabella.",
      barUnableLink: 'La barra degli strumenti non può essere associata alla tabella',
      expandContent: 'Lo spazio per espandere la riga dovrebbe essere "contenuto", controlla se è corretto',
      reqComp: 'Manca il componente "{0}", controlla se è installato correttamente. https://vxeui.com/#/start/useGlobal',
      reqModule: 'Modulo "{0}" mancante',
      reqProp: 'Manca il parametro "{0}" richiesto, il che potrebbe causare un errore',
      emptyProp: 'Il parametro "{0}" non può essere vuoto',
      errProp: 'Parametro non supportato "{0}", possibile "{1}"',
      colRepet: 'colonna.{0}="{1}" viene ripetuta, il che potrebbe rendere inutilizzabili alcune funzioni',
      notFunc: 'Il metodo "{0}" non esiste',
      errFunc: 'Il parametro "{0}" non è un metodo',
      notValidators: 'Il controllo globale "{0}" non esiste',
      notFormats: 'Il formato globale "{0}" non esiste',
      notCommands: 'La direttiva globale "{0}" non esiste',
      notSlot: 'Lo slot "{0}" non esiste',
      noTree: 'La struttura ad albero non supporta "{0}"',
      notProp: 'Parametro non supportato "{0}"',
      checkProp: 'Quando la quantità di dati è troppo grande, la casella di controllo potrebbe bloccarsi. Si consiglia di impostare il parametro "{0}" per migliorare la velocità di rendering.',
      coverProp: 'Il parametro "{1}" di "{0}" è definito ripetutamente, il che potrebbe causare un errore.',
      uniField: 'Il nome del campo "{0}" è definito ripetutamente, il che potrebbe causare un errore',
      repeatKey: 'Chiave primaria duplicata {0}="{1}", ciò potrebbe causare un errore',
      delFunc: 'Il metodo "{0}" è obsoleto, utilizza "{1}"',
      delProp: 'Il parametro "{0}" è obsoleto, utilizza "{1}"',
      delEvent: "L'evento \"{0}\" è obsoleto, utilizza \"{1}\"",
      removeProp: 'Il parametro "{0}" è obsoleto, non è consigliato e potrebbe causare errori',
      errFormat: 'Il contenuto di formattazione globale deve essere definito utilizzando "VXETable.formats". Il metodo di montaggio "formatter={0}" non è più consigliato.',
      notType: 'Tipo di file non supportato "{0}"',
      notExp: 'Questo browser non supporta la funzionalità di importazione/esportazione',
      impFields: 'Importazione non riuscita, controlla se il nome del campo e il formato dei dati sono corretti',
      treeNotImp: "Le tabelle dell'albero non supportano l'importazione",
      treeCrossDrag: 'È possibile trascinare solo il primo livello',
      treeDragChild: 'Un genitore non può essere trascinato nei propri figli',
      reqPlugin: '扩展插件未安装 "{1}" https://vxeui.com/other{0}/#/{1}/install'
    },
    table: {
      emptyText: 'Nessun dato ancora',
      allTitle: 'Seleziona tutto/Annulla',
      seqTitle: 'numero di serie',
      actionTitle: 'operare',
      confirmFilter: 'filtro',
      resetFilter: 'reset',
      allFilter: 'Tutto',
      sortAsc: 'Ordine crescente: dal più basso al più alto',
      sortDesc: 'Ordine decrescente: dal più alto al più basso',
      filter: 'Abilita il filtraggio sulle colonne selezionate',
      impSuccess: '{0} record importati correttamente',
      expLoading: 'Esportazione',
      expSuccess: 'Esportazione riuscita',
      expError: 'Esportazione non riuscita',
      expFilename: 'Esporta_{0}',
      expOriginFilename: 'export_source_{0}',
      customTitle: 'Impostazioni della colonna',
      customAll: 'Tutto',
      customConfirm: 'confermare',
      customClose: 'chiusura',
      customCancel: 'Cancellare',
      customRestore: 'Ripristina impostazione predefinita',
      maxFixedCol: 'Il numero massimo di colonne bloccate non può superare {0}',
      dragTip: 'Sposta: {0}',
      resizeColTip: '宽：{0} 像素',
      resizeRowTip: '高：{0} 像素'
    },
    grid: {
      selectOneRecord: 'Seleziona almeno un record!',
      deleteSelectRecord: 'Sei sicuro di voler eliminare i record selezionati?',
      removeSelectRecord: 'Sei sicuro di voler rimuovere i record selezionati?',
      dataUnchanged: 'I dati non sono stati modificati!',
      delSuccess: 'Record selezionati eliminati con successo!',
      saveSuccess: 'Salvato con successo!',
      operError: "Si è verificato un errore e l'operazione non è riuscita!"
    },
    select: {
      search: 'ricerca',
      loadingText: 'caricamento',
      emptyText: 'Nessun dato ancora'
    },
    pager: {
      goto: 'Vai a',
      gotoTitle: 'Numero di pagine',
      pagesize: '{0} elementi/pagina',
      total: 'Totale {0} record',
      pageClassifier: 'Pagina',
      homePage: 'prima pagina',
      homePageTitle: 'prima pagina',
      prevPage: 'Pagina precedente',
      prevPageTitle: 'Pagina precedente',
      nextPage: 'Pagina successiva',
      nextPageTitle: 'Pagina successiva',
      prevJump: 'Salta la pagina in alto',
      prevJumpTitle: 'Salta la pagina in alto',
      nextJump: 'Salta la pagina verso il basso',
      nextJumpTitle: 'Salta la pagina verso il basso',
      endPage: 'Ultima pagina',
      endPageTitle: 'Ultima pagina'
    },
    alert: {
      title: 'Richiesta di sistema'
    },
    button: {
      confirm: 'confermare',
      cancel: 'Cancellare',
      clear: '清除'
    },
    filter: {
      search: 'ricerca'
    },
    custom: {
      cstmTitle: 'Impostazioni della colonna',
      cstmRestore: 'Ripristina impostazione predefinita',
      cstmCancel: 'Cancellare',
      cstmConfirm: 'Sicuro',
      cstmConfirmRestore: 'Confermare se ripristinare la configurazione predefinita della colonna?',
      cstmDragTarget: 'Sposta: {0}',
      setting: {
        colSort: 'ordinare',
        sortHelpTip: "Fare clic e trascinare l'icona per regolare l'ordine delle colonne",
        colTitle: 'Intestazione di colonna',
        colResizable: 'Larghezza colonna (pixel)',
        colVisible: 'Se visualizzare',
        colFixed: 'Blocca colonne',
        colFixedMax: 'Blocca colonne (fino a {0} colonne)',
        fixedLeft: 'lato sinistro',
        fixedUnset: 'Non impostato',
        fixedRight: 'lato destro'
      }
    },
    import: {
      modes: {
        covering: 'Metodo di sovrascrittura (sovrascrivi direttamente i dati della tabella)',
        insert: 'Aggiungi in fondo (aggiungi nuovi dati in fondo alla tabella)',
        insertTop: 'Aggiungi in alto (aggiungi nuovi dati nella parte superiore della tabella)',
        insertBottom: 'Aggiungi in fondo (aggiungi nuovi dati in fondo alla tabella)'
      },
      impTitle: 'Importa dati',
      impFile: 'nome del file',
      impSelect: 'Seleziona file',
      impType: 'Tipo di file',
      impOpts: 'Impostazioni dei parametri',
      impMode: 'modalità di importazione',
      impConfirm: 'importare',
      impCancel: 'Cancellare'
    },
    export: {
      types: {
        csv: 'CSV (separati da virgole)(*.csv)',
        html: 'Pagina Web (*.html)',
        xml: 'Dati XML (*.xml)',
        txt: 'File di testo (delimitato da tabulazioni) (*.txt)',
        xls: 'Cartella di lavoro di Excel 97-2003 (*.xls)',
        xlsx: 'Cartella di lavoro di Excel (*.xlsx)',
        pdf: 'PDF (*.pdf)'
      },
      modes: {
        empty: '空数据',
        current: 'Dati attuali (dati della pagina corrente)',
        selected: 'Dati selezionati (dati selezionati nella pagina corrente)',
        all: 'Dati completi (compresi tutti i dati impaginati)'
      },
      printTitle: 'Stampa dati',
      expTitle: 'Esporta dati',
      expName: 'nome del file',
      expNamePlaceholder: 'Inserisci un nome file',
      expSheetName: 'titolo',
      expSheetNamePlaceholder: 'Inserisci un titolo',
      expType: 'salva tipo',
      expMode: 'Seleziona i dati',
      expCurrentColumn: 'Tutti i campi',
      expColumn: 'Seleziona campo',
      expOpts: 'Impostazioni dei parametri',
      expOptHeader: 'Intestazione',
      expHeaderTitle: "È necessaria un'intestazione?",
      expOptFooter: 'fine del tavolo',
      expFooterTitle: 'È necessario un piè di pagina della tabella?',
      expOptColgroup: 'Intestazione del gruppo',
      expColgroupTitle: 'Se presenti, sono supportate intestazioni con strutture di raggruppamento',
      expOptMerge: 'unire',
      expMergeTitle: 'Supporta celle con strutture di unione, se presenti',
      expOptAllExpand: 'Espandi il livello',
      expAllExpandTitle: "Se esiste, supporta l'espansione di tutti i dati con una struttura gerarchica.",
      expOptUseStyle: 'stile',
      expUseStyleTitle: 'Le celle con stile sono supportate se presenti',
      expOptOriginal: 'dati di origine',
      expOriginalTitle: "Se si tratta di dati di origine, supporta l'importazione nella tabella",
      expPrint: 'Stampa',
      expConfirm: 'Esportare',
      expCancel: 'Cancellare'
    },
    modal: {
      errTitle: 'Messaggio di errore',
      zoomMin: 'minimizzare',
      zoomIn: 'massimizzare',
      zoomOut: 'riduzione',
      close: 'chiusura',
      miniMaxSize: 'Il numero di finestre ridotte a icona non può superare {0}',
      footPropErr: 'show-footer viene utilizzato solo per abilitare il piè di pagina della tabella e deve essere utilizzato con lo slot show-confirm-button |'
    },
    drawer: {
      close: 'chiusura'
    },
    form: {
      folding: 'vicino',
      unfolding: 'Espandere'
    },
    toolbar: {
      import: 'importare',
      export: 'Esportare',
      print: 'Stampa',
      refresh: 'aggiornare',
      zoomIn: 'a schermo intero',
      zoomOut: 'riduzione',
      custom: 'Impostazioni della colonna',
      customAll: 'Tutto',
      customConfirm: 'confermare',
      customRestore: 'reset',
      fixedLeft: 'congelato a sinistra',
      fixedRight: 'congelato a destra',
      cancelFixed: 'Sblocca colonna'
    },
    datePicker: {
      yearTitle: '{0} anni'
    },
    input: {
      date: {
        m1: 'Gennaio',
        m2: 'Febbraio',
        m3: 'Marzo',
        m4: 'aprile',
        m5: 'Maggio',
        m6: '06 giugno',
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
          w: 'settimana',
          w0: 'Domenica',
          w1: 'di lunedi',
          w2: 'Martedì',
          w3: 'Mercoledì',
          w4: 'Giovedì',
          w5: 'Venerdì',
          w6: 'Sabato'
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
          q1: 'primo trimestre',
          q2: 'secondo trimestre',
          q3: 'terzo trimestre',
          q4: 'quarto trimestre'
        }
      }
    },
    numberInput: {
      currencySymbol: '￥'
    },
    imagePreview: {
      popupTitle: 'Anteprima',
      operBtn: {
        zoomOut: 'rimpicciolire',
        zoomIn: 'ingrandire',
        pctFull: 'ridimensionamento proporzionale',
        pct11: 'Mostra la dimensione originale',
        rotateLeft: 'Ruota a sinistra',
        rotateRight: 'Ruota a destra',
        print: "Fare clic per stampare l'immagine",
        download: "Fare clic per scaricare l'immagine"
      }
    },
    upload: {
      fileBtnText: 'Fare clic o trascinare per caricare',
      imgBtnText: 'Fare clic o trascinare per caricare',
      dragPlaceholder: "Trascina e rilascia il file in quest'area per caricarlo",
      imgSizeHint: 'Volantino {0}',
      imgCountHint: 'Massimo {0} immagini',
      fileTypeHint: 'Tipi di file {0} supportati',
      fileSizeHint: 'La dimensione di un singolo file non supera {0}',
      fileCountHint: 'È possibile caricare fino a {0} file',
      uploadTypeErr: 'Tipo di file non corrispondente!',
      overCountErr: 'È possibile selezionare solo {0} file!',
      overCountExtraErr: 'Il numero massimo di {0} file è stato superato. I {1} file in eccesso verranno ignorati!',
      overSizeErr: 'La dimensione massima del file non può superare {0}!',
      reUpload: 'Ricarica',
      uploadProgress: 'Caricamento {0}%',
      uploadErr: 'Caricamento non riuscito',
      uploadSuccess: 'Caricamento riuscito',
      moreBtnText: 'Altro ({0})',
      viewItemTitle: 'Fare clic per visualizzare',
      morePopup: {
        readTitle: 'Visualizza elenco',
        imageTitle: 'Carica immagini',
        fileTitle: 'Carica file'
      }
    },
    empty: {
      defText: 'Nessun dato ancora'
    },
    colorPicker: {
      clear: 'Chiaro',
      confirm: 'confermare',
      copySuccess: 'Copiato negli appunti: {0}'
    },
    formDesign: {
      formName: 'nome del modulo',
      defFormTitle: 'forma senza nome',
      widgetPropTab: 'Proprietà di controllo',
      widgetFormTab: 'proprietà del modulo',
      error: {
        wdFormUni: 'È consentito aggiungere al modulo un solo controllo di questo tipo',
        wdSubUni: 'È consentito aggiungere un solo controllo di questo tipo alla sottotabella'
      },
      styleSetting: {
        btn: 'Impostazioni di stile',
        title: 'Impostazioni dello stile del modulo',
        layoutTitle: 'Disposizione di controllo',
        verticalLayout: 'Disposizione superiore e inferiore',
        horizontalLayout: 'Disposizione orizzontale',
        styleTitle: 'Stile del titolo',
        boldTitle: 'Titolo in grassetto',
        fontBold: 'Grassetto',
        fontNormal: 'convenzionale',
        colonTitle: 'Mostra due punti',
        colonVisible: 'spettacolo',
        colonHidden: 'nascondere',
        alignTitle: 'Allineamento',
        widthTitle: 'larghezza del titolo',
        alignLeft: 'Sulla sinistra',
        alignRight: 'A destra',
        unitPx: 'Pixel',
        unitPct: 'percentuale'
      },
      widget: {
        group: {
          base: 'Controlli di base',
          layout: 'Controlli del layout',
          system: 'Controlli di sistema',
          module: 'controllo del modulo',
          chart: 'controllo grafico',
          advanced: 'Controlli avanzati'
        },
        copyTitle: 'Copia_{0}',
        component: {
          input: 'Casella di immissione',
          textarea: 'campo di testo',
          select: 'selezione a discesa',
          row: 'Una riga e più colonne',
          title: 'titolo',
          text: 'testo',
          subtable: 'Sottotabella',
          VxeSwitch: 'se',
          VxeInput: 'Casella di immissione',
          VxeNumberInput: 'numero',
          VxeDatePicker: 'data',
          VxeTextarea: 'campo di testo',
          VxeSelect: 'selezione a discesa',
          VxeTreeSelect: "selezione dell'albero",
          VxeRadioGroup: 'pulsante di opzione',
          VxeCheckboxGroup: 'casella di controllo',
          VxeUploadFile: 'documento',
          VxeUploadImage: 'immagine',
          VxeRate: 'punto',
          VxeSlider: 'cursore'
        }
      },
      widgetProp: {
        name: 'Nome del controllo',
        placeholder: 'richiesta',
        required: 'Verifica richiesta',
        multiple: 'Consenti selezioni multiple',
        displaySetting: {
          name: 'impostazioni di visualizzazione',
          pc: 'computer',
          mobile: 'Versione mobile',
          visible: 'spettacolo',
          hidden: 'nascondere'
        },
        dataSource: {
          name: 'fonte dati',
          defValue: 'Opzione {0}',
          addOption: 'Aggiungi opzioni',
          batchEditOption: 'Modifica in batch',
          batchEditTip: "Ogni riga corrisponde a un'opzione e supporta il copia e incolla direttamente da tabelle, Excel e WPS.",
          batchEditSubTip: "Ogni riga corrisponde a un'opzione. Se si tratta di un gruppo, gli elementi secondari possono iniziare con uno spazio o un tasto tab. È supportata la copia e incolla diretta da tabelle.",
          buildOption: 'Opzioni di creazione'
        },
        rowProp: {
          colSize: 'Numero di colonne',
          col2: 'due colonne',
          col3: 'tre colonne',
          col4: 'quattro colonne',
          col6: 'sei colonne',
          layout: 'disposizione'
        },
        textProp: {
          name: 'contenuto',
          alignTitle: 'Allineamento',
          alignLeft: 'Sulla sinistra',
          alignCenter: 'centro',
          alignRight: 'A destra',
          colorTitle: 'Colore del carattere',
          sizeTitle: 'dimensione del carattere',
          boldTitle: 'Carattere grassetto',
          fontNormal: 'convenzionale',
          fontBold: 'Grassetto'
        },
        subtableProp: {
          seqTitle: 'numero di serie',
          showSeq: 'Visualizza il numero di serie',
          showCheckbox: 'Consenti selezioni multiple',
          errSubDrag: 'La sottotabella non supporta questo controllo, utilizza altri controlli',
          colPlace: "Trascina il controllo verso l'interno"
        },
        uploadProp: {
          limitFileCount: 'Limite di quantità di file',
          limitFileSize: 'Limite della dimensione del file',
          multiFile: 'Consenti più caricamenti di file',
          limitImgCount: 'Limite di quantità di immagini',
          limitImgSize: 'Limite dimensione immagine',
          multiImg: 'Consenti il ​​caricamento di più immagini'
        }
      }
    },
    listDesign: {
      fieldSettingTab: 'Impostazioni sul campo',
      listSettingTab: 'Impostazioni dei parametri',
      searchTitle: 'Condizioni di interrogazione',
      listTitle: 'campo elenco',
      searchField: 'Campo di interrogazione',
      listField: 'campo elenco',
      activeBtn: {
        ActionButtonUpdate: 'modificare',
        ActionButtonDelete: 'eliminare'
      },
      search: {
        addBtn: 'modificare',
        emptyText: 'Nessuna condizione di query configurata',
        editPopupTitle: 'Modifica i campi della query'
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
          selectErr: "Impossibile operare sulle celle nell'intervallo specificato",
          extendErr: "Se l'intervallo esteso contiene celle unite, tutte le celle unite devono avere la stessa dimensione",
          pasteMultiErr: 'Impossibile incollare, le aree copiate e incollate devono avere le stesse dimensioni per eseguire questa operazione',
          cpInvalidErr: "Impossibile eseguire l'operazione. Sono presenti colonne vietate ({0}) nell'intervallo selezionato."
        },
        fnr: {
          title: 'Trova e sostituisci',
          findLabel: 'Trovare',
          replaceLabel: 'sostituire',
          findTitle: 'Trova cosa:',
          replaceTitle: 'Sostituisci con:',
          tabs: {
            find: 'Trovare',
            replace: 'sostituire'
          },
          filter: {
            re: 'espressione regolare',
            whole: 'corrispondenza di parole intere',
            sensitive: 'maiuscole e minuscole'
          },
          btns: {
            findNext: 'Trova successivo',
            findAll: 'Trova tutto',
            replace: 'sostituire',
            replaceAll: 'Sostituisci tutto',
            cancel: 'Cancellare'
          },
          header: {
            seq: '#',
            cell: 'cella',
            value: 'valore'
          },
          body: {
            row: 'Riga: {0}',
            col: 'Colonna: {0}'
          },
          empty: '(valore nullo)',
          reError: 'Espressione regolare non valida',
          recordCount: '{0} celle trovate',
          notCell: 'Nessuna cella corrispondente trovata',
          replaceSuccess: 'Sostituite {0} celle con successo'
        }
      },
      filterComplexInput: {
        menus: {
          fixedColumn: 'Blocca colonne',
          fixedGroup: 'gruppo di congelamento',
          cancelFixed: 'Scongelare',
          fixedLeft: 'congelare a sinistra',
          fixedRight: 'congelare bene'
        },
        cases: {
          equal: 'pari',
          gt: 'maggiore di',
          lt: 'meno di',
          begin: "L'inizio è",
          endin: 'La fine è',
          include: 'Includi',
          isSensitive: 'maiuscole e minuscole'
        }
      },
      filterCombination: {
        menus: {
          sort: '排序',
          clearSort: 'Ordinamento chiaro',
          sortAsc: 'Ordine crescente',
          sortDesc: 'ordine decrescente',
          fixedColumn: 'Blocca colonne',
          fixedGroup: 'gruppo di congelamento',
          cancelFixed: 'Scongelare',
          fixedLeft: 'congelare a sinistra',
          fixedRight: 'congelare bene',
          clearFilter: 'Cancella filtri',
          textOption: 'filtro testo',
          numberOption: 'filtro numerico'
        },
        popup: {
          title: 'Come personalizzare il filtraggio',
          currColumnTitle: 'Colonna corrente:',
          and: 'E',
          or: 'O',
          describeHtml: 'Disponibile ? rappresenta un singolo carattere<br/>Utilizzare * per rappresentare un numero qualsiasi di caratteri'
        },
        cases: {
          equal: 'pari',
          unequal: 'non uguale a',
          gt: 'maggiore di',
          ge: 'maggiore o uguale a',
          lt: 'meno di',
          le: 'inferiore o uguale a',
          begin: "L'inizio è",
          notbegin: "Non all'inizio",
          endin: 'La fine è',
          notendin: 'Il finale no',
          include: 'Includi',
          exclude: 'Non incluso',
          between: 'fra',
          custom: 'Filtro personalizzato',
          insensitive: 'Non fa distinzione tra maiuscole e minuscole',
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
        extendErr: "Se l'intervallo esteso contiene celle unite, tutte le celle unite devono avere la stessa dimensione",
        pasteMultiErr: 'Impossibile incollare, le aree copiate e incollate devono avere le stesse dimensioni per eseguire questa operazione'
      },
      fnr: {
        title: 'Trova e sostituisci',
        findLabel: 'Trovare',
        replaceLabel: 'sostituire',
        findTitle: 'Trova cosa:',
        replaceTitle: 'Sostituisci con:',
        tabs: {
          find: 'Trovare',
          replace: 'sostituire'
        },
        filter: {
          re: 'espressione regolare',
          whole: 'corrispondenza di parole intere',
          sensitive: 'maiuscole e minuscole'
        },
        btns: {
          findNext: 'Trova successivo',
          findAll: 'Trova tutto',
          replace: 'sostituire',
          replaceAll: 'Sostituisci tutto',
          cancel: 'Cancellare'
        },
        header: {
          seq: '#',
          cell: 'cella',
          value: 'valore'
        },
        empty: '(valore nullo)',
        reError: 'Espressione regolare non valida',
        recordCount: '{0} celle trovate',
        notCell: 'Nessuna cella corrispondente trovata',
        replaceSuccess: 'Sostituite {0} celle con successo'
      }
    },
    renderer: {
      search: 'ricerca',
      cases: {
        equal: 'pari',
        unequal: 'non uguale a',
        gt: 'maggiore di',
        ge: 'maggiore o uguale a',
        lt: 'meno di',
        le: 'inferiore o uguale a',
        begin: "L'inizio è",
        notbegin: "Non all'inizio",
        endin: 'La fine è',
        notendin: 'Il finale no',
        include: 'Includi',
        exclude: 'Non incluso',
        between: 'fra',
        custom: 'Filtro personalizzato',
        insensitive: 'Non fa distinzione tra maiuscole e minuscole',
        isSensitive: 'maiuscole e minuscole'
      },
      combination: {
        menus: {
          sort: '排序',
          clearSort: 'Ordinamento chiaro',
          sortAsc: 'Ordine crescente',
          sortDesc: 'ordine decrescente',
          fixedColumn: 'Blocca colonne',
          fixedGroup: 'gruppo di congelamento',
          cancelFixed: 'Scongelare',
          fixedLeft: 'congelare a sinistra',
          fixedRight: 'congelare a destra',
          clearFilter: 'Cancella filtri',
          textOption: 'filtro testo',
          numberOption: 'filtro numerico'
        },
        popup: {
          title: 'Come personalizzare il filtraggio',
          currColumnTitle: 'Colonna corrente:',
          and: 'E',
          or: 'O',
          describeHtml: 'Disponibile ? rappresenta un singolo carattere<br/>Utilizzare * per rappresentare un numero qualsiasi di caratteri'
        },
        empty: '(vuoto)',
        notData: 'Nessuna corrispondenza'
      }
    }
  }
}
