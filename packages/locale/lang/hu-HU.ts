export default {
  vxe: {
    base: {
      pleaseInput: 'Kérjük, írja be',
      pleaseSelect: 'Kérjük, válassza ki',
      comma: '，',
      fullStop: '。'
    },
    loading: {
      text: 'terhelés...'
    },
    error: {
      downErr: 'A letöltés sikertelen',
      errLargeData: 'Ha a kötött adatok mennyisége túl nagy, kérjük, használja a {0} -et, különben késést okozhat',
      groupFixed: 'Csoportos fejlécek használata esetén a fagyasztott oszlopot csoportonként kell beállítani',
      groupMouseRange: 'A csoportosítási fejléc nem használható egyszerre, mint a "{0}", és ez hibát okozhat',
      groupTag: 'Az oszlopfejlécek csoportosításának a "{0}" -et használni kell a "{1}" helyett, amely hibákat okozhat',
      scrollErrProp: 'Ezt a "{0}" paramétert a virtuális görgetés engedélyezése után nem támogatják',
      errConflicts: 'A "{0}" paraméter konfliktusok "{1}"',
      notSupportProp: 'A "{1}" nem támogatott, ha a "{0}" paraméter engedélyezve van, "{2}" -nek kell lennie, különben hiba lép fel',
      notConflictProp: 'A "{0}" használatakor a "{1}" -et be kell állítani, különben funkcionális konfliktusok merülhetnek fel',
      unableInsert: 'Nem lehet beilleszteni a megadott helyre, kérjük, ellenőrizze, hogy a paraméterek helyesek -e',
      useErr: 'Hiba történt a "{0}" modul telepítése során. A sorrend helytelen lehet. A függő modult a táblázat előtt kell telepíteni',
      barUnableLink: 'Az eszköztár nem társíthatja a táblákat',
      expandContent: 'A kibővített vonal résidőnek "tartalomnak" kell lennie, kérjük, ellenőrizze, hogy helyes -e',
      reqComp: 'Hiányzik a "{0}" összetevő, kérjük, ellenőrizze, hogy helyesen van -e telepítve. https://vxeui.com/#/start/useglobal',
      reqModule: 'Hiányzik a "{0}" modul',
      reqProp: 'Hiányzik a szükséges "{0}" paraméter, amely hibát okozhat',
      emptyProp: 'A "{0}" paraméter nem szabad üres lenni',
      errProp: 'Nem támogatott "{0}" paraméter, esetleg "{1}" paraméter',
      colRepet: 'oszlop. {0} = "{1}" megismétlődik, ami egyes funkciók felhasználhatatlanná válhat',
      notFunc: 'A "{0}" módszer nem létezik',
      errFunc: 'A "{0}" paraméter nem módszer',
      notValidators: 'A "{0}" globális ellenőrzése nem létezik',
      notFormats: 'A "{0}" globális formázása nem létezik',
      notCommands: 'A "{0}" globális irányelv nem létezik',
      notSlot: 'A "{0}" rés nem létezik',
      noTree: 'A "{0}" nem támogatott a faszerkezetben',
      noGroup: '数据分组后不支持 "{0}"',
      notProp: 'Nem támogatott paraméter "{0}"',
      checkProp: 'Ha az adatmennyiség túl nagy, akkor a jelölőnégyzet dadoghat. Javasoljuk, hogy állítsa be a "{0}" paramétert a megjelenítési sebesség javítása érdekében',
      coverProp: 'A "{1}" paramétert a "{0}" paramétere többször meghatározza, ami hibát okozhat',
      uniField: 'A "{0}" mező nevét többször definiálják, ami hibát okozhat',
      repeatKey: 'Ismételje meg az elsődleges gombot {0} = "{1}", amely hibát okozhat',
      delFunc: 'A "{0}" módszer elavult, kérjük, használja a "{1}" módszert',
      delProp: 'A "{0}" paraméter elavult, kérjük, használja a "{1}" paramétert',
      delEvent: 'A "{0}" esemény elavult, kérjük, használja a "{1}" eseményt',
      removeProp: 'A "{0}" paraméter elavult és nem ajánlott, ami hibát okozhat',
      errFormat: 'A globális formázott tartalmat a "vxetable.formats" használatával kell meghatározni, és a "formater = {0}" rögzítésének módszerét már nem ajánljuk.',
      notType: 'Nem támogatott fájltípus "{0}"',
      notExp: 'Ez a böngésző nem támogatja az import/export funkciót',
      impFields: 'Az import sikertelen. Kérjük, ellenőrizze, hogy a mezőnév és az adatformátum helyes -e.',
      treeNotImp: 'A faasztalok nem támogatják az importot',
      treeCrossDrag: 'Csak húzza az első szintet',
      treeDragChild: 'A szülők nem tudnak elhúzni a saját gyermekeiket',
      reqPlugin: 'A "{1}" nincs telepítve a https://vxeui.com/other oldalon {0 }/#/ (1 }/install',
      errMaxRow: 'A maximális támogatott adatmennyiség {0} sorok túllépése, ez hibát okozhat'
    },
    table: {
      emptyText: 'Még nincs adat',
      allTitle: 'Válassza ki az összes/Mégse lehetőséget',
      seqTitle: 'Sorszám',
      actionTitle: 'működik',
      confirmFilter: 'szűrő',
      resetFilter: 'Visszaállít',
      allFilter: 'minden',
      sortAsc: 'Növekvő sorrend: a legalacsonyabb és legmagasabb',
      sortDesc: 'Csökkentés: a legmagasabb vagy a legalacsonyabb',
      filter: 'A kiválasztott oszlopok szűrése engedélyezése engedélyezése',
      impSuccess: 'Sikeresen importált {0} rekordok',
      expLoading: 'Exportálás',
      expSuccess: 'Sikeresen exportál',
      expError: 'Az export sikertelen',
      expFilename: 'Export_ {0}',
      expOriginFilename: 'Export_source_ {0}',
      customTitle: 'Oszlopbeállítások',
      customAll: 'minden',
      customConfirm: 'megerősít',
      customClose: 'bezárás',
      customCancel: 'Töröl',
      customRestore: 'Visszaállítja az alapértelmezettet',
      maxFixedCol: 'A fagyasztott oszlopok maximális száma nem haladhatja meg a {0}',
      maxGroupCol: '最大分组字段的数量不能超过 {0} 个',
      dragTip: 'Mozgás: {0}',
      resizeColTip: 'Szélesség: {0} pixelek',
      resizeRowTip: 'Magasság: {0} pixelek',
      rowGroupContentTotal: '{0} ({1})'
    },
    grid: {
      selectOneRecord: 'Kérjük, válasszon legalább egy rekordot!',
      deleteSelectRecord: 'Biztos benne, hogy törölni akarja a kiválasztott rekordot?',
      removeSelectRecord: 'Biztosan el akarja távolítani a kiválasztott rekordot?',
      dataUnchanged: 'Az adatok nem változtak!',
      delSuccess: 'A kiválasztott rekordot sikeresen törölték!',
      saveSuccess: 'Mentés sikeresen!',
      operError: 'Hiba történt, és a művelet meghibásodott!'
    },
    select: {
      search: 'keresés',
      loadingText: 'terhelés',
      emptyText: 'Még nincs adat'
    },
    pager: {
      goto: 'Megy',
      gotoTitle: 'Oldalak száma',
      pagesize: '{0} Tételek/oldal',
      total: 'Összesen {0} rekordok',
      pageClassifier: 'Oldal',
      homePage: 'címlap',
      homePageTitle: 'címlap',
      prevPage: 'Előző oldal',
      prevPageTitle: 'Előző oldal',
      nextPage: 'Következő oldal',
      nextPageTitle: 'Következő oldal',
      prevJump: 'Ugrás az oldalon',
      prevJumpTitle: 'Ugrás az oldalon',
      nextJump: 'Ugrás lefelé',
      nextJumpTitle: 'Ugrás lefelé',
      endPage: 'Utolsó oldal',
      endPageTitle: 'Utolsó oldal'
    },
    alert: {
      title: 'A rendszer felszólít'
    },
    button: {
      confirm: 'megerősít',
      cancel: 'Töröl',
      clear: 'Világos'
    },
    filter: {
      search: 'keresés'
    },
    custom: {
      cstmTitle: 'Oszlopbeállítások',
      cstmRestore: 'Visszaállítja az alapértelmezettet',
      cstmCancel: 'Töröl',
      cstmConfirm: 'Persze',
      cstmConfirmRestore: 'Kérjük, erősítse meg, hogy visszaáll -e az alapértelmezett oszlopkonfigurációra?',
      cstmDragTarget: 'Mozgás: {0}',
      setting: {
        colSort: 'Fajta',
        sortHelpTip: '点击并拖动图标可以调整顺序',
        colTitle: 'Oszlopcím',
        colResizable: 'Oszlop szélessége (pixelek)',
        colVisible: 'Függetlenül attól, hogy megjelenjen',
        colFixed: 'Fagyasztási oszlop',
        colFixedMax: 'Fagyasztva oszlopok ({0} oszlopokig)',
        fixedLeft: 'Bal oldal',
        fixedUnset: 'Nem állított be',
        fixedRight: 'Jobb oldali'
      }
    },
    import: {
      modes: {
        covering: 'Felülírja a módszert (közvetlenül felülírja a táblázatok adatait)',
        insert: 'Függeljen az alján (új adatokat csatoljon a táblázat alján)',
        insertTop: 'Függeljen a tetejére (új adatokat csatoljon az asztal tetején)',
        insertBottom: 'Függeljen az alján (új adatokat csatoljon a táblázat alján)'
      },
      impTitle: 'Adatok importálása',
      impFile: 'fájlnév',
      impSelect: 'Válassza ki a fájlt',
      impType: 'Fájltípus',
      impOpts: 'Paraméterbeállítások',
      impMode: 'Importálási mód',
      impConfirm: 'Behozatal',
      impCancel: 'Töröl'
    },
    export: {
      types: {
        csv: 'CSV (vessző elválasztva) (*. CSV)',
        html: 'Weboldal (*.html)',
        xml: 'XML adatok (*.xml)',
        txt: 'Szövegfájl (fül elválasztva) (*. Txt)',
        xls: 'Excel 97-2003 munkafüzet (*.xls)',
        xlsx: 'Excel munkafüzet (*.xlsx)',
        pdf: 'PDF (*.pdf)'
      },
      modes: {
        empty: 'Üres adatok',
        current: 'Jelenlegi adatok (adatok az aktuális oldalon)',
        selected: 'Kiválasztott adatok (az aktuális oldalon kiválasztott adatok)',
        all: 'Teljes adatok (beleértve az összes lapos adatot)'
      },
      printTitle: 'Nyomtatási adatok',
      expTitle: 'Exportadatok',
      expName: 'fájlnév',
      expNamePlaceholder: 'Kérjük, írjon be egy fájlnevet',
      expSheetName: 'cím',
      expSheetNamePlaceholder: 'Kérjük, írjon be egy címet',
      expType: 'Típus mentése',
      expMode: 'Válassza ki az adatokat',
      expCurrentColumn: 'Minden mező',
      expColumn: 'Válassza ki a mezőt',
      expOpts: 'Paraméterbeállítások',
      expOptHeader: 'Fejléc',
      expHeaderTitle: 'Szükséges -e az asztali fejléc?',
      expOptFooter: 'Asztal vége',
      expFooterTitle: 'Szükség van az asztal végére?',
      expOptColgroup: 'Csoportosítási fejléc',
      expOptTitle: 'Oszlopcím',
      expTitleTitle: 'Függetlenül attól, hogy ez az oszlop címe, különben az oszlop mező neve lesz jelenik meg',
      expColgroupTitle: 'Ha van, akkor egy csoportosító struktúrával rendelkező fejléc támogatott',
      expOptMerge: 'összeolvad',
      expMergeTitle: 'Ha van jelen, az egyesített struktúrákkal rendelkező sejtek támogatottak',
      expOptAllExpand: 'Bővítse a fát',
      expAllExpandTitle: 'Ha létezik, akkor támogatott, hogy az összes adatot hierarchikus struktúrákkal bővítse',
      expOptUseStyle: 'stílus',
      expUseStyleTitle: 'Ha van jelen, akkor a stílusú sejtek támogatottak',
      expOptOriginal: 'Forrásadatok',
      expOriginalTitle: 'Ha ez forrásadatok, akkor az importálási táblákba támogatott',
      expPrint: 'Nyomtatás',
      expConfirm: 'Export',
      expCancel: 'Töröl'
    },
    modal: {
      errTitle: 'Hibaüzenet',
      zoomMin: 'Minimalizál',
      zoomIn: 'maximalizál',
      zoomOut: 'csökkentés',
      close: 'bezárás',
      miniMaxSize: 'A minimalizált ablakok száma nem haladhatja meg a {0}',
      footPropErr: 'A show-láb csak az asztali farok engedélyezésére szolgál, és a show-confirm-button segítségével kell használni | Show-Cancel-button | rés'
    },
    drawer: {
      close: 'bezárás'
    },
    form: {
      folding: 'Közeli',
      unfolding: 'Kiszélesít'
    },
    toolbar: {
      import: 'Behozatal',
      export: 'Export',
      print: 'Nyomtatás',
      refresh: 'frissít',
      zoomIn: 'teljes képernyő',
      zoomOut: 'csökkentés',
      custom: 'Oszlopbeállítások',
      customAll: 'minden',
      customConfirm: 'megerősít',
      customRestore: 'Visszaállít',
      fixedLeft: 'Fagyasztva balra',
      fixedRight: 'Jobbra fagy',
      cancelFixed: 'Kiolvaszt'
    },
    datePicker: {
      yearTitle: '{0} Évek'
    },
    dateRangePicker: {
      pleaseRange: '请选择开始日期与结束日期'
    },
    input: {
      date: {
        m1: 'január',
        m2: 'február',
        m3: 'március',
        m4: 'április',
        m5: 'május',
        m6: 'június',
        m7: 'július',
        m8: 'augusztus',
        m9: 'szeptember',
        m10: 'október',
        m11: 'november',
        m12: 'december',
        quarterLabel: '{0} Évek',
        monthLabel: '{0} Évek',
        dayLabel: '{0} év {1}',
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
          w0: 'Nap',
          w1: 'Mon',
          w2: 'Kedd',
          w3: 'Házasodik',
          w4: 'Csütörtökön',
          w5: 'Péntek',
          w6: 'Ült'
        },
        months: {
          m0: 'január',
          m1: 'február',
          m2: 'március',
          m3: 'április',
          m4: 'május',
          m5: 'június',
          m6: 'július',
          m7: 'augusztus',
          m8: 'szeptember',
          m9: 'október',
          m10: 'november',
          m11: 'december'
        },
        quarters: {
          q1: 'Első negyedév',
          q2: 'Második negyedév',
          q3: 'Harmadik negyedév',
          q4: 'Negyedik negyedév'
        }
      }
    },
    numberInput: {
      currencySymbol: '$'
    },
    imagePreview: {
      popupTitle: 'Előnézet',
      operBtn: {
        zoomOut: 'Összezsugorodik',
        zoomIn: 'nagyít',
        pctFull: 'Egyformán méretezés',
        pct11: 'Mutassa meg az eredeti méretet',
        rotateLeft: 'Forgatd balra',
        rotateRight: 'Jobbra forog',
        print: 'Kattintson a kép kinyomtatásához',
        download: 'Kattintson a kép letöltéséhez'
      }
    },
    upload: {
      fileBtnText: 'Kattintson vagy húzza a feltöltéshez',
      imgBtnText: 'Kattintson vagy húzza a feltöltéshez',
      dragPlaceholder: 'Kérjük, húzza és dobja el a fájlt erre a területre a feltöltéshez',
      imgSizeHint: 'Szórólap {0}',
      imgCountHint: 'Maximum {0} képek',
      fileTypeHint: 'Támogatás {0} fájltípusok',
      fileSizeHint: 'Egyetlen fájlméret nem haladja meg a {0}',
      fileCountHint: 'Legfeljebb {0} fájlok feltölthetők',
      uploadTypeErr: 'Fájl típusú eltérés!',
      overCountErr: 'Csak a {0} fájlok választhatók legfeljebb!',
      overCountExtraErr: 'A {0} maximális számát túllépték, és a {1} felesleges fájlokat figyelmen kívül hagyják!',
      overSizeErr: 'A maximális fájlméret nem haladhatja meg a {0}!',
      reUpload: 'Újból feltölt',
      uploadProgress: 'Feltöltés {0}%',
      uploadErr: 'A feltöltés sikertelen',
      uploadSuccess: 'Töltse fel sikeresen',
      moreBtnText: 'Tovább ({0})',
      viewItemTitle: 'Kattintson a megtekintéshez',
      morePopup: {
        readTitle: 'Lista megtekintése',
        imageTitle: 'Töltsön fel képeket',
        fileTitle: 'Feltöltési fájl'
      }
    },
    empty: {
      defText: 'Még nincs adat'
    },
    colorPicker: {
      clear: 'Világos',
      confirm: 'megerősít',
      copySuccess: 'Másolva a vágólapra: {0}',
      hex: 'HEX'
    },
    formDesign: {
      formName: 'Forma neve',
      defFormTitle: 'Névtelen forma',
      widgetPropTab: 'Vezérlő tulajdonságok',
      widgetFormTab: 'Formatulajdonságok',
      error: {
        wdFormUni: 'Az ilyen típusú vezérlés csak egyet ad hozzá az űrlaphoz',
        wdSubUni: 'Az ilyen típusú vezérlés csak egyet ad hozzá a szubtable -be'
      },
      styleSetting: {
        btn: 'Stílusbeállítások',
        title: 'A stílus stílus beállításai',
        layoutTitle: 'Vezérlő elrendezés',
        verticalLayout: 'Felső és alsó elrendezés',
        horizontalLayout: 'Vízszintes elrendezés',
        styleTitle: 'Címstílus',
        boldTitle: 'Cím merész',
        fontBold: 'Bátor',
        fontNormal: 'hagyományos',
        colonTitle: 'Show Colon',
        colonVisible: 'megmutat',
        colonHidden: 'elrejt',
        alignTitle: 'Igazítás',
        widthTitle: 'Címszélesség',
        alignLeft: 'Bal oldalon',
        alignRight: 'Jobb oldalon',
        unitPx: 'Pixelek',
        unitPct: 'százalék'
      },
      widget: {
        group: {
          base: 'Alapvezérlők',
          layout: 'Elrendezés -vezérlők',
          system: 'Rendszervezérlők',
          module: 'Modulvezérlők',
          chart: 'Térképvezérlés',
          advanced: 'Fejlett vezérlők'
        },
        copyTitle: 'Copy_ {0}',
        component: {
          input: 'Bemeneti doboz',
          textarea: 'Szöveges mező',
          select: 'Húzza le a kiválasztáshoz',
          row: 'Egy sor és több oszlop',
          title: 'cím',
          text: 'szöveg',
          subtable: 'Altáblázat',
          VxeSwitch: 'hogy',
          VxeInput: 'Bemeneti doboz',
          VxeNumberInput: 'szám',
          VxeDatePicker: 'dátum',
          VxeTextarea: 'Szöveges mező',
          VxeSelect: 'Húzza le a kiválasztáshoz',
          VxeTreeSelect: 'Fa kiválasztás',
          VxeRadioGroup: 'Rádiógomb',
          VxeCheckboxGroup: 'Jelölőnégyzet',
          VxeUploadFile: 'dokumentum',
          VxeUploadImage: 'kép',
          VxeRate: 'pontszám',
          VxeSlider: 'csúszó'
        }
      },
      widgetProp: {
        name: 'Vezérlőnév',
        placeholder: 'Gyors',
        required: 'Szükséges ellenőrzés',
        multiple: 'Több választás megengedett',
        displaySetting: {
          name: 'Megjelenítési beállítások',
          pc: 'PC',
          mobile: 'Mozgó',
          visible: 'megmutat',
          hidden: 'elrejt'
        },
        dataSource: {
          name: 'Adatforrás',
          defValue: '{0} opció',
          addOption: 'Adjon hozzá lehetőségeket',
          batchEditOption: 'Kötegelt szerkesztés',
          batchEditTip: 'Mindegyik sor megfelel egy opciónak, amely támogatja a közvetlen másolatot és beillesztést a táblákból, az Excelből és a WPS -ből.',
          batchEditSubTip: 'Minden sor egy opciónak felel meg. Ha ez egy csoport, akkor a gyermektermékek szóközökkel vagy fülkulcsmal kezdődhetnek, és támogatja a közvetlen másolatot és beillesztést a táblákból, az Excelből és a WP -kből.',
          buildOption: 'Építsen lehetőségeket'
        },
        rowProp: {
          colSize: 'Oszlopok száma',
          col2: 'Két oszlop',
          col3: 'Három oszlop',
          col4: 'Négy oszlop',
          col6: 'Hat oszlop',
          layout: 'elrendezés'
        },
        textProp: {
          name: 'tartalom',
          alignTitle: 'Igazítás',
          alignLeft: 'Bal oldalon',
          alignCenter: 'Központ',
          alignRight: 'Jobb oldalon',
          colorTitle: 'Betűtípus színe',
          sizeTitle: 'Betűkészlet',
          boldTitle: 'Vastag betűkészlet',
          fontNormal: 'hagyományos',
          fontBold: 'Bátor'
        },
        subtableProp: {
          seqTitle: 'Sorszám',
          showSeq: 'Mutassa meg a sorozatszámot',
          showCheckbox: 'Több választás megengedett',
          errSubDrag: 'A Subtable nem támogatja ezt a vezérlést, kérjük, használjon más kezelőszerveket',
          colPlace: 'Húzza be a vezérlést'
        },
        uploadProp: {
          limitFileCount: 'Fájlmennyiség',
          limitFileSize: 'Fájlméret korlátozás',
          multiFile: 'Hagyja több fájl feltöltését',
          limitImgCount: 'Korlátok száma a képek számának',
          limitImgSize: 'Képméret korlátozás',
          multiImg: 'Hagyja több kép feltöltését'
        }
      }
    },
    listDesign: {
      fieldSettingTab: 'Mezőbeállítások',
      listSettingTab: 'Paraméterbeállítások',
      searchTitle: 'Lekérdezési kritériumok',
      listTitle: 'Lista mező',
      searchField: 'Lekérdezési mezők',
      listField: 'Lista mező',
      activeBtn: {
        ActionButtonUpdate: 'szerkeszt',
        ActionButtonDelete: 'töröl'
      },
      search: {
        addBtn: 'szerkeszt',
        emptyText: 'A lekérdezési feltételek nem konfigurálva',
        editPopupTitle: 'A lekérdezési mezők szerkesztése'
      },
      searchPopup: {
        colTitle: 'cím',
        saveBtn: 'megtakarítás'
      }
    },
    text: {
      copySuccess: 'Másolva a vágólapra',
      copyError: 'A jelenlegi környezet nem támogatja ezt a műveletet'
    },
    countdown: {
      formats: {
        yyyy: 'Év',
        MM: 'hold',
        dd: 'ég',
        HH: 'óra',
        mm: 'pont',
        ss: 'Második'
      }
    },
    plugins: {
      extendCellArea: {
        area: {
          mergeErr: 'Ezt a műveletet nem lehet végrehajtani az egyesített cellákon',
          multiErr: 'Ezt a műveletet nem lehet többszörös kiválasztási területeken végrehajtani',
          selectErr: 'Nem tudott működni a megadott tartományban lévő sejteken',
          extendErr: 'Ha a kiterjesztett tartomány egyesített cellákat tartalmaz, akkor az összes egyesített sejtnek azonos méretűnek kell lennie',
          pasteMultiErr: 'Mivel nem képes beilleszteni, a lemásolt és beillesztett területeknek ugyanolyan méretűnek kell lenniük, hogy elvégezzék ezt a műveletet',
          cpInvalidErr: 'A műveletet nem lehet végrehajtani. A kiválasztott tartományban vannak tiltott oszlopok ({0}).'
        },
        fnr: {
          title: 'Keresse meg és cserélje ki',
          findLabel: 'Lelet',
          replaceLabel: 'cserél',
          findTitle: 'Találd meg, mit:',
          replaceTitle: 'Cserélje ki:',
          tabs: {
            find: 'Lelet',
            replace: 'cserél'
          },
          filter: {
            re: 'Rendszeres kifejezések',
            whole: 'Teljes szó -illesztés',
            sensitive: 'tokos érzékeny'
          },
          btns: {
            findNext: 'Keresse meg a következőket',
            findAll: 'Megtalálja az összeset',
            replace: 'cserél',
            replaceAll: 'Cserélje ki az összeset',
            cancel: 'Töröl'
          },
          header: {
            seq: '#',
            cell: 'Sejt',
            value: 'érték'
          },
          body: {
            row: 'Sor: {0}',
            col: 'Oszlop: {0}'
          },
          empty: '(Null érték)',
          reError: 'Érvénytelen normál kifejezés',
          recordCount: '{0} A talált sejtek',
          notCell: 'A megfelelő cella nem található',
          replaceSuccess: 'Sikeresen cserélte a {0} sejteket'
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
          fixedColumn: 'Fagyasztási oszlop',
          fixedGroup: 'Fagyasztócsoport',
          cancelFixed: 'Kiolvaszt',
          fixedLeft: 'Fagyasztva balra',
          fixedRight: 'Jobbra fagy'
        },
        cases: {
          equal: 'egyenlő',
          gt: 'Nagyobb, mint',
          lt: 'Kevesebb, mint',
          begin: 'A kezdet az',
          endin: 'A vége az',
          include: 'Tartalmaz',
          isSensitive: 'tokos érzékeny'
        }
      },
      filterCombination: {
        menus: {
          sort: 'Fajta',
          clearSort: 'Tiszta rendezés',
          sortAsc: 'Növekvő sorrend',
          sortDesc: 'leszállító végzés',
          fixedColumn: 'Fagyasztási oszlop',
          fixedGroup: 'Fagyasztócsoport',
          cancelFixed: 'Kiolvaszt',
          fixedLeft: 'Fagyasztva balra',
          fixedRight: 'Jobbra fagy',
          clearFilter: 'Átlátszó szűrő',
          textOption: 'Szöveges szűrő',
          numberOption: 'Numerikus szűrő'
        },
        popup: {
          title: 'Egyedi szűrési módszerek',
          currColumnTitle: 'Aktuális oszlop:',
          and: 'és',
          or: 'vagy',
          describeHtml: 'Elérhető? Egyetlen karaktert képvisel.'
        },
        cases: {
          equal: 'egyenlő',
          unequal: 'Nem egyenlő',
          gt: 'Nagyobb, mint',
          ge: 'Nagyobb vagy azzal egyenlő',
          lt: 'Kevesebb, mint',
          le: 'Kevesebb vagy azzal egyenlő',
          begin: 'A kezdet az',
          notbegin: 'Az elején nincs',
          endin: 'A vége az',
          notendin: 'A vége nem az',
          include: 'Tartalmaz',
          exclude: 'Nem tartozik bele',
          between: 'Között',
          custom: 'Egyedi szűrő',
          insensitive: 'Esettanulmány',
          isSensitive: 'tokos érzékeny'
        },
        empty: '(üres)',
        notData: 'Nincs mérkőzés'
      }
    },
    pro: {
      area: {
        mergeErr: 'Ezt a műveletet nem lehet végrehajtani az egyesített cellákon',
        multiErr: 'Ezt a műveletet nem lehet többszörös kiválasztási területeken végrehajtani',
        extendErr: 'Ha a kiterjesztett tartomány egyesített cellákat tartalmaz, akkor az összes egyesített sejtnek azonos méretűnek kell lennie',
        pasteMultiErr: 'Mivel nem képes beilleszteni, a lemásolt és beillesztett területeknek ugyanolyan méretűnek kell lenniük, hogy elvégezzék ezt a műveletet'
      },
      fnr: {
        title: 'Keresse meg és cserélje ki',
        findLabel: 'Lelet',
        replaceLabel: 'cserél',
        findTitle: 'Keressen tartalmat:',
        replaceTitle: 'Cserélje ki:',
        tabs: {
          find: 'Lelet',
          replace: 'cserél'
        },
        filter: {
          re: 'Rendszeres kifejezések',
          whole: 'Teljes szó -illesztés',
          sensitive: 'tokos érzékeny'
        },
        btns: {
          findNext: 'Keresse meg a következőket',
          findAll: 'Megtalálja az összeset',
          replace: 'cserél',
          replaceAll: 'Cserélje ki az összeset',
          cancel: 'Töröl'
        },
        header: {
          seq: '#',
          cell: 'Sejt',
          value: 'érték'
        },
        empty: '(Null érték)',
        reError: 'Érvénytelen normál kifejezés',
        recordCount: '{0} A talált sejtek',
        notCell: 'Nincs megfelelő cella',
        replaceSuccess: 'Sikeresen cserélte a {0} sejteket'
      }
    },
    renderer: {
      search: 'keresés',
      cases: {
        equal: 'egyenlő',
        unequal: 'Nem egyenlő',
        gt: 'Nagyobb, mint',
        ge: 'Nagyobb vagy azzal egyenlő',
        lt: 'Kevesebb, mint',
        le: 'Kevesebb vagy azzal egyenlő',
        begin: 'A kezdet az',
        notbegin: 'Az elején nincs',
        endin: 'A vége az',
        notendin: 'A vége nem az',
        include: 'Tartalmaz',
        exclude: 'Nem tartozik bele',
        between: 'Között',
        custom: 'Egyedi szűrő',
        insensitive: 'Esettanulmány',
        isSensitive: 'tokos érzékeny'
      },
      combination: {
        menus: {
          sort: 'Fajta',
          clearSort: 'Tiszta rendezés',
          sortAsc: 'Növekvő sorrend',
          sortDesc: 'leszállító végzés',
          fixedColumn: 'Fagyasztási oszlop',
          fixedGroup: 'Fagyasztócsoport',
          cancelFixed: 'Kiolvaszt',
          fixedLeft: 'Fagyasztva balra',
          fixedRight: 'Jobbra fagy',
          clearFilter: 'Átlátszó szűrő',
          textOption: 'Szöveges szűrés',
          numberOption: 'Numerikus szűrés'
        },
        popup: {
          title: 'Egyedi szűrési módszerek',
          currColumnTitle: 'Aktuális oszlop:',
          and: 'és',
          or: 'vagy',
          describeHtml: 'Elérhető? Egyetlen karaktert képvisel.'
        },
        empty: '(üres)',
        notData: 'Nincs mérkőzés'
      }
    }
  }
}
