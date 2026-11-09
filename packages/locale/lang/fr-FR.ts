export default {
  vxe: {
    base: {
      pleaseInput: 'Veuillez saisir',
      pleaseSelect: 'Veuillez sélectionner',
      comma: ',',
      fullStop: '.'
    },
    loading: {
      text: 'Chargement...'
    },
    error: {
      downErr: 'Échec du téléchargement',
      errLargeData: 'Lorsque le volume de données liées est trop important, veuillez utiliser {0}, sinon des ralentissements peuvent survenir',
      groupFixed: 'Si des en-têtes groupés sont utilisés, les colonnes figées doivent être définies par groupe',
      groupMouseRange: 'Les en-têtes groupés ne peuvent pas être utilisés avec "{0}", cela peut provoquer des erreurs',
      groupTag: "Les colonnes d'en-tête groupées doivent utiliser \"{0}\" plutôt que \"{1}\", cela peut provoquer des erreurs",
      scrollErrProp: "Après activation du défilement virtuel, le paramètre \"{0}\" n'est pas pris en charge",
      errConflicts: 'Le paramètre "{0}" est en conflit avec "{1}"',
      modelConflicts: 'La valeur du champ lié "{0}" est en conflit avec "{1}", des erreurs vont survenir',
      notSupportProp: "Lorsque le paramètre \"{0}\" est activé, \"{1}\" n'est pas pris en charge ; il devrait être \"{2}\", sinon des erreurs surviendront",
      reqSupportProp: "Lors de l'utilisation de \"{0}\", il convient de définir \"{1}\", sinon des erreurs peuvent survenir",
      notConflictProp: "Lors de l'utilisation de \"{0}\", il convient de définir \"{1}\", sinon des conflits de fonctionnalités peuvent survenir",
      unableInsert: "Impossible d'insérer à la position spécifiée, veuillez vérifier que les paramètres sont corrects",
      useErr: "Une erreur s'est produite lors de l'installation du module \"{0}\", l'ordre est peut-être incorrect ; les modules dépendants doivent être installés avant Table",
      barUnableLink: "La barre d'outils ne peut pas être liée au tableau",
      expandContent: 'Le slot de la ligne développée doit être "content", veuillez vérifier',
      reqComp: "Composant \"{0}\" manquant, veuillez vérifier qu'il est correctement installé. https://vxeui.com/#/start/useUI/useGlobal",
      reqModule: 'Module "{0}" manquant',
      reqProp: 'Paramètre obligatoire "{0}" manquant, cela peut provoquer des erreurs',
      emptyProp: 'Le paramètre "{0}" ne peut pas être vide',
      errProp: 'Paramètre non pris en charge "{0}", peut-être "{1}"',
      colRepet: 'column.{0}="{1}" est dupliqué, cela peut rendre certaines fonctionnalités indisponibles',
      notFunc: "La méthode \"{0}\" n'existe pas",
      errFunc: "Le paramètre \"{0}\" n'est pas une méthode",
      notValidators: "Le validateur global \"{0}\" n'existe pas",
      notFormats: "Le formateur global \"{0}\" n'existe pas",
      notCommands: "La commande globale \"{0}\" n'existe pas",
      notSlot: "Le slot \"{0}\" n'existe pas",
      noTree: 'La structure arborescente ne prend pas en charge "{0}"',
      noGroup: "\"{0}\" n'est pas pris en charge après le regroupement des données",
      notProp: 'Paramètre non pris en charge "{0}"',
      returnErr: 'La valeur de retour du paramètre "{0}" est attendue comme "{1}" mais est en réalité "{2}"',
      notSupportReturn: 'Lorsque la valeur de retour est "{0}", le paramètre doit utiliser "{1}" au lieu de "{2}"',
      checkProp: 'Lorsque le volume de données est trop important, les cases à cocher peuvent ralentir ; il est recommandé de définir le paramètre "{0}" pour améliorer la vitesse de rendu',
      coverProp: 'Le paramètre "{1}" de "{0}" est défini de manière répétée, cela peut provoquer des erreurs',
      uniField: 'Le nom de champ "{0}" est défini de manière répétée, cela peut provoquer des erreurs',
      repeatKey: 'Clé primaire dupliquée {0}="{1}", cela peut provoquer des erreurs',
      repeatProp: 'Paramètre dupliqué {0}="{1}", cela peut provoquer des erreurs',
      delFunc: 'La méthode "{0}" est obsolète, veuillez utiliser "{1}"',
      delProp: 'Le paramètre "{0}" est obsolète, veuillez utiliser "{1}"',
      delEvent: "L'événement \"{0}\" est obsolète, veuillez utiliser \"{1}\"",
      removeProp: 'Le paramètre "{0}" est obsolète et déconseillé, cela peut provoquer des erreurs',
      errFormat: "Le contenu de formatage global doit être défini avec \"VXETable.formats\" ; le montage de \"formatter={0}\" n'est plus recommandé",
      notType: 'Type de fichier non pris en charge "{0}"',
      notExp: "Ce navigateur ne prend pas en charge l'import/export",
      impFields: "Échec de l'importation, veuillez vérifier les noms de champs et le format des données",
      treeNotImp: "Le tableau arborescent ne prend pas en charge l'importation",
      treeCrossDrag: 'Seul le premier niveau peut être glissé',
      treeDragChild: 'Un parent ne peut pas être glissé dans ses propres enfants',
      reqPlugin: "Plugin d'extension non installé \"{1}\" https://vxeui.com/other{0}/#/{1}/start/npmInstall",
      errMaxRow: 'Dépassement du volume de données maximal pris en charge de {0} lignes, cela peut provoquer des erreurs',
      useNew: "L'utilisation de {0} est déconseillée, veuillez utiliser {1}",
      errorVersion: 'Incompatibilité de version, version actuelle {0}, version minimale prise en charge {1}',
      errMaxVersion: '版本不匹配，当前版本 {0}，最高支持版本为 {1}'
    },
    table: {
      emptyText: 'Aucune donnée',
      allTitle: 'Tout sélectionner/Désélectionner',
      seqTitle: 'N°',
      actionTitle: 'Action',
      confirmFilter: 'Filtrer',
      resetFilter: 'Réinitialiser',
      allFilter: 'Tout',
      sortAsc: 'Croissant : du plus bas au plus haut',
      sortDesc: 'Décroissant : du plus haut au plus bas',
      filter: 'Activer le filtre pour la colonne sélectionnée',
      impSuccess: '{0} enregistrements importés avec succès',
      expLoading: 'Exportation en cours',
      expSuccess: 'Exportation réussie',
      expError: "Échec de l'exportation",
      expFilename: 'Export_{0}',
      expOriginFilename: 'Export_Source_{0}',
      customTitle: 'Paramètres personnalisés',
      customAll: 'Tout',
      customConfirm: 'Confirmer',
      customClose: 'Fermer',
      customCancel: 'Annuler',
      customRestore: 'Restaurer les valeurs par défaut',
      maxFixedCol: 'Le nombre maximal de colonnes figées ne peut pas dépasser {0}',
      maxGroupCol: 'Le nombre maximal de champs groupés ne peut pas dépasser {0}',
      dragTip: 'Déplacer : {0}',
      resizeColTip: 'Largeur : {0} pixels',
      resizeRowTip: 'Hauteur : {0} pixels',
      rowGroupContentTotal: '{0} ({1})',
      menuLoading: 'Chargement...'
    },
    grid: {
      selectOneRecord: 'Veuillez sélectionner au moins un enregistrement !',
      deleteSelectRecord: 'Êtes-vous sûr de vouloir supprimer les enregistrements sélectionnés ?',
      removeSelectRecord: 'Êtes-vous sûr de vouloir retirer les enregistrements sélectionnés ?',
      dataUnchanged: "Les données n'ont pas changé !",
      delSuccess: 'Enregistrements sélectionnés supprimés avec succès !',
      saveSuccess: 'Enregistré avec succès !',
      operError: "Une erreur s'est produite, l'opération a échoué !"
    },
    select: {
      clear: 'Effacer',
      allChecked: 'Tout sélectionner',
      total: '{0} élément(s) sélectionné(s)',
      close: 'Fermer',
      search: 'Rechercher',
      loadingText: 'Chargement...',
      emptyText: 'Aucune donnée',
      maxSize: "Le nombre maximal d'éléments sélectionnables ne peut pas dépasser {0}",
      overSizeErr: 'Le nombre maximal sélectionnable de {0} a été dépassé, le surplus sera ignoré !',
      searchEmpty: 'Aucune donnée correspondante trouvée !'
    },
    list: {
      allChecked: 'Tout sélectionner',
      dragTip: 'Déplacer : {0}'
    },
    tree: {
      searchEmpty: 'Aucune donnée correspondante trouvée !',
      dragTip: 'Déplacer : {0}'
    },
    treeSelect: {
      clearChecked: 'Effacer',
      allChecked: 'Tout sélectionner',
      allExpand: 'Tout développer',
      clearExpand: 'Tout réduire',
      total: '{0} élément(s) sélectionné(s)',
      filterCount: '{0} enregistrements trouvés',
      close: 'Fermer',
      search: 'Rechercher',
      emptyText: 'Aucune donnée'
    },
    tableSelect: {
      filterCount: '{0} enregistrements trouvés'
    },
    pager: {
      goto: 'Aller à',
      gotoTitle: 'Page',
      pagesize: '{0}/page',
      total: 'Total de {0} enregistrements',
      pageClassifier: 'Page',
      homePage: 'Accueil',
      homePageTitle: 'Première page',
      prevPage: 'Précédent',
      prevPageTitle: 'Page précédente',
      nextPage: 'Suivant',
      nextPageTitle: 'Page suivante',
      prevJump: 'Saut vers le haut',
      prevJumpTitle: 'Saut vers le haut',
      nextJump: 'Saut vers le bas',
      nextJumpTitle: 'Saut vers le bas',
      endPage: 'Dernière',
      endPageTitle: 'Dernière page'
    },
    alert: {
      title: 'Message du système'
    },
    button: {
      confirm: 'Confirmer',
      cancel: 'Annuler',
      clear: 'Effacer'
    },
    filter: {
      search: 'Rechercher'
    },
    custom: {
      cstmTitle: 'Paramètres personnalisés',
      cstmRestore: 'Restaurer les valeurs par défaut',
      cstmCancel: 'Annuler',
      cstmConfirm: 'OK',
      cstmConfirmRestore: 'Veuillez confirmer si vous souhaitez restaurer la configuration de colonnes par défaut ?',
      cstmDragTarget: 'Déplacer : {0}',
      setting: {
        colSort: 'Trier',
        sortHelpTip: "Cliquez sur l'icône pour commencer le glisser-déposer",
        colTitle: 'Titre de la colonne',
        colResizable: 'Largeur de la colonne (pixels)',
        colVisible: 'Afficher',
        colFixed: 'Colonne figée',
        colFixedMax: 'Colonnes figées ({0})',
        colAlign: 'Alignement',
        colHeadAlign: "Alignement de l'en-tête",
        colFootAlign: 'Alignement du pied',
        fixedLeft: 'Gauche',
        fixedUnset: 'Aucun',
        fixedRight: 'Droite',
        alignLeft: 'Gauche',
        alignCenter: 'Centre',
        alignRight: 'Droite',
        moveUp: 'Monter',
        moveDn: 'Descendre',
        putTop: 'Mettre en haut',
        putBottom: 'Mettre en bas',
        moveUpTitle: 'Cliquez pour déplacer vers le haut',
        moveDnTitle: 'Cliquez pour déplacer vers le bas',
        putTopTitle: 'Cliquez pour mettre en haut',
        putBottomTitle: 'Cliquez pour mettre en bas',
        anLeftTitle: 'Aligner à gauche',
        anCenterTitle: 'Centrer',
        anRightTitle: 'Aligner à droite'
      }
    },
    import: {
      modes: {
        covering: 'Remplacement (remplacer directement les données du tableau)',
        insert: 'Ajouter en bas (ajouter de nouvelles données en bas du tableau)',
        insertTop: 'Ajouter en haut (ajouter de nouvelles données en haut du tableau)',
        insertBottom: 'Ajouter en bas (ajouter de nouvelles données en bas du tableau)'
      },
      impTitle: 'Importer des données',
      impFile: 'Nom du fichier',
      impSelect: 'Sélectionner un fichier',
      impType: 'Type de fichier',
      impOpts: 'Paramètres',
      impMode: "Mode d'importation",
      impConfirm: 'Importer',
      impCancel: 'Annuler'
    },
    export: {
      types: {
        csv: 'CSV (séparé par des virgules)(*.csv)',
        html: 'Page web(*.html)',
        xml: 'Données XML(*.xml)',
        txt: 'Fichier texte (séparé par des tabulations)(*.txt)',
        xls: 'Classeur Excel 97-2003(*.xls)',
        xlsx: 'Classeur Excel(*.xlsx)',
        pdf: 'PDF (*.pdf)'
      },
      modes: {
        empty: 'Données vides',
        current: 'Données actuelles (données de la page actuelle)',
        selected: 'Données sélectionnées (données sélectionnées sur la page actuelle)',
        all: 'Toutes les données (y compris les données de toutes les pages)'
      },
      printTitle: 'Imprimer les données',
      expTitle: 'Exporter les données',
      expName: 'Nom du fichier',
      expNamePlaceholder: 'Veuillez saisir le nom du fichier',
      expSheetName: 'Titre',
      expSheetNamePlaceholder: 'Veuillez saisir le titre',
      expType: "Type d'enregistrement",
      expMode: 'Sélectionner les données',
      expCurrentColumn: 'Tous les champs',
      expColumn: 'Sélectionner les champs',
      widthMode: 'Paramètres de largeur de colonne',
      wModeTitle: "Définir le mode de rendu de la largeur des colonnes lors de l'impression",
      wdModes: {
        default: 'Par défaut',
        auto: 'Automatique (ajuster la largeur des colonnes selon le contenu)',
        scale: "Mise à l'échelle (rendu de la largeur des colonnes selon l'échelle de la page)"
      },
      expOpts: 'Paramètres',
      expOptHeader: 'En-tête',
      expHeaderTitle: 'Un en-tête est-il nécessaire',
      expOptFooter: 'Pied de page',
      expFooterTitle: 'Un pied de page est-il nécessaire',
      expOptColgroup: 'En-tête groupé',
      expOptTitle: 'Titres de colonnes',
      expTitleTitle: 'Utiliser les titres de colonnes, sinon afficher les noms de champs',
      expColgroupTitle: 'Si présent, prend en charge les en-têtes avec structure groupée',
      expOptMerge: 'Fusion',
      expMergeTitle: 'Si présent, prend en charge les cellules avec structure fusionnée',
      expOptAllExpand: "Développer l'arbre",
      expAllExpandTitle: 'Si présent, prend en charge le développement complet des données hiérarchiques',
      expOptTreeAllExpand: "Développer l'arbre",
      expTreeAllExpandTitle: "Si présent, développe automatiquement tous les niveaux de l'arbre",
      expOptRowGroupAllExpand: 'Développer les groupes',
      expRowGroupAllExpandTitle: 'Si présent, développe automatiquement tous les niveaux de groupes',
      expOptUseStyle: 'Styles',
      expUseStyleTitle: 'Si présent, prend en charge les cellules stylisées',
      expOptOriginal: 'Données source',
      expOriginalTitle: "S'il s'agit de données source, prend en charge l'importation dans le tableau",
      expPrint: 'Imprimer',
      expConfirm: 'Exporter',
      expCancel: 'Annuler'
    },
    modal: {
      errTitle: 'Erreur',
      zoomMin: 'Réduire',
      zoomIn: 'Agrandir',
      zoomOut: 'Restaurer',
      close: 'Fermer',
      miniMaxSize: 'Le nombre de fenêtres réduites ne peut pas dépasser {0}',
      footPropErr: 'show-footer sert uniquement à activer le pied de page, doit être utilisé avec show-confirm-button | show-cancel-button | slots'
    },
    drawer: {
      close: 'Fermer'
    },
    form: {
      folding: 'Réduire',
      unfolding: 'Développer'
    },
    toolbar: {
      import: 'Importer',
      export: 'Exporter',
      print: 'Imprimer',
      refresh: 'Actualiser',
      zoomIn: 'Plein écran',
      zoomOut: 'Restaurer',
      custom: 'Paramètres personnalisés',
      customAll: 'Tout',
      customConfirm: 'Confirmer',
      customRestore: 'Réinitialiser',
      fixedLeft: 'Figer à gauche',
      fixedRight: 'Figer à droite',
      cancelFixed: 'Annuler le figeage des colonnes'
    },
    iconPicker: {
      search: 'Rechercher',
      emptyText: 'Aucune donnée'
    },
    datePicker: {
      yearTitle: '{0}'
    },
    dateRangePicker: {
      pleaseRange: 'Veuillez sélectionner la date de début et la date de fin'
    },
    input: {
      date: {
        m1: 'janv.',
        m2: 'févr.',
        m3: 'mars',
        m4: 'avr.',
        m5: 'mai',
        m6: 'juin',
        m7: 'juil.',
        m8: 'août',
        m9: 'sept.',
        m10: 'oct.',
        m11: 'nov.',
        m12: 'déc.',
        quarterLabel: 'Année {0}',
        monthLabel: 'Année {0}',
        dayLabel: 'Année {0} {1}',
        labelFormat: {
          date: 'yyyy-MM-dd',
          time: 'HH:mm:ss',
          datetime: 'yyyy-MM-dd HH:mm:ss',
          week: 'Semaine WW de yyyy',
          month: 'yyyy-MM',
          quarter: 'Tq yyyy',
          year: 'yyyy'
        },
        weeks: {
          w: '',
          w0: 'Dimanche',
          w1: 'Lundi',
          w2: 'Mardi',
          w3: 'Mercredi',
          w4: 'Jeudi',
          w5: 'Vendredi',
          w6: 'Samedi'
        },
        months: {
          m0: 'Janvier',
          m1: 'Février',
          m2: 'Mars',
          m3: 'Avril',
          m4: 'Mai',
          m5: 'Juin',
          m6: 'Juillet',
          m7: 'Août',
          m8: 'Septembre',
          m9: 'Octobre',
          m10: 'Novembre',
          m11: 'Décembre'
        },
        quarters: {
          q1: 'Premier trimestre',
          q2: 'Deuxième trimestre',
          q3: 'Troisième trimestre',
          q4: 'Quatrième trimestre'
        }
      }
    },
    calendar: {
      yearLabel: '{0}',
      monthLabel: '{0}'
    },
    cascader: {
      clearChecked: 'Effacer',
      allChecked: 'Tout sélectionner',
      total: '{0} élément(s) sélectionné(s)',
      close: 'Fermer',
      search: 'Rechercher'
    },
    numberInput: {
      currencySymbol: '€'
    },
    imagePreview: {
      popupTitle: 'Aperçu',
      operBtn: {
        zoomOut: 'Réduire',
        zoomIn: 'Agrandir',
        pctFull: 'Ajuster à la page',
        pct11: "Afficher la taille d'origine",
        rotateLeft: 'Pivoter à gauche',
        rotateRight: 'Pivoter à droite',
        print: "Cliquez pour imprimer l'image",
        download: "Cliquez pour télécharger l'image"
      }
    },
    upload: {
      fileBtnText: 'Cliquez ou glissez pour téléverser',
      imgBtnText: 'Cliquez ou glissez pour téléverser',
      dragPlaceholder: 'Glissez les fichiers dans cette zone pour les téléverser',
      imgSizeHint: 'Une image {0}',
      imgCountHint: 'Maximum {0} images',
      fileTypeHint: 'Prend en charge les types de fichiers {0}',
      fileSizeHint: "La taille d'un fichier ne doit pas dépasser {0}",
      fileCountHint: 'Maximum {0} fichiers téléversables',
      uploadTypeErr: 'Type de fichier incompatible !',
      overCountErr: 'Vous pouvez sélectionner au maximum {0} fichiers !',
      overCountExtraErr: 'Le nombre maximal de {0} a été dépassé, les {1} fichiers excédentaires seront ignorés !',
      overSizeErr: 'La taille du fichier ne peut pas dépasser {0} !',
      manualUpload: 'Cliquez pour téléverser',
      reUpload: 'Retéléverser',
      uploadProgress: 'Téléversement {0}%',
      uploadErr: 'Échec du téléversement',
      uploadSuccess: 'Téléversement réussi',
      moreBtnText: 'Plus ({0})',
      moreImgBtnText: 'Images ({0})',
      moreFileBtnText: 'Fichiers ({0})',
      viewItemTitle: 'Cliquez pour voir',
      morePopup: {
        readTitle: 'Voir la liste',
        imageTitle: 'Téléverser des images',
        fileTitle: 'Téléverser des fichiers'
      }
    },
    empty: {
      defText: 'Aucune donnée'
    },
    colorPicker: {
      clear: 'Effacer',
      confirm: 'Confirmer',
      copySuccess: 'Copié dans le presse-papiers : {0}',
      hex: 'Hexadécimal'
    },
    formDesign: {
      formName: 'Nom du formulaire',
      defFormTitle: 'Formulaire sans titre',
      widgetPropTab: 'Propriétés du contrôle',
      widgetFormTab: 'Propriétés du formulaire',
      error: {
        wdFormUni: 'Un seul contrôle de ce type peut être ajouté au formulaire',
        wdSubUni: 'Un seul contrôle de ce type peut être ajouté au sous-tableau'
      },
      styleSetting: {
        btn: 'Paramètres de style',
        title: 'Paramètres de style du formulaire',
        layoutTitle: 'Disposition des contrôles',
        verticalLayout: 'Disposition verticale',
        horizontalLayout: 'Disposition horizontale',
        styleTitle: 'Style du titre',
        boldTitle: 'Titre en gras',
        fontBold: 'Gras',
        fontNormal: 'Normal',
        colonTitle: 'Afficher les deux-points',
        colonVisible: 'Afficher',
        colonHidden: 'Masquer',
        alignTitle: 'Alignement',
        widthTitle: 'Largeur du titre',
        alignLeft: 'Gauche',
        alignRight: 'Droite',
        unitPx: 'pixels',
        unitPct: 'pourcentage'
      },
      widget: {
        group: {
          base: 'Contrôles de base',
          layout: 'Contrôles de mise en page',
          system: 'Contrôles système',
          module: 'Contrôles de module',
          chart: 'Contrôles de graphique',
          advanced: 'Contrôles avancés'
        },
        copyTitle: 'Copie_{0}',
        component: {
          input: 'Champ de saisie',
          textarea: 'Zone de texte',
          select: 'Liste déroulante',
          row: 'Ligne à plusieurs colonnes',
          title: 'Titre',
          text: 'Texte',
          subtable: 'Sous-tableau',
          VxeSwitch: 'Oui/Non',
          VxeInput: 'Champ de saisie',
          VxeNumberInput: 'Nombre',
          VxeDatePicker: 'Date',
          VxeTextarea: 'Zone de texte',
          VxeSelect: 'Liste déroulante',
          VxeTreeSelect: 'Sélection arborescente',
          VxeRadioGroup: 'Boutons radio',
          VxeCheckboxGroup: 'Cases à cocher',
          VxeUploadFile: 'Fichier',
          VxeUploadImage: 'Image',
          VxeRate: 'Évaluation',
          VxeSlider: 'Curseur'
        },
        row: {
          placeholder: 'Position du contrôle'
        }
      },
      widgetProp: {
        name: 'Nom du contrôle',
        placeholder: "Texte d'aide",
        required: 'Validation obligatoire',
        multiple: 'Autoriser la sélection multiple',
        displaySetting: {
          name: "Paramètres d'affichage",
          pc: 'Ordinateur',
          mobile: 'Mobile',
          visible: 'Afficher',
          hidden: 'Masquer'
        },
        dataSource: {
          name: 'Source de données',
          defValue: 'Option {0}',
          addOption: 'Ajouter une option',
          batchEditOption: 'Édition par lots',
          batchEditTip: 'Chaque ligne correspond à une option ; la copie et le collage directs depuis des tableaux, Excel et WPS sont pris en charge.',
          batchEditSubTip: "Chaque ligne correspond à une option ; s'il s'agit d'un groupe, les sous-éléments peuvent commencer par un espace ou une tabulation ; la copie et le collage directs depuis des tableaux, Excel et WPS sont pris en charge.",
          buildOption: 'Générer les options'
        },
        rowProp: {
          colSize: 'Nombre de colonnes',
          col2: 'Deux colonnes',
          col3: 'Trois colonnes',
          col4: 'Quatre colonnes',
          col6: 'Six colonnes',
          layout: 'Disposition'
        },
        textProp: {
          name: 'Contenu',
          alignTitle: 'Alignement',
          alignLeft: 'Gauche',
          alignCenter: 'Centre',
          alignRight: 'Droite',
          colorTitle: 'Couleur de police',
          sizeTitle: 'Taille de police',
          boldTitle: 'Police en gras',
          fontNormal: 'Normal',
          fontBold: 'Gras'
        },
        subtableProp: {
          seqTitle: 'N°',
          showSeq: 'Afficher le numéro',
          showCheckbox: 'Autoriser la sélection multiple',
          errSubDrag: 'Le sous-tableau ne prend pas en charge ce contrôle, veuillez utiliser un autre contrôle',
          colPlace: 'Glissez un contrôle ici'
        },
        uploadProp: {
          limitFileCount: 'Limite du nombre de fichiers',
          limitFileSize: 'Limite de taille de fichier',
          multiFile: 'Autoriser le téléversement de plusieurs fichiers',
          limitImgCount: "Limite du nombre d'images",
          limitImgSize: "Limite de taille d'image",
          multiImg: 'Autoriser le téléversement de plusieurs images'
        },
        rules: {
          required: 'Champ obligatoire'
        }
      }
    },
    listDesign: {
      fieldSettingTab: 'Paramètres des champs',
      listSettingTab: 'Paramètres des paramètres',
      searchTitle: 'Conditions de recherche',
      listTitle: 'Champs de liste',
      searchField: 'Champ de recherche',
      listField: 'Champ de liste',
      activeBtn: {
        ActionButtonUpdate: 'Modifier',
        ActionButtonDelete: 'Supprimer'
      },
      search: {
        addBtn: 'Modifier',
        emptyText: 'Aucune condition de recherche configurée',
        editPopupTitle: 'Modifier le champ de recherche'
      },
      searchPopup: {
        colTitle: 'Titre',
        saveBtn: 'Enregistrer'
      }
    },
    text: {
      copySuccess: 'Copié dans le presse-papiers',
      copyError: "L'environnement actuel ne prend pas en charge cette opération"
    },
    countdown: {
      formats: {
        yyyy: 'an',
        MM: 'mois',
        dd: 'jour',
        HH: 'heure',
        mm: 'minute',
        ss: 'seconde'
      }
    },
    contextMenu: {
      loadingText: 'Chargement...'
    },
    switch: {
      onText: 'Activé',
      offText: 'Désactivé'
    },
    gantt: {
      tFullFormat: {
        year: '{yyyy}',
        quarter: 'T{q} {yyyy}',
        month: '{MM}/{yyyy}',
        week: 'Semaine {W}, {yyyy}',
        day: '{eLabel} {dd}/{MM}/{yyyy}',
        date: '{dd}/{MM}/{yyyy}',
        hour: '{dd}/{MM}/{yyyy} {HH}:00',
        minute: '{dd}/{MM}/{yyyy} {HH}:{mm}',
        second: '{dd}/{MM}/{yyyy} {HH}:{mm}:{ss}'
      },
      tSimpleFormat: {
        year: '{yyyy}',
        quarter: 'T{q}',
        month: '{M}',
        week: 'S{W}',
        day: '{eLabel}',
        date: '{d}',
        hour: '{HH}',
        minute: '{mm}',
        second: '{ss}'
      },
      stepFormat: {
        year: '{start.yyyy}~{end.yyyy}',
        quarter: 'T{start.q}~T{end.q}',
        month: '{start.M}~{end.M}',
        week: 'S{start.W}~S{end.W}',
        day: '{eStartLabel}~{eEndLabel}',
        date: '{start.d}~{end.d}',
        hour: '{start.HH}~{end.HH}',
        minute: '{start.mm}~{end.mm}',
        second: '{start.ss}~{end.ss}'
      },
      dayss: {
        w0: 'Dim',
        w1: 'Lun',
        w2: 'Mar',
        w3: 'Mer',
        w4: 'Jeu',
        w5: 'Ven',
        w6: 'Sam'
      },
      days: {
        w0: 'Dimanche',
        w1: 'Lundi',
        w2: 'Mardi',
        w3: 'Mercredi',
        w4: 'Jeudi',
        w5: 'Vendredi',
        w6: 'Samedi'
      }
    },
    plugins: {
      extendCellArea: {
        area: {
          mergeErr: 'Cette opération ne peut pas être effectuée sur des cellules fusionnées',
          multiErr: 'Cette opération ne peut pas être effectuée sur plusieurs zones sélectionnées',
          selectErr: "Impossible d'opérer sur les cellules de la zone spécifiée",
          extendErr: 'Pour effectuer cette opération, toutes les cellules fusionnées doivent être de même taille',
          pasteMultiErr: 'Impossible de coller, la zone copiée et la zone de collage doivent être de même taille pour effectuer cette opération',
          cpInvalidErr: 'Cette opération ne peut pas être effectuée, la zone sélectionnée contient des colonnes interdites ({0})'
        },
        fnr: {
          title: 'Rechercher et remplacer',
          titleFd: 'Rechercher',
          titleRe: 'Remplacer',
          findLabel: 'Rechercher',
          replaceLabel: 'Remplacer',
          findTitle: 'Rechercher :',
          replaceTitle: 'Remplacer par :',
          tabs: {
            find: 'Rechercher',
            replace: 'Remplacer'
          },
          filter: {
            re: 'Expression régulière',
            whole: 'Mot entier',
            sensitive: 'Sensible à la casse'
          },
          btns: {
            findNext: 'Suivant',
            findAll: 'Tout rechercher',
            replace: 'Remplacer',
            replaceAll: 'Tout remplacer',
            cancel: 'Annuler'
          },
          header: {
            seq: '#',
            cell: 'Cellule',
            value: 'Valeur'
          },
          body: {
            row: 'Ligne : {0}',
            col: 'Colonne : {0}'
          },
          empty: '(vide)',
          reError: 'Expression régulière non valide',
          recordCount: '{0} cellules trouvées',
          notCell: 'Aucune cellule correspondante trouvée',
          replaceSuccess: '{0} cellules remplacées avec succès'
        }
      },
      extendPivotTable: {
        aggregation: {
          grouping: 'Regroupement',
          values: 'Valeurs',
          groupPlaceholder: 'Glissez ici pour regrouper',
          valuesPlaceholder: 'Glissez ici pour agréger',
          dragExistCol: 'Cette colonne existe déjà',
          sortHelpTip: "Cliquez sur l'icône pour commencer le glisser-déposer"
        },
        aggFuncs: {
          sum: 'Somme',
          count: 'Nombre',
          avg: 'Moyenne',
          min: 'Minimum',
          max: 'Maximum',
          first: 'Première valeur',
          last: 'Dernière valeur'
        }
      },
      filterComplexInput: {
        menus: {
          fixedColumn: 'Colonne figée',
          fixedGroup: 'Groupe figé',
          cancelFixed: 'Annuler le figeage',
          fixedLeft: 'Figer à gauche',
          fixedRight: 'Figer à droite'
        },
        cases: {
          equal: 'Égal à',
          gt: 'Supérieur à',
          lt: 'Inférieur à',
          begin: 'Commence par',
          endin: 'Se termine par',
          include: 'Contient',
          isSensitive: 'Sensible à la casse'
        }
      },
      filterCombination: {
        menus: {
          sort: 'Trier',
          clearSort: 'Effacer le tri',
          sortAsc: 'Croissant',
          sortDesc: 'Décroissant',
          fixedColumn: 'Colonne figée',
          fixedGroup: 'Groupe figé',
          cancelFixed: 'Annuler le figeage',
          fixedLeft: 'Figer à gauche',
          fixedRight: 'Figer à droite',
          clearFilter: 'Effacer le filtre',
          textOption: 'Filtre de texte',
          numberOption: 'Filtre numérique',
          dateOption: 'Filtre de date'
        },
        popup: {
          title: 'Méthode de filtre personnalisée',
          currColumnTitle: 'Afficher les lignes :',
          and: 'Et',
          or: 'Ou',
          describeHtml: 'Utilisez ? pour un caractère unique<br/>Utilisez * pour un nombre quelconque de caractères'
        },
        cases: {
          equal: 'Égal à',
          unequal: 'Différent de',
          gt: 'Supérieur à',
          ge: 'Supérieur ou égal à',
          lt: 'Inférieur à',
          le: 'Inférieur ou égal à',
          begin: 'Commence par',
          notbegin: 'Ne commence pas par',
          endin: 'Se termine par',
          notendin: 'Ne se termine pas par',
          include: 'Contient',
          exclude: 'Ne contient pas',
          between: 'Entre',
          isAfter: 'Est après',
          eqAfter: 'Est à ou après',
          isBefore: 'Est avant',
          eqBefore: 'Est à ou avant',
          top10: 'Top 10',
          aboveAverage: 'Au-dessus de la moyenne',
          belowAverage: 'En dessous de la moyenne',
          before: 'Avant',
          after: 'Après',
          tomorrow: 'Demain',
          today: "Aujourd'hui",
          yesterday: 'Hier',
          nextWeek: 'Semaine prochaine',
          thisWeek: 'Cette semaine',
          lastWeek: 'Semaine dernière',
          nextMonth: 'Mois prochain',
          thisMonth: 'Ce mois-ci',
          lastMonth: 'Mois dernier',
          nextYear: 'Année prochaine',
          thisYear: 'Cette année',
          lastYear: 'Année dernière',
          yearToDate: 'Année à ce jour',
          custom: 'Filtre personnalisé',
          insensitive: 'Insensible à la casse',
          isSensitive: 'Sensible à la casse'
        },
        empty: '(vide)',
        notData: 'Aucune correspondance'
      }
    },
    pro: {
      area: {
        mergeErr: 'Cette opération ne peut pas être effectuée sur des cellules fusionnées',
        multiErr: 'Cette opération ne peut pas être effectuée sur plusieurs zones sélectionnées',
        extendErr: 'Pour effectuer cette opération, toutes les cellules fusionnées doivent être de même taille',
        pasteMultiErr: 'Impossible de coller, la zone copiée et la zone de collage doivent être de même taille pour effectuer cette opération'
      },
      fnr: {
        title: 'Rechercher et remplacer',
        titleFd: 'Rechercher',
        titleRe: 'Remplacer',
        findLabel: 'Rechercher',
        replaceLabel: 'Remplacer',
        findTitle: 'Rechercher :',
        replaceTitle: 'Remplacer par :',
        tabs: {
          find: 'Rechercher',
          replace: 'Remplacer'
        },
        filter: {
          re: 'Expression régulière',
          whole: 'Mot entier',
          sensitive: 'Sensible à la casse'
        },
        btns: {
          findNext: 'Suivant',
          findAll: 'Tout rechercher',
          replace: 'Remplacer',
          replaceAll: 'Tout remplacer',
          cancel: 'Annuler'
        },
        header: {
          seq: '#',
          cell: 'Cellule',
          value: 'Valeur'
        },
        empty: '(vide)',
        reError: 'Expression régulière non valide',
        recordCount: '{0} cellules trouvées',
        notCell: 'Aucune cellule correspondante trouvée',
        replaceSuccess: '{0} cellules remplacées avec succès'
      }
    },
    renderer: {
      search: 'Rechercher',
      cases: {
        equal: 'Égal à',
        unequal: 'Différent de',
        gt: 'Supérieur à',
        ge: 'Supérieur ou égal à',
        lt: 'Inférieur à',
        le: 'Inférieur ou égal à',
        begin: 'Commence par',
        notbegin: 'Ne commence pas par',
        endin: 'Se termine par',
        notendin: 'Ne se termine pas par',
        include: 'Contient',
        exclude: 'Ne contient pas',
        between: 'Entre',
        top10: 'Top 10',
        aboveAverage: 'Au-dessus de la moyenne',
        belowAverage: 'En dessous de la moyenne',
        custom: 'Filtre personnalisé',
        insensitive: 'Insensible à la casse',
        isSensitive: 'Sensible à la casse'
      },
      combination: {
        menus: {
          sort: 'Trier',
          clearSort: 'Effacer le tri',
          sortAsc: 'Croissant',
          sortDesc: 'Décroissant',
          fixedColumn: 'Colonne figée',
          fixedGroup: 'Groupe figé',
          cancelFixed: 'Annuler le figeage',
          fixedLeft: 'Figer à gauche',
          fixedRight: 'Figer à droite',
          clearFilter: 'Effacer le filtre',
          textOption: 'Filtre de texte',
          numberOption: 'Filtre numérique',
          dateOption: 'Filtre de date'
        },
        popup: {
          title: 'Méthode de filtre personnalisée',
          currColumnTitle: 'Afficher les lignes :',
          and: 'Et',
          or: 'Ou',
          describeHtml: 'Utilisez ? pour un caractère unique<br/>Utilisez * pour un nombre quelconque de caractères'
        },
        empty: '(vide)',
        notData: 'Aucune correspondance'
      }
    }
  }
}
