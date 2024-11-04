export default {
  vxe: {
    base: {
      pleaseInput: 'Please input',
      pleaseSelect: 'Select',
      comma: ',',
      fullStop: '.'
    },
    loading: {
      text: 'Cargando...'
    },
    error: {
      downErr: 'Download failed.',
      groupFixed: 'If you use group headers, the freeze columns must be set by group.',
      groupMouseRange: 'Los encabezados de agrupación y "{0}" no pueden ser utilizados al mismo tiempo, lo que puede causar errores.',
      groupTag: 'El encabezado de columna de agrupación debería utilizar "{0}" en lugar de "{1}", lo que puede causar errores.',
      scrollErrProp: 'El parámetro "{0}" no es compatible cuando el desplazamiento virtual está habilitado.',
      errConflicts: 'El argumento "{0}" entra en conflicto con "{1}"',
      unableInsert: 'No se puede insertar en la ubicación especificada.',
      useErr: 'Error al instalar el módulo "{0}", posiblemente en el orden equivocado, los módulos dependientes deben ser instalados antes de la tabla.',
      barUnableLink: 'La barra de herramientas no puede asociarse con la tabla.',
      expandContent: 'La ranura de fila expandible debería ser "contenido", por favor revise si está correcta.',
      reqComp: 'Require "{0}" component, check whether the install is correct. https://vxeui.com/#/start/useGlobal',
      reqModule: 'Requerir el módulo "{0}".',
      reqProp: 'Falta el parámetro necesario "{0}", lo que puede causar errores.',
      emptyProp: 'La propiedad "{0}" no se permite estar vacía.',
      errProp: 'Parámetro no compatible "{0}", posiblemente "{1}".',
      colRepet: 'columna.{0}="{0}" está duplicado, lo que puede hacer que algunas funciones sean inutilizables',
      notFunc: 'El método "{0}" no existe.',
      errFunc: 'The argument "{0}" is not a method',
      notValidators: 'Global validators "{0}" no existe.',
      notFormats: 'Global formats "{0}" no existe.',
      notCommands: 'Global commands "{0}" no existe.',
      notSlot: 'La ranura "{0}" no existe.',
      noTree: 'La estructura de árbol no soporta "{0}".',
      notProp: 'Parámetros no compatibles "{0}"',
      checkProp: 'La casilla de verificación puede detenerse cuando la cantidad de datos es demasiado grande, se recomienda establecer el parámetro "{0}" para aumentar la velocidad de representación',
      coverProp: 'The parameter "{1}" to "{0}" is repeatedly defined. This may cause an error.',
      uniField: 'The field "{0}" is repeatedly defined, which may cause an error.',
      repeatKey: 'The primary key repeats {0}="{1}", which may cause an error',
      delFunc: 'La función "{0}" está en desuso, por favor use "{1}".',
      delProp: 'La propiedad "{0}" está en desuso, por favor use "{1}".',
      delEvent: 'El evento "{0}" está en desuso, por favor use "{1}"',
      removeProp: 'La propiedad "{0}" está en desuso y no se recomienda, lo que puede causar un error.',
      errFormat: 'El contenido formateado global debería ser definido con "VXETable.formats". No se recomienda montar "formatter={0}".',
      notType: 'Tipos de archivo no compatibles "{0}"',
      notExp: 'El navegador no es compatible con la importación / exportación.',
      impFields: 'Error de importación, por favor revise que el nombre del campo y el formato de datos sean correctos.',
      treeNotImp: 'La tabla de árbol no soporta importación.'
    },
    table: {
      emptyText: 'No hay datos',
      allTitle: 'Seleccionar todo / cancelar',
      seqTitle: 'N/S',
      actionTitle: 'Action',
      confirmFilter: 'Confirmar',
      resetFilter: 'Restablecer',
      allFilter: 'Todo',
      sortAsc: 'Ascendente: de menor a mayor',
      sortDesc: 'Descendente: de mayor a menor',
      filter: 'Habilitar filtro en columnas seleccionadas',
      impSuccess: 'Se importaron {0} registros con éxito',
      expLoading: 'Exportando',
      expSuccess: 'Éxito al exportar',
      expError: 'Export failure',
      expFilename: 'Exportar_{0}',
      expOriginFilename: 'Exportar_original_{0}',
      customTitle: 'Configuraciones de columna',
      customAll: 'Todo',
      customConfirm: 'Confirm',
      customClose: 'Close',
      customCancel: 'Cancel',
      customRestore: 'Restore',
      maxFixedCol: 'The maximum number of Freeze columns cannot exceed {0}'
    },
    grid: {
      selectOneRecord: '¡Seleccione al menos un registro!',
      deleteSelectRecord: '¿Seguro que desea eliminar el registro seleccionado?',
      removeSelectRecord: '¿Seguro que desea quitar el registro seleccionado?',
      dataUnchanged: '¡Datos sin cambios!',
      delSuccess: '¡Se eliminó con éxito el registro seleccionado!',
      saveSuccess: '¡Guardado con éxito!',
      operError: 'Se produjo un error, ¡operación fallida!'
    },
    select: {
      search: 'Buscar',
      loadingText: 'Cargando',
      emptyText: 'No hay datos'
    },
    pager: {
      goto: 'Ir a',
      gotoTitle: 'Number',
      pagesize: '{0}/página',
      total: 'Total {0} registro',
      pageClassifier: '',
      homePage: 'Home',
      homePageTitle: 'Home page',
      prevPage: 'Página anterior',
      prevPageTitle: 'Previous page',
      nextPage: 'Siguiente página',
      nextPageTitle: 'next page',
      prevJump: 'Saltar página anterior',
      prevJumpTitle: 'Jump previous page',
      nextJump: 'Saltar siguiente página',
      nextJumpTitle: 'Jump next page',
      endPage: 'End page',
      endPageTitle: 'End'
    },
    alert: {
      title: 'System messages'
    },
    button: {
      confirm: 'Confirmar',
      cancel: 'Cancelar'
    },
    filter: {
      search: '搜索'
    },
    custom: {
      cstmTitle: 'Column Settings',
      cstmRestore: 'Restore default',
      cstmCancel: 'Cancelar',
      cstmConfirm: 'Confirm',
      cstmConfirmRestore: 'Please confirm whether to restore the default column configuration?',
      cstmDragTarget: 'Moving target: {0}',
      setting: {
        colSort: 'Sort',
        sortHelpTip: 'Click and drag the icon to adjust the order of the columns.',
        colTitle: 'Title',
        colResizable: 'Column width (px)',
        colVisible: 'Display',
        colFixed: 'Freeze columns',
        colFixedMax: 'Freeze columns (Max {0})',
        fixedLeft: 'Left',
        fixedUnset: 'Unset',
        fixedRight: 'Right'
      }
    },
    import: {
      modes: {
        covering: 'Overwrite mode (directly overwrite table data)',
        insert: 'Bottom append (appends new data to the bottom of the table)',
        insertTop: 'Top append (appends new data to the top of the table)',
        insertBottom: 'Bottom append (appends new data to the bottom of the table)'
      },
      impTitle: 'Importar datos',
      impFile: 'Nombre del archivo',
      impSelect: 'Seleccionar archivo',
      impType: 'Tipo de archivo',
      impOpts: 'Configuración',
      impMode: 'Import mode',
      impConfirm: 'Importar',
      impCancel: 'Cancelar'
    },
    export: {
      types: {
        csv: 'CSV (Separado por comas) (.csv)',
        html: 'Página web (.html)',
        xml: 'Datos XML (.xml)',
        txt: 'Texto (Separado por tabulaciones) (.txt)',
        xls: 'Libro de Excel 97-2003 (.xls)',
        xlsx: 'Libro de Excel (.xlsx)',
        pdf: 'PDF (*.pdf)'
      },
      modes: {
        current: 'Datos actuales (datos de la página actual)',
        selected: 'Datos seleccionados (datos seleccionados en la página actual)',
        all: 'Todos los datos (incluidos todos los datos de paginación)'
      },
      printTitle: 'Imprimir datos',
      expTitle: 'Exportar datos',
      expName: 'Nombre del archivo',
      expNamePlaceholder: 'Por favor, introduzca un nombre de archivo',
      expSheetName: 'Título',
      expSheetNamePlaceholder: 'Por favor, introduzca un título',
      expType: 'Guardar el tipo',
      expMode: 'Seleccionar datos',
      expCurrentColumn: 'Todos los campos',
      expColumn: 'Seleccionar campos',
      expOpts: 'Configuración',
      expOptHeader: 'Encabezado',
      expHeaderTitle: '¿Necesita un encabezado?',
      expOptFooter: 'Pie de página',
      expFooterTitle: '¿Necesita el pie de página de la tabla?',
      expOptColgroup: 'Encabezado de grupo',
      expColgroupTitle: 'Si existe, se admiten encabezados con estructura de agrupación',
      expOptMerge: 'Combinar',
      expMergeTitle: 'Si existe, se admiten celdas con estructuras combinadas',
      expOptAllExpand: 'Expandir nodos',
      expAllExpandTitle: 'Si existe, se pueden expandir todos los datos con estructura de árbol',
      expOptUseStyle: 'Estilos',
      expUseStyleTitle: 'Si existe, se admiten celdas con estilos',
      expOptOriginal: 'Datos de origen',
      expOriginalTitle: 'Si son datos de origen, se admite la importación en la tabla',
      expPrint: 'Imprimir',
      expConfirm: 'Exportar',
      expCancel: 'Cancelar'
    },
    modal: {
      errTitle: 'Error',
      zoomMin: 'Minimize',
      zoomIn: 'Maximize',
      zoomOut: 'Reducir',
      close: 'Cerrar',
      miniMaxSize: 'The number of minimized Windows cannot exceed {0}.',
      footPropErr: '"show-footer" is only used to enable table tails and needs to be used in conjunction with "show-confirm-button" | "show-cancel-button" | slots'
    },
    drawer: {
      close: 'Cerrar'
    },
    form: {
      folding: 'Plegar',
      unfolding: 'Desplegar'
    },
    toolbar: {
      importar: 'Importar',
      exportar: 'Exportar',
      imprimir: 'Imprimir',
      actualizar: 'Actualizar',
      zoomIn: 'Pantalla completa',
      zoomOut: 'Reducción',
      custom: 'Configuración de columna',
      customAll: 'Todo',
      customConfirm: 'Confirmar',
      customRestore: 'Restaurar',
      fixedLeft: 'Freeze on the left',
      fixedRight: 'Freeze on the right',
      cancelFixed: 'Unfreeze column'
    },
    input: {
      date: {
        m1: 'Enero',
        m2: 'Febrero',
        m3: 'Marzo',
        m4: 'Abril',
        m5: 'Mayo',
        m6: 'Junio',
        m7: 'Julio',
        m8: 'Agosto',
        m9: 'Septiembre',
        m10: 'Octubre',
        m11: 'Noviembre',
        m12: 'Diciembre',
        quarterLabel: '{0}',
        monthLabel: '{0}',
        dayLabel: '{1} {0}',
        labelFormat: {
          date: 'dd/MM/yyyy',
          time: 'HH:mm:ss',
          datetime: 'yyyy-MM-dd HH:mm:ss',
          week: '[Semana] WW, yyyy',
          month: 'MM/yyyy',
          quarter: '[Trimestre] q, yyyy',
          year: 'yyyy'
        },
        weeks: {
          w: 'Semana',
          w0: 'Dom',
          w1: 'Lun',
          w2: 'Mar',
          w3: 'Mié',
          w4: 'Jue',
          w5: 'Vie',
          w6: 'Sáb'
        },
        months: {
          m0: 'Ene',
          m1: 'Feb',
          m2: 'Mar',
          m3: 'Abr',
          m4: 'May',
          m5: 'Jun',
          m6: 'Jul',
          m7: 'Ago',
          m8: 'Sep',
          m9: 'Oct',
          m10: 'Nov',
          m11: 'Dic'
        },
        quarters: {
          q1: 'Primer trimestre',
          q2: 'Segundo trimestre',
          q3: 'Tercer trimestre',
          q4: 'Cuarto trimestre'
        }
      }
    },
    imagePreview: {
      popupTitle: 'Preview',
      operBtn: {
        zoomOut: 'Reduce',
        zoomIn: 'Enlarge',
        pctFull: 'Proportional scaling',
        pct11: 'Show original size',
        rotateLeft: 'Rotate left',
        rotateRight: 'Rotate right',
        print: 'Click to print',
        download: 'Click to download'
      }
    },
    upload: {
      fileBtnText: 'Click or drag',
      imgBtnText: 'Click or drag',
      dragPlaceholder: 'Please drag and drop the file into this area to upload it.',
      imgSizeHint: 'Single {0}',
      imgCountHint: 'Up to {0}',
      fileTypeHint: 'Support {0} file types',
      fileSizeHint: 'Single file size does not exceed {0}',
      fileCountHint: 'Up to {0} file can be uploaded',
      overCountErr: 'You can only choose {0} file!',
      overCountExtraErr: 'It has exceeded the maximum number {0}, and more than {0} file will be ignored!超出最大数量 1 个，超出的 1 个文件将被忽略！',
      overSizeErr: 'The size of the file is not more than {0}}!',
      reUpload: 'Re upload',
      uploadProgress: 'Uploading {0}%',
      uploadErr: 'Fail to upload',
      uploadSuccess: 'Successfully upload',
      moreBtnText: 'More ({0})',
      viewItemTitle: 'click to view',
      morePopup: {
        readTitle: 'List',
        imageTitle: 'Upload image',
        fileTitle: 'Upload file'
      }
    },
    empty: {
      defText: 'No Data'
    },
    formDesign: {
      formName: 'Form name',
      defFormTitle: 'Unnamed form',
      widgetPropTab: 'Field property',
      widgetFormTab: 'Form property',
      error: {
        wdFormUni: '该类型的控件在表单中只允许添加一个',
        wdSubUni: '该类型的控件在子表中只允许添加一个'
      },
      styleSetting: {
        btn: 'Style setting',
        title: 'Form style setting',
        layoutTitle: 'Field layout',
        verticalLayout: 'Vertical layout',
        horizontalLayout: 'Horizontal layout',
        styleTitle: 'Title style',
        boldTitle: 'Bold title',
        fontBold: 'Bold',
        fontNormal: 'Normal',
        colonTitle: 'Display colon',
        colonVisible: 'Visible',
        colonHidden: 'Hidden',
        alignTitle: 'Title align',
        widthTitle: 'Title width',
        alignLeft: 'Left',
        alignRight: 'Right',
        unitPx: 'Px',
        unitPct: 'Pct'
      },
      widget: {
        group: {
          base: 'Base control',
          layout: 'Layout control',
          system: 'System control',
          module: 'Module control',
          chart: 'Chart control',
          advanced: 'Advanced control'
        },
        copyTitle: 'Copy_{0}',
        component: {
          input: 'Input',
          textarea: 'Textarea',
          select: 'Select',
          row: 'Row/column',
          title: 'Title',
          text: 'Text',
          subtable: 'Subtable',
          VxeSwitch: 'Yes/no',
          VxeInput: 'Input',
          VxeNumberInput: 'Number',
          VxeDatePicker: 'Date',
          VxeTextarea: 'Textarea',
          VxeSelect: 'Select',
          VxeTreeSelect: 'Tree select',
          VxeRadioGroup: 'Radio',
          VxeCheckboxGroup: 'Checkbox',
          VxeUploadFile: 'File',
          VxeUploadImage: 'Image',
          VxeRate: 'Rate',
          VxeSlider: 'Slider'
        }
      },
      widgetProp: {
        name: 'Field name',
        placeholder: 'Field placeholder',
        required: 'Required',
        multiple: 'Allow to select multiple',
        displaySetting: {
          name: 'Display setting',
          pc: 'PC',
          mobile: 'Mobile',
          visible: 'Visible',
          hidden: 'Hidden'
        },
        dataSource: {
          name: 'Data source',
          defValue: 'Option {0}',
          addOption: 'Add option',
          batchEditOption: 'Batch edit',
          batchEditTip: 'Each row corresponds to an option, supporting direct copying and pasting from tables, Excel, and WPS.',
          batchEditSubTip: 'Each row corresponds to an option. If grouped, the sub items can start with spaces or tab keys, and can be directly copied and pasted from tables, Excel, or WPS.',
          buildOption: 'Build option'
        },
        rowProp: {
          colSize: 'Number of columns',
          col2: 'Two columns',
          col3: 'Three columns',
          col4: 'Four columns',
          col6: 'Six columns',
          layout: 'Layout'
        },
        textProp: {
          name: 'Content',
          alignTitle: 'Align',
          alignLeft: 'Left',
          alignCenter: 'Center',
          alignRight: 'Right',
          colorTitle: 'Color',
          sizeTitle: 'Font size',
          boldTitle: 'Font bold',
          fontNormal: 'Normal',
          fontBold: 'Bold'
        },
        subtableProp: {
          seqTitle: 'S/N',
          showSeq: 'Display serial number',
          showCheckbox: 'Allow multiple selections',
          errSubDrag: 'The sub table does not support this control. Please use another control.',
          colPlace: 'Drag the control in.'
        },
        uploadProp: {
          limitFileCount: 'File quantity limitation',
          limitFileSize: 'File size limitation',
          multiFile: 'Allows multiple files',
          limitImgCount: 'Image quantity limitation',
          limitImgSize: 'Image size limitation',
          multiImg: 'Allows multiple images'
        }
      }
    },
    listDesign: {
      fieldSettingTab: 'Field',
      listSettingTab: 'Parameter',
      searchTitle: 'Search',
      listTitle: 'List',
      searchField: 'Search field',
      listField: 'List field',
      activeBtn: {
        ActionButtonUpdate: 'Edit',
        ActionButtonDelete: 'Delete'
      },
      search: {
        addBtn: 'Edit',
        emptyText: 'No filter condition is configured.',
        editPopupTitle: 'Edit search fields'
      },
      searchPopup: {
        colTitle: 'Title',
        saveBtn: 'Save'
      }
    },
    text: {
      copySuccess: 'Successfully copied to clipboard.',
      copyError: 'The current environment does not support this operation.'
    },
    countdown: {
      formats: {
        yyyy: 'Year',
        MM: 'Moon',
        dd: 'Day',
        HH: 'Hour',
        mm: 'Minute',
        ss: 'Second'
      }
    },

    /**
     * 扩展插件
     */
    plugins: {
      extendCellArea: {
        area: {
          mergeErr: '无法对合并单元格进行该操作',
          multiErr: '无法对多重选择区域进行该操作',
          extendErr: '如果延伸的区域包含被合并的单元格，所有合并的单元格需大小相同',
          pasteMultiErr: '无法粘贴，需要相同大小的复制的区域和粘贴的区域才能执行此操作',
          cpInvalidErr: '该操作无法进行，您选择的区域中存在被禁止的列（{0}）'
        },
        fnr: {
          title: '查找和替换',
          findLabel: '查找',
          replaceLabel: '替换',
          findTitle: '查找内容：',
          replaceTitle: '替换为：',
          tabs: {
            find: '查找',
            replace: '替换'
          },
          filter: {
            re: '正则表达式',
            whole: '全词匹配',
            sensitive: '区分大小写'
          },
          btns: {
            findNext: '查找下一个',
            findAll: '查找全部',
            replace: '替换',
            replaceAll: '替换全部',
            cancel: '取消'
          },
          header: {
            seq: '#',
            cell: '单元格',
            value: '值'
          },
          empty: '(空值)',
          reError: '无效的正则表达式',
          recordCount: '已找到 {0} 个单元格',
          notCell: '找不到匹配的单元格',
          replaceSuccess: '成功替换 {0} 个单元格'
        }
      },
      filterComplexInput: {
        menus: {
          fixedColumn: '锁定列',
          fixedGroup: '锁定组',
          cancelFixed: '取消锁定',
          fixedLeft: '锁定左侧',
          fixedRight: '锁定右侧'
        },
        cases: {
          equal: '等于',
          gt: '大于',
          lt: '小于',
          begin: '开头是',
          endin: '结尾是',
          include: '包含',
          isSensitive: '区分大小写'
        }
      },
      filterCombination: {
        menus: {
          clearSort: '清除排序',
          sortAsc: '升序',
          sortDesc: '降序',
          fixedColumn: '锁定列',
          fixedGroup: '锁定组',
          cancelFixed: '取消锁定',
          fixedLeft: '锁定左侧',
          fixedRight: '锁定右侧',
          clearFilter: '清除筛选',
          textOption: '文本筛选',
          numberOption: '数值筛选'
        },
        popup: {
          title: '自定义筛选的方式',
          currColumnTitle: '当前列：',
          and: '与',
          or: '或',
          describeHtml: '可用 ? 代表单个字符<br/>用 * 代表任意多个字符'
        },
        cases: {
          equal: '等于',
          unequal: '不等于',
          gt: '大于',
          ge: '大于或等于',
          lt: '小于',
          le: '小于或等于',
          begin: '开头是',
          notbegin: '开头不是',
          endin: '结尾是',
          notendin: '结尾不是',
          include: '包含',
          exclude: '不包含',
          between: '介于',
          custom: '自定义筛选',
          insensitive: '不区分大小写',
          isSensitive: '区分大小写'
        },
        empty: '(空白)',
        notData: '无匹配项'
      }
    },

    /**
     * 以下废弃
     * @deprecated
     */
    renderer: {
      search: 'Buscar',
      cases: {
        equal: 'Igual',
        unequal: 'Distinto que',
        gt: 'Mayor que',
        ge: 'Mayor o igual que',
        lt: 'Menor que',
        le: 'Menor o igual que',
        begin: 'Empieza por',
        notbegin: 'No empieza por',
        endin: 'Termina con',
        notendin: 'No termina con',
        include: 'Incluye',
        exclude: 'Excluye',
        between: 'Entre',
        custom: 'Filtro personalizado',
        insensitive: 'No sensible a mayúsculas/minúsculas',
        isSensitive: 'Sensible a mayúsculas/minúsculas'
      },
      combination: {
        menus: {
          clearSort: 'Limpiar ordenamiento',
          sortAsc: 'Orden ascendente',
          sortDesc: 'Orden descendente',
          fixedColumn: 'Columna fija',
          fixedGroup: 'Grupo fijo',
          cancelFixed: 'Borrar fijado',
          fixedLeft: 'Fijar a la izquierda',
          fixedRight: 'Fijar a la derecha',
          clearFilter: 'Limpiar filtro',
          textOption: 'Filtro de texto',
          numberOption: 'Filtro de número'
        },
        popup: {
          title: 'Filtro personalizado',
          currColumnTitle: 'Columna actual:',
          and: 'Y',
          or: 'O',
          describeHtml: 'Use ? para representar un solo carácter <br/> use * para representar cualquier número de caracteres'
        },
        empty: '(Vacío)',
        notData: 'No hay datos'
      }
    },
    pro: {
      area: {
        mergeErr: 'La operación no se puede realizar en celdas combinadas',
        multiErr: 'La operación no se puede realizar en áreas de selección múltiple',
        extendErr: 'Si el área extendida contiene celdas combinadas, todas las celdas combinadas deben tener el mismo tamaño',
        pasteMultiErr: 'No se puede pegar, se requieren áreas copiadas y pegadas del mismo tamaño para realizar esta operación'
      },
      fnr: {
        title: 'Buscar y reemplazar',
        findLabel: 'Buscar',
        replaceLabel: 'Reemplazar',
        findTitle: 'Qué buscar:',
        replaceTitle: 'Reemplazar con:',
        tabs: {
          find: 'Buscar',
          replace: 'Reemplazar'
        },
        filter: {
          re: 'Expresión regular',
          whole: 'Palabra completa',
          sensitive: 'Distinguir mayúsculas y minúsculas'
        },
        btns: {
          findNext: 'Buscar siguiente',
          findAll: 'Buscar todo',
          replace: 'Reemplazar',
          replaceAll: 'Reemplazar todo',
          cancel: 'Cancelar'
        },
        header: {
          seq: '#',
          cell: 'Celda',
          value: 'Valor'
        },
        empty: '(Vacío)',
        reError: 'Expresión regular inválida',
        recordCount: 'Se encontraron {0} celdas',
        notCell: 'No se encontraron celdas coincidentes',
        replaceSuccess: 'Se reemplazaron {0} celdas con éxito'
      }
    }
  }
}
