export default {
  vxe: {
    base: {
      pleaseInput: 'Vennligst skriv inn',
      pleaseSelect: 'Velg',
      comma: '，',
      fullStop: '。'
    },
    loading: {
      text: 'Laster ...'
    },
    error: {
      downErr: 'Nedlasting mislyktes',
      errLargeData: 'Når mengden bundne data er for stor, kan du bruke {0}, ellers kan det forårsake etterslep',
      groupFixed: 'Hvis du bruker grupperte overskrifter, må den frosne kolonnen settes av Group',
      groupMouseRange: 'Grupperingsoverskriften kan ikke brukes samtidig som "{0}", og dette kan forårsake en feil',
      groupTag: 'Gruppering av kolonneoverskrifter bør bruke "{0}" i stedet for "{1}", som kan forårsake feil',
      scrollErrProp: 'Denne parameteren "{0}" støttes ikke etter at virtuell rulling er aktivert',
      errConflicts: 'Parameter "{0}" Konflikter med "{1}"',
      modelConflicts: '绑定的字段值 "{0}" 与 "{1}" 存在冲突，将会出现错误',
      notSupportProp: '"{1}" støttes ikke når parameteren "{0}" er aktivert, den skal være "{2}", ellers vil det oppstå en feil',
      notConflictProp: 'Når du bruker "{0}", "{1}" skal settes, ellers kan det være funksjonelle konflikter',
      unableInsert: 'Kan ikke settes inn på det spesifiserte stedet, vennligst sjekk om parametrene er riktige',
      useErr: 'En feil oppstod mens du installerte "{0}" -modulen. Bestillingen kan være feil. Den avhengige modulen må installeres før tabellen',
      barUnableLink: 'Verktøylinjen kan ikke knytte bord',
      expandContent: 'Sporet for den utvidede linjen skal være "innhold", sjekk om det er riktig',
      reqComp: '"{0}" -komponenten mangler, vennligst sjekk om den er installert riktig. https://vxeui.com/#/start/usglobal',
      reqModule: 'Mangler "{0}" -modul',
      reqProp: 'Den nødvendige "{0}" -parameteren mangler, noe som kan forårsake en feil',
      emptyProp: 'Parameter "{0}" har ikke lov til å være tom',
      errProp: 'Ikke støttet parameter "{0}", muligens "{1}"',
      colRepet: 'kolonne. {0} = "{1}" gjentas, noe som kan føre til at noen funksjoner blir ubrukelige',
      notFunc: 'Metode "{0}" eksisterer ikke',
      errFunc: 'Parameter "{0}" er ikke en metode',
      notValidators: 'Global verifisering "{0}" eksisterer ikke',
      notFormats: 'Global formatering "{0}" eksisterer ikke',
      notCommands: 'Det globale direktivet "{0}" eksisterer ikke',
      notSlot: 'Slot "{0}" eksisterer ikke',
      noTree: '"{0}" støttes ikke i trestrukturen',
      noGroup: '数据分组后不支持 "{0}"',
      notProp: 'Ikke støttet parameter "{0}"',
      checkProp: 'Når datavolumet er for stort, kan avmerkingsboksen være stammet. Det anbefales å angi parameteren "{0}" for å forbedre gjengivelseshastigheten',
      coverProp: 'Parameteren "{1}" av "{0}" er gjentatte ganger definert, noe som kan forårsake en feil',
      uniField: 'Feltnavnet "{0}" er gjentatte ganger definert, noe som kan forårsake en feil',
      repeatKey: 'Gjenta den primære tasten {0} = "{1}", som kan forårsake en feil',
      delFunc: 'Metode "{0}" er utdatert, bruk "{1}"',
      delProp: 'Parameter "{0}" er utdatert, bruk "{1}"',
      delEvent: 'Hendelse "{0}" er utdatert, bruk "{1}"',
      removeProp: 'Parameter "{0}" er utdatert og anbefales ikke, noe som kan forårsake en feil',
      errFormat: 'Globalt formatert innhold skal defineres ved hjelp av "vxetable.formats" og metoden for å montere "formatter = {0}" anbefales ikke lenger.',
      notType: 'Ikke støttet filtype "{0}"',
      notExp: 'Denne nettleseren støtter ikke import/eksportfunksjon',
      impFields: 'Importen mislyktes. Vennligst sjekk om feltnavnet og dataformatet er riktig.',
      treeNotImp: 'Treetabeller støtter ikke import',
      treeCrossDrag: 'Bare dra det første nivået',
      treeDragChild: 'Foreldre kan ikke dra til sine egne barn',
      reqPlugin: '"{1}" er ikke installert på http',
      errMaxRow: 'Overskridende det maksimale støttede datavolumet {0} Rader, dette kan føre til en feil'
    },
    table: {
      emptyText: 'Ingen data ennå',
      allTitle: 'Velg alle/avbryt',
      seqTitle: 'Serienummer',
      actionTitle: 'operere',
      confirmFilter: 'filter',
      resetFilter: 'Tilbakestill',
      allFilter: 'alle',
      sortAsc: 'Stigende orden: lavest til høyest',
      sortDesc: 'Synkende orden: høyest til lavest',
      filter: 'Aktiver filtrering for utvalgte kolonner',
      impSuccess: 'Vellykket importert {0} poster',
      expLoading: 'Eksport',
      expSuccess: 'Eksport vellykket',
      expError: 'Eksporten mislyktes',
      expFilename: 'Eksport_ {0}',
      expOriginFilename: 'Export_source_ {0}',
      customTitle: 'Kolonneinnstillinger',
      customAll: 'alle',
      customConfirm: 'bekrefte',
      customClose: 'Lukking',
      customCancel: 'Kansellere',
      customRestore: 'Gjenopprett standard',
      maxFixedCol: 'Det maksimale antall frosne kolonner kan ikke overstige {0}',
      maxGroupCol: '最大分组字段的数量不能超过 {0} 个',
      dragTip: 'Flytt: {0}',
      resizeColTip: 'Bredde: {0} piksler',
      resizeRowTip: 'Høyde: {0} piksler',
      rowGroupContentTotal: '{0} ({1})'
    },
    grid: {
      selectOneRecord: 'Velg minst en post!',
      deleteSelectRecord: 'Er du sikker på at du vil slette den valgte posten?',
      removeSelectRecord: 'Er du sikker på at du vil fjerne den valgte posten?',
      dataUnchanged: 'Data ikke endret!',
      delSuccess: 'Den valgte posten ble slettet med hell!',
      saveSuccess: 'Spar vellykket!',
      operError: 'Det oppsto en feil og operasjonen mislyktes!'
    },
    select: {
      clear: '清除',
      allChecked: '全选',
      total: '{0} / {1}',
      search: 'søk',
      loadingText: 'lasting',
      emptyText: 'Ingen data ennå',
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
      goto: 'Gå',
      gotoTitle: 'Antall sider',
      pagesize: '{0} elementer/side',
      total: 'Totalt {0} poster',
      pageClassifier: 'Side',
      homePage: 'forsiden',
      homePageTitle: 'forsiden',
      prevPage: 'Forrige side',
      prevPageTitle: 'Forrige side',
      nextPage: 'Neste side',
      nextPageTitle: 'Neste side',
      prevJump: 'Hopp opp siden',
      prevJumpTitle: 'Hopp opp siden',
      nextJump: 'Hopp ned siden',
      nextJumpTitle: 'Hopp ned siden',
      endPage: 'Siste side',
      endPageTitle: 'Siste side'
    },
    alert: {
      title: 'Systemhjul'
    },
    button: {
      confirm: 'bekrefte',
      cancel: 'Kansellere',
      clear: 'Klar'
    },
    filter: {
      search: 'søk'
    },
    custom: {
      cstmTitle: 'Kolonneinnstillinger',
      cstmRestore: 'Gjenopprett standard',
      cstmCancel: 'Kansellere',
      cstmConfirm: 'Sikker',
      cstmConfirmRestore: 'Bekreft om det er gjenopprettet til standardkolonikonfigurasjonen?',
      cstmDragTarget: 'Flytt: {0}',
      setting: {
        colSort: 'Sortere',
        sortHelpTip: '点击并拖动图标可以调整顺序',
        colTitle: 'Kolonnetittel',
        colResizable: 'Kolonnebredde (piksler)',
        colVisible: 'Om du skal vise',
        colFixed: 'Frysekolonne',
        colFixedMax: 'Frys kolonner (opp til {0} kolonner)',
        fixedLeft: 'Venstre side',
        fixedUnset: 'Ikke satt',
        fixedRight: 'Høyre side'
      }
    },
    import: {
      modes: {
        covering: 'Overskrivningsmetode (direkte overskriv tabelldata)',
        insert: 'Legg til nederst (legg til nye data nederst på tabellen)',
        insertTop: 'Legg til øverst (legg til nye data øverst på tabellen)',
        insertBottom: 'Legg til nederst (legg til nye data nederst på tabellen)'
      },
      impTitle: 'Importere data',
      impFile: 'filnavn',
      impSelect: 'Velg fil',
      impType: 'Filtype',
      impOpts: 'Parameterinnstillinger',
      impMode: 'Importmodus',
      impConfirm: 'Import',
      impCancel: 'Kansellere'
    },
    export: {
      types: {
        csv: 'CSV (komma atskilt) (*. CSV)',
        html: 'Webside (*.html)',
        xml: 'XML Data (*.xml)',
        txt: 'Tekstfil (fanen atskilt) (*. Txt)',
        xls: 'Excel 97-2003 arbeidsbok (*.xls)',
        xlsx: 'Excel Workbook (*.xlsx)',
        pdf: 'PDF (*.pdf)'
      },
      modes: {
        empty: 'Tomme data',
        current: 'Gjeldende data (data på den gjeldende siden)',
        selected: 'Valgte data (data valgt på den gjeldende siden)',
        all: 'Full data (inkludert alle sugedata)'
      },
      printTitle: 'Skriv ut data',
      expTitle: 'Eksportdata',
      expName: 'filnavn',
      expNamePlaceholder: 'Vennligst skriv inn et filnavn',
      expSheetName: 'tittel',
      expSheetNamePlaceholder: 'Vennligst skriv inn en tittel',
      expType: 'Lagre type',
      expMode: 'Velg data',
      expCurrentColumn: 'Alle felt',
      expColumn: 'Velg felt',
      expOpts: 'Parameterinnstillinger',
      expOptHeader: 'Header',
      expHeaderTitle: 'Er tabelloverskriften påkrevd',
      expOptFooter: 'Slutten av bordet',
      expFooterTitle: 'Kreves slutten av tabellen?',
      expOptColgroup: 'Grupperingsoverskrift',
      expOptTitle: 'Kolonnetittel',
      expTitleTitle: 'Enten det er kolonnetittelen, ellers vises den som kolonnens feltnavn',
      expColgroupTitle: 'Hvis den er til stede, støttes en overskrift med en grupperingsstruktur',
      expOptMerge: 'fusjonere',
      expMergeTitle: 'Hvis de er til stede, støttes celler med sammenslåtte strukturer',
      expOptAllExpand: 'Utvid treet',
      expAllExpandTitle: 'Hvis det eksisterer, støttes den for å utvide alle data med hierarkiske strukturer',
      expOptUseStyle: 'stil',
      expUseStyleTitle: 'Hvis de er til stede, støttes celler med stil',
      expOptOriginal: 'Kildedata',
      expOriginalTitle: 'Hvis det er kildedata, støttes import til tabeller',
      expPrint: 'Trykk',
      expConfirm: 'Eksport',
      expCancel: 'Kansellere'
    },
    modal: {
      errTitle: 'Feilmelding',
      zoomMin: 'Minimere',
      zoomIn: 'maksimere',
      zoomOut: 'reduksjon',
      close: 'Lukking',
      miniMaxSize: 'Antall minimerte vinduer kan ikke overstige {0}',
      footPropErr: 'Show-foter brukes bare til å aktivere tabellhalen, og må brukes med show-konfirm-Button | Show-Cancel-Button | spor'
    },
    drawer: {
      close: 'Lukking'
    },
    form: {
      folding: 'Lukke',
      unfolding: 'Utvide'
    },
    toolbar: {
      import: 'Import',
      export: 'Eksport',
      print: 'Trykk',
      refresh: 'forfriske',
      zoomIn: 'full skjerm',
      zoomOut: 'reduksjon',
      custom: 'Kolonneinnstillinger',
      customAll: 'alle',
      customConfirm: 'bekrefte',
      customRestore: 'Tilbakestill',
      fixedLeft: 'Frys til venstre',
      fixedRight: 'Frys til høyre',
      cancelFixed: 'Frigjøre'
    },
    datePicker: {
      yearTitle: '{0} år'
    },
    dateRangePicker: {
      pleaseRange: '请选择开始日期与结束日期'
    },
    input: {
      date: {
        m1: 'januar',
        m2: 'februar',
        m3: 'mars',
        m4: 'april',
        m5: 'mai',
        m6: 'juni',
        m7: 'juli',
        m8: 'august',
        m9: 'september',
        m10: 'oktober',
        m11: 'november',
        m12: 'desember',
        quarterLabel: '{0} år',
        monthLabel: '{0} år',
        dayLabel: '{0} år {1}',
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
          w1: 'Man',
          w2: 'Tir',
          w3: 'Ons',
          w4: 'Thu',
          w5: 'Fre',
          w6: 'Lørdag'
        },
        months: {
          m0: 'januar',
          m1: 'februar',
          m2: 'mars',
          m3: 'april',
          m4: 'mai',
          m5: 'juni',
          m6: 'juli',
          m7: 'august',
          m8: 'september',
          m9: 'oktober',
          m10: 'november',
          m11: 'desember'
        },
        quarters: {
          q1: 'Første kvartal',
          q2: 'Andre kvartal',
          q3: 'Tredje kvartal',
          q4: 'Fjerde kvartal'
        }
      }
    },
    numberInput: {
      currencySymbol: '$'
    },
    imagePreview: {
      popupTitle: 'Forhåndsvisning',
      operBtn: {
        zoomOut: 'Krympe',
        zoomIn: 'forstørres',
        pctFull: 'Skalering likt',
        pct11: 'Vis original størrelse',
        rotateLeft: 'Roter til venstre',
        rotateRight: 'Roter til høyre',
        print: 'Klikk for å skrive ut bildet',
        download: 'Klikk for å laste ned bildet'
      }
    },
    upload: {
      fileBtnText: 'Klikk eller dra for å laste opp',
      imgBtnText: 'Klikk eller dra for å laste opp',
      dragPlaceholder: 'Vennligst dra og slipp filen til dette området for å laste opp',
      imgSizeHint: 'Brosjyre {0}',
      imgCountHint: 'Maksimalt {0} bilder',
      fileTypeHint: 'Støtte {0} filtyper',
      fileSizeHint: 'En enkelt filstørrelse overstiger ikke {0}',
      fileCountHint: 'Opptil {0} filer kan lastes opp',
      uploadTypeErr: 'Filtype Mismatch!',
      overCountErr: 'Bare {0} filer kan velges på det meste!',
      overCountExtraErr: 'Det maksimale antallet {0} er overskredet, og overskuddet {1} filer vil bli ignorert!',
      overSizeErr: 'Maksimal filstørrelse kan ikke overstige {0}!',
      manualUpload: '点击上传',
      reUpload: 'Last opp på nytt',
      uploadProgress: 'Last opp {0}%',
      uploadErr: 'Opplasting mislyktes',
      uploadSuccess: 'Last opp vellykket',
      moreBtnText: 'Mer ({0})',
      viewItemTitle: 'Klikk for å se',
      morePopup: {
        readTitle: 'Vis liste',
        imageTitle: 'Last opp bilder',
        fileTitle: 'Last opp fil'
      }
    },
    empty: {
      defText: 'Ingen data ennå'
    },
    colorPicker: {
      clear: 'Klar',
      confirm: 'bekrefte',
      copySuccess: 'Kopiert til utklippstavlen: {0}',
      hex: 'HEX'
    },
    formDesign: {
      formName: 'Formnavn',
      defFormTitle: 'Navnlig form',
      widgetPropTab: 'Kontrollegenskaper',
      widgetFormTab: 'Form egenskaper',
      error: {
        wdFormUni: 'Denne typen kontroll har lov til å legge til bare en i skjemaet',
        wdSubUni: 'Denne typen kontroll har lov til å legge til bare en i subtabelen'
      },
      styleSetting: {
        btn: 'Stilinnstillinger',
        title: 'Form stilinnstillinger',
        layoutTitle: 'Kontrolloppsett',
        verticalLayout: 'Topp- og bunnoppsett',
        horizontalLayout: 'Horisontal layout',
        styleTitle: 'Tittelstil',
        boldTitle: 'Tittelen fet',
        fontBold: 'Fet',
        fontNormal: 'konvensjonell',
        colonTitle: 'Vis kolon',
        colonVisible: 'vise',
        colonHidden: 'gjemme',
        alignTitle: 'Justering',
        widthTitle: 'Tittelbredde',
        alignLeft: 'Til venstre',
        alignRight: 'Til høyre',
        unitPx: 'Piksler',
        unitPct: 'prosentdel'
      },
      widget: {
        group: {
          base: 'Grunnleggende kontroller',
          layout: 'Oppsettkontroller',
          system: 'Systemkontroller',
          module: 'Modulkontroller',
          chart: 'Kartstyring',
          advanced: 'Avanserte kontroller'
        },
        copyTitle: 'Copy_ {0}',
        component: {
          input: 'Inngangsboks',
          textarea: 'Tekstfelt',
          select: 'Trekk ned for å velge',
          row: 'En rad og flere kolonner',
          title: 'tittel',
          text: 'tekst',
          subtable: 'Underbord',
          VxeSwitch: 'om',
          VxeInput: 'Inngangsboks',
          VxeNumberInput: 'tall',
          VxeDatePicker: 'dato',
          VxeTextarea: 'Tekstfelt',
          VxeSelect: 'Trekk ned for å velge',
          VxeTreeSelect: 'Treutvalg',
          VxeRadioGroup: 'Alternativknapp',
          VxeCheckboxGroup: 'Avkrysningsrute',
          VxeUploadFile: 'dokument',
          VxeUploadImage: 'bilde',
          VxeRate: 'poengsum',
          VxeSlider: 'glidebryteren'
        }
      },
      widgetProp: {
        name: 'Kontrollnavn',
        placeholder: 'Hurtig',
        required: 'Påkrevd bekreftelse',
        multiple: 'Flere valg er tillatt',
        displaySetting: {
          name: 'Vis innstillinger',
          pc: 'PC',
          mobile: 'Mobil',
          visible: 'vise',
          hidden: 'gjemme'
        },
        dataSource: {
          name: 'Datakilde',
          defValue: 'Alternativ {0}',
          addOption: 'Legg til alternativer',
          batchEditOption: 'Batch -redigering',
          batchEditTip: 'Hver rad tilsvarer et alternativ, som støtter direkte kopi og lim inn fra tabeller, Excel og WPS.',
          batchEditSubTip: 'Hver rad tilsvarer et alternativ. Hvis det er en gruppe, kan barnelementene starte med en plass eller en fane -tast, og den støtter direkte kopi og lim inn fra tabeller, Excel og WPS.',
          buildOption: 'Bygge alternativer'
        },
        rowProp: {
          colSize: 'Antall kolonner',
          col2: 'To kolonner',
          col3: 'Tre kolonner',
          col4: 'Fire kolonner',
          col6: 'Seks kolonner',
          layout: 'layout'
        },
        textProp: {
          name: 'innhold',
          alignTitle: 'Justering',
          alignLeft: 'Til venstre',
          alignCenter: 'Senter',
          alignRight: 'Til høyre',
          colorTitle: 'Fontfarge',
          sizeTitle: 'Fontstørrelse',
          boldTitle: 'Fet skrift',
          fontNormal: 'konvensjonell',
          fontBold: 'Fet'
        },
        subtableProp: {
          seqTitle: 'Serienummer',
          showSeq: 'Vis serienummer',
          showCheckbox: 'Flere valg er tillatt',
          errSubDrag: 'Subtabellen støtter ikke denne kontrollen, bruk andre kontroller',
          colPlace: 'Dra kontrollen inn'
        },
        uploadProp: {
          limitFileCount: 'Filmengde',
          limitFileSize: 'Filstørrelsesgrense',
          multiFile: 'La flere filer lastes opp',
          limitImgCount: 'Begrens antall bilder',
          limitImgSize: 'Bildestørrelsesgrense',
          multiImg: 'La flere bilder laste opp'
        }
      }
    },
    listDesign: {
      fieldSettingTab: 'Feltinnstillinger',
      listSettingTab: 'Parameterinnstillinger',
      searchTitle: 'Spørringskriterier',
      listTitle: 'Listefeltet',
      searchField: 'Spørringsfelt',
      listField: 'Listefeltet',
      activeBtn: {
        ActionButtonUpdate: 'redigere',
        ActionButtonDelete: 'slett'
      },
      search: {
        addBtn: 'redigere',
        emptyText: 'Spørringsbetingelser ikke konfigurert',
        editPopupTitle: 'Rediger spørringsfelt'
      },
      searchPopup: {
        colTitle: 'tittel',
        saveBtn: 'spare'
      }
    },
    text: {
      copySuccess: 'Kopiert til utklippstavlen',
      copyError: 'Det nåværende miljøet støtter ikke denne operasjonen'
    },
    countdown: {
      formats: {
        yyyy: 'År',
        MM: 'måne',
        dd: 'himmel',
        HH: 'time',
        mm: 'punkt',
        ss: 'Sekund'
      }
    },
    plugins: {
      extendCellArea: {
        area: {
          mergeErr: 'Denne operasjonen kan ikke utføres på sammenslåtte celler',
          multiErr: 'Denne operasjonen kan ikke utføres på flere utvalgsområder',
          selectErr: 'Kan ikke operere på celler i det spesifiserte området',
          extendErr: 'Hvis det utvidede området inneholder sammenslåtte celler, må alle sammenslåtte celler være i samme størrelse',
          pasteMultiErr: 'Kan ikke lime inn, de kopierte og limte områdene må være av samme størrelse for å utføre denne operasjonen',
          cpInvalidErr: 'Operasjonen kan ikke utføres. Det er forbudte kolonner ({0}) i området du valgte.'
        },
        fnr: {
          title: 'Finn og erstatt',
          findLabel: 'Finne',
          replaceLabel: 'erstatte',
          findTitle: 'Finn hva:',
          replaceTitle: 'Erstatt med:',
          tabs: {
            find: 'Finne',
            replace: 'erstatte'
          },
          filter: {
            re: 'Regelmessige uttrykk',
            whole: 'Fullt ord matching',
            sensitive: 'sak følsom'
          },
          btns: {
            findNext: 'Finn neste',
            findAll: 'Finn alle',
            replace: 'erstatte',
            replaceAll: 'Erstatt alle',
            cancel: 'Kansellere'
          },
          header: {
            seq: '#',
            cell: 'Celle',
            value: 'verdi'
          },
          body: {
            row: 'Rad: {0}',
            col: 'Kolonne: {0}'
          },
          empty: '(Nullverdi)',
          reError: 'Ugyldig regelmessig uttrykk',
          recordCount: '{0} celler funnet',
          notCell: 'Den matchende cellen kan ikke bli funnet',
          replaceSuccess: 'Vellykket erstattet {0} celler'
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
          fixedColumn: 'Frysekolonne',
          fixedGroup: 'Frysegruppe',
          cancelFixed: 'Frigjøre',
          fixedLeft: 'Frys til venstre',
          fixedRight: 'Frys til høyre'
        },
        cases: {
          equal: 'lik',
          gt: 'Større enn',
          lt: 'Mindre enn',
          begin: 'Begynnelsen er',
          endin: 'Slutten er',
          include: 'Inkludere',
          isSensitive: 'sak følsom'
        }
      },
      filterCombination: {
        menus: {
          sort: 'Sortere',
          clearSort: 'Klar sortering',
          sortAsc: 'Stigende orden',
          sortDesc: 'Synkende orden',
          fixedColumn: 'Frysekolonne',
          fixedGroup: 'Frysegruppe',
          cancelFixed: 'Frigjøre',
          fixedLeft: 'Frys til venstre',
          fixedRight: 'Frys til høyre',
          clearFilter: 'Klart filter',
          textOption: 'Tekstfilter',
          numberOption: 'Numerisk filter'
        },
        popup: {
          title: 'Tilpassede filtreringsmetoder',
          currColumnTitle: 'Gjeldende kolonne:',
          and: 'og',
          or: 'eller',
          describeHtml: 'Tilgjengelig? Representerer et enkelt tegn <br/> bruk * representerer flere tegn'
        },
        cases: {
          equal: 'lik',
          unequal: 'Ikke lik',
          gt: 'Større enn',
          ge: 'Større enn eller lik',
          lt: 'Mindre enn',
          le: 'Mindre enn eller lik',
          begin: 'Begynnelsen er',
          notbegin: 'Det er ikke i begynnelsen',
          endin: 'Slutten er',
          notendin: 'Avslutningen er ikke',
          include: 'Inkludere',
          exclude: 'Ikke inkludert',
          between: 'Mellom',
          custom: 'Tilpasset filter',
          insensitive: 'Sak ufølsom',
          isSensitive: 'sak følsom'
        },
        empty: '(blank)',
        notData: 'Ingen kamp'
      }
    },
    pro: {
      area: {
        mergeErr: 'Denne operasjonen kan ikke utføres på sammenslåtte celler',
        multiErr: 'Denne operasjonen kan ikke utføres på flere utvalgsområder',
        extendErr: 'Hvis det utvidede området inneholder sammenslåtte celler, må alle sammenslåtte celler være i samme størrelse',
        pasteMultiErr: 'Kan ikke lime inn, de kopierte og limte områdene må være av samme størrelse for å utføre denne operasjonen'
      },
      fnr: {
        title: 'Finn og erstatt',
        findLabel: 'Finne',
        replaceLabel: 'erstatte',
        findTitle: 'Finn innhold:',
        replaceTitle: 'Erstatt med:',
        tabs: {
          find: 'Finne',
          replace: 'erstatte'
        },
        filter: {
          re: 'Regelmessige uttrykk',
          whole: 'Fullt ord matching',
          sensitive: 'sak følsom'
        },
        btns: {
          findNext: 'Finn neste',
          findAll: 'Finn alle',
          replace: 'erstatte',
          replaceAll: 'Erstatt alle',
          cancel: 'Kansellere'
        },
        header: {
          seq: '#',
          cell: 'Celle',
          value: 'verdi'
        },
        empty: '(Nullverdi)',
        reError: 'Ugyldig regelmessig uttrykk',
        recordCount: '{0} celler funnet',
        notCell: 'Ingen matchende celle funnet',
        replaceSuccess: 'Vellykket erstattet {0} celler'
      }
    },
    renderer: {
      search: 'søk',
      cases: {
        equal: 'lik',
        unequal: 'Ikke lik',
        gt: 'Større enn',
        ge: 'Større enn eller lik',
        lt: 'Mindre enn',
        le: 'Mindre enn eller lik',
        begin: 'Begynnelsen er',
        notbegin: 'Det er ikke i begynnelsen',
        endin: 'Slutten er',
        notendin: 'Avslutningen er ikke',
        include: 'Inkludere',
        exclude: 'Ikke inkludert',
        between: 'Mellom',
        custom: 'Tilpasset filter',
        insensitive: 'Sak ufølsom',
        isSensitive: 'sak følsom'
      },
      combination: {
        menus: {
          sort: 'Sortere',
          clearSort: 'Klar sortering',
          sortAsc: 'Stigende orden',
          sortDesc: 'Synkende orden',
          fixedColumn: 'Frysekolonne',
          fixedGroup: 'Frysegruppe',
          cancelFixed: 'Frigjøre',
          fixedLeft: 'Frys til venstre',
          fixedRight: 'Frys til høyre',
          clearFilter: 'Klart filter',
          textOption: 'Tekstfiltrering',
          numberOption: 'Numerisk filtrering'
        },
        popup: {
          title: 'Tilpassede filtreringsmetoder',
          currColumnTitle: 'Gjeldende kolonne:',
          and: 'og',
          or: 'eller',
          describeHtml: 'Tilgjengelig? Representerer et enkelt tegn <br/> bruk * representerer flere tegn'
        },
        empty: '(blank)',
        notData: 'Ingen kamp'
      }
    }
  }
}
