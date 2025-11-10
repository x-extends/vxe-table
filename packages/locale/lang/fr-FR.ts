export default {
  vxe: {
    base: {
      pleaseInput: 'Veuillez entrer',
      pleaseSelect: 'Veuillez sélectionner',
      comma: '，',
      fullStop: '。'
    },
    loading: {
      text: 'chargement...'
    },
    error: {
      downErr: 'Échec du téléchargement',
      errLargeData: 'Lorsque la quantité de données liées est trop grande, veuillez utiliser {0}, sinon cela peut entraîner un décalage',
      groupFixed: 'Si vous utilisez des en-têtes groupés, la colonne congelée doit être définie par groupe',
      groupMouseRange: "L'en-tête de regroupement ne peut pas être utilisé en même temps que \"{0}\" et cela peut entraîner une erreur",
      groupTag: 'Le regroupement des en-têtes de colonne doit utiliser "{0}" au lieu de "{1}", ce qui peut entraîner des erreurs',
      scrollErrProp: "Ce paramètre \"{0}\" n'est pas pris en charge après l'activation du défilement virtuel",
      errConflicts: 'Paramètre "{0}" entre en conflit avec "{1}"',
      modelConflicts: '绑定的字段值 "{0}" 与 "{1}" 存在冲突，将会出现错误',
      reqSupportProp: '当使用 "{0}" 时，应该设置 "{1}"，否则可能会出现错误',
      notSupportProp: "\"{1}\" n'est pas pris en charge lorsque le paramètre \"{0}\" est activé, il devrait être \"{2}\", sinon une erreur se produira",
      notConflictProp: 'Lorsque vous utilisez "{0}", "{1}" doit être défini, sinon il peut y avoir des conflits fonctionnels',
      unableInsert: "Ne peut pas être inséré dans l'emplacement spécifié, veuillez vérifier si les paramètres sont corrects",
      useErr: "Une erreur s'est produite lors de l'installation du module \"{0}\". L'ordonnance peut être incorrecte. Le module dépendant doit être installé avant le tableau",
      barUnableLink: "La barre d'outils ne peut pas associer des tables",
      expandContent: "La fente de la ligne élargie doit être \"Contenu\", veuillez vérifier s'il est correct",
      reqComp: "Le composant \"{0}\" est manquant, veuillez vérifier s'il est installé correctement. https://vxeui.com/#/start/useglobal",
      reqModule: 'Module "{0}" manquant',
      reqProp: 'Le paramètre "{0}" nécessaire est manquant, ce qui peut provoquer une erreur',
      emptyProp: "Le paramètre \"{0}\" n'est pas autorisé à être vide",
      errProp: 'Paramètre non pris en charge "{0}", peut-être "{1}"',
      colRepet: 'colonne. {0} = "{1}" est répétée, ce qui peut rendre certaines fonctions inutilisables',
      notFunc: "Méthode \"{0}\" n'existe pas",
      errFunc: "Le paramètre \"{0}\" n'est pas une méthode",
      notValidators: "Vérification globale \"{0}\" n'existe pas",
      notFormats: "Formatage global \"{0}\" n'existe pas",
      notCommands: "La directive globale \"{0}\" n'existe pas",
      notSlot: "Slot \"{0}\" n'existe pas",
      noTree: "\"{0}\" n'est pas pris en charge dans la structure de l'arbre",
      noGroup: '数据分组后不支持 "{0}"',
      notProp: 'Paramètre non pris en charge "{0}"',
      checkProp: 'Lorsque le volume de données est trop grand, la case peut être bégayée. Il est recommandé de définir le paramètre "{0}" pour améliorer la vitesse de rendu',
      coverProp: 'Le paramètre "{1}" de "{0}" est défini à plusieurs reprises, ce qui peut provoquer une erreur',
      uniField: 'Le nom de champ "{0}" est défini à plusieurs reprises, ce qui peut provoquer une erreur',
      repeatKey: 'Répétez la clé primaire {0} = "{1}", qui peut provoquer une erreur',
      repeatProp: '参数重复 {0}="{1}"，这可能会出现错误',
      delFunc: 'Méthode "{0}" est obsolète, veuillez utiliser "{1}"',
      delProp: 'Le paramètre "{0}" est obsolète, veuillez utiliser "{1}"',
      delEvent: "L'événement \"{0}\" est obsolète, veuillez utiliser \"{1}\"",
      removeProp: "Le paramètre \"{0}\" est obsolète et n'est pas recommandé, ce qui peut entraîner une erreur",
      errFormat: "Le contenu formaté global doit être défini à l'aide de \"vxetable.formats\" et la méthode de montage \"formatter = {0}\" n'est plus recommandée.",
      notType: 'Type de fichier non pris en charge "{0}"',
      notExp: "Ce navigateur ne prend pas en charge la fonction d'importation / d'exportation",
      impFields: "L'importation a échoué. Veuillez vérifier si le nom de champ et le format de données sont corrects.",
      treeNotImp: "Les tables d'arbres ne prennent pas en charge l'importation",
      treeCrossDrag: 'Faites seulement glisser le premier niveau',
      treeDragChild: 'Les parents ne peuvent pas traîner à leurs propres enfants',
      reqPlugin: "\"{1}\" n'est pas installé sur https://vxeui.com/other {0,/#/{1 }/install",
      errMaxRow: 'Dépassant les lignes maximales du volume de données prises en charge {0}, cela peut entraîner une erreur',
      useNew: '不建议使用 {0}，请使用 {1}',
      errorVersion: '版本不匹配，当前版本 {0}，最低支持版本为 {1}'
    },
    table: {
      emptyText: 'Pas encore de données',
      allTitle: 'Sélectionnez tout / Annuler',
      seqTitle: 'Numéro de série',
      actionTitle: 'fonctionner',
      confirmFilter: 'filtre',
      resetFilter: 'Réinitialiser',
      allFilter: 'tous',
      sortAsc: 'Ordre ascendant: le plus bas au plus élevé',
      sortDesc: 'Ordre descendant: le plus élevé à la plus basse',
      filter: 'Activer le filtrage des colonnes sélectionnées',
      impSuccess: 'Enregistrements {0} importés avec succès',
      expLoading: 'Exportation',
      expSuccess: 'Exporter avec succès',
      expError: "Échec de l'exportation",
      expFilename: 'Export_ {0}',
      expOriginFilename: 'Export_source_ {0}',
      customTitle: 'Paramètres de colonne',
      customAll: 'tous',
      customConfirm: 'confirmer',
      customClose: 'fermeture',
      customCancel: 'Annuler',
      customRestore: 'Restaurer par défaut',
      maxFixedCol: 'Le nombre maximum de colonnes gelées ne peut pas dépasser {0}',
      maxGroupCol: '最大分组字段的数量不能超过 {0} 个',
      dragTip: 'Déplacer: {0}',
      resizeColTip: 'Largeur: {0} pixels',
      resizeRowTip: 'Hauteur: {0} pixels',
      rowGroupContentTotal: '{0} ({1})',
      menuLoading: '加载中...'
    },
    grid: {
      selectOneRecord: 'Veuillez sélectionner au moins un enregistrement!',
      deleteSelectRecord: "Êtes-vous sûr de vouloir supprimer l'enregistrement sélectionné?",
      removeSelectRecord: "Êtes-vous sûr de vouloir supprimer l'enregistrement sélectionné?",
      dataUnchanged: 'Données non modifiées!',
      delSuccess: 'Le record sélectionné a été supprimé avec succès!',
      saveSuccess: 'Économisez avec succès!',
      operError: "Une erreur s'est produite et l'opération a échoué!"
    },
    select: {
      clear: '清除',
      allChecked: '全选',
      total: '{0} / {1}',
      search: 'recherche',
      loadingText: 'chargement',
      emptyText: 'Pas encore de données',
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
      goto: 'Aller',
      gotoTitle: 'Nombre de pages',
      pagesize: '{0} Éléments / page',
      total: 'Enregistrements totaux {0}',
      pageClassifier: 'Page',
      homePage: 'première page',
      homePageTitle: 'première page',
      prevPage: 'Page précédente',
      prevPageTitle: 'Page précédente',
      nextPage: 'Page suivante',
      nextPageTitle: 'Page suivante',
      prevJump: 'Page de saut',
      prevJumpTitle: 'Page de saut',
      nextJump: 'Sauter la page',
      nextJumpTitle: 'Sauter la page',
      endPage: 'Dernière page',
      endPageTitle: 'Dernière page'
    },
    alert: {
      title: 'Invites du système'
    },
    button: {
      confirm: 'confirmer',
      cancel: 'Annuler',
      clear: 'Clair'
    },
    filter: {
      search: 'recherche'
    },
    custom: {
      cstmTitle: 'Paramètres de colonne',
      cstmRestore: 'Restaurer par défaut',
      cstmCancel: 'Annuler',
      cstmConfirm: 'Bien sûr',
      cstmConfirmRestore: "Veuillez confirmer s'il est restauré à la configuration de la colonne par défaut?",
      cstmDragTarget: 'Déplacer: {0}',
      setting: {
        colSort: 'Trier',
        sortHelpTip: '点击并拖动图标可以调整顺序',
        colTitle: 'Titre de la colonne',
        colResizable: 'Largeur de colonne (pixels)',
        colVisible: "S'il faut afficher",
        colFixed: 'Colonne de gel',
        colFixedMax: "Colonnes de gel (jusqu'à {0} colonnes)",
        fixedLeft: 'Côté gauche',
        fixedUnset: 'Pas réglé',
        fixedRight: 'Côté droit'
      }
    },
    import: {
      modes: {
        covering: "Méthode d'écrasement (écraser directement les données de la table)",
        insert: 'Ajoutez en bas (ajoutez les nouvelles données en bas du tableau)',
        insertTop: 'Ajoutez en haut (ajoutez les nouvelles données en haut du tableau)',
        insertBottom: 'Ajoutez en bas (ajoutez les nouvelles données en bas du tableau)'
      },
      impTitle: 'Importer des données',
      impFile: 'nom de fichier',
      impSelect: 'Sélectionner le fichier',
      impType: 'Type de fichier',
      impOpts: 'Paramètres',
      impMode: "Mode d'importation",
      impConfirm: 'Importer',
      impCancel: 'Annuler'
    },
    export: {
      types: {
        csv: 'CSV (virgule séparée) (*. CSV)',
        html: 'Page Web (* .html)',
        xml: 'Données XML (* .xml)',
        txt: 'Fichier texte (onglet séparé) (*. Txt)',
        xls: 'Excel 97-2003 Clain de travail (* .xls)',
        xlsx: 'Excel Workbook (* .xlsx)',
        pdf: 'Pdf (* .pdf)'
      },
      modes: {
        empty: 'Données vides',
        current: 'Données actuelles (données sur la page actuelle)',
        selected: 'Données sélectionnées (données sélectionnées sur la page actuelle)',
        all: 'Données complètes (y compris toutes les données paginées)'
      },
      printTitle: 'Imprimer des données',
      expTitle: "Données d'exportation",
      expName: 'nom de fichier',
      expNamePlaceholder: 'Veuillez saisir un nom de fichier',
      expSheetName: 'titre',
      expSheetNamePlaceholder: 'Veuillez saisir un titre',
      expType: 'Type de sauvegarde',
      expMode: 'Sélectionner des données',
      expCurrentColumn: 'Tous les champs',
      expColumn: 'Sélectionner le champ',
      expOpts: 'Paramètres',
      expOptHeader: 'Tête',
      expHeaderTitle: "L'en-tête de table est-il requis",
      expOptFooter: 'Fin de table',
      expFooterTitle: 'La fin du tableau est-elle requise?',
      expOptColgroup: 'En-tête de regroupement',
      expOptTitle: 'Titre de la colonne',
      expTitleTitle: "Qu'il s'agisse du titre de la colonne, sinon il sera affiché comme nom de champ de la colonne",
      expColgroupTitle: "S'il est présent, un en-tête avec une structure de regroupement est pris en charge",
      expOptMerge: 'fusionner',
      expMergeTitle: 'Si présents, les cellules avec des structures fusionnées sont soutenues',
      expOptAllExpand: "Développer l'arbre",
      expAllExpandTitle: "S'il existe, il est supporté pour étendre toutes les données avec des structures hiérarchiques",
      expOptUseStyle: 'style',
      expUseStyleTitle: 'Si présents, les cellules avec style sont prises en charge',
      expOptOriginal: 'Données de source',
      expOriginalTitle: "S'il s'agit de données source, l'importation dans les tables est prise en charge",
      expPrint: 'Imprimer',
      expConfirm: 'Exporter',
      expCancel: 'Annuler'
    },
    modal: {
      errTitle: "Message d'erreur",
      zoomMin: 'Minimiser',
      zoomIn: 'maximiser',
      zoomOut: 'réduction',
      close: 'fermeture',
      miniMaxSize: 'Le nombre de fenêtres minimisées ne peut pas dépasser {0}',
      footPropErr: "Le show-foooter n'est utilisé que pour activer la queue de table et doit être utilisé avec le show-confirfirt-button | Button-canal du spectacle | machines à sous"
    },
    drawer: {
      close: 'fermeture'
    },
    form: {
      folding: 'Fermer',
      unfolding: 'Développer'
    },
    toolbar: {
      import: 'Importer',
      export: 'Exporter',
      print: 'Imprimer',
      refresh: 'rafraîchir',
      zoomIn: 'plein écran',
      zoomOut: 'réduction',
      custom: 'Paramètres de colonne',
      customAll: 'tous',
      customConfirm: 'confirmer',
      customRestore: 'Réinitialiser',
      fixedLeft: 'Geller à gauche',
      fixedRight: 'Geler à droite',
      cancelFixed: 'Dégeler'
    },
    datePicker: {
      yearTitle: '{0} ans'
    },
    dateRangePicker: {
      pleaseRange: '请选择开始日期与结束日期'
    },
    input: {
      date: {
        m1: 'Janvier',
        m2: 'Février',
        m3: 'Mars',
        m4: 'Avril',
        m5: 'Peut',
        m6: 'Juin',
        m7: 'Juillet',
        m8: 'Août',
        m9: 'Septembre',
        m10: 'Octobre',
        m11: 'Novembre',
        m12: 'Décembre',
        quarterLabel: '{0} years',
        monthLabel: '{0} years',
        dayLabel: '{0} year {1}',
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
          w0: 'Soleil',
          w1: 'Lun',
          w2: 'Mar',
          w3: 'Épouser',
          w4: 'Jeu',
          w5: 'Ven',
          w6: 'Assis'
        },
        months: {
          m0: 'Janvier',
          m1: 'Février',
          m2: 'Mars',
          m3: 'Avril',
          m4: 'Peut',
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
    numberInput: {
      currencySymbol: '$'
    },
    imagePreview: {
      popupTitle: 'Prévisualisation',
      operBtn: {
        zoomOut: 'Rétrécir',
        zoomIn: 'agrandir',
        pctFull: "Mise à l'échelle également",
        pct11: "Afficher la taille d'origine",
        rotateLeft: 'Tourner à gauche',
        rotateRight: 'Tourner vers la droite',
        print: "Cliquez pour imprimer l'image",
        download: "Cliquez pour télécharger l'image"
      }
    },
    upload: {
      fileBtnText: 'Cliquez ou faites glisser pour télécharger',
      imgBtnText: 'Cliquez ou faites glisser pour télécharger',
      dragPlaceholder: 'Veuillez faire glisser et déposer le fichier dans cette zone pour télécharger',
      imgSizeHint: 'Dépliant {0}',
      imgCountHint: 'Images maximales {0}',
      fileTypeHint: 'Prise en charge des types de fichiers {0}',
      fileSizeHint: 'Une seule taille de fichier ne dépasse pas {0}',
      fileCountHint: "Les fichiers jusqu'à {0} peuvent être téléchargés",
      uploadTypeErr: 'Déliachance du type de fichier!',
      overCountErr: 'Seuls les fichiers {0} peuvent être sélectionnés au maximum!',
      overCountExtraErr: 'Le nombre maximum de {0} a été dépassé et les fichiers excédentaires {1} seront ignorés!',
      overSizeErr: 'La taille maximale du fichier ne peut pas dépasser {0}!',
      manualUpload: '点击上传',
      reUpload: 'Télécharger à nouveau',
      uploadProgress: 'Téléchargement {0}%',
      uploadErr: 'Le téléchargement a échoué',
      uploadSuccess: 'Télécharger avec succès',
      moreBtnText: 'Plus ({0})',
      viewItemTitle: 'Cliquez pour voir',
      morePopup: {
        readTitle: 'Affichage de la liste',
        imageTitle: 'Télécharger des photos',
        fileTitle: 'Télécharger le fichier'
      }
    },
    empty: {
      defText: 'Pas encore de données'
    },
    colorPicker: {
      clear: 'Clair',
      confirm: 'confirmer',
      copySuccess: 'Copie dans le presse-papiers: {0}',
      hex: 'HEX'
    },
    formDesign: {
      formName: 'Nom de formulaire',
      defFormTitle: 'Forme anonyme',
      widgetPropTab: 'Propriétés de contrôle',
      widgetFormTab: 'Former des propriétés',
      error: {
        wdFormUni: 'Ce type de contrôle est autorisé à en ajouter un dans le formulaire',
        wdSubUni: 'Ce type de contrôle est autorisé à en ajouter un dans la sous-table'
      },
      styleSetting: {
        btn: 'Paramètres de style',
        title: 'Paramètres de style de formulaire',
        layoutTitle: 'Disposition du contrôle',
        verticalLayout: 'Disposition supérieure et inférieure',
        horizontalLayout: 'Disposition horizontale',
        styleTitle: 'Style de titre',
        boldTitle: 'Titre audacieux',
        fontBold: 'Audacieux',
        fontNormal: 'conventionnel',
        colonTitle: 'Montrer le colon',
        colonVisible: 'montrer',
        colonHidden: 'cacher',
        alignTitle: 'Alignement',
        widthTitle: 'Largeur du titre',
        alignLeft: 'À gauche',
        alignRight: 'Sur la droite',
        unitPx: 'Pixels',
        unitPct: 'pourcentage'
      },
      widget: {
        group: {
          base: 'Commandes de base',
          layout: 'Contrôles de disposition',
          system: 'Commandes de système',
          module: 'Commandes de module',
          chart: 'Contrôle du graphique',
          advanced: 'Commandes avancées'
        },
        copyTitle: 'Copy_ {0}',
        component: {
          input: 'Boîte de saisie',
          textarea: 'Champ de texte',
          select: 'Retraitez vers le bas pour sélectionner',
          row: 'Une ligne et plusieurs colonnes',
          title: 'titre',
          text: 'texte',
          subtable: 'Sous-table',
          VxeSwitch: 'si',
          VxeInput: 'Boîte de saisie',
          VxeNumberInput: 'nombre',
          VxeDatePicker: 'date',
          VxeTextarea: 'Champ de texte',
          VxeSelect: 'Retraitez vers le bas pour sélectionner',
          VxeTreeSelect: 'Sélection des arbres',
          VxeRadioGroup: 'Bouton radio',
          VxeCheckboxGroup: 'Cocher',
          VxeUploadFile: 'document',
          VxeUploadImage: 'image',
          VxeRate: 'score',
          VxeSlider: 'curseur'
        }
      },
      widgetProp: {
        name: 'Nom de contrôle',
        placeholder: 'Rapide',
        required: 'Vérification requise',
        multiple: 'Plusieurs choix sont autorisés',
        displaySetting: {
          name: "Paramètres d'affichage",
          pc: 'PC',
          mobile: 'Mobile',
          visible: 'montrer',
          hidden: 'cacher'
        },
        dataSource: {
          name: 'Source de données',
          defValue: 'Option {0}',
          addOption: 'Ajouter des options',
          batchEditOption: 'Édition de lots',
          batchEditTip: 'Chaque ligne correspond à une option, qui prend en charge la copie directe et coller à partir de tables, Excel et WPS.',
          batchEditSubTip: "Chaque ligne correspond à une option. S'il s'agit d'un groupe, les éléments de l'enfant peuvent commencer par un espace ou une clé de onglet, et il prend en charge la copie directe et coller à partir de tables, Excel et WPS.",
          buildOption: 'Options de construction'
        },
        rowProp: {
          colSize: 'Nombre de colonnes',
          col2: 'Deux colonnes',
          col3: 'Trois colonnes',
          col4: 'Quatre colonnes',
          col6: 'Six colonnes',
          layout: 'mise en page'
        },
        textProp: {
          name: 'contenu',
          alignTitle: 'Alignement',
          alignLeft: 'À gauche',
          alignCenter: 'Centre',
          alignRight: 'Sur la droite',
          colorTitle: 'Couleur de police',
          sizeTitle: 'Taille de la police',
          boldTitle: 'Police audacieuse',
          fontNormal: 'conventionnel',
          fontBold: 'Audacieux'
        },
        subtableProp: {
          seqTitle: 'Numéro de série',
          showSeq: 'Afficher le numéro de série',
          showCheckbox: 'Plusieurs choix sont autorisés',
          errSubDrag: "La sous-table ne prend pas en charge ce contrôle, veuillez utiliser d'autres contrôles",
          colPlace: 'Faites glisser le contrôle'
        },
        uploadProp: {
          limitFileCount: 'Limite de quantité de fichier',
          limitFileSize: 'Limite de taille de fichier',
          multiFile: 'Autoriser plusieurs fichiers à télécharger',
          limitImgCount: "Limiter le nombre d'images",
          limitImgSize: "Limite de taille d'image",
          multiImg: 'Autoriser plusieurs images à télécharger'
        }
      }
    },
    listDesign: {
      fieldSettingTab: 'Paramètres de champ',
      listSettingTab: 'Paramètres',
      searchTitle: 'Critères de requête',
      listTitle: 'Champ de liste',
      searchField: 'Champs de requête',
      listField: 'Champ de liste',
      activeBtn: {
        ActionButtonUpdate: 'modifier',
        ActionButtonDelete: 'supprimer'
      },
      search: {
        addBtn: 'modifier',
        emptyText: 'Conditions de requête non configurées',
        editPopupTitle: 'Modifier les champs de requête'
      },
      searchPopup: {
        colTitle: 'titre',
        saveBtn: 'sauvegarder'
      }
    },
    text: {
      copySuccess: 'Copie dans le presse-papiers',
      copyError: "L'environnement actuel ne prend pas en charge cette opération"
    },
    countdown: {
      formats: {
        yyyy: 'Année',
        MM: 'lune',
        dd: 'ciel',
        HH: 'heure',
        mm: 'indiquer',
        ss: 'Deuxième'
      }
    },
    gantt: {
      tFullFormat: {
        year: '{yy}年',
        quarter: '{yy}年第{q}季度',
        month: '{yy}年{M}月',
        week: '{yy}年第{W}周',
        day: '{yy}年{M}月{d}日',
        hour: '{yy}年 {M}月{d}日{H}时',
        minute: '{yy}年{M}月{d}日{H}时{m}分'
      },
      tSimpleFormat: {
        year: '{yy}年',
        quarter: '{q}季度',
        month: '{M}月',
        week: '{W}周',
        day: '{d}',
        hour: '{H}时',
        minute: '{m}分'
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
          mergeErr: 'Cette opération ne peut pas être effectuée sur des cellules fusionnées',
          multiErr: 'Cette opération ne peut pas être effectuée sur plusieurs zones de sélection',
          selectErr: 'Impossible de fonctionner sur des cellules dans la plage spécifiée',
          extendErr: 'Si la plage étendue contient des cellules fusionnées, toutes les cellules fusionnées doivent être de la même taille',
          pasteMultiErr: 'Incapables de coller, les zones copiées et collées doivent être de la même taille pour effectuer cette opération',
          cpInvalidErr: "L'opération ne peut pas être effectuée. Il existe des colonnes interdites ({0}) dans la plage que vous avez sélectionnée."
        },
        fnr: {
          title: 'Trouver et remplacer',
          findLabel: 'Trouver',
          replaceLabel: 'remplacer',
          findTitle: 'Trouver quoi:',
          replaceTitle: 'Remplacer par:',
          tabs: {
            find: 'Trouver',
            replace: 'remplacer'
          },
          filter: {
            re: 'Expressions régulières',
            whole: 'Correspondant à mot complet',
            sensitive: 'sensible aux majuscules et minuscules'
          },
          btns: {
            findNext: 'Trouver ensuite',
            findAll: 'Trouver tout',
            replace: 'remplacer',
            replaceAll: 'Remplacer tout',
            cancel: 'Annuler'
          },
          header: {
            seq: '#',
            cell: 'Cellule',
            value: 'valeur'
          },
          body: {
            row: 'Ligne: {0}',
            col: 'Colonne: {0}'
          },
          empty: '(Valeur nul)',
          reError: 'Expression régulière non valide',
          recordCount: '{0} cellules trouvées',
          notCell: 'La cellule correspondante ne peut être trouvée',
          replaceSuccess: 'Cellules {0} remplacées avec succès'
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
          fixedColumn: 'Colonne de gel',
          fixedGroup: 'Groupe de gel',
          cancelFixed: 'Dégeler',
          fixedLeft: 'Geller à gauche',
          fixedRight: 'Geler à droite'
        },
        cases: {
          equal: 'égal',
          gt: 'Supérieur à',
          lt: 'Moins que',
          begin: 'Le début est',
          endin: 'La fin est',
          include: 'Inclure',
          isSensitive: 'sensible aux majuscules et minuscules'
        }
      },
      filterCombination: {
        menus: {
          sort: 'Trier',
          clearSort: 'Toi clair',
          sortAsc: 'Commande ascendante',
          sortDesc: 'Ordre descendant',
          fixedColumn: 'Colonne de gel',
          fixedGroup: 'Groupe de gel',
          cancelFixed: 'Dégeler',
          fixedLeft: 'Geller à gauche',
          fixedRight: 'Geler à droite',
          clearFilter: 'Filtre effacer',
          textOption: 'Filtre à texte',
          numberOption: 'Filtre numérique'
        },
        popup: {
          title: 'Méthodes de filtrage personnalisées',
          currColumnTitle: 'Colonne actuelle:',
          and: 'et',
          or: 'ou',
          describeHtml: 'Disponible? Représente un seul caractère <br/> use * représente tous les caractères multiples'
        },
        cases: {
          equal: 'égal',
          unequal: 'Pas égal à',
          gt: 'Supérieur à',
          ge: 'Supérieur ou égal à',
          lt: 'Moins que',
          le: 'Moins ou égal à',
          begin: 'Le début est',
          notbegin: "Ce n'est pas au début",
          endin: 'La fin est',
          notendin: "La fin n'est pas",
          include: 'Inclure',
          exclude: 'Pas inclus',
          between: 'Entre',
          custom: 'Filtre personnalisé',
          insensitive: 'Cas insensible au cas',
          isSensitive: 'sensible aux majuscules et minuscules'
        },
        empty: '(vide)',
        notData: 'Pas de match'
      }
    },
    pro: {
      area: {
        mergeErr: 'Cette opération ne peut pas être effectuée sur des cellules fusionnées',
        multiErr: 'Cette opération ne peut pas être effectuée sur plusieurs zones de sélection',
        extendErr: 'Si la plage étendue contient des cellules fusionnées, toutes les cellules fusionnées doivent être de la même taille',
        pasteMultiErr: 'Incapables de coller, les zones copiées et collées doivent être de la même taille pour effectuer cette opération'
      },
      fnr: {
        title: 'Trouver et remplacer',
        findLabel: 'Trouver',
        replaceLabel: 'remplacer',
        findTitle: 'Trouver du contenu:',
        replaceTitle: 'Remplacer par:',
        tabs: {
          find: 'Trouver',
          replace: 'remplacer'
        },
        filter: {
          re: 'Expressions régulières',
          whole: 'Correspondant à mot complet',
          sensitive: 'sensible aux majuscules et minuscules'
        },
        btns: {
          findNext: 'Trouver ensuite',
          findAll: 'Trouver tout',
          replace: 'remplacer',
          replaceAll: 'Remplacer tout',
          cancel: 'Annuler'
        },
        header: {
          seq: '#',
          cell: 'Cellule',
          value: 'valeur'
        },
        empty: '(Valeur nul)',
        reError: 'Expression régulière non valide',
        recordCount: '{0} cellules trouvées',
        notCell: 'Aucune cellule correspondante trouvée',
        replaceSuccess: 'Cellules {0} remplacées avec succès'
      }
    },
    renderer: {
      search: 'recherche',
      cases: {
        equal: 'égal',
        unequal: 'Pas égal à',
        gt: 'Supérieur à',
        ge: 'Supérieur ou égal à',
        lt: 'Moins que',
        le: 'Moins ou égal à',
        begin: 'Le début est',
        notbegin: "Ce n'est pas au début",
        endin: 'La fin est',
        notendin: "La fin n'est pas",
        include: 'Inclure',
        exclude: 'Pas inclus',
        between: 'Entre',
        custom: 'Filtre personnalisé',
        insensitive: 'Cas insensible au cas',
        isSensitive: 'sensible aux majuscules et minuscules'
      },
      combination: {
        menus: {
          sort: 'Trier',
          clearSort: 'Toi clair',
          sortAsc: 'Commande ascendante',
          sortDesc: 'Ordre descendant',
          fixedColumn: 'Colonne de gel',
          fixedGroup: 'Groupe de gel',
          cancelFixed: 'Dégeler',
          fixedLeft: 'Geller à gauche',
          fixedRight: 'Geler à droite',
          clearFilter: 'Filtre effacer',
          textOption: 'Filtrage de texte',
          numberOption: 'Filtrage numérique'
        },
        popup: {
          title: 'Méthodes de filtrage personnalisées',
          currColumnTitle: 'Colonne actuelle:',
          and: 'et',
          or: 'ou',
          describeHtml: 'Disponible? Représente un seul caractère <br/> use * représente tous les caractères multiples'
        },
        empty: '(vide)',
        notData: 'Pas de match'
      }
    }
  }
}
