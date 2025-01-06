export default
{
  vxe: {
    base: {
      pleaseInput: 'Bitte treten Sie ein',
      pleaseSelect: 'Bitte auswählen',
      comma: '，',
      fullStop: '。'
    },
    loading: {
      text: 'Laden...'
    },
    error: {
      downErr: 'Der Download ist fehlgeschlagen',
      errLargeData: '当绑定的数据量过大时，应该请使用 {0}，否则可能会出现卡顿',
      groupFixed: 'Bei Verwendung von Gruppenköpfen müssen eingefrorene Spalten nach Gruppe festgelegt werden',
      groupMouseRange: 'Der Gruppenheader und „{0}“ können nicht gleichzeitig verwendet werden, was zu einem Fehler führen kann.',
      groupTag: 'Bei der Gruppierung von Spaltenüberschriften sollte „{0}“ anstelle von „{1}“ verwendet werden, was zu Fehlern führen kann',
      scrollErrProp: 'Der Parameter „{0}“ wird nicht unterstützt, wenn virtuelles Scrollen aktiviert ist',
      errConflicts: 'Parameter „{0}“ stehen im Konflikt mit „{1}“',
      unableInsert: 'Das Einfügen an der angegebenen Position ist nicht möglich. Bitte überprüfen Sie, ob die Parameter korrekt sind',
      useErr: 'Bei der Installation des Moduls „{0}“ ist möglicherweise die falsche Reihenfolge aufgetreten. Die abhängigen Module müssen vor der Tabelle installiert werden.',
      barUnableLink: 'Die Symbolleiste kann nicht mit der Tabelle verknüpft werden',
      expandContent: 'Der Slot zum Erweitern der Zeile sollte „content“ lauten. Bitte überprüfen Sie, ob er korrekt ist',
      reqComp: 'Die Komponente „{0}“ fehlt. Bitte überprüfen Sie, ob sie korrekt installiert ist. https://vxeui.com/#/start/useGlobal',
      reqModule: 'Fehlendes Modul „{0}“',
      reqProp: 'Der erforderliche Parameter „{0}“ fehlt, was zu einem Fehler führen kann',
      emptyProp: 'Der Parameter „{0}“ darf nicht leer sein',
      errProp: 'Nicht unterstützter Parameter „{0}“, möglicherweise „{1}“',
      colRepet: 'Column.{0}="{1}" wird wiederholt, was dazu führen kann, dass einige Funktionen unbrauchbar werden',
      notFunc: 'Methode „{0}“ existiert nicht',
      errFunc: 'Parameter „{0}“ ist keine Methode',
      notValidators: 'Globale Prüfung „{0}“ existiert nicht',
      notFormats: 'Das globale Format „{0}“ existiert nicht',
      notCommands: 'Die globale Direktive „{0}“ existiert nicht',
      notSlot: 'Slot „{0}“ existiert nicht',
      noTree: 'Die Baumstruktur unterstützt „{0}“ nicht',
      notProp: 'Nicht unterstützter Parameter „{0}“',
      checkProp: 'Wenn die Datenmenge zu groß ist, kann es zum Einfrieren des Kontrollkästchens kommen. Es wird empfohlen, den Parameter „{0}“ festzulegen, um die Rendering-Geschwindigkeit zu verbessern.',
      coverProp: 'Der Parameter „{1}“ von „{0}“ wird wiederholt definiert, was zu einem Fehler führen kann.',
      uniField: 'Der Feldname „{0}“ wird wiederholt definiert, was zu einem Fehler führen kann',
      repeatKey: 'Doppelter Primärschlüssel {0}="{1}", dies kann zu einem Fehler führen',
      delFunc: 'Methode „{0}“ ist veraltet, bitte verwenden Sie „{1}“',
      delProp: 'Parameter „{0}“ ist veraltet, bitte verwenden Sie „{1}“',
      delEvent: 'Das Ereignis „{0}“ ist veraltet. Bitte verwenden Sie „{1}“.',
      removeProp: 'Der Parameter „{0}“ ist veraltet und wird nicht empfohlen und kann zu Fehlern führen',
      errFormat: 'Globale Formatierungsinhalte sollten mit „VXETable.formats“ definiert werden. Die Mountmethode „formatter={0}“ wird nicht mehr empfohlen.',
      notType: 'Nicht unterstützter Dateityp „{0}“',
      notExp: 'Dieser Browser unterstützt keine Import-/Exportfunktion',
      impFields: 'Der Import ist fehlgeschlagen. Bitte überprüfen Sie, ob der Feldname und das Datenformat korrekt sind',
      treeNotImp: 'Baumtabellen unterstützen den Import nicht',
      treeCrossDrag: 'Nur die erste Ebene kann gezogen werden',
      treeDragChild: 'Ein übergeordnetes Element kann nicht in seine eigenen untergeordneten Elemente gezogen werden',
      reqPlugin: 'Optionale Erweiterung „{1}“ https://vxeui.com/other{0}/#/{1}/install'
    },
    table: {
      emptyText: 'Noch keine Daten',
      allTitle: 'Alles auswählen/Abbrechen',
      seqTitle: 'Seriennummer',
      actionTitle: 'arbeiten',
      confirmFilter: 'Filter',
      resetFilter: 'zurücksetzen',
      allFilter: 'alle',
      sortAsc: 'Aufsteigende Reihenfolge: vom niedrigsten zum höchsten',
      sortDesc: 'Absteigende Reihenfolge: vom höchsten zum niedrigsten Wert',
      filter: 'Aktivieren Sie die Filterung für ausgewählte Spalten',
      impSuccess: '{0} Datensätze erfolgreich importiert',
      expLoading: 'Exportieren',
      expSuccess: 'Export erfolgreich',
      expError: 'Der Export ist fehlgeschlagen',
      expFilename: 'Export_{0}',
      expOriginFilename: 'export_source_{0}',
      customTitle: 'Spalteneinstellungen',
      customAll: 'alle',
      customConfirm: 'bestätigen',
      customClose: 'Schließung',
      customCancel: 'Stornieren',
      customRestore: 'Standard wiederherstellen',
      maxFixedCol: 'Die maximale Anzahl eingefrorener Spalten darf {0} nicht überschreiten.',
      dragTip: 'Umzug: {0}',
      resizeColTip: '{0} Pixels'
    },
    grid: {
      selectOneRecord: 'Bitte wählen Sie mindestens einen Datensatz aus!',
      deleteSelectRecord: 'Sind Sie sicher, dass Sie die ausgewählten Datensätze löschen möchten?',
      removeSelectRecord: 'Sind Sie sicher, dass Sie die ausgewählten Datensätze entfernen möchten?',
      dataUnchanged: 'Die Daten wurden nicht geändert!',
      delSuccess: 'Ausgewählte Datensätze erfolgreich gelöscht!',
      saveSuccess: 'Erfolgreich gespeichert!',
      operError: 'Es ist ein Fehler aufgetreten und der Vorgang ist fehlgeschlagen!'
    },
    select: {
      search: 'suchen',
      loadingText: 'Laden',
      emptyText: 'Noch keine Daten'
    },
    pager: {
      goto: 'Gehe zu',
      gotoTitle: 'Anzahl der Seiten',
      pagesize: '{0} Elemente/Seite',
      total: 'Insgesamt {0} Datensätze',
      pageClassifier: 'Seite',
      homePage: 'Titelseite',
      homePageTitle: 'Titelseite',
      prevPage: 'Vorherige Seite',
      prevPageTitle: 'Vorherige Seite',
      nextPage: 'Nächste Seite',
      nextPageTitle: 'Nächste Seite',
      prevJump: 'Seite nach oben springen',
      prevJumpTitle: 'Seite nach oben springen',
      nextJump: 'Seite nach unten springen',
      nextJumpTitle: 'Seite nach unten springen',
      endPage: 'Letzte Seite',
      endPageTitle: 'Letzte Seite'
    },
    alert: {
      title: 'Systemaufforderung'
    },
    button: {
      confirm: 'bestätigen',
      cancel: 'Stornieren'
    },
    filter: {
      search: 'suchen'
    },
    custom: {
      cstmTitle: 'Spalteneinstellungen',
      cstmRestore: 'Standard wiederherstellen',
      cstmCancel: 'Stornieren',
      cstmConfirm: 'Sicher',
      cstmConfirmRestore: 'Bitte bestätigen Sie, ob die Standardspaltenkonfiguration wiederhergestellt werden soll.',
      cstmDragTarget: 'Umzug: {0}',
      setting: {
        colSort: 'Sortieren',
        sortHelpTip: 'Klicken Sie auf das Symbol und ziehen Sie es, um die Spaltenreihenfolge anzupassen',
        colTitle: 'Spaltenüberschrift',
        colResizable: 'Spaltenbreite (Pixel)',
        colVisible: 'Ob angezeigt werden soll',
        colFixed: 'Spalten einfrieren',
        colFixedMax: 'Spalten einfrieren (bis zu {0} Spalten)',
        fixedLeft: 'linke Seite',
        fixedUnset: 'Nicht festgelegt',
        fixedRight: 'rechte Seite'
      }
    },
    import: {
      modes: {
        covering: 'Überschreibmethode (Tabellendaten direkt überschreiben)',
        insert: 'Unten anhängen (neue Daten am Ende der Tabelle anhängen)',
        insertTop: 'Top append (neue Daten oben an die Tabelle anhängen)',
        insertBottom: 'Unten anhängen (neue Daten am Ende der Tabelle anhängen)'
      },
      impTitle: 'Daten importieren',
      impFile: 'Dateiname',
      impSelect: 'Datei auswählen',
      impType: 'Dateityp',
      impOpts: 'Parametereinstellungen',
      impMode: 'Importmodus',
      impConfirm: 'Import',
      impCancel: 'Stornieren'
    },
    export: {
      types: {
        csv: 'CSV (durch Kommas getrennt) (*.csv)',
        html: 'Webseite (*.html)',
        xml: 'XML-Daten (*.xml)',
        txt: 'Textdatei (tabulatorgetrennt) (*.txt)',
        xls: 'Excel 97-2003-Arbeitsmappe (*.xls)',
        xlsx: 'Excel-Arbeitsmappe (*.xlsx)',
        pdf: 'PDF (*.pdf)'
      },
      modes: {
        current: 'Aktuelle Daten (Daten der aktuellen Seite)',
        selected: 'Ausgewählte Daten (ausgewählte Daten auf der aktuellen Seite)',
        all: 'Vollständige Daten (einschließlich aller paginierten Daten)'
      },
      printTitle: 'Daten drucken',
      expTitle: 'Daten exportieren',
      expName: 'Dateiname',
      expNamePlaceholder: 'Bitte geben Sie einen Dateinamen ein',
      expSheetName: 'Titel',
      expSheetNamePlaceholder: 'Bitte geben Sie einen Titel ein',
      expType: 'Speichertyp',
      expMode: 'Daten auswählen',
      expCurrentColumn: 'Alle Felder',
      expColumn: 'Feld auswählen',
      expOpts: 'Parametereinstellungen',
      expOptHeader: 'Kopfzeile',
      expHeaderTitle: 'Ist eine Kopfzeile erforderlich?',
      expOptFooter: 'Ende des Tisches',
      expFooterTitle: 'Ist eine Tabellenfußzeile erforderlich?',
      expOptColgroup: 'Gruppenkopf',
      expColgroupTitle: 'Sofern vorhanden, werden Header mit Gruppierungsstrukturen unterstützt',
      expOptMerge: 'verschmelzen',
      expMergeTitle: 'Unterstützt Zellen mit Zusammenführungsstrukturen, sofern vorhanden',
      expOptAllExpand: 'Ebene erweitern',
      expAllExpandTitle: 'Wenn vorhanden, unterstützt es die Erweiterung aller Daten mit einer hierarchischen Struktur.',
      expOptUseStyle: 'Stil',
      expUseStyleTitle: 'Formatierte Zellen werden unterstützt, sofern vorhanden',
      expOptOriginal: 'Quelldaten',
      expOriginalTitle: 'Wenn es sich um Quelldaten handelt, wird der Import in die Tabelle unterstützt',
      expPrint: 'Drucken',
      expConfirm: 'Export',
      expCancel: 'Stornieren'
    },
    modal: {
      errTitle: 'Fehlermeldung',
      zoomMin: 'minimieren',
      zoomIn: 'maximieren',
      zoomOut: 'Reduktion',
      close: 'Schließung',
      miniMaxSize: 'Die Anzahl der minimierten Fenster darf {0} nicht überschreiten.',
      footPropErr: 'show-footer wird nur zum Aktivieren der Tabellenfußzeile verwendet und muss mit dem Show-Confirm-Button | verwendet werden'
    },
    drawer: {
      close: 'Schließung'
    },
    form: {
      folding: 'schließen',
      unfolding: 'Expandieren'
    },
    toolbar: {
      import: 'Import',
      export: 'Export',
      print: 'Drucken',
      refresh: 'auffrischen',
      zoomIn: 'Vollbild',
      zoomOut: 'Reduktion',
      custom: 'Spalteneinstellungen',
      customAll: 'alle',
      customConfirm: 'bestätigen',
      customRestore: 'zurücksetzen',
      fixedLeft: 'links eingefroren',
      fixedRight: 'rechts eingefroren',
      cancelFixed: 'Spalte freigeben'
    },
    input: {
      date: {
        m1: 'Januar',
        m2: 'Februar',
        m3: 'Marsch',
        m4: 'April',
        m5: 'Mai',
        m6: '06. Juni',
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
          w: 'Woche',
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
          q1: 'erstes Viertel',
          q2: 'zweites Viertel',
          q3: 'drittes Viertel',
          q4: 'viertes Viertel'
        }
      }
    },
    numberInput: {
      currencySymbol: '￥'
    },
    imagePreview: {
      popupTitle: 'Vorschau',
      operBtn: {
        zoomOut: 'herauszoomen',
        zoomIn: 'vergrößern',
        pctFull: 'proportionale Skalierung',
        pct11: 'Originalgröße anzeigen',
        rotateLeft: 'Nach links drehen',
        rotateRight: 'Nach rechts drehen',
        print: 'Klicken Sie hier, um das Bild auszudrucken',
        download: 'Klicken Sie hier, um das Bild herunterzuladen'
      }
    },
    upload: {
      fileBtnText: 'Zum Hochladen klicken oder ziehen',
      imgBtnText: 'Zum Hochladen klicken oder ziehen',
      dragPlaceholder: 'Bitte ziehen Sie die Datei per Drag & Drop in diesen Bereich, um sie hochzuladen',
      imgSizeHint: 'Broschüre {0}',
      imgCountHint: 'Maximal {0} Bilder',
      fileTypeHint: 'Unterstützte {0} Dateitypen',
      fileSizeHint: 'Die Größe einer einzelnen Datei überschreitet nicht {0}',
      fileCountHint: 'Es können bis zu {0} Dateien hochgeladen werden',
      uploadTypeErr: 'Dateityp stimmt nicht überein!',
      overCountErr: 'Es können nur {0} Dateien ausgewählt werden!',
      overCountExtraErr: 'Die maximale Anzahl von {0} Dateien wurde überschritten. Die überschüssigen {1} Dateien werden ignoriert!',
      overSizeErr: 'Die maximale Dateigröße darf {0} nicht überschreiten!',
      reUpload: 'Erneut hochladen',
      uploadProgress: '{0} % werden hochgeladen',
      uploadErr: 'Der Upload ist fehlgeschlagen',
      uploadSuccess: 'Hochladen erfolgreich',
      moreBtnText: 'Mehr ({0})',
      viewItemTitle: 'Klicken Sie zum Anzeigen',
      morePopup: {
        readTitle: 'Liste anzeigen',
        imageTitle: 'Bilder hochladen',
        fileTitle: 'Dateien hochladen'
      }
    },
    empty: {
      defText: 'Noch keine Daten'
    },
    colorPicker: {
      clear: 'Klar',
      confirm: 'bestätigen',
      copySuccess: 'In die Zwischenablage kopiert: {0}'
    },
    formDesign: {
      formName: 'Formularname',
      defFormTitle: 'unbenannte Form',
      widgetPropTab: 'Steuereigenschaften',
      widgetFormTab: 'Formulareigenschaften',
      error: {
        wdFormUni: 'Dem Formular darf nur ein Steuerelement dieses Typs hinzugefügt werden',
        wdSubUni: 'Der Untertabelle darf nur ein Steuerelement dieses Typs hinzugefügt werden'
      },
      styleSetting: {
        btn: 'Stileinstellungen',
        title: 'Einstellungen für den Formularstil',
        layoutTitle: 'Steuerungslayout',
        verticalLayout: 'Layout oben und unten',
        horizontalLayout: 'Horizontales Layout',
        styleTitle: 'Titelstil',
        boldTitle: 'Titel fett',
        fontBold: 'Deutlich',
        fontNormal: 'konventionell',
        colonTitle: 'Doppelpunkt anzeigen',
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
          base: 'Grundlegende Steuerelemente',
          layout: 'Layout-Steuerelemente',
          system: 'Systemkontrollen',
          module: 'Modulsteuerung',
          chart: 'Diagrammsteuerung',
          advanced: 'Erweiterte Steuerelemente'
        },
        copyTitle: 'Kopieren_{0}',
        component: {
          input: 'Eingabefeld',
          textarea: 'Textfeld',
          select: 'Dropdown-Auswahl',
          row: 'Eine Zeile und mehrere Spalten',
          title: 'Titel',
          text: 'Text',
          subtable: 'Untertabelle',
          VxeSwitch: 'ob',
          VxeInput: 'Eingabefeld',
          VxeNumberInput: 'Nummer',
          VxeDatePicker: 'Datum',
          VxeTextarea: 'Textfeld',
          VxeSelect: 'Dropdown-Auswahl',
          VxeTreeSelect: 'Baumauswahl',
          VxeRadioGroup: 'Optionsfeld',
          VxeCheckboxGroup: 'Kontrollkästchen',
          VxeUploadFile: 'dokumentieren',
          VxeUploadImage: 'Bild',
          VxeRate: 'Punktzahl',
          VxeSlider: 'Schieberegler'
        }
      },
      widgetProp: {
        name: 'Kontrollname',
        placeholder: 'prompt',
        required: 'Erforderliche Verifizierung',
        multiple: 'Mehrfachauswahl zulassen',
        displaySetting: {
          name: 'Anzeigeeinstellungen',
          pc: 'PC',
          mobile: 'Mobile Version',
          visible: 'zeigen',
          hidden: 'verstecken'
        },
        dataSource: {
          name: 'Datenquelle',
          defValue: 'Option {0}',
          addOption: 'Optionen hinzufügen',
          batchEditOption: 'Stapelbearbeitung',
          batchEditTip: 'Jede Zeile entspricht einer Option und unterstützt das direkte Kopieren und Einfügen aus Tabellen, Excel und WPS.',
          batchEditSubTip: 'Jede Zeile entspricht einer Option. Wenn es sich um eine Gruppe handelt, können die Unterelemente mit einem Leerzeichen oder einer Tabulatortaste beginnen. Direktes Kopieren und Einfügen aus Tabellen, Excel und WPS wird unterstützt.',
          buildOption: 'Build-Optionen'
        },
        rowProp: {
          colSize: 'Anzahl der Spalten',
          col2: 'zwei Spalten',
          col3: 'drei Spalten',
          col4: 'vier Spalten',
          col6: 'sechs Spalten',
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
          boldTitle: 'Fette Schriftart',
          fontNormal: 'konventionell',
          fontBold: 'Deutlich'
        },
        subtableProp: {
          seqTitle: 'Seriennummer',
          showSeq: 'Seriennummer anzeigen',
          showCheckbox: 'Mehrfachauswahl zulassen',
          errSubDrag: 'Die Untertabelle unterstützt dieses Steuerelement nicht. Bitte verwenden Sie andere Steuerelemente',
          colPlace: 'Ziehen Sie das Steuerelement hinein'
        },
        uploadProp: {
          limitFileCount: 'Dateimengenbegrenzung',
          limitFileSize: 'Dateigrößenbeschränkung',
          multiFile: 'Mehrere Datei-Uploads zulassen',
          limitImgCount: 'Bildmengenbegrenzung',
          limitImgSize: 'Beschränkung der Bildgröße',
          multiImg: 'Erlauben Sie das Hochladen mehrerer Bilder'
        }
      }
    },
    listDesign: {
      fieldSettingTab: 'Feldeinstellungen',
      listSettingTab: 'Parametereinstellungen',
      searchTitle: 'Abfragebedingungen',
      listTitle: 'Listenfeld',
      searchField: 'Abfragefeld',
      listField: 'Listenfeld',
      activeBtn: {
        ActionButtonUpdate: 'bearbeiten',
        ActionButtonDelete: 'löschen'
      },
      search: {
        addBtn: 'bearbeiten',
        emptyText: 'Keine Abfragebedingungen konfiguriert',
        editPopupTitle: 'Abfragefelder bearbeiten'
      },
      searchPopup: {
        colTitle: 'Titel',
        saveBtn: 'speichern'
      }
    },
    text: {
      copySuccess: 'In die Zwischenablage kopiert',
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
    plugins: {
      extendCellArea: {
        area: {
          mergeErr: 'Dieser Vorgang kann nicht für verbundene Zellen ausgeführt werden',
          multiErr: 'Dieser Vorgang kann nicht für mehrere Auswahlbereiche ausgeführt werden',
          selectErr: 'Zellen im angegebenen Bereich können nicht bearbeitet werden',
          extendErr: 'Wenn der erweiterte Bereich verbundene Zellen enthält, müssen alle zusammengeführten Zellen dieselbe Größe haben',
          pasteMultiErr: 'Das Einfügen ist nicht möglich. Die kopierten und eingefügten Bereiche müssen dieselbe Größe haben, um diesen Vorgang ausführen zu können',
          cpInvalidErr: 'Der Vorgang kann nicht ausgeführt werden. Der von Ihnen ausgewählte Bereich enthält verbotene Spalten ({0}).'
        },
        fnr: {
          title: 'Suchen und ersetzen',
          findLabel: 'Finden',
          replaceLabel: 'ersetzen',
          findTitle: 'Finden Sie was:',
          replaceTitle: 'Ersetzen durch:',
          tabs: {
            find: 'Finden',
            replace: 'ersetzen'
          },
          filter: {
            re: 'regulärer Ausdruck',
            whole: 'Ganzwortübereinstimmung',
            sensitive: 'Groß- und Kleinschreibung beachten'
          },
          btns: {
            findNext: 'Weiter finden',
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
          notCell: 'Keine passende Zelle gefunden',
          replaceSuccess: '{0} Zellen erfolgreich ersetzt'
        }
      },
      filterComplexInput: {
        menus: {
          fixedColumn: 'Spalten einfrieren',
          fixedGroup: 'Gruppe einfrieren',
          cancelFixed: 'Auftauen',
          fixedLeft: 'einfrieren links',
          fixedRight: 'richtig einfrieren'
        },
        cases: {
          equal: 'gleich',
          gt: 'größer als',
          lt: 'weniger als',
          begin: 'Der Anfang ist',
          endin: 'Das Ende ist',
          include: 'Enthalten',
          isSensitive: 'Groß- und Kleinschreibung beachten'
        }
      },
      filterCombination: {
        menus: {
          clearSort: 'Klare Sortierung',
          sortAsc: 'Aufsteigende Reihenfolge',
          sortDesc: 'absteigende Reihenfolge',
          fixedColumn: 'Spalten einfrieren',
          fixedGroup: 'Gruppe einfrieren',
          cancelFixed: 'Auftauen',
          fixedLeft: 'einfrieren links',
          fixedRight: 'richtig einfrieren',
          clearFilter: 'Filter löschen',
          textOption: 'Textfilter',
          numberOption: 'numerischer Filter'
        },
        popup: {
          title: 'So passen Sie die Filterung an',
          currColumnTitle: 'Aktuelle Spalte:',
          and: 'Und',
          or: 'oder',
          describeHtml: 'Verfügbar ? steht für ein einzelnes Zeichen<br/>Verwenden Sie *, um eine beliebige Anzahl von Zeichen darzustellen'
        },
        cases: {
          equal: 'gleich',
          unequal: 'nicht gleich',
          gt: 'größer als',
          ge: 'größer oder gleich',
          lt: 'weniger als',
          le: 'kleiner oder gleich',
          begin: 'Der Anfang ist',
          notbegin: 'Nicht am Anfang',
          endin: 'Das Ende ist',
          notendin: 'Das Ende ist es nicht',
          include: 'Enthalten',
          exclude: 'Nicht im Lieferumfang enthalten',
          between: 'zwischen',
          custom: 'Benutzerdefinierter Filter',
          insensitive: 'Nicht zwischen Groß- und Kleinschreibung unterscheiden',
          isSensitive: 'Groß- und Kleinschreibung beachten'
        },
        empty: '(leer)',
        notData: 'Keine Übereinstimmung'
      }
    },
    pro: {
      area: {
        mergeErr: 'Dieser Vorgang kann nicht für verbundene Zellen ausgeführt werden',
        multiErr: 'Dieser Vorgang kann nicht für mehrere Auswahlbereiche ausgeführt werden',
        extendErr: 'Wenn der erweiterte Bereich verbundene Zellen enthält, müssen alle zusammengeführten Zellen dieselbe Größe haben',
        pasteMultiErr: 'Das Einfügen ist nicht möglich. Die kopierten und eingefügten Bereiche müssen dieselbe Größe haben, um diesen Vorgang ausführen zu können'
      },
      fnr: {
        title: 'Suchen und ersetzen',
        findLabel: 'Finden',
        replaceLabel: 'ersetzen',
        findTitle: 'Finden Sie was:',
        replaceTitle: 'Ersetzen durch:',
        tabs: {
          find: 'Finden',
          replace: 'ersetzen'
        },
        filter: {
          re: 'regulärer Ausdruck',
          whole: 'Ganzwortübereinstimmung',
          sensitive: 'Groß- und Kleinschreibung beachten'
        },
        btns: {
          findNext: 'Weiter finden',
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
        notCell: 'Keine passende Zelle gefunden',
        replaceSuccess: '{0} Zellen erfolgreich ersetzt'
      }
    },
    renderer: {
      search: 'suchen',
      cases: {
        equal: 'gleich',
        unequal: 'nicht gleich',
        gt: 'größer als',
        ge: 'größer oder gleich',
        lt: 'weniger als',
        le: 'kleiner oder gleich',
        begin: 'Der Anfang ist',
        notbegin: 'Nicht am Anfang',
        endin: 'Das Ende ist',
        notendin: 'Das Ende ist es nicht',
        include: 'Enthalten',
        exclude: 'Nicht im Lieferumfang enthalten',
        between: 'zwischen',
        custom: 'Benutzerdefinierter Filter',
        insensitive: 'Nicht zwischen Groß- und Kleinschreibung unterscheiden',
        isSensitive: 'Groß- und Kleinschreibung beachten'
      },
      combination: {
        menus: {
          clearSort: 'Klare Sortierung',
          sortAsc: 'Aufsteigende Reihenfolge',
          sortDesc: 'absteigende Reihenfolge',
          fixedColumn: 'Spalten einfrieren',
          fixedGroup: 'Gruppe einfrieren',
          cancelFixed: 'Auftauen',
          fixedLeft: 'nach links einfrieren',
          fixedRight: 'nach rechts einfrieren',
          clearFilter: 'Filter löschen',
          textOption: 'Textfilter',
          numberOption: 'numerischer Filter'
        },
        popup: {
          title: 'So passen Sie die Filterung an',
          currColumnTitle: 'Aktuelle Spalte:',
          and: 'Und',
          or: 'oder',
          describeHtml: 'Verfügbar ? steht für ein einzelnes Zeichen<br/>Verwenden Sie *, um eine beliebige Anzahl von Zeichen darzustellen'
        },
        empty: '(leer)',
        notData: 'Keine Übereinstimmung'
      }
    }
  }
}
