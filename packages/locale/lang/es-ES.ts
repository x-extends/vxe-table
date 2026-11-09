export default {
  vxe: {
    base: {
      pleaseInput: 'Por favor, introduzca',
      pleaseSelect: 'Por favor, seleccione',
      comma: ',',
      fullStop: '.'
    },
    loading: {
      text: 'Cargando...'
    },
    error: {
      downErr: 'Error de descarga',
      errLargeData: 'Cuando la cantidad de datos vinculados es demasiado grande, utilice {0}; de lo contrario, puede haber problemas de rendimiento',
      groupFixed: 'Si se utilizan encabezados agrupados, las columnas fijas deben configurarse por grupo',
      groupMouseRange: 'Los encabezados agrupados no se pueden usar junto con "{0}", esto puede provocar errores',
      groupTag: 'Los encabezados de columnas agrupadas deben usar "{0}" en lugar de "{1}", esto puede provocar errores',
      scrollErrProp: 'Después de habilitar el desplazamiento virtual, el parámetro "{0}" no es compatible',
      errConflicts: 'El parámetro "{0}" entra en conflicto con "{1}"',
      modelConflicts: 'El valor del campo vinculado "{0}" entra en conflicto con "{1}", se producirán errores',
      notSupportProp: 'Cuando se habilita el parámetro "{0}", "{1}" no es compatible; debería ser "{2}"; de lo contrario, se producirán errores',
      reqSupportProp: 'Al usar "{0}", se debe configurar "{1}"; de lo contrario, pueden producirse errores',
      notConflictProp: 'Al usar "{0}", se debe configurar "{1}"; de lo contrario, puede haber conflictos funcionales',
      unableInsert: 'No se puede insertar en la posición especificada; compruebe si los parámetros son correctos',
      useErr: 'Se produjo un error al instalar el módulo "{0}"; el orden puede ser incorrecto; los módulos dependientes deben instalarse antes de Table',
      barUnableLink: 'La barra de herramientas no puede vincularse a la tabla',
      expandContent: 'El slot de la fila expandida debe ser "content"; compruebe si es correcto',
      reqComp: 'Falta el componente "{0}"; compruebe si está instalado correctamente. https://vxeui.com/#/start/useUI/useGlobal',
      reqModule: 'Falta el módulo "{0}"',
      reqProp: 'Falta el parámetro obligatorio "{0}", esto puede provocar errores',
      emptyProp: 'El parámetro "{0}" no puede estar vacío',
      errProp: 'Parámetro no compatible "{0}"; posiblemente sea "{1}"',
      colRepet: 'column.{0}="{1}" está duplicado, esto puede hacer que algunas funciones no estén disponibles',
      notFunc: 'El método "{0}" no existe',
      errFunc: 'El parámetro "{0}" no es un método',
      notValidators: 'El validador global "{0}" no existe',
      notFormats: 'El formateador global "{0}" no existe',
      notCommands: 'El comando global "{0}" no existe',
      notSlot: 'El slot "{0}" no existe',
      noTree: 'La estructura de árbol no admite "{0}"',
      noGroup: '"{0}" no es compatible después de agrupar los datos',
      notProp: 'Parámetro no compatible "{0}"',
      returnErr: 'Se esperaba que el valor de retorno del parámetro "{0}" fuera "{1}", pero es "{2}"',
      notSupportReturn: 'Cuando el valor de retorno es "{0}", el parámetro debe usar "{1}" en lugar de "{2}"',
      checkProp: 'Cuando la cantidad de datos es demasiado grande, las casillas de verificación pueden ralentizarse; se recomienda configurar el parámetro "{0}" para mejorar la velocidad de renderizado',
      coverProp: 'El parámetro "{1}" de "{0}" está definido repetidamente, esto puede provocar errores',
      uniField: 'El nombre del campo "{0}" está definido repetidamente, esto puede provocar errores',
      repeatKey: 'Clave primaria duplicada {0}="{1}", esto puede provocar errores',
      repeatProp: 'Parámetro duplicado {0}="{1}", esto puede provocar errores',
      delFunc: 'El método "{0}" está obsoleto; utilice "{1}"',
      delProp: 'El parámetro "{0}" está obsoleto; utilice "{1}"',
      delEvent: 'El evento "{0}" está obsoleto; utilice "{1}"',
      removeProp: 'El parámetro "{0}" está obsoleto y no se recomienda; esto puede provocar errores',
      errFormat: 'El contenido de formato global debe definirse con "VXETable.formats"; montar "formatter={0}" ya no se recomienda',
      notType: 'Tipo de archivo no compatible "{0}"',
      notExp: 'Este navegador no admite la función de importación/exportación',
      impFields: 'Error de importación; compruebe si los nombres de campo y el formato de datos son correctos',
      treeNotImp: 'La tabla de árbol no admite importación',
      treeCrossDrag: 'Solo se puede arrastrar el primer nivel',
      treeDragChild: 'Un elemento principal no se puede arrastrar a sus propios elementos secundarios',
      reqPlugin: 'El complemento de extensión no está instalado "{1}" https://vxeui.com/other{0}/#/{1}/start/npmInstall',
      errMaxRow: 'Se ha superado la cantidad máxima de datos compatible de {0} filas, esto puede provocar errores',
      useNew: 'No se recomienda usar {0}; utilice {1}',
      errorVersion: 'Versión incompatible; la versión actual es {0} y la versión mínima compatible es {1}',
      errMaxVersion: '版本不匹配，当前版本 {0}，最高支持版本为 {1}'
    },
    table: {
      emptyText: 'Sin datos',
      allTitle: 'Seleccionar todo/Cancelar',
      seqTitle: 'N.º',
      actionTitle: 'Acción',
      confirmFilter: 'Filtrar',
      resetFilter: 'Restablecer',
      allFilter: 'Todo',
      sortAsc: 'Ascendente: de menor a mayor',
      sortDesc: 'Descendente: de mayor a menor',
      filter: 'Habilitar filtro para la columna seleccionada',
      impSuccess: 'Se importaron correctamente {0} registros',
      expLoading: 'Exportando',
      expSuccess: 'Exportación correcta',
      expError: 'Error de exportación',
      expFilename: 'Exportar_{0}',
      expOriginFilename: 'Exportar_Origen_{0}',
      customTitle: 'Configuración personalizada',
      customAll: 'Todo',
      customConfirm: 'Confirmar',
      customClose: 'Cerrar',
      customCancel: 'Cancelar',
      customRestore: 'Restaurar predeterminado',
      maxFixedCol: 'El número máximo de columnas fijas no puede superar {0}',
      maxGroupCol: 'El número máximo de campos agrupados no puede superar {0}',
      dragTip: 'Mover: {0}',
      resizeColTip: 'Ancho: {0} píxeles',
      resizeRowTip: 'Alto: {0} píxeles',
      rowGroupContentTotal: '{0} ({1})',
      menuLoading: 'Cargando...'
    },
    grid: {
      selectOneRecord: '¡Seleccione al menos un registro!',
      deleteSelectRecord: '¿Está seguro de que desea eliminar los registros seleccionados?',
      removeSelectRecord: '¿Está seguro de que desea quitar los registros seleccionados?',
      dataUnchanged: '¡Los datos no han cambiado!',
      delSuccess: '¡Registros seleccionados eliminados correctamente!',
      saveSuccess: '¡Guardado correctamente!',
      operError: 'Se produjo un error; la operación falló'
    },
    select: {
      clear: 'Limpiar',
      allChecked: 'Seleccionar todo',
      total: '{0} elemento(s) seleccionado(s)',
      close: 'Cerrar',
      search: 'Buscar',
      loadingText: 'Cargando...',
      emptyText: 'Sin datos',
      maxSize: 'El número máximo de elementos seleccionables no puede superar {0}',
      overSizeErr: 'Se ha superado el número máximo seleccionable de {0}; los elementos sobrantes se ignorarán',
      searchEmpty: '¡No se encontraron datos coincidentes!'
    },
    list: {
      allChecked: 'Seleccionar todo',
      dragTip: 'Mover: {0}'
    },
    tree: {
      searchEmpty: '¡No se encontraron datos coincidentes!',
      dragTip: 'Mover: {0}'
    },
    treeSelect: {
      clearChecked: 'Limpiar',
      allChecked: 'Seleccionar todo',
      allExpand: 'Expandir todo',
      clearExpand: 'Contraer todo',
      total: '{0} elemento(s) seleccionado(s)',
      filterCount: 'Se encontraron {0} registros',
      close: 'Cerrar',
      search: 'Buscar',
      emptyText: 'Sin datos'
    },
    tableSelect: {
      filterCount: 'Se encontraron {0} registros'
    },
    pager: {
      goto: 'Ir a',
      gotoTitle: 'Página',
      pagesize: '{0}/página',
      total: 'Total de {0} registros',
      pageClassifier: 'Página',
      homePage: 'Inicio',
      homePageTitle: 'Primera página',
      prevPage: 'Anterior',
      prevPageTitle: 'Página anterior',
      nextPage: 'Siguiente',
      nextPageTitle: 'Página siguiente',
      prevJump: 'Saltar hacia arriba',
      prevJumpTitle: 'Saltar hacia arriba',
      nextJump: 'Saltar hacia abajo',
      nextJumpTitle: 'Saltar hacia abajo',
      endPage: 'Última',
      endPageTitle: 'Última página'
    },
    alert: {
      title: 'Aviso del sistema'
    },
    button: {
      confirm: 'Confirmar',
      cancel: 'Cancelar',
      clear: 'Limpiar'
    },
    filter: {
      search: 'Buscar'
    },
    custom: {
      cstmTitle: 'Configuración personalizada',
      cstmRestore: 'Restaurar predeterminado',
      cstmCancel: 'Cancelar',
      cstmConfirm: 'Aceptar',
      cstmConfirmRestore: '¿Confirma que desea restaurar la configuración de columnas predeterminada?',
      cstmDragTarget: 'Mover: {0}',
      setting: {
        colSort: 'Ordenar',
        sortHelpTip: 'Haga clic en el icono para comenzar a arrastrar',
        colTitle: 'Título de columna',
        colResizable: 'Ancho de columna (píxeles)',
        colVisible: 'Visible',
        colFixed: 'Columna fija',
        colFixedMax: 'Columnas fijas ({0})',
        colAlign: 'Alineación',
        colHeadAlign: 'Alineación del encabezado',
        colFootAlign: 'Alineación del pie',
        fixedLeft: 'Izquierda',
        fixedUnset: 'Ninguna',
        fixedRight: 'Derecha',
        alignLeft: 'Izquierda',
        alignCenter: 'Centro',
        alignRight: 'Derecha',
        moveUp: 'Mover arriba',
        moveDn: 'Mover abajo',
        putTop: 'Mover al principio',
        putBottom: 'Mover al final',
        moveUpTitle: 'Haga clic para mover hacia arriba',
        moveDnTitle: 'Haga clic para mover hacia abajo',
        putTopTitle: 'Haga clic para mover al principio',
        putBottomTitle: 'Haga clic para mover al final',
        anLeftTitle: 'Alinear a la izquierda',
        anCenterTitle: 'Alinear al centro',
        anRightTitle: 'Alinear a la derecha'
      }
    },
    import: {
      modes: {
        covering: 'Sobrescribir (sobrescribir directamente los datos de la tabla)',
        insert: 'Añadir al final (añadir nuevos datos al final de la tabla)',
        insertTop: 'Añadir al principio (añadir nuevos datos al principio de la tabla)',
        insertBottom: 'Añadir al final (añadir nuevos datos al final de la tabla)'
      },
      impTitle: 'Importar datos',
      impFile: 'Nombre del archivo',
      impSelect: 'Seleccionar archivo',
      impType: 'Tipo de archivo',
      impOpts: 'Configuración de parámetros',
      impMode: 'Modo de importación',
      impConfirm: 'Importar',
      impCancel: 'Cancelar'
    },
    export: {
      types: {
        csv: 'CSV (separado por comas)(*.csv)',
        html: 'Página web(*.html)',
        xml: 'Datos XML(*.xml)',
        txt: 'Archivo de texto (separado por tabulaciones)(*.txt)',
        xls: 'Libro de Excel 97-2003(*.xls)',
        xlsx: 'Libro de Excel(*.xlsx)',
        pdf: 'PDF (*.pdf)'
      },
      modes: {
        empty: 'Datos vacíos',
        current: 'Datos actuales (datos de la página actual)',
        selected: 'Datos seleccionados (datos seleccionados en la página actual)',
        all: 'Todos los datos (incluidos los datos de todas las páginas)'
      },
      printTitle: 'Imprimir datos',
      expTitle: 'Exportar datos',
      expName: 'Nombre del archivo',
      expNamePlaceholder: 'Introduzca el nombre del archivo',
      expSheetName: 'Título',
      expSheetNamePlaceholder: 'Introduzca el título',
      expType: 'Tipo de guardado',
      expMode: 'Seleccionar datos',
      expCurrentColumn: 'Todos los campos',
      expColumn: 'Seleccionar campos',
      widthMode: 'Configuración del ancho de columna',
      wModeTitle: 'Configurar cómo se representa el ancho de columna al imprimir',
      wdModes: {
        default: 'Predeterminado',
        auto: 'Automático (ajustar el ancho de columna según el contenido)',
        scale: 'Escalado (representar el ancho de columna según la escala de la página)'
      },
      expOpts: 'Configuración de parámetros',
      expOptHeader: 'Encabezado',
      expHeaderTitle: '¿Se necesita encabezado?',
      expOptFooter: 'Pie de página',
      expFooterTitle: '¿Se necesita pie de página?',
      expOptColgroup: 'Encabezado agrupado',
      expOptTitle: 'Títulos de columna',
      expTitleTitle: 'Si se usan títulos de columna; de lo contrario, se muestran los nombres de campo',
      expColgroupTitle: 'Si existe, admite encabezados con estructura agrupada',
      expOptMerge: 'Combinar',
      expMergeTitle: 'Si existe, admite celdas con estructura combinada',
      expOptAllExpand: 'Expandir árbol',
      expAllExpandTitle: 'Si existe, admite expandir completamente los datos con estructura jerárquica',
      expOptTreeAllExpand: 'Expandir árbol',
      expTreeAllExpandTitle: 'Si existe, expande automáticamente todos los niveles del árbol',
      expOptRowGroupAllExpand: 'Expandir grupos',
      expRowGroupAllExpandTitle: 'Si existe, expande automáticamente todos los niveles de grupo',
      expOptUseStyle: 'Estilos',
      expUseStyleTitle: 'Si existe, admite celdas con estilos',
      expOptOriginal: 'Datos de origen',
      expOriginalTitle: 'Si son datos de origen, admite la importación a la tabla',
      expPrint: 'Imprimir',
      expConfirm: 'Exportar',
      expCancel: 'Cancelar'
    },
    modal: {
      errTitle: 'Error',
      zoomMin: 'Minimizar',
      zoomIn: 'Maximizar',
      zoomOut: 'Restaurar',
      close: 'Cerrar',
      miniMaxSize: 'El número de ventanas minimizadas no puede superar {0}',
      footPropErr: 'show-footer solo se utiliza para habilitar el pie de página; debe usarse junto con show-confirm-button | show-cancel-button | slots'
    },
    drawer: {
      close: 'Cerrar'
    },
    form: {
      folding: 'Contraer',
      unfolding: 'Expandir'
    },
    toolbar: {
      import: 'Importar',
      export: 'Exportar',
      print: 'Imprimir',
      refresh: 'Actualizar',
      zoomIn: 'Pantalla completa',
      zoomOut: 'Restaurar',
      custom: 'Configuración personalizada',
      customAll: 'Todo',
      customConfirm: 'Confirmar',
      customRestore: 'Restablecer',
      fixedLeft: 'Fijar a la izquierda',
      fixedRight: 'Fijar a la derecha',
      cancelFixed: 'Cancelar fijación de columnas'
    },
    iconPicker: {
      search: 'Buscar',
      emptyText: 'Sin datos'
    },
    datePicker: {
      yearTitle: '{0}'
    },
    dateRangePicker: {
      pleaseRange: 'Seleccione la fecha de inicio y la fecha de fin'
    },
    input: {
      date: {
        m1: 'ene',
        m2: 'feb',
        m3: 'mar',
        m4: 'abr',
        m5: 'may',
        m6: 'jun',
        m7: 'jul',
        m8: 'ago',
        m9: 'sep',
        m10: 'oct',
        m11: 'nov',
        m12: 'dic',
        quarterLabel: 'Año {0}',
        monthLabel: 'Año {0}',
        dayLabel: 'Año {0} {1}',
        labelFormat: {
          date: 'yyyy-MM-dd',
          time: 'HH:mm:ss',
          datetime: 'yyyy-MM-dd HH:mm:ss',
          week: 'Semana WW de yyyy',
          month: 'yyyy-MM',
          quarter: 'Tq yyyy',
          year: 'yyyy'
        },
        weeks: {
          w: '',
          w0: 'Domingo',
          w1: 'Lunes',
          w2: 'Martes',
          w3: 'Miércoles',
          w4: 'Jueves',
          w5: 'Viernes',
          w6: 'Sábado'
        },
        months: {
          m0: 'Enero',
          m1: 'Febrero',
          m2: 'Marzo',
          m3: 'Abril',
          m4: 'Mayo',
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
    calendar: {
      yearLabel: '{0}',
      monthLabel: '{0}'
    },
    cascader: {
      clearChecked: 'Limpiar',
      allChecked: 'Seleccionar todo',
      total: '{0} elemento(s) seleccionado(s)',
      close: 'Cerrar',
      search: 'Buscar'
    },
    numberInput: {
      currencySymbol: '€'
    },
    imagePreview: {
      popupTitle: 'Vista previa',
      operBtn: {
        zoomOut: 'Reducir',
        zoomIn: 'Ampliar',
        pctFull: 'Ajustar a la página',
        pct11: 'Mostrar tamaño original',
        rotateLeft: 'Girar a la izquierda',
        rotateRight: 'Girar a la derecha',
        print: 'Haga clic para imprimir la imagen',
        download: 'Haga clic para descargar la imagen'
      }
    },
    upload: {
      fileBtnText: 'Haga clic o arrastre para cargar',
      imgBtnText: 'Haga clic o arrastre para cargar',
      dragPlaceholder: 'Arrastre los archivos a esta zona para cargarlos',
      imgSizeHint: 'Una imagen {0}',
      imgCountHint: 'Máximo {0} imágenes',
      fileTypeHint: 'Admite tipos de archivo {0}',
      fileSizeHint: 'El tamaño de un archivo no debe superar {0}',
      fileCountHint: 'Se pueden cargar como máximo {0} archivos',
      uploadTypeErr: '¡El tipo de archivo no coincide!',
      overCountErr: '¡Solo se pueden seleccionar {0} archivos como máximo!',
      overCountExtraErr: 'Se ha superado el número máximo de {0}; los {1} archivos sobrantes se ignorarán',
      overSizeErr: '¡El tamaño del archivo no puede superar {0}!',
      manualUpload: 'Haga clic para cargar',
      reUpload: 'Volver a cargar',
      uploadProgress: 'Cargando {0}%',
      uploadErr: 'Error de carga',
      uploadSuccess: 'Carga correcta',
      moreBtnText: 'Más ({0})',
      moreImgBtnText: 'Imágenes ({0})',
      moreFileBtnText: 'Archivos ({0})',
      viewItemTitle: 'Haga clic para ver',
      morePopup: {
        readTitle: 'Ver lista',
        imageTitle: 'Cargar imágenes',
        fileTitle: 'Cargar archivos'
      }
    },
    empty: {
      defText: 'Sin datos'
    },
    colorPicker: {
      clear: 'Limpiar',
      confirm: 'Confirmar',
      copySuccess: 'Copiado al portapapeles: {0}',
      hex: 'Hexadecimal'
    },
    formDesign: {
      formName: 'Nombre del formulario',
      defFormTitle: 'Formulario sin título',
      widgetPropTab: 'Propiedades del control',
      widgetFormTab: 'Propiedades del formulario',
      error: {
        wdFormUni: 'Solo se permite añadir un control de este tipo en el formulario',
        wdSubUni: 'Solo se permite añadir un control de este tipo en la subtabla'
      },
      styleSetting: {
        btn: 'Configuración de estilo',
        title: 'Configuración de estilo del formulario',
        layoutTitle: 'Diseño de controles',
        verticalLayout: 'Diseño vertical',
        horizontalLayout: 'Diseño horizontal',
        styleTitle: 'Estilo del título',
        boldTitle: 'Título en negrita',
        fontBold: 'Negrita',
        fontNormal: 'Normal',
        colonTitle: 'Mostrar dos puntos',
        colonVisible: 'Mostrar',
        colonHidden: 'Ocultar',
        alignTitle: 'Alineación',
        widthTitle: 'Ancho del título',
        alignLeft: 'Izquierda',
        alignRight: 'Derecha',
        unitPx: 'píxeles',
        unitPct: 'porcentaje'
      },
      widget: {
        group: {
          base: 'Controles básicos',
          layout: 'Controles de diseño',
          system: 'Controles del sistema',
          module: 'Controles de módulo',
          chart: 'Controles de gráfico',
          advanced: 'Controles avanzados'
        },
        copyTitle: 'Copia_{0}',
        component: {
          input: 'Campo de entrada',
          textarea: 'Área de texto',
          select: 'Selección desplegable',
          row: 'Fila con varias columnas',
          title: 'Título',
          text: 'Texto',
          subtable: 'Subtabla',
          VxeSwitch: 'Sí/No',
          VxeInput: 'Campo de entrada',
          VxeNumberInput: 'Número',
          VxeDatePicker: 'Fecha',
          VxeTextarea: 'Área de texto',
          VxeSelect: 'Selección desplegable',
          VxeTreeSelect: 'Selección de árbol',
          VxeRadioGroup: 'Grupo de opciones',
          VxeCheckboxGroup: 'Grupo de casillas',
          VxeUploadFile: 'Archivo',
          VxeUploadImage: 'Imagen',
          VxeRate: 'Valoración',
          VxeSlider: 'Control deslizante'
        },
        row: {
          placeholder: 'Posición del control'
        }
      },
      widgetProp: {
        name: 'Nombre del control',
        placeholder: 'Texto de ayuda',
        required: 'Validación obligatoria',
        multiple: 'Permitir selección múltiple',
        displaySetting: {
          name: 'Configuración de visualización',
          pc: 'Ordenador',
          mobile: 'Móvil',
          visible: 'Mostrar',
          hidden: 'Ocultar'
        },
        dataSource: {
          name: 'Origen de datos',
          defValue: 'Opción {0}',
          addOption: 'Añadir opción',
          batchEditOption: 'Edición por lotes',
          batchEditTip: 'Cada línea corresponde a una opción; se admite copiar y pegar directamente desde tablas, Excel y WPS.',
          batchEditSubTip: 'Cada línea corresponde a una opción; si es un grupo, los elementos secundarios pueden comenzar con espacio o tabulación; se admite copiar y pegar directamente desde tablas, Excel y WPS.',
          buildOption: 'Generar opciones'
        },
        rowProp: {
          colSize: 'Número de columnas',
          col2: 'Dos columnas',
          col3: 'Tres columnas',
          col4: 'Cuatro columnas',
          col6: 'Seis columnas',
          layout: 'Diseño'
        },
        textProp: {
          name: 'Contenido',
          alignTitle: 'Alineación',
          alignLeft: 'Izquierda',
          alignCenter: 'Centro',
          alignRight: 'Derecha',
          colorTitle: 'Color de fuente',
          sizeTitle: 'Tamaño de fuente',
          boldTitle: 'Fuente en negrita',
          fontNormal: 'Normal',
          fontBold: 'Negrita'
        },
        subtableProp: {
          seqTitle: 'N.º',
          showSeq: 'Mostrar número',
          showCheckbox: 'Permitir selección múltiple',
          errSubDrag: 'La subtabla no admite este control; utilice otro control',
          colPlace: 'Arrastre un control aquí'
        },
        uploadProp: {
          limitFileCount: 'Límite de cantidad de archivos',
          limitFileSize: 'Límite de tamaño de archivo',
          multiFile: 'Permitir cargar varios archivos',
          limitImgCount: 'Límite de cantidad de imágenes',
          limitImgSize: 'Límite de tamaño de imagen',
          multiImg: 'Permitir cargar varias imágenes'
        },
        rules: {
          required: 'Campo obligatorio'
        }
      }
    },
    listDesign: {
      fieldSettingTab: 'Configuración de campos',
      listSettingTab: 'Configuración de parámetros',
      searchTitle: 'Condiciones de búsqueda',
      listTitle: 'Campos de lista',
      searchField: 'Campo de búsqueda',
      listField: 'Campo de lista',
      activeBtn: {
        ActionButtonUpdate: 'Editar',
        ActionButtonDelete: 'Eliminar'
      },
      search: {
        addBtn: 'Editar',
        emptyText: 'No hay condiciones de búsqueda configuradas',
        editPopupTitle: 'Editar campo de búsqueda'
      },
      searchPopup: {
        colTitle: 'Título',
        saveBtn: 'Guardar'
      }
    },
    text: {
      copySuccess: 'Copiado al portapapeles',
      copyError: 'El entorno actual no admite esta operación'
    },
    countdown: {
      formats: {
        yyyy: 'año',
        MM: 'mes',
        dd: 'día',
        HH: 'hora',
        mm: 'minuto',
        ss: 'segundo'
      }
    },
    contextMenu: {
      loadingText: 'Cargando...'
    },
    switch: {
      onText: 'Activado',
      offText: 'Desactivado'
    },
    gantt: {
      tFullFormat: {
        year: '{yyyy}',
        quarter: 'T{q} {yyyy}',
        month: '{MM}/{yyyy}',
        week: 'Semana {W}, {yyyy}',
        day: '{eLabel}, {dd}/{MM}/{yyyy}',
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
        w0: 'Do',
        w1: 'Lu',
        w2: 'Ma',
        w3: 'Mi',
        w4: 'Ju',
        w5: 'Vi',
        w6: 'Sá'
      },
      days: {
        w0: 'Domingo',
        w1: 'Lunes',
        w2: 'Martes',
        w3: 'Miércoles',
        w4: 'Jueves',
        w5: 'Viernes',
        w6: 'Sábado'
      }
    },
    plugins: {
      extendCellArea: {
        area: {
          mergeErr: 'Esta operación no se puede realizar en celdas combinadas',
          multiErr: 'Esta operación no se puede realizar en varias áreas seleccionadas',
          selectErr: 'No se pueden operar las celdas del área especificada',
          extendErr: 'Para realizar esta operación, todas las celdas combinadas deben tener el mismo tamaño',
          pasteMultiErr: 'No se puede pegar; el área copiada y el área de pegado deben tener el mismo tamaño para realizar esta operación',
          cpInvalidErr: 'No se puede realizar esta operación; el área seleccionada contiene columnas prohibidas ({0})'
        },
        fnr: {
          title: 'Buscar y reemplazar',
          titleFd: 'Buscar',
          titleRe: 'Reemplazar',
          findLabel: 'Buscar',
          replaceLabel: 'Reemplazar',
          findTitle: 'Buscar:',
          replaceTitle: 'Reemplazar con:',
          tabs: {
            find: 'Buscar',
            replace: 'Reemplazar'
          },
          filter: {
            re: 'Expresión regular',
            whole: 'Coincidir palabra completa',
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
          body: {
            row: 'Fila: {0}',
            col: 'Columna: {0}'
          },
          empty: '(vacío)',
          reError: 'Expresión regular no válida',
          recordCount: 'Se encontraron {0} celdas',
          notCell: 'No se encontró ninguna celda coincidente',
          replaceSuccess: 'Se reemplazaron correctamente {0} celdas'
        }
      },
      extendPivotTable: {
        aggregation: {
          grouping: 'Agrupación',
          values: 'Valores',
          groupPlaceholder: 'Arrastre aquí para agrupar',
          valuesPlaceholder: 'Arrastre aquí para agregar',
          dragExistCol: 'Esta columna ya existe',
          sortHelpTip: 'Haga clic en el icono para comenzar a arrastrar'
        },
        aggFuncs: {
          sum: 'Suma',
          count: 'Recuento',
          avg: 'Promedio',
          min: 'Mínimo',
          max: 'Máximo',
          first: 'Primer valor',
          last: 'Último valor'
        }
      },
      filterComplexInput: {
        menus: {
          fixedColumn: 'Columna fija',
          fixedGroup: 'Grupo fijo',
          cancelFixed: 'Cancelar fijación',
          fixedLeft: 'Fijar a la izquierda',
          fixedRight: 'Fijar a la derecha'
        },
        cases: {
          equal: 'Igual a',
          gt: 'Mayor que',
          lt: 'Menor que',
          begin: 'Comienza por',
          endin: 'Termina en',
          include: 'Contiene',
          isSensitive: 'Distinguir mayúsculas y minúsculas'
        }
      },
      filterCombination: {
        menus: {
          sort: 'Ordenar',
          clearSort: 'Borrar ordenación',
          sortAsc: 'Ascendente',
          sortDesc: 'Descendente',
          fixedColumn: 'Columna fija',
          fixedGroup: 'Grupo fijo',
          cancelFixed: 'Cancelar fijación',
          fixedLeft: 'Fijar a la izquierda',
          fixedRight: 'Fijar a la derecha',
          clearFilter: 'Borrar filtro',
          textOption: 'Filtro de texto',
          numberOption: 'Filtro numérico',
          dateOption: 'Filtro de fecha'
        },
        popup: {
          title: 'Método de filtro personalizado',
          currColumnTitle: 'Mostrar filas:',
          and: 'Y',
          or: 'O',
          describeHtml: 'Use ? para representar un solo carácter<br/>Use * para representar cualquier número de caracteres'
        },
        cases: {
          equal: 'Igual a',
          unequal: 'No igual a',
          gt: 'Mayor que',
          ge: 'Mayor o igual que',
          lt: 'Menor que',
          le: 'Menor o igual que',
          begin: 'Comienza por',
          notbegin: 'No comienza por',
          endin: 'Termina en',
          notendin: 'No termina en',
          include: 'Contiene',
          exclude: 'No contiene',
          between: 'Entre',
          isAfter: 'Es posterior a',
          eqAfter: 'Es igual o posterior a',
          isBefore: 'Es anterior a',
          eqBefore: 'Es igual o anterior a',
          top10: 'Top 10',
          aboveAverage: 'Por encima de la media',
          belowAverage: 'Por debajo de la media',
          before: 'Antes',
          after: 'Después',
          tomorrow: 'Mañana',
          today: 'Hoy',
          yesterday: 'Ayer',
          nextWeek: 'Próxima semana',
          thisWeek: 'Esta semana',
          lastWeek: 'Semana pasada',
          nextMonth: 'Próximo mes',
          thisMonth: 'Este mes',
          lastMonth: 'Mes pasado',
          nextYear: 'Próximo año',
          thisYear: 'Este año',
          lastYear: 'Año pasado',
          yearToDate: 'Año hasta la fecha',
          custom: 'Filtro personalizado',
          insensitive: 'No distinguir mayúsculas y minúsculas',
          isSensitive: 'Distinguir mayúsculas y minúsculas'
        },
        empty: '(vacío)',
        notData: 'Sin coincidencias'
      }
    },
    pro: {
      area: {
        mergeErr: 'Esta operación no se puede realizar en celdas combinadas',
        multiErr: 'Esta operación no se puede realizar en varias áreas seleccionadas',
        extendErr: 'Para realizar esta operación, todas las celdas combinadas deben tener el mismo tamaño',
        pasteMultiErr: 'No se puede pegar; el área copiada y el área de pegado deben tener el mismo tamaño para realizar esta operación'
      },
      fnr: {
        title: 'Buscar y reemplazar',
        titleFd: 'Buscar',
        titleRe: 'Reemplazar',
        findLabel: 'Buscar',
        replaceLabel: 'Reemplazar',
        findTitle: 'Buscar:',
        replaceTitle: 'Reemplazar con:',
        tabs: {
          find: 'Buscar',
          replace: 'Reemplazar'
        },
        filter: {
          re: 'Expresión regular',
          whole: 'Coincidir palabra completa',
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
        empty: '(vacío)',
        reError: 'Expresión regular no válida',
        recordCount: 'Se encontraron {0} celdas',
        notCell: 'No se encontró ninguna celda coincidente',
        replaceSuccess: 'Se reemplazaron correctamente {0} celdas'
      }
    },
    renderer: {
      search: 'Buscar',
      cases: {
        equal: 'Igual a',
        unequal: 'No igual a',
        gt: 'Mayor que',
        ge: 'Mayor o igual que',
        lt: 'Menor que',
        le: 'Menor o igual que',
        begin: 'Comienza por',
        notbegin: 'No comienza por',
        endin: 'Termina en',
        notendin: 'No termina en',
        include: 'Contiene',
        exclude: 'No contiene',
        between: 'Entre',
        top10: 'Top 10',
        aboveAverage: 'Por encima de la media',
        belowAverage: 'Por debajo de la media',
        custom: 'Filtro personalizado',
        insensitive: 'No distinguir mayúsculas y minúsculas',
        isSensitive: 'Distinguir mayúsculas y minúsculas'
      },
      combination: {
        menus: {
          sort: 'Ordenar',
          clearSort: 'Borrar ordenación',
          sortAsc: 'Ascendente',
          sortDesc: 'Descendente',
          fixedColumn: 'Columna fija',
          fixedGroup: 'Grupo fijo',
          cancelFixed: 'Cancelar fijación',
          fixedLeft: 'Fijar a la izquierda',
          fixedRight: 'Fijar a la derecha',
          clearFilter: 'Borrar filtro',
          textOption: 'Filtro de texto',
          numberOption: 'Filtro numérico',
          dateOption: 'Filtro de fecha'
        },
        popup: {
          title: 'Método de filtro personalizado',
          currColumnTitle: 'Mostrar filas:',
          and: 'Y',
          or: 'O',
          describeHtml: 'Use ? para representar un solo carácter<br/>Use * para representar cualquier número de caracteres'
        },
        empty: '(vacío)',
        notData: 'Sin coincidencias'
      }
    }
  }
}
