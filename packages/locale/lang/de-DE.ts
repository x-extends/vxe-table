export default {
  vxe: {
    base: {
      pleaseInput: 'Bitte geben Sie ein',
      pleaseSelect: 'Bitte wählen Sie',
      comma: '，',
      fullStop: '。'
    },
    loading: {
      text: 'Laden...'
    },
    error: {
      downErr: 'Download fehlgeschlagen',
      errLargeData: 'Wenn die Menge der gebundenen Daten zu groß ist, verwenden Sie bitte {0}, andernfalls kann dies eine Verzögerung verursachen',
      groupFixed: 'Bei Verwendung von gruppierten Headern muss die gefrorene Spalte nach Gruppen festgelegt werden',
      groupMouseRange: 'Der Gruppierungsheader kann nicht gleichzeitig wie "{0}" verwendet werden, und dies kann einen Fehler verursachen',
      groupTag: 'Gruppierungsspalten -Header sollten "{0}" anstelle von "{1}" verwenden, was zu Fehlern führen kann',
      scrollErrProp: 'Dieser Parameter "{0}" wird nicht unterstützt, nachdem die virtuelle Scrollen aktiviert ist',
      errConflicts: 'Parameter "{0}" Konflikte mit "{1}"',
      modelConflicts: 'Es gibt einen Konflikt zwischen dem gebundenen Feldwert "{0}" und "{1}", und ein Fehler tritt auf',
      notSupportProp: '"{1}" wird nicht unterstützt, wenn der Parameter "{0}" aktiviert ist. Es sollte "{2}" sein, andernfalls tritt ein Fehler auf',
      reqSupportProp: '当使用 "{0}" 时，应该设置 "{1}"，否则可能会出现错误',
      notConflictProp: 'Wenn "{0}" verwendet wird, sollte "{1}" festgelegt werden, andernfalls kann es funktionale Konflikte geben',
      unableInsert: 'Kann nicht in den angegebenen Ort eingefügt werden. Überprüfen Sie bitte, ob die Parameter korrekt sind',
      useErr: 'Bei der Installation des Moduls "{0}" trat ein Fehler auf. Die Bestellung kann falsch sein. Das abhängige Modul muss vor der Tabelle installiert werden',
      barUnableLink: 'Die Symbolleiste kann Tabellen nicht assoziieren',
      expandContent: 'Der Steckplatz für die erweiterte Linie sollte "Inhalt" sein. Bitte prüfen Sie, ob sie korrekt ist',
      reqComp: 'Die "{0}" -Komponente fehlt, bitte prüfen Sie, ob sie korrekt installiert ist. https://vxeui.com/#/start/useglobal',
      reqModule: 'Fehlendes "{0}" Modul',
      reqProp: 'Der erforderliche Parameter "{0}" fehlt, der einen Fehler verursachen kann',
      emptyProp: 'Parameter "{0}" darf nicht leer sein',
      errProp: 'Nicht unterstützter Parameter "{0}", möglicherweise "{1}"',
      colRepet: 'Spalte. {0} = "{1}" wird wiederholt, was dazu führen kann, dass einige Funktionen unbrauchbar werden',
      notFunc: 'Methode "{0}" existiert nicht',
      errFunc: 'Parameter "{0}" ist keine Methode',
      notValidators: 'Globale Überprüfung "{0}" existiert nicht',
      notFormats: 'Globale Formatierung "{0}" existiert nicht',
      notCommands: 'Die globale Richtlinie "{0}" existiert nicht',
      notSlot: 'Slot "{0}" existiert nicht',
      noTree: '"{0}" wird in der Baumstruktur nicht unterstützt',
      noGroup: '"{0}" wird nach der Datengruppierung nicht unterstützt',
      notProp: 'Nicht unterstützter Parameter "{0}"',
      checkProp: 'Wenn das Datenvolumen zu groß ist, kann das Kontrollkästchen stottern. Es wird empfohlen, den Parameter "{0}" festzulegen, um die Rendering -Geschwindigkeit zu verbessern',
      coverProp: 'Der Parameter "{1}" von "{0}" wird wiederholt definiert, was einen Fehler verursachen kann',
      uniField: 'Der Feldname "{0}" wird wiederholt definiert, was einen Fehler verursachen kann',
      repeatKey: 'Wiederholen Sie den Primärschlüssel {0} = "{1}", der einen Fehler verursachen kann',
      repeatProp: '参数重复 {0}="{1}"，这可能会出现错误',
      delFunc: 'Methode "{0}" ist veraltet, bitte verwenden Sie "{1}".',
      delProp: 'Parameter "{0}" ist veraltet, bitte verwenden Sie "{1}".',
      delEvent: 'Ereignis "{0}" ist veraltet, bitte verwenden Sie "{1}".',
      removeProp: 'Der Parameter "{0}" ist veraltet und wird nicht empfohlen, was einen Fehler verursachen kann',
      errFormat: 'Der globale formatierte Inhalt sollte mit "vxetable.formats" definiert werden, und die Methode zur Montage "Formatter = {0}" wird nicht mehr empfohlen.',
      notType: 'Nicht unterstützter Dateityp "{0}"',
      notExp: 'Dieser Browser unterstützt keine Import-/Exportfunktion',
      impFields: 'Der Import ist fehlgeschlagen. Bitte überprüfen Sie, ob das Feldname und das Datenformat korrekt sind.',
      treeNotImp: 'Baumtische unterstützen den Import nicht',
      treeCrossDrag: 'Ziehen Sie nur die erste Ebene',
      treeDragChild: 'Eltern können nicht zu ihren eigenen Kindern ziehen',
      reqPlugin: '"{1}" ist nicht unter https://vxeui.com/Otheriationation installiert',
      errMaxRow: 'Wenn das maximal unterstützte Datenvolumen {0} Zeilen überschreitet, kann dies einen Fehler verursachen',
      useNew: '{0} wird nicht empfohlen, bitte verwenden Sie {1}',
      errorVersion: '版本不匹配，当前版本 {0}，最低支持版本为 {1}'
    },
    table: {
      emptyText: 'Noch keine Daten',
      allTitle: 'Wählen Sie alle/abbrechen',
      seqTitle: 'Seriennummer',
      actionTitle: 'arbeiten',
      confirmFilter: 'Filter',
      resetFilter: 'Zurücksetzen',
      allFilter: 'alle',
      sortAsc: 'Aufsteigende Ordnung: niedrigst bis zum höchsten',
      sortDesc: 'Absteigende Ordnung: höchste bis niedrigste',
      filter: 'Filterung für ausgewählte Spalten aktivieren',
      impSuccess: '{0} Datensätze wurden erfolgreich importiert',
      expLoading: 'Exportieren',
      expSuccess: 'Erfolgreich exportieren',
      expError: 'Export fehlgeschlagen',
      expFilename: 'Export_ {0}',
      expOriginFilename: 'Export_Source_ {0}',
      customTitle: 'Spalteneinstellungen',
      customAll: 'alle',
      customConfirm: 'bestätigen',
      customClose: 'Schließung',
      customCancel: 'Stornieren',
      customRestore: 'Standardeinstellung wiederherstellen',
      maxFixedCol: 'Die maximale Anzahl von gefrorenen Spalten darf {0} nicht überschreiten',
      maxGroupCol: 'Die Anzahl der maximalen Gruppierungsfelder darf {0} nicht überschreiten',
      dragTip: 'Bewegung: {0}',
      resizeColTip: 'Breite: {0} Pixel',
      resizeRowTip: 'Hoch: {0} Pixel',
      rowGroupContentTotal: '{0}（{1}）',
      menuLoading: '加载中...'
    },
    grid: {
      selectOneRecord: 'Bitte wählen Sie mindestens einen Datensatz aus!',
      deleteSelectRecord: 'Sind Sie sicher, dass Sie den ausgewählten Datensatz löschen möchten?',
      removeSelectRecord: 'Sind Sie sicher, dass Sie den ausgewählten Datensatz entfernen möchten?',
      dataUnchanged: 'Daten nicht geändert!',
      delSuccess: 'Der ausgewählte Rekord wurde erfolgreich gelöscht!',
      saveSuccess: 'Erfolgreich sparen!',
      operError: 'Ein Fehler ist aufgetreten und die Operation ist fehlgeschlagen!'
    },
    select: {
      clear: 'Klar',
      allChecked: 'Wählen Sie alle aus',
      total: '{0} / {1}',
      search: 'suchen',
      loadingText: 'Laden',
      emptyText: 'Noch keine Daten',
      maxSize: 'Die maximale Anzahl von Optionen kann {0} nicht überschreiten',
      overSizeErr: 'Die maximale optionale Nummer {0} wurde überschritten und der Überschuss wird ignoriert!',
      searchEmpty: 'Keine Daten entspricht!'
    },
    tree: {
      searchEmpty: 'Keine Daten entspricht!',
      dragTip: '移动：{0}'
    },
    treeSelect: {
      clearChecked: 'Klar',
      allChecked: 'Wählen Sie alle aus',
      allExpand: 'Alle erweitern',
      clearExpand: 'Alle schließen',
      total: 'Ausgewählt {0}',
      search: 'suchen',
      emptyText: 'Noch keine Daten'
    },
    pager: {
      goto: 'Gehen',
      gotoTitle: 'Anzahl der Seiten',
      pagesize: '{0} Elemente/Seite',
      total: 'Total {0} Datensätze',
      pageClassifier: 'Seite',
      homePage: 'Titelseite',
      homePageTitle: 'Titelseite',
      prevPage: 'Vorherige Seite',
      prevPageTitle: 'Vorherige Seite',
      nextPage: 'Nächste Seite',
      nextPageTitle: 'Nächste Seite',
      prevJump: 'Seite hochspringen',
      prevJumpTitle: 'Seite hochspringen',
      nextJump: 'Seite nach unten springen',
      nextJumpTitle: 'Seite nach unten springen',
      endPage: 'Letzte Seite',
      endPageTitle: 'Letzte Seite'
    },
    alert: {
      title: 'Systemaufforderungen'
    },
    button: {
      confirm: 'bestätigen',
      cancel: 'Stornieren',
      clear: 'Klar'
    },
    filter: {
      search: 'suchen'
    },
    custom: {
      cstmTitle: 'Spalteneinstellungen',
      cstmRestore: 'Standardeinstellung wiederherstellen',
      cstmCancel: 'Stornieren',
      cstmConfirm: 'Sicher',
      cstmConfirmRestore: 'Bitte bestätigen Sie, ob es in die Standardspaltenkonfiguration wiederhergestellt wird.',
      cstmDragTarget: 'Bewegung: {0}',
      setting: {
        colSort: 'Sortieren',
        sortHelpTip: 'Klicken Sie auf das Symbol und ziehen Sie das Symbol, um die Bestellung anzupassen',
        colTitle: 'Spaltenentitel',
        colResizable: 'Säulenbreite (Pixel)',
        colVisible: 'Ob angezeigt',
        colFixed: 'Einfrierensäule',
        colFixedMax: 'Spalten einfrieren (bis zu {0} Spalten)',
        fixedLeft: 'Linke Seite',
        fixedUnset: 'Nicht gesetzt',
        fixedRight: 'Rechte Seite'
      }
    },
    import: {
      modes: {
        covering: 'Überschreibe -Methode (direkt überschreibe Tabellendaten)',
        insert: 'Gehen Sie unten an (Gehen Sie am Ende der Tabelle neue Daten an)',
        insertTop: 'Gehen Sie oben an (Gehen Sie neue Daten oben in der Tabelle an)',
        insertBottom: 'Gehen Sie unten an (Gehen Sie am Ende der Tabelle neue Daten an)'
      },
      impTitle: 'Daten importieren',
      impFile: 'Dateiname',
      impSelect: 'Wählen Sie eine Datei aus',
      impType: 'Dateityp',
      impOpts: 'Parametereinstellungen',
      impMode: 'Importmodus',
      impConfirm: 'Import',
      impCancel: 'Stornieren'
    },
    export: {
      types: {
        csv: 'CSV (Comma-getrennt) (*. CSV)',
        html: 'Webseite (*.html)',
        xml: 'XML -Daten (*.xml)',
        txt: 'Textdatei (tabendressierte) (*. Txt)',
        xls: 'Excel 97-2003 Arbeitsbuch (*.xls)',
        xlsx: 'Excel Workbook (*.xlsx)',
        pdf: 'PDF (*.pdf)'
      },
      modes: {
        empty: 'Leere Daten',
        current: 'Aktuelle Daten (Daten auf der aktuellen Seite)',
        selected: 'Ausgewählte Daten (Daten auf der aktuellen Seite ausgewählt)',
        all: 'Vollständige Daten (einschließlich aller ausgelieferten Daten)'
      },
      printTitle: 'Daten drucken',
      expTitle: 'Daten exportieren',
      expName: 'Dateiname',
      expNamePlaceholder: 'Bitte geben Sie einen Dateinamen ein',
      expSheetName: 'Titel',
      expSheetNamePlaceholder: 'Bitte geben Sie einen Titel ein',
      expType: 'Typ speichern',
      expMode: 'Daten auswählen',
      expCurrentColumn: 'Alle Felder',
      expColumn: 'Wählen Sie ein Feld aus',
      expOpts: 'Parametereinstellungen',
      expOptHeader: 'Kopfball',
      expHeaderTitle: 'Ist der Tischkopf benötigt',
      expOptFooter: 'Ende der Tabelle',
      expFooterTitle: 'Ist das Ende der Tabelle erforderlich?',
      expOptColgroup: 'Gruppierungsheader',
      expOptTitle: 'Spaltenentitel',
      expTitleTitle: 'Ob es sich um den Spaltentitel handelt, sonst wird er als Feldname der Spalte angezeigt',
      expColgroupTitle: 'Wenn vorhanden, wird ein Kopfball mit einer Gruppierungsstruktur unterstützt',
      expOptMerge: 'verschmelzen',
      expMergeTitle: 'Wenn vorhanden, werden Zellen mit zusammengeführten Strukturen unterstützt',
      expOptAllExpand: 'Den Baum erweitern',
      expAllExpandTitle: 'Wenn es existiert, wird es unterstützt, alle Daten mit hierarchischen Strukturen zu erweitern',
      expOptUseStyle: 'Stil',
      expUseStyleTitle: 'Wenn vorhanden, werden Zellen mit Stil unterstützt',
      expOptOriginal: 'Quelldaten',
      expOriginalTitle: 'Wenn es sich',
      expPrint: 'Drucken',
      expConfirm: 'Export',
      expCancel: 'Stornieren'
    },
    modal: {
      errTitle: 'Fehlermeldung',
      zoomMin: 'Minimieren',
      zoomIn: 'maximieren',
      zoomOut: 'Reduktion',
      close: 'Schließung',
      miniMaxSize: 'Die Anzahl der minimierten Fenster darf {0} nicht überschreiten',
      footPropErr: 'Show-Footer wird nur verwendet, um den Tischschwanz zu aktivieren, und muss mit Show-Confirm-Button | verwendet werden Show-Cancel-Button | Slots'
    },
    drawer: {
      close: 'Schließung'
    },
    form: {
      folding: 'Schließen',
      unfolding: 'Expandieren'
    },
    toolbar: {
      import: 'Import',
      export: 'Export',
      print: 'Drucken',
      refresh: 'Aktualisieren',
      zoomIn: 'Vollbild',
      zoomOut: 'Reduktion',
      custom: 'Spalteneinstellungen',
      customAll: 'alle',
      customConfirm: 'bestätigen',
      customRestore: 'Zurücksetzen',
      fixedLeft: 'Links einfrieren',
      fixedRight: 'Rechts einfrieren',
      cancelFixed: 'Säulen entfernen'
    },
    datePicker: {
      yearTitle: '{0} Jahre'
    },
    dateRangePicker: {
      pleaseRange: 'Bitte wählen Sie ein Startdatum und ein Enddatum'
    },
    input: {
      date: {
        m1: 'Januar',
        m2: 'Februar',
        m3: 'Marsch',
        m4: 'April',
        m5: 'Mai',
        m6: 'Juni',
        m7: 'Juli',
        m8: 'August',
        m9: 'September',
        m10: 'Oktober',
        m11: 'November',
        m12: 'Dezember',
        quarterLabel: '{0} Jahre',
        monthLabel: '{0} Jahre',
        dayLabel: '{0} Jahr {1}',
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
          w0: 'Sonntag',
          w1: 'am Montag',
          w2: 'Dienstag',
          w3: 'Mittwoch',
          w4: 'Donnerstag',
          w5: 'Freitag',
          w6: 'Samstag'
        },
        months: {
          m0: 'Januar',
          m1: 'Februar',
          m2: 'Marsch',
          m3: 'April',
          m4: 'Mai',
          m5: 'Juni',
          m6: 'Juli',
          m7: 'August',
          m8: 'September',
          m9: 'Oktober',
          m10: 'November',
          m11: 'Dezember'
        },
        quarters: {
          q1: 'Erstes Quartal',
          q2: 'Zweites Quartal',
          q3: 'Drittes Quartal',
          q4: 'Viertes Quartal'
        }
      }
    },
    calendar: {
      yearLabel: '{0} 年',
      monthLabel: '{0} 月'
    },
    numberInput: {
      currencySymbol: '$'
    },
    imagePreview: {
      popupTitle: 'Vorschau',
      operBtn: {
        zoomOut: 'Schrumpfen',
        zoomIn: 'vergrößern',
        pctFull: 'Gleichermaßen Skalierung',
        pct11: 'Originalgröße zeigen',
        rotateLeft: 'Links drehen',
        rotateRight: 'Nach rechts drehen',
        print: 'Klicken Sie hier, um das Bild zu drucken',
        download: 'Klicken Sie hier, um das Bild herunterzuladen'
      }
    },
    upload: {
      fileBtnText: 'Klicken Sie auf oder ziehen Sie zum Hochladen',
      imgBtnText: 'Klicken Sie auf oder ziehen Sie zum Hochladen',
      dragPlaceholder: 'Bitte ziehen Sie die Datei zum Hochladen in diesen Bereich und lassen Sie sie ab',
      imgSizeHint: 'Single {0}',
      imgCountHint: 'Bis {0}',
      fileTypeHint: 'Unterstützen Sie {0} Dateitypen',
      fileSizeHint: 'Eine einzelne Dateigröße überschreitet {0} nicht',
      fileCountHint: 'Bis zu {0} -Dateien können hochgeladen werden',
      uploadTypeErr: 'Dateityp -Nichtübereinstimmung!',
      overCountErr: 'Nur {0} -Dateien können höchstens ausgewählt werden!',
      overCountExtraErr: 'Die maximale Anzahl von {0} wurde überschritten, und die überschüssigen {1} -Dateien werden ignoriert!',
      overSizeErr: 'Die maximale Dateigröße darf {0} nicht überschreiten!',
      manualUpload: 'Klicken Sie hier, um hochzuladen',
      reUpload: 'Wiederbelastung',
      uploadProgress: 'Hochladen {0}%',
      uploadErr: 'Upload fehlgeschlagen',
      uploadSuccess: 'Erfolgreich hochladen',
      moreBtnText: 'Mehr ({0})',
      moreImgBtnText: '图片（{0}）',
      moreFileBtnText: '文件（{0}）',
      viewItemTitle: 'Klicken Sie hier, um anzuzeigen',
      morePopup: {
        readTitle: 'Zeigen Sie die Liste an',
        imageTitle: 'Laden Sie Bilder hoch',
        fileTitle: 'Datei hochladen'
      }
    },
    empty: {
      defText: 'Noch keine Daten'
    },
    colorPicker: {
      clear: 'Klar',
      confirm: 'bestätigen',
      copySuccess: 'Kopieren Sie in Zwischenablage: {0}',
      hex: 'HEX'
    },
    formDesign: {
      formName: 'Formname',
      defFormTitle: 'Unbenannte Form',
      widgetPropTab: 'Kontrolleigenschaften',
      widgetFormTab: 'Formeigenschaften',
      error: {
        wdFormUni: 'Diese Art der Steuerung darf nur einen in der Form hinzufügen',
        wdSubUni: 'Diese Art der Steuerung darf nur einen in die Subtisch hinzufügen'
      },
      styleSetting: {
        btn: 'Stileinstellungen',
        title: 'Formularstileinstellungen',
        layoutTitle: 'Kontrolllayout',
        verticalLayout: 'Auf und Ab -Layout',
        horizontalLayout: 'Horizontales Layout',
        styleTitle: 'Titelstil',
        boldTitle: 'Dicker Titel',
        fontBold: 'Deutlich',
        fontNormal: 'konventionell',
        colonTitle: 'Zeigen Sie Colon',
        colonVisible: 'zeigen',
        colonHidden: 'verstecken',
        alignTitle: 'Ausrichtung',
        widthTitle: 'Titelbreite',
        alignLeft: 'Auf der linken Seite',
        alignRight: 'Rechts',
        unitPx: 'Pixel',
        unitPct: 'Prozentsatz'
      },
      widget: {
        group: {
          base: 'Grundlegende Kontrollen',
          layout: 'Layoutkontrollen',
          system: 'Systemsteuerungen',
          module: 'Modulsteuerungen',
          chart: 'Diagrammkontrolle',
          advanced: 'Fortgeschrittene Steuerelemente'
        },
        copyTitle: 'Copy_ {0}',
        component: {
          input: 'Eingabefeld',
          textarea: 'Textfeld',
          select: 'Runter ziehen, um auszuwählen',
          row: 'Eine Zeile und mehrere Spalten',
          title: 'Titel',
          text: 'Text',
          subtable: 'Untertisch',
          VxeSwitch: 'ob',
          VxeInput: 'Eingabefeld',
          VxeNumberInput: 'Nummer',
          VxeDatePicker: 'Datum',
          VxeTextarea: 'Textfeld',
          VxeSelect: 'Runter ziehen, um auszuwählen',
          VxeTreeSelect: 'Baumauswahl',
          VxeRadioGroup: 'Radiobox',
          VxeCheckboxGroup: 'Kontrollkästchen',
          VxeUploadFile: 'dokumentieren',
          VxeUploadImage: 'Bild',
          VxeRate: 'Punktzahl',
          VxeSlider: 'Schieberegler'
        }
      },
      widgetProp: {
        name: 'Kontrollname',
        placeholder: 'Prompt',
        required: 'Erforderliche Überprüfung',
        multiple: 'Mehrere Auswahlmöglichkeiten sind erlaubt',
        displaySetting: {
          name: 'Einstellungen anzeigen',
          pc: 'Computer',
          mobile: 'Mobile',
          visible: 'zeigen',
          hidden: 'verstecken'
        },
        dataSource: {
          name: 'Datenquelle',
          defValue: 'Option {0}',
          addOption: 'Optionen hinzufügen',
          batchEditOption: 'Batch -Bearbeitung',
          batchEditTip: 'Jede Zeile entspricht einer Option, die direkte Kopie und Einfügen von Tabellen, Excel und WPS unterstützt.',
          batchEditSubTip: 'Jede Zeile entspricht einer Option. Wenn es sich um eine Gruppe handelt, können die untergeordneten Elemente mit einem Speicherplatz oder einem Registerkartenschlüssel beginnen und unterstützt direkte Kopien und Einfügen von Tabellen, Excel und WPS.',
          buildOption: 'Optionen generieren'
        },
        rowProp: {
          colSize: 'Anzahl der Spalten',
          col2: 'Zwei Spalten',
          col3: 'Drei Spalten',
          col4: 'Vier Spalten',
          col6: 'Sechs Spalten',
          layout: 'Layout'
        },
        textProp: {
          name: 'Inhalt',
          alignTitle: 'Ausrichtung',
          alignLeft: 'Auf der linken Seite',
          alignCenter: 'Center',
          alignRight: 'Rechts',
          colorTitle: 'Schriftfarbe',
          sizeTitle: 'Schriftgröße',
          boldTitle: 'Dickere Schrift',
          fontNormal: 'konventionell',
          fontBold: 'Deutlich'
        },
        subtableProp: {
          seqTitle: 'Seriennummer',
          showSeq: 'Seriennummer anzeigen',
          showCheckbox: 'Mehrere Auswahlmöglichkeiten sind erlaubt',
          errSubDrag: 'Die Subtisch unterstützt diese Kontrolle nicht. Bitte verwenden Sie andere Steuerelemente',
          colPlace: 'Ziehen Sie die Kontrolle ein'
        },
        uploadProp: {
          limitFileCount: 'Dateimengengrenze',
          limitFileSize: 'Dateigrößenbegrenzung',
          multiFile: 'Lassen Sie mehrere Dateien hochgeladen werden',
          limitImgCount: 'Begrenzung der Anzahl der Bilder',
          limitImgSize: 'Bildgrößengrenze',
          multiImg: 'Lassen Sie mehrere Bilder hochladen'
        }
      }
    },
    listDesign: {
      fieldSettingTab: 'Feldeinstellungen',
      listSettingTab: 'Parametereinstellungen',
      searchTitle: 'Abfragekriterien',
      listTitle: 'Listenfeld',
      searchField: 'Abfragefelder',
      listField: 'Listenfeld',
      activeBtn: {
        ActionButtonUpdate: 'bearbeiten',
        ActionButtonDelete: 'löschen'
      },
      search: {
        addBtn: 'bearbeiten',
        emptyText: 'Abfragebedingungen nicht konfiguriert',
        editPopupTitle: 'Abfragebelder bearbeiten'
      },
      searchPopup: {
        colTitle: 'Titel',
        saveBtn: 'speichern'
      }
    },
    text: {
      copySuccess: 'Kopiert in die Zwischenablage',
      copyError: 'Die aktuelle Umgebung unterstützt diesen Vorgang nicht'
    },
    countdown: {
      formats: {
        yyyy: 'Jahr',
        MM: 'Mond',
        dd: 'Himmel',
        HH: 'Stunde',
        mm: 'Punkt',
        ss: 'Zweite'
      }
    },
    contextMenu: {
      loadingText: '加载中...'
    },
    gantt: {
      tFullFormat: {
        year: '{yyyy}年',
        quarter: '{yyyy}年第{q}季度',
        month: '{yyyy}年{MM}月',
        week: '{yyyy}年第{W}周',
        day: '{yyyy}年{MM}月 {E}',
        date: '{yyyy}年{MM}月{dd}日',
        hour: '{yyyy}年{MM}月{dd}日{HH}时',
        minute: '{yyyy}年{MM}月{dd}日{HH}时{mm}分',
        second: '{yyyy}年{MM}月{dd}日{HH}时{mm}分{ss}秒'
      },
      tSimpleFormat: {
        year: '{yyyy}年',
        quarter: '{q}季度',
        month: '{M}月',
        week: '{W}周',
        day: '{d}',
        date: '{d}',
        hour: '{HH}',
        minute: '{mm}',
        second: '{ss}'
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
          mergeErr: 'Diese Operation kann nicht an zusammengeführten Zellen durchgeführt werden',
          multiErr: 'Dieser Vorgang kann nicht im Bereich mehrerer Selekten durchgeführt werden',
          selectErr: 'Zellen im angegebenen Bereich können nicht betrieben werden',
          extendErr: 'Wenn der erweiterte Bereich zusammengeführte Zellen enthält, müssen alle zusammengeführten Zellen die gleiche Größe haben',
          pasteMultiErr: 'Es kann nicht eingefügt werden, müssen dazu Bereiche kopieren und einfügen',
          cpInvalidErr: 'Diese Operation kann nicht durchgeführt werden, es gibt verbotene Spalten in dem von Ihnen ausgewählten Bereich ({0})'
        },
        fnr: {
          title: 'Finden und ersetzen',
          titleFd: '查找',
          titleRe: '替换',
          findLabel: 'Finden',
          replaceLabel: 'ersetzen',
          findTitle: 'Inhalt finden:',
          replaceTitle: 'Ersetzen durch:',
          tabs: {
            find: 'Finden',
            replace: 'ersetzen'
          },
          filter: {
            re: 'Reguläre Ausdrücke',
            whole: 'Vollständiges Wort Matching',
            sensitive: 'Fallempfindlichkeit'
          },
          btns: {
            findNext: 'Finden Sie den nächsten',
            findAll: 'Finden Sie alle',
            replace: 'ersetzen',
            replaceAll: 'Alles ersetzen',
            cancel: 'Stornieren'
          },
          header: {
            seq: '#',
            cell: 'Zelle',
            value: 'Wert'
          },
          body: {
            row: 'Zeile: {0}',
            col: 'Spalte: {0}'
          },
          empty: '(Nullwert)',
          reError: 'Ungültiger regulärer Ausdruck',
          recordCount: '{0} Zellen gefunden',
          notCell: 'Die passende Zelle kann nicht gefunden werden',
          replaceSuccess: '{0} Zellen wurden erfolgreich ersetzt'
        }
      },
      extendPivotTable: {
        aggregation: {
          grouping: 'Gruppierung',
          values: 'Wert',
          groupPlaceholder: 'Ziehen Sie hier zur Gruppe',
          valuesPlaceholder: 'Ziehen Sie hierher, um zu aggregieren',
          dragExistCol: 'Diese Spalte existiert bereits',
          sortHelpTip: 'Klicken Sie auf das Symbol und ziehen Sie das Symbol, um die Bestellung anzupassen'
        },
        aggFuncs: {
          sum: 'Bitten Sie nach Summe',
          count: 'zählen',
          avg: 'Durchschnittswert',
          min: 'Mindestwert',
          max: 'Maximalwert',
          first: 'Erster Wert',
          last: 'Der Endwert'
        }
      },
      filterComplexInput: {
        menus: {
          fixedColumn: 'Einfrierensäule',
          fixedGroup: 'Gefriergruppierung',
          cancelFixed: 'Einfrieren abbrechen',
          fixedLeft: 'Linke Seite einfrieren',
          fixedRight: 'Die rechte Seite einfrieren'
        },
        cases: {
          equal: 'gleich',
          gt: 'Größer als',
          lt: 'Weniger als',
          begin: 'Der Anfang ist',
          endin: 'Das Ende ist',
          include: 'Enthalten',
          isSensitive: 'Fallempfindlichkeit'
        }
      },
      filterCombination: {
        menus: {
          sort: 'Sortieren',
          clearSort: 'Klare Sortierung',
          sortAsc: 'Aufsteigende Ordnung',
          sortDesc: 'absteigende Reihenfolge',
          fixedColumn: 'Einfrierensäule',
          fixedGroup: 'Gefriergruppierung',
          cancelFixed: 'Einfrieren abbrechen',
          fixedLeft: 'Linke Seite einfrieren',
          fixedRight: 'Die rechte Seite einfrieren',
          clearFilter: 'Klaren Filter',
          textOption: 'Textfilterung',
          numberOption: 'Numerische Filterung',
          dateOption: '日期筛选'
        },
        popup: {
          title: 'Benutzerdefinierte Filtermethoden',
          currColumnTitle: 'Aktuelle Spalte:',
          and: 'Und',
          or: 'oder',
          describeHtml: 'Verfügbar? Repräsentiert ein einzelnes Zeichen <br/> Verwendung * repräsentiert alle mehrere Zeichen'
        },
        cases: {
          equal: 'gleich',
          unequal: 'Nicht gleich',
          gt: 'Größer als',
          ge: 'Größer als oder gleich zu',
          lt: 'Weniger als',
          le: 'Weniger als oder gleich zu',
          begin: 'Der Anfang ist',
          notbegin: 'Es ist nicht am Anfang',
          endin: 'Das Ende ist',
          notendin: 'Das Ende ist nicht',
          include: 'Enthalten',
          exclude: 'Nicht enthalten',
          between: 'Zwischen',
          isAfter: '在以下日期之后',
          eqAfter: '在以下日期之后或与之相同',
          isBefore: '在以下日期之前',
          eqBefore: '在以下日期之前或与之相同',
          top10: '前10项',
          aboveAverage: '高于平均值',
          belowAverage: '低于平均值',
          before: '之前',
          after: '之后',
          tomorrow: '明天',
          today: '今天',
          yesterday: '昨天',
          nextWeek: '下周',
          thisWeek: '本周',
          lastWeek: '上周',
          nextMonth: '下月',
          thisMonth: '本月',
          lastMonth: '上月',
          nextYear: '明年',
          thisYear: '今年',
          lastYear: '去年',
          yearToDate: '本年度截止到现在',
          custom: 'Benutzerdefinierte Filterung',
          insensitive: 'Fall unempfindlich',
          isSensitive: 'Fallempfindlichkeit'
        },
        empty: '(leer)',
        notData: 'Kein Match'
      }
    },
    pro: {
      area: {
        mergeErr: 'Diese Operation kann nicht an zusammengeführten Zellen durchgeführt werden',
        multiErr: 'Dieser Vorgang kann nicht im Bereich mehrerer Selekten durchgeführt werden',
        extendErr: 'Wenn der erweiterte Bereich zusammengeführte Zellen enthält, müssen alle zusammengeführten Zellen die gleiche Größe haben',
        pasteMultiErr: 'Es kann nicht eingefügt werden, müssen dazu Bereiche kopieren und einfügen'
      },
      fnr: {
        title: 'Finden und ersetzen',
        titleFd: '查找',
        titleRe: '替换',
        findLabel: 'Finden',
        replaceLabel: 'ersetzen',
        findTitle: 'Inhalt finden:',
        replaceTitle: 'Ersetzen durch:',
        tabs: {
          find: 'Finden',
          replace: 'ersetzen'
        },
        filter: {
          re: 'Reguläre Ausdrücke',
          whole: 'Vollständiges Wort Matching',
          sensitive: 'Fallempfindlichkeit'
        },
        btns: {
          findNext: 'Finden Sie den nächsten',
          findAll: 'Finden Sie alle',
          replace: 'ersetzen',
          replaceAll: 'Alles ersetzen',
          cancel: 'Stornieren'
        },
        header: {
          seq: '#',
          cell: 'Zelle',
          value: 'Wert'
        },
        empty: '(Nullwert)',
        reError: 'Ungültiger regulärer Ausdruck',
        recordCount: '{0} Zellen gefunden',
        notCell: 'Die passende Zelle kann nicht gefunden werden',
        replaceSuccess: '{0} Zellen wurden erfolgreich ersetzt'
      }
    },
    renderer: {
      search: 'suchen',
      cases: {
        equal: 'gleich',
        unequal: 'Nicht gleich',
        gt: 'Größer als',
        ge: 'Größer als oder gleich zu',
        lt: 'Weniger als',
        le: 'Weniger als oder gleich zu',
        begin: 'Der Anfang ist',
        notbegin: 'Es ist nicht am Anfang',
        endin: 'Das Ende ist',
        notendin: 'Das Ende ist nicht',
        include: 'Enthalten',
        exclude: 'Nicht enthalten',
        between: 'Zwischen',
        top10: '前10项',
        aboveAverage: '高于平均值',
        belowAverage: '低于平均值',
        custom: 'Benutzerdefinierte Filterung',
        insensitive: 'Fall unempfindlich',
        isSensitive: 'Fallempfindlichkeit'
      },
      combination: {
        menus: {
          sort: 'Sortieren',
          clearSort: 'Klare Sortierung',
          sortAsc: 'Aufsteigende Ordnung',
          sortDesc: 'absteigende Reihenfolge',
          fixedColumn: 'Einfrierensäule',
          fixedGroup: 'Gefriergruppierung',
          cancelFixed: 'Einfrieren abbrechen',
          fixedLeft: 'Nach links einfrieren',
          fixedRight: 'Nach rechts einfrieren',
          clearFilter: 'Klaren Filter',
          textOption: 'Textfilterung',
          numberOption: 'Numerische Filterung',
          dateOption: '日期筛选'
        },
        popup: {
          title: 'Benutzerdefinierte Filtermethoden',
          currColumnTitle: 'Aktuelle Spalte:',
          and: 'Und',
          or: 'oder',
          describeHtml: 'Verfügbar? Repräsentiert ein einzelnes Zeichen <br/> Verwendung * repräsentiert alle mehrere Zeichen'
        },
        empty: '(leer)',
        notData: 'Kein Match'
      }
    }
  }
}
