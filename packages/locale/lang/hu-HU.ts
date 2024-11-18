export default {
  vxe: {
    base: {
      pleaseInput: 'Kérjük, lépjen be',
      pleaseSelect: 'Kérem válasszon',
      comma: '，',
      fullStop: '。'
    },
    loading: {
      text: 'terhelés...'
    },
    error: {
      downErr: 'Letöltés sikertelen',
      groupFixed: 'Csoportfejlécek használata esetén a rögzített oszlopokat csoportonként kell beállítani',
      groupMouseRange: 'A csoportfejléc és a „{0}” nem használhatók egyszerre, ami hibát okozhat.',
      groupTag: 'A csoportosító oszlopfejlécben a „{0}” értéket kell használni a „{1}” helyett, ami hibákat okozhat',
      scrollErrProp: 'A "{0}" paraméter nem támogatott, ha a virtuális görgetés engedélyezve van',
      errConflicts: 'A "{0}" paraméter ütközik a következővel: "{1}"',
      unableInsert: 'Nem sikerült beilleszteni a megadott pozícióba, ellenőrizze, hogy a paraméterek helyesek-e',
      useErr: 'Hiba történt a "{0}" modul telepítésekor. Lehet, hogy a sorrend helytelen. A függő modulokat a táblázat előtt kell telepíteni.',
      barUnableLink: 'Az eszköztár nem társítható a táblázathoz',
      expandContent: 'A sor bővítésére szolgáló helynek "tartalom"-nak kell lennie, ellenőrizze, hogy helyes-e',
      reqComp: 'A "{0}" összetevő hiányzik. Kérjük, ellenőrizze, hogy megfelelően van-e telepítve. https://vxeui.com/#/start/useGlobal',
      reqModule: 'Hiányzik a "{0}" modul',
      reqProp: 'A szükséges "{0}" paraméter hiányzik, ami hibát okozhat',
      emptyProp: 'A(z) "{0}" paraméter nem lehet üres',
      errProp: 'Nem támogatott "{0}" paraméter, lehetséges "{1}"',
      colRepet: 'oszlopban.{0}="{1}" ismétlődik, ami miatt egyes funkciók használhatatlanná válhatnak',
      notFunc: 'A(z) "{0}" módszer nem létezik',
      errFunc: 'A "{0}" paraméter nem metódus',
      notValidators: '"{0}" globális ellenőrzés nem létezik',
      notFormats: '"{0}" globális formátum nem létezik',
      notCommands: 'A(z) "{0}" globális irányelv nem létezik',
      notSlot: '"{0}" hely nem létezik',
      noTree: 'A fastruktúra nem támogatja a következőt: "{0}"',
      notProp: 'Nem támogatott "{0}" paraméter',
      checkProp: 'Ha az adatmennyiség túl nagy, a jelölőnégyzet lefagyhat. Javasoljuk, hogy a "{0}" paramétert állítsa be a megjelenítési sebesség javítása érdekében.',
      coverProp: 'A(z) "{0}" "{1}" paramétere ismételten definiálva van, ami hibát okozhat.',
      uniField: 'A(z) "{0}" mezőnév többször is meghatározásra kerül, ami hibát okozhat',
      repeatKey: '主键重复 {0}="{1}"，这可能会出现错误',
      delFunc: 'A(z) "{0}" módszer elavult, kérjük, használja a "{1}"',
      delProp: 'A "{0}" paraméter elavult, kérjük, használja a "{1}" paramétert',
      delEvent: 'A(z) "{0}" esemény elavult, kérjük, használja a "{1}" eseményt',
      removeProp: 'A "{0}" paraméter elavult, ezért nem ajánlott, és hibákat okozhat',
      errFormat: 'A globális formázási tartalmat a "VXETable.formats" használatával kell meghatározni. A "formatter={0}" beillesztési módja már nem ajánlott.',
      notType: 'Nem támogatott "{0}" fájltípus',
      notExp: 'Ez a böngésző nem támogatja az importálási/exportálási funkciókat',
      impFields: 'Az importálás nem sikerült, ellenőrizze, hogy a mezőnév és az adatformátum helyes-e',
      treeNotImp: 'A fatáblák nem támogatják az importálást'
    },
    table: {
      emptyText: 'Még nincsenek adatok',
      allTitle: 'Összes kijelölése/Mégse',
      seqTitle: 'sorozatszámát',
      actionTitle: 'működik',
      confirmFilter: 'szűrő',
      resetFilter: 'reset',
      allFilter: 'minden',
      sortAsc: 'Növekvő sorrend: a legalacsonyabbtól a legmagasabbig',
      sortDesc: 'Csökkenő sorrend: a legmagasabbtól a legalacsonyabbig',
      filter: 'Szűrés engedélyezése a kijelölt oszlopokon',
      impSuccess: '{0} rekord sikeresen importálva',
      expLoading: 'Exportálás',
      expSuccess: 'Az exportálás sikeres volt',
      expError: 'Export failure',
      expFilename: 'Exportálás_{0}',
      expOriginFilename: 'export_source_{0}',
      customTitle: 'Oszlopbeállítások',
      customAll: 'minden',
      customConfirm: 'erősítse meg',
      customClose: 'bezárás',
      customCancel: 'Mégsem',
      customRestore: 'Alapértelmezés visszaállítása',
      maxFixedCol: 'A rögzített oszlopok maximális száma nem haladhatja meg a következőt: {0}',
      dragTip: '移动：{0}'
    },
    grid: {
      selectOneRecord: 'Kérjük, válasszon legalább egy rekordot!',
      deleteSelectRecord: 'Biztosan törli a kiválasztott rekordokat?',
      removeSelectRecord: 'Biztosan eltávolítja a kiválasztott rekordokat?',
      dataUnchanged: 'Az adatok nem változtak!',
      delSuccess: 'A kiválasztott rekordok sikeresen törölve!',
      saveSuccess: 'Sikeres mentés!',
      operError: 'Hiba történt, és a művelet meghiúsult!'
    },
    select: {
      search: 'keresés',
      loadingText: 'terhelés',
      emptyText: 'Még nincsenek adatok'
    },
    pager: {
      goto: 'Menj ide',
      gotoTitle: 'Oldalak száma',
      pagesize: '{0} elem/oldal',
      total: 'Összesen {0} rekord',
      pageClassifier: 'oldal',
      homePage: 'címlapon',
      homePageTitle: 'címlapon',
      prevPage: 'Előző oldal',
      prevPageTitle: 'Előző oldal',
      nextPage: 'Következő oldal',
      nextPageTitle: 'Következő oldal',
      prevJump: 'Ugrás az oldalra',
      prevJumpTitle: 'Ugrás az oldalra',
      nextJump: 'Ugrás lefelé az oldallal',
      nextJumpTitle: 'Ugrás lefelé az oldallal',
      endPage: 'Utolsó oldal',
      endPageTitle: 'Utolsó oldal'
    },
    alert: {
      title: 'Rendszer prompt'
    },
    button: {
      confirm: 'erősítse meg',
      cancel: 'Mégsem'
    },
    filter: {
      search: 'keresés'
    },
    custom: {
      cstmTitle: 'Oszlopbeállítások',
      cstmRestore: 'Alapértelmezés visszaállítása',
      cstmCancel: 'Mégsem',
      cstmConfirm: 'Persze',
      cstmConfirmRestore: 'Kérjük, erősítse meg, hogy visszaállítja-e az alapértelmezett oszlopkonfigurációt?',
      cstmDragTarget: '移动：{0}',
      setting: {
        colSort: 'fajta',
        sortHelpTip: 'Kattintson és húzza az ikont az oszlopok sorrendjének módosításához',
        colTitle: 'cím',
        colResizable: 'Oszlopszélesség (pixel)',
        colVisible: 'Megjelenik-e',
        colFixed: 'fagyasztóoszlop',
        colFixedMax: 'Oszlopok rögzítése (legfeljebb {0} oszlop)',
        fixedLeft: 'bal oldalt',
        fixedUnset: 'Nincs beállítva',
        fixedRight: 'jobb oldalon'
      }
    },
    import: {
      modes: {
        covering: 'Felülírási módszer (a táblázat adatainak közvetlen felülírása)',
        insert: 'Hozzáfűzés a táblázat alján (új adatok hozzáfűzése a táblázat aljához)',
        insertTop: 'Felső hozzáfűzés (új adatok hozzáfűzése a táblázat tetejéhez)',
        insertBottom: 'Hozzáfűzés a táblázat alján (új adatok hozzáfűzése a táblázat aljához)'
      },
      impTitle: 'Adatok importálása',
      impFile: 'fájlnév',
      impSelect: 'Válassza ki a fájlt',
      impType: 'Fájl típusa',
      impOpts: 'Paraméter beállítások',
      impMode: 'importálási mód',
      impConfirm: 'import',
      impCancel: 'Mégsem'
    },
    export: {
      types: {
        csv: 'CSV (vesszővel elválasztva) (*.csv)',
        html: 'Weboldal (*.html)',
        xml: 'XML adatok (*.xml)',
        txt: 'Szövegfájl (tabulátorral tagolt) (*.txt)',
        xls: 'Excel 97-2003 munkafüzet (*.xls)',
        xlsx: 'Excel-munkafüzet (*.xlsx)',
        pdf: 'PDF (*.pdf)'
      },
      modes: {
        current: 'Aktuális adatok (az aktuális oldal adatai)',
        selected: 'Kijelölt adatok (kijelölt adatok az aktuális oldalon)',
        all: 'Teljes adat (beleértve az összes oldalszámozott adatot)'
      },
      printTitle: 'Adatok nyomtatása',
      expTitle: 'Adatok exportálása',
      expName: 'fájlnév',
      expNamePlaceholder: 'Kérjük, adjon meg egy fájlnevet',
      expSheetName: 'cím',
      expSheetNamePlaceholder: 'Kérjük, adjon meg egy címet',
      expType: 'mentés típusa',
      expMode: 'Válassza ki az adatokat',
      expCurrentColumn: 'Minden mező',
      expColumn: 'Válassza ki a mezőt',
      expOpts: 'Paraméter beállítások',
      expOptHeader: 'Fejléc',
      expHeaderTitle: 'Szükséges a fejléc?',
      expOptFooter: 'táblázat vége',
      expFooterTitle: 'Szükséges a táblázat lábléce?',
      expOptColgroup: 'Csoportfejléc',
      expColgroupTitle: 'Ha vannak, a csoportosító szerkezetű fejlécek támogatottak',
      expOptMerge: 'összeolvad',
      expMergeTitle: 'Támogatja a cellákat egyesítési struktúrákkal, ha vannak',
      expOptAllExpand: 'Szint bővítése',
      expAllExpandTitle: 'Ha létezik, támogatja az összes adat kibontását hierarchikus szerkezettel.',
      expOptUseStyle: 'stílus',
      expUseStyleTitle: 'A stílusos cellák támogatottak, ha vannak',
      expOptOriginal: 'forrásadatok',
      expOriginalTitle: 'Ha forrásadatokról van szó, akkor támogatja a táblába történő importálást',
      expPrint: 'Nyomtatás',
      expConfirm: 'Export',
      expCancel: 'Mégsem'
    },
    modal: {
      errTitle: 'Hibaüzenet',
      zoomMin: 'minimalizálni',
      zoomIn: 'maximalizálni',
      zoomOut: 'csökkentés',
      close: 'bezárás',
      miniMaxSize: 'A minimalizált ablakok száma nem haladhatja meg a következőt: {0}',
      footPropErr: 'show-footer 仅用于启用表尾，需配合 show-confirm-button | show-cancel-button | 插槽使用'
    },
    drawer: {
      close: 'bezárás'
    },
    form: {
      folding: 'közeli',
      unfolding: 'Bontsa ki'
    },
    toolbar: {
      import: 'import',
      export: 'Export',
      print: 'Nyomtatás',
      refresh: 'frissíteni',
      zoomIn: 'teljes képernyő',
      zoomOut: 'csökkentés',
      custom: 'Oszlopbeállítások',
      customAll: 'minden',
      customConfirm: 'erősítse meg',
      customRestore: 'reset',
      fixedLeft: 'lefagyott a bal oldalon',
      fixedRight: 'lefagyott a jobb oldalon',
      cancelFixed: 'Oldja fel az oszlopot'
    },
    input: {
      date: {
        m1: 'január',
        m2: 'február',
        m3: 'március',
        m4: 'április',
        m5: 'május',
        m6: 'Június',
        m7: 'július',
        m8: 'augusztus',
        m9: 'szeptember',
        m10: 'október',
        m11: 'november',
        m12: 'december',
        quarterLabel: '{0} év',
        monthLabel: '{0} év',
        dayLabel: '{0} év {1}',
        labelFormat: {
          date: 'yyyy-MM-dd',
          time: 'HH:mm:ss',
          datetime: 'yyyy-MM-dd HH:mm:ss',
          week: 'yyyy év WW hete',
          month: 'yyyy-MM',
          quarter: 'negyedév q év yyyy',
          year: 'yyyy'
        },
        weeks: {
          w: 'hét',
          w0: 'vasárnap',
          w1: 'hétfőn',
          w2: 'kedd',
          w3: 'szerda',
          w4: 'csütörtök',
          w5: 'péntek',
          w6: 'szombat'
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
          q1: 'első negyedévben',
          q2: 'második negyedévben',
          q3: 'harmadik negyedévben',
          q4: 'negyedik negyedévben'
        }
      }
    },
    imagePreview: {
      popupTitle: 'Előnézet',
      operBtn: {
        zoomOut: 'kicsinyítés',
        zoomIn: 'nagyít',
        pctFull: 'arányos skálázás',
        pct11: 'Eredeti méret megjelenítése',
        rotateLeft: 'Forgatás balra',
        rotateRight: 'Forgatás jobbra',
        print: 'Kattintson a kép nyomtatásához',
        download: 'Kattintson a kép letöltéséhez'
      }
    },
    upload: {
      fileBtnText: 'Kattintson vagy húzza a feltöltéshez',
      imgBtnText: 'Kattintson vagy húzza a feltöltéshez',
      dragPlaceholder: 'Kérjük, húzza át a fájlt erre a területre a feltöltéshez',
      imgSizeHint: 'Szórólap{0}',
      imgCountHint: 'Maximum {0} kép',
      fileTypeHint: 'Támogatott {0} fájltípus',
      fileSizeHint: 'Egyetlen fájl mérete nem haladja meg a következőt: {0}',
      fileCountHint: 'Legfeljebb {0} fájl tölthető fel',
      uploadTypeErr: '文件类型不匹配！',
      overCountErr: 'Csak {0} fájl választható ki!',
      overCountExtraErr: 'Túllépte a maximálisan megengedett {0} fájlt. A többlet {1} fájlt figyelmen kívül hagyja.',
      overSizeErr: 'A maximális fájlméret nem haladhatja meg a következőt: {0}!',
      reUpload: 'Újratöltés',
      uploadProgress: 'Feltöltés: {0}%',
      uploadErr: 'A feltöltés sikertelen',
      uploadSuccess: 'Feltöltés sikeres',
      moreBtnText: 'Továbbiak ({0})',
      viewItemTitle: 'Kattintson a megtekintéséhez',
      morePopup: {
        readTitle: 'lista megtekintése',
        imageTitle: 'Tölts fel képeket',
        fileTitle: 'Fájlok feltöltése'
      }
    },
    empty: {
      defText: '暂无数据'
    },
    formDesign: {
      formName: 'forma neve',
      defFormTitle: 'névtelen forma',
      widgetPropTab: 'Vezérlési tulajdonságok',
      widgetFormTab: 'forma tulajdonságait',
      error: {
        wdFormUni: 'Csak egy ilyen típusú vezérlő adható az űrlaphoz',
        wdSubUni: 'Csak egy ilyen típusú vezérlő adható hozzá az altáblázathoz'
      },
      styleSetting: {
        btn: 'Stílusbeállítások',
        title: 'Űrlapstílus-beállítások',
        layoutTitle: 'Vezérlő elrendezés',
        verticalLayout: 'Felső és alsó elrendezés',
        horizontalLayout: 'Vízszintes elrendezés',
        styleTitle: 'Cím stílusa',
        boldTitle: 'A cím félkövér',
        fontBold: 'Bátor',
        fontNormal: 'hagyományos',
        colonTitle: 'Mutasd a kettőspontot',
        colonVisible: 'megmutat',
        colonHidden: 'elrejt',
        alignTitle: 'Igazítás',
        widthTitle: 'cím szélessége',
        alignLeft: 'a bal oldalon',
        alignRight: 'a jobb oldalon',
        unitPx: 'Pixel',
        unitPct: 'százalék'
      },
      widget: {
        group: {
          base: 'Alapvető vezérlők',
          layout: 'Elrendezésvezérlők',
          system: 'Rendszervezérlők',
          module: 'modulvezérlés',
          chart: 'diagram vezérlés',
          advanced: 'Speciális vezérlők'
        },
        copyTitle: 'Másolás_{0}',
        component: {
          input: 'Beviteli doboz',
          textarea: 'szöveges mezőben',
          select: 'legördülő menü kiválasztása',
          row: 'Egy sor és több oszlop',
          title: 'cím',
          text: 'szöveg',
          subtable: 'Altáblázat',
          VxeSwitch: 'hogy vajon',
          VxeInput: 'Beviteli doboz',
          VxeNumberInput: 'szám',
          VxeDatePicker: 'dátum',
          VxeTextarea: 'szöveges mezőben',
          VxeSelect: 'legördülő menü kiválasztása',
          VxeTreeSelect: 'fa kiválasztása',
          VxeRadioGroup: 'rádió gomb',
          VxeCheckboxGroup: 'jelölőnégyzetet',
          VxeUploadFile: 'dokumentum',
          VxeUploadImage: 'kép',
          VxeRate: 'Rate',
          VxeSlider: 'Slider'
        }
      },
      widgetProp: {
        name: 'Vezérlő neve',
        placeholder: 'gyors',
        required: 'Szükséges ellenőrzés',
        multiple: 'Több kijelölés engedélyezése',
        displaySetting: {
          name: 'megjelenítési beállítások',
          pc: 'PC',
          mobile: 'Mobil verzió',
          visible: 'megmutat',
          hidden: 'elrejt'
        },
        dataSource: {
          name: 'adatforrás',
          defValue: '{0}. lehetőség',
          addOption: 'Beállítások hozzáadása',
          batchEditOption: 'Kötegelt szerkesztés',
          batchEditTip: 'Minden sor egy opciónak felel meg, és támogatja a közvetlenül a táblázatokból, Excelből és WPS-ből történő másolást és beillesztést.',
          batchEditSubTip: 'Minden sor egy beállításnak felel meg. Ha csoportról van szó, akkor az alelemek szóközzel vagy tabulátorral kezdődhetnek, az Excel és a WPS közvetlen másolása és beillesztése támogatott.',
          buildOption: 'Építési lehetőségek'
        },
        rowProp: {
          colSize: 'Oszlopok száma',
          col2: 'két oszlop',
          col3: 'három oszlop',
          col4: 'négy oszlop',
          col6: 'hat oszlop',
          layout: 'elrendezés'
        },
        textProp: {
          name: 'tartalom',
          alignTitle: 'Igazítás',
          alignLeft: 'a bal oldalon',
          alignCenter: 'központ',
          alignRight: 'a jobb oldalon',
          colorTitle: 'Betűszín',
          sizeTitle: 'betűméret',
          boldTitle: 'Félkövér betűtípus',
          fontNormal: 'hagyományos',
          fontBold: 'Bátor'
        },
        subtableProp: {
          seqTitle: 'sorozatszámát',
          showSeq: 'Sorozatszám megjelenítése',
          showCheckbox: 'Több kijelölés engedélyezése',
          errSubDrag: 'Az altábla nem támogatja ezt a vezérlőt, kérjük, használjon más vezérlőket',
          colPlace: 'Húzza be a vezérlőt'
        },
        uploadProp: {
          limitFileCount: 'Fájl mennyiségi korlát',
          limitFileSize: 'Fájlméret korlátozás',
          multiFile: 'Több fájl feltöltésének engedélyezése',
          limitImgCount: 'Kép mennyiségi korlát',
          limitImgSize: 'Képméret korlát',
          multiImg: 'Több kép feltöltésének engedélyezése'
        }
      }
    },
    listDesign: {
      fieldSettingTab: 'Helyi beállítások',
      listSettingTab: 'Paraméter beállítások',
      searchTitle: 'Lekérdezési feltételek',
      listTitle: 'lista mezőben',
      searchField: 'Lekérdezési mező',
      listField: 'lista mezőben',
      activeBtn: {
        ActionButtonUpdate: 'szerkeszteni',
        ActionButtonDelete: 'töröl'
      },
      search: {
        addBtn: 'szerkeszteni',
        emptyText: 'Nincsenek konfigurálva lekérdezési feltételek',
        editPopupTitle: 'Lekérdezési mezők szerkesztése'
      },
      searchPopup: {
        colTitle: 'cím',
        saveBtn: 'megtakarítás'
      }
    },
    text: {
      copySuccess: 'Vágólapra másolva',
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
          mergeErr: 'Ez a művelet nem hajtható végre egyesített cellákon',
          multiErr: 'Ez a művelet nem hajtható végre több kiválasztási területen',
          selectErr: 'Unable to operate the cells in the designated area.',
          extendErr: 'Ha a kiterjesztett tartomány egyesített cellákat tartalmaz, az összes egyesített cellának azonos méretűnek kell lennie',
          pasteMultiErr: 'Nem lehet beilleszteni, a másolt és beillesztett területeknek azonos méretűnek kell lenniük a művelet végrehajtásához',
          cpInvalidErr: 'A művelet nem hajtható végre. Tiltott oszlopok ({0}) vannak a kiválasztott tartományban.'
        },
        fnr: {
          title: 'Keresse meg és cserélje ki',
          findLabel: 'Lelet',
          replaceLabel: 'cserélje ki',
          findTitle: 'Mit találsz:',
          replaceTitle: 'Csere erre:',
          tabs: {
            find: 'Lelet',
            replace: 'cserélje ki'
          },
          filter: {
            re: 'reguláris kifejezés',
            whole: 'egész szó egyezés',
            sensitive: 'kis- és nagybetűérzékeny'
          },
          btns: {
            findNext: 'Keresse meg a következőt',
            findAll: 'Találd meg az összeset',
            replace: 'cserélje ki',
            replaceAll: 'Cserélje ki az összeset',
            cancel: 'Mégsem'
          },
          header: {
            seq: '#',
            cell: 'sejt',
            value: 'érték'
          },
          empty: '(null érték)',
          reError: 'Érvénytelen reguláris kifejezés',
          recordCount: '{0} cella található',
          notCell: 'Nem található egyező cella',
          replaceSuccess: '{0} cella sikeresen lecserélve'
        }
      },
      filterComplexInput: {
        menus: {
          fixedColumn: 'fagyasztóoszlop',
          fixedGroup: 'fagyasztó csoport',
          cancelFixed: 'Kiolvaszt',
          fixedLeft: 'lefagy balra',
          fixedRight: 'lefagy jobbra'
        },
        cases: {
          equal: 'egyenlő',
          gt: 'nagyobb mint',
          lt: 'kevesebb mint',
          begin: 'A kezdet az',
          endin: 'A vége az',
          include: 'Tartalmazza',
          isSensitive: 'kis- és nagybetűérzékeny'
        }
      },
      filterCombination: {
        menus: {
          clearSort: 'Tiszta rendezés',
          sortAsc: 'Növekvő sorrend',
          sortDesc: 'csökkenő sorrendben',
          fixedColumn: 'fagyasztóoszlop',
          fixedGroup: 'fagyasztó csoport',
          cancelFixed: 'Kiolvaszt',
          fixedLeft: 'lefagy balra',
          fixedRight: 'lefagy jobbra',
          clearFilter: 'Tiszta szűrők',
          textOption: 'szövegszűrő',
          numberOption: 'numerikus szűrő'
        },
        popup: {
          title: 'A szűrés testreszabása',
          currColumnTitle: 'Jelenlegi oszlop:',
          and: 'és',
          or: 'vagy',
          describeHtml: 'Az Elérhető ? egyetlen karaktert jelöl.<br/>A * tetszőleges számú karaktert jelöl'
        },
        cases: {
          equal: 'egyenlő',
          unequal: 'nem egyenlő',
          gt: 'nagyobb mint',
          ge: 'nagyobb vagy egyenlő',
          lt: 'kevesebb mint',
          le: 'kisebb vagy egyenlő',
          begin: 'A kezdet az',
          notbegin: 'Az elején nem',
          endin: 'A vége az',
          notendin: 'A vége nem',
          include: 'Tartalmazza',
          exclude: 'Nem tartalmazza',
          between: 'között',
          custom: 'Egyedi szűrő',
          insensitive: 'Nem érzékeny a kis- és nagybetűkre',
          isSensitive: 'kis- és nagybetűérzékeny'
        },
        empty: '(üres)',
        notData: 'Nincs egyezés'
      }
    },
    pro: {
      area: {
        mergeErr: 'Ez a művelet nem hajtható végre egyesített cellákon',
        multiErr: 'Ez a művelet nem hajtható végre több kiválasztási területen',
        extendErr: 'Ha a kiterjesztett tartomány egyesített cellákat tartalmaz, az összes egyesített cellának azonos méretűnek kell lennie',
        pasteMultiErr: 'Nem lehet beilleszteni, a másolt és beillesztett területeknek azonos méretűnek kell lenniük a művelet végrehajtásához'
      },
      fnr: {
        title: 'Keresse meg és cserélje ki',
        findLabel: 'Lelet',
        replaceLabel: 'cserélje ki',
        findTitle: 'Mit találsz:',
        replaceTitle: 'Csere erre:',
        tabs: {
          find: 'Lelet',
          replace: 'cserélje ki'
        },
        filter: {
          re: 'reguláris kifejezés',
          whole: 'egész szó egyezés',
          sensitive: 'kis- és nagybetűérzékeny'
        },
        btns: {
          findNext: 'Keresse meg a következőt',
          findAll: 'Találd meg az összeset',
          replace: 'cserélje ki',
          replaceAll: 'Cserélje ki az összeset',
          cancel: 'Mégsem'
        },
        header: {
          seq: '#',
          cell: 'sejt',
          value: 'érték'
        },
        empty: '(null érték)',
        reError: 'Érvénytelen reguláris kifejezés',
        recordCount: '{0} cella található',
        notCell: 'Nem található egyező cella',
        replaceSuccess: '{0} cella sikeresen lecserélve'
      }
    },
    renderer: {
      search: 'keresés',
      cases: {
        equal: 'egyenlő',
        unequal: 'nem egyenlő',
        gt: 'nagyobb mint',
        ge: 'nagyobb vagy egyenlő',
        lt: 'kevesebb mint',
        le: 'kisebb vagy egyenlő',
        begin: 'A kezdet az',
        notbegin: 'Az elején nem',
        endin: 'A vége az',
        notendin: 'A vége nem',
        include: 'Tartalmazza',
        exclude: 'Nem tartalmazza',
        between: 'között',
        custom: 'Egyedi szűrő',
        insensitive: 'Nem érzékeny a kis- és nagybetűkre',
        isSensitive: 'kis- és nagybetűérzékeny'
      },
      combination: {
        menus: {
          clearSort: 'Tiszta rendezés',
          sortAsc: 'Növekvő sorrend',
          sortDesc: 'csökkenő sorrendben',
          fixedColumn: 'Lock oszlop',
          fixedGroup: 'Zár csoport',
          cancelFixed: 'Kinyit',
          fixedLeft: 'Zár balra',
          fixedRight: 'Zárja le jobbra',
          clearFilter: 'Tiszta szűrők',
          textOption: 'szövegszűrő',
          numberOption: 'numerikus szűrő'
        },
        popup: {
          title: 'A szűrés testreszabása',
          currColumnTitle: 'Jelenlegi oszlop:',
          and: 'és',
          or: 'vagy',
          describeHtml: 'Az Elérhető ? egyetlen karaktert jelöl.<br/>A * tetszőleges számú karaktert jelöl'
        },
        empty: '(üres)',
        notData: 'Nincs egyezés'
      }
    }
  }
}
