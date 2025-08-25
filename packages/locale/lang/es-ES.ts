export default {
  vxe: {
    base: {
      pleaseInput: 'Por favor ingrese',
      pleaseSelect: 'Seleccione',
      comma: '，',
      fullStop: '。'
    },
    loading: {
      text: 'cargando...'
    },
    error: {
      downErr: 'Descargar fallido',
      errLargeData: 'Cuando la cantidad de datos unidos es demasiado grande, use {0}, de lo contrario puede causar retraso',
      groupFixed: 'Si se usa encabezados agrupados, la columna congelada debe ser establecida por grupo',
      groupMouseRange: 'El encabezado de agrupación no se puede usar al mismo tiempo que "{0}" y esto puede causar un error',
      groupTag: 'Los encabezados de la columna de agrupación deben usar "{0}" en lugar de "{1}", lo que puede causar errores',
      scrollErrProp: 'Este parámetro "{0}" no es compatible después de que el desplazamiento virtual esté habilitado',
      errConflicts: 'Parámetro "{0}" En conflicto con "{1}"',
      modelConflicts: 'Hay un conflicto entre el valor de campo unido "{0}" y "{1}", y ocurrirá un error',
      notSupportProp: '"{1}" no se admite cuando el parámetro "{0}" está habilitado, debería ser "{2}", de lo contrario ocurrirá un error',
      reqSupportProp: '当使用 "{0}" 时，应该设置 "{1}"，否则可能会出现错误',
      notConflictProp: 'Cuando se usa "{0}", "{1}" debe establecerse, de lo contrario puede haber conflictos funcionales',
      unableInsert: 'No se puede insertar en la ubicación especificada, verifique si los parámetros son correctos',
      useErr: 'Se produjo un error al instalar el módulo "{0}". El pedido puede ser incorrecto. El módulo dependiente debe instalarse antes de la tabla',
      barUnableLink: 'La barra de herramientas no puede asociar tablas',
      expandContent: 'La ranura para la línea expandida debe ser "contenido", verifique si es correcto',
      reqComp: 'Falta el componente "{0}", verifique si está instalado correctamente. https://vxeui.com/#/start/useglobal',
      reqModule: 'Falta módulo "{0}"',
      reqProp: 'Falta el parámetro "{0}" necesario, lo que puede causar un error',
      emptyProp: 'El parámetro "{0}" no puede estar vacío',
      errProp: 'Parámetro no compatible "{0}", posiblemente "{1}"',
      colRepet: 'columna. {0} = "{1}" se repite, lo que puede hacer que algunas funciones se vuelvan inutilizables',
      notFunc: 'El método "{0}" no existe',
      errFunc: 'El parámetro "{0}" no es un método',
      notValidators: 'La verificación global "{0}" no existe',
      notFormats: 'El formato global "{0}" no existe',
      notCommands: 'La directiva global "{0}" no existe',
      notSlot: 'La ranura "{0}" no existe',
      noTree: '"{0}" no es compatible con la estructura del árbol',
      noGroup: '"{0}" no es compatible después de la agrupación de datos',
      notProp: 'Parámetro no compatible "{0}"',
      checkProp: 'Cuando el volumen de datos es demasiado grande, la casilla de verificación puede tartamudear. Se recomienda establecer el parámetro "{0}" para mejorar la velocidad de renderización',
      coverProp: 'El parámetro "{1}" de "{0}" se define repetidamente, lo que puede causar un error',
      uniField: 'El nombre de campo "{0}" se define repetidamente, lo que puede causar un error',
      repeatKey: 'Repita la clave primaria {0} = "{1}", que puede causar un error',
      repeatProp: '参数重复 {0}="{1}"，这可能会出现错误',
      delFunc: 'El método "{0}" está en desuso, use "{1}"',
      delProp: 'Parámetro "{0}" está en desuso, use "{1}"',
      delEvent: 'El evento "{0}" está en desuso, por favor use "{1}"',
      removeProp: 'El parámetro "{0}" está en desuso y no se recomienda, lo que puede causar un error',
      errFormat: 'El contenido formateado global debe definirse utilizando "vxetable.formats" y el método de montaje "formatter = {0}" ya no se recomienda.',
      notType: 'Tipo de archivo no compatible "{0}"',
      notExp: 'Este navegador no admite la función de importación/exportación',
      impFields: 'La importación falló. Compruebe si el nombre del campo y el formato de datos son correctos.',
      treeNotImp: 'Las tablas de árboles no admiten la importación',
      treeCrossDrag: 'Solo arrastre el primer nivel',
      treeDragChild: 'Los padres no pueden arrastrar a sus propios hijos',
      reqPlugin: '"{1}" no está instalado en https://vxeui.com/other{0 /#/{1}/install',
      errMaxRow: 'Al exceder las filas de volumen de datos máximos admitidos, esto puede causar un error',
      useNew: '{0} no se recomienda, use {1}',
      errorVersion: '版本不匹配，当前版本 {0}，最低支持版本为 {1}'
    },
    table: {
      emptyText: 'Aún no hay datos',
      allTitle: 'Seleccionar todo/Cancelar',
      seqTitle: 'Número de serie',
      actionTitle: 'funcionar',
      confirmFilter: 'filtrar',
      resetFilter: 'Reiniciar',
      allFilter: 'todo',
      sortAsc: 'Orden ascendente: más bajo a más alto',
      sortDesc: 'Orden descendente: más alto a más bajo',
      filter: 'Habilitar el filtrado para columnas seleccionadas',
      impSuccess: 'Los registros {0} se importaron correctamente',
      expLoading: 'Exportador',
      expSuccess: 'Exportar con éxito',
      expError: 'Exportación fallida',
      expFilename: 'Export_ {0}',
      expOriginFilename: 'Export_source_ {0}',
      customTitle: 'Configuración de columna',
      customAll: 'todo',
      customConfirm: 'confirmar',
      customClose: 'cierre',
      customCancel: 'Cancelar',
      customRestore: 'Restaurar predeterminado',
      maxFixedCol: 'El número máximo de columnas congeladas no puede exceder {0}',
      maxGroupCol: 'El número de campos de agrupación máximos no puede exceder {0}',
      dragTip: 'Mover: {0}',
      resizeColTip: 'Ancho: {0} píxeles',
      resizeRowTip: 'Alto: {0} píxeles',
      rowGroupContentTotal: '{0}（{1}）'
    },
    grid: {
      selectOneRecord: '¡Seleccione al menos un registro!',
      deleteSelectRecord: '¿Estás seguro de que quieres eliminar el registro seleccionado?',
      removeSelectRecord: '¿Estás seguro de que quieres eliminar el registro seleccionado?',
      dataUnchanged: '¡Los datos no cambiaron!',
      delSuccess: '¡El registro seleccionado se eliminó con éxito!',
      saveSuccess: '¡Ahorre con éxito!',
      operError: '¡Se produjo un error y la operación falló!'
    },
    select: {
      clear: 'Claro',
      allChecked: 'Seleccionar todo',
      total: '{0} / {1}',
      search: 'buscar',
      loadingText: 'cargando',
      emptyText: 'Aún no hay datos',
      maxSize: 'El número máximo de opciones no puede exceder {0}',
      overSizeErr: 'Se ha excedido el número máximo opcional {0}, ¡y el exceso será ignorado!',
      searchEmpty: '¡No hay datos coincidentes!'
    },
    tree: {
      searchEmpty: '¡No hay datos coincidentes!'
    },
    treeSelect: {
      clearChecked: 'Claro',
      allChecked: 'Seleccionar todo',
      allExpand: 'Expandir todo',
      clearExpand: 'Cerrar todo',
      total: 'Seleccionado {0}',
      search: 'buscar',
      emptyText: 'Aún no hay datos'
    },
    pager: {
      goto: 'Ir',
      gotoTitle: 'Número de páginas',
      pagesize: '{0} elementos/página',
      total: 'Total {0} registros',
      pageClassifier: 'Página',
      homePage: 'página delantera',
      homePageTitle: 'página delantera',
      prevPage: 'Página anterior',
      prevPageTitle: 'Página anterior',
      nextPage: 'Página siguiente',
      nextPageTitle: 'Página siguiente',
      prevJump: 'Página de salto',
      prevJumpTitle: 'Página de salto',
      nextJump: 'Página de salto',
      nextJumpTitle: 'Página de salto',
      endPage: 'Última página',
      endPageTitle: 'Última página'
    },
    alert: {
      title: 'Indica el sistema'
    },
    button: {
      confirm: 'confirmar',
      cancel: 'Cancelar',
      clear: 'Claro'
    },
    filter: {
      search: 'buscar'
    },
    custom: {
      cstmTitle: 'Configuración de columna',
      cstmRestore: 'Restaurar predeterminado',
      cstmCancel: 'Cancelar',
      cstmConfirm: 'Seguro',
      cstmConfirmRestore: '¿Confirma si se restaura a la configuración de columna predeterminada?',
      cstmDragTarget: 'Mover: {0}',
      setting: {
        colSort: 'Clasificar',
        sortHelpTip: 'Haga clic y arrastre el icono para ajustar el pedido',
        colTitle: 'Título de columna',
        colResizable: 'Ancho de columna (píxeles)',
        colVisible: 'Si mostrar',
        colFixed: 'Columna de congelación',
        colFixedMax: 'Columnas de congelación (hasta {0} columnas)',
        fixedLeft: 'Lado izquierdo',
        fixedUnset: 'No establecido',
        fixedRight: 'Lado derecho'
      }
    },
    import: {
      modes: {
        covering: 'Método de sobrescribencia (sobrescribir directamente los datos de la tabla)',
        insert: 'Agregar en la parte inferior (Agregar nuevos datos en la parte inferior de la tabla)',
        insertTop: 'Agregar en la parte superior (Agregar nuevos datos en la parte superior de la tabla)',
        insertBottom: 'Agregar en la parte inferior (Agregar nuevos datos en la parte inferior de la tabla)'
      },
      impTitle: 'Importar datos',
      impFile: 'Nombre del archivo',
      impSelect: 'Seleccione un archivo',
      impType: 'Tipo de archivo',
      impOpts: 'Configuración de parámetros',
      impMode: 'Modo de importación',
      impConfirm: 'Importar',
      impCancel: 'Cancelar'
    },
    export: {
      types: {
        csv: 'CSV (Comm-separado) (*. CSV)',
        html: 'Página web (*.html)',
        xml: 'Datos XML (*.xml)',
        txt: 'Archivo de texto (Tab-separado) (*. Txt)',
        xls: 'Excel 97-2003 Workbook (*.xls)',
        xlsx: 'Excel Workbook (*.xlsx)',
        pdf: 'PDF (*.pdf)'
      },
      modes: {
        empty: 'Datos vacíos',
        current: 'Datos actuales (datos en la página actual)',
        selected: 'Datos seleccionados (datos seleccionados en la página actual)',
        all: 'Datos completos (incluidos todos los datos pagados)'
      },
      printTitle: 'Imprimir datos',
      expTitle: 'Exportación de datos',
      expName: 'Nombre del archivo',
      expNamePlaceholder: 'Ingrese un nombre de archivo',
      expSheetName: 'título',
      expSheetNamePlaceholder: 'Por favor ingrese un título',
      expType: 'Tipo de guardado',
      expMode: 'Seleccionar datos',
      expCurrentColumn: 'Todos los campos',
      expColumn: 'Seleccione un campo',
      expOpts: 'Configuración de parámetros',
      expOptHeader: 'Encabezamiento',
      expHeaderTitle: '¿Se requiere el encabezado de la tabla?',
      expOptFooter: 'Final de la mesa',
      expFooterTitle: '¿Se requiere el final de la tabla?',
      expOptColgroup: 'Encabezado de agrupación',
      expOptTitle: 'Título de columna',
      expTitleTitle: 'Si es el título de la columna, de lo contrario se mostrará como el nombre del campo de la columna',
      expColgroupTitle: 'Si está presente, se admite un encabezado con una estructura de agrupación',
      expOptMerge: 'unir',
      expMergeTitle: 'Si está presente, las células con estructuras fusionadas son compatibles',
      expOptAllExpand: 'Expandir el árbol',
      expAllExpandTitle: 'Si existe, es compatible para expandir todos los datos con estructuras jerárquicas',
      expOptUseStyle: 'estilo',
      expUseStyleTitle: 'Si está presente, las celdas con estilo son compatibles',
      expOptOriginal: 'Datos de origen',
      expOriginalTitle: 'Si son datos de origen, la importación en tablas es compatible',
      expPrint: 'Imprimir',
      expConfirm: 'Exportar',
      expCancel: 'Cancelar'
    },
    modal: {
      errTitle: 'Mensaje de error',
      zoomMin: 'Minimizar',
      zoomIn: 'maximizar',
      zoomOut: 'reducción',
      close: 'cierre',
      miniMaxSize: 'El número de ventanas minimizadas no puede exceder {0}',
      footPropErr: 'Show-Footer solo se usa para habilitar la cola de la mesa, y debe usarse con Show-Confirm-Button | Show-Cancel-Button | ranura'
    },
    drawer: {
      close: 'cierre'
    },
    form: {
      folding: 'Cerca',
      unfolding: 'Expandir'
    },
    toolbar: {
      import: 'Importar',
      export: 'Exportar',
      print: 'Imprimir',
      refresh: 'refrescar',
      zoomIn: 'pantalla completa',
      zoomOut: 'reducción',
      custom: 'Configuración de columna',
      customAll: 'todo',
      customConfirm: 'confirmar',
      customRestore: 'Reiniciar',
      fixedLeft: 'Congelarse a la izquierda',
      fixedRight: 'Congelarse a la derecha',
      cancelFixed: 'Columnas desenfrenado'
    },
    datePicker: {
      yearTitle: '{0} años'
    },
    dateRangePicker: {
      pleaseRange: 'Seleccione una fecha de inicio y una fecha de finalización'
    },
    input: {
      date: {
        m1: 'Enero',
        m2: 'Febrero',
        m3: 'Marzo',
        m4: 'Abril',
        m5: 'Puede',
        m6: 'Junio',
        m7: 'Julio',
        m8: 'Agosto',
        m9: 'Septiembre',
        m10: 'Octubre',
        m11: 'Noviembre',
        m12: 'Diciembre',
        quarterLabel: '{0} años',
        monthLabel: '{0} años',
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
          w0: 'Sol',
          w1: 'Lun',
          w2: 'Mar',
          w3: 'Casarse',
          w4: 'Jue',
          w5: 'Vie',
          w6: 'Se sentó'
        },
        months: {
          m0: 'Enero',
          m1: 'Febrero',
          m2: 'Marzo',
          m3: 'Abril',
          m4: 'Puede',
          m5: 'Junio',
          m6: 'Julio',
          m7: 'Agosto',
          m8: 'Septiembre',
          m9: 'Octubre',
          m10: 'Noviembre',
          m11: 'Diciembre'
        },
        quarters: {
          q1: 'Primer trimestre',
          q2: 'Segundo trimestre',
          q3: 'Tercer trimestre',
          q4: 'Cuarto trimestre'
        }
      }
    },
    numberInput: {
      currencySymbol: '$'
    },
    imagePreview: {
      popupTitle: 'Avance',
      operBtn: {
        zoomOut: 'Encoger',
        zoomIn: 'agrandar',
        pctFull: 'Escala igualmente',
        pct11: 'Mostrar tamaño original',
        rotateLeft: 'Girar a la izquierda',
        rotateRight: 'Girar hacia la derecha',
        print: 'Haga clic para imprimir la imagen',
        download: 'Haga clic para descargar la imagen'
      }
    },
    upload: {
      fileBtnText: 'Haga clic o arrastre para cargar',
      imgBtnText: 'Haga clic o arrastre para cargar',
      dragPlaceholder: 'Arrastre y deje caer el archivo a esta área para cargar',
      imgSizeHint: 'Único {0}',
      imgCountHint: 'Hasta {0}',
      fileTypeHint: 'Soporte {0} tipos de archivos',
      fileSizeHint: 'Un solo tamaño de archivo no excede {0}',
      fileCountHint: 'Se pueden cargar hasta {0} archivos',
      uploadTypeErr: '¡Tipo de archivo MISMATCH!',
      overCountErr: '¡Solo los archivos {0} se pueden seleccionar como máximo!',
      overCountExtraErr: 'Se ha excedido el número máximo de {0}, ¡y los archivos de exceso {1} se ignorarán!',
      overSizeErr: '¡El tamaño máximo del archivo no puede exceder {0}!',
      manualUpload: 'Haga clic para cargar',
      reUpload: 'Volver a cargar',
      uploadProgress: 'Cargando {0}%',
      uploadErr: 'Carga falló',
      uploadSuccess: 'Subir con éxito',
      moreBtnText: 'Más ({0})',
      viewItemTitle: 'Haga clic para ver',
      morePopup: {
        readTitle: 'Ver la lista',
        imageTitle: 'Subir fotos',
        fileTitle: 'Archivo de carga'
      }
    },
    empty: {
      defText: 'Aún no hay datos'
    },
    colorPicker: {
      clear: 'Claro',
      confirm: 'confirmar',
      copySuccess: 'Copiado al portapapeles: {0}',
      hex: 'HEX'
    },
    formDesign: {
      formName: 'Nombre del formulario',
      defFormTitle: 'Forma sin nombre',
      widgetPropTab: 'Propiedades de control',
      widgetFormTab: 'Propiedades de forma',
      error: {
        wdFormUni: 'Este tipo de control puede agregar solo uno en el formulario',
        wdSubUni: 'Este tipo de control puede agregar solo uno en la subtendia'
      },
      styleSetting: {
        btn: 'Configuración de estilo',
        title: 'Configuración de estilo de formulario',
        layoutTitle: 'Diseño de control',
        verticalLayout: 'Diseño hacia arriba y hacia abajo',
        horizontalLayout: 'Diseño horizontal',
        styleTitle: 'Estilo de título',
        boldTitle: 'Título grueso',
        fontBold: 'Atrevido',
        fontNormal: 'convencional',
        colonTitle: 'Mostrar el colon',
        colonVisible: 'espectáculo',
        colonHidden: 'esconder',
        alignTitle: 'Alineación',
        widthTitle: 'Ancho del título',
        alignLeft: 'A la izquierda',
        alignRight: 'A la derecha',
        unitPx: 'Píxeles',
        unitPct: 'porcentaje'
      },
      widget: {
        group: {
          base: 'Controles básicos',
          layout: 'Controles de diseño',
          system: 'Controles del sistema',
          module: 'Controles de módulos',
          chart: 'Control de la tabla',
          advanced: 'Controles avanzados'
        },
        copyTitle: 'Copy_ {0}',
        component: {
          input: 'Caja de entrada',
          textarea: 'Campo de texto',
          select: 'Tire hacia abajo para seleccionar',
          row: 'Una fila y múltiples columnas',
          title: 'título',
          text: 'texto',
          subtable: 'Subtitable',
          VxeSwitch: 'si',
          VxeInput: 'Caja de entrada',
          VxeNumberInput: 'número',
          VxeDatePicker: 'fecha',
          VxeTextarea: 'Campo de texto',
          VxeSelect: 'Tire hacia abajo para seleccionar',
          VxeTreeSelect: 'Selección de árboles',
          VxeRadioGroup: 'Caja de radio',
          VxeCheckboxGroup: 'Casilla de verificación',
          VxeUploadFile: 'documento',
          VxeUploadImage: 'imagen',
          VxeRate: 'puntaje',
          VxeSlider: 'control deslizante'
        }
      },
      widgetProp: {
        name: 'Nombre de control',
        placeholder: 'Inmediato',
        required: 'Verificación requerida',
        multiple: 'Se permiten múltiples opciones',
        displaySetting: {
          name: 'Mostrar configuración',
          pc: 'Computadora',
          mobile: 'Móvil',
          visible: 'espectáculo',
          hidden: 'esconder'
        },
        dataSource: {
          name: 'Fuente de datos',
          defValue: 'Opción {0}',
          addOption: 'Agregar opciones',
          batchEditOption: 'Edición por lotes',
          batchEditTip: 'Cada fila corresponde a una opción, que admite copiar y pegar directamente desde tablas, Excel y WPS.',
          batchEditSubTip: 'Cada fila corresponde a una opción. Si se trata de un grupo, los elementos infantiles pueden comenzar con un espacio o una tecla Tab, y admite copiar y pegar directamente en Tablas, Excel y WPS.',
          buildOption: 'Generar opciones'
        },
        rowProp: {
          colSize: 'Número de columnas',
          col2: 'Dos columnas',
          col3: 'Tres columnas',
          col4: 'Cuatro columnas',
          col6: 'Seis columnas',
          layout: 'disposición'
        },
        textProp: {
          name: 'contenido',
          alignTitle: 'Alineación',
          alignLeft: 'A la izquierda',
          alignCenter: 'Centro',
          alignRight: 'A la derecha',
          colorTitle: 'Color de fuente',
          sizeTitle: 'Tamaño de fuente',
          boldTitle: 'Fuente más gruesa',
          fontNormal: 'convencional',
          fontBold: 'Atrevido'
        },
        subtableProp: {
          seqTitle: 'Número de serie',
          showSeq: 'Mostrar número de serie',
          showCheckbox: 'Se permiten múltiples opciones',
          errSubDrag: 'El subtendible no admite este control, utilice otros controles',
          colPlace: 'Arrastre el control en'
        },
        uploadProp: {
          limitFileCount: 'Límite de cantidad de archivo',
          limitFileSize: 'Límite de tamaño de archivo',
          multiFile: 'Permitir que se carguen varios archivos',
          limitImgCount: 'Límite número de imágenes',
          limitImgSize: 'Límite de tamaño de imagen',
          multiImg: 'Permitir múltiples imágenes para cargar'
        }
      }
    },
    listDesign: {
      fieldSettingTab: 'Configuración de campo',
      listSettingTab: 'Configuración de parámetros',
      searchTitle: 'Criterio de consulta',
      listTitle: 'Campo de lista',
      searchField: 'Campos de consulta',
      listField: 'Campo de lista',
      activeBtn: {
        ActionButtonUpdate: 'editar',
        ActionButtonDelete: 'borrar'
      },
      search: {
        addBtn: 'editar',
        emptyText: 'Condiciones de consulta no configuradas',
        editPopupTitle: 'Editar campos de consulta'
      },
      searchPopup: {
        colTitle: 'título',
        saveBtn: 'ahorrar'
      }
    },
    text: {
      copySuccess: 'Copiado al portapapeles',
      copyError: 'El entorno actual no admite esta operación'
    },
    countdown: {
      formats: {
        yyyy: 'Año',
        MM: 'luna',
        dd: 'cielo',
        HH: 'hora',
        mm: 'punto',
        ss: 'Segundo'
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
          mergeErr: 'Esta operación no se puede realizar en células fusionadas',
          multiErr: 'Esta operación no se puede realizar en el área multi-selecta',
          selectErr: 'No se puede operar celdas en el área especificada',
          extendErr: 'Si el área extendida contiene células fusionadas, todas las células fusionadas deben ser del mismo tamaño',
          pasteMultiErr: 'No se puede pegar, necesita copiar y pegar áreas del mismo tamaño para hacer esto',
          cpInvalidErr: 'Esta operación no se puede realizar, hay columnas prohibidas en el área que seleccionó ({0})'
        },
        fnr: {
          title: 'Buscar y reemplazar',
          findLabel: 'Encontrar',
          replaceLabel: 'reemplazar',
          findTitle: 'Encontrar contenido:',
          replaceTitle: 'Reemplazar con:',
          tabs: {
            find: 'Encontrar',
            replace: 'reemplazar'
          },
          filter: {
            re: 'Expresiones regulares',
            whole: 'Coincidencia de palabra completa',
            sensitive: 'distingue mayúsculas y minúsculas'
          },
          btns: {
            findNext: 'Encuentra el siguiente',
            findAll: 'Encontrar todo',
            replace: 'reemplazar',
            replaceAll: 'Reemplazar todo',
            cancel: 'Cancelar'
          },
          header: {
            seq: '#',
            cell: 'Celúla',
            value: 'valor'
          },
          body: {
            row: 'Línea: {0}',
            col: 'Columna: {0}'
          },
          empty: '(Valor nulo)',
          reError: 'Expresión regular no válida',
          recordCount: '{0} celdas encontradas',
          notCell: 'La celda correspondiente no se puede encontrar',
          replaceSuccess: '{0} Las células fueron reemplazadas con éxito'
        }
      },
      extendPivotTable: {
        aggregation: {
          grouping: 'Agrupamiento',
          values: 'valor',
          groupPlaceholder: 'Arrastre aquí al grupo',
          valuesPlaceholder: 'Arrastre aquí para agregar',
          dragExistCol: 'Esta columna ya existe',
          sortHelpTip: 'Haga clic y arrastre el icono para ajustar el pedido'
        },
        aggFuncs: {
          sum: 'Pedir suma',
          count: 'contar',
          avg: 'valor promedio',
          min: 'Valor mínimo',
          max: 'Valor máximo',
          first: 'Primer valor',
          last: 'El valor final'
        }
      },
      filterComplexInput: {
        menus: {
          fixedColumn: 'Columna de congelación',
          fixedGroup: 'Congelamiento',
          cancelFixed: 'Cancelar congelación',
          fixedLeft: 'Congelarse del lado izquierdo',
          fixedRight: 'Congelar el lado derecho'
        },
        cases: {
          equal: 'igual',
          gt: 'Más que',
          lt: 'Menos que',
          begin: 'El comienzo es',
          endin: 'El final es',
          include: 'Incluir',
          isSensitive: 'distingue mayúsculas y minúsculas'
        }
      },
      filterCombination: {
        menus: {
          sort: 'Clasificar',
          clearSort: 'Clasificación clara',
          sortAsc: 'Orden ascendente',
          sortDesc: 'orden descendente',
          fixedColumn: 'Columna de congelación',
          fixedGroup: 'Congelamiento',
          cancelFixed: 'Cancelar congelación',
          fixedLeft: 'Congelarse del lado izquierdo',
          fixedRight: 'Congelar el lado derecho',
          clearFilter: 'Filtro claro',
          textOption: 'Filtrado de texto',
          numberOption: 'Filtrado numérico'
        },
        popup: {
          title: 'Métodos de filtrado personalizados',
          currColumnTitle: 'Columna actual:',
          and: 'y',
          or: 'o',
          describeHtml: '¿Disponible? Representa un solo personaje <br/> uso * representa cualquier caracteres múltiples'
        },
        cases: {
          equal: 'igual',
          unequal: 'No igual a',
          gt: 'Más que',
          ge: 'Mayor o igual a',
          lt: 'Menos que',
          le: 'Menos o igual a',
          begin: 'El comienzo es',
          notbegin: 'No es al principio',
          endin: 'El final es',
          notendin: 'El final no es',
          include: 'Incluir',
          exclude: 'No incluido',
          between: 'Entre',
          custom: 'Filtrado personalizado',
          insensitive: 'Caso insensible',
          isSensitive: 'distingue mayúsculas y minúsculas'
        },
        empty: '(blanco)',
        notData: 'Sin partido'
      }
    },
    pro: {
      area: {
        mergeErr: 'Esta operación no se puede realizar en células fusionadas',
        multiErr: 'Esta operación no se puede realizar en el área multi-selecta',
        extendErr: 'Si el área extendida contiene células fusionadas, todas las células fusionadas deben ser del mismo tamaño',
        pasteMultiErr: 'No se puede pegar, necesita copiar y pegar áreas del mismo tamaño para hacer esto'
      },
      fnr: {
        title: 'Buscar y reemplazar',
        findLabel: 'Encontrar',
        replaceLabel: 'reemplazar',
        findTitle: 'Encontrar contenido:',
        replaceTitle: 'Reemplazar con:',
        tabs: {
          find: 'Encontrar',
          replace: 'reemplazar'
        },
        filter: {
          re: 'Expresiones regulares',
          whole: 'Coincidencia de palabra completa',
          sensitive: 'distingue mayúsculas y minúsculas'
        },
        btns: {
          findNext: 'Encuentra el siguiente',
          findAll: 'Encontrar todo',
          replace: 'reemplazar',
          replaceAll: 'Reemplazar todo',
          cancel: 'Cancelar'
        },
        header: {
          seq: '#',
          cell: 'Celúla',
          value: 'valor'
        },
        empty: '(Valor nulo)',
        reError: 'Expresión regular no válida',
        recordCount: '{0} celdas encontradas',
        notCell: 'La celda correspondiente no se puede encontrar',
        replaceSuccess: '{0} Las células fueron reemplazadas con éxito'
      }
    },
    renderer: {
      search: 'buscar',
      cases: {
        equal: 'igual',
        unequal: 'No igual a',
        gt: 'Más que',
        ge: 'Mayor o igual a',
        lt: 'Menos que',
        le: 'Menos o igual a',
        begin: 'El comienzo es',
        notbegin: 'No es al principio',
        endin: 'El final es',
        notendin: 'El final no es',
        include: 'Incluir',
        exclude: 'No incluido',
        between: 'Entre',
        custom: 'Filtrado personalizado',
        insensitive: 'Caso insensible',
        isSensitive: 'distingue mayúsculas y minúsculas'
      },
      combination: {
        menus: {
          sort: 'Clasificar',
          clearSort: 'Clasificación clara',
          sortAsc: 'Orden ascendente',
          sortDesc: 'orden descendente',
          fixedColumn: 'Columna de congelación',
          fixedGroup: 'Congelamiento',
          cancelFixed: 'Cancelar congelación',
          fixedLeft: 'Congelarse a la izquierda',
          fixedRight: 'Congelarse a la derecha',
          clearFilter: 'Filtro claro',
          textOption: 'Filtrado de texto',
          numberOption: 'Filtrado numérico'
        },
        popup: {
          title: 'Métodos de filtrado personalizados',
          currColumnTitle: 'Columna actual:',
          and: 'y',
          or: 'o',
          describeHtml: '¿Disponible? Representa un solo personaje <br/> uso * representa cualquier caracteres múltiples'
        },
        empty: '(blanco)',
        notData: 'Sin partido'
      }
    }
  }
}
