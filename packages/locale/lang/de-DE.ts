export default {
  vxe: {
    base: {
      pleaseInput: 'Bitte eingeben',
      pleaseSelect: 'Bitte auswählen',
      comma: ',',
      fullStop: '.'
    },
    loading: {
      text: 'Wird geladen...'
    },
    error: {
      downErr: 'Download fehlgeschlagen',
      errLargeData: 'Wenn die gebundene Datenmenge zu groß ist, verwenden Sie bitte {0}, andernfalls kann es zu Verzögerungen kommen',
      groupFixed: 'Bei gruppierten Kopfzeilen müssen fixierte Spalten gruppenweise festgelegt werden',
      groupMouseRange: 'Gruppierte Kopfzeilen können nicht zusammen mit "{0}" verwendet werden, dies kann Fehler verursachen',
      groupTag: 'Für gruppierte Spaltenköpfe sollte "{0}" anstelle von "{1}" verwendet werden, dies kann Fehler verursachen',
      scrollErrProp: 'Nach Aktivierung des virtuellen Scrollens wird der Parameter "{0}" nicht unterstützt',
      errConflicts: 'Parameter "{0}" steht im Konflikt mit "{1}"',
      modelConflicts: 'Der gebundene Feldwert "{0}" steht im Konflikt mit "{1}", es wird ein Fehler auftreten',
      notSupportProp: 'Wenn Parameter "{0}" aktiviert ist, wird "{1}" nicht unterstützt, es sollte "{2}" sein, andernfalls tritt ein Fehler auf',
      reqSupportProp: 'Bei Verwendung von "{0}" sollte "{1}" festgelegt werden, andernfalls können Fehler auftreten',
      notConflictProp: 'Bei Verwendung von "{0}" sollte "{1}" festgelegt werden, andernfalls können Funktionskonflikte auftreten',
      unableInsert: 'Einfügen an der angegebenen Position nicht möglich, bitte überprüfen Sie die Parameter',
      useErr: 'Beim Installieren des Moduls "{0}" ist ein Fehler aufgetreten, die Reihenfolge ist möglicherweise falsch; abhängige Module müssen vor Table installiert werden',
      barUnableLink: 'Die Symbolleiste kann nicht mit der Tabelle verknüpft werden',
      expandContent: 'Der Slot für die erweiterte Zeile sollte "content" sein, bitte überprüfen Sie dies',
      reqComp: 'Komponente "{0}" fehlt, bitte überprüfen Sie die korrekte Installation. https://vxeui.com/#/start/useUI/useGlobal',
      reqModule: 'Modul "{0}" fehlt',
      reqProp: 'Erforderlicher Parameter "{0}" fehlt, dies kann zu Fehlern führen',
      emptyProp: 'Parameter "{0}" darf nicht leer sein',
      errProp: 'Nicht unterstützter Parameter "{0}", möglicherweise "{1}"',
      colRepet: 'column.{0}="{1}" ist doppelt vorhanden, dies kann dazu führen, dass einige Funktionen nicht verfügbar sind',
      notFunc: 'Methode "{0}" existiert nicht',
      errFunc: 'Parameter "{0}" ist keine Methode',
      notValidators: 'Globaler Validator "{0}" existiert nicht',
      notFormats: 'Globaler Formatierer "{0}" existiert nicht',
      notCommands: 'Globaler Befehl "{0}" existiert nicht',
      notSlot: 'Slot "{0}" existiert nicht',
      noTree: 'Baumstruktur unterstützt "{0}" nicht',
      noGroup: 'Nach der Datengruppierung wird "{0}" nicht unterstützt',
      notProp: 'Nicht unterstützter Parameter "{0}"',
      returnErr: 'Der Rückgabewert von Parameter "{0}" sollte "{1}" sein, ist aber tatsächlich "{2}"',
      notSupportReturn: 'Wenn der Rückgabewert "{0}" ist, sollte im Parameter "{1}" anstelle von "{2}" verwendet werden',
      checkProp: 'Bei zu großen Datenmengen können Kontrollkästchen verzögert reagieren; es wird empfohlen, den Parameter "{0}" festzulegen, um die Rendering-Geschwindigkeit zu verbessern',
      coverProp: 'Parameter "{1}" von "{0}" ist doppelt definiert, dies kann Fehler verursachen',
      uniField: 'Feldname "{0}" ist doppelt definiert, dies kann Fehler verursachen',
      repeatKey: 'Primärschlüssel doppelt {0}="{1}", dies kann Fehler verursachen',
      repeatProp: 'Parameter doppelt {0}="{1}", dies kann Fehler verursachen',
      delFunc: 'Methode "{0}" ist veraltet, bitte verwenden Sie "{1}"',
      delProp: 'Parameter "{0}" ist veraltet, bitte verwenden Sie "{1}"',
      delEvent: 'Ereignis "{0}" ist veraltet, bitte verwenden Sie "{1}"',
      removeProp: 'Parameter "{0}" ist veraltet und wird nicht empfohlen; dies kann Fehler verursachen',
      errFormat: 'Globale Formatierungsinhalte sollten mit "VXETable.formats" definiert werden; das Mounten von "formatter={0}" wird nicht mehr empfohlen',
      notType: 'Nicht unterstützter Dateityp "{0}"',
      notExp: 'Dieser Browser unterstützt keine Import-/Exportfunktion',
      impFields: 'Import fehlgeschlagen, bitte überprüfen Sie Feldnamen und Datenformat',
      treeNotImp: 'Baumtabelle unterstützt keinen Import',
      treeCrossDrag: 'Nur die erste Ebene kann gezogen werden',
      treeDragChild: 'Ein übergeordnetes Element kann nicht in seine eigenen untergeordneten Elemente gezogen werden',
      reqPlugin: 'Erweiterungs-Plugin nicht installiert "{1}" https://vxeui.com/other{0}/#/{1}/start/npmInstall',
      errMaxRow: 'Die maximal unterstützte Datenmenge von {0} Zeilen wurde überschritten, dies kann Fehler verursachen',
      useNew: 'Die Verwendung von {0} wird nicht empfohlen, bitte verwenden Sie {1}',
      errorVersion: 'Versionskonflikt, aktuelle Version {0}, mindestens unterstützte Version ist {1}',
      errMaxVersion: '版本不匹配，当前版本 {0}，最高支持版本为 {1}'
    },
    table: {
      emptyText: 'Keine Daten',
      allTitle: 'Alle auswählen/Abwählen',
      seqTitle: 'Nr.',
      actionTitle: 'Aktion',
      confirmFilter: 'Filtern',
      resetFilter: 'Zurücksetzen',
      allFilter: 'Alle',
      sortAsc: 'Aufsteigend: niedrigster zu höchster',
      sortDesc: 'Absteigend: höchster zu niedrigster',
      filter: 'Filter für die ausgewählte Spalte aktivieren',
      impSuccess: '{0} Datensätze erfolgreich importiert',
      expLoading: 'Export läuft',
      expSuccess: 'Export erfolgreich',
      expError: 'Export fehlgeschlagen',
      expFilename: 'Export_{0}',
      expOriginFilename: 'Export_Quelle_{0}',
      customTitle: 'Benutzerdefinierte Einstellungen',
      customAll: 'Alle',
      customConfirm: 'Bestätigen',
      customClose: 'Schließen',
      customCancel: 'Abbrechen',
      customRestore: 'Standard wiederherstellen',
      maxFixedCol: 'Die maximale Anzahl fixierter Spalten darf {0} nicht überschreiten',
      maxGroupCol: 'Die maximale Anzahl gruppierter Felder darf {0} nicht überschreiten',
      dragTip: 'Verschieben: {0}',
      resizeColTip: 'Breite: {0} Pixel',
      resizeRowTip: 'Höhe: {0} Pixel',
      rowGroupContentTotal: '{0} ({1})',
      menuLoading: 'Wird geladen...'
    },
    grid: {
      selectOneRecord: 'Bitte wählen Sie mindestens einen Datensatz aus!',
      deleteSelectRecord: 'Möchten Sie die ausgewählten Datensätze wirklich löschen?',
      removeSelectRecord: 'Möchten Sie die ausgewählten Datensätze wirklich entfernen?',
      dataUnchanged: 'Daten unverändert!',
      delSuccess: 'Ausgewählte Datensätze erfolgreich gelöscht!',
      saveSuccess: 'Erfolgreich gespeichert!',
      operError: 'Ein Fehler ist aufgetreten, Vorgang fehlgeschlagen!'
    },
    select: {
      clear: 'Leeren',
      allChecked: 'Alle auswählen',
      total: '{0} Element(e) ausgewählt',
      close: 'Schließen',
      search: 'Suchen',
      loadingText: 'Wird geladen...',
      emptyText: 'Keine Daten',
      maxSize: 'Die maximale Anzahl auswählbarer Elemente darf {0} nicht überschreiten',
      overSizeErr: 'Die maximale Anzahl von {0} auswählbaren Elementen wurde überschritten, der Überschuss wird ignoriert!',
      searchEmpty: 'Keine passenden Daten gefunden!'
    },
    list: {
      allChecked: 'Alle auswählen',
      dragTip: 'Verschieben: {0}'
    },
    tree: {
      searchEmpty: 'Keine passenden Daten gefunden!',
      dragTip: 'Verschieben: {0}'
    },
    treeSelect: {
      clearChecked: 'Leeren',
      allChecked: 'Alle auswählen',
      allExpand: 'Alle erweitern',
      clearExpand: 'Alle reduzieren',
      total: '{0} Element(e) ausgewählt',
      filterCount: '{0} Datensätze gefunden',
      close: 'Schließen',
      search: 'Suchen',
      emptyText: 'Keine Daten'
    },
    tableSelect: {
      filterCount: '{0} Datensätze gefunden'
    },
    pager: {
      goto: 'Gehe zu',
      gotoTitle: 'Seite',
      pagesize: '{0}/Seite',
      total: 'Insgesamt {0} Datensätze',
      pageClassifier: 'Seite',
      homePage: 'Startseite',
      homePageTitle: 'Erste Seite',
      prevPage: 'Zurück',
      prevPageTitle: 'Vorherige Seite',
      nextPage: 'Weiter',
      nextPageTitle: 'Nächste Seite',
      prevJump: 'Nach oben springen',
      prevJumpTitle: 'Nach oben springen',
      nextJump: 'Nach unten springen',
      nextJumpTitle: 'Nach unten springen',
      endPage: 'Letzte',
      endPageTitle: 'Letzte Seite'
    },
    alert: {
      title: 'Systemhinweis'
    },
    button: {
      confirm: 'Bestätigen',
      cancel: 'Abbrechen',
      clear: 'Leeren'
    },
    filter: {
      search: 'Suchen'
    },
    custom: {
      cstmTitle: 'Benutzerdefinierte Einstellungen',
      cstmRestore: 'Standard wiederherstellen',
      cstmCancel: 'Abbrechen',
      cstmConfirm: 'OK',
      cstmConfirmRestore: 'Möchten Sie die Standardspaltenkonfiguration wirklich wiederherstellen?',
      cstmDragTarget: 'Verschieben: {0}',
      setting: {
        colSort: 'Sortieren',
        sortHelpTip: 'Klicken Sie auf das Symbol, um das Ziehen zu starten',
        colTitle: 'Spaltentitel',
        colResizable: 'Spaltenbreite (Pixel)',
        colVisible: 'Anzeigen',
        colFixed: 'Fixierte Spalte',
        colFixedMax: 'Fixierte Spalten ({0})',
        colAlign: 'Ausrichtung',
        colHeadAlign: 'Kopfzeilenausrichtung',
        colFootAlign: 'Fußzeilenausrichtung',
        fixedLeft: 'Links',
        fixedUnset: 'Keine',
        fixedRight: 'Rechts',
        alignLeft: 'Links',
        alignCenter: 'Mitte',
        alignRight: 'Rechts',
        moveUp: 'Nach oben',
        moveDn: 'Nach unten',
        putTop: 'Ganz nach oben',
        putBottom: 'Ganz nach unten',
        moveUpTitle: 'Klicken, um nach oben zu verschieben',
        moveDnTitle: 'Klicken, um nach unten zu verschieben',
        putTopTitle: 'Klicken, um ganz nach oben zu verschieben',
        putBottomTitle: 'Klicken, um ganz nach unten zu verschieben',
        anLeftTitle: 'Linksbündig',
        anCenterTitle: 'Zentriert',
        anRightTitle: 'Rechtsbündig'
      }
    },
    import: {
      modes: {
        covering: 'Überschreiben (Tabellendaten direkt überschreiben)',
        insert: 'Am Ende anhängen (neue Daten am Ende der Tabelle anhängen)',
        insertTop: 'Am Anfang anhängen (neue Daten am Anfang der Tabelle anhängen)',
        insertBottom: 'Am Ende anhängen (neue Daten am Ende der Tabelle anhängen)'
      },
      impTitle: 'Daten importieren',
      impFile: 'Dateiname',
      impSelect: 'Datei auswählen',
      impType: 'Dateityp',
      impOpts: 'Parametereinstellungen',
      impMode: 'Importmodus',
      impConfirm: 'Importieren',
      impCancel: 'Abbrechen'
    },
    export: {
      types: {
        csv: 'CSV (Komma-getrennt)(*.csv)',
        html: 'Webseite(*.html)',
        xml: 'XML-Daten(*.xml)',
        txt: 'Textdatei (Tabulator-getrennt)(*.txt)',
        xls: 'Excel 97-2003 Arbeitsmappe(*.xls)',
        xlsx: 'Excel Arbeitsmappe(*.xlsx)',
        pdf: 'PDF (*.pdf)'
      },
      modes: {
        empty: 'Leere Daten',
        current: 'Aktuelle Daten (Daten der aktuellen Seite)',
        selected: 'Ausgewählte Daten (auf der aktuellen Seite ausgewählte Daten)',
        all: 'Alle Daten (einschließlich aller Seiten)'
      },
      printTitle: 'Daten drucken',
      expTitle: 'Daten exportieren',
      expName: 'Dateiname',
      expNamePlaceholder: 'Bitte Dateinamen eingeben',
      expSheetName: 'Titel',
      expSheetNamePlaceholder: 'Bitte Titel eingeben',
      expType: 'Speichertyp',
      expMode: 'Daten auswählen',
      expCurrentColumn: 'Alle Felder',
      expColumn: 'Felder auswählen',
      widthMode: 'Spaltenbreiteneinstellungen',
      wModeTitle: 'Festlegen, wie Spaltenbreiten beim Drucken gerendert werden',
      wdModes: {
        default: 'Standard',
        auto: 'Automatisch (Spaltenbreite an Inhalt anpassen)',
        scale: 'Skaliert (Spaltenbreite gemäß Seitenverhältnis rendern)'
      },
      expOpts: 'Parametereinstellungen',
      expOptHeader: 'Kopfzeile',
      expHeaderTitle: 'Ist eine Kopfzeile erforderlich?',
      expOptFooter: 'Fußzeile',
      expFooterTitle: 'Ist eine Fußzeile erforderlich?',
      expOptColgroup: 'Gruppierte Kopfzeile',
      expOptTitle: 'Spaltentitel',
      expTitleTitle: 'Spaltentitel verwenden, andernfalls Feldnamen anzeigen',
      expColgroupTitle: 'Falls vorhanden, werden Kopfzeilen mit Gruppenstruktur unterstützt',
      expOptMerge: 'Zusammenführen',
      expMergeTitle: 'Falls vorhanden, werden Zellen mit Verbundstruktur unterstützt',
      expOptAllExpand: 'Baum erweitern',
      expAllExpandTitle: 'Falls vorhanden, werden hierarchische Daten vollständig erweitert',
      expOptTreeAllExpand: 'Baum erweitern',
      expTreeAllExpandTitle: 'Falls vorhanden, werden alle Baumebenen automatisch erweitert',
      expOptRowGroupAllExpand: 'Gruppen erweitern',
      expRowGroupAllExpandTitle: 'Falls vorhanden, werden alle Gruppenebenen automatisch erweitert',
      expOptUseStyle: 'Stile',
      expUseStyleTitle: 'Falls vorhanden, werden gestaltete Zellen unterstützt',
      expOptOriginal: 'Quelldaten',
      expOriginalTitle: 'Bei Quelldaten wird der Import in die Tabelle unterstützt',
      expPrint: 'Drucken',
      expConfirm: 'Exportieren',
      expCancel: 'Abbrechen'
    },
    modal: {
      errTitle: 'Fehler',
      zoomMin: 'Minimieren',
      zoomIn: 'Maximieren',
      zoomOut: 'Wiederherstellen',
      close: 'Schließen',
      miniMaxSize: 'Die Anzahl minimierter Fenster darf {0} nicht überschreiten',
      footPropErr: 'show-footer wird nur zum Aktivieren der Fußzeile verwendet und muss mit show-confirm-button | show-cancel-button | Slots verwendet werden'
    },
    drawer: {
      close: 'Schließen'
    },
    form: {
      folding: 'Einklappen',
      unfolding: 'Ausklappen'
    },
    toolbar: {
      import: 'Importieren',
      export: 'Exportieren',
      print: 'Drucken',
      refresh: 'Aktualisieren',
      zoomIn: 'Vollbild',
      zoomOut: 'Wiederherstellen',
      custom: 'Benutzerdefinierte Einstellungen',
      customAll: 'Alle',
      customConfirm: 'Bestätigen',
      customRestore: 'Zurücksetzen',
      fixedLeft: 'Links fixieren',
      fixedRight: 'Rechts fixieren',
      cancelFixed: 'Spaltenfixierung aufheben'
    },
    iconPicker: {
      search: 'Suchen',
      emptyText: 'Keine Daten'
    },
    datePicker: {
      yearTitle: '{0}'
    },
    dateRangePicker: {
      pleaseRange: 'Bitte Start- und Enddatum auswählen'
    },
    input: {
      date: {
        m1: 'Jan',
        m2: 'Feb',
        m3: 'Mär',
        m4: 'Apr',
        m5: 'Mai',
        m6: 'Jun',
        m7: 'Jul',
        m8: 'Aug',
        m9: 'Sep',
        m10: 'Okt',
        m11: 'Nov',
        m12: 'Dez',
        quarterLabel: 'Quartal {0}',
        monthLabel: 'Monat {0}',
        dayLabel: '{0} {1}',
        labelFormat: {
          date: 'yyyy-MM-dd',
          time: 'HH:mm:ss',
          datetime: 'yyyy-MM-dd HH:mm:ss',
          week: 'Woche WW, yyyy',
          month: 'yyyy-MM',
          quarter: 'Qq yyyy',
          year: 'yyyy'
        },
        weeks: {
          w: '',
          w0: 'Sonntag',
          w1: 'Montag',
          w2: 'Dienstag',
          w3: 'Mittwoch',
          w4: 'Donnerstag',
          w5: 'Freitag',
          w6: 'Samstag'
        },
        months: {
          m0: 'Januar',
          m1: 'Februar',
          m2: 'März',
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
          q1: '1. Quartal',
          q2: '2. Quartal',
          q3: '3. Quartal',
          q4: '4. Quartal'
        }
      }
    },
    calendar: {
      yearLabel: '{0}',
      monthLabel: '{0}'
    },
    cascader: {
      clearChecked: 'Leeren',
      allChecked: 'Alle auswählen',
      total: '{0} Element(e) ausgewählt',
      close: 'Schließen',
      search: 'Suchen'
    },
    numberInput: {
      currencySymbol: '€'
    },
    imagePreview: {
      popupTitle: 'Vorschau',
      operBtn: {
        zoomOut: 'Verkleinern',
        zoomIn: 'Vergrößern',
        pctFull: 'An Seite anpassen',
        pct11: 'Originalgröße anzeigen',
        rotateLeft: 'Nach links drehen',
        rotateRight: 'Nach rechts drehen',
        print: 'Klicken, um das Bild zu drucken',
        download: 'Klicken, um das Bild herunterzuladen'
      }
    },
    upload: {
      fileBtnText: 'Klicken oder ziehen zum Hochladen',
      imgBtnText: 'Klicken oder ziehen zum Hochladen',
      dragPlaceholder: 'Ziehen Sie Dateien in diesen Bereich, um sie hochzuladen',
      imgSizeHint: 'Einzelbild {0}',
      imgCountHint: 'Maximal {0} Bilder',
      fileTypeHint: 'Unterstützt {0} Dateitypen',
      fileSizeHint: 'Einzelne Dateigröße nicht größer als {0}',
      fileCountHint: 'Maximal {0} Dateien hochladbar',
      uploadTypeErr: 'Dateityp stimmt nicht überein!',
      overCountErr: 'Maximal {0} Dateien auswählbar!',
      overCountExtraErr: 'Maximale Anzahl von {0} überschritten, die überschüssigen {1} Dateien werden ignoriert!',
      overSizeErr: 'Dateigröße darf {0} nicht überschreiten!',
      manualUpload: 'Zum Hochladen klicken',
      reUpload: 'Erneut hochladen',
      uploadProgress: 'Hochladen {0}%',
      uploadErr: 'Hochladen fehlgeschlagen',
      uploadSuccess: 'Erfolgreich hochgeladen',
      moreBtnText: 'Mehr ({0})',
      moreImgBtnText: 'Bilder ({0})',
      moreFileBtnText: 'Dateien ({0})',
      viewItemTitle: 'Zum Anzeigen klicken',
      morePopup: {
        readTitle: 'Liste anzeigen',
        imageTitle: 'Bilder hochladen',
        fileTitle: 'Dateien hochladen'
      }
    },
    empty: {
      defText: 'Keine Daten'
    },
    colorPicker: {
      clear: 'Leeren',
      confirm: 'Bestätigen',
      copySuccess: 'In die Zwischenablage kopiert: {0}',
      hex: 'Hexadezimal'
    },
    formDesign: {
      formName: 'Formularname',
      defFormTitle: 'Unbenanntes Formular',
      widgetPropTab: 'Widget-Eigenschaften',
      widgetFormTab: 'Formulareigenschaften',
      error: {
        wdFormUni: 'Dieser Widget-Typ darf nur einmal im Formular hinzugefügt werden',
        wdSubUni: 'Dieser Widget-Typ darf nur einmal in der Untertabelle hinzugefügt werden'
      },
      styleSetting: {
        btn: 'Stileinstellungen',
        title: 'Formularstileinstellungen',
        layoutTitle: 'Widget-Layout',
        verticalLayout: 'Vertikales Layout',
        horizontalLayout: 'Horizontales Layout',
        styleTitle: 'Titelstil',
        boldTitle: 'Fetter Titel',
        fontBold: 'Fett',
        fontNormal: 'Normal',
        colonTitle: 'Doppelpunkt anzeigen',
        colonVisible: 'Anzeigen',
        colonHidden: 'Ausblenden',
        alignTitle: 'Ausrichtung',
        widthTitle: 'Titelbreite',
        alignLeft: 'Links',
        alignRight: 'Rechts',
        unitPx: 'Pixel',
        unitPct: 'Prozent'
      },
      widget: {
        group: {
          base: 'Basis-Widgets',
          layout: 'Layout-Widgets',
          system: 'System-Widgets',
          module: 'Modul-Widgets',
          chart: 'Diagramm-Widgets',
          advanced: 'Erweiterte Widgets'
        },
        copyTitle: 'Kopie_{0}',
        component: {
          input: 'Eingabefeld',
          textarea: 'Textbereich',
          select: 'Auswahlliste',
          row: 'Zeile mit mehreren Spalten',
          title: 'Titel',
          text: 'Text',
          subtable: 'Untertabelle',
          VxeSwitch: 'Ja/Nein',
          VxeInput: 'Eingabefeld',
          VxeNumberInput: 'Zahl',
          VxeDatePicker: 'Datum',
          VxeTextarea: 'Textbereich',
          VxeSelect: 'Auswahlliste',
          VxeTreeSelect: 'Baumauswahl',
          VxeRadioGroup: 'Optionsfeldgruppe',
          VxeCheckboxGroup: 'Kontrollkästchengruppe',
          VxeUploadFile: 'Datei',
          VxeUploadImage: 'Bild',
          VxeRate: 'Bewertung',
          VxeSlider: 'Schieberegler'
        },
        row: {
          placeholder: 'Widget-Position'
        }
      },
      widgetProp: {
        name: 'Widget-Name',
        placeholder: 'Platzhalter',
        required: 'Pflichtfeldvalidierung',
        multiple: 'Mehrfachauswahl erlauben',
        displaySetting: {
          name: 'Anzeigeeinstellungen',
          pc: 'PC',
          mobile: 'Mobil',
          visible: 'Anzeigen',
          hidden: 'Ausblenden'
        },
        dataSource: {
          name: 'Datenquelle',
          defValue: 'Option {0}',
          addOption: 'Option hinzufügen',
          batchEditOption: 'Batch-Bearbeitung',
          batchEditTip: 'Jede Zeile entspricht einer Option; direktes Kopieren und Einfügen aus Tabellen, Excel und WPS wird unterstützt.',
          batchEditSubTip: 'Jede Zeile entspricht einer Option; bei Gruppierungen können Unterelemente mit Leerzeichen oder Tabulator beginnen; direktes Kopieren und Einfügen aus Tabellen, Excel und WPS wird unterstützt.',
          buildOption: 'Optionen generieren'
        },
        rowProp: {
          colSize: 'Spaltenanzahl',
          col2: 'Zwei Spalten',
          col3: 'Drei Spalten',
          col4: 'Vier Spalten',
          col6: 'Sechs Spalten',
          layout: 'Layout'
        },
        textProp: {
          name: 'Inhalt',
          alignTitle: 'Ausrichtung',
          alignLeft: 'Links',
          alignCenter: 'Mitte',
          alignRight: 'Rechts',
          colorTitle: 'Schriftfarbe',
          sizeTitle: 'Schriftgröße',
          boldTitle: 'Fette Schrift',
          fontNormal: 'Normal',
          fontBold: 'Fett'
        },
        subtableProp: {
          seqTitle: 'Nr.',
          showSeq: 'Nummer anzeigen',
          showCheckbox: 'Mehrfachauswahl erlauben',
          errSubDrag: 'Untertabelle unterstützt dieses Widget nicht, bitte verwenden Sie ein anderes Widget',
          colPlace: 'Widget hierher ziehen'
        },
        uploadProp: {
          limitFileCount: 'Dateianzahl begrenzen',
          limitFileSize: 'Dateigröße begrenzen',
          multiFile: 'Hochladen mehrerer Dateien erlauben',
          limitImgCount: 'Bildanzahl begrenzen',
          limitImgSize: 'Bildgröße begrenzen',
          multiImg: 'Hochladen mehrerer Bilder erlauben'
        },
        rules: {
          required: 'Pflichtfeld'
        }
      }
    },
    listDesign: {
      fieldSettingTab: 'Feldeinstellungen',
      listSettingTab: 'Parametereinstellungen',
      searchTitle: 'Suchbedingungen',
      listTitle: 'Listenfelder',
      searchField: 'Suchfeld',
      listField: 'Listenfeld',
      activeBtn: {
        ActionButtonUpdate: 'Bearbeiten',
        ActionButtonDelete: 'Löschen'
      },
      search: {
        addBtn: 'Bearbeiten',
        emptyText: 'Keine Suchbedingungen konfiguriert',
        editPopupTitle: 'Suchfeld bearbeiten'
      },
      searchPopup: {
        colTitle: 'Titel',
        saveBtn: 'Speichern'
      }
    },
    text: {
      copySuccess: 'In die Zwischenablage kopiert',
      copyError: 'Diese Operation wird in der aktuellen Umgebung nicht unterstützt'
    },
    countdown: {
      formats: {
        yyyy: 'Jahr',
        MM: 'Monat',
        dd: 'Tag',
        HH: 'Stunde',
        mm: 'Minute',
        ss: 'Sekunde'
      }
    },
    contextMenu: {
      loadingText: 'Wird geladen...'
    },
    switch: {
      onText: 'Ein',
      offText: 'Aus'
    },
    gantt: {
      tFullFormat: {
        year: '{yyyy}',
        quarter: 'Q{q} {yyyy}',
        month: '{MM}/{yyyy}',
        week: 'Woche {W}, {yyyy}',
        day: '{eLabel}, {dd}.{MM}.{yyyy}',
        date: '{dd}.{MM}.{yyyy}',
        hour: '{dd}.{MM}.{yyyy} {HH}:00',
        minute: '{dd}.{MM}.{yyyy} {HH}:{mm}',
        second: '{dd}.{MM}.{yyyy} {HH}:{mm}:{ss}'
      },
      tSimpleFormat: {
        year: '{yyyy}',
        quarter: 'Q{q}',
        month: '{M}',
        week: 'W{W}',
        day: '{eLabel}',
        date: '{d}',
        hour: '{HH}',
        minute: '{mm}',
        second: '{ss}'
      },
      stepFormat: {
        year: '{start.yyyy}~{end.yyyy}',
        quarter: 'Q{start.q}~Q{end.q}',
        month: '{start.M}~{end.M}',
        week: 'W{start.W}~W{end.W}',
        day: '{eStartLabel}~{eEndLabel}',
        date: '{start.d}~{end.d}',
        hour: '{start.HH}~{end.HH}',
        minute: '{start.mm}~{end.mm}',
        second: '{start.ss}~{end.ss}'
      },
      dayss: {
        w0: 'So',
        w1: 'Mo',
        w2: 'Di',
        w3: 'Mi',
        w4: 'Do',
        w5: 'Fr',
        w6: 'Sa'
      },
      days: {
        w0: 'Sonntag',
        w1: 'Montag',
        w2: 'Dienstag',
        w3: 'Mittwoch',
        w4: 'Donnerstag',
        w5: 'Freitag',
        w6: 'Samstag'
      }
    },
    plugins: {
      extendCellArea: {
        area: {
          mergeErr: 'Dieser Vorgang kann nicht auf verbundenen Zellen ausgeführt werden',
          multiErr: 'Dieser Vorgang kann nicht auf mehreren ausgewählten Bereichen ausgeführt werden',
          selectErr: 'Zellen im angegebenen Bereich können nicht bearbeitet werden',
          extendErr: 'Um diesen Vorgang auszuführen, müssen alle verbundenen Zellen dieselbe Größe haben',
          pasteMultiErr: 'Einfügen nicht möglich; der kopierte Bereich und der Einfügebereich müssen dieselbe Größe haben',
          cpInvalidErr: 'Dieser Vorgang kann nicht ausgeführt werden, da der ausgewählte Bereich gesperrte Spalten ({0}) enthält'
        },
        fnr: {
          title: 'Suchen und Ersetzen',
          titleFd: 'Suchen',
          titleRe: 'Ersetzen',
          findLabel: 'Suchen',
          replaceLabel: 'Ersetzen',
          findTitle: 'Suchen nach:',
          replaceTitle: 'Ersetzen durch:',
          tabs: {
            find: 'Suchen',
            replace: 'Ersetzen'
          },
          filter: {
            re: 'Regulärer Ausdruck',
            whole: 'Ganzes Wort',
            sensitive: 'Groß-/Kleinschreibung beachten'
          },
          btns: {
            findNext: 'Weitersuchen',
            findAll: 'Alle suchen',
            replace: 'Ersetzen',
            replaceAll: 'Alle ersetzen',
            cancel: 'Abbrechen'
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
          empty: '(leer)',
          reError: 'Ungültiger regulärer Ausdruck',
          recordCount: '{0} Zellen gefunden',
          notCell: 'Keine passende Zelle gefunden',
          replaceSuccess: '{0} Zellen erfolgreich ersetzt'
        }
      },
      extendPivotTable: {
        aggregation: {
          grouping: 'Gruppierung',
          values: 'Werte',
          groupPlaceholder: 'Hierher ziehen zum Gruppieren',
          valuesPlaceholder: 'Hierher ziehen zum Aggregieren',
          dragExistCol: 'Diese Spalte existiert bereits',
          sortHelpTip: 'Klicken Sie auf das Symbol, um das Ziehen zu starten'
        },
        aggFuncs: {
          sum: 'Summe',
          count: 'Anzahl',
          avg: 'Durchschnitt',
          min: 'Minimum',
          max: 'Maximum',
          first: 'Erster Wert',
          last: 'Letzter Wert'
        }
      },
      filterComplexInput: {
        menus: {
          fixedColumn: 'Fixierte Spalte',
          fixedGroup: 'Fixierte Gruppe',
          cancelFixed: 'Fixierung aufheben',
          fixedLeft: 'Links fixieren',
          fixedRight: 'Rechts fixieren'
        },
        cases: {
          equal: 'Gleich',
          gt: 'Größer als',
          lt: 'Kleiner als',
          begin: 'Beginnt mit',
          endin: 'Endet mit',
          include: 'Enthält',
          isSensitive: 'Groß-/Kleinschreibung beachten'
        }
      },
      filterCombination: {
        menus: {
          sort: 'Sortieren',
          clearSort: 'Sortierung löschen',
          sortAsc: 'Aufsteigend',
          sortDesc: 'Absteigend',
          fixedColumn: 'Fixierte Spalte',
          fixedGroup: 'Fixierte Gruppe',
          cancelFixed: 'Fixierung aufheben',
          fixedLeft: 'Links fixieren',
          fixedRight: 'Rechts fixieren',
          clearFilter: 'Filter löschen',
          textOption: 'Textfilter',
          numberOption: 'Zahlenfilter',
          dateOption: 'Datumsfilter'
        },
        popup: {
          title: 'Benutzerdefinierte Filtermethode',
          currColumnTitle: 'Zeilen anzeigen:',
          and: 'Und',
          or: 'Oder',
          describeHtml: 'Verwenden Sie ? für ein einzelnes Zeichen<br/>Verwenden Sie * für beliebig viele Zeichen'
        },
        cases: {
          equal: 'Gleich',
          unequal: 'Ungleich',
          gt: 'Größer als',
          ge: 'Größer oder gleich',
          lt: 'Kleiner als',
          le: 'Kleiner oder gleich',
          begin: 'Beginnt mit',
          notbegin: 'Beginnt nicht mit',
          endin: 'Endet mit',
          notendin: 'Endet nicht mit',
          include: 'Enthält',
          exclude: 'Enthält nicht',
          between: 'Zwischen',
          isAfter: 'Ist nach',
          eqAfter: 'Ist am oder nach',
          isBefore: 'Ist vor',
          eqBefore: 'Ist am oder vor',
          top10: 'Top 10',
          aboveAverage: 'Über dem Durchschnitt',
          belowAverage: 'Unter dem Durchschnitt',
          before: 'Vor',
          after: 'Nach',
          tomorrow: 'Morgen',
          today: 'Heute',
          yesterday: 'Gestern',
          nextWeek: 'Nächste Woche',
          thisWeek: 'Diese Woche',
          lastWeek: 'Letzte Woche',
          nextMonth: 'Nächster Monat',
          thisMonth: 'Dieser Monat',
          lastMonth: 'Letzter Monat',
          nextYear: 'Nächstes Jahr',
          thisYear: 'Dieses Jahr',
          lastYear: 'Letztes Jahr',
          yearToDate: 'Jahr bis heute',
          custom: 'Benutzerdefinierter Filter',
          insensitive: 'Groß-/Kleinschreibung nicht beachten',
          isSensitive: 'Groß-/Kleinschreibung beachten'
        },
        empty: '(leer)',
        notData: 'Keine Übereinstimmungen'
      }
    },
    pro: {
      area: {
        mergeErr: 'Dieser Vorgang kann nicht auf verbundenen Zellen ausgeführt werden',
        multiErr: 'Dieser Vorgang kann nicht auf mehreren ausgewählten Bereichen ausgeführt werden',
        extendErr: 'Um diesen Vorgang auszuführen, müssen alle verbundenen Zellen dieselbe Größe haben',
        pasteMultiErr: 'Einfügen nicht möglich; der kopierte Bereich und der Einfügebereich müssen dieselbe Größe haben'
      },
      fnr: {
        title: 'Suchen und Ersetzen',
        titleFd: 'Suchen',
        titleRe: 'Ersetzen',
        findLabel: 'Suchen',
        replaceLabel: 'Ersetzen',
        findTitle: 'Suchen nach:',
        replaceTitle: 'Ersetzen durch:',
        tabs: {
          find: 'Suchen',
          replace: 'Ersetzen'
        },
        filter: {
          re: 'Regulärer Ausdruck',
          whole: 'Ganzes Wort',
          sensitive: 'Groß-/Kleinschreibung beachten'
        },
        btns: {
          findNext: 'Weitersuchen',
          findAll: 'Alle suchen',
          replace: 'Ersetzen',
          replaceAll: 'Alle ersetzen',
          cancel: 'Abbrechen'
        },
        header: {
          seq: '#',
          cell: 'Zelle',
          value: 'Wert'
        },
        empty: '(leer)',
        reError: 'Ungültiger regulärer Ausdruck',
        recordCount: '{0} Zellen gefunden',
        notCell: 'Keine passende Zelle gefunden',
        replaceSuccess: '{0} Zellen erfolgreich ersetzt'
      }
    },
    renderer: {
      search: 'Suchen',
      cases: {
        equal: 'Gleich',
        unequal: 'Ungleich',
        gt: 'Größer als',
        ge: 'Größer oder gleich',
        lt: 'Kleiner als',
        le: 'Kleiner oder gleich',
        begin: 'Beginnt mit',
        notbegin: 'Beginnt nicht mit',
        endin: 'Endet mit',
        notendin: 'Endet nicht mit',
        include: 'Enthält',
        exclude: 'Enthält nicht',
        between: 'Zwischen',
        top10: 'Top 10',
        aboveAverage: 'Über dem Durchschnitt',
        belowAverage: 'Unter dem Durchschnitt',
        custom: 'Benutzerdefinierter Filter',
        insensitive: 'Groß-/Kleinschreibung nicht beachten',
        isSensitive: 'Groß-/Kleinschreibung beachten'
      },
      combination: {
        menus: {
          sort: 'Sortieren',
          clearSort: 'Sortierung löschen',
          sortAsc: 'Aufsteigend',
          sortDesc: 'Absteigend',
          fixedColumn: 'Fixierte Spalte',
          fixedGroup: 'Fixierte Gruppe',
          cancelFixed: 'Fixierung aufheben',
          fixedLeft: 'Links fixieren',
          fixedRight: 'Rechts fixieren',
          clearFilter: 'Filter löschen',
          textOption: 'Textfilter',
          numberOption: 'Zahlenfilter',
          dateOption: 'Datumsfilter'
        },
        popup: {
          title: 'Benutzerdefinierte Filtermethode',
          currColumnTitle: 'Zeilen anzeigen:',
          and: 'Und',
          or: 'Oder',
          describeHtml: 'Verwenden Sie ? für ein einzelnes Zeichen<br/>Verwenden Sie * für beliebig viele Zeichen'
        },
        empty: '(leer)',
        notData: 'Keine Übereinstimmungen'
      }
    }
  }
}
